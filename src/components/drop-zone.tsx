import { FC } from "react";
import ReactDropzone, { DropEvent, FileRejection } from "react-dropzone";
import UploadFile from "./icons/upload-file";

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
          className="cursor-pointer border p-10 rounded-lg border-dashed border-[rgba(145,158,171,0.2)] bg-[rgba(145,158,171,0.08)] hover:opacity-[0.72] transition-all ease-in-out"
        >
          <input {...getInputProps()} />
          <div className="flex items-center gap-2 font-public-sans justify-center flex-col">
            <div className="w-52">
              <UploadFile />
            </div>
            <h3 className="font-semibold text-lg">Drop or select file</h3>
            <p className="text-[#919eab] font-normal text-sm">
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
