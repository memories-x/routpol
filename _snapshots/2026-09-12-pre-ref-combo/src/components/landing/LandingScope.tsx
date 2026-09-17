import type { LandingContent } from "@/content/landing";
import { Check, X } from "lucide-react";

type Props = { content: LandingContent };

/** Honesty band — Wise clarity, navy authority. */
export function LandingScope({ content }: Props) {
  const included = Array.isArray(content.scope.included)
    ? content.scope.included
    : [];
  const excluded = Array.isArray(content.scope.excluded)
    ? content.scope.excluded
    : [];

  return (
    <section
      id="sinirlar"
      className="scroll-mt-20 w-full bg-pt-navy-950 py-16 text-white md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pt-emerald-400">
          {content.scope.eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {content.scope.title}
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 md:p-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-pt-emerald-400">
              {content.scope.includedTitle}
            </h3>
            <ul className="mt-6 space-y-4">
              {included.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-sm leading-relaxed text-white/90"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pt-emerald-600/25">
                    <Check className="h-3 w-3 text-pt-emerald-400" aria-hidden />
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 md:p-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              {content.scope.excludedTitle}
            </h3>
            <ul className="mt-6 space-y-4">
              {excluded.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-sm leading-relaxed text-white/65"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <X className="h-3 w-3 text-white/45" aria-hidden />
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
