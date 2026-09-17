import { PriceTable } from "@/components/sections/PriceTable";
import { SmartLink } from "@/components/ui/SmartLink";
import type { LandingContent } from "@/content/landing";
import type { SiteContent } from "@/content/types";
import { sortCheckoutPackages } from "@/lib/cases/document-slots";
import { getServiceIcon } from "@/lib/icons";
import { btnPrimaryClassName } from "@/lib/ui-classes";
import Link from "next/link";

type Props = {
  content: LandingContent;
  services: SiteContent["services"];
  locale: string;
};

export function LandingPackages({ content, services, locale }: Props) {
  const items = sortCheckoutPackages(
    Array.isArray(services.items) ? services.items : [],
  );
  const P = content.packages;

  return (
    <section id="paketler" className="scroll-mt-20 bg-pt-bg py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-pt-emerald-600">
            {P.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl text-pt-navy-900 md:text-4xl">
            {P.title}
          </h2>
          <p className="mt-4 text-pt-slate-600">{P.intro}</p>
          <p className="mt-3">
            <SmartLink
              href={`/${locale}/hizmetler#paketler`}
              className="text-sm font-semibold text-pt-emerald-700 hover:underline"
            >
              {content.footer.packages} →
            </SmartLink>
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = getServiceIcon(item.icon);
            const featured = item.slug === "aylik-paket";
            return (
              <article
                key={item.slug}
                className={
                  featured
                    ? "flex h-full flex-col border-2 border-pt-emerald-600 bg-pt-surface p-6"
                    : "flex h-full flex-col border border-pt-border bg-pt-surface p-6"
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-pt-emerald-50 text-pt-emerald-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  {item.badge ? (
                    <span className="rounded-md bg-pt-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-pt-emerald-700">
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
                  priceLabel={services.priceLabel}
                  compact
                />
                <div className="mt-6 flex flex-col gap-2 border-t border-pt-border pt-4">
                  <Link
                    href={`/${locale}/basvuru?paket=${item.slug}`}
                    className={`${btnPrimaryClassName} w-full py-2.5`}
                  >
                    {P.applyLabel}
                  </Link>
                  <Link
                    href={`/${locale}/hizmetler/${item.slug}`}
                    className="text-center text-sm font-medium text-pt-emerald-600 hover:underline"
                  >
                    {P.detailLabel}
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
