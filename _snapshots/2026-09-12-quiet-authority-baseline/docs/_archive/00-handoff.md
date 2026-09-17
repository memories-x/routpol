# Oturum Handoff

**Son güncelleme:** 2026-08-16  
**Proje:** `C:\Users\memories\Desktop\pol-turk`

## Durum

Köprü modeli (`docs/33`) + sipariş döngüsü + Operasyon Paneli P2.  
Olgunluk: sistem **B+**, genel **D** — env sonra; runbook `docs/47`.

**Kamu ürün:** `aylik-paket` · `surec-yonetimi` · `tek-yazi`

## Test (local)

- http://localhost:3000/tr  
- http://localhost:3000/tr/basvuru  
- Panel: http://localhost:3000/panel/login  
- Env yoksa: file store; `DATABASE_URL` shell’de varsa temizleyin veya Postgres açın  

## Sonraki (operatör)

`docs/47` — iletişim, Stripe, Resend, Blob, DB, ortak, smoke.  
`docs/51` — Stripe tahsilat + Fakturownia/KSeF fatura.

## Kanonik

`33` · `40` · `45` · `46` · `47` · charter · invariants
