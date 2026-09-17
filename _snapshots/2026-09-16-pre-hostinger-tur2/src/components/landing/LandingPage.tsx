import { LandingBridge } from "@/components/landing/LandingBridge";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingLeadForm } from "@/components/landing/LandingLeadForm";
import { LandingPackages } from "@/components/landing/LandingPackages";
import { LandingProcess } from "@/components/landing/LandingProcess";
import { LandingScope } from "@/components/landing/LandingScope";
import { Faq } from "@/components/sections/Faq";
import type { LandingContent } from "@/content/landing";
import type { SiteContent } from "@/content/types";

type Props = {
  content: LandingContent;
  site: SiteContent;
  locale: string;
};

/**
 * Quiet Authority shell + Stripe craft (easing, reveal, product panels).
 * Order preserved: Hero → Scope → Bridge → Packages → Process → FAQ → Lead
 */
export function LandingPage({ content, site, locale }: Props) {
  return (
    <>
      <LandingHero content={content} locale={locale} />
      <LandingScope content={content} />
      <LandingBridge content={content} locale={locale} />
      <LandingPackages content={content} services={site.services} locale={locale} />
      <LandingProcess content={content} locale={locale} />
      <Faq faq={content.faq} />
      <LandingLeadForm content={content} locale={locale} />
    </>
  );
}
