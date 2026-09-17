# Müşteri yönetim paneli — A→Z plan

**Durum:** Operator PROCEED (2026-08-16) — `oluştur` ile uygulama onayı  
**Unlock:** `ARCHITECT_TASKS` current_focus → CRM panel (önceki: site hizalama)

```yaml
title: Build operator CRM panel (customer hub)
scope:
  project: pol-turk
  module: panel + cases customers
  out_of_scope:
    - Müşteri self-serve login / hesap
    - Çok kullanıcılı RBAC / avukat portalı
    - Google Drive API entegrasyonu
    - Muhasebe / fatura motoru
    - Yeni kamu paket ürünleri
intent:
  what: Operatör paneli müşteri kartı + süreç listesi CRM’e dönüşür; tüm iş alanları tek yerden yönetilir.
  why: Dosya-dosya liste operasyonu ölçeklenmez; kişi/firma bazlı dosyalama ve paylaşım gerekir.
  triggered_by: user_request
risk_overall: medium
estimated_effort: 180m
success_criteria:
  - /panel özet + Müşteriler + Dosyalar navigasyonu
  - Müşteri listesi (arama) ve kart (tüm süreçler)
  - Dosya listesinde status/paket filtresi + arama
  - Dosya detayından müşteri kartına link; arşiv klasör adı düzenlenebilir
  - next build geçer; sentinel --diff temiz veya bilinen uyarı
stop_conditions:
  - Panel auth kırılırsa rollback
  - Müşteri token/link sızdırılırsa abort
```

---

## 1) İş alanları haritası (hesaba katılan)

| Alan | Panelde ne yapılır | Faz |
|------|-------------------|-----|
| **Müşteri kartı** | Kişi/firma, iletişim, tüm dosyalar | P1 |
| **Dosya / süreç** | Durum, paket, konu, dil, ödeme | P1 (var) |
| **Evrak** | Mektup / sonuç indir-yükle | P1 (var) |
| **Notlar** | İç not + müşteriyle paylaş | P1 (var) |
| **Dosya özeti (RODO)** | Müşteri JSON dossier linki | P1 (var) |
| **Arşiv etiketi** | Yerel/Drive klasör adı düzenle | P1 |
| **Ödeme** | Durum, tutar, paidAt görünümü | P1 |
| **Paket: tek-yazi** | Sayfa meta, mektup→sonuç | P1 |
| **Paket: aylik-paket** | Kota / abonelik meta görünümü | P1 |
| **Paket: surec-yonetimi** | POA / entityType görünümü | P1 |
| **Filtre / arama** | İsim, firma, e-posta, durum, paket | P1 |
| **Özet dashboard** | Açık / ödenen / kapalı sayıları | P1 |
| **Avukat köprü notu** | Paylaşılan süreç notu (hukuk yok) | P1 |
| **Ödenmemiş arşiv** | `unpaid_archived` filtre | P1 |
| **Yeminli tercüme takip** | Ayrı paket/slot yok → not + matter | P2 |
| **Avukat ortağı atama** | Partner alanı şemada yok | P2 |
| **Toplu durum** | Bulk PATCH | P2 |
| **CSV export** | Müşteri/dosya dışa aktarım | P2 |
| **Çok operatör / audit log** | Kim ne yaptı | P3 |
| **Drive sync** | API klasör | P3 |

Kanonik konum (`docs/33`): Panel avukatlık yapmaz; köprü operasyonu (koordinasyon, dil, takip, evrak).

---

## 2) Bilgi mimarisi

```
/panel                    → Özet (sayılar + son güncellenenler)
/panel/musteriler         → Müşteri listesi (arama)
/panel/musteriler/[key]   → Müşteri kartı → süreçler
/panel/dosyalar           → Tüm dosyalar + filtre
/panel/[id]               → Dosya detay (operasyon)
```

**Müşteri anahtarı:** DB’de `Customer.id`; yoksa `email` (lowercase). Aynı e-posta = aynı kart.

---

## 3) Uygulama adımları (P1)

1. Plan + `ARCHITECT_TASKS` focus  
2. `listCustomers` / `getCustomerBundle` (cases aggregate)  
3. API `GET /api/panel/customers`, `GET /api/panel/customers/[key]`  
4. Layout nav; dashboard; musteriler; dosyalar  
5. Case detail: müşteri linki + archiveFolder PATCH  
6. Build + sentinel  

---

## 4) Güvenlik

- Tüm `/panel*` ve `/api/panel*` → mevcut panel session  
- Müşteri `accessToken` panel UI’da tam gösterilmez (kısaltılmış / kopyala dikkat)  
- Dossier müşteri token’ı ile kalır  

---

## 5) Rollback

Panel route’ları geri alınır; case store değişmez. Auth aynı.
