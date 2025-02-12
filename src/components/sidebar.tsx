import { FC, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Logo from "./icons/logo";
import MenuIcon from "./icons/menu";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Github } from "./icons/github";
import { githubLink } from "@/lib/constants";

export interface ISidebarProps {
  links: {
    url: string;
    label: string;
  }[];
}

const Sidebar: FC<ISidebarProps> = ({ links }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="sm:hidden">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent
        side="left"
        showCross={false}
        className="p-0 bg-transparent"
      >
        <div
          className="h-full w-full flex flex-col"
          style={{
            backgroundImage: backgroundImage,
            backgroundSize: "auto",
            backgroundRepeat: "no-repeat",
            backdropFilter: "blur(20px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "40px 40px 80px -8px rgba(145, 158, 171, 0.24)",
            backgroundPosition: "right top, left bottom",
          }}
        >
          <SheetHeader className="px-5 pt-6 pb-4">
            <SheetTitle className="sr-only">Konvertify</SheetTitle>
            <SheetDescription className="sr-only">
              Konvertify Sidebar
            </SheetDescription>
            <div
              className="flex items-end gap-0.5"
              onClick={() => {
                navigate({
                  to: "/",
                });
              }}
            >
              <Logo className="text-primary" />
              <p
                className="-ml-1.5 font-semibold text-2xl"
                style={{
                  lineHeight: 0.88,
                }}
              >
                onvertify
              </p>
            </div>
          </SheetHeader>

          <div className="flex flex-1 flex-col font-public-sans">
            {links.map((link, i) => (
              <div
                key={i}
                className={cn(
                  "h-12 w-full flex items-center text-sm px-5 text-[#637381]",
                  location.pathname === link.url &&
                    "text-primary bg-[#078dee]/[0.08]"
                )}
                style={{
                  WebkitTapHighlightColor: "transparent",
                }}
                onClick={() => {
                  navigate({
                    to: link.url,
                  });
                  setOpen(false);
                }}
              >
                {link.label}
              </div>
            ))}
          </div>

          <div className="px-5 pb-6 w-full">
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              <Button
                variant="default"
                className="bg-textColor w-full flex hover:bg-textColor hover:opacity-90"
              >
                <Github />
                Github
              </Button>
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;

const backgroundImage =
  'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfNDQ2NF81NTMzOCkiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CjxkZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9yYWRpYWxfNDQ2NF81NTMzOCIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg=="), url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfNDQ2NF81NTMzNykiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CjxkZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9yYWRpYWxfNDQ2NF81NTMzNyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K")';
