import { IFile } from "@/types";
import { createContext, useContext, useState } from "react";

type IAppProviderContextProps = {
  children: React.ReactNode;
};

type IAppContext = null | {
  // Getters
  files: IFile[];
  showThumbs: boolean;
  isConverting: boolean;
  isConverted: boolean;

  // Setters
  setFiles: React.Dispatch<React.SetStateAction<IFile[]>>;
  setShowThumbs: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConverting: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConverted: React.Dispatch<React.SetStateAction<boolean>>;

  // onConvertAll: () => void;
  // onDownloadAll: () => void;
  // onDownload: () => void;
};

const AppContext = createContext<IAppContext>(null);

export const AppProviderContext = ({ children }: IAppProviderContextProps) => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [showThumbs, setShowThumbs] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  return (
    <AppContext.Provider
      value={{
        files,
        showThumbs,
        isConverting,
        isConverted,
        setFiles,
        setShowThumbs,
        setIsConverting,
        setIsConverted,
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
