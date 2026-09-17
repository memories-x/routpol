import { formatCallSlot } from "@/lib/cases/call-schedule";
import {
  isLetterPackage,
  type LetterPackageSlug,
  type PackageSlug,
} from "@/lib/cases/document-slots";
import { packageLabelTr } from "@/lib/cases/package-labels";
import {
  aylikOverageAmountCents,
  productNameFor,
  tekYaziAmountCents,
} from "@/lib/cases/pricing";
import type { CasePricingMeta, CaseRecord } from "@/lib/cases/types";

/** Jedna pozycja faktury (VAT zw). */
export type InvoicePosition = {
  name: string;
  /** Dodatkowe linie pod nazwą w PDF. */
  details: string[];
  quantity: number;
  unit: string;
  unitNetCents: number;
  vatCents: number;
  grossCents: number;
};

function entityPl(entity: CasePricingMeta["entityType"]): string | null {
  if (entity === "sirket") return "firma (osoba prawna)";
  if (entity === "sahis") return "osoba fizyczna";
  return null;
}

function billingKindPl(
  kind: CaseRecord["payment"]["billingKind"],
): string | null {
  if (kind === "overage") return "Pismo poza limitem (overage)";
  if (kind === "quota_letter") return "Pismo w limicie abonamentu";
  if (kind === "sale") return "Sprzedaz uslugi";
  return null;
}

function packageTitlePl(
  slug: PackageSlug,
  meta: CasePricingMeta,
): string {
  if (isLetterPackage(slug)) {
    return productNameFor(slug, meta, "pl");
  }
  return `ROUTEPOL — ${packageLabelTr(slug)}`;
}

function commonDetails(record: CaseRecord): string[] {
  const out: string[] = [];
  out.push(`Nr sprawy: ${record.id}`);
  const kind = billingKindPl(record.payment.billingKind);
  if (kind) out.push(kind);
  const matter = record.customer.matter?.trim();
  if (matter) out.push(`Temat: ${matter}`);
  if (record.locale) out.push(`Jezyk zamowienia: ${record.locale}`);
  if (record.customer.resultLocale) {
    out.push(`Jezyk wyniku: ${record.customer.resultLocale}`);
  }
  return out;
}

function tekYaziPositions(
  record: CaseRecord,
  meta: CasePricingMeta,
): InvoicePosition[] {
  const pages = Math.max(1, Math.min(20, Math.floor(meta.pageCount ?? 2)));
  const total = record.payment.amountCents || tekYaziAmountCents(pages);
  const detailsBase = [
    ...commonDetails(record),
    `Liczba stron: ${pages}`,
    meta.pagesFromUpload
      ? "Strony zmierzone z przeslanego pliku"
      : "Strony wg deklaracji / minimum pakietu",
  ];

  if (pages <= 2) {
    return [
      {
        name: "ROUTEPOL — Jedno pismo (do 2 stron)",
        details: detailsBase,
        quantity: 1,
        unit: "szt",
        unitNetCents: total,
        vatCents: 0,
        grossCents: total,
      },
    ];
  }

  const base = 5000;
  const extraPages = pages - 2;
  const extraUnit = 2500;
  const expectedExtra = extraPages * extraUnit;
  const paidExtra = Math.max(0, total - base);
  // Prefer paid remainder so invoice total matches Stripe
  const extraGross = paidExtra > 0 ? paidExtra : expectedExtra;
  return [
    {
      name: "ROUTEPOL — Jedno pismo (pierwsze 2 strony)",
      details: detailsBase,
      quantity: 1,
      unit: "szt",
      unitNetCents: base,
      vatCents: 0,
      grossCents: base,
    },
    {
      name: `ROUTEPOL — Strony dodatkowe (${extraPages} x 25,00 zl)`,
      details: [
        "Stawka: 25,00 zl / strona powyzej 2",
        `Strony dodatkowe: ${extraPages}`,
      ],
      quantity: extraPages,
      unit: "str",
      unitNetCents: extraUnit,
      vatCents: 0,
      grossCents: extraGross,
    },
  ];
}

function singlePosition(
  record: CaseRecord,
  name: string,
  extraDetails: string[],
): InvoicePosition[] {
  const cents = record.payment.amountCents;
  return [
    {
      name,
      details: [...commonDetails(record), ...extraDetails],
      quantity: 1,
      unit: "szt",
      unitNetCents: cents,
      vatCents: 0,
      grossCents: cents,
    },
  ];
}

function letterSlugPositions(
  record: CaseRecord,
  slug: LetterPackageSlug,
  meta: CasePricingMeta,
): InvoicePosition[] {
  if (record.payment.billingKind === "overage") {
    const over = aylikOverageAmountCents();
    return singlePosition(
      record,
      "ROUTEPOL — Pismo poza limitem pakietu miesiecznego",
      [
        `Kwota overage: ${(over / 100).toFixed(2).replace(".", ",")} zl`,
        meta.fileQuota
          ? `Limit pakietu (okres): ${meta.fileQuota} plikow`
          : "Limit pakietu wg aktywnego okresu",
      ],
    );
  }

  if (slug === "tek-yazi") return tekYaziPositions(record, meta);

  if (slug === "aylik-paket") {
    const q = meta.fileQuota ?? 4;
    return singlePosition(
      record,
      packageTitlePl(slug, meta),
      [
        `Limit plikow w okresie: ${q}`,
        "Abonament miesieczny (Stripe) — oplata takze bez pism",
        "Niewykorzystany limit nie przechodzi",
      ],
    );
  }

  if (slug === "surec-yonetimi") {
    const e = entityPl(meta.entityType);
    return singlePosition(record, packageTitlePl(slug, meta), [
      e ? `Typ podmiotu: ${e}` : "Typ podmiotu: —",
      "Usluga mostkowa (ROUTEPOL) — nie zastępuje kancelarii",
    ]);
  }

  if (slug === "telefon-gorusme") {
    const e = entityPl(meta.entityType);
    const details = [
      "Czas trwania: 1 godzina",
      e ? `Typ podmiotu: ${e}` : "",
    ].filter(Boolean);
    if (meta.callRequestedAt) {
      details.push(
        `Preferowany termin: ${formatCallSlot(meta.callRequestedAt, "pl")} (czas warszawski)`,
      );
    }
    return singlePosition(record, packageTitlePl(slug, meta), details);
  }

  if (slug === "yerinde-eslik") {
    const e = entityPl(meta.entityType);
    const details = [
      "Zakres: pol dnia (ok. 3–4 godz., 1 instytucja)",
      meta.city?.trim() ? `Miasto: ${meta.city.trim()}` : "Miasto: —",
      e ? `Typ podmiotu: ${e}` : "",
      "Dojazd poza miastem — osobno (jesli uzgodniono)",
    ].filter(Boolean);
    return singlePosition(record, packageTitlePl(slug, meta), details);
  }

  return singlePosition(record, packageTitlePl(slug, meta), []);
}

/**
 * Pozycje faktury z case — pełny pakiet + pricingMeta + billingKind.
 * Język dokumentu: PL (faktura lokalna / KSeF).
 * Suma gross = payment.amountCents (dopasowanie do Stripe).
 */
export function buildInvoicePositions(record: CaseRecord): InvoicePosition[] {
  const slug = record.packageSlug;
  const meta = record.pricingMeta ?? {};

  let positions = isLetterPackage(slug)
    ? letterSlugPositions(record, slug, meta)
    : singlePosition(record, packageTitlePl(slug, meta), [
        "Pakiet legacy / archiwalny",
      ]);

  const paid = record.payment.amountCents;
  const sum = positions.reduce((s, p) => s + p.grossCents, 0);
  if (positions.length > 0 && sum !== paid) {
    const last = positions[positions.length - 1]!;
    const delta = paid - (sum - last.grossCents);
    positions = [
      ...positions.slice(0, -1),
      {
        ...last,
        grossCents: Math.max(0, delta),
        unitNetCents:
          last.quantity > 0
            ? Math.round(Math.max(0, delta) / last.quantity)
            : Math.max(0, delta),
      },
    ];
  }

  return positions;
}

/** Jedna linia do maila / Fakturownia name (max ~240). */
export function invoicePositionSummary(record: CaseRecord): string {
  const positions = buildInvoicePositions(record);
  const primary = positions[0]?.name ?? `ROUTEPOL — ${record.packageSlug}`;
  if (positions.length === 1) {
    const bits = [primary, ...(positions[0]?.details ?? []).slice(0, 2)];
    return bits.join(" | ").slice(0, 240);
  }
  return positions
    .map((p) => p.name)
    .join(" + ")
    .slice(0, 240);
}

export function invoicePositionsGrossSum(positions: InvoicePosition[]): number {
  return positions.reduce((s, p) => s + p.grossCents, 0);
}
