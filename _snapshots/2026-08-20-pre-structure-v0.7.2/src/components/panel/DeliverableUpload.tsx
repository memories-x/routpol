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
        PDF veya görüntü. Yükleyince ortadaki Evrak sütunundan siz de indirirsiniz; müşteri kendi dosya sayfasından.
      </p>
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
