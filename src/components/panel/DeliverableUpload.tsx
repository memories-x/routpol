"use client";

import { SONUC_SLOT } from "@/lib/cases/document-slots";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  caseId: string;
};

export function DeliverableUpload({ caseId }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [brandStamp, setBrandStamp] = useState(true);
  const [brandLang, setBrandLang] = useState<"tr" | "en" | "pl">("tr");
  const [brandThin, setBrandThin] = useState(false);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    setOk(false);
    try {
      const fd = new FormData();
      fd.set("slotKey", SONUC_SLOT);
      fd.set("file", file);
      fd.set("brandStamp", brandStamp ? "1" : "0");
      fd.set("brandLang", brandLang);
      fd.set("brandThin", brandThin ? "1" : "0");
      const res = await fetch(`/api/panel/cases/${caseId}/documents`, {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json?.error?.message ?? "Yükleme başarısız");
      }
      setOk(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yükleme başarısız");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div className="mt-6 rounded-lg border border-pt-border bg-pt-bg px-4 py-4">
      <h3 className="text-sm font-semibold text-pt-aws-ink">
        Sonuç yükle (müşteri indirecek)
      </h3>
      <p className="mt-1 text-xs text-pt-slate-500">
        Word’den PDF veya görüntü. PDF ise site navy/emerald bant ekler
        (pdf-cevirmen ile aynı düzen). Zaten damgalıysa kutuyu kapatın.
      </p>
      <label className="mt-3 flex items-start gap-2 text-xs text-pt-aws-ink">
        <input
          type="checkbox"
          className="mt-0.5"
          checked={brandStamp}
          disabled={busy}
          onChange={(ev) => setBrandStamp(ev.target.checked)}
        />
        <span>ROUTEPOL üst/alt bant ekle (yalnızca PDF)</span>
      </label>
      {brandStamp ? (
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-pt-slate-600">
          <label className="flex items-center gap-1.5">
            Bant dili
            <select
              className="rounded border border-pt-border bg-white px-2 py-1 text-pt-aws-ink"
              value={brandLang}
              disabled={busy}
              onChange={(ev) =>
                setBrandLang(ev.target.value as "tr" | "en" | "pl")
              }
            >
              <option value="tr">TR</option>
              <option value="en">EN</option>
              <option value="pl">PL</option>
            </select>
          </label>
          <label className="flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={brandThin}
              disabled={busy}
              onChange={(ev) => setBrandThin(ev.target.checked)}
            />
            İnce bant
          </label>
        </div>
      ) : null}
      <input
        type="file"
        accept=".pdf,image/jpeg,image/png"
        className="mt-3 block w-full text-sm"
        disabled={busy}
        onChange={onChange}
      />
      {busy ? (
        <p className="mt-2 text-xs text-pt-slate-500">Yükleniyor…</p>
      ) : null}
      {ok ? (
        <p className="mt-2 text-xs text-pt-emerald-600">Yüklendi.</p>
      ) : null}
      {error ? (
        <p className="mt-2 text-xs text-pt-danger">{error}</p>
      ) : null}
    </div>
  );
}
