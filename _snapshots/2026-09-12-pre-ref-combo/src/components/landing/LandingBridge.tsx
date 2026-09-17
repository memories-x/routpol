import type { LandingContent } from "@/content/landing";

type Props = { content: LandingContent };

/** Wise-like flow strip: numbered steps with connectors. */
export function LandingBridge({ content }: Props) {
  const B = content.bridge;
  const lanes = Array.isArray(B.lanes) ? B.lanes : [];

  return (
    <section
      id="ne-yapiyoruz"
      className="scroll-mt-20 border-b border-pt-border bg-pt-emerald-50/40 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pt-emerald-700">
          {B.eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-pt-navy-950 md:text-4xl">
          {B.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-pt-slate-600">
          {B.intro}
        </p>

        <div className="relative mt-14">
          <div
            className="pointer-events-none absolute left-[8%] right-[8%] top-5 hidden h-0.5 bg-pt-emerald-200 md:block"
            aria-hidden
          />
          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {lanes.map((lane, i) => (
              <div
                key={lane.id}
                className="rounded-2xl border border-pt-border bg-pt-surface p-6 shadow-[0_12px_32px_-24px_rgba(15,23,42,0.3)]"
              >
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-pt-emerald-600 text-sm font-bold text-white shadow-sm">
                  {i + 1}
                </span>
                <p className="mt-5 font-display text-xl font-semibold tracking-tight text-pt-navy-950">
                  {lane.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-pt-slate-600">
                  {lane.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 max-w-3xl border-l-2 border-pt-emerald-600 pl-4 text-sm leading-relaxed text-pt-slate-600">
          {B.lawyerNote}
        </p>
      </div>
    </section>
  );
}
