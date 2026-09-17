> **Süperseeded (2026-08-06):** Kanonik iş modeli ve site içeriği için `docs/32`, `docs/33`, `docs/35`, `docs/36` ve `src/content/*` kullanın. Bu dosya tarihsel / kısmen eski kalabilir.
# Yasal, Uyumluluk & Disclaimer

## Amaç

Sitenin danışmanlık/çeviri konumunu netleştirmek; KVKK/GDPR için v1 minimumunu tanımlamak.

## Hukuki sınır (zorunlu footer / form altı metin)

**TR taslak:**

> POL-TURK çeviri ve süreç danışmanlığı sunar. Bu site genel bilgilendirme amaçlıdır; avukatlık, mali müşavirlik veya bağlayıcı hukuki tavsiye yerine geçmez. Resmi kararlar ilgili Polonya / Türkiye kurumlarına aittir.

Faz 2: PL + EN çevirisi.

## KVKK / GDPR — v1 minimum

| Öğe | Faz 1 | Faz 2 |
|-----|-------|-------|
| Form onay kutusu * | “Kişisel verilerimin teklif amacıyla işlenmesini kabul ediyorum.” | Aynı + link |
| Gizlilik sayfası | Kısa `/gizlilik` veya modal özet (½ sayfa) | Tam politika |
| Veri sorumlusu | Placeholder: POL-TURK / [ünvan TBD] | Ticari ünvan |
| Saklama | Teklif talepleri — amaçla sınırlı, süre TBD (örn. 24 ay) | Net süre |
| Haklar | Erişim, silme talebi: e-posta | Form + prosedür |

**Formda zorunlu:** checkbox işaretlenmeden submit yok.

## Çerezler

v1: zorunlu teknik çerez dışında analytics yoksa **çerez bandı gerekmez**.  
Analytics (Faz 3) eklenince: short consent banner.

## WhatsApp / telefon

Numara `NEXT_PUBLIC_WHATSAPP_E164` veya server-only config; sahte numara production’a gitmez.

## İletişim bilgisi politikası

Gerçek adres/telefon yokken: “Polonya — randevu ile görüşme” + e-posta/WhatsApp placeholder. Yanlış adres yazılmaz.

## Disclaimer yerleşimi

1. Footer kısa metin  
2. Form altında checkbox + gizlilik linki  
3. İsteğe bağlı: Oturum/şirket hizmet kartlarında “süreç desteği” ifadesi  

## Açık operatör alanları

| Alan | Durum |
|------|--------|
| Ticari ünvan / NIP | TBD |
| Veri sorumlusu adresi | TBD |
| Gizlilik e-posta | TBD (örn. privacy@…) |
