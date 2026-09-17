# 05 — Uyum (RODO)

**Durum:** Kanonik · **2026-08-19** · **Şirket katmanı — canlı öncesi tamamlanacak**

---

## Kodda mevcut

- HttpOnly oturum, magic link hash + TTL + tek kullanım
- Rate limit (IP + e-posta)
- Müşteri eligibility kapısı (`PORTAL_ELIGIBLE_STATUSES`)
- `DELETE /api/customer/account` — profil anonimleştirme
- `purgeExpiredData()` — ödenmemiş 30 gün (meta + bytes), kapalı dosya 24 ay (`data_purged`)
- Çerezsiz analytics (`AnalyticsEvent` + `/api/analytics/event`)
- Günlük Stripe↔case mutabakat maili (cron)

## Eksik (operatör / avukat)

- [ ] Veri sorumlusu kimliği (unvan, NIP, adres) — env + gizlilik sayfası
- [ ] ROPA kaydı doldurulmuş PDF/Notion (aşağıdaki şablon)
- [ ] Avukat ortak veri paylaşım eki imzalı
- [ ] Yeminli tercüman veri paylaşım eki (varsa)
- [ ] 72 saat ihlal bildirimi prosedürü onayı

## Saklama (uygulanan)

| Veri | Süre | Kod |
|------|------|-----|
| Ödenmemiş / taslak | 30 gün → `unpaid_archived` + bytes sil | `purgeExpiredData()` |
| Kapalı dosya | 24 ay → `data_purged` + bytes sil | `purgeExpiredData()` |
| Müşteri silme talebi | 30 gün içinde işlem | `DELETE /api/customer/account` |

---

## ROPA şablonu (doldurulacak)

| Alan | Değer |
|------|-------|
| Veri sorumlusu | `[UNVAN]` · NIP `[NIP]` · `[ADRES]` |
| İletişim (RODO) | `[rodo@domain]` |
| İşleme amacı | Teklif, sipariş, idari koordinasyon, faturalama |
| Hukuki dayanak | Sözleşme (art. 6(1)(b)), meşru menfaat (art. 6(1)(f) — güvenlik logları) |
| Veri kategorileri | Kimlik, iletişim, NIP (firma), evrak meta + dosya, ödeme meta (Stripe id) |
| Alıcılar | Stripe, Resend, Vercel Blob/FS, avukat ortak (sözleşme eki), muhasebeci |
| Üçüncü ülke aktarımı | Stripe/US — SCC veya yeterlilik kararı kaydı |
| Saklama | Yukarıdaki tablo |
| Teknik önlemler | TLS, hash token, rate limit, audit log, outbox |

## Veri sahibi hakları prosedürü (şablon)

1. Talep kanalları: `[rodo@domain]`, posta `[ADRES]`
2. Kimlik doğrulama: e-posta + dosya no veya magic link oturumu
3. Yanıt süresi: **30 gün** (uzatma gerekçeli + bilgilendirme)
4. Hak türleri: erişim, düzeltme, silme, kısıtlama, itiraz, taşınabilirlik (uygunsa)
5. Red gerekçeleri: yasal saklama (fatura 5 yıl PL), devam eden uyuşmazlık
6. Kayıt: panel `AuditLog` veya harici ticket

## 72 saat ihlal bildirimi (şablon)

1. Tespit → operatör + `[rodo@domain]` alarm
2. Etki analizi: hangi veri, kaç kişi, şifreleme durumu
3. **72 saat** içinde UODO bildirimi (gerekliyse)
4. Yüksek risk → ilgili kişilere bilgilendirme
5. Olay kaydı + düzeltici aksiyon (parola rotasyonu, token iptali)

## Avukat ortak veri paylaşım eki (özet maddeler)

- Aktarılan veri: müşteri kimlik/iletişim, evrak, süreç notları
- Amaç: idari koordinasyon / vekalet kapsamındaki işlem
- Süre: dosya kapanış + 24 ay (veya sözleşmede belirtilen)
- Alt işlemci yasağı (onaysız)
- İhlal bildirimi: 24 saat içinde POL-TURK'a
- Dosya iade/silme: talep veya saklama sonu

---

## Eski dokümanlar

`docs/09-yasal-ve-uyumluluk.md` → `_archive/` (üstüne “superseded” notu)
