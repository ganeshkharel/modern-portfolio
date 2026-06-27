import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function isVideo(src: string) {
  return /\.(mp4|webm|mov)$/i.test(src);
}
