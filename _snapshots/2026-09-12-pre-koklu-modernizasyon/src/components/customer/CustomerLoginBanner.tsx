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
    <div className="mb-8 rounded-xl border border-pt-emerald-600/25 bg-pt-emerald-50/50 p-5 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-4">
      <div>
        <p className="font-medium text-pt-navy-900">{L.title}</p>
        <p className="mt-1 text-sm text-pt-slate-600">{L.body}</p>
      </div>
      <Link
        href={`/${locale}/hesabim`}
        className="mt-3 inline-flex shrink-0 rounded-md bg-pt-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pt-emerald-500 sm:mt-0"
      >
        {L.cta}
      </Link>
    </div>
  );
}
