import { Container, SectionHeading } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import type { SiteContent } from "@/content/types";

type ProcessProps = {
  content: SiteContent;
};

export function Process({ content }: ProcessProps) {
  const steps = Array.isArray(content.process.steps)
    ? content.process.steps
    : [];

  return (
    <Section id="surec" className="bg-pt-bg">
      <Container>
        <SectionHeading>{content.process.title}</SectionHeading>
        <ol className="relative mt-12 md:flex md:justify-between md:gap-4">
          <div
            className="absolute left-4 top-8 hidden h-0.5 w-[calc(100%-2rem)] bg-pt-border md:block"
            aria-hidden
          />
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative pt-reveal flex gap-4 pb-8 md:flex-1 md:flex-col md:items-center md:pb-0 md:text-center"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pt-navy-900 font-display text-sm font-semibold text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="md:mt-4">
                <h3 className="text-base font-semibold text-pt-navy-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-pt-slate-600">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
