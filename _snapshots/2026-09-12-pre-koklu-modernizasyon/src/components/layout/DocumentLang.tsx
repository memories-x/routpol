"use client";

import { useEffect } from "react";

/** Sync `<html lang>` with the active locale (root layout defaults to `tr`). */
export function DocumentLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
