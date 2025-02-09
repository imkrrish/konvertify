import { FC } from "react";
import { getFileExtension, removeFileExtension } from "@/lib/convert";

export interface IFileNameProps {
  file_name: string;
}

const FileName: FC<IFileNameProps> = ({ file_name }) => {
  return (
    <div className="flex items-center font-semibold text-textColor pr-5 sm:pr-0 text-sm">
      <p className="line-clamp-1 break-all">{removeFileExtension(file_name)}</p>
      <p>.{getFileExtension(file_name)}</p>
    </div>
  );
};

export default FileName;
