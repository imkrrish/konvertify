import { FC } from "react";
import ReactDropzone, { DropEvent, FileRejection } from "react-dropzone";

const accepted_files = {
  "image/*": [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".ico",
    ".tif",
    ".tiff",
    ".raw",
    ".tga",
  ],
  "audio/*": [],
  "video/*": [],
};

export interface IDropZoneProps {}

const DropZone: FC<IDropZoneProps> = () => {
  const handleUpload = <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ): void => {
    console.log("Accepted Files:", acceptedFiles);
    console.log("File Rejections:", fileRejections);
    console.log("Event:", event);
  };
  const handleHover = (): void => {};
  const handleExitHover = (): void => {};
  return (
    <ReactDropzone
      onDrop={handleUpload}
      onDragEnter={handleHover}
      onDragLeave={handleExitHover}
      accept={accepted_files}
      onDropRejected={() => {
        handleExitHover();
      }}
      onError={() => {
        handleExitHover();
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="bg-background h-72 lg:h-80 xl:h-96 rounded-3xl shadow-sm border-secondary border-2 border-dashed cursor-pointer flex items-center justify-center"
        >
          <input {...getInputProps()} />
          <div className="space-y-4 text-foreground">Drop</div>
        </div>
      )}
    </ReactDropzone>
  );
};

export default DropZone;
