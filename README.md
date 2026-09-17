# POL-TURK — Proje Alanı

Polonya resmi yazısını Türkçe anlatan masa (aylık paket + tek yazı).

> **İş modeli:** `docs/33` · Paketler: `docs/35`  
> Plan haritası: `docs/00-plan-indeks.md`

## Geliştirme

```bash
cd Desktop/pol-turk
npm install
npm run dev
```

- Ana sayfa: http://localhost:3000/tr  
- Teklif: http://localhost:3000/tr#iletisim  
- Operatör paneli: http://localhost:3000/panel/login  
- Teklif API: `POST /api/teklif`

```bash
npm run build
```

## Doküman indeksi

| # | Dosya | Konu |
|---|--------|------|
| 00 | `docs/00-plan-indeks.md` | **Plan haritası** |
| 32 | `docs/32-konumlandirma-evrak-yardimi.md` | Sınırlar |
| 33 | `docs/33-is-modeli-master.md` | **İş modeli master** |
| 34 | `docs/34-site-hizalama-plani.md` | Site hizalama |
| 35 | `docs/35-paketler.md` | Paketler |
| 36 | `docs/36-evrak-slotlari.md` | Etiketli evrak |
| 01–09 | diğer `docs/` | Teknik / SEO / yasal (kısmen eski — 32–36 öncelikli) |

## Env

Şablon: `.env.example` — Stripe, panel şifresi, paket fiyatları, WhatsApp, Resend.
