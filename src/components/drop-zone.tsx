import { FC, useState } from "react";
import ReactDropzone from "react-dropzone";
import UploadFile from "./icons/upload-file";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { accepted_files } from "@/utils/constants";

export interface IDropZoneProps {
  onUpload: (files: File[]) => void;
}

const DropZone: FC<IDropZoneProps> = ({ onUpload }) => {
  const [is_hover, setIsHover] = useState(false);

  const handleUpload = <T extends File>(acceptedFiles: T[]): void => {
    handleExitHover();
    onUpload(acceptedFiles);
  };

  const handleHover = (): void => {
    setIsHover(true);
  };

  const handleExitHover = (): void => {
    setIsHover(false);
  };

  return (
    <ReactDropzone
      onDrop={handleUpload}
      onDragEnter={handleHover}
      onDragLeave={handleExitHover}
      accept={accepted_files}
      onDropRejected={() => {
        handleExitHover();
        toast.error("Error uploading your file(s)", {
          description: (
            <p className="text-muted-foreground">
              Allowed Files: Audio, Video and Images.
            </p>
          ),
        });
      }}
      onError={() => {
        handleExitHover();
        toast.error("Error uploading your file(s)", {
          description: (
            <p className="text-muted-foreground">
              Allowed Files: Audio, Video and Images.
            </p>
          ),
        });
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className={cn(
            "cursor-pointer border p-10 rounded-lg border-dashed border-[rgba(145,158,171,0.2)] bg-[rgba(145,158,171,0.08)] hover:opacity-[0.72] transition-all ease-in-out",
            is_hover && "opacity-[0.72]"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex items-center gap-2 font-public-sans justify-center flex-col">
            <div className="w-52">
              <UploadFile />
            </div>
            <h3 className="font-semibold text-lg text-center">
              {is_hover ? "Yes drop it right there" : "Drop or select file"}
            </h3>
            <p
              className={cn(
                "text-[#919eab] font-normal text-sm text-center",
                is_hover && "invisible"
              )}
            >
              Drop files here or click to{" "}
              <span className="text-primary underline">browse</span> through
              your machine.
            </p>
          </div>
        </div>
      )}
    </ReactDropzone>
  );
};

export default DropZone;
