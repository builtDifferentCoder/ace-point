import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import type { uploadRouter } from "@/app/api/uploadthing/core";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const UploadButton = generateUploadButton<uploadRouter>();
export const UploadDropzone = generateUploadDropzone<uploadRouter>();
