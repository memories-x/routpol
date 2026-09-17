# Olgunlaşma Fazları (A–D) — Kurumsal vitrin

> Faz 0–4 = **ürün çekirdeği** (bitti).  
> Faz A–D = **kurumsal olgunluk** (yeni hat).  
> Kaynak gap: `23-eksik-analizi-kurumsal.md`

```
Faz A  Marka & gerçek iletişim     ← logo, iletişim, favicon
Faz B  Fiyat & kurumsal teklif     ← bedeller, form derinliği, güven metni
Faz C  Güven & ekip & görsel       ← pozisyonlar, hero/OG, sosyal kanıt
Faz D  Yayın & büyüme              ← domain, mail prod, analytics, KVKK full
```

**Kural:** Faz atlama yok. A bitmeden B’de sahte fiyat/logo ile ship yok.  
Operatör girdileri (fiyat, logo, WA) A/B kapılarını açar.

---

## Faz A — Marka & gerçek iletişim

**Amaç:** “Sahte / yarım” sinyallerini kaldırmak.

| WP | İş | Bağımlılık |
|----|-----|------------|
| A.1 | Logo SVG + header/footer kullanımı | Dosya veya üret onayı |
| A.2 | Favicon / apple-touch | A.1 |
| A.3 | Gerçek e-posta, tel, adres → `content` + env | Operatör verisi |
| A.4 | WhatsApp E.164 → FAB + Hero CTA | Operatör |
| A.5 | `public/brand/` + kullanım notu | — |
| A.6 | `.example` ve boş telefon temizliği | A.3 |

**DoD:**
- [ ] Logo header’da  
- [ ] Mailto gerçek domain  
- [ ] WA butonu görünür (numara dolu)  
- [ ] Build yeşil  

**Olmayacak:** Fiyat tablosu, ekip sayfası (B/C).

---

## Faz B — Fiyatlandırma & kurumsal teklif

**Amaç:** Bedeller görünür; teklif formu profesyonel.

| WP | İş | Bağımlılık |
|----|-----|------------|
| B.1 | `#fiyatlandirma` bölümü (3 dil) | Operatör fiyatları veya “şablon + TBD” |
| B.2 | Hizmet detay sayfalarına “başlangıç / paket” | B.1 |
| B.3 | Form alanları: dil çifti, hacim, aciliyet, evrak türü | — |
| B.4 | Contact sol kolon: kurumsal süreç metni + yanıt süresi | Operatör vaadi |
| B.5 | Nav’a “Fiyatlandırma” | B.1 |
| B.6 | Dosya stratejisi netleştir: (a) gerçek upload veya (b) “WA/e-posta ile gönder” tek doğru mesaj | Karar |
| B.7 | API/Zod şema genişletme + mail şablonuna yeni alanlar | B.3 |

**Fiyat modeli (sabit karar önerisi):**

- Yazılı: **başlangıç PLN / sayfa**  
- Sözlü: **başlangıç PLN / saat**  
- Danışmanlık: **3 paket** (kapsam maddeli)  
- Teknik/ihale: **teklife tabi**  

**DoD:**
- [ ] Fiyat bölümü mobilde okunur  
- [ ] Form yeni alanlarla validate  
- [ ] “Garanti fiyat” iddiası yok; “başlangıç / teklif” dili  

**Olmayacak:** Blog, analytics (D).

---

## Faz C — Güven, ekip/pozisyon, görsel güç

**Amaç:** “Kim?” ve “neden güvenmeliyim?”

| WP | İş |
|----|-----|
| C.1 | Ekip / roller bölümü veya `/hakkimizda` (pozisyonlar) |
| C.2 | Sosyal kanıt (izinli / kanıtlı; uydurma sayı yok) |
| C.3 | Hero atmosfer görseli (full-bleed) |
| C.4 | OG image 1200×630 (3 dil veya dil-agnostik) |
| C.5 | openGraph metadata |
| C.6 | JSON-LD Organization |
| C.7 | Ticari kimlik satırı (NIP/adres) — varsa |

**DoD:**
- [ ] En az roller bloğu yayınlandı  
- [ ] OG paylaşımda marka görünür  
- [ ] Disclaimer ile ekip unvanları uyumlu  

---

## Faz D — Yayın sertleştirme & büyüme

**Amaç:** Prod’a çıkış + ölçüm.

| WP | İş |
|----|-----|
| D.1 | Vercel + custom domain |
| D.2 | Resend prod + gerçek `CONTACT_EMAIL_*` smoke test |
| D.3 | Tam gizlilik metni 3 dil |
| D.4 | Analytics (Plausible veya GA4+consent) |
| D.5 | (Ops) dosya storage |
| D.6 | (Ops) blog / rehber |
| D.7 | (Ops) CRM bildirimi |

**DoD:**
- [ ] Prod URL  
- [ ] Form → inbox’ta mail  
- [ ] `NEXT_PUBLIC_SITE_URL` prod  

---

## Öncelik sırası (özet)

| Sıra | Faz | Kullanıcı değeri |
|------|-----|------------------|
| 1 | **A** | Gerçek firma görünümü |
| 2 | **B** | Fiyat + güçlü teklif |
| 3 | **C** | Güven & ekip |
| 4 | **D** | Yayında ölçülebilir |

---

## Operatör onay kutusu

Gap analizi + fazlar için:

```
23/24 onay — olgunlaşma A→D kabul
```

İsteğe bağlı notlar:
- `fiyatlar: şablon ile başla` veya `fiyatlar: ben vereceğim`
- `logo: SVG üret` veya `logo: dosya göndereceğim`
- `dosya: WA yönlendirme` veya `dosya: gerçek upload`

Onaydan sonra ARCHITECT focus → **Faz A**.
