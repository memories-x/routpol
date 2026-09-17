# Detaylı Eksik Analizi — POL-TURK (v0.4.0 sonrası)

Tarih: 2026-08-05  
Kapsam: Canlı ürün yüzeyi + kurumsal hazırlık (kod Faz 0–4 tamam)

---

## 1) Executive summary

| Katman | Durum |
|--------|--------|
| Teknik ürün çekirdeği (landing, i18n, form, API, hizmet sayfaları) | **Güçlü** |
| Kurumsal güven & marka (logo, fiyat, gerçek iletişim, ekip) | **Zayıf** |
| Operasyonel lead (WA, Resend, domain) | **Env’e bağlı / eksik** |
| Büyüme (SEO görsel, analytics, blog) | **Yok / sonraki** |

**Sonuç:** Site “çalışan MVP” seviyesinde. Satışa hazır **kurumsal vitrin** için ayrı bir olgunlaşma hattı gerekir (aşağıda Faz A–D).

---

## 2) Ne var? (sağlam temel)

- `/tr` `/pl` `/en` tam içerik  
- Hero → Hizmetler → Neden Biz → Süreç → SSS → İletişim  
- 6 hizmet × 3 dil detay sayfası  
- Teklif formu: RHF + Zod, ülke kodu, KVKK, honeypot, rate limit  
- API envelope + Resend adaptörü (env ile)  
- Gizlilik sayfası (kısa), disclaimer footer  
- Tasarım tokenleri (`pt-*`), tipografi  
- Sitemap / robots / hreflang  

---

## 3) Eksik matrisi (öncelik × etki)

### P0 — Yayın öncesi / güven kırıcı

| # | Eksik | Kanıt | Etki |
|---|--------|--------|------|
| P0.1 | Gerçek e-posta yok | `teklif@pol-turk.example` | Sahte firma algısı |
| P0.2 | Telefon boş | `phoneValue: ""` | İletişim yarım |
| P0.3 | WhatsApp kapalı | env boş → FAB/CTA gizli | Ana kanal kaybı |
| P0.4 | Logo yok | Header sadece yazı; `public/` stok SVG | Marka zayıf |
| P0.5 | Favicon marka değil | Next default | Paylaşım/sekme kalitesiz |
| P0.6 | Form “başarı” ama mail noop olabilir | Resend env yok | Lead kaybı fark edilmez |

### P1 — Kurumsal teklif & fiyat (senin vurgun)

| # | Eksik | Ne olmalı | Etki |
|---|--------|-----------|------|
| P1.1 | Fiyatlandırma bölümü yok | `#fiyatlandirma` — başlangıç fiyat / paket / “teklife tabi” | Şeffaflık + dönüşüm |
| P1.2 | Hizmet detayda bedel yok | Her slug için “from X” veya paket | Profesyonellik |
| P1.3 | Teklif formu sığ | Dil çifti, sayfa/kelime tahmini, aciliyet, evrak türü | Daha doğru teklif |
| P1.4 | Form yanında kurumsal metin zayıf | Süreç, yanıt süresi, gizlilik, sonraki adım | Güven |
| P1.5 | Dosya gerçekten gitmiyor | UI-only dropzone | Beklenti–gerçek kopukluğu |
| P1.6 | Fiyat metodu sadece SSS’de | Görünür fiyat tablosu | Keşif zor |

### P2 — Marka & güven yüzeyi

| # | Eksik | Ne olmalı |
|---|--------|-----------|
| P2.1 | Hero görseli yok | Atmosfer foto / tam bleed (kart değil) |
| P2.2 | Sosyal kanıt yok | Referans, anonim vaka, “X dil” (kanıtlı) |
| P2.3 | Ekip / pozisyon yok | “Kimler?” — roller (çevirmen, danışman…) unvanla |
| P2.4 | Ticari kimlik yok | NIP / adres / ünvan (Polonya) |
| P2.5 | Rozet iddiaları yumuşak | Kanıt veya daha temkinli metin |
| P2.6 | LinkedIn / sosyal yok | Footer link (opsiyonel) |

### P3 — Yasal & SEO olgunluk

| # | Eksik | Ne olmalı |
|---|--------|-----------|
| P3.1 | Gizlilik “yakında genişletilecek” | Tam KVKK/GDPR metni 3 dil |
| P3.2 | OG / Twitter image yok | 1200×630 markalı |
| P3.3 | JSON-LD yok | Organization + ProfessionalService |
| P3.4 | Canonical prod URL | `NEXT_PUBLIC_SITE_URL` gerçek domain |

### P4 — Büyüme (eski Faz 5)

| # | Eksik |
|---|--------|
| P4.1 | Custom domain |
| P4.2 | Analytics (+ consent gerekirse) |
| P4.3 | Blog / rehber SEO |
| P4.4 | CRM / Telegram bildirimi |
| P4.5 | Ek hizmetler (apostil, gayrimenkul…) |

---

## 4) Teklif Al — kurumsal gap (detay)

**Bugün:** Alanlar dolu, gönderim var, güvenlik temel seviyede.

**Kurumsal teklif için eksikler:**

```
[Sol] Güven & süreç          [Sağ] Form
- Yanıt süresi (örn. 24s)    - Mevcut alanlar
- Gizlilik taahhüdü          + Dil çifti (TR↔PL, TR↔EN…)
- “Ücretsiz inceleme”        + Tahmini hacim (sayfa/kelime/saat)
- Fiyat modeline link        + Aciliyet (standart / ekspres)
- Ofis / WA / tel gerçek     + Evrak türü
                             + Dosya (gerçek veya net “WA ile gönder”)
```

**Fiyat gösterimi önerisi (yanlış garanti vermeden):**

| Hizmet tipi | Gösterim |
|-------------|----------|
| Yeminli / yazılı | “X PLN’den / sayfa (standart)” |
| Sözlü | “X PLN’den / saat” |
| Danışmanlık paketleri | Temel / Standart / Kapsamlı (kapsam maddeleri) |
| Teknik / ihale | “Dosya sonrası teklif” |

Rakamlar operatör onayı olmadan uydurulmamalı — fazda **şablon + senin fiyatların**.

---

## 5) Logo / görsel gap

| Varlık | Durum | İhtiyaç |
|--------|--------|---------|
| Logo SVG | Yok | Primary + mono |
| Favicon / apple-touch | Zayıf | Marka ikon |
| OG image | Yok | Paylaşım |
| Hero görsel | Gradient | Gerçek bağlam görseli |
| `public/brand/` | Yok | Klasör + kullanım kuralı |

---

## 6) Ekip / pozisyon gap

Sitede “kim yapıyor?” cevabı yok. Kurumsal sitede tipik blok:

- Kurucu / danışman (isim opsiyonel)  
- Roller: Yeminli çeviri koordinasyonu, İdari süreç danışmanı, Saha tercüman ağı  
- “Avukat / MM değiliz” ile uyumlu unvanlar  

Bu, fiyat kadar güven sinyali verir.

---

## 7) Risk (eksiklerin maliyeti)

| Risk | Kaynak |
|------|--------|
| Lead gelir ama kimse mail almaz | noop mail |
| Kullanıcı “dosya gitti” sanır | UI-only upload |
| Fiyat sorulunca site yetersiz kalır | fiyat yok |
| Paylaşımda çirkin önizleme | OG yok |
| Sahte e-posta güven kaybı | `.example` |

---

## 8) Bilinçli olarak SONRA bırakılabilecekler

- Blog / CMS  
- Ödeme / müşteri paneli  
- Canlı chat bot  
- A/B test altyapısı  
- Çok ofis haritası  

---

## 9) Operatörden gereken girdiler (analiz sonrası)

Koddan önce veya paralel:

1. Logo dosyası (veya “SVG monogram üret” onayı)  
2. Gerçek e-posta, telefon, WhatsApp, adres, NIP (varsa)  
3. Fiyat aralıkları (PLN) — hizmet bazında  
4. Ekipte gösterilecek isim/rol (veya anonim roller)  
5. Yanıt süresi vaadi (örn. 1 iş günü)  

---

*Sonraki doküman: `24-olgunlasma-fazlari.md` — bu gap’lere göre faz planı.*
