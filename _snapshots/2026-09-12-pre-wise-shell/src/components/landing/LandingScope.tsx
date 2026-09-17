import type { LandingContent } from "@/content/landing";
import { Check, X } from "lucide-react";

type Props = { content: LandingContent };

/** Tam genişlik koyu dürüstlük bandı — ada kart değil. */
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
      className="scroll-mt-20 w-full bg-pt-navy-950 py-16 text-white md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-pt-emerald-400">
          {content.scope.eyebrow}
        </p>
        <h2 className="mt-2 max-w-2xl font-display text-3xl md:text-4xl">
          {content.scope.title}
        </h2>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-0">
          <div className="md:pr-12">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-pt-emerald-400">
              {content.scope.includedTitle}
            </h3>
            <ul className="mt-5 space-y-3.5">
              {included.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-sm leading-relaxed text-white/88"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-pt-emerald-400"
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-white/15 pt-12 md:border-l md:border-t-0 md:pl-12 md:pt-0">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/55">
              {content.scope.excludedTitle}
            </h3>
            <ul className="mt-5 space-y-3.5">
              {excluded.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-sm leading-relaxed text-white/70"
                >
                  <X
                    className="mt-0.5 h-4 w-4 shrink-0 text-white/40"
                    aria-hidden
                  />
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
