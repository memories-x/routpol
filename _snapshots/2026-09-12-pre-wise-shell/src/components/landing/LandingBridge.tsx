import type { LandingContent } from "@/content/landing";

type Props = { content: LandingContent };

/** Şerit diyagramı — Kurum / POL-TURK / Siz + avukat sınırı (kart duvarı değil). */
export function LandingBridge({ content }: Props) {
  const B = content.bridge;
  const lanes = Array.isArray(B.lanes) ? B.lanes : [];

  return (
    <section id="ne-yapiyoruz" className="scroll-mt-20 border-b border-pt-border bg-pt-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-pt-emerald-700">
          {B.eyebrow}
        </p>
        <h2 className="mt-2 max-w-2xl font-display text-3xl text-pt-navy-900 md:text-4xl">
          {B.title}
        </h2>
        <p className="mt-4 max-w-2xl text-pt-slate-600">{B.intro}</p>

        <div className="mt-12 grid gap-0 md:grid-cols-3 md:divide-x md:divide-pt-border">
          {lanes.map((lane, i) => (
            <div
              key={lane.id}
              className={`px-0 py-6 md:px-8 md:py-2 ${i === 0 ? "md:pl-0" : ""} ${i === lanes.length - 1 ? "md:pr-0" : ""}`}
            >
              <p className="font-display text-sm font-semibold tracking-wide text-pt-navy-900">
                <span className="mr-2 tabular-nums text-pt-emerald-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {lane.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-pt-slate-600">
                {lane.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl border-l-2 border-pt-navy-900/20 pl-4 text-sm leading-relaxed text-pt-slate-600">
          {B.lawyerNote}
        </p>
      </div>
    </section>
  );
}
