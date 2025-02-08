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

  onConvertAll: () => Promise<void>;
  // onDownloadAll: () => void;
  // onDownload: () => void;
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
          file.is_converting = true;
        });
      })
    );
    setIsConverting(true);

    for (const file of files) {
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

    // Finalize conversion process
    setIsConverted(true);
    setIsConverting(false);
  };

  useEffect(() => {
    load();
  }, []);

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
