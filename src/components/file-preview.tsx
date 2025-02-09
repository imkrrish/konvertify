import { FC } from "react";
import { IFile } from "@/types";
import FilethumbIcon from "./icons/files/filethumb-icon";
import bytesToSize from "@/lib";
import { MingcuteCloseLine } from "./icons/cross";
import SelectExtension from "./select-file-extension";
import { useAppContext } from "./app-context-provider";
import { produce } from "immer";
import TruncatedFileName from "./truncated-file-name";
import { ArrowCircleDownFill } from "./icons/arrow-circle-down-fill";
import { cn } from "@/lib/utils";
import { SmilingFaceFill } from "./icons/smiling-face";
import { AlertTriangleOutline } from "./icons/alert-trinagle";
import { LoaderOutline } from "./icons/loader";

export interface IFilePreviewProps {
  file: IFile;
}

const FilePreview: FC<IFilePreviewProps> = ({ file }) => {
  const {
    file_name,
    file_size,
    file_type,
    is_converting,
    is_converted,
    is_error,
  } = file;

  const { setFiles, isConverting } = useAppContext();

  return (
    <div className="flex flex-col sm:flex-row relative items-start  sm:items-center gap-3 rounded-lg border border-[rgba(145,158,171,0.16)] py-2 pr-2 pl-3">
      <div className="flex items-center gap-3 flex-1">
        <FilethumbIcon width={36} height={36} fileFormat={file_type} />
        <div className="flex-1 font-public-sans flex flex-col items-start justify-start">
          <TruncatedFileName file_name={file_name} />
          <p className="text-[#637381] dark:text-[#919EAB] font-normal text-xs">
            {bytesToSize(file_size)}
          </p>
        </div>
      </div>
      <div className="w-full sm:w-fit flex items-center justify-end gap-3">
        <StatusChip
          is_converting={is_converting}
          is_converted={is_converted}
          is_error={is_error}
        />
        {is_converted && (
          <>
            <button className="min-w-[98px] bg-transparent flex items-center [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-public-sans font-semibold text-xs text-textColor border border-[rgba(145,158,171,0.32)] shadow-none outline-none focus:outline-none focus:ring-0 gap-1 rounded-lg h-[30px] px-2">
              <ArrowCircleDownFill />
              Download
            </button>
          </>
        )}
        {!is_converted && !is_error && (
          <SelectExtension
            fileType={file_type}
            value={file.to}
            disabled={is_converting || isConverting}
            onSelect={(val) => {
              if (val) {
                setFiles((prev) => {
                  return produce(prev, (draft) => {
                    const indexOf = draft.findIndex(
                      (val) => val.id === file.id
                    );
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
        )}
      </div>
      <button
        disabled={is_converting || isConverting}
        className="absolute disabled:cursor-not-allowed top-0.5 right-0.5 sm:static h-[26px] w-[26px] rounded-full text-[#637381] dark:text-[#919EAB] bg-transparent dark:hover:bg-[rgba(145,158,171,0.08)] hover:bg-[rgba(99,115,129,0.08)] flex items-center justify-center"
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

export interface IStatusChipProps {
  is_converting?: boolean;
  is_converted?: boolean;
  is_error?: boolean;
}

const StatusChip: FC<IStatusChipProps> = ({
  is_converting,
  is_converted,
  is_error,
}) => {
  if (!is_converting && !is_converted && !is_error) {
    return null;
  }
  return (
    <div
      className={cn(
        "font-public-sans font-medium text-xs rounded-[10px] select-none h-8 flex items-center justify-center gap-1 px-3 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        is_converting &&
          "text-[#0351AB] dark:text-[#68CDF9] bg-[rgba(7,141,238,0.16)]",
        is_converted &&
          "text-[#118d57] dark:text-[#77ED8B] bg-[rgba(34,197,94,0.16)]",
        is_error &&
          "text-[#B71D18] dark:text-[#FFAC82] bg-[rgba(255,86,48,0.16)]"
      )}
    >
      {is_converting && (
        <>
          <LoaderOutline className="animate-spin-slow" />
          Converting
        </>
      )}
      {is_converted && (
        <>
          <SmilingFaceFill />
          Done
        </>
      )}
      {is_error && (
        <>
          <AlertTriangleOutline />
          Error in Converting File
        </>
      )}
    </div>
  );
};
