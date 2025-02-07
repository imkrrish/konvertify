import { IFile } from "@/types";
import { FC } from "react";
import FilethumbIcon from "./icons/files/filethumb-icon";
import bytesToSize from "@/utils";
import { MingcuteCloseLine } from "./icons/cross";
import SelectExtension from "./select-file-extension";
import { useAppContext } from "./app-context-provider";
import { produce } from "immer";
import TruncatedFileName from "./truncated-file-name";

export interface IFilePreviewProps {
  file: IFile;
}

const FilePreview: FC<IFilePreviewProps> = ({ file }) => {
  const { setFiles } = useAppContext();
  return (
    <div className="flex flex-col sm:flex-row relative items-start  sm:items-center gap-3 rounded-lg border border-[rgba(145,158,171,0.16)] py-2 pr-2 pl-3">
      <div className="flex items-center gap-3 flex-1">
        <FilethumbIcon width={36} height={36} fileFormat={file.file_type} />
        <div className="flex-1 font-public-sans flex flex-col items-start justify-start">
          <TruncatedFileName file_name={file.file_name} />
          <p className="text-[#637381] dark:text-[#919EAB] font-normal text-xs">
            {bytesToSize(file.file_size)}
          </p>
        </div>
      </div>
      <div className="w-full sm:w-fit flex items-center justify-end">
        <SelectExtension
          fileType={file.file_type}
          value={file.to}
          onSelect={(val) => {
            if (val) {
              setFiles((prev) => {
                return produce(prev, (draft) => {
                  const indexOf = draft.findIndex((val) => val.id === file.id);
                  if (indexOf !== -1) {
                    draft[indexOf] = {
                      ...draft[indexOf],
                      to: val,
                    };
                  }
                  return draft;
                });
              });
            }
          }}
        />
      </div>
      <button
        className="absolute top-0.5 right-0.5 sm:static h-[26px] w-[26px] rounded-full text-[#637381] dark:text-[#919EAB] bg-transparent dark:hover:bg-[rgba(145,158,171,0.08)] hover:bg-[rgba(99,115,129,0.08)] flex items-center justify-center"
        style={{
          transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onClick={() => {
          setFiles((prev) => {
            return produce(prev, (draft) => {
              draft = draft.filter((val) => {
                return val.id !== file.id;
              });
              return draft;
            });
          });
        }}
      >
        <MingcuteCloseLine width={16} height={16} />
      </button>
    </div>
  );
};

export default FilePreview;
