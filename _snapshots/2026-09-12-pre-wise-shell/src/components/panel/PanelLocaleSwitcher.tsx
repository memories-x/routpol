"use client";

import {
  getPanelStrings,
  isPanelLocale,
  PANEL_LOCALE_COOKIE,
  type PanelLocale,
} from "@/lib/panel-i18n";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LOCALES: PanelLocale[] = ["tr", "pl", "en"];

function readCookie(): PanelLocale {
  if (typeof document === "undefined") return "tr";
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${PANEL_LOCALE_COOKIE}=`));
  const value = match?.split("=")[1];
  return isPanelLocale(value) ? value : "tr";
}

export function PanelLocaleSwitcher() {
  const router = useRouter();
  const [locale, setLocale] = useState<PanelLocale>("tr");

  useEffect(() => {
    setLocale(readCookie());
  }, []);

  function onChange(next: PanelLocale) {
    document.cookie = `${PANEL_LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    setLocale(next);
    router.refresh();
  }

  return (
    <div className="flex shrink-0 rounded-md border border-pt-border text-[11px] font-medium uppercase">
      {LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => onChange(loc)}
          className={
            locale === loc
              ? "bg-pt-aws-ink px-2 py-1 text-white"
              : "px-2 py-1 text-pt-slate-600 hover:bg-pt-bg"
          }
          aria-pressed={locale === loc}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}

export function usePanelLocale(): PanelLocale {
  const [locale, setLocale] = useState<PanelLocale>("tr");
  useEffect(() => {
    setLocale(readCookie());
  }, []);
  return locale;
}

export function usePanelStrings() {
  const locale = usePanelLocale();
  return getPanelStrings(locale);
}
