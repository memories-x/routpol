"use client";

import { SectionIntro } from "@/components/sections/SectionIntro";
import { PtReveal } from "@/components/ui/PtReveal";
import type { FaqItem } from "@/content/types";

type FaqProps = {
  faq: { title: string; items: FaqItem[] };
};

export function Faq({ faq }: FaqProps) {
  const items = Array.isArray(faq.items) ? faq.items : [];

  return (
    <section id="sss" className="scroll-mt-20 bg-pt-bg py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <PtReveal>
          <SectionIntro title={faq.title} />
        </PtReveal>
        <PtReveal delay={0.08} className="mt-10">
          <div className="divide-y divide-pt-border overflow-hidden rounded-2xl border border-pt-border bg-pt-surface shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_32px_-24px_rgba(15,23,42,0.3)]">
            {items.map((item) => (
              <details key={item.id} className="group px-5 md:px-6">
                <summary className="cursor-pointer list-none py-5 font-medium text-pt-navy-950 marker:content-none transition-colors duration-200 hover:text-pt-emerald-800 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    <span>{item.question}</span>
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pt-emerald-50 text-pt-emerald-700 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="pb-5 pr-10 text-sm leading-relaxed text-pt-slate-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </PtReveal>
      </div>
    </section>
  );
}
