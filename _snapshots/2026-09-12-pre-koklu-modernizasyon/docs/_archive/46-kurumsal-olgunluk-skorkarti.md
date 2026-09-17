# Kurumsal olgunluk skorkartı (A–D)

**Tarih:** 2026-08-16  
**Rol:** Master mentor — periyodik (aylık) veya go-live öncesi doldurulur  
**Bağlı:** `docs/33`, `docs/40`, `docs/45`, `docs/23`, `docs/24`

---

## Nasıl puanlanır?

Her madde: **0** yok · **1** kısmi · **2** tamam  

| Bant | Skor % | Anlam |
|------|--------|--------|
| **D** | 0–39 | Proje / MVP |
| **C** | 40–59 | Operasyon iskeleti |
| **B** | 60–79 | Satışa yaklaşan kurum |
| **A** | 80–100 | Kurumsal olgun (sürekli iyileştirme) |

**Kural:** Sistem skoru yüksek, şirket skoru düşükse genel bant **düşük olan** ile raporlanır (güven yanıltması yok).

---

## Snapshot — 2026-08-16 (mentor)

| Katman | Skor | Bant | Not |
|--------|------|------|-----|
| 1. Konum & ürün | 16/16 | A | Charter hizalı |
| 2. Operasyon paneli | 9/16 | B− | P2 ürün; kanıt/RBAC yok |
| 3. Veri & teknik | 12/14 | A− | Kod hazır; prod env şart |
| 4. Şirket / yasal yüz | 4/14 | D | NIP/iletişim/ortak hâlâ operatör |
| 5. Marka & güven | 7/10 | C | Logo+favicon; sosyal kanıt yok |
| 6. Canlı yayın | 1/12 | D | Checklist açık |
| **Sistem (1–3)** | **37/46 (~80%)** | **B+** | |
| **Şirket (4–6)** | **12/36 (~33%)** | **D** | Marka yükseldi; yayın/NIP hâlâ D |
| **GENEL (min kural)** | — | **D** | Env sonra: `docs/47` |

**Hüküm:** Kurumsal **yazılım operasyonu** oluştu. Kurumsal **ticari varlık** henüz değil.

---

## 1) Konumlandırma & ürün (max 16)

| # | Madde | 0–2 | Kanıt / not |
|---|--------|-----|-------------|
| 1.1 | Kanonik iş modeli yazılı (`docs/33`) | 2 | Köprü / avukat ayrımı |
| 1.2 | Site + panel metni modeli çiğnemiyor | 2 | Paket copy hizalı |
| 1.3 | Üç paket + fiyat net | 2 | `docs/35` |
| 1.4 | Sipariş döngüsü uçtan uca (yükle→öde→sonuç) | 2 | Kod + panel |
| 1.5 | PROJECT_CHARTER kanon ile senkron | 2 | 2026-08-16 hizalandı |
| 1.6 | Hedef kitle (yabancı şirket + birey) net | 2 | TR-only değil |
| 1.7 | Red listesi (ne yapmıyoruz) yazılı | 2 | Form/MOS/saat ücreti dışarı |
| 1.8 | Piyasa emsali bilinçli seçilmiş | 2 | `docs/44` |

**Ara toplam: ___ / 16** · Snapshot: **14/16**

---

## 2) Operasyon paneli (max 16)

| # | Madde | 0–2 | Snapshot |
|---|--------|-----|----------|
| 2a | CRM IA (özet / müşteri / dosya) | 2 | 2 |
| 2b | Checklist + partner + timeline | 2 | 2 |
| 2c | Durum → dilde e-posta (prod Resend) | 1 | Kod; env şart |
| 2d | Paylaşım / dossier RODO | 2 | 2 |
| 2e | CSV export | 2 | 2 |
| 2f | Çok operatör / audit | 0 | P3 |
| 2g | WhatsApp / SMS status | 0 | P3 |
| 2h | ≥3 gerçek dosya ile kuru koşu | 0 | Operatör |

**Ara toplam: ___ / 16** · Snapshot: **9/16**

---

## 3) Veri & teknik (max 14)

| # | Madde | 0–2 | Snapshot |
|---|--------|-----|----------|
| 3.1 | API envelope + rate/honeypot | 2 | 2 |
| 3.2 | Golive fail-closed | 2 | 2 |
| 3.3 | Blob evrak yolu | 1 | Kod; token prod |
| 3.4 | Postgres + migrate | 1 | Schema; URL operatör |
| 3.5 | Sentinel / guard | 2 | 2 |
| 3.6 | i18n TR/PL/EN | 2 | 2 |
| 3.7 | Build yeşil (CI veya local) | 2 | 2 |

**Ara toplam: ___ / 14** · Snapshot: **12/14**

---

## 4) Şirket / yasal yüz (max 14)

| # | Madde | 0–2 | Snapshot |
|---|--------|-----|----------|
| 4.1 | Operatör unvanı sitede | 0 | env |
| 4.2 | NIP / adres gizlilik sayfasında | 0 | env |
| 4.3 | Gerçek e-posta / telefon / WA | 0–1 | çoğu boş |
| 4.4 | Avukat ortak sözleşmesi imzalı | 0 | şablon `41` |
| 4.5 | KVKK/RODO metni operatör verisiyle | 1 | iskelet |
| 4.6 | Fatura / muhasebe süreci tanımlı | 0 | |
| 4.7 | Charter güncel | 2 | hizalı |

**Ara toplam: ___ / 14** · Snapshot: **1–2/14**

---

## 5) Marka & güven (max 10)

| # | Madde | 0–2 | Snapshot |
|---|--------|-----|----------|
| 5.1 | Logo + favicon | 2 | `public/brand` + favicon.svg (2026-08-16) |
| 5.2 | Tutarlı görsel dil (tokenler) | 2 | pt-* |
| 5.3 | Sosyal kanıt / referans | 0 | |
| 5.4 | OG / paylaşım görseli | 1 | metadata + mark (OG image tam değil) |
| 5.5 | “Neden biz” köprü dili tutarlı | 2 | |

**Ara toplam: ___ / 10** · Snapshot: **4/10**

---

## 6) Canlı yayın (max 12) — `docs/40` ile

| # | Madde | 0–2 | Snapshot |
|---|--------|-----|----------|
| 6.1 | Domain + SITE_URL https | 0 | |
| 6.2 | Stripe live + webhook | 0 | |
| 6.3 | Resend domain | 0 | |
| 6.4 | Blob + DATABASE_URL prod | 0 | |
| 6.5 | Panel güçlü parola | 0–1 | local default |
| 6.6 | Smoke: öde → panel → sonuç → mail | 0 | |

**Ara toplam: ___ / 12** · Snapshot: **0–1/12**

---

## Özet formülü

```
Sistem = (katman1 + katman2 + katman3) / 46
Şirket = (katman4 + katman5 + katman6) / 36
Genel bant = min(Sistem_bant, Şirket_bant)   # güven için
```

| Yeniden hesap (2026-08-16) | |
|----------------------------|--|
| Sistem | (16+9+12)/46 = **37/46 ≈ 80%** → **B+** |
| Şirket | (4+7+1)/36 = **12/36 ≈ 33%** → **D** |
| **Raporlanan genel** | **D** — çıkış: `docs/47` (env sizde) |

---

## A–D olgunluk eşlemesi (eylem)

| Bant | Ne yapılır |
|------|------------|
| **D** | `docs/40` env + iletişim + NIP; charter hizala; 1 ortak sözleşme |
| **C** | Logo; ilk 5 gerçek dosya; Resend/Stripe smoke |
| **B** | Sosyal kanıt; 2. operatör veya audit; WA bildirim (P3) |
| **A** | SLA yazılı; üç aylık skor tekrarı; ortak portal değerlendirmesi |

Eski hat `docs/24` (Faz A–D vitrin) bu skorkartın **şirket** sütununa map edilir; panel P2 **sistem** sütununa yazıldı.

---

## Yeniden puanlama protokolü

1. Bu dosyayı kopyala: `docs/46-kurumsal-skorkarti-YYYY-MM.md` (isteğe bağlı arşiv)  
2. Snapshot tablolarını güncelle  
3. `ARCHITECT_TASKS.md` → `maturity_band: D|C|B|A`  
4. Genel bant **D iken** “kurumsaliz olduk” iddiası yasak  

---

## Operatör checklist (D → C çıkış)

- [x] Charter + invariants ↔ `docs/33` (2026-08-16)  
- [ ] `docs/40` zorunlu env prod — bkz. `docs/47`  
- [ ] İletişim + NIP + unvan  
- [ ] 1 imzalı avukat ortak  
- [ ] Panel parola değişti  
- [ ] 3 gerçek dosya smoke  

**DoD (C bandı):** Sistem ≥ B ve Şirket ≥ C.  
**Runbook:** `docs/47-d-to-c-operator-runbook.md`
