import type { SiteContent } from "@/content/types";

type WhyUsProps = {
  content: SiteContent;
};

export function WhyUs({ content }: WhyUsProps) {
  const { whyUs } = content;
  const items = Array.isArray(whyUs.items) ? whyUs.items : [];
  const rows = Array.isArray(whyUs.compareRows) ? whyUs.compareRows : [];
  const showConcession =
    Boolean(whyUs.concessionTitle?.trim()) &&
    Boolean(whyUs.concessionBody?.trim());
  const showCompare =
    rows.length > 0 &&
    Boolean(whyUs.compareTitle?.trim());

  return (
    <section id="neden-biz" className="scroll-mt-20 bg-pt-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-3xl text-pt-navy-900">{whyUs.title}</h2>
        {whyUs.intro ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-pt-slate-600">
            {whyUs.intro}
          </p>
        ) : null}

        {showConcession ? (
          <aside className="mt-8 rounded-xl border border-pt-border bg-pt-bg px-5 py-5 md:px-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-pt-navy-800">
              {whyUs.concessionTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-pt-slate-600">
              {whyUs.concessionBody}
            </p>
          </aside>
        ) : null}

        {showCompare ? (
          <>
            <h3 className="mt-12 text-lg font-semibold text-pt-navy-900">
              {whyUs.compareTitle}
            </h3>
            <div className="mt-4 overflow-x-auto rounded-xl border border-pt-border">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="bg-pt-navy-900 text-white">
                  <tr>
                    <th className="px-4 py-3 font-medium">
                      {whyUs.compareThemLabel}
                    </th>
                    <th className="px-4 py-3 font-medium">
                      {whyUs.compareUsLabel}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.us}
                      className="border-t border-pt-border bg-pt-surface"
                    >
                      <td className="px-4 py-3 align-top text-pt-slate-600">
                        {row.them}
                      </td>
                      <td className="px-4 py-3 align-top font-medium text-pt-navy-900">
                        {row.us}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {whyUs.itemsTitle ? (
          <h3 className="mt-12 text-lg font-semibold text-pt-navy-900">
            {whyUs.itemsTitle}
          </h3>
        ) : null}
        <div
          className={
            whyUs.itemsTitle
              ? "mt-6 grid gap-8 sm:grid-cols-2"
              : "mt-10 grid gap-8 sm:grid-cols-2"
          }
        >
          {items.map((item, index) => (
            <div key={item.title}>
              <p className="font-display text-3xl text-pt-emerald-600">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h4 className="mt-3 text-base font-semibold text-pt-navy-900">
                {item.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-pt-slate-600">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
