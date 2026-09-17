import { isLocale } from "@/lib/i18n";

/** Replace the locale segment in a pathname; keep the rest of the path. */
export function swapLocalePath(pathname: string, nextLocale: string): string {
  const parts = pathname.split("/");
  if (parts.length >= 2 && isLocale(parts[1])) {
    parts[1] = nextLocale;
    const next = parts.join("/");
    return next.length > 0 ? next : `/${nextLocale}`;
  }
  return `/${nextLocale}`;
}
