import { format } from "date-fns";

export function fTime(date: string | Date, newFormat?: string) {
  const fm = newFormat || "p";

  return date ? format(new Date(date), fm) : "";
}

export function fDate(date: string | Date, newFormat?: string) {
  const fm = newFormat || "dd MMM yyyy";

  return date ? format(new Date(date), fm) : "";
}

/// other utils

export function paramCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
