import { PartnerForm } from "@/components/panel/PartnerForm";
import { PageHeader } from "@/components/panel/ui/PageHeader";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<{ name?: string }>;
};

export default async function PanelPartnerCreatePage({
  searchParams,
}: PageProps) {
  if (!(await isPanelAuthenticated())) redirect("/panel/login");
  const sp = await searchParams;
  const name = (sp.name ?? "").trim();

  return (
    <div>
      <Link
        href="/panel/ortaklar"
        className="text-sm text-pt-emerald-600 hover:underline"
      >
        ← Avukat ortakları
      </Link>
      <div className="mt-4">
        <PageHeader
          title="Ortak ekle"
          description="Ad + telefon veya e-posta yeterli. Atamayı dosyada yaparsınız."
        />
      </div>
      <PartnerForm defaults={name ? { name } : undefined} />
    </div>
  );
}
