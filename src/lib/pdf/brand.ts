/** ROUTEPOL chrome for deliverable PDFs — same tokens as pdf-cevirmen / public/brand. */

export const BRAND_NAME = "ROUTEPOL";
export const NAVY_RGB = { r: 15 / 255, g: 28 / 255, b: 46 / 255 };
export const TEAL_RGB = { r: 5 / 255, g: 150 / 255, b: 105 / 255 };

export type BrandLang = "tr" | "en" | "pl";

const BANNER: Record<BrandLang, string> = {
  tr: "ROUTEPOL  ·  BELGE CEVIRISI",
  pl: "ROUTEPOL  ·  TLUMACZENIE DOKUMENTU",
  en: "ROUTEPOL  ·  DOCUMENT TRANSLATION",
};

const FOOT: Record<BrandLang, string> = {
  tr: "ROUTEPOL  ·  Polonya’da yol gösteren rota.  ·  yeminli tercume degildir",
  pl: "ROUTEPOL  ·  Trasa, która prowadzi w Polsce.  ·  nie jest tlumaczeniem przysieglym",
  en: "ROUTEPOL  ·  The route that guides you in Poland.  ·  not a sworn translation",
};

export function isBrandLang(v: string): v is BrandLang {
  return v === "tr" || v === "en" || v === "pl";
}

export function brandBanner(lang: BrandLang, siteUrl?: string | null): string {
  void siteUrl;
  return BANNER[lang];
}

export function brandFooter(lang: BrandLang, siteUrl?: string | null): string {
  const base = FOOT[lang];
  const url = (siteUrl ?? "").trim().replace(/^https?:\/\//i, "");
  return url ? `${base}  ·  ${url}` : base;
}

/** mm → PDF points */
export const MM = 72 / 25.4;

export type ChromeMetrics = {
  headH: number;
  stripe: number;
  footH: number;
  footS: number;
  side: number;
  dotY: number;
  dotR: number;
  topBox: [number, number];
  botBox: [number, number];
  fsH: number;
  fsF: number;
};

export function chromeMetrics(thin: boolean): ChromeMetrics {
  if (thin) {
    return {
      headH: 10.0,
      stripe: 11.4,
      footH: 8.0,
      footS: 9.0,
      side: 6.0,
      dotY: 5.0,
      dotR: 1.6,
      topBox: [2.4, 9.2],
      botBox: [7.2, 1.6],
      fsH: 7.2,
      fsF: 6.0,
    };
  }
  return {
    headH: 16.0,
    stripe: 18.2,
    footH: 11.0,
    footS: 12.1,
    side: 8.0,
    dotY: 8.0,
    dotR: 2.1,
    topBox: [4.5, 14.5],
    botBox: [10.2, 2.8],
    fsH: 8.5,
    fsF: 6.5,
  };
}
