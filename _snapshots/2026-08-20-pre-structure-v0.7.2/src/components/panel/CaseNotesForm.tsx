"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Note = {
  id: string;
  body: string;
  sharedWithCustomer: boolean;
  createdAt: string;
};

type Props = {
  caseId: string;
  initialNotes: Note[];
  showList?: boolean;
};

export function CaseNotesForm({
  caseId,
  initialNotes,
  showList = true,
}: Props) {
  const router = useRouter();
  const [notes, setNotes] = useState(initialNotes);
  const [body, setBody] = useState("");
  const [shared, setShared] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mailHint, setMailHint] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMailHint(null);
    try {
      const res = await fetch(`/api/panel/cases/${caseId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body, sharedWithCustomer: shared }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json?.error?.message ?? "Kaydedilemedi");
      }
      setNotes(json.data.notes ?? []);
      setBody("");
      setShared(false);
      if (shared) {
        const mail = json.data?.mail;
        const email = json.data?.customerEmail as string | undefined;
        if (mail === "resend") {
          setMailHint(
            `Bilgilendirme maili gönderildi${email ? `: ${email}` : ""}.`,
          );
        } else if (mail === "noop") {
          setMailHint(
            "Not paylaşıldı. Resend env yok — mail atılmadı; müşteri linkinden görür.",
          );
        } else if (mail === "failed") {
          setMailHint("Not kaydedildi; mail gönderilemedi.");
        }
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hata");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-6 border-t border-pt-border pt-6">
      <h2 className="text-lg font-semibold">Süreç notları</h2>
      <p className="mt-1 text-xs text-pt-slate-500">
        Paylaşılan not kimlikteki e-postaya gider; mail dosya sayfasına yönlendirir
        (giriş yok). Yerelde Resend yoksa not yine sayfada görünür, kutu mail
        atılmaz.
      </p>
      {showList ? (
        <ul className="mt-3 max-h-48 space-y-2 overflow-y-auto text-sm">
          {notes.length === 0 ? (
            <li className="text-pt-slate-500">Henüz not yok.</li>
          ) : (
            notes.map((n) => (
              <li
                key={n.id}
                className="rounded-md border border-pt-border bg-pt-bg px-3 py-2"
              >
                <p className="text-pt-aws-ink">{n.body}</p>
                <p className="mt-1 text-[10px] text-pt-slate-500">
                  {new Date(n.createdAt).toLocaleString()}
                  {n.sharedWithCustomer ? " · müşteriyle paylaşıldı" : ""}
                </p>
              </li>
            ))
          )}
        </ul>
      ) : null}
      <form onSubmit={onSubmit} className="mt-4 space-y-2">
        <textarea
          required
          rows={3}
          className="w-full rounded-md border border-pt-border bg-pt-surface px-3 py-2 text-sm"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={busy}
          placeholder="Avukata iletildi / beklenen evrak / tarih…"
        />
        <label className="flex items-center gap-2 text-sm text-pt-slate-600">
          <input
            type="checkbox"
            checked={shared}
            onChange={(e) => setShared(e.target.checked)}
            disabled={busy}
          />
          Müşteriyle paylaş (e-posta + dosya sayfası linki)
        </label>
        {mailHint ? (
          <p
            className={
              mailHint.includes("gönderilemedi")
                ? "text-xs text-pt-danger"
                : "text-xs text-pt-emerald-600"
            }
          >
            {mailHint}
          </p>
        ) : null}
        {error ? <p className="text-sm text-pt-danger">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="rounded-md bg-pt-aws-ink px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {busy ? "Kaydediliyor…" : "Not ekle"}
        </button>
      </form>
    </div>
  );
}
