import { createFileRoute } from "@tanstack/react-router";
import { FC } from "react";
import FileConverterCard from "@/components/file-converter-card";

export interface IHomeProps {}

const Home: FC<IHomeProps> = () => {
  return (
    <div className="w-full flex-1 grid grid-rows-[auto_1fr]">
      <div className="min-h-60 w-full flex flex-col items-center justify-center linear-blur-background">
        <div className="myContainer w-full font-public-sans text-center flex flex-col gap-4 items-center justify-center">
          <h1 className="text-2xl font-bold">
            Convert with Confidence Using Konvertify
          </h1>
          <p className="text-sm font-normal w-full md:w-3/5 sm:w-3/4">
            Transform your images, audio, and videos effortlessly on your device
            with Konvertify! Enjoy fast, secure conversions without uploading to
            the cloud. Unlock the power of seamless multimedia transformation
            and keep your files private—all for free!
          </p>
        </div>
      </div>

      <div className="w-full myContainer flex-1 pt-16 pb-28">
        <div className="rounded-2xl bg-foreground flex flex-col gap-4 items-center justify-center p-4 sm:p-6">
          <FileConverterCard />
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});
