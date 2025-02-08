import { cn } from "@/lib/utils";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export interface ITruncatedFileNameProps {
  file_name: string;
}

export interface ITruncatedFileNameRef {
  checkOverflow: () => void;
}

const TruncatedFileName = forwardRef<
  ITruncatedFileNameRef,
  ITruncatedFileNameProps
>(({ file_name }, ref) => {
  const text_ref = useRef<HTMLParagraphElement>(null);
  const [truncatedName, setTruncatedName] = useState(file_name);

  const checkOverflow = () => {
    if (!text_ref.current) return;
    const isTextOverflowing = text_ref.current.scrollHeight > 20;
    if (isTextOverflowing) {
      setTruncatedName(truncateMiddle(file_name, text_ref.current.clientWidth));
    } else {
      setTruncatedName(file_name);
    }
  };

  useImperativeHandle(ref, () => ({
    checkOverflow,
  }));

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [file_name]);

  return (
    <>
      <p ref={text_ref} className={cn("font-semibold text-textColor text-sm")}>
        {truncatedName}
      </p>
    </>
  );
});

export default TruncatedFileName;

const truncateMiddle = (name: string, maxWidth: number): string => {
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return name;
  ctx.font = "bold 14px sans-serif"; // Match UI font for accurate width calculations

  const lastDotIndex = name.lastIndexOf(".");
  if (lastDotIndex === -1 || lastDotIndex === 0) return name;

  const ext = name.slice(lastDotIndex); // Get file extension
  const baseName = name.slice(0, lastDotIndex); // Get name without extension

  // If name fits within maxWidth, return as is
  if (ctx.measureText(name).width <= maxWidth) return name;

  let left = Math.floor(baseName.length / 2) - 1;
  let right = Math.ceil(baseName.length / 2) + 1;
  let truncated = baseName;

  while (left >= 0 && right <= baseName.length) {
    const tempTruncated =
      baseName.slice(0, left) + "..." + baseName.slice(right) + ext;
    if (ctx.measureText(tempTruncated + ext).width <= maxWidth) {
      truncated = tempTruncated;
      break;
    }
    left--;
    right++;
  }

  return truncated;
};
