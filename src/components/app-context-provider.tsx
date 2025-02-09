import { IFile } from "@/types";
import loadFfmpeg from "@/lib/load-ffmpeg";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { produce } from "immer";
import convertFile from "@/lib/convert";

type IAppProviderContextProps = {
  children: React.ReactNode;
};

type IAppContext = null | {
  // Getters
  files: IFile[];
  showThumbs: boolean;
  isConverting: boolean;
  isConverted: boolean;
  is_loaded: boolean;

  // Setters
  setFiles: React.Dispatch<React.SetStateAction<IFile[]>>;
  setShowThumbs: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConverting: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConverted: React.Dispatch<React.SetStateAction<boolean>>;

  onRemoveFile: (id: string) => void;
  onConvertAll: () => Promise<void>;
  onDownloadAll: () => void;
  onDownload: (file: IFile) => void;
};

const AppContext = createContext<IAppContext>(null);

export const AppProviderContext = ({ children }: IAppProviderContextProps) => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [showThumbs, setShowThumbs] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const [is_loaded, setIsLoaded] = useState<boolean>(false);

  const ffmpegRef = useRef<any>(null);

  const onConvertAll = async (): Promise<void> => {
    // Mark all actions as converting and update state
    setFiles((prevFiles) =>
      produce(prevFiles, (draft) => {
        draft.forEach((file) => {
          if (file.is_converted || file.is_error) {
            return;
          }
          file.is_converting = true;
        });
      })
    );

    setIsConverting(true);

    for (const file of files) {
      if (!file.is_converted && !file.is_error) {
        try {
          // Perform file conversion
          const { url, output } = await convertFile(ffmpegRef.current, file);

          // Update the action state upon successful conversion
          setFiles((prevFiles) =>
            produce(prevFiles, (draft) => {
              const item = draft.find((elt) => elt.id === file.id);
              if (item) {
                item.is_converted = true;
                item.is_converting = false;
                item.url = url;
                item.output = output;
              }
            })
          );
        } catch (error) {
          console.error(`Failed to convert File <${file.file_name}>:`, error);
          // Handle conversion failure and update action state
          setFiles((prevFiles) =>
            produce(prevFiles, (draft) => {
              const item = draft.find((elt) => elt.id === file.id);
              if (item) {
                item.is_converted = false;
                item.is_converting = false;
                item.is_error = true;
              }
            })
          );
        }
      }
    }

    // Finalize conversion process
    setIsConverted(true);
    setIsConverting(false);
  };

  const load = async () => {
    const ffmpeg_response = await loadFfmpeg();
    if (!ffmpeg_response) {
      console.error("FFmpeg initialization failed. Please try again.");
    } else {
      ffmpegRef.current = ffmpeg_response;
      console.log("FFmpeg is ready to use!");
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    load();
  }, []);

  const onDownload = (file: IFile) => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = file.url || "";
    a.download = file.output || "";

    document.body.appendChild(a);
    a.click();

    // Clean up after download
    URL.revokeObjectURL(file.url || "");
    document.body.removeChild(a);
  };

  const onDownloadAll = (): void => {
    for (let file of files) {
      if (file.is_converted && !file.is_error && !file.is_converting) {
        onDownload(file);
      }
    }
  };

  const onRemoveFile = (id: string) => {
    const updatedFiles = produce(files, (draft) => {
      draft = draft.filter((val) => {
        return val.id !== id;
      });
      return draft;
    });

    if (updatedFiles.length === 0) {
      setIsConverted(false);
      setIsConverting(false);
    }

    setFiles(updatedFiles);
  };

  return (
    <AppContext.Provider
      value={{
        files,
        showThumbs,
        isConverting,
        isConverted,
        is_loaded,
        setFiles,
        setShowThumbs,
        setIsConverting,
        setIsConverted,
        onConvertAll,
        onDownload,
        onDownloadAll,
        onRemoveFile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProviderContext");
  }
  return context;
};
