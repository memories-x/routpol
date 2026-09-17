import type { DocumentSlotDef } from "./document-slots";
import type { ResidenceSelection } from "./residence-slots";

/**
 * Województwo layer for oturum-dosyasi.
 * - National attachment lists: residence-slots.ts (UDSC MOS, Dz.U. 2026/553, cited WSC)
 * - Here: which WSC portal / inPOL to use + optional local extras ONLY when sourced
 */

export type VoivodeshipKey =
  | "dolnoslaskie"
  | "kujawsko-pomorskie"
  | "lubelskie"
  | "lubuskie"
  | "lodzkie"
  | "malopolskie"
  | "mazowieckie"
  | "opolskie"
  | "podkarpackie"
  | "podlaskie"
  | "pomorskie"
  | "slaskie"
  | "swietokrzyskie"
  | "warminsko-mazurskie"
  | "wielkopolskie"
  | "zachodniopomorskie";

export type VoivodeshipMeta = {
  key: VoivodeshipKey;
  labelTr: string;
  labelPl: string;
  labelEn: string;
  /** Official foreigners / migrant info portal when known */
  wscUrl: string;
  /** Case-status portal if known */
  inpolUrl?: string;
  depth: "national-only" | "local-extras";
  verifiedAt?: string;
  noteTr: string;
  notePl: string;
  noteEn: string;
};

/** Profile fingerprint for local extras */
export function residenceProfileKey(sel: ResidenceSelection): string {
  if (sel.track === "rezydent-ue") return "rezydent-ue";
  if (sel.track === "blue-card") return "blue-card";
  if (sel.track === "pobyt-staly") return `staly:${sel.basis ?? "inne"}`;
  if (sel.track === "pobyt-czasowy") {
    const p = sel.purpose ?? "praca";
    if (p === "rodzina") return `czasowy:rodzina:${sel.familyLink ?? "inne"}`;
    return `czasowy:${p}`;
  }
  return "unknown";
}

export const voivodeships: VoivodeshipMeta[] = [
  {
    key: "dolnoslaskie",
    labelTr: "Dolnośląskie (Wrocław)",
    labelPl: "dolnośląskie",
    labelEn: "Lower Silesian",
    wscUrl: "https://www.duw.pl/",
    depth: "national-only",
    noteTr: "Başvurunuz seçilen voyvodalıkta incelenir.",
    notePl: "Sprawa będzie prowadzona we wskazanym województwie.",
    noteEn: "Your case will be handled in the selected voivodeship.",
  },
  {
    key: "kujawsko-pomorskie",
    labelTr: "Kujawsko-pomorskie (Bydgoszcz/Toruń)",
    labelPl: "kujawsko-pomorskie",
    labelEn: "Kuyavian-Pomeranian",
    wscUrl: "https://www.bydgoszcz.uw.gov.pl/",
    depth: "national-only",
    noteTr: "Başvurunuz seçilen voyvodalıkta incelenir.",
    notePl: "Sprawa będzie prowadzona we wskazanym województwie.",
    noteEn: "Your case will be handled in the selected voivodeship.",
  },
  {
    key: "lubelskie",
    labelTr: "Lubelskie (Lublin)",
    labelPl: "lubelskie",
    labelEn: "Lublin",
    wscUrl: "https://www.lublin.uw.gov.pl/",
    depth: "national-only",
    noteTr: "Başvurunuz seçilen voyvodalıkta incelenir.",
    notePl: "Sprawa będzie prowadzona we wskazanym województwie.",
    noteEn: "Your case will be handled in the selected voivodeship.",
  },
  {
    key: "lubuskie",
    labelTr: "Lubuskie (Gorzów Wlkp.)",
    labelPl: "lubuskie",
    labelEn: "Lubusz",
    wscUrl: "https://www.luw.pl/",
    depth: "national-only",
    noteTr: "Başvurunuz seçilen voyvodalıkta incelenir.",
    notePl: "Sprawa będzie prowadzona we wskazanym województwie.",
    noteEn: "Your case will be handled in the selected voivodeship.",
  },
  {
    key: "lodzkie",
    labelTr: "Łódzkie (Łódź)",
    labelPl: "łódzkie",
    labelEn: "Łódź",
    wscUrl: "https://www.lodzkie.eu/",
    depth: "national-only",
    noteTr: "Başvurunuz seçilen voyvodalıkta incelenir.",
    notePl: "Sprawa będzie prowadzona we wskazanym województwie.",
    noteEn: "Your case will be handled in the selected voivodeship.",
  },
  {
    key: "malopolskie",
    labelTr: "Małopolskie (Kraków)",
    labelPl: "małopolskie",
    labelEn: "Lesser Poland",
    wscUrl: "https://www.malopolska.uw.gov.pl/",
    depth: "national-only",
    noteTr: "Başvurunuz seçilen voyvodalıkta incelenir.",
    notePl: "Sprawa będzie prowadzona we wskazanym województwie.",
    noteEn: "Your case will be handled in the selected voivodeship.",
  },
  {
    key: "mazowieckie",
    labelTr: "Mazowieckie (Warszawa)",
    labelPl: "mazowieckie",
    labelEn: "Masovian",
    wscUrl: "https://migrant.wsc.mazowieckie.pl/",
    inpolUrl: "https://inpol.mazowieckie.pl/login",
    depth: "national-only",
    verifiedAt: "2026-08-07",
    noteTr: "Başvurunuz seçilen voyvodalıkta incelenir.",
    notePl: "Sprawa będzie prowadzona we wskazanym województwie.",
    noteEn: "Your case will be handled in the selected voivodeship.",
  },
  {
    key: "opolskie",
    labelTr: "Opolskie (Opole)",
    labelPl: "opolskie",
    labelEn: "Opole",
    wscUrl: "https://www.opole.uw.gov.pl/",
    depth: "national-only",
    noteTr: "Başvurunuz seçilen voyvodalıkta incelenir.",
    notePl: "Sprawa będzie prowadzona we wskazanym województwie.",
    noteEn: "Your case will be handled in the selected voivodeship.",
  },
  {
    key: "podkarpackie",
    labelTr: "Podkarpackie (Rzeszów)",
    labelPl: "podkarpackie",
    labelEn: "Subcarpathian",
    wscUrl: "https://www.rzeszow.uw.gov.pl/",
    depth: "national-only",
    noteTr: "Başvurunuz seçilen voyvodalıkta incelenir.",
    notePl: "Sprawa będzie prowadzona we wskazanym województwie.",
    noteEn: "Your case will be handled in the selected voivodeship.",
  },
  {
    key: "podlaskie",
    labelTr: "Podlaskie (Białystok)",
    labelPl: "podlaskie",
    labelEn: "Podlaskie",
    wscUrl: "https://www.bialystok.uw.gov.pl/",
    depth: "national-only",
    noteTr: "Başvurunuz seçilen voyvodalıkta incelenir.",
    notePl: "Sprawa będzie prowadzona we wskazanym województwie.",
    noteEn: "Your case will be handled in the selected voivodeship.",
  },
  {
    key: "pomorskie",
    labelTr: "Pomorskie (Gdańsk)",
    labelPl: "pomorskie",
    labelEn: "Pomeranian",
    wscUrl: "https://wsc.gdansk.uw.gov.pl/",
    depth: "national-only",
    noteTr: "Başvurunuz seçilen voyvodalıkta incelenir.",
    notePl: "Sprawa będzie prowadzona we wskazanym województwie.",
    noteEn: "Your case will be handled in the selected voivodeship.",
  },
  {
    key: "slaskie",
    labelTr: "Śląskie (Katowice)",
    labelPl: "śląskie",
    labelEn: "Silesian",
    wscUrl: "https://www.katowice.uw.gov.pl/",
    depth: "national-only",
    noteTr: "Başvurunuz seçilen voyvodalıkta incelenir.",
    notePl: "Sprawa będzie prowadzona we wskazanym województwie.",
    noteEn: "Your case will be handled in the selected voivodeship.",
  },
  {
    key: "swietokrzyskie",
    labelTr: "Świętokrzyskie (Kielce)",
    labelPl: "świętokrzyskie",
    labelEn: "Holy Cross",
    wscUrl: "https://www.kielce.uw.gov.pl/",
    depth: "national-only",
    noteTr: "Başvurunuz seçilen voyvodalıkta incelenir.",
    notePl: "Sprawa będzie prowadzona we wskazanym województwie.",
    noteEn: "Your case will be handled in the selected voivodeship.",
  },
  {
    key: "warminsko-mazurskie",
    labelTr: "Warmińsko-mazurskie (Olsztyn)",
    labelPl: "warmińsko-mazurskie",
    labelEn: "Warmian-Masurian",
    wscUrl: "https://www.olsztyn.uw.gov.pl/",
    depth: "national-only",
    noteTr: "Başvurunuz seçilen voyvodalıkta incelenir.",
    notePl: "Sprawa będzie prowadzona we wskazanym województwie.",
    noteEn: "Your case will be handled in the selected voivodeship.",
  },
  {
    key: "wielkopolskie",
    labelTr: "Wielkopolskie (Poznań)",
    labelPl: "wielkopolskie",
    labelEn: "Greater Poland",
    wscUrl: "https://migrant.poznan.uw.gov.pl/",
    depth: "national-only",
    noteTr: "Başvurunuz seçilen voyvodalıkta incelenir.",
    notePl: "Sprawa będzie prowadzona we wskazanym województwie.",
    noteEn: "Your case will be handled in the selected voivodeship.",
  },
  {
    key: "zachodniopomorskie",
    labelTr: "Zachodniopomorskie (Szczecin)",
    labelPl: "zachodniopomorskie",
    labelEn: "West Pomeranian",
    wscUrl: "https://www.szczecin.uw.gov.pl/",
    depth: "national-only",
    noteTr: "Başvurunuz seçilen voyvodalıkta incelenir.",
    notePl: "Sprawa będzie prowadzona we wskazanym województwie.",
    noteEn: "Your case will be handled in the selected voivodeship.",
  },
];

/**
 * Local attachment extras per województwo × profile.
 * RULE: only add DocumentSlotDef rows that a cited WSC/UDSC page lists as
 * documents to attach. Process tips (e-Doręczenia, PESEL, inPOL) belong in
 * next-steps.ts — NOT as invented upload slots.
 * Currently empty: national residence-slots.ts holds sourced MOS/UDSC/WSC lists.
 */
const localExtrasByVoivodeship: Partial<
  Record<VoivodeshipKey, Record<string, DocumentSlotDef[]>>
> = {
  // Example when a WSC checklist adds a real attachment beyond national core:
  // mazowieckie: { "czasowy:praca": [ /* sourced slots only */ ] },
};

export function isVoivodeshipKey(v: string): v is VoivodeshipKey {
  return voivodeships.some((x) => x.key === v);
}

export function getVoivodeship(key: string): VoivodeshipMeta | undefined {
  return voivodeships.find((v) => v.key === key);
}

export function voivodeshipLabel(key: VoivodeshipKey, locale: string): string {
  const meta = getVoivodeship(key);
  if (!meta) return key;
  if (locale === "pl") return meta.labelPl;
  if (locale === "en") return meta.labelEn;
  return meta.labelTr;
}

export function voivodeshipNote(key: VoivodeshipKey, locale: string): string {
  const meta = getVoivodeship(key);
  if (!meta) return "";
  if (locale === "pl") return meta.notePl;
  if (locale === "en") return meta.noteEn;
  return meta.noteTr;
}

export function localSlotsFor(
  wojewodztwo: string | null | undefined,
  residence: ResidenceSelection | null | undefined,
): DocumentSlotDef[] {
  if (!wojewodztwo || !isVoivodeshipKey(wojewodztwo) || !residence) return [];
  const map = localExtrasByVoivodeship[wojewodztwo];
  if (!map) return [];
  const profile = residenceProfileKey(residence);
  return map[profile] ?? map[profile.split(":").slice(0, 2).join(":")] ?? [];
}

/** Dedupe by slot key — national wins first, local appends new keys only */
export function mergeNationalAndLocal(
  national: DocumentSlotDef[],
  local: DocumentSlotDef[],
): DocumentSlotDef[] {
  const seen = new Set(national.map((s) => s.key));
  const out = [...national];
  for (const s of local) {
    if (seen.has(s.key)) continue;
    seen.add(s.key);
    out.push(s);
  }
  return out;
}
