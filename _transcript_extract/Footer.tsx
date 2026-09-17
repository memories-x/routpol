import { BrandLockup } from "@/components/brand/BrandLockup";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";

type FooterProps = {
  locale: Locale;
  content: SiteContent;
};

export function Footer({ locale, content }: FooterProps) {
  const nav = Array.isArray(content.nav) ? content.nav : [];

  return (
    <footer className="mt-auto border-t border-pt-navy-800 bg-pt-navy-900 text-pt-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <BrandLockup
            name={content.brand.name}
            tagline={content.brand.tagline}
            onDark
          />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">
            {content.footer.disclaimer}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
            {content.brand.name}
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={
                    item.href.startsWith("#")
                      ? `/${locale}${item.href}`
                      : item.href.startsWith("/")
                        ? item.href
                        : `/${locale}/${item.href}`
                  }
                  className="text-white/85 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href={`/${locale}/gizlilik`}
                className="text-white/85 hover:text-white"
              >
                {content.footer.privacy}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/basvuru`}
                className="text-white/85 hover:text-white"
              >
                {content.hero.ctaHeader}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/55">
          {content.footer.rights}
        </p>
      </div>
    </footer>
  );
}
