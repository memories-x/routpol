import { Container, SectionHeading } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import type { SiteContent } from "@/content/types";
import { Check, Scale, X } from "lucide-react";

type ScopeProps = {
  content: SiteContent;
};

export function Scope({ content }: ScopeProps) {
  const { scope } = content;
  const included = Array.isArray(scope.included) ? scope.included : [];
  const excluded = Array.isArray(scope.excluded) ? scope.excluded : [];

  return (
    <Section id="sinirlar" className="bg-pt-navy-950 text-white pt-reveal">
      <Container>
        <SectionHeading className="text-white">{scope.title}</SectionHeading>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-pt-emerald-400">
              {scope.includedTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              {included.map((line) => (
                <li key={line} className="flex gap-3 text-pt-slate-200">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-pt-emerald-400"
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-pt-navy-900/50 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-pt-slate-400">
              {scope.excludedTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              {excluded.map((line) => (
                <li key={line} className="flex gap-3 text-pt-slate-300">
                  <X
                    className="mt-0.5 h-4 w-4 shrink-0 text-pt-slate-500"
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="mt-10 flex gap-4 rounded-xl border border-pt-emerald-600/30 bg-pt-emerald-600/10 px-5 py-5 md:px-6">
          <Scale
            className="mt-0.5 h-5 w-5 shrink-0 text-pt-emerald-400"
            aria-hidden
          />
          <div>
            <h3 className="text-base font-semibold text-white">
              {scope.collaboration.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-pt-slate-200">
              {scope.collaboration.body}
            </p>
          </div>
        </aside>
      </Container>
    </Section>
  );
}
