"use client";

import { PtReveal } from "@/components/ui/PtReveal";
import type { LandingContent } from "@/content/landing";
import { Check, X } from "lucide-react";

type Props = { content: LandingContent };

/**
 * Revolut honesty band + Stripe section reveal craft.
 */
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
      className="scroll-mt-20 w-full bg-pt-navy-950 py-20 text-white md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <PtReveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pt-emerald-400">
            {content.scope.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {content.scope.title}
          </h2>
        </PtReveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
          <PtReveal delay={0.06}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-pt-emerald-400">
              {content.scope.includedTitle}
            </h3>
            <ul className="mt-6 space-y-4">
              {included.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-sm leading-relaxed text-white/90"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pt-emerald-600/30">
                    <Check className="h-3 w-3 text-pt-emerald-400" aria-hidden />
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </PtReveal>
          <PtReveal delay={0.12}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
              {content.scope.excludedTitle}
            </h3>
            <ul className="mt-6 space-y-4">
              {excluded.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-sm leading-relaxed text-white/60"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <X className="h-3 w-3 text-white/40" aria-hidden />
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </PtReveal>
        </div>
      </div>
    </section>
  );
}
