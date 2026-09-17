"use client";

import type { LawyerPartner, LawyerPartnerInput } from "@/lib/partners/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  partner?: LawyerPartner;
  defaults?: Partial<LawyerPartnerInput>;
};

const fieldClass =
  "mt-1 w-full rounded-md border border-pt-border px-3 py-2 text-sm";

export function PartnerForm({ partner, defaults }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<LawyerPartnerInput>({
    name: partner?.name ?? defaults?.name ?? "",
    officeName: partner?.officeName ?? defaults?.officeName ?? "",
    email: partner?.email ?? "",
    phone: partner?.phone ?? "",
    city: partner?.city ?? "",
    notes: partner?.notes ?? "",
    nip: partner?.nip ?? "",
    barNumber: partner?.barNumber ?? "",
    address: partner?.address ?? "",
    active: partner?.active ?? true,
    contractStatus: partner?.contractStatus ?? "none",
    languages:
      partner && Array.isArray(partner.languages) ? partner.languages : [],
    specialty: partner?.specialty ?? "",
    website: partner?.website ?? "",
  });

  function set<K extends keyof LawyerPartnerInput>(
    key: K,
    value: LawyerPartnerInput[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const url = partner
        ? `/api/panel/partners/${partner.id}`
        : "/api/panel/partners";
      const res = await fetch(url, {
        method: partner ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = (await res.json()) as {
        success: boolean;
        data?: { id: string };
        error?: { message?: string };
      };
      if (!json.success || !json.data?.id) {
        setError(json.error?.message || "Kaydedilemedi");
        return;
      }
      router.push(`/panel/ortaklar/${json.data.id}`);
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={save}
      className="mt-4 max-w-xl space-y-4 rounded-lg border border-pt-border bg-pt-surface p-5"
    >
      <label className="block text-sm">
        <span className="font-medium text-pt-aws-ink">Ad / unvan</span>
        <input
          className={fieldClass}
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          required
          minLength={2}
          maxLength={160}
          placeholder="Örn. Kancelaria Nowak"
          disabled={busy}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-pt-aws-ink">Telefon</span>
          <input
            className={fieldClass}
            value={form.phone ?? ""}
            onChange={(e) => set("phone", e.target.value)}
            maxLength={40}
            disabled={busy}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-pt-aws-ink">E-posta</span>
          <input
            type="email"
            className={fieldClass}
            value={form.email ?? ""}
            onChange={(e) => set("email", e.target.value)}
            maxLength={160}
            disabled={busy}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-pt-aws-ink">Kancelaria</span>
          <input
            className={fieldClass}
            value={form.officeName ?? ""}
            onChange={(e) => set("officeName", e.target.value)}
            maxLength={160}
            disabled={busy}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-pt-aws-ink">Şehir</span>
          <input
            className={fieldClass}
            value={form.city ?? ""}
            onChange={(e) => set("city", e.target.value)}
            maxLength={80}
            disabled={busy}
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="font-medium text-pt-aws-ink">Not</span>
        <textarea
          className={fieldClass}
          rows={2}
          value={form.notes ?? ""}
          onChange={(e) => set("notes", e.target.value)}
          maxLength={2000}
          placeholder="Nasıl çalışıyorsunuz, ne göndermek lazım…"
          disabled={busy}
        />
      </label>

      <details className="rounded-md border border-pt-border px-3 py-2 text-sm">
        <summary className="cursor-pointer font-medium text-pt-aws-ink">
          Ek alanlar (nadiren)
        </summary>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-pt-slate-500">NIP</span>
            <input
              className={fieldClass}
              value={form.nip ?? ""}
              onChange={(e) => set("nip", e.target.value)}
              maxLength={20}
              disabled={busy}
            />
          </label>
          <label className="block">
            <span className="text-pt-slate-500">Baro no</span>
            <input
              className={fieldClass}
              value={form.barNumber ?? ""}
              onChange={(e) => set("barNumber", e.target.value)}
              maxLength={40}
              disabled={busy}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-pt-slate-500">Adres</span>
            <input
              className={fieldClass}
              value={form.address ?? ""}
              onChange={(e) => set("address", e.target.value)}
              maxLength={240}
              disabled={busy}
            />
          </label>
          <label className="flex items-center gap-2 sm:col-span-2">
            <input
              type="checkbox"
              checked={!(form.active ?? true)}
              onChange={(e) => set("active", !e.target.checked)}
              disabled={busy}
            />
            <span>Pasif — dosya seçiminde gizle</span>
          </label>
        </div>
      </details>

      {error ? <p className="text-sm text-pt-danger">{error}</p> : null}

      <div className="flex flex-wrap gap-2 border-t border-pt-border pt-4">
        <button
          type="submit"
          disabled={busy}
          className="rounded-md bg-pt-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {partner ? "Kaydet" : "Ortak ekle"}
        </button>
        <Link
          href={partner ? `/panel/ortaklar/${partner.id}` : "/panel/ortaklar"}
          className="rounded-md border border-pt-border px-4 py-2 text-sm font-medium hover:bg-pt-bg"
        >
          İptal
        </Link>
      </div>
    </form>
  );
}
