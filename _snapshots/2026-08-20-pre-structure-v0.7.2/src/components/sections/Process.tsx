import { SectionIntro } from "@/components/sections/SectionIntro";
import type { SiteContent } from "@/content/types";

type ProcessProps = {
  content: SiteContent;
};

export function Process({ content }: ProcessProps) {
  const steps = Array.isArray(content.process.steps)
    ? content.process.steps
    : [];

  return (
    <section id="surec" className="scroll-mt-20 bg-pt-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionIntro title={content.process.title} />

        <ol className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              {index < steps.length - 1 ? (
                <span
                  className="pointer-events-none absolute left-[1.125rem] top-10 hidden h-px w-[calc(100%+2rem)] bg-pt-border lg:block"
                  aria-hidden
                />
              ) : null}
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-pt-emerald-600 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold text-pt-navy-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-pt-slate-600">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
