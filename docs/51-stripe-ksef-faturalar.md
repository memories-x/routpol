# Stripe tahsilat + yerel faktura (bez VAT)

**Durum:** 2026-09-16 — ROUTEPOL  
**Kilit:** Ödeme kesinliği = **Stripe**. Yasal belge = **yerel PDF + SMTP** (`Faktura bez VAT`, art. 113). Stripe makbuzu ≠ Polonya fakturası.

## Akış

1. Müşteri Stripe Checkout ile öder  
2. Webhook `checkout.session.completed` → case `paid`  
3. `issueLegalInvoice` → yerel PDF (paket + müşteri detayı) + SMTP eki  
4. Stripe Dashboard invoice/receipt e-postaları **kapalı** kalır (çift belge yok)

## Env (önerilen)

```
INVOICE_PROVIDER=local
# INVOICE_AUTO_ISSUE=          # boş — Fakturownia otomatik kesmesin
INVOICE_VAT_RATE=zw
INVOICE_EXEMPT_TAX_KIND=Zwolnienie z VAT na podstawie art. 113 ust. 1 ustawy o VAT

SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM=ROUTEPOL <faktury@your-domain.pl>

SELLER_NAME=...
SELLER_ADDRESS=...
SELLER_CITY=...
SELLER_NIP=...                 # veya SELLER_PESEL
# SELLER_BANK_ACCOUNT=...      # opsiyonel

STRIPE_SECRET_KEY=sk_live_...  # veya test: sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Seller/SMTP dolu + `INVOICE_PROVIDER=local` → ödeme sonrası otomatik kesim.  
Seller/SMTP eksik → `pending` (muhasebeci / sonra tamamla).

## Fakturownia (opsiyonel, varsayılan kapalı)

Yalnızca bilinçli geçiş: `INVOICE_PROVIDER=fakturownia` + `INVOICE_AUTO_ISSUE=1` + Fakturownia token.  
`INVOICE_PROVIDER=local` iken Fakturownia **çağrılmaz**.

## Stripe Dashboard

- [ ] Customer emails: invoices / receipts **kapalı**
- [ ] Webhook endpoint: `https://DOMAIN/api/webhooks/stripe`
- [ ] Events: `checkout.session.completed` (+ abonelik için `invoice.paid`, `customer.subscription.*`)

## Ay paketi (ZIP)

`/panel/faturalar` → muhasebe arşivi. Yerel PDF’ler `STORAGE_ROOT/invoices/` altında da tutulur.
