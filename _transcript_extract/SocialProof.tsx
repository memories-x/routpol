import type { SiteContent } from "@/content/types";

type SocialProofProps = {
  content: SiteContent;
};

export function SocialProof({ content }: SocialProofProps) {
  const block = content.socialProof;
  if (!block) return null;
  const badges = Array.isArray(block.badges) ? block.badges : [];
  const signals = Array.isArray(block.signals) ? block.signals : [];

  return (
    <section className="border-y border-pt-border bg-pt-bg py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-pt-emerald-600">
            {block.eyebrow}
          </p>
          <h2 className="mt-1 font-display text-xl text-pt-navy-900">
            {block.title}
          </h2>
          {block.note ? (
            <p className="mt-2 max-w-xl text-sm text-pt-slate-600">{block.note}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-pt-border bg-pt-surface px-3 py-1 text-sm font-medium text-pt-navy-900"
            >
              {badge}
            </span>
          ))}
        </div>
        {signals.length > 0 ? (
          <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            {signals.map((s) => (
              <div key={s.label}>
                <dt className="text-pt-slate-500">{s.label}</dt>
                <dd className="font-semibold text-pt-navy-900">{s.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
