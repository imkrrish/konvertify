import { FC } from "react";
import Logo from "./icons/logo";
import { useNavigate } from "@tanstack/react-router";
import { links } from "./navbar";
import { Button } from "./ui/button";
import { Github } from "./icons/github";

export interface IFooterProps {}

const Footer: FC<IFooterProps> = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-auto border-t border-[rgba(145,158,171,0.2)] pt-20 pb-10">
      <div className="myContainer flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start gap-6">
          <div
            className="flex items-end gap-0.5 cursor-pointer select-none"
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
          <div>
            <p className="text-sm text-center sm:text-left font-public-sans text-textColor font-normal w-full max-w-80">
              Transform your images, audio, and videos effortlessly on your
              device with Konvertify! Enjoy fast, secure conversions without
              uploading to the cloud. Unlock the power of seamless multimedia
              transformation and keep your files private—all for free!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center sm:items-start sm:grid-flow-col pt-12 gap-10">
          <div className="space-y-4 md:min-w-40 text-center sm:text-left">
            <p className="font-bold text-textColor font-public-sans text-xs">
              PAGES
            </p>
            {links.map((link) => (
              <p
                key={link.label}
                className="text-textColor hover:underline cursor-pointer font-normal font-public-sans text-sm"
                onClick={() => {
                  navigate({
                    to: link.url,
                  });
                }}
              >
                {link.label}
              </p>
            ))}
          </div>
          <div className="space-y-4 md:min-w-40 text-center sm:text-left">
            <p className="font-bold text-textColor font-public-sans text-xs">
              SOURCE CODE
            </p>
            <Button
              variant="default"
              className="bg-textColor flex hover:bg-textColor hover:opacity-90"
            >
              <Github />
              Github
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center sm:text-start myContainer font-normal text-sm text-textColor">
        Built by{" "}
        <a
          className="underline"
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
        >
          Krishan Kumar
        </a>
        . The source code is available on{" "}
        <a
          className="underline"
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </div>
    </div>
  );
};

export default Footer;
