# Gemini Logo Prompt — POL-TURK

Gemini’ye (veya ImageFX / başka görsel modele) **aynen veya hafif kısaltarak** yapıştır.

---

## Kısa bağlam (Gemini’ye önce söyle — metin)

```
Bir web sitesi ve marka kimliği üzerinde çalışıyoruz. Firma adı POL-TURK.
Polonya–Türkiye arasında yeminli çeviri, oturum/çalışma izni danışmanlığı,
kurumsal iletişim ve şirket kurulumu hizmetleri veriyor. Site Next.js ile
kurumsal, güven odaklı (koyu lacivert + emerald yeşil) tasarlandı.
Senden logo üretmeni istiyorum; aşağıdaki brief’e sadık kal.
```

---

## Ana prompt (İngilizce — görsel modellerde genelde daha iyi)

```
Design a professional corporate logo for "POL-TURK", a Poland–Turkey translation and consulting firm (sworn translation, residence permits, business setup).

Style: modern, trustworthy, clean, minimal — suitable for a law-adjacent professional services website. NOT playful, NOT startup-neon, NOT generic AI purple gradients.

Concept: subtle bridge / dual-culture connection between Poland and Turkey without using cliché flags as the whole logo. Prefer a refined monogram or wordmark.

Primary lockup:
- Wordmark: "POL-TURK" in a strong, elegant sans or humanist sans
- Optional small tagline under (can leave tagline area empty for flexibility): "Translation & Consulting"

Color palette (exact direction):
- Deep trust navy: #0F1C2E and #1A2B42
- Accent emerald: #059669
- Background: clean white or transparent
- No purple, no gold-luxury cliché overload, no glossy 3D chrome

Deliver variants in one set if possible:
1) Full horizontal wordmark (navy + emerald accent on a letter or connector)
2) Square app/favicon monogram: letters "P" and "T" combined or a simple geometric bridge mark in a rounded square
3) Single-color navy version for print
4) Reversed white version for dark headers

Technical:
- Flat vector look, crisp edges, high contrast
- Works small (favicon 32px) and large (website header)
- Plenty of clear space, centered composition
- No photorealism, no mockups of business cards unless asked
- No watermarks, no extra text beyond POL-TURK

Mood references: serious consultancy, bilingual bridge, official-document trust — not tourism agency.
```

---

## Türkçe alternatif prompt

```
"POL-TURK" için profesyonel kurumsal logo tasarla. Firma Polonya–Türkiye
ekseninde yeminli çeviri, oturum izni danışmanlığı ve şirket kurulumu yapıyor.

Stil: modern, güven veren, sade, kurumsal. Eğlenceli veya neon startup stili olmasın.
Mor gradient, aşırı 3D, turistik bayrak kolajı kullanma.

Konsept: Polonya ile Türkiye arasında köprü / bağlantı hissi; abartısız.
Ana öğe: "POL-TURK" yazı logosu (güçlü, okunaklı sans-serif).
İsteğe bağlı: "P" ve "T" harflerinden kare monogram (favicon için).

Renkler:
- Lacivert #0F1C2E / #1A2B42
- Vurgu yeşili emerald #059669
- Beyaz veya şeffaf zemin

Çıktılar:
1) Yatay logo
2) Kare ikon/monogram
3) Tek renk lacivert versiyon
4) Koyu zemin için beyaz versiyon

Düz vektör hissi, küçük boyutta da okunaklı, filigran yok, ekstra yazı yok.
```

---

## Gemini’ye ek talimatlar (istenirse)

```
- Önce 4 farklı konsept öner (sadece metin), onayımdan sonra görsel üret.
- Bayrakları ana motif yapma; en fazla çok subtle bir geometrik ima.
- Logo metnini yanlış yazma: POL-TURK (tire ile).
- SVG veya şeffaf PNG (yüksek çözünürlük) Prefer et.
```

---

## Siteye yerleştirirken (bizde)

Üretilen dosyalar hedefi:
- `public/brand/pol-turk-logo.svg`
- `public/brand/pol-turk-mark.svg` (ikon)
- Header’da Faz A ile entegre edilecek

Renkler mevcut tasarım tokenleriyle uyumlu: `docs/07-tasarim-tokenleri.md`.
