# Persona & Kullanım Senaryoları

## Persona 1 — “Aile / oturum”

- **Kim:** Polonya’da çalışan veya eş/çocuk için Karta Pobytu hazırlayan Türk  
- **Acı:** Evrak dili Lehçe; urzęd süreçleri belirsiz; yanlış çeviri riski  
- **İhtiyaç:** Yeminli çeviri + evrak listesi + takip  
- **Site davranışı:** Hero → Oturum hizmeti → SSS (Karta Pobytu) → Form / WA  
- **Başarı:** 24–48s içinde fiyat/süre cevabı

## Persona 2 — “Girişimci / Sp. z o.o.”

- **Kim:** Türkiye’den Polonya’da şirket kuracak veya sözleşme imzalayacak  
- **Acı:** Hukuki jargon, sözleşme riski, zaman baskısı  
- **İhtiyaç:** Şirket danışmanlığı + sözleşme/çeviri  
- **Site davranışı:** Hizmet 5 → Neden Biz → Form (hizmet türü seçili)  
- **Başarı:** Kapsam net teklif; yüz yüze noter tercüman opsiyonu

## Persona 3 — “Acil evrak”

- **Kim:** Banka / noter / polis randevusuna yetişmesi gereken kişi  
- **Acı:** Süre; online mı saha mı bilinmiyor  
- **İhtiyaç:** Hızlı sözlü/yazılı + WhatsApp  
- **Site davranışı:** Hero WA CTA → kısa mesaj şablonu  
- **Başarı:** Aynı gün dönüş; müsaitlik net

## Persona 4 — “Teknik / ihale” (B2B)

- **Kim:** İnşaat / mühendislik firması, şartname çevirisi  
- **Acı:** Terminoloji hatası pahalıya patlar  
- **İhtiyaç:** Teknik çeviri + NDA hissi (gizlilik)  
- **Site davranışı:** Hizmet 6 → Gizlilik rozeti → Form + dosya notu  
- **Başarı:** Terminoloji / teslim tarihi yazılı teklif

## Senaryo kabul (MVP)

| ID | Senaryo | Beklenen |
|----|---------|----------|
| S1 | Mobilde Teklif Al → form doldur → başarı | API 200 + başarı UI |
| S2 | WhatsApp FAB | wa.me doğru numara + ön mesaj |
| S3 | Hizmet kartı Detaylı Bilgi | `#iletisim` + serviceType dolu |
| S4 | Dil PL tıkla (v1) | “Yakında” — sahte PL içerik yok |
| S5 | KVKK’sız submit | Engellenir |
| S6 | Reduced motion | Animasyonlar sönük / kapalı |
