/** İnsan okunur etiketler — panel Temas + operatör maili */

const SERVICE_LABELS_TR: Record<string, string> = {
  "aylik-paket": "Aylık idari takip",
  "surec-yonetimi": "Vekaletli idari yürütme",
  "tek-yazi": "Tek yazı",
  "telefon-gorusme": "Telefon görüşmesi (1 saat)",
  yatirimci: "TR işletmeci — Polonya yatırım / şirket kuruluşu",
  isletme: "Polonya’daki işletme",
  egitim: "Üniversite / eğitim",
  "eslik-firma": "Yerinde eşlik — firma",
  "eslik-sahis": "Şahıs — ehliyet, oturum, urzęd",
  diger: "Diğer",
  idari: "İdari (eski)",
  tedarik: "Tedarik (eski)",
  talepler: "Talepler (eski)",
  saha: "Saha (eski)",
};

const STATUS_LABELS_TR: Record<string, string> = {
  new: "Yeni",
  contacted: "Dönüldü",
  closed: "Kapalı",
};

const SOURCE_LABELS_TR: Record<string, string> = {
  landing: "Landing / görüşme formu",
  contact: "İletişim bölümü",
};

export function leadServiceLabel(serviceType: string): string {
  return SERVICE_LABELS_TR[serviceType] ?? serviceType;
}

export function leadStatusLabel(status: string): string {
  return STATUS_LABELS_TR[status] ?? status;
}

export function leadSourceLabel(source: string): string {
  return SOURCE_LABELS_TR[source] ?? source;
}
