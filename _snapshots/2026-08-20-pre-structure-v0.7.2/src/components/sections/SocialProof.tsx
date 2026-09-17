import type { SiteContent } from "@/content/types";

type SocialProofProps = {
  content: SiteContent;
};

export function SocialProof({ content }: SocialProofProps) {
  const block = content.socialProof;
  if (!block) return null;
  const badges = Array.isArray(block.badges) ? block.badges : [];

  return (
    <section className="border-y border-pt-border bg-pt-surface py-12 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-pt-emerald-600">
              {block.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-2xl text-pt-navy-900 md:text-3xl">
              {block.title}
            </h2>
            {block.note ? (
              <p className="mt-3 text-sm leading-relaxed text-pt-slate-600">
                {block.note}
              </p>
            ) : null}
          </div>
          {badges.length > 0 ? (
            <div className="flex flex-wrap gap-2 md:justify-end">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-md border border-pt-border bg-pt-bg px-4 py-2 text-sm font-semibold text-pt-navy-900"
                >
                  {badge}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
