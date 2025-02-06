import { FC, useMemo } from "react";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { extensions } from "@/utils/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";

export interface ISelectExtensionProps {
  fileType: string;
  value?: string | null;
  onSelect: (val: string) => void;
}

const SelectExtension: FC<ISelectExtensionProps> = ({
  value,
  fileType,
  onSelect,
}) => {
  const defaultTab = useMemo(
    () => (extensions.audio.includes(value || "") ? "audio" : "video"),
    [value, extensions.audio, extensions.video]
  );

  const getValue = (value: string): string => {
    const lowerValue = value.toLowerCase();
    for (const [_, extList] of Object.entries(extensions)) {
      if (extList.includes(lowerValue)) return value;
    }
    return "";
  };

  return (
    <Select value={value || ""} onValueChange={onSelect}>
      <SelectTrigger className="w-fit min-w-[98px] select-none font-public-sans font-semibold text-xs text-textColor border-[rgba(145,158,171,0.32)] shadow-none outline-none focus:outline-none focus:ring-0 gap-1 rounded-lg h-[30px] px-2">
        <SelectValue
          placeholder={
            <p className="text-[#637381] dark:text-[#919EAB] font-medium">
              Convert to
            </p>
          }
        >
          .{getValue(value || "")}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-background border-[rgba(145,158,171,0.2)] rounded-lg p-1">
        {/* if file_type is image */}

        {fileType.includes("image") && (
          <div className="grid grid-cols-2 gap-2 w-fit">
            {extensions.image.map((ext) => (
              <div key={ext} className="col-span-1 text-center">
                <SelectItem
                  value={ext}
                  className={cn(
                    "mx-auto cursor-pointer rounded-md text-textColor text-xs font-medium focus:bg-foreground",
                    value === ext && "bg-foreground"
                  )}
                >
                  .{ext}
                </SelectItem>
              </div>
            ))}
          </div>
        )}

        {/* if file_type is audio  */}

        {fileType.includes("audio") && (
          <div className="grid grid-cols-2 gap-2 w-fit">
            {extensions.audio.map((ext) => (
              <div key={ext} className="col-span-1 text-center">
                <SelectItem
                  value={ext}
                  className={cn(
                    "mx-auto cursor-pointer rounded-md text-textColor text-xs font-medium focus:bg-foreground",
                    value === ext && "bg-foreground"
                  )}
                >
                  .{ext}
                </SelectItem>
              </div>
            ))}
          </div>
        )}

        {/* if file_type is video */}

        {fileType.includes("video") && (
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="w-full bg-foreground rounded-lg h-8 dark:bg-card text-[#637381] dark:text-[#919EAB]">
              <TabsTrigger
                value="video"
                className="w-full data-[state=active]:text-textColor text-xs rounded-lg"
              >
                Video
              </TabsTrigger>
              <TabsTrigger
                value="audio"
                className="w-full data-[state=active]:text-textColor text-xs rounded-lg"
              >
                Audio
              </TabsTrigger>
            </TabsList>
            <TabsContent value="video">
              <div className="grid grid-cols-3 gap-2 w-fit">
                {extensions.video.map((ext) => (
                  <div key={ext} className="col-span-1 text-center">
                    <SelectItem
                      value={ext}
                      className={cn(
                        "mx-auto cursor-pointer rounded-md text-textColor text-xs font-medium focus:bg-foreground",
                        value === ext && "bg-foreground"
                      )}
                    >
                      .{ext}
                    </SelectItem>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="audio">
              <div className="grid grid-cols-3 gap-2 w-fit">
                {extensions.audio.map((ext) => (
                  <div key={ext} className="col-span-1 text-center">
                    <SelectItem
                      value={ext}
                      className={cn(
                        "mx-auto cursor-pointer rounded-md text-textColor text-xs font-medium focus:bg-foreground",
                        value === ext && "bg-foreground"
                      )}
                    >
                      .{ext}
                    </SelectItem>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectExtension;
