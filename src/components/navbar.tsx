import { FC } from "react";
import { ModeToggle } from "./mode-toggle";
import Logo from "./icons/logo";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Github } from "./icons/github";
import Sidebar from "./sidebar";

export interface INavbarProps {}

const Navbar: FC<INavbarProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="sticky border-b-[0.5px] border-grid top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="myContainer flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <Sidebar links={links} />
          {/* logo  */}
          <div
            className="flex items-end gap-0.5 cursor-pointer"
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
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center gap-10">
            {links.map((link, i) => (
              <Navlink
                key={i}
                isActive={location.pathname === link.url}
                onClick={() => {
                  navigate({
                    to: link.url,
                  });
                }}
                label={link.label}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <ModeToggle />
            <Button
              variant="default"
              className="bg-textColor hidden sm:flex hover:bg-textColor hover:opacity-90"
            >
              <Github />
              Github
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const links = [
  {
    url: "/",
    label: "Home",
  },
  {
    url: "/about",
    label: "About",
  },
  {
    url: "/privacy-policy",
    label: "Privacy Policy",
  },
];

export interface INavlinkProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

const Navlink: FC<INavlinkProps> = ({ isActive = false, onClick, label }) => {
  return (
    <div
      className="relative group cursor-pointer text-sm font-medium"
      onClick={onClick}
    >
      <span
        className={cn(
          "scale-0 transition-all duration-150 ease-in-out h-1.5 w-1.5 absolute rounded-full top-1/2 -translate-y-1/2 -left-3 group-hover:scale-100 bg-[#919eab]",
          isActive && "bg-primary scale-100"
        )}
      />
      <p className={cn(isActive && "text-primary")}>{label}</p>
    </div>
  );
};
