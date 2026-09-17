import { redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ t?: string }>;
};

/** Magic link landing — token consumed client-side on main portal page */
export default async function HesabimGirisPage({
  params,
  searchParams,
}: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) redirect("/tr/hesabim");
  const sp = await searchParams;
  const q = sp.t ? `?t=${encodeURIComponent(sp.t)}` : "";
  redirect(`/${raw}/hesabim${q}`);
}
