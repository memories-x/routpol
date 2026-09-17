import { SectionIntro } from "@/components/sections/SectionIntro";
import type { SiteContent } from "@/content/types";

type WhyUsProps = {
  content: SiteContent;
};

export function WhyUs({ content }: WhyUsProps) {
  const { whyUs } = content;
  const items = Array.isArray(whyUs.items) ? whyUs.items : [];

  return (
    <section id="neden-biz" className="scroll-mt-20 bg-pt-bg py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionIntro title={whyUs.title} intro={whyUs.intro} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-pt-border bg-pt-surface p-6 shadow-sm"
            >
              <h3 className="text-base font-semibold text-pt-navy-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-pt-slate-600">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
