import { format } from "date-fns";

export function fTime(date: string | Date, newFormat?: string) {
  const fm = newFormat || "p";

  return date ? format(new Date(date), fm) : "";
}

export function fDate(date: string | Date, newFormat?: string) {
  const fm = newFormat || "dd MMM yyyy";

  return date ? format(new Date(date), fm) : "";
}
