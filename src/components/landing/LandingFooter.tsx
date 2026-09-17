import { BrandLockup } from "@/components/brand/BrandLockup";
import { SmartLink } from "@/components/ui/SmartLink";
import type { LandingContent } from "@/content/landing";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";

type Props = {
  locale: Locale;
  content: LandingContent;
};

function withLocale(locale: string, href: string): string {
  if (href.startsWith("#")) return `/${locale}${href}`;
  if (href.startsWith("/")) return `/${locale}${href}`;
  return `/${locale}/${href}`;
}

export function LandingFooter({ locale, content }: Props) {
  const badges = Array.isArray(content.trust.badges)
    ? content.trust.badges
    : [];
  const F = content.footer;

  const services = [
    { href: `/${locale}/hizmetler`, label: F.servicesHub },
    { href: `/${locale}/hizmetler/kurulum`, label: F.formation },
    { href: `/${locale}/hizmetler/isletme`, label: F.business },
    { href: `/${locale}/hizmetler/eslik`, label: F.accompaniment },
    { href: `/${locale}/danismanlik`, label: F.advisory },
    { href: `/${locale}/hizmetler/egitim`, label: F.education },
  ];

  const buy = [
    { href: `/${locale}/hizmetler#paketler`, label: F.packages },
    { href: `/${locale}/basvuru`, label: F.apply },
    { href: `/${locale}/rehber`, label: F.guide },
  ];

  const site = [
    { href: `/${locale}/hakkimizda`, label: F.about },
    { href: withLocale(locale, "#sss"), label: F.faq },
    { href: withLocale(locale, "#iletisim"), label: content.nav.find((n) => n.id === "iletisim")?.label ?? "Contact" },
    { href: `/${locale}/gizlilik`, label: F.privacy },
    { href: `/${locale}/hesabim`, label: content.accountLink },
  ];

  const columns = [
    { title: F.groupServices, items: services },
    { title: F.groupBuy, items: buy },
    { title: F.groupSite, items: site },
  ];

  return (
    <footer className="mt-auto border-t border-pt-navy-800 bg-pt-navy-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <BrandLockup
            name={content.brand.name}
            tagline={content.brand.tagline}
            onDark
          />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
            {F.disclaimer}
          </p>
          {badges.length > 0 ? (
            <p className="mt-6 max-w-md text-[11px] leading-relaxed tracking-wide text-white/45">
              {badges.join(" · ")}
            </p>
          ) : null}
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
                {col.title}
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <SmartLink
                      href={item.href}
                      className="text-white/85 hover:text-white"
                    >
                      {item.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/50">
          {F.rights}
        </p>
      </div>
    </footer>
  );
}
