import { IFile } from "@/types";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

// Extracts file extension from a given filename
export function getFileExtension(fileName: string): string {
  return fileName.split(".").pop() || "";
}

// Removes file extension from a given filename
export function removeFileExtension(fileName: string): string {
  return fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
}

// Handles media file conversion using FFmpeg
export default async function convertFile(
  ffmpeg: FFmpeg,
  action: IFile
): Promise<{ url: string; output: string }> {
  const { file, to, file_name, file_type } = action;

  const inputExt = getFileExtension(file_name);
  const outputFileName = `${removeFileExtension(file_name)}.${to}`;

  await ffmpeg.writeFile(inputExt, await fetchFile(file));

  // Define FFmpeg command based on output format
  const ffmpegCmd: string[] =
    to === "3gp"
      ? [
          "-i",
          inputExt,
          "-r",
          "20",
          "-s",
          "352x288",
          "-vb",
          "400k",
          "-acodec",
          "aac",
          "-strict",
          "experimental",
          "-ac",
          "1",
          "-ar",
          "8000",
          "-ab",
          "24k",
          outputFileName,
        ]
      : ["-i", inputExt, "-codec", "copy", outputFileName];

  await ffmpeg.exec(ffmpegCmd);

  const outputData = await ffmpeg.readFile(outputFileName);
  const blob = new Blob([outputData], { type: file_type.split("/")[0] });
  const url = URL.createObjectURL(blob);

  return { url, output: outputFileName };
}
