import { PriceTable } from "@/components/sections/PriceTable";
import { SectionIntro } from "@/components/sections/SectionIntro";
import type { SiteContent } from "@/content/types";
import { getServiceIcon } from "@/lib/icons";
import { btnPrimaryClassName } from "@/lib/ui-classes";
import Link from "next/link";

type ServicesProps = {
  content: SiteContent;
  locale: string;
};

export function Services({ content, locale }: ServicesProps) {
  const items = Array.isArray(content.services.items)
    ? content.services.items
    : [];

  return (
    <section id="paketler" className="scroll-mt-20 bg-pt-bg py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionIntro
          title={content.services.title}
          intro={content.services.intro}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = getServiceIcon(item.icon);
            const featured = item.slug === "aylik-paket";
            return (
              <article
                key={item.slug}
                className={
                  featured
                    ? "flex flex-col rounded-xl border-2 border-pt-emerald-600 bg-pt-surface p-6 shadow-sm"
                    : item.slug === "surec-yonetimi"
                      ? "flex flex-col rounded-xl border border-pt-navy-800/30 bg-pt-surface p-6 shadow-sm ring-1 ring-pt-navy-800/10"
                      : "flex flex-col rounded-xl border border-pt-border bg-pt-surface p-6 shadow-sm"
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-pt-navy-900/5 text-pt-navy-800">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  {item.badge ? (
                    <span className="rounded-full bg-pt-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-pt-emerald-700">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-pt-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-pt-slate-600">
                  {item.shortDescription}
                </p>
                <PriceTable
                  item={item}
                  priceLabel={content.services.priceLabel}
                  compact
                />
                <div className="mt-6 flex flex-col gap-2 border-t border-pt-border pt-4">
                  <Link
                    href={`/${locale}/basvuru?paket=${item.slug}`}
                    className={`${btnPrimaryClassName} w-full py-2.5`}
                  >
                    {content.services.detailCta}
                  </Link>
                  <Link
                    href={`/${locale}/hizmetler/${item.slug}`}
                    className="text-center text-sm font-medium text-pt-emerald-600 hover:underline"
                  >
                    {item.detailLabel}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
