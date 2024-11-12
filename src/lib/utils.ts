import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function enumToOptions(enumObj: object) {
  return Object.entries(enumObj).map(([key, value]) => ({
    label: key,
    value: value,
  }));
}
