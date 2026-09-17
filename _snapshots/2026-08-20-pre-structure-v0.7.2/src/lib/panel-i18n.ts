export type PanelLocale = "tr" | "pl" | "en";

export const PANEL_LOCALE_COOKIE = "pt_panel_locale";

type PanelStrings = {
  brand: string;
  operator: string;
  menu: string;
  close: string;
  loginTitle: string;
  loginHint: string;
  passwordPlaceholder: string;
  loginButton: string;
  loginBusy: string;
  groups: {
    ops: string;
    customers: string;
    finance: string;
    bridge: string;
    system: string;
  };
  nav: {
    overview: string;
    cases: string;
    queue: string;
    companies: string;
    people: string;
    allCustomers: string;
    payments: string;
    invoices: string;
    partners: string;
    settings: string;
  };
};

const STRINGS: Record<PanelLocale, PanelStrings> = {
  tr: {
    brand: "POL-TURK Panel",
    operator: "Operatör",
    menu: "Menü",
    close: "Kapat",
    loginTitle: "Panel girişi",
    loginHint: "Operatör oturumu. Parola env veya PanelUser.",
    passwordPlaceholder: "Şifre",
    loginButton: "Giriş",
    loginBusy: "…",
    groups: {
      ops: "Operasyon",
      customers: "Müşteriler",
      finance: "Finans",
      bridge: "Köprü",
      system: "Sistem",
    },
    nav: {
      overview: "Özet",
      cases: "Dosyalar",
      queue: "Kuyruk",
      companies: "Firmalar",
      people: "Kişiler",
      allCustomers: "Tümü",
      payments: "Ödemeler",
      invoices: "Faturalar",
      partners: "Avukat ortakları",
      settings: "Ayarlar",
    },
  },
  pl: {
    brand: "POL-TURK Panel",
    operator: "Operator",
    menu: "Menu",
    close: "Zamknij",
    loginTitle: "Logowanie panelu",
    loginHint: "Sesja operatora. Hasło z env lub PanelUser.",
    passwordPlaceholder: "Hasło",
    loginButton: "Zaloguj",
    loginBusy: "…",
    groups: {
      ops: "Operacje",
      customers: "Klienci",
      finance: "Finanse",
      bridge: "Most",
      system: "System",
    },
    nav: {
      overview: "Podsumowanie",
      cases: "Sprawy",
      queue: "Kolejka",
      companies: "Firmy",
      people: "Osoby",
      allCustomers: "Wszyscy",
      payments: "Płatności",
      invoices: "Faktury",
      partners: "Partnerzy prawni",
      settings: "Ustawienia",
    },
  },
  en: {
    brand: "POL-TURK Panel",
    operator: "Operator",
    menu: "Menu",
    close: "Close",
    loginTitle: "Panel login",
    loginHint: "Operator session. Password from env or PanelUser.",
    passwordPlaceholder: "Password",
    loginButton: "Sign in",
    loginBusy: "…",
    groups: {
      ops: "Operations",
      customers: "Customers",
      finance: "Finance",
      bridge: "Bridge",
      system: "System",
    },
    nav: {
      overview: "Overview",
      cases: "Cases",
      queue: "Queue",
      companies: "Companies",
      people: "People",
      allCustomers: "All",
      payments: "Payments",
      invoices: "Invoices",
      partners: "Lawyer partners",
      settings: "Settings",
    },
  },
};

export function isPanelLocale(value: string | undefined): value is PanelLocale {
  return value === "tr" || value === "pl" || value === "en";
}

export function getPanelStrings(locale: PanelLocale): PanelStrings {
  return STRINGS[locale];
}

export function panelNavGroups(locale: PanelLocale) {
  const s = getPanelStrings(locale);
  return [
    {
      title: s.groups.ops,
      items: [
        { href: "/panel", label: s.nav.overview },
        { href: "/panel/dosyalar", label: s.nav.cases },
        { href: "/panel/kuyruk", label: s.nav.queue },
      ],
    },
    {
      title: s.groups.customers,
      items: [
        { href: "/panel/firmalar", label: s.nav.companies },
        { href: "/panel/kisiler", label: s.nav.people },
        { href: "/panel/musteriler", label: s.nav.allCustomers },
      ],
    },
    {
      title: s.groups.finance,
      items: [
        { href: "/panel/odemeler", label: s.nav.payments },
        { href: "/panel/faturalar", label: s.nav.invoices },
      ],
    },
    {
      title: s.groups.bridge,
      items: [{ href: "/panel/ortaklar", label: s.nav.partners }],
    },
    {
      title: s.groups.system,
      items: [{ href: "/panel/ayarlar", label: s.nav.settings }],
    },
  ];
}
