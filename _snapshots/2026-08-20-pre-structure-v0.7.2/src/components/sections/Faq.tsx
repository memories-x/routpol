import { SectionIntro } from "@/components/sections/SectionIntro";
import type { SiteContent } from "@/content/types";

type FaqProps = {
  content: SiteContent;
};

export function Faq({ content }: FaqProps) {
  const items = Array.isArray(content.faq.items) ? content.faq.items : [];

  return (
    <section id="sss" className="scroll-mt-20 bg-pt-bg py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <SectionIntro title={content.faq.title} />
        <div className="mt-10 divide-y divide-pt-border rounded-xl border border-pt-border bg-pt-surface shadow-sm">
          {items.map((item) => (
            <details key={item.id} className="group px-5 py-1 first:rounded-t-xl last:rounded-b-xl">
              <summary className="cursor-pointer list-none py-4 font-medium text-pt-navy-900 marker:content-none [&::-webkit-details-marker]:hidden">
                {item.question}
              </summary>
              <p className="pb-4 text-sm leading-relaxed text-pt-slate-600">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
