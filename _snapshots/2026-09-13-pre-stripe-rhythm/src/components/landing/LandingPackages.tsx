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

/**
 * Attio rhythm: one featured scene + quieter companions.
 * Featured: month mini-timeline (no invented metrics).
 */
export function LandingPackages({ content, services, locale }: Props) {
  const items = sortCheckoutPackages(
    Array.isArray(services.items) ? services.items : [],
  );
  const P = content.packages;
  const featured = items.find((i) => i.slug === "aylik-paket");
  const rest = items.filter((i) => i.slug !== "aylik-paket");
  const storySteps = Array.isArray(P.featuredStory?.steps)
    ? P.featuredStory.steps
    : [];

  return (
    <section id="paketler" className="scroll-mt-20 bg-pt-bg py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pt-emerald-700">
            {P.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-pt-navy-950 md:text-4xl">
            {P.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-pt-slate-600">
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

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {featured ? (
            <article
              className={`${packageCardClassName(true)} lg:col-span-5 lg:min-h-[22rem]`}
            >
              <div
                className="absolute inset-x-0 top-0 h-1.5 bg-pt-emerald-600"
                aria-hidden
              />
              <PackageBody
                item={featured}
                services={services}
                locale={locale}
                applyLabel={P.applyLabel}
                detailLabel={P.detailLabel}
                featured
                storyTitle={P.featuredStory?.title}
                storySteps={storySteps}
              />
            </article>
          ) : null}

          <div className="flex flex-col gap-5 lg:col-span-7">
            {rest.map((item) => (
              <article
                key={item.slug}
                className={`${packageCardClassName(false)} flex-col items-stretch gap-4 p-5 sm:flex-row sm:gap-6 md:p-6`}
              >
                <PackageBody
                  item={item}
                  services={services}
                  locale={locale}
                  applyLabel={P.applyLabel}
                  detailLabel={P.detailLabel}
                  compactRow
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PackageBody({
  item,
  services,
  locale,
  applyLabel,
  detailLabel,
  featured,
  compactRow,
  storyTitle,
  storySteps,
}: {
  item: SiteContent["services"]["items"][number];
  services: SiteContent["services"];
  locale: string;
  applyLabel: string;
  detailLabel: string;
  featured?: boolean;
  compactRow?: boolean;
  storyTitle?: string;
  storySteps?: string[];
}) {
  const Icon = getServiceIcon(item.icon);
  const steps = Array.isArray(storySteps) ? storySteps : [];

  if (compactRow) {
    return (
      <>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pt-emerald-50 text-pt-emerald-700">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-semibold tracking-tight text-pt-navy-950">
              {item.title}
            </h3>
            {item.badge ? (
              <span className="rounded-md bg-pt-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-pt-emerald-700">
                {item.badge}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-pt-slate-600">
            {item.shortDescription}
          </p>
          <div className="mt-3">
            <PriceTable item={item} priceLabel={services.priceLabel} compact />
          </div>
        </div>
        <div className="flex shrink-0 flex-col justify-center gap-2 sm:items-end">
          <Link
            href={`/${locale}/basvuru?paket=${item.slug}`}
            className={`${btnPrimaryClassName} whitespace-nowrap px-4 py-2.5`}
          >
            {applyLabel}
          </Link>
          <Link
            href={`/${locale}/hizmetler/${item.slug}`}
            className="text-center text-sm font-semibold text-pt-emerald-700 hover:underline"
          >
            {detailLabel} →
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
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
      <h3
        className={`mt-5 font-display font-semibold tracking-tight text-pt-navy-950 ${featured ? "text-2xl" : "text-xl"}`}
      >
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-pt-slate-600">
        {item.shortDescription}
      </p>

      {featured && steps.length > 0 ? (
        <div className="mt-5 rounded-xl bg-pt-emerald-50/50 px-4 py-3.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-pt-emerald-800">
            {storyTitle}
          </p>
          <ol className="mt-3 space-y-2.5">
            {steps.map((step, i) => (
              <li
                key={step}
                className="flex gap-2.5 text-sm leading-snug text-pt-navy-900"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pt-emerald-600 text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      <div className="mt-4 flex-1">
        <PriceTable item={item} priceLabel={services.priceLabel} compact />
      </div>
      <div className="mt-6 flex flex-col gap-2 border-t border-pt-border pt-5">
        <Link
          href={`/${locale}/basvuru?paket=${item.slug}`}
          className={`${btnPrimaryClassName} w-full`}
        >
          {applyLabel}
        </Link>
        <Link
          href={`/${locale}/hizmetler/${item.slug}`}
          className="py-1 text-center text-sm font-semibold text-pt-emerald-700 hover:underline"
        >
          {detailLabel} →
        </Link>
      </div>
    </>
  );
}
