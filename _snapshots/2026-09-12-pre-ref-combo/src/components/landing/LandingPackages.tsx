import { PriceTable } from "@/components/sections/PriceTable";
import { SmartLink } from "@/components/ui/SmartLink";
import type { LandingContent } from "@/content/landing";
import type { SiteContent } from "@/content/types";
import { sortCheckoutPackages } from "@/lib/cases/document-slots";
import { getServiceIcon } from "@/lib/icons";
import { btnPrimaryClassName, packageCardClassName } from "@/lib/ui-classes";
import Link from "next/link";

type Props = {
  content: LandingContent;
  services: SiteContent["services"];
  locale: string;
};

/** Wise-like pricing panels — soft rounded cards, clear featured. */
export function LandingPackages({ content, services, locale }: Props) {
  const items = sortCheckoutPackages(
    Array.isArray(services.items) ? services.items : [],
  );
  const P = content.packages;

  return (
    <section id="paketler" className="scroll-mt-20 bg-pt-bg py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pt-emerald-700">
            {P.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-pt-navy-950 md:text-4xl">
            {P.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pt-slate-600">
            {P.intro}
          </p>
          <p className="mt-4">
            <SmartLink
              href={`/${locale}/hizmetler#paketler`}
              className="text-sm font-semibold text-pt-emerald-700 hover:underline"
            >
              {content.footer.packages} →
            </SmartLink>
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = getServiceIcon(item.icon);
            const featured = item.slug === "aylik-paket";
            return (
              <article
                key={item.slug}
                className={packageCardClassName(featured)}
              >
                {featured ? (
                  <div
                    className="absolute inset-x-0 top-0 h-1.5 bg-pt-emerald-600"
                    aria-hidden
                  />
                ) : null}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pt-emerald-50 text-pt-emerald-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  {item.badge ? (
                    <span className="rounded-lg bg-pt-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-pt-emerald-700">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-pt-navy-950">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-pt-slate-600">
                  {item.shortDescription}
                </p>
                <PriceTable
                  item={item}
                  priceLabel={services.priceLabel}
                  compact
                />
                <div className="mt-6 flex flex-col gap-2 border-t border-pt-border pt-5">
                  <Link
                    href={`/${locale}/basvuru?paket=${item.slug}`}
                    className={`${btnPrimaryClassName} w-full`}
                  >
                    {P.applyLabel}
                  </Link>
                  <Link
                    href={`/${locale}/hizmetler/${item.slug}`}
                    className="py-1 text-center text-sm font-semibold text-pt-emerald-700 hover:underline"
                  >
                    {P.detailLabel} →
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
