# 03 — Operasyon

**Durum:** Kanonik · **2026-08-19**

Birleşik referans: eski `47`, `53`, `42`.

---

## Günlük operatör

1. Panel kuyruk → dosya aç → evrak işle → sonuç yükle → kapat (sonuç dosyası zorunlu)
2. Aylık paket yazıları müşteriden `/hesabim` gelir — operatör ayrı saymaz
3. Ay sonu: Faturalar → ZIP → muhasebeci (`docs/51` detay)

## Müşteri self-service

| İhtiyaç | Yer |
|---------|-----|
| Giriş | `/hesabim` e-posta + şifre (unutulursa magic link) |
| Yazı yükleme | Portal + aktif dönem |
| Tüm dosyalar | `/hesabim` geçmiş |
| Tek dosya | Ödeme maili / portal link |

## Cron (günlük)

`POST /api/cron/cleanup` + header `x-cron-secret: $CRON_SECRET`

- Eski taslak arşivleme
- Outbox mail işleme
- Saklama purge (ödenmemiş 30 gün)
- **Aylık paket yenileme hatırlatması** (bitime 5 gün kala, tek mail)

Plesk: zamanlanmış görev 1×/gün.

## Dosyalama

- Müşteri kartı = e-posta tekil
- Firma/şahıs profil alanları portalda düzenlenebilir

## Eski dokümanlar

`docs/42-*`, `docs/47-*`, `docs/53-*` → `_archive/`
