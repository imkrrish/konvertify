import { createLazyFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";

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

      <div className="w-full myContainer flex-1 py-6">
        <div className="rounded-3xl bg-foreground h-full flex flex-col gap-4 items-center justify-center p-6">
          <Card className="w-full h-full">
            <CardContent className="p-6 text-textColor"></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Home,
});
