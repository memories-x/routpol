/** Polish amount-in-words for invoice “Słownie” (PLN). ASCII-safe for Helvetica. */

const ONES = [
  "",
  "jeden",
  "dwa",
  "trzy",
  "cztery",
  "piec",
  "szesc",
  "siedem",
  "osiem",
  "dziewiec",
];
const TEENS = [
  "dziesiec",
  "jedenascie",
  "dwanascie",
  "trzynascie",
  "czternascie",
  "pietnascie",
  "szesnascie",
  "siedemnascie",
  "osiemnascie",
  "dziewietnascie",
];
const TENS = [
  "",
  "",
  "dwadziescia",
  "trzydziesci",
  "czterdziesci",
  "piecdziesiat",
  "szescdziesiat",
  "siedemdziesiat",
  "osiemdziesiat",
  "dziewiecdziesiat",
];
const HUNDREDS = [
  "",
  "sto",
  "dwiescie",
  "trzysta",
  "czterysta",
  "piecset",
  "szescset",
  "siedemset",
  "osiemset",
  "dziewiecset",
];

function underThousand(n: number): string {
  if (n <= 0) return "";
  const parts: string[] = [];
  const h = Math.floor(n / 100);
  const rem = n % 100;
  if (h) parts.push(HUNDREDS[h]!);
  if (rem >= 10 && rem < 20) {
    parts.push(TEENS[rem - 10]!);
  } else {
    const t = Math.floor(rem / 10);
    const o = rem % 10;
    if (t) parts.push(TENS[t]!);
    if (o) parts.push(ONES[o]!);
  }
  return parts.filter(Boolean).join(" ");
}

function zlotyForm(n: number): string {
  if (n === 1) return "zloty";
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
    return "zlote";
  }
  return "zlotych";
}

function groszForm(n: number): string {
  if (n === 1) return "grosz";
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
    return "grosze";
  }
  return "groszy";
}

function scaleWord(n: number, one: string, few: string, many: string): string {
  if (n === 1) return one;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return few;
  return many;
}

/** cents → e.g. "sto dziewiecdziesiat dziewiec zlotych 00/100" */
export function amountInWordsPln(cents: number): string {
  const abs = Math.abs(Math.trunc(cents));
  const zl = Math.floor(abs / 100);
  const gr = abs % 100;

  if (zl === 0) {
    return `zero zlotych ${String(gr).padStart(2, "0")}/100`;
  }

  const parts: string[] = [];
  const millions = Math.floor(zl / 1_000_000);
  const thousands = Math.floor((zl % 1_000_000) / 1000);
  const rest = zl % 1000;

  if (millions) {
    parts.push(underThousand(millions));
    parts.push(scaleWord(millions, "milion", "miliony", "milionow"));
  }
  if (thousands) {
    if (thousands === 1) {
      parts.push("tysiac");
    } else {
      parts.push(underThousand(thousands));
      parts.push(scaleWord(thousands, "tysiac", "tysiace", "tysiecy"));
    }
  }
  if (rest) parts.push(underThousand(rest));

  parts.push(zlotyForm(zl));
  parts.push(`${String(gr).padStart(2, "0")}/100`);
  return parts.join(" ");
}
