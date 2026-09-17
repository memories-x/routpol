/**
 * Local panel preview: realistic cases so the workstation looks occupied.
 * Not production data. data/ is gitignored.
 *
 *   node scripts/seed-panel-preview.mjs
 *   node scripts/seed-panel-preview.mjs --clear
 */
import { promises as fs } from "fs";
import path from "path";

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "data", "cases");
const PARTNER_DIR = path.join(ROOT, "data", "partners");
const UPLOAD_ROOT = path.join(ROOT, "data", "uploads");
const INDEX = path.join(DATA_DIR, "index.json");
const PARTNER_INDEX = path.join(PARTNER_DIR, "index.json");
const PREFIX = "case_seed_";
const PARTNER_PREFIX = "partner_seed_";

const PREVIEW_PARTNERS = [
  {
    id: "partner_seed_nowak",
    name: "Kancelaria Nowak",
    officeName: "Kancelaria Adwokacka Nowak",
    email: "k.nowak@example.pl",
    phone: "+48 22 200 00 01",
    nip: "5250000001",
    barNumber: "WA-1234",
    city: "Warszawa",
    address: "ul. Marszałkowska 1",
    notes: "Örnek kart — canlı ortak değil.",
    languages: ["pl", "en"],
    specialty: "ZUS, şirket",
    contractStatus: "signed",
    website: "https://example.pl",
    active: true,
  },
  {
    id: "partner_seed_lewandowska",
    name: "Kancelaria Lewandowska",
    officeName: "Kancelaria Lewandowska",
    email: "a.lewandowska@example.pl",
    phone: "+48 12 300 00 02",
    nip: "6770000002",
    barNumber: "KR-5678",
    city: "Kraków",
    notes: "Örnek kart — canlı ortak değil.",
    languages: ["pl", "tr"],
    specialty: "Oturum, iş hukuku",
    contractStatus: "draft",
    active: true,
  },
];

const PARTNER_ID_BY_NAME = {
  "Kancelaria Nowak": "partner_seed_nowak",
  "Kancelaria Lewandowska": "partner_seed_lewandowska",
};

const MIN_PDF = Buffer.from(
  `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]>>endobj
xref
0 4
0000000000 65535 f 
0000000009 00000 n 
0000000052 00000 n 
0000000101 00000 n 
trailer<</Size 4/Root 1 0 R>>
startxref
178
%%EOF
`,
  "utf8",
);

function daysAgo(n) {
  return new Date(Date.now() - n * 86_400_000).toISOString();
}

function note(id, body, shared, days) {
  return {
    id,
    body,
    author: "operator",
    sharedWithCustomer: shared,
    createdAt: daysAgo(days),
  };
}

function doc(caseId, slotKey, originalName, days, pageCount) {
  const id = `doc_${caseId}_${slotKey}`;
  const filename = `${id}.pdf`;
  const storagePath = path.join(caseId, slotKey, filename);
  return {
    meta: {
      id,
      slotKey,
      originalName,
      mime: "application/pdf",
      size: MIN_PDF.length,
      storagePath,
      uploadedAt: daysAgo(days),
      pageCount,
    },
    storagePath,
  };
}

async function writePdf(storagePath) {
  const abs = path.join(UPLOAD_ROOT, storagePath);
  await fs.mkdir(path.dirname(abs), { recursive: true });
  await fs.writeFile(abs, MIN_PDF);
}

async function readIndex() {
  try {
    const parsed = JSON.parse(await fs.readFile(INDEX, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function clearSeed(ids) {
  const keep = [];
  for (const id of ids) {
    if (!id.startsWith(PREFIX)) {
      keep.push(id);
      continue;
    }
    await fs.rm(path.join(DATA_DIR, `${id}.json`), { force: true });
    await fs.rm(path.join(UPLOAD_ROOT, id), { recursive: true, force: true });
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(INDEX, JSON.stringify(keep, null, 2), "utf8");
  return keep;
}

async function clearPartnerSeed() {
  await fs.mkdir(PARTNER_DIR, { recursive: true });
  let ids = [];
  try {
    const parsed = JSON.parse(await fs.readFile(PARTNER_INDEX, "utf8"));
    ids = Array.isArray(parsed) ? parsed : [];
  } catch {
    ids = [];
  }
  const keep = [];
  for (const id of ids) {
    if (!id.startsWith(PARTNER_PREFIX)) {
      keep.push(id);
      continue;
    }
    await fs.rm(path.join(PARTNER_DIR, `${id}.json`), { force: true });
  }
  await fs.writeFile(PARTNER_INDEX, JSON.stringify(keep, null, 2), "utf8");
  return keep;
}

async function seedPartners() {
  const kept = await clearPartnerSeed();
  const now = new Date().toISOString();
  const ids = [];
  for (const p of PREVIEW_PARTNERS) {
    const record = {
      ...p,
      createdAt: now,
      updatedAt: now,
    };
    await fs.writeFile(
      path.join(PARTNER_DIR, `${p.id}.json`),
      JSON.stringify(record, null, 2),
      "utf8",
    );
    ids.push(p.id);
  }
  await fs.writeFile(
    PARTNER_INDEX,
    JSON.stringify([...ids, ...kept], null, 2),
    "utf8",
  );
}

function buildCases() {
  const specs = [
    {
      n: "01",
      daysCreated: 18,
      updatedDays: 1,
      locale: "en",
      packageSlug: "surec-yonetimi",
      pricingMeta: { entityType: "sirket" },
      status: "in_progress",
      customer: {
        fullName: "Elena Petrov",
        email: "e.petrov@nordtech.example",
        phone: "+48 22 100 11 01",
        companyName: "NordTech Sp. z o.o.",
        matter: "ZUS — katkı yazışması",
        resultLocale: "en",
      },
      amountCents: 120000,
      paidDays: 12,
      lawyerPartner: "Kancelaria Nowak",
      docs: [
        ["mektup", "ZUS-wezwanie-2026-07.pdf", 12, 4],
      ],
      checklist: [
        ["poa_confirmed", 11],
        ["sent_to_partner", 10],
      ],
      notes: [
        ["POA teyit, dosya Nowak’a iletildi.", false, 10],
        ["Partner: ZUS ek belge isteyebilir — müşteriye EN özet hazırlanacak.", true, 1],
      ],
    },
    {
      n: "02",
      daysCreated: 9,
      updatedDays: 1,
      locale: "pl",
      packageSlug: "aylik-paket",
      pricingMeta: { fileQuota: 8 },
      status: "paid",
      customer: {
        fullName: "Marek Jankowski",
        email: "m.jankowski@balticfoods.example",
        phone: "+48 58 200 22 02",
        companyName: "Baltic Foods S.A.",
        matter: "US — PIT korespondencja",
        resultLocale: "pl",
      },
      amountCents: 32000,
      paidDays: 5,
      lawyerPartner: "",
      docs: [["mektup", "US-PIT-wezwanie.pdf", 5, 2]],
      checklist: [],
      notes: [
        ["Ödeme alındı. Bu dönem 8 dosya kotası.", false, 5],
      ],
    },
    {
      n: "03",
      daysCreated: 40,
      updatedDays: 14,
      locale: "en",
      packageSlug: "tek-yazi",
      pricingMeta: { pageCount: 6, pagesFromUpload: true },
      status: "closed",
      customer: {
        fullName: "Klaus Weber",
        email: "k.weber@helios-log.example",
        phone: "+48 32 300 33 03",
        companyName: "Helios Logistics Sp. z o.o.",
        matter: "PIP — kontrol yazısı",
        resultLocale: "en",
      },
      amountCents: 15000,
      paidDays: 38,
      lawyerPartner: "Kancelaria Lewandowska",
      docs: [
        ["mektup", "PIP-letter.pdf", 40, 6],
        ["sonuc", "PIP-summary-EN.pdf", 14, 2],
      ],
      checklist: [
        ["letter_downloaded", 38],
        ["lang_page_check", 37],
        ["result_uploaded", 14],
        ["customer_notified", 14],
      ],
      notes: [
        ["Sonuç yüklendi, müşteri linki gönderildi.", true, 14],
      ],
    },
    {
      n: "04",
      daysCreated: 3,
      updatedDays: 0,
      locale: "tr",
      packageSlug: "surec-yonetimi",
      pricingMeta: { entityType: "sirket" },
      status: "paid",
      customer: {
        fullName: "Ayşe Kaya",
        email: "a.kaya@anatolia-trade.example",
        phone: "+48 22 400 44 04",
        companyName: "Anatolia Trade Sp. z o.o.",
        matter: "ZUS — ZUA bildirimi",
        resultLocale: "tr",
      },
      amountCents: 120000,
      paidDays: 1,
      lawyerPartner: "Kancelaria Nowak",
      docs: [["mektup", "ZUA-form-scan.pdf", 3, 3]],
      checklist: [["poa_confirmed", 1]],
      notes: [["Kuyrukta — bugün ortağa iletilecek.", false, 0]],
    },
    {
      n: "05",
      daysCreated: 7,
      updatedDays: 2,
      locale: "en",
      packageSlug: "aylik-paket",
      pricingMeta: { fileQuota: 4 },
      status: "in_progress",
      customer: {
        fullName: "Olena Bondarenko",
        email: "o.bondarenko@lvivsoft.example",
        phone: "+48 12 500 55 05",
        companyName: "Lviv Soft Sp. z o.o.",
        matter: "KAS — JPK açıklama",
        resultLocale: "en",
      },
      amountCents: 16000,
      paidDays: 6,
      lawyerPartner: "",
      docs: [["mektup", "KAS-JPK.pdf", 7, 2]],
      checklist: [
        ["matter_clear", 6],
        ["period_check", 2],
      ],
      notes: [["Dönem kontrolü yapıldı; EN özet yarın.", false, 2]],
    },
    {
      n: "06",
      daysCreated: 1,
      updatedDays: 1,
      locale: "en",
      packageSlug: "tek-yazi",
      pricingMeta: { pageCount: 2, pagesFromUpload: true },
      status: "awaiting_payment",
      customer: {
        fullName: "James Whitfield",
        email: "j.whitfield@wargate.example",
        phone: "+48 22 600 66 06",
        companyName: "Warsaw Gate Hotels Sp. z o.o.",
        matter: "Sanepid — pismo",
        resultLocale: "en",
      },
      amountCents: 5000,
      paidDays: null,
      lawyerPartner: "",
      docs: [["mektup", "Sanepid-letter.pdf", 1, 2]],
      checklist: [],
      notes: [],
    },
    {
      n: "07",
      daysCreated: 21,
      updatedDays: 16,
      locale: "pl",
      packageSlug: "tek-yazi",
      pricingMeta: { pageCount: 3, pagesFromUpload: true },
      status: "closed",
      customer: {
        fullName: "Anna Kowalska",
        email: "anna.kowalska@example.pl",
        phone: "+48 601 100 107",
        matter: "US — PIT-37",
        resultLocale: "pl",
      },
      amountCents: 7500,
      paidDays: 20,
      lawyerPartner: "",
      docs: [
        ["mektup", "PIT37-wezwanie.pdf", 21, 3],
        ["sonuc", "PIT37-streszczenie-PL.pdf", 16, 1],
      ],
      checklist: [
        ["letter_downloaded", 20],
        ["lang_page_check", 19],
        ["result_uploaded", 16],
        ["customer_notified", 16],
      ],
      notes: [["Wynik przekazany klientce.", true, 16]],
    },
    {
      n: "08",
      daysCreated: 11,
      updatedDays: 6,
      locale: "tr",
      packageSlug: "surec-yonetimi",
      pricingMeta: { entityType: "sahis" },
      status: "in_progress",
      customer: {
        fullName: "Mehmet Yılmaz",
        email: "m.yilmaz@example.com",
        phone: "+48 602 200 108",
        matter: "ZUS — yazışma takibi",
        resultLocale: "tr",
      },
      amountCents: 65000,
      paidDays: 10,
      lawyerPartner: "Kancelaria Nowak",
      docs: [["mektup", "ZUS-pismo.pdf", 11, 2]],
      checklist: [
        ["poa_confirmed", 10],
        ["sent_to_partner", 9],
      ],
      notes: [
        ["Ortak dönüşü bekleniyor (6 gün).", false, 6],
      ],
    },
    {
      n: "09",
      daysCreated: 12,
      updatedDays: 2,
      locale: "en",
      packageSlug: "aylik-paket",
      pricingMeta: { fileQuota: 4 },
      status: "paid",
      customer: {
        fullName: "Olena Shevchenko",
        email: "o.shevchenko@example.com",
        phone: "+48 603 300 109",
        matter: "Urząd pracy — pismo",
        resultLocale: "en",
      },
      amountCents: 16000,
      paidDays: 9,
      lawyerPartner: "",
      docs: [["mektup", "UP-letter.pdf", 12, 1]],
      checklist: [],
      notes: [["Paid — not yet picked up from queue.", false, 9]],
    },
    {
      n: "10",
      daysCreated: 0,
      updatedDays: 0,
      locale: "pl",
      packageSlug: "tek-yazi",
      pricingMeta: { pageCount: 2, pagesFromUpload: true },
      status: "awaiting_payment",
      customer: {
        fullName: "Piotr Wiśniewski",
        email: "piotr.wisniewski@example.pl",
        phone: "+48 604 400 110",
        matter: "Starostwo — pismo",
        resultLocale: "pl",
      },
      amountCents: 5000,
      paidDays: null,
      lawyerPartner: "",
      docs: [["mektup", "starostwo.pdf", 0, 2]],
      checklist: [],
      notes: [],
    },
    {
      n: "11",
      daysCreated: 28,
      updatedDays: 20,
      locale: "tr",
      packageSlug: "surec-yonetimi",
      pricingMeta: { entityType: "sahis" },
      status: "closed",
      customer: {
        fullName: "Fatma Demir",
        email: "f.demir@example.com",
        phone: "+48 605 500 111",
        matter: "US — VAT yazısı",
        resultLocale: "tr",
      },
      amountCents: 65000,
      paidDays: 27,
      lawyerPartner: "Kancelaria Lewandowska",
      docs: [
        ["mektup", "VAT-wezwanie.pdf", 28, 5],
        ["sonuc", "VAT-ozet-TR.pdf", 20, 2],
      ],
      checklist: [
        ["poa_confirmed", 27],
        ["sent_to_partner", 26],
        ["partner_reply", 21],
        ["summary_shared", 20],
        ["archive_updated", 20],
      ],
      notes: [["Süreç kapandı; TR özet paylaşıldı.", true, 20]],
    },
    {
      n: "12",
      daysCreated: 15,
      updatedDays: 12,
      locale: "pl",
      packageSlug: "tek-yazi",
      pricingMeta: { pageCount: 2, pagesFromUpload: true },
      status: "unpaid_archived",
      customer: {
        fullName: "Jan Nowak",
        email: "jan.nowak@example.pl",
        phone: "+48 606 600 112",
        matter: "ZUS — pismo",
        resultLocale: "pl",
      },
      amountCents: 5000,
      paidDays: null,
      paymentStatus: "failed",
      lawyerPartner: "",
      docs: [["mektup", "zus-pismo.pdf", 15, 2]],
      checklist: [],
      notes: [["Ödeme gelmedi, arşiv.", false, 12]],
    },
  ];

  return specs.map((s) => {
    const id = `${PREFIX}${s.n}`;
    const createdAt = daysAgo(s.daysCreated);
    const updatedAt = daysAgo(s.updatedDays);
    const paidAt = s.paidDays == null ? undefined : daysAgo(s.paidDays);
    const builtDocs = s.docs.map((d) =>
      doc(id, d[0], d[1], d[2], d[3]),
    );
    const checklist = s.checklist.map(([key, d]) => ({
      key,
      label: key,
      doneAt: daysAgo(d),
    }));
    const notes = s.notes.map((n, i) =>
      note(`${id}_n${i}`, n[0], n[1], n[2]),
    );
    const paymentStatus =
      s.paymentStatus ||
      (s.status === "awaiting_payment"
        ? "pending"
        : s.status === "unpaid_archived"
          ? "failed"
          : "paid");

    return {
      record: {
        id,
        createdAt,
        updatedAt,
        locale: s.locale,
        packageSlug: s.packageSlug,
        pricingMeta: s.pricingMeta,
        status: s.status,
        customer: s.customer,
        documents: builtDocs.map((d) => d.meta),
        payment: {
          amountCents: s.amountCents,
          currency: "pln",
          status: paymentStatus,
          ...(paidAt ? { paidAt } : {}),
          ...(paymentStatus === "paid"
            ? {
                invoice: {
                  status: "pending",
                  lastError: "Önizleme seed — Fakturownia yok",
                },
              }
            : {}),
        },
        accessToken: `tok_seed_${s.n}`,
        lawyerPartner: s.lawyerPartner || undefined,
        lawyerPartnerId: PARTNER_ID_BY_NAME[s.lawyerPartner] || undefined,
        checklist,
        notes,
        archiveFolder: `${(paidAt || createdAt).slice(0, 7)}_${s.n}`,
      },
      files: builtDocs.map((d) => d.storagePath),
    };
  });
}

async function main() {
  const clearOnly = process.argv.includes("--clear");
  await fs.mkdir(DATA_DIR, { recursive: true });
  const existing = await readIndex();
  const kept = await clearSeed(existing);
  await clearPartnerSeed();

  if (clearOnly) {
    console.log(`cleared seed; remaining=${kept.length}`);
    return;
  }

  await seedPartners();

  const built = buildCases();
  const seedIds = [];
  for (const item of built) {
    await fs.writeFile(
      path.join(DATA_DIR, `${item.record.id}.json`),
      JSON.stringify(item.record, null, 2),
      "utf8",
    );
    for (const p of item.files) {
      await writePdf(p);
    }
    seedIds.push(item.record.id);
  }

  const next = [...seedIds, ...kept.filter((id) => !id.startsWith(PREFIX))];
  await fs.writeFile(INDEX, JSON.stringify(next, null, 2), "utf8");
  console.log(`seeded ${seedIds.length} preview cases`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
