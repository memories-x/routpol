# Stripe tahsilat + muhasebeci faturası (KSeF)

**Durum:** 2026-08-17 — şahıs şirketi modeli  
**Kilit:** Siz Stripe ile para alırsınız. Yasal faturayı muhasebeci keser. Siz KSeF’e girmezsiniz.

## Stripe yasal fatura kesmez

Checkout ödeme alır. Dashboard’da “payment / receipt” **para alındı kanıtıdır**, Polonya faktura VAT / KSeF değildir.

- Stripe Invoice e-postaları **kapalı** kalır (müşteriye gitmez).
- O makbuzları muhasebeciye “fatura” diye iletmeyin. Çift belge olur.
- Para kanıtı: Stripe → Payments / Payouts (aylık hesaba yatış).

## Kim ne yapar

| Kim | İş |
|-----|-----|
| Müşteri | Siteden öder (Stripe) |
| Siz | Dosyayı işlersiniz. Ay sonunda **Ay paketi (ZIP)** indirir, muhasebeciye atarsınız |
| Muhasebeci | Fakturownia / inFakt’te faktura keser, KSeF’e gönderir, müşteriye PDF gider |

Şahıs şirketi (JDG) için bu standarttır. KSeF paneline sizin girmeniz gerekmez.

## Ay paketi (ZIP)

`/panel/faturalar` → **Ay paketi (ZIP)**

```
excel/firma.csv   NIP veya unvan (B2B)
excel/sahis.csv   bireysel
pdf/              yasal PDF’ler muhasebecinin kestikleridir
OKU.txt
```

CSV Excel’de açılır (`;` ayırıcı, UTF-8 BOM).

## Otomatik kesim (kapalı)

Varsayılan: ödeme sonrası Fakturownia **çağrılmaz** — yoksa muhasebeci ile çift fatura.

Açmak için (nadir): `INVOICE_AUTO_ISSUE=1` + Fakturownia token. Siz KSeF’e bulaşmayacaksanız bunu açmayın.

## Stripe Dashboard

- [ ] Customer emails: invoices / receipts kapalı
- [ ] Webhook: `checkout.session.completed`
