# Panel sol menü — şirket operasyon IA

**Durum:** Uygulandı (2026-08-16) · Faturalar 2026-08-17  
**Kabuk:** `PanelChrome` — login hariç sol menü

## Menü

```
OPERASYON     Özet · Dosyalar · Kuyruk
MÜŞTERİLER    Firmalar · Kişiler · Tümü
FİNANS        Ödemeler · Faturalar
KÖPRÜ         Avukat ortakları
SISTEM        Ayarlar · Çıkış (header)
```

## Faturalar

Stripe tahsilat → `/panel/odemeler`.  
Muhasebeci teslim ZIP → `/panel/faturalar`.  
KSeF sizde değil. Detay: `docs/51-stripe-ksef-faturalar.md`.

## Rotalar

| Path | Not |
|------|-----|
| `/panel` | Özet |
| `/panel/kuyruk` | paid + in_progress |
| `/panel/firmalar` | companyName dolu |
| `/panel/kisiler` | companyName boş |
| `/panel/musteriler` | tümü |
| `/panel/odemeler` | payment.status=paid |
| `/panel/faturalar` | ay paketi ZIP + ödenenler |
| `/panel/ortaklar` | lawyerPartner grup |
| `/panel/ayarlar` | golive checklist metin |
