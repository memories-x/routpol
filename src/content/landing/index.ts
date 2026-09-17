/** ROUTEPOL kamu landing — types + TR/PL/EN bodies. */

export type {
  LandingContent,
  LandingLocale,
  LandingNavItem,
} from "./types";
export { landingTr } from "./tr";
export { landingPl } from "./pl";
export { landingEn } from "./en";

import type { LandingContent } from "./types";
import { landingEn } from "./en";
import { landingPl } from "./pl";
import { landingTr } from "./tr";

export function getLandingContent(locale: string): LandingContent {
  if (locale === "pl") return landingPl;
  if (locale === "en") return landingEn;
  return landingTr;
}
