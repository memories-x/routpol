"use client";

import type { SiteContent } from "@/content/types";

type Props = {
  steps: SiteContent["portalSteps"]["steps"];
  status: string;
  hasResult: boolean;
  paid: boolean;
};

function activeStep(status: string, hasResult: boolean, paid: boolean): number {
  if (hasResult || status === "closed") return 3;
  if (status === "in_progress") return 2;
  if (paid || status === "paid") return 1;
  if (status === "awaiting_payment") return 0;
  return 0;
}

export function CaseStatusSteps({ steps, status, hasResult, paid }: Props) {
  const list = Array.isArray(steps) ? steps : [];
  const current = activeStep(status, hasResult, paid);

  return (
    <ol className="mt-6 flex flex-wrap gap-2 sm:justify-between">
      {list.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li
            key={label}
            className="flex min-w-[5rem] flex-1 flex-col items-center gap-2 text-center sm:min-w-0"
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold ${
                done
                  ? "bg-pt-emerald-600 text-white"
                  : active
                    ? "border-2 border-pt-emerald-600 bg-pt-emerald-50 text-pt-emerald-700"
                    : "border border-pt-border bg-pt-surface text-pt-slate-400"
              }`}
            >
              {done ? (
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M3 8.5 6.5 12 13 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            <span
              className={`text-[10px] font-medium uppercase tracking-wide sm:text-xs ${
                active || done ? "text-pt-aws-ink" : "text-pt-slate-400"
              }`}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
