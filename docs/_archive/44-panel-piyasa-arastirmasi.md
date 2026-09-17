# Panel piyasa araştırması — benzer yapılar

**Tarih:** 2026-08-16  
**Amaç:** POL-TURK operatör paneli için emsal ürünleri tespit etmek; kopyalamadan uyarlamak.  
**Kanonik sınır:** POL-TURK avukatlık yazılımı değil — köprü (dil / koordinasyon / takip / evrak).

---

## 1) En yakın emsaller (Polonya / AB — yabancı işi)

| Ürün | Link | Ne yapıyor | Panel kalıbı | POL-TURK’e uyum |
|------|------|------------|--------------|-----------------|
| **Urząd Tracker** (Ingenios) | https://ingenios.pl/en/urzad-tracker/ | Urząd/ZUS/US/wojewoda dosya CRM | Durum değişince WhatsApp/SMS/e-posta; checklist; 400+ kurum | **En yakın PL emsali.** Status → otomatik dil bildirimi; checklist; müşteri kartı |
| **LegalSol Business** | https://www.legalsol.pl/business | Toplu legalizasyon (HR) | Kurumsal dashboard, checklist/çalışan, SSO, rapor | Aylık paket / şirket müşteri için çok-dosya görünümü |
| **LegalTrack** | https://legaltrack.pl/ | Legalizasyon SaaS | Dashboard, çalışan portalı, praca.gov otomasyon | Biz MOS/praca.gov otomasyonu **yapmıyoruz** — sadece takip notu |
| **Legal HR FSM** | https://legalhr.pl/en/foreigners-service-module/ | İşveren HR modülü | Görev panosu, süreler, praca.gov entegrasyon | Operatör görev listesi P2 |
| **MOS (UDSC)** | https://mos.cudzoziemcy.gov.pl/ | Resmî başvuru | Hesap, form, e-imza, durum | Rakip değil; rehber + takip notu alanı |

---

## 2) Immigration case management (ABD — avukat panelleri)

| Ürün | Link | Tipik panel özellikleri | Alınacak / alınmayacak |
|------|------|-------------------------|------------------------|
| **LollyLaw** | https://lollylaw.com/ | Matter + form library + Client Bridge + SMS + billing + workflow | Al: müşteri portalı, durum, evrak, ödeme. Alma: USCIS form doldurma, billable hours |
| **eimmigration** | https://get.eimmigration.com/ | Client profile, portal, status, intake AI | Al: tek kartta biyo + evrak. Alma: form AI / USCIS |
| **CampLegal** | https://camplegal.com/ | ClientApp, otomatik task, receipt tracking | Al: status → müşteri bildirimi. Alma: USCIS receipt otomasyonu |
| **Prolexis** | https://prolexis.ai/ | 15 dil portal, AI form | Al: çok dilli müşteri yüzü. Alma: AI hukuk |

**Genel hukuk PMS:** Clio, MyCase, PracticePanther — Matter + Client + Docs + Billing + Portal. POL-TURK için fazla “kancelaria”; Matter≈Case, Contact≈Customer kalıbı yeterli.

---

## 3) Tercüme / dil ajansı portalları (köprüye çok yakın)

| Ürün / tip | Örnek | Kalıp |
|------------|-------|-------|
| Ajans portalı | JR Language, Diction, Stepes, LingoService | Sipariş → yükle → durum → teslimat indir → fatura |
| Analiz | https://awtomated.com/translation-agency-client-portal-why-your-clients-expect-one-and-how-to-set-it-up/ | Tek yer; e-posta kaosunu kes |

**POL-TURK `tek-yazi` = klasik translation/letter desk sipariş döngüsü.**  
Bu kategori, immigration CRM’den daha doğru emsal.

---

## 4) Letter / print desk (tek yazı operasyonu)

| Ürün | Link | Kalıp |
|------|------|-------|
| LetterStream | https://www.letterstream.com/webportal/ | Job list, PDF upload, status, roller |
| PostGrid | https://www.postgrid.com/print-mail-letters/ | Order list, PDF, track |

Bizde: mektup yükle → öde → operatör sonuç yükle → müşteri indir.

---

## 5) PL kancelaria müşteri portalları

| Örnek | Kalıp |
|-------|-------|
| Midapt LegalDesk | Admin (Filament) + müşteri dashboard: durum timeline, docs, ödeme, RODO |
| Advisor247 Portal | Seçici paylaşım (kancelaria kontrolünde ne görünür) |
| Moja Sprawa (Łebek) | App: chat, docs, push — login: dosya no + e-posta + telefon |

**Bizde zaten var:** token link + paylaşılan not + dossier JSON (Advisor247 “kontrollü paylaşım” modeline yakın).

---

## 6) Ortak panel anatomisi (piyasa standardı)

```
OPERATÖR                          MÜŞTERİ
─────────                         ───────
Dashboard (sayaçlar)              Durum + sonraki adım
Contacts / Customers              Evrak yükle / indir
Matters / Cases (filtre)          Paylaşılan notlar
Case detail:                      Ödeme geçmişi (opsiyonel)
  - checklist / görevler
  - docs (inbox/outbox)
  - notes (internal | shared)
  - status machine
  - billing
Bildirim: e-posta / SMS / WA      Bildirim: aynı kanallar
```

---

## 7) POL-TURK uyarlama matrisi

| Piyasa özelliği | Bizde şimdi | Öneri |
|-----------------|-------------|-------|
| Customer hub | P1 var | Koru; zenginleştir |
| Case list + filter | P1 var | Koru |
| Status machine | var | Pipeline etiketleri TR/PL/EN |
| Doc inbox/outbox | var (mektup/sonuç) | Checklist şablonları (paket bazlı) |
| Shared notes | var | Timeline görünümü |
| Client portal (login) | token link | Şimdilik yeterli; P2 hesap opsiyonel |
| WhatsApp/SMS status | yok | **Urząd Tracker kalıbı — P2 yüksek değer** |
| Lawyer partner field | yok | P2 (köprü: “hangi ortakta”) |
| Form fill / MOS API | yok | **Yapma** (avukatlık sınırı) |
| Time billing | yok | Yapma (paket fiyatı var) |
| Multi-user RBAC | yok | P3 |
| HR bulk / SSO | yok | Sadece B2B büyürse |

---

## 8) Birincil referans seti (inceleme sırası)

1. **Urząd Tracker** — PL yabancı büro CRM (en yakın iş modeli)  
2. **Translation client portal** (JR / Diction / Stepes) — tek-yazi döngüsü  
3. **MyCase / Advisor247 portal** — kontrollü müşteri görünümü  
4. **LegalSol dashboard** — şirket + çok dosya  
5. **LollyLaw Client Bridge** — dil + status (form kısmını ignore)

**İç referans:** `docs/guides/ReferenceProject-ACyberSolutions.md` (ac-panel) — teknik panel disiplini; domain emsali değil.

---

## 9) Sonuç

- Piyasada “benzer panel” bol; üç aile: (A) PL yabancı/legalizasyon CRM, (B) tercüme/letter desk, (C) hukuk PMS.  
- POL-TURK = **A’nın takip/iletişim kısmı + B’nin sipariş/evrak kısmı**; C’nin form/saat/faturalama kısmı **bilinçli dışarıda**.  
- Sonraki ürün adımı: Urząd Tracker tarzı **status → dilde bildirim** + paket **checklist**; avukat paneli klonu değil.
