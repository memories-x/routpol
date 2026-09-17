"use client";

import type { LandingContent } from "@/content/landing";
import { phoneCountryCodes } from "@/lib/validation/quote";
import { useEffect, useRef, useState } from "react";

type Props = {
  content: LandingContent;
  locale: string;
};

export function LandingLeadForm({ content, locale }: Props) {
  const L = content.lead;
  const options = Array.isArray(L.processOptions) ? L.processOptions : [];
  const startedAt = useRef(0);
  const [busy, setBusy] = useState(false);
  const [banner, setBanner] = useState<{
    type: "ok" | "err";
    msg: string;
  } | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBanner(null);
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const fullName = String(fd.get("fullName") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const employees = String(fd.get("employees") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const phoneCountryCode = String(fd.get("phoneCountryCode") ?? "+48");
    const process = String(fd.get("process") ?? "diger");
    const privacy = fd.get("privacy") === "on";

    if (!privacy || fullName.length < 2 || !email || phone.length < 6) {
      setBanner({ type: "err", msg: L.fieldError });
      setBusy(false);
      return;
    }

    const allowed = new Set(options.map((o) => o.value));
    const serviceType = allowed.has(process) ? process : "diger";

    try {
      const res = await fetch("/api/teklif", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phoneCountryCode,
          phone,
          serviceType,
          message: [
            `Şirket: ${company || "—"}`,
            `Çalışan: ${employees || "—"}`,
            `Hizmet: ${serviceType}`,
            `Locale: ${locale}`,
            "Kaynak: POL-TURK landing lead",
          ].join("\n"),
          privacyAccepted: true,
          companyWebsite: "",
          formStartedAt: startedAt.current,
          locale: locale === "pl" || locale === "en" ? locale : "tr",
          source: "landing",
        }),
      });
      const json = (await res.json()) as {
        success?: boolean;
        error?: string;
      };
      if (!res.ok || !json.success) {
        setBanner({ type: "err", msg: json.error || L.error });
        setBusy(false);
        return;
      }
      setBanner({ type: "ok", msg: L.success });
      (e.target as HTMLFormElement).reset();
      startedAt.current = Date.now();
    } catch {
      setBanner({ type: "err", msg: L.error });
    }
    setBusy(false);
  }

  const form = (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-pt-navy-900">{L.fullName}</span>
          <input
            name="fullName"
            required
            minLength={2}
            className="mt-1 w-full rounded-xl border border-pt-border px-3.5 py-2.5"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-pt-navy-900">{L.company}</span>
          <input
            name="company"
            className="mt-1 w-full rounded-xl border border-pt-border px-3.5 py-2.5"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="font-medium text-pt-navy-900">{L.employees}</span>
        <input
          name="employees"
          inputMode="numeric"
          className="mt-1 w-full rounded-xl border border-pt-border px-3.5 py-2.5"
          placeholder="50"
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-pt-navy-900">{L.email}</span>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-xl border border-pt-border px-3.5 py-2.5"
        />
      </label>
      <div className="grid grid-cols-[7rem_1fr] gap-2">
        <label className="block text-sm">
          <span className="font-medium text-pt-navy-900">+ </span>
          <select
            name="phoneCountryCode"
            defaultValue="+48"
            className="mt-1 w-full rounded-xl border border-pt-border px-2 py-2.5"
          >
            {phoneCountryCodes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-pt-navy-900">{L.phone}</span>
          <input
            name="phone"
            required
            minLength={6}
            className="mt-1 w-full rounded-xl border border-pt-border px-3.5 py-2.5"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="font-medium text-pt-navy-900">{L.process}</span>
        <select
          name="process"
          required
          defaultValue=""
          className="mt-1 w-full rounded-xl border border-pt-border bg-white px-3.5 py-2.5"
        >
          <option value="" disabled>
            —
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-start gap-2 text-sm text-pt-slate-600">
        <input type="checkbox" name="privacy" className="mt-1" required />
        <span>{L.privacy}</span>
      </label>
      {banner ? (
        <p
          className={
            banner.type === "ok"
              ? "rounded-lg bg-pt-emerald-50 px-3 py-2 text-sm text-pt-emerald-800"
              : "rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
          }
        >
          {banner.msg}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-xl bg-pt-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-pt-emerald-500 disabled:opacity-60"
      >
        {busy ? L.loading : L.submit}
      </button>
    </form>
  );

  return (
    <section
      id="iletisim"
      className="scroll-mt-20 bg-pt-emerald-50/35 py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pt-emerald-700">
            {content.trust.title}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-pt-navy-950 md:text-4xl">
            {L.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pt-slate-600">
            {L.intro}
          </p>
          {(Array.isArray(content.trust.badges) ? content.trust.badges : [])
            .length > 0 ? (
            <p className="mt-8 max-w-md text-xs leading-relaxed tracking-wide text-pt-slate-500">
              {content.trust.badges.join(" · ")}
            </p>
          ) : null}
        </div>
        <div className="overflow-hidden rounded-[1.25rem] border border-pt-border bg-pt-surface shadow-[0_24px_56px_-32px_rgba(15,23,42,0.4)]">
          <div className="flex items-center gap-3 border-b border-pt-border bg-pt-bg/80 px-4 py-3">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-pt-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-pt-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-pt-border" />
            </div>
            <p className="flex-1 truncate text-center text-[11px] font-medium text-pt-slate-500">
              {L.title}
            </p>
          </div>
          <div className="p-6 md:p-8">{form}</div>
        </div>
      </div>
    </section>
  );
}
