import type { AboutContent } from "@/content/hakkimizda";
import { SmartLink } from "@/components/ui/SmartLink";
import { getPublicEnv } from "@/lib/env";
import {
  btnPrimaryClassName,
  btnSecondaryClassName,
  cardClassName,
  pageTitleClassName,
} from "@/lib/ui-classes";

type Props = {
  locale: string;
  content: AboutContent;
};

export function AboutPageView({ locale, content }: Props) {
  const env = getPublicEnv();
  const doItems = Array.isArray(content.doItems) ? content.doItems : [];
  const who = Array.isArray(content.who) ? content.who : [];
  const notItems = Array.isArray(content.notItems) ? content.notItems : [];
  const how = Array.isArray(content.how) ? content.how : [];
  const identity = [
    env.operatorLegalName,
    env.operatorNip ? `NIP ${env.operatorNip}` : null,
    env.operatorAddress,
  ].filter(Boolean);

  return (
    <article>
      <p className="text-xs font-semibold uppercase tracking-wider text-pt-emerald-700">
        {content.eyebrow}
      </p>
      <h1 className={pageTitleClassName("mt-2 text-3xl md:text-4xl")}>
        {content.title}
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-pt-slate-600">
        {content.lead}
      </p>

      <section className="mt-14">
        <h2 className="font-display text-xl text-pt-navy-900">{content.whoTitle}</h2>
        <div className="mt-4 space-y-3 text-pt-slate-600">
          {who.map((p) => (
            <p key={p.slice(0, 40)} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-xl text-pt-navy-900">{content.doTitle}</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {doItems.map((item) => (
            <li key={item.title} className={cardClassName}>
              <h3 className="text-base font-semibold text-pt-navy-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-pt-slate-600">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-xl text-pt-navy-900">{content.roleTitle}</h2>
        <dl className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-pt-border bg-pt-bg px-5 py-4">
            <dt className="text-sm font-semibold text-pt-navy-900">
              {content.roleUs.label}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-pt-slate-600">
              {content.roleUs.body}
            </dd>
          </div>
          <div className="rounded-xl border border-pt-border bg-pt-surface px-5 py-4">
            <dt className="text-sm font-semibold text-pt-navy-900">
              {content.roleLawyer.label}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-pt-slate-600">
              {content.roleLawyer.body}
            </dd>
          </div>
          <div className="rounded-xl border border-pt-border bg-pt-surface px-5 py-4">
            <dt className="text-sm font-semibold text-pt-navy-900">
              {content.roleYou.label}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-pt-slate-600">
              {content.roleYou.body}
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-xl text-pt-navy-900">{content.notTitle}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-pt-slate-600">
          {notItems.map((item) => (
            <li key={item.slice(0, 32)}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-xl text-pt-navy-900">{content.howTitle}</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-pt-slate-600">
          {how.map((item) => (
            <li key={item.slice(0, 32)}>{item}</li>
          ))}
        </ol>
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <SmartLink
          href={`/${locale}${content.packagesHref}`}
          className={btnPrimaryClassName}
        >
          {content.ctaPackages}
        </SmartLink>
        <SmartLink
          href={`/${locale}${content.contactHref}`}
          className={btnSecondaryClassName}
        >
          {content.ctaContact}
        </SmartLink>
      </div>

      {identity.length > 0 ? (
        <p className="mt-12 text-xs text-pt-slate-500">{identity.join(" · ")}</p>
      ) : null}
    </article>
  );
}
