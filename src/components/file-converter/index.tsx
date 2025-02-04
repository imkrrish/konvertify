import { FC } from "react";
import { Card, CardContent } from "../ui/card";
import DropZone from "../drop-zone";
import { useAppContext } from "../app-context-provider";
import { randomString } from "@/utils";
import { produce } from "immer";
import FilePreview from "../file-preview";

export interface IFileConverterProps {}

const FileConverter: FC<IFileConverterProps> = () => {
  const { files, setFiles } = useAppContext();
  return (
    <Card className="w-full border-none rounded-2xl">
      <CardContent className="text-textColor p-6">
        <p className="pb-6 font-public-sans font-semibold text-lg">
          Select Files
        </p>

        <DropZone
          onUpload={(val) => {
            if (!val.length) return;
            const newFiles = val.map((file) => {
              const id = randomString();
              return {
                id,
                file,
                file_name: file.name,
                file_size: file.size,
                from: file.name.slice(
                  ((file.name.lastIndexOf(".") - 1) >>> 0) + 2
                ),
                to: null,
                file_type: file.type,
                is_converted: false,
                is_converting: false,
                is_error: false,
              };
            });
            setFiles((prev) => {
              return produce(prev, (draft) => {
                return [...draft, ...newFiles];
              });
            });
          }}
        />

        {files.length > 0 && (
          <div className="pt-6 space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-public-sans font-medium text-sm">
                Selected Files
              </p>
            </div>
            <div className="space-y-2">
              {files.map((file) => (
                <FilePreview key={file.id} file={file} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileConverter;
