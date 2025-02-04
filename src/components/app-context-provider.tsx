import { IFile } from "@/types";
import { createContext, useContext, useState } from "react";

type IAppProviderContextProps = {
  children: React.ReactNode;
};

type IAppContext = null | {
  // Getters
  files: IFile[];
  showThumbs: boolean;

  // Setters
  setFiles: React.Dispatch<React.SetStateAction<IFile[]>>;
  setShowThumbs: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<IAppContext>(null);

export const AppProviderContext = ({ children }: IAppProviderContextProps) => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [showThumbs, setShowThumbs] = useState(false);
  return (
    <AppContext.Provider
      value={{
        files,
        showThumbs,
        setFiles,
        setShowThumbs,
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
