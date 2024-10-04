import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  const config: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  };

  if (isToday(timestamp)) {
    delete config.day;
    delete config.month;
  }

  return date.toLocaleString("en-US", config);
}

export function isToday(date: Date | string) {
  return new Date(date).toDateString() === new Date().toDateString();
}

export function twClassNames(...classNames: ClassValue[]) {
  return twMerge(clsx(classNames));
}
