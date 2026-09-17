import { en } from "./en";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { resolvePublicContact } from "@/lib/env";
import { pl } from "./pl";
import { tr } from "./tr";
import type { SiteContent } from "./types";

const catalog: Record<Locale, SiteContent> = {
  tr,
  pl,
  en,
};

export function getContent(locale: string): SiteContent {
  const base = isLocale(locale) ? catalog[locale] : catalog[defaultLocale];
  const contactOverlay = resolvePublicContact({
    emailValue: base.contact.emailValue,
    phoneValue: base.contact.phoneValue,
  });
  return {
    ...base,
    contact: {
      ...base.contact,
      emailValue: contactOverlay.emailValue,
      phoneValue: contactOverlay.phoneValue,
    },
  };
}

export type { SiteContent };
