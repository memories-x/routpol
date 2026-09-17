/** Dönem penceresi planlama — createPeriodFromPaidCase ile aynı kural. */
export const PERIOD_DAYS = 30;

export function computePeriodWindow(params: {
  paidAt: Date;
  latestUnfinishedEnd: Date | null;
  periodDays?: number;
}): { start: Date; end: Date; status: "active" | "queued" } {
  const days = params.periodDays ?? PERIOD_DAYS;
  let start = params.paidAt;
  let status: "active" | "queued" = "active";

  if (params.latestUnfinishedEnd && params.latestUnfinishedEnd > params.paidAt) {
    start = new Date(params.latestUnfinishedEnd);
    status = "queued";
  }

  const end = new Date(start);
  end.setDate(end.getDate() + days);
  return { start, end, status };
}

/** Kuyruktaki dönemleri zincirle — restackQueuedPeriods ile aynı kural. */
export function chainQueuedPeriodEnds(
  queuedPeriodEnds: Date[],
  anchorEnd: Date | null,
  periodDays = PERIOD_DAYS,
): Date[] {
  let chainStart: Date | null = anchorEnd;
  const result: Date[] = [];

  for (const currentEnd of queuedPeriodEnds) {
    if (!chainStart) {
      chainStart = currentEnd;
      result.push(currentEnd);
      continue;
    }
    const newEnd = new Date(chainStart);
    newEnd.setDate(newEnd.getDate() + periodDays);
    result.push(newEnd);
    chainStart = newEnd;
  }

  return result;
}

/** İki dönem bitişi çakışıyor mu? */
export function periodsOverlap(
  a: { start: Date; end: Date },
  b: { start: Date; end: Date },
): boolean {
  return a.start < b.end && b.start < a.end;
}
