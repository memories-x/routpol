import Link from "next/link";

type Props = {
  locale: string;
};

function copy(locale: string) {
  if (locale === "pl") {
    return {
      title: "Już jesteś klientem?",
      body: "Zaloguj się linkiem z e-mail — profil i pliki bez ponownego wpisywania danych.",
      cta: "Moje konto",
    };
  }
  if (locale === "en") {
    return {
      title: "Already a customer?",
      body: "Sign in with an email link — your profile and files without re-entering details.",
      cta: "My account",
    };
  }
  return {
    title: "Zaten müşteri misiniz?",
    body: "E-posta linki ile girin — profil ve dosyalarınız hazır; bilgileri tekrar yazmayın.",
    cta: "Hesabım",
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
