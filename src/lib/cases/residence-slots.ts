import type { DocumentSlotDef } from "./document-slots";
import { slotLabel } from "./document-slots";

/**
 * Reference checklists for residence profiles (guidance narrative / tracking pack prep).
 * Customer uploads on oturum-dosyasi checkout are disabled — see docs/35.
 *
 * Attachment sources only (no invented rows):
 * - UDSC MOS info / MOS-QA — photo, passport all pages, stamp duty, card fee 100 zł, 3rd-party annexes
 * - Dz.U. 2026 poz. 553 — Załącznik 1–5 when which purpose
 * - Mazowieckie WSC praca procedure — employer means/activity, insurance, regulated quals
 * - Mazowieckie / Poznań WSC Karta Polaka — card + settlement intent; often no stamp duty
 *
 * Process steps (e-Doręczenia, PESEL, inPOL) → next-steps.ts / MOS guide, not fake slots.
 * Wojewoda may still request extras after filing.
 */

export type ResidenceTrack =
  | "pobyt-czasowy"
  | "pobyt-staly"
  | "rezydent-ue"
  | "blue-card";

export type CzasowyPurpose =
  | "praca"
  | "studia"
  | "rodzina"
  | "dzialalnosc"
  | "staz"
  | "wolontariat";

export type StalyBasis =
  | "malzonek-obywatela-pl"
  | "dziecko-obywatela-pl"
  | "karta-polaka"
  | "polskie-pochodzenie"
  | "pobyt-ciagly"
  | "inne";

export type FamilyLink = "malzonek" | "dziecko" | "rodzic" | "inne";

export type ResidenceSelection = {
  track: ResidenceTrack;
  purpose?: CzasowyPurpose;
  basis?: StalyBasis;
  familyLink?: FamilyLink;
};

/** @deprecated Flat keys — older case JSON */
export type ResidenceStatusKey =
  | "pobyt-praca"
  | "pobyt-studia"
  | "pobyt-rodzina"
  | "pobyt-dzialalnosc"
  | "pobyt-staly"
  | "rezydent-ue"
  | "blue-card";

type Labeled<T extends string> = {
  key: T;
  labelTr: string;
  labelPl: string;
  labelEn: string;
  noteTr: string;
  notePl: string;
  noteEn: string;
};

function slot(
  key: string,
  labelTr: string,
  labelPl: string,
  labelEn: string,
  required: boolean,
  maxFiles = 2,
): DocumentSlotDef {
  return {
    key,
    labelTr,
    labelPl,
    labelEn,
    required,
    maxFiles,
    role: "customer",
  };
}

/** MOS formal start set (UDSC / WSC) — always */
const coreIdentity: DocumentSlotDef[] = [
  slot(
    "pasaport_tum_sayfalar",
    "Pasaport — tüm sayfaların taraması (geçerli seyahat belgesi)",
    "Paszport — skan wszystkich stron ważnego dokumentu podróży",
    "Passport — scan of all pages of valid travel document",
    true,
    4,
  ),
  slot(
    "fotograf_biometryczna",
    "Biyometrik foto (MOS: 684×883 px, ≤2,5 MB, 35×45 oran, ≤6 ay)",
    "Zdjęcie biometryczne (MOS: 684×883 px, ≤2,5 MB, 35×45, ≤6 mies.)",
    "Biometric photo (MOS: 684×883 px, ≤2.5 MB, 35×45, ≤6 months)",
    true,
    1,
  ),
];

/** 100 zł karta pobytu — UDSC MOS; almost always */
const feeKartaPobytu: DocumentSlotDef = slot(
  "oplata_karta_pobytu",
  "Karta pobytu ücreti 100 zł — ödeme kanıtı",
  "Opłata za wydanie karty pobytu 100 zł — potwierdzenie",
  "Residence card fee PLN 100 — payment proof",
  true,
  2,
);

/** Opłata skarbowa — amount depends on permit; skipped for some Karta Polaka paths */
const feeSkarbowa: DocumentSlotDef = slot(
  "oplata_skarbowa",
  "Opłata skarbowa ödeme kanıtı (türüne göre 340–640 zł)",
  "Potwierdzenie opłaty skarbowej (340–640 zł wg rodzaju)",
  "Stamp-duty payment proof (PLN 340–640 by type)",
  true,
  2,
);

const coreLiving: DocumentSlotDef[] = [
  slot(
    "ubezpieczenie_zdrowotne",
    "Sağlık sigortası (ZUS / poliçe) — güncel",
    "Ubezpieczenie zdrowotne (ZUS / polisa) — aktualne",
    "Health insurance (ZUS / policy) — current",
    true,
    2,
  ),
  slot(
    "adres_zamieszkania",
    "Adres / barınma belgesi (kira, tapu, oświadczenie vb.)",
    "Dokument adresu / zamieszkania (najem, własność, oświadczenie)",
    "Proof of address / housing (lease, deed, statement)",
    true,
    2,
  ),
];

const coreOptional: DocumentSlotDef[] = [
  slot(
    "tlumaczenie_przysiegle",
    "Yeminli çeviri (yabancı dildeki belgeler → PL)",
    "Tłumaczenie przysięgłe (dokumenty obcojęzyczne → PL)",
    "Sworn translation (foreign-language docs → PL)",
    false,
    6,
  ),
  slot(
    "ek_wojewoda",
    "Wojewoda ek talebi / diğer (sonradan gelen)",
    "Dodatkowe wezwanie wojewody / inne",
    "Extra wojewoda request / other",
    false,
    6,
  ),
];

function coreFor(sel: ResidenceSelection): DocumentSlotDef[] {
  const fees: DocumentSlotDef[] = [feeKartaPobytu];
  // Karta Polaka → stały: WSC — opłata skarbowa za zezwolenie nie jest pobierana
  if (!(sel.track === "pobyt-staly" && sel.basis === "karta-polaka")) {
    fees.unshift(feeSkarbowa);
  }
  return [...coreIdentity, ...fees, ...coreLiving, ...coreOptional];
}

const pracaExtra: DocumentSlotDef[] = [
  slot(
    "zalacznik_1_pracodawca",
    "Załącznik nr 1 — işveren (MOS’ta işveren e-imza; sözleşme/koşullar uyumu)",
    "Załącznik nr 1 — pracodawca (MOS; zgodność z umową)",
    "Annex 1 — employer (MOS e-sign; must match contract)",
    true,
    2,
  ),
  slot(
    "umowa_o_prace",
    "İş / hizmet sözleşmesi (Załącznik 1 koşullarıyla uyumlu)",
    "Umowa o pracę / cywilnoprawna (zgodna z zał. 1)",
    "Employment / civil contract (aligned with Annex 1)",
    true,
    2,
  ),
  slot(
    "pracodawca_zdolnosc",
    "İşveren mali yeterlilik + gerçek faaliyet belgeleri (WSC)",
    "Środki pracodawcy + rzeczywista działalność (WSC)",
    "Employer means + real business activity proof (WSC)",
    true,
    4,
  ),
  slot(
    "pelnomocnictwo_pracodawcy",
    "İşveren imza yetkisi / pełnomocnictwo (KRS temsilcisi değilse)",
    "Pełnomocnictwo / umocowanie do Załącznika nr 1",
    "Employer power of attorney for Annex 1 (if needed)",
    false,
    2,
  ),
  slot(
    "kwalifikacje_regulowane",
    "Düzenlenen meslek nitelik belgeleri (varsa)",
    "Kwalifikacje (zawód regulowany)",
    "Regulated-profession qualifications (if any)",
    false,
    2,
  ),
  slot(
    "informacja_starosty",
    "Starosta bilgisi / iş piyasası testi veya istisna (gerekiyorsa)",
    "Informacja starosty lub zwolnienie (jeśli wymagane)",
    "Starosta labour-market info or exemption (if required)",
    false,
    2,
  ),
];

const studiaExtra: DocumentSlotDef[] = [
  slot(
    "zalacznik_5_uczelnia",
    "Załącznik nr 5 — üniversite (MOS’ta okul e-imza)",
    "Załącznik nr 5 — uczelnia (MOS)",
    "Annex 5 — university (MOS e-sign)",
    true,
    2,
  ),
  slot(
    "zaswiadczenie_studia",
    "Kabul / devam zaświadczenia (WSC alanlarıyla: dönem, ücret, dil…)",
    "Zaświadczenie o przyjęciu / kontynuacji studiów",
    "Admission / continuation certificate (WSC fields)",
    true,
    2,
  ),
  slot(
    "srodki_utrzymania",
    "Geçim kaynakları belgesi (öğrenci)",
    "Dokumenty środków utrzymania",
    "Proof of sufficient means (student)",
    true,
    3,
  ),
];

const rodzinaBaseExtra: DocumentSlotDef[] = [
  slot(
    "dokumenty_sponsora",
    "Sponsor oturum + gelir + sigorta belgeleri",
    "Dokumenty sponsora (pobyt, dochód, ubezpieczenie)",
    "Sponsor residence + income + insurance docs",
    true,
    4,
  ),
  slot(
    "wspolne_zamieszkanie",
    "Ortak yaşam / adres kanıtı",
    "Dowód wspólnego zamieszkania",
    "Proof of shared household",
    true,
    2,
  ),
];

const familyLinkExtra: Record<FamilyLink, DocumentSlotDef[]> = {
  malzonek: [
    slot(
      "akt_malzenstwa",
      "Evlilik belgesi (PL USC mümkünse; değilse + yeminli çeviri)",
      "Akt małżeństwa (+ tłum. przysięgłe jeśli trzeba)",
      "Marriage certificate (+ sworn tr. if needed)",
      true,
      2,
    ),
    slot(
      "dokument_malzonka",
      "Eşin kimlik / oturum / vatandaşlık belgesi",
      "Dokument małżonka (tożsamość / pobyt / obywatelstwo)",
      "Spouse ID / residence / citizenship proof",
      true,
      3,
    ),
  ],
  dziecko: [
    slot(
      "akt_urodzenia",
      "Doğum belgesi (+ yeminli çeviri gerekirse)",
      "Akt urodzenia (+ tłum. przysięgłe jeśli trzeba)",
      "Birth certificate (+ sworn tr. if needed)",
      true,
      2,
    ),
    slot(
      "dokument_rodzica_sponsora",
      "Ebeveyn / sponsor kimlik ve oturum belgeleri",
      "Dokumenty rodzica / sponsora",
      "Parent / sponsor ID and residence docs",
      true,
      3,
    ),
  ],
  rodzic: [
    slot(
      "akty_pokrewienstwa",
      "Ebeveyn-çocuk bağı belgeleri",
      "Dokumenty pokrewieństwa (rodzic–dziecko)",
      "Parent–child relationship documents",
      true,
      3,
    ),
    slot(
      "dokument_dziecka_sponsora",
      "Çocuk / sponsor oturum ve kimlik belgeleri",
      "Dokumenty dziecka / sponsora",
      "Child / sponsor residence and ID docs",
      true,
      3,
    ),
  ],
  inne: [
    slot(
      "akty_stanu_cywilnego",
      "Aile bağı belgesi (notta ilişkiyi yazın)",
      "Akt stanu cywilnego / więzi (opisz w notatce)",
      "Family-tie proof (describe in notes)",
      true,
      3,
    ),
  ],
};

const dzialalnoscExtra: DocumentSlotDef[] = [
  slot(
    "krs_cedig_jdg",
    "KRS / CEIDG / JDG kayıt belgesi",
    "Wypis KRS / CEIDG",
    "Company / sole trader extract (KRS, CEIDG)",
    true,
    2,
  ),
  slot(
    "dzialalnosc_dochody",
    "Faaliyet + gelir / vergi / ZUS belgeleri",
    "Dokumenty działalności, dochodów, podatków / ZUS",
    "Activity, income, tax / ZUS docs",
    true,
    4,
  ),
  slot(
    "zalacznik_1_zarzad",
    "Załącznik nr 1 — yönetim/prokura yoluysa (MOS işveren e-imza)",
    "Załącznik nr 1 — jeśli praca przez zarząd/prokurę (MOS)",
    "Annex 1 — if work via board/prokura (MOS)",
    false,
    2,
  ),
];

const stazExtra: DocumentSlotDef[] = [
  slot(
    "zalacznik_3_staz",
    "Załącznik nr 3 — staj organizatörü (MOS e-imza)",
    "Załącznik nr 3 — organizator stażu (MOS)",
    "Annex 3 — internship organiser (MOS)",
    true,
    2,
  ),
  slot(
    "umowa_staz",
    "Staj sözleşmesi / program belgesi",
    "Umowa / program stażu",
    "Internship contract / programme proof",
    true,
    2,
  ),
  slot(
    "srodki_utrzymania_staz",
    "Geçim kaynakları (staj)",
    "Środki utrzymania (staż)",
    "Means of subsistence (internship)",
    true,
    2,
  ),
];

const wolontariatExtra: DocumentSlotDef[] = [
  slot(
    "zalacznik_3_wolontariat",
    "Załącznik nr 3 — gönüllülük organizatörü (MOS e-imza)",
    "Załącznik nr 3 — organizator wolontariatu (MOS)",
    "Annex 3 — volunteering organiser (MOS)",
    true,
    2,
  ),
  slot(
    "umowa_wolontariat",
    "Gönüllülük sözleşmesi / anlaşması",
    "Umowa wolontariatu",
    "Volunteering agreement",
    true,
    2,
  ),
  slot(
    "srodki_utrzymania_wolontariat",
    "Geçim kaynakları (gönüllülük)",
    "Środki utrzymania (wolontariat)",
    "Means of subsistence (volunteering)",
    true,
    2,
  ),
];

const stalySharedExtra: DocumentSlotDef[] = [
  slot(
    "zamiar_osiedlenia",
    "Kalıcı yerleşme niyeti / barınma (kira, tapu, aile) — WSC",
    "Zamiar osiedlenia / dokumenty lokalu (WSC)",
    "Intent to settle / housing proof (WSC)",
    true,
    3,
  ),
];

const stalyBasisExtra: Record<StalyBasis, DocumentSlotDef[]> = {
  "malzonek-obywatela-pl": [
    slot(
      "akt_malzenstwa_staly",
      "Evlilik belgesi (mümkünse PL USC, güncel)",
      "Akt małżeństwa (najlepiej USC PL)",
      "Marriage certificate (preferably PL USC)",
      true,
      2,
    ),
    slot(
      "obywatelstwo_malzonka_pl",
      "Eşin Polonya vatandaşlığı (dowód osobisty / pasaport PL)",
      "Dowód obywatelstwa małżonka (dowód / paszport PL)",
      "Spouse Polish citizenship proof",
      true,
      2,
    ),
    slot(
      "wspolne_zycie_staly",
      "Ortak yaşam + önceki geçici oturum / süre kanıtları",
      "Wspólne pożycie + wcześniejszy pobyt czasowy",
      "Shared life + prior temporary stay proof",
      true,
      4,
    ),
  ],
  "dziecko-obywatela-pl": [
    slot(
      "akt_urodzenia_staly",
      "Doğum belgesi",
      "Akt urodzenia",
      "Birth certificate",
      true,
      2,
    ),
    slot(
      "obywatelstwo_rodzica_pl",
      "Ebeveynin Polonya vatandaşlığı kanıtı",
      "Dowód obywatelstwa polskiego rodzica",
      "Proof parent is Polish citizen",
      true,
      2,
    ),
  ],
  "karta-polaka": [
    slot(
      "karta_polaka",
      "Karta Polaka (geçerli) — tarama",
      "Karta Polaka (ważna) — skan",
      "Valid Pole’s Card — scan",
      true,
      2,
    ),
    slot(
      "dokumenty_osiedlenia_karta",
      "Yerleşme niyeti ekleri (iş, okul, aile, önceki kalış)",
      "Dokumenty zamiaru osiedlenia (praca, studia, rodzina)",
      "Settlement-intent extras (work, studies, family)",
      true,
      4,
    ),
  ],
  "polskie-pochodzenie": [
    slot(
      "dokumenty_pochodzenia",
      "Polonya kökeni / soy bağ belgeleri (ebeveyn, dede…)",
      "Dokumenty polskiego pochodzenia / pokrewieństwa",
      "Polish origin / kinship documents",
      true,
      4,
    ),
    slot(
      "tlumaczenia_pochodzenia",
      "Köken belgelerinin yeminli çevirileri",
      "Tłumaczenia przysięgłe dokumentów pochodzenia",
      "Sworn translations of origin documents",
      true,
      4,
    ),
  ],
  "pobyt-ciagly": [
    slot(
      "poprzednie_zezwolenia",
      "Önceki oturum izinleri / karty",
      "Poprzednie zezwolenia / karty pobytu",
      "Prior residence permits / cards",
      true,
      4,
    ),
    slot(
      "nieprzerwany_pobyt",
      "Kesintisiz kalış kanıtları",
      "Dowody nieprzerwanego pobytu",
      "Proof of continuous stay",
      true,
      4,
    ),
    slot(
      "srodki_i_ubezpieczenie_staly",
      "Geçim + sigorta (kalıcı / süre yolu)",
      "Środki utrzymania i ubezpieczenie",
      "Means + insurance (continuous-stay path)",
      true,
      3,
    ),
  ],
  inne: [
    slot(
      "podstawa_staly_inne",
      "Yasal dayanak belgeleri (notta açıklayın)",
      "Dokumenty podstawy prawnej (opisz w notatce)",
      "Legal-basis documents (explain in notes)",
      true,
      4,
    ),
  ],
};

const rezydentExtra: DocumentSlotDef[] = [
  slot(
    "piec_lat_pobytu",
    "5 yıl yasal kalış kanıtları (izinler / karty)",
    "Dowody 5 lat legalnego pobytu",
    "Proof of 5 years legal stay",
    true,
    4,
  ),
  slot(
    "stabilne_dochody",
    "İstikrarlı gelir belgeleri",
    "Stabilne i regularne źródło dochodu",
    "Stable regular income proof",
    true,
    3,
  ),
  slot(
    "ubezpieczenie_rezydent",
    "Sağlık sigortası (rezydent UE — ek kanıt)",
    "Ubezpieczenie zdrowotne (rezydent UE)",
    "Health insurance (EU long-term)",
    true,
    2,
  ),
];

const blueCardExtra: DocumentSlotDef[] = [
  slot(
    "zalacznik_1_blue",
    "Załącznik nr 1 — işveren (MOS)",
    "Załącznik nr 1 — pracodawca (MOS)",
    "Annex 1 — employer (MOS)",
    true,
    2,
  ),
  slot(
    "zalacznik_2_blue",
    "Załącznik nr 2 — Blue Card / yüksek nitelik",
    "Załącznik nr 2 — Niebieska Karta",
    "Annex 2 — Blue Card / high skills",
    true,
    2,
  ),
  slot(
    "umowa_min_1_rok",
    "En az 1 yıllık iş sözleşmesi",
    "Umowa na okres co najmniej 1 roku",
    "Contract for at least 1 year",
    true,
    2,
  ),
  slot(
    "dyplom_kwalifikacje",
    "Yükseköğretim diploması / nitelik (+ yeminli çeviri)",
    "Dyplom / kwalifikacje (+ tłum. przysięgłe)",
    "Higher-ed diploma / qualifications (+ sworn tr.)",
    true,
    3,
  ),
  slot(
    "pracodawca_zdolnosc_blue",
    "İşveren mali yeterlilik / faaliyet (WSC pratik)",
    "Środki / działalność pracodawcy",
    "Employer means / activity (WSC practice)",
    true,
    3,
  ),
  slot(
    "informacja_starosty_blue",
    "Starosta bilgisi veya istisna",
    "Informacja starosty lub zwolnienie",
    "Starosta information or exemption",
    false,
    2,
  ),
];

export const residenceTracks: Labeled<ResidenceTrack>[] = [
  {
    key: "pobyt-czasowy",
    labelTr: "Geçici oturum (pobyt czasowy)",
    labelPl: "Pobyt czasowy",
    labelEn: "Temporary residence",
    noteTr: "Başvuru MOS üzerinden elektronik yapılır. Sonraki adımda amacı seçiniz.",
    notePl: "Wniosek składa się elektronicznie w MOS. Następnie wybierz cel.",
    noteEn: "Applications are filed electronically via MOS. Next, select the purpose.",
  },
  {
    key: "pobyt-staly",
    labelTr: "Kalıcı oturum (pobyt stały)",
    labelPl: "Pobyt stały",
    labelEn: "Permanent residence",
    noteTr: "Yasal dayanak seçimi zorunludur; tek bir belge listesi yoktur.",
    notePl: "Wymagany jest wybór podstawy prawnej — nie ma jednej wspólnej listy.",
    noteEn: "A legal basis must be selected; there is no single shared document list.",
  },
  {
    key: "rezydent-ue",
    labelTr: "Uzun süreli AB sakini (rezydent UE)",
    labelPl: "Rezydent długoterminowy UE",
    labelEn: "EU long-term resident",
    noteTr: "Genelde ~5 yıl yasal kalış + gelir + sigorta.",
    notePl: "Zazwyczaj ~5 lat legalnego pobytu + dochód + ubezpieczenie.",
    noteEn: "Typically ~5 years legal stay + income + insurance.",
  },
  {
    key: "blue-card",
    labelTr: "AB Mavi Kart (Niebieska Karta)",
    labelPl: "Niebieska Karta UE",
    labelEn: "EU Blue Card",
    noteTr: "Załącznik 1–2 + ≥1 yıl sözleşme + diploma.",
    notePl: "Załączniki 1–2 + umowa ≥1 rok + dyplom.",
    noteEn: "Annexes 1–2 + ≥1y contract + diploma.",
  },
];

export const czasowyPurposes: Labeled<CzasowyPurpose>[] = [
  {
    key: "praca",
    labelTr: "Çalışma (jednolite / iş)",
    labelPl: "Praca (jednolite)",
    labelEn: "Work (single permit)",
    noteTr: "Załącznik 1 + sözleşme + işveren mali/faaliyet + sigorta.",
    notePl: "Zał. 1 + umowa + środki pracodawcy + ubezpieczenie.",
    noteEn: "Annex 1 + contract + employer means + insurance.",
  },
  {
    key: "studia",
    labelTr: "Eğitim / öğrencilik",
    labelPl: "Studia",
    labelEn: "Studies",
    noteTr: "Załącznik 5 + okul zaświadczenia + geçim.",
    notePl: "Zał. 5 + zaświadczenie uczelni + środki.",
    noteEn: "Annex 5 + university certificate + means.",
  },
  {
    key: "rodzina",
    labelTr: "Aile birleşimi",
    labelPl: "Połączenie z rodziną",
    labelEn: "Family reunification",
    noteTr: "Sonraki adım: eş / çocuk / ebeveyn.",
    notePl: "Następnie: małżonek / dziecko / rodzic.",
    noteEn: "Next: spouse / child / parent.",
  },
  {
    key: "dzialalnosc",
    labelTr: "Kendi işi / faaliyet",
    labelPl: "Działalność gospodarcza",
    labelEn: "Business activity",
    noteTr: "KRS/CEIDG + gelir; yönetim yoluysa Załącznik 1.",
    notePl: "KRS/CEIDG + dochody; zarząd → zał. 1.",
    noteEn: "KRS/CEIDG + income; board path → Annex 1.",
  },
  {
    key: "staz",
    labelTr: "Staj (staż)",
    labelPl: "Staż",
    labelEn: "Internship / traineeship",
    noteTr: "Załącznik nr 3 — organizatör MOS e-imza.",
    notePl: "Załącznik nr 3 — organizator w MOS.",
    noteEn: "Annex 3 — organiser signs in MOS.",
  },
  {
    key: "wolontariat",
    labelTr: "Gönüllülük (wolontariat)",
    labelPl: "Wolontariat",
    labelEn: "Volunteering",
    noteTr: "Załącznik nr 3 — organizatör MOS e-imza.",
    notePl: "Załącznik nr 3 — organizator w MOS.",
    noteEn: "Annex 3 — organiser signs in MOS.",
  },
];

export const stalyBases: Labeled<StalyBasis>[] = [
  {
    key: "malzonek-obywatela-pl",
    labelTr: "Polonya vatandaşı eşi",
    labelPl: "Małżonek obywatela RP",
    labelEn: "Spouse of a Polish citizen",
    noteTr: "Evlilik + eş vatandaşlığı + süre/ortak yaşam kanıtları.",
    notePl: "Małżeństwo + obywatelstwo + wspólne pożycie.",
    noteEn: "Marriage + citizenship + shared-life proof.",
  },
  {
    key: "dziecko-obywatela-pl",
    labelTr: "Polonya vatandaşı çocuğu",
    labelPl: "Dziecko obywatela RP",
    labelEn: "Child of a Polish citizen",
    noteTr: "Doğum + ebeveyn vatandaşlığı.",
    notePl: "Akt urodzenia + obywatelstwo rodzica.",
    noteEn: "Birth certificate + parent citizenship.",
  },
  {
    key: "karta-polaka",
    labelTr: "Karta Polaka sahibi",
    labelPl: "Posiadacz Karty Polaka",
    labelEn: "Pole’s Card holder",
    noteTr: "Karta + yerleşme niyeti. Opłata skarbowa genelde yok; 100 zł kart ücreti var.",
    notePl: "Karta + zamiar osiedlenia. Zwykle bez opłaty skarbowej; 100 zł za kartę.",
    noteEn: "Card + settlement intent. Usually no stamp duty; PLN 100 card fee remains.",
  },
  {
    key: "polskie-pochodzenie",
    labelTr: "Polonya kökeni (pochodzenie)",
    labelPl: "Polskie pochodzenie",
    labelEn: "Polish origin",
    noteTr: "Köken + soy bağ belgeleri + yeminli çeviri.",
    notePl: "Pochodzenie + pokrewieństwo + tłum. przysięgłe.",
    noteEn: "Origin + kinship docs + sworn translations.",
  },
  {
    key: "pobyt-ciagly",
    labelTr: "Uzun süreli / kesintisiz kalış sonrası",
    labelPl: "Po nieprzerwanym pobycie",
    labelEn: "After continuous long-term stay",
    noteTr: "Önceki izinler + kesintisiz kalış + geçim.",
    notePl: "Poprzednie zezwolenia + nieprzerwany pobyt.",
    noteEn: "Prior permits + continuous stay + means.",
  },
  {
    key: "inne",
    labelTr: "Diğer / emin değilim",
    labelPl: "Inna / nie jestem pewien",
    labelEn: "Other / not sure",
    noteTr: "Not alanına dayanağı kısaca yazınız; ekibimiz süreci netleştirecektir.",
    notePl: "Prosimy krótko opisać podstawę w notatce; skontaktujemy się w celu doprecyzowania.",
    noteEn: "Please briefly describe the basis in the notes field; our team will clarify next steps.",
  },
];

export const familyLinks: Labeled<FamilyLink>[] = [
  {
    key: "malzonek",
    labelTr: "Eşim ile birleşme",
    labelPl: "Małżonek",
    labelEn: "Spouse",
    noteTr: "Evlilik belgesi, eşin belgeleri ve geçim/sponsor belgeleri.",
    notePl: "Akt małżeństwa, dokumenty małżonka oraz dokumenty środków utrzymania.",
    noteEn: "Marriage certificate, spouse documents and means-of-support documents.",
  },
  {
    key: "dziecko",
    labelTr: "Çocuk",
    labelPl: "Dziecko",
    labelEn: "Child",
    noteTr: "Doğum belgesi ile ebeveyn ve geçim/sponsor belgeleri.",
    notePl: "Akt urodzenia oraz dokumenty rodzica i środków utrzymania.",
    noteEn: "Birth certificate plus parent and means-of-support documents.",
  },
  {
    key: "rodzic",
    labelTr: "Ebeveyn (anne/baba)",
    labelPl: "Rodzic",
    labelEn: "Parent",
    noteTr: "Akrabalık belgesi ile geçim/sponsor belgeleri.",
    notePl: "Dokumenty pokrewieństwa oraz środki utrzymania.",
    noteEn: "Proof of kinship and means-of-support documents.",
  },
  {
    key: "inne",
    labelTr: "Diğer aile bağı",
    labelPl: "Inna więź rodzinna",
    labelEn: "Other family tie",
    noteTr: "Lütfen not alanına ilişkiyi kısaca açıklayınız.",
    notePl: "Prosimy krótko opisać więź w notatce.",
    noteEn: "Please briefly describe the relationship in the notes field.",
  },
];

export function isResidenceTrack(v: string): v is ResidenceTrack {
  return residenceTracks.some((t) => t.key === v);
}

export function isCzasowyPurpose(v: string): v is CzasowyPurpose {
  return czasowyPurposes.some((t) => t.key === v);
}

export function isStalyBasis(v: string): v is StalyBasis {
  return stalyBases.some((t) => t.key === v);
}

export function isFamilyLink(v: string): v is FamilyLink {
  return familyLinks.some((t) => t.key === v);
}

export function isResidenceStatusKey(
  value: string,
): value is ResidenceStatusKey {
  return (
    value === "pobyt-praca" ||
    value === "pobyt-studia" ||
    value === "pobyt-rodzina" ||
    value === "pobyt-dzialalnosc" ||
    value === "pobyt-staly" ||
    value === "rezydent-ue" ||
    value === "blue-card"
  );
}

export function legacyStatusToSelection(
  status: ResidenceStatusKey,
): ResidenceSelection {
  switch (status) {
    case "pobyt-praca":
      return { track: "pobyt-czasowy", purpose: "praca" };
    case "pobyt-studia":
      return { track: "pobyt-czasowy", purpose: "studia" };
    case "pobyt-rodzina":
      return {
        track: "pobyt-czasowy",
        purpose: "rodzina",
        familyLink: "inne",
      };
    case "pobyt-dzialalnosc":
      return { track: "pobyt-czasowy", purpose: "dzialalnosc" };
    case "pobyt-staly":
      return { track: "pobyt-staly", basis: "pobyt-ciagly" };
    case "rezydent-ue":
      return { track: "rezydent-ue" };
    case "blue-card":
      return { track: "blue-card" };
  }
}

export function selectionToLegacyStatus(
  sel: ResidenceSelection,
): ResidenceStatusKey | undefined {
  if (sel.track === "rezydent-ue") return "rezydent-ue";
  if (sel.track === "blue-card") return "blue-card";
  if (sel.track === "pobyt-staly") return "pobyt-staly";
  if (sel.track === "pobyt-czasowy") {
    if (sel.purpose === "praca") return "pobyt-praca";
    if (sel.purpose === "studia") return "pobyt-studia";
    if (sel.purpose === "rodzina") return "pobyt-rodzina";
    if (sel.purpose === "dzialalnosc") return "pobyt-dzialalnosc";
  }
  return undefined;
}

export function parseResidenceSelection(
  raw: unknown,
): ResidenceSelection | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.track !== "string" || !isResidenceTrack(o.track)) return null;
  const sel: ResidenceSelection = { track: o.track };
  if (typeof o.purpose === "string" && isCzasowyPurpose(o.purpose)) {
    sel.purpose = o.purpose;
  }
  if (typeof o.basis === "string" && isStalyBasis(o.basis)) {
    sel.basis = o.basis;
  }
  if (typeof o.familyLink === "string" && isFamilyLink(o.familyLink)) {
    sel.familyLink = o.familyLink;
  }
  return sel;
}

export function isResidenceSelectionComplete(
  sel: ResidenceSelection | null | undefined,
): sel is ResidenceSelection {
  if (!sel) return false;
  if (sel.track === "rezydent-ue" || sel.track === "blue-card") return true;
  if (sel.track === "pobyt-staly") return Boolean(sel.basis);
  if (sel.track === "pobyt-czasowy") {
    if (!sel.purpose) return false;
    if (sel.purpose === "rodzina") return Boolean(sel.familyLink);
    return true;
  }
  return false;
}

export function normalizeResidence(input: {
  residence?: ResidenceSelection | null;
  residenceStatus?: string | null;
}): ResidenceSelection | null {
  const parsed = parseResidenceSelection(input.residence);
  if (parsed && isResidenceSelectionComplete(parsed)) return parsed;
  if (parsed) return parsed;
  if (input.residenceStatus && isResidenceStatusKey(input.residenceStatus)) {
    return legacyStatusToSelection(input.residenceStatus);
  }
  return null;
}

export function residenceSlotsForSelection(
  sel: ResidenceSelection,
): DocumentSlotDef[] {
  const out: DocumentSlotDef[] = [...coreFor(sel)];

  if (sel.track === "rezydent-ue") return [...out, ...rezydentExtra];
  if (sel.track === "blue-card") return [...out, ...blueCardExtra];

  if (sel.track === "pobyt-staly") {
    out.push(...stalySharedExtra);
    if (sel.basis) out.push(...stalyBasisExtra[sel.basis]);
    return out;
  }

  if (sel.track === "pobyt-czasowy") {
    if (sel.purpose === "praca") out.push(...pracaExtra);
    if (sel.purpose === "studia") out.push(...studiaExtra);
    if (sel.purpose === "dzialalnosc") out.push(...dzialalnoscExtra);
    if (sel.purpose === "staz") out.push(...stazExtra);
    if (sel.purpose === "wolontariat") out.push(...wolontariatExtra);
    if (sel.purpose === "rodzina") {
      out.push(...rodzinaBaseExtra);
      if (sel.familyLink) out.push(...familyLinkExtra[sel.familyLink]);
    }
  }
  return out;
}

/** @deprecated */
export const residenceSlotsByStatus: Record<
  ResidenceStatusKey,
  DocumentSlotDef[]
> = {
  "pobyt-praca": residenceSlotsForSelection({
    track: "pobyt-czasowy",
    purpose: "praca",
  }),
  "pobyt-studia": residenceSlotsForSelection({
    track: "pobyt-czasowy",
    purpose: "studia",
  }),
  "pobyt-rodzina": residenceSlotsForSelection({
    track: "pobyt-czasowy",
    purpose: "rodzina",
    familyLink: "inne",
  }),
  "pobyt-dzialalnosc": residenceSlotsForSelection({
    track: "pobyt-czasowy",
    purpose: "dzialalnosc",
  }),
  "pobyt-staly": residenceSlotsForSelection({
    track: "pobyt-staly",
    basis: "pobyt-ciagly",
  }),
  "rezydent-ue": residenceSlotsForSelection({ track: "rezydent-ue" }),
  "blue-card": residenceSlotsForSelection({ track: "blue-card" }),
};

export const residenceStatuses = [
  ...czasowyPurposes
    .filter((p) =>
      ["praca", "studia", "rodzina", "dzialalnosc"].includes(p.key),
    )
    .map((p) => ({
      key: selectionToLegacyStatus({
        track: "pobyt-czasowy",
        purpose: p.key,
      }) as ResidenceStatusKey,
      phase: "A" as const,
      labelTr: p.labelTr,
      labelPl: p.labelPl,
      labelEn: p.labelEn,
      noteTr: p.noteTr,
      notePl: p.notePl,
      noteEn: p.noteEn,
    })),
  {
    key: "pobyt-staly" as const,
    phase: "B" as const,
    labelTr: "Kalıcı oturum (pobyt stały)",
    labelPl: "Pobyt stały",
    labelEn: "Permanent residence",
    noteTr: "Yasal dayanak seçilmeden liste netleşmez.",
    notePl: "Bez podstawy prawnej lista jest niekompletna.",
    noteEn: "Without a legal basis the list stays incomplete.",
  },
  {
    key: "rezydent-ue" as const,
    phase: "B" as const,
    labelTr: "Uzun süreli AB sakini (rezydent UE)",
    labelPl: "Rezydent długoterminowy UE",
    labelEn: "EU long-term resident",
    noteTr: "Genelde 5 yıl yasal kalış + gelir + sigorta.",
    notePl: "Zazwyczaj 5 lat legalnego pobytu + dochód + ubezpieczenie.",
    noteEn: "Typically 5 years legal stay + stable income + insurance.",
  },
  {
    key: "blue-card" as const,
    phase: "B" as const,
    labelTr: "AB Mavi Kart (Niebieska Karta)",
    labelPl: "Niebieska Karta UE",
    labelEn: "EU Blue Card",
    noteTr: "Załącznik 1–2 + ≥1 yıl sözleşme + diploma.",
    notePl: "Załączniki 1–2 + umowa ≥1 rok + dyplom.",
    noteEn: "Annexes 1–2 + ≥1y contract + diploma.",
  },
];

function pickLabel(
  item: { labelTr: string; labelPl: string; labelEn: string },
  locale: string,
): string {
  if (locale === "pl") return item.labelPl;
  if (locale === "en") return item.labelEn;
  return item.labelTr;
}

function pickNote(
  item: { noteTr: string; notePl: string; noteEn: string },
  locale: string,
): string {
  if (locale === "pl") return item.notePl;
  if (locale === "en") return item.noteEn;
  return item.noteTr;
}

export function residenceSelectionSummary(
  sel: ResidenceSelection,
  locale: string,
): string {
  const parts: string[] = [];
  const track = residenceTracks.find((t) => t.key === sel.track);
  if (track) parts.push(pickLabel(track, locale));
  if (sel.purpose) {
    const p = czasowyPurposes.find((x) => x.key === sel.purpose);
    if (p) parts.push(pickLabel(p, locale));
  }
  if (sel.basis) {
    const b = stalyBases.find((x) => x.key === sel.basis);
    if (b) parts.push(pickLabel(b, locale));
  }
  if (sel.familyLink) {
    const f = familyLinks.find((x) => x.key === sel.familyLink);
    if (f) parts.push(pickLabel(f, locale));
  }
  return parts.join(" · ");
}

export function residenceSelectionNote(
  sel: ResidenceSelection,
  locale: string,
): string {
  if (sel.familyLink) {
    const f = familyLinks.find((x) => x.key === sel.familyLink);
    if (f) return pickNote(f, locale);
  }
  if (sel.basis) {
    const b = stalyBases.find((x) => x.key === sel.basis);
    if (b) return pickNote(b, locale);
  }
  if (sel.purpose) {
    const p = czasowyPurposes.find((x) => x.key === sel.purpose);
    if (p) return pickNote(p, locale);
  }
  const track = residenceTracks.find((t) => t.key === sel.track);
  return track ? pickNote(track, locale) : "";
}

export function residenceStatusLabel(
  key: ResidenceStatusKey,
  locale: string,
): string {
  return residenceSelectionSummary(legacyStatusToSelection(key), locale);
}

export function residenceStatusNote(
  key: ResidenceStatusKey,
  locale: string,
): string {
  return residenceSelectionNote(legacyStatusToSelection(key), locale);
}

export { slotLabel };
