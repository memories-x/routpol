# Operatör playbook — tek kişi, minimum yük

**Kime:** Proje sahibi (JDG / şahıs şirketi)  
**Amaç:** Günlük iş yükünü düşük tut; müşteri ve muhasebeci sisteme taşınsın.

---

## Kim ne yapar?

| Rol | Sorumluluk | Siz dokunur musunuz? |
|-----|------------|----------------------|
| **Müşteri** | Başvuru, ödeme, `/hesabim` yazı yükleme, aşım 40 zł | Hayır (self-service) |
| **Siz (operatör)** | Yazıyı işle, sonucu yükle, durum güncelle | Evet — çekirdek iş |
| **Muhasebeci** | KSeF fatura keser, defter | Ay sonu ZIP — siz sadece gönderirsiniz |
| **Stripe** | Tahsilat | Hayır (webhook otomatik) |
| **Avukat ortağı** | Hukuk | Etiket + köprü — süreç dışı idari yazılar |

---

## Günlük rutin (~5–15 dk / gıda varsa)

1. **Panel → Bugün kuyruğu** — ödendi / hazırlanıyor dosyalar  
2. Mektubu indir → işle (PL özet) → **sonuç yükle** → durum `in_progress` veya `closed`  
3. **Aylık paket:** Yeni yazılar müşteriden `/hesabim` gelir; panelde ayrı dosya olarak düşer — siz aynı iş akışı

**Yapmayın:** Kota sayma (sistem sayar), müşteriden tekrar tekrar bilgi isteme (profil dolu), fatura kesme (muhasebeci).

---

## Haftalık (~0 dk hedef)

Sistem dikkat listesini gösterir (3+ gün bekleyen). Sadece oraya bakın.

---

## Ay sonu (~10 dk)

1. **Panel → Faturalar** → ay seç → **Ay paketi (ZIP)**  
2. ZIP’i muhasebeciye e-posta  
3. Muhasebeci KSeF fatura keser — siz karışmazsınız

---

## Müşteri tarafı (sizi yormaması için)

| Konu | Çözüm |
|------|--------|
| Her seferinde form | Magic link + profil prefill |
| Aylık 9. yazı | Müşteri 40 zł öder, siz fatura değil tahsilat görürsünüz |
| “Nasıl yüklerim?” | Ödeme maili + `/hesabim` + dosya sayfasında adım çubuğu |
| Tüm dosyalarım nerede? | `/hesabim` — tam geçmiş + indirme linkleri |
| Profil güncelleme | `/hesabim` → Profili düzenle (PATCH API) |
| Paket bitti | `/hesabim` → “Aylık paketi yenile” → başvuru prefill |
| Şifre / destek | Yok — e-posta linki |

---

## Sizin teknik checklist (ayda bir veya canlıya çıkış)

```bash
npm run golive:check
```

Env: `docs/54-plesk-deploy.md` + `docs/40-go-live-checklist.md` + `CUSTOMER_AUTH_SECRET`

---

## Panel özeti — nereye bakılır?

| Sayfa | Ne zaman |
|-------|----------|
| `/panel` | Her gün — kuyruk + aylık paketler |
| `/panel/dosyalar` | Detay / arama |
| `/panel/faturalar` | Ay sonu ZIP |
| `/panel/odemeler` | Stripe mutabakat (isteğe bağlı) |

Portal mimarisi: `docs/52-customer-portal-auth.md`  
Paket kuralları: `docs/35-paketler.md`  
Fatura modeli: `docs/51-stripe-ksef-faturalar.md`

---

## Bilinçli sınır (yorgunluğu önler)

- Otomatik Fakturownia **kapalı** (`INVOICE_AUTO_ISSUE` boş) — çift fatura yok  
- Stripe Dashboard fatura e-postası **kapalı**  
- KSeF / XML bu repoda yok  
- Abonelik yenileme otomatik değil — aktif dönem varken ikinci satış yok; bitince müşteri aynı e-postayla yeni paket alır

*Tek operatör için yeterli. Büyürse muhasebeci + avukat hattı aynen kalır.*
