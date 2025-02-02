import { FC, SVGProps } from "react";

export interface IlogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

const logo: FC<IlogoProps> = ({ size = 24, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M287.8 168.3c-41.1 72.2-75 132-75.3 132.9-.4 1.1 15.9 31.2 47.7 87.7l48.3 86.1 47-.3c43.9-.2 47-.3 46.9-1.9-.1-1-21.2-39.6-46.9-85.9-40.1-72.2-46.5-84.5-45.7-86.4.5-1.2 34-60.1 74.2-131C424.3 98.7 457.3 40 457.4 39.1c.1-1.4-4.6-1.6-47.4-1.9l-47.5-.2-74.7 131.3zM74.4 118.5c-.4.9 10.1 20.9 25.6 49.2 17.1 31.2 26 48.3 25.8 49.7-.3 1.2-16.5 29-36.1 62-28.4 47.6-35.5 60.1-34.6 61.2 1 1.2 9 1.4 47.8 1.2l46.6-.3 35.2-58.5c19.4-32.2 36.2-60.3 37.4-62.5l2.1-4-28.3-49.8-28.3-49.7h-46.3c-40.5 0-46.4.2-46.9 1.5z"
      />
    </svg>
  );
};

export default logo;
