import Link from "next/link";

type Props = {
  locale: string;
};

function copy(locale: string) {
  if (locale === "pl") {
    return {
      title: "Masz już konto?",
      body: "Zalogujcie się e-mailem i hasłem — sprawy i zakup na Waszej stronie.",
      cta: "Logowanie",
    };
  }
  if (locale === "en") {
    return {
      title: "Already have an account?",
      body: "Sign in with email and password — jobs and purchase on your page.",
      cta: "Sign in",
    };
  }
  return {
    title: "Hesabınız var mı?",
    body: "E-posta ve şifre ile girin — işler ve satın al sizin sayfanızda.",
    cta: "Giriş",
  };
}

export function CustomerLoginBanner({ locale }: Props) {
  const L = copy(locale);
  return (
    <div className="mb-10 flex flex-col gap-3 border-b border-pt-border/80 pb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-pt-navy-950">{L.title}</p>
        <p className="mt-0.5 text-sm text-pt-slate-500">{L.body}</p>
      </div>
      <Link
        href={`/${locale}/hesabim`}
        className="inline-flex shrink-0 items-center justify-center rounded-full border border-pt-border bg-pt-surface px-4 py-2 text-sm font-semibold text-pt-navy-900 transition-colors hover:border-pt-emerald-500 hover:bg-pt-emerald-50 hover:text-pt-emerald-900"
      >
        {L.cta}
      </Link>
    </div>
  );
}
