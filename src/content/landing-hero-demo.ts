/**
 * Hero müşteri-dosyası demo sahneleri — hizmet slug’ları ile senkron.
 * Paket detay path’leri kanonik; kopya TR/PL/EN burada.
 */

export type HeroDemoRow = { label: string; value: string };

export type HeroDemoScene = {
  /** Paket/hizmet slug veya `ticaret` */
  id: string;
  title: string;
  statusPending?: string;
  statusReady?: string;
  rows: HeroDemoRow[];
  /** Locale sonrası path */
  href: string;
  ctaLabel: string;
};

export type HeroDemoContent = {
  label: string;
  footnote: string;
  statusPending: string;
  statusReady: string;
  scenes: HeroDemoScene[];
  /** Geriye dönük tek-sahne fallback — scenes[0].rows ile aynı tutulur */
  rows: HeroDemoRow[];
};

/** Sahne id → kamu path (locale öneki component’te) */
export const HERO_DEMO_HREF_BY_ID = {
  "tek-yazi": "/hizmetler/tek-yazi",
  "aylik-paket": "/hizmetler/aylik-paket",
  "surec-yonetimi": "/hizmetler/surec-yonetimi",
  "yerinde-eslik": "/hizmetler/eslik",
  ticaret: "/danismanlik",
} as const;

export type HeroDemoSceneId = keyof typeof HERO_DEMO_HREF_BY_ID;

function withFallbackRows(demo: Omit<HeroDemoContent, "rows">): HeroDemoContent {
  const first = demo.scenes[0];
  return {
    ...demo,
    rows: first ? [...first.rows] : [],
  };
}

export const heroDemoTr: HeroDemoContent = withFallbackRows({
  label: "Müşteri dosyası",
  footnote: "Örnek görünüm. Gerçek dosyada alanlar ve durum değişir.",
  statusPending: "Hazırlanıyor…",
  statusReady: "Hazır",
  scenes: [
    {
      id: "tek-yazi",
      title: "Tek yazı — özet",
      statusPending: "Özet hazırlanıyor…",
      statusReady: "Özet hazır",
      href: HERO_DEMO_HREF_BY_ID["tek-yazi"],
      ctaLabel: "Tek yazı detayı",
      rows: [
        { label: "Ne istendi", value: "Ek belge + form" },
        { label: "Son tarih", value: "14 gün" },
        { label: "Sıradaki adım", value: "Muhasebe / avukat / siz" },
      ],
    },
    {
      id: "aylik-paket",
      title: "Aylık takip — Hesabım",
      statusPending: "Dönem güncelleniyor…",
      statusReady: "Dönem aktif",
      href: HERO_DEMO_HREF_BY_ID["aylik-paket"],
      ctaLabel: "Aylık paket detayı",
      rows: [
        { label: "Kota", value: "4 / 4 yazı" },
        { label: "Kalan", value: "2 yazı hakkı" },
        { label: "Bitiş", value: "30 gün · abonelik" },
      ],
    },
    {
      id: "surec-yonetimi",
      title: "Vekaletli yürütme",
      statusPending: "Durum güncelleniyor…",
      statusReady: "Takipte",
      href: HERO_DEMO_HREF_BY_ID["surec-yonetimi"],
      ctaLabel: "Vekaletli paket",
      rows: [
        { label: "Kapsam", value: "İdari vekalet" },
        { label: "Son işlem", value: "Randevu teyidi" },
        { label: "Sırada", value: "Avukat ortağına iletim" },
      ],
    },
    {
      id: "yerinde-eslik",
      title: "Yerinde eşlik",
      statusPending: "Randevu planlanıyor…",
      statusReady: "Randevu net",
      href: HERO_DEMO_HREF_BY_ID["yerinde-eslik"],
      ctaLabel: "Eşlik detayı",
      rows: [
        { label: "Kurum", value: "1 ziyaret · yarı gün" },
        { label: "Şehir", value: "Warszawa" },
        { label: "Rol", value: "Dil köprüsü · eşlik" },
      ],
    },
    {
      id: "ticaret",
      title: "Ticaret danışmanlığı",
      statusPending: "Brief hazırlanıyor…",
      statusReady: "Brief hazır",
      href: HERO_DEMO_HREF_BY_ID.ticaret,
      ctaLabel: "Danışmanlık",
      rows: [
        { label: "Kapsam", value: "Pazar + karşı taraf" },
        { label: "Çıktı", value: "Görüşme + teklif derlemesi" },
        { label: "Sonraki", value: "Onayınızla ilerleme" },
      ],
    },
  ],
});

export const heroDemoPl: HeroDemoContent = withFallbackRows({
  label: "Teczka klienta",
  footnote: "Widok przykładowy. W realnej sprawie pola i status się zmieniają.",
  statusPending: "W toku…",
  statusReady: "Gotowe",
  scenes: [
    {
      id: "tek-yazi",
      title: "Jedno pismo — streszczenie",
      statusPending: "Streszczenie w toku…",
      statusReady: "Streszczenie gotowe",
      href: HERO_DEMO_HREF_BY_ID["tek-yazi"],
      ctaLabel: "Szczegóły pisma",
      rows: [
        { label: "Czego żądają", value: "Załącznik + formularz" },
        { label: "Termin", value: "14 dni" },
        { label: "Kolejny krok", value: "Księgowy / adwokat / Państwo" },
      ],
    },
    {
      id: "aylik-paket",
      title: "Opieka miesięczna — Konto",
      statusPending: "Aktualizacja okresu…",
      statusReady: "Okres aktywny",
      href: HERO_DEMO_HREF_BY_ID["aylik-paket"],
      ctaLabel: "Pakiet miesięczny",
      rows: [
        { label: "Limit", value: "4 / 4 pisma" },
        { label: "Pozostało", value: "2 pisma" },
        { label: "Koniec", value: "30 dni · abonament" },
      ],
    },
    {
      id: "surec-yonetimi",
      title: "Prowadzenie z POA",
      statusPending: "Aktualizacja statusu…",
      statusReady: "W toku",
      href: HERO_DEMO_HREF_BY_ID["surec-yonetimi"],
      ctaLabel: "Pakiet z POA",
      rows: [
        { label: "Zakres", value: "POA administracyjne" },
        { label: "Ostatni krok", value: "Potwierdzenie wizyty" },
        { label: "Dalej", value: "Przekazanie do adwokata-partnera" },
      ],
    },
    {
      id: "yerinde-eslik",
      title: "Towarzyszenie na miejscu",
      statusPending: "Planowanie wizyty…",
      statusReady: "Wizyta ustalona",
      href: HERO_DEMO_HREF_BY_ID["yerinde-eslik"],
      ctaLabel: "Towarzyszenie",
      rows: [
        { label: "Instytucja", value: "1 wizyta · pół dnia" },
        { label: "Miasto", value: "Warszawa" },
        { label: "Rola", value: "Most językowy · obecność" },
      ],
    },
    {
      id: "ticaret",
      title: "Doradztwo handlowe",
      statusPending: "Brief w toku…",
      statusReady: "Brief gotowy",
      href: HERO_DEMO_HREF_BY_ID.ticaret,
      ctaLabel: "Doradztwo",
      rows: [
        { label: "Zakres", value: "Rynek + kontrahenci" },
        { label: "Wynik", value: "Spotkania + oferty" },
        { label: "Dalej", value: "Po Państwa zatwierdzeniu" },
      ],
    },
  ],
});

export const heroDemoEn: HeroDemoContent = withFallbackRows({
  label: "Customer file",
  footnote: "Sample view. Fields and status vary on a real file.",
  statusPending: "Preparing…",
  statusReady: "Ready",
  scenes: [
    {
      id: "tek-yazi",
      title: "Single letter — summary",
      statusPending: "Summary preparing…",
      statusReady: "Summary ready",
      href: HERO_DEMO_HREF_BY_ID["tek-yazi"],
      ctaLabel: "Single letter detail",
      rows: [
        { label: "Requested", value: "Annex + form" },
        { label: "Deadline", value: "14 days" },
        { label: "Next step", value: "Accountant / lawyer / you" },
      ],
    },
    {
      id: "aylik-paket",
      title: "Monthly tracking — Account",
      statusPending: "Updating period…",
      statusReady: "Period active",
      href: HERO_DEMO_HREF_BY_ID["aylik-paket"],
      ctaLabel: "Monthly package",
      rows: [
        { label: "Quota", value: "4 / 4 letters" },
        { label: "Remaining", value: "2 letter slots" },
        { label: "Ends", value: "30 days · subscription" },
      ],
    },
    {
      id: "surec-yonetimi",
      title: "POA execution",
      statusPending: "Updating status…",
      statusReady: "In progress",
      href: HERO_DEMO_HREF_BY_ID["surec-yonetimi"],
      ctaLabel: "POA package",
      rows: [
        { label: "Scope", value: "Admin POA" },
        { label: "Last step", value: "Appointment confirmed" },
        { label: "Next", value: "Handoff to lawyer partner" },
      ],
    },
    {
      id: "yerinde-eslik",
      title: "On-site accompaniment",
      statusPending: "Scheduling visit…",
      statusReady: "Visit set",
      href: HERO_DEMO_HREF_BY_ID["yerinde-eslik"],
      ctaLabel: "Accompaniment",
      rows: [
        { label: "Office", value: "1 visit · half day" },
        { label: "City", value: "Warsaw" },
        { label: "Role", value: "Language bridge · presence" },
      ],
    },
    {
      id: "ticaret",
      title: "Trade advisory",
      statusPending: "Brief preparing…",
      statusReady: "Brief ready",
      href: HERO_DEMO_HREF_BY_ID.ticaret,
      ctaLabel: "Advisory",
      rows: [
        { label: "Scope", value: "Market + counterparties" },
        { label: "Output", value: "Meetings + quote pack" },
        { label: "Next", value: "Proceed after your approval" },
      ],
    },
  ],
});
