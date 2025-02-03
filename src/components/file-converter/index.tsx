import { FC } from "react";
import { Card, CardContent } from "../ui/card";
import DropZone from "../drop-zone";

export interface IFileConverterProps {}

const FileConverter: FC<IFileConverterProps> = () => {
  return (
    <Card className="w-full border-none rounded-2xl">
      <CardContent className="text-textColor p-6">
        <p className="pb-6 font-public-sans font-semibold text-lg">
          Select Files
        </p>
        <DropZone />
      </CardContent>
    </Card>
  );
};

export default FileConverter;
