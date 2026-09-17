# Müşteri dosyalama (Postgres + Blob)

**Model:** Meta ve süreç DB’de; PDF/görseller Blob’da.

| Katman | İçerik |
|--------|--------|
| `Customer` | Ad, e-posta, telefon, firma |
| `Case` | Paket, durum, konu, özet dili, ödeme meta, arşiv klasör adı |
| `CaseDocument` | Evrak listesi + `storagePath` (Blob) |
| `CaseNote` | Operatör notu; `sharedWithCustomer` → müşteri görür / JSON’da |

**Müşteri paylaşım:** özel link + `GET /api/cases/[id]/dossier?token=` → tüm meta + paylaşılan notlar + evrak listesi. Dosya içeriği ayrı indirme linkleriyle.

**Local:** `DATABASE_URL` yoksa eski file/blob store.  
**Prod:** `DATABASE_URL` + `BLOB_READ_WRITE_TOKEN` zorunlu.

```bash
# Neon/Supabase URL’yi .env.local’e koy
npx prisma migrate deploy
npm run db:generate
```
