import { createLazyFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";

export interface IHomeProps {}

const Home: FC<IHomeProps> = () => {
  return (
    <div className="w-full myContainer">
      <div className="rounded-3xl bg-foreground flex flex-col gap-4 items-center justify-center p-6 my-6">
        <Card className="w-full container h-[80dvh]">
          <CardContent className="p-6"></CardContent>
        </Card>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Home,
});
