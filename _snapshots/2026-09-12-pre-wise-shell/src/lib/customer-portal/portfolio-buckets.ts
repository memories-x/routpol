export type PortfolioBucket = "open" | "ready" | "archive";

export function casePortfolioBucket(c: {
  status: string;
  hasResult: boolean;
}): PortfolioBucket {
  if (c.status === "closed") return "archive";
  if (c.hasResult) return "ready";
  return "open";
}

export function splitPortfolio<T extends { status: string; hasResult: boolean }>(
  cases: T[] | null | undefined,
): { open: T[]; ready: T[]; archive: T[] } {
  const list = Array.isArray(cases) ? cases : [];
  return {
    open: list.filter((c) => casePortfolioBucket(c) === "open"),
    ready: list.filter((c) => casePortfolioBucket(c) === "ready"),
    archive: list.filter((c) => casePortfolioBucket(c) === "archive"),
  };
}

/** Delivered work: result uploaded or case closed. Newest first. */
export function historyCases<
  T extends { status: string; hasResult: boolean; updatedAt: string },
>(cases: T[] | null | undefined): T[] {
  const list = Array.isArray(cases) ? cases : [];
  return list
    .filter((c) => casePortfolioBucket(c) !== "open")
    .slice()
    .sort((a, b) => {
      const ta = Date.parse(a.updatedAt);
      const tb = Date.parse(b.updatedAt);
      const na = Number.isFinite(ta) ? ta : 0;
      const nb = Number.isFinite(tb) ? tb : 0;
      return nb - na;
    });
}

export function groupHistoryByYear<T extends { updatedAt: string }>(
  cases: T[] | null | undefined,
): { year: string; rows: T[] }[] {
  const list = Array.isArray(cases) ? cases : [];
  const map = new Map<string, T[]>();
  for (const row of list) {
    const t = Date.parse(row.updatedAt);
    const year = Number.isFinite(t)
      ? String(new Date(t).getFullYear())
      : "—";
    const bucket = map.get(year);
    if (bucket) bucket.push(row);
    else map.set(year, [row]);
  }
  return [...map.entries()]
    .sort((a, b) => {
      if (a[0] === "—") return 1;
      if (b[0] === "—") return -1;
      return Number(b[0]) - Number(a[0]);
    })
    .map(([year, rows]) => ({ year, rows }));
}
