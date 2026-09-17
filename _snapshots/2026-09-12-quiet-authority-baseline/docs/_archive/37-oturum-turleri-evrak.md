# Oturum — referans evrak checklist (MOS/UDSC hizalı)

**Kilit:** 2026-08-07  
**Amaç:** Operatör / danışman için kategoriye göre doğru belge setini bilmek.  
**Müşteri yükleme:** `oturum-dosyasi` bilgilendirme paketinde **yok**. Fiziksel paket veya vekaletli yönetim → `dosya-takibi` (`docs/35`).  
**Kod referansı:** `src/lib/cases/residence-slots.ts` (anlatım / paket hazırlığı; checkout zorunlu slot değil)

## Disclaimer

Bu bir **operasyonel kontrol listesidir**, avukatlık veya kesin hukuki envanter değildir. Wojewoda işlem sırasında ek belge isteyebilir. Listeler resmi kaynaklara dayandırılmıştır.

## Kaynaklar

| Kaynak | Ne için |
|--------|---------|
| [UDSC MOS bilgi](https://www.gov.pl/web/udsc/info-mos) | Ortak ekler: foto, pasaport tüm sayfalar, opłata skarbowa, **100 zł karta**, üçüncü taraf załącznik’ler |
| [UDSC MOS-QA](https://www.gov.pl/web/udsc/mos-qa) | Hangi başvurular MOS / hangileri kâğıt |
| [Dz.U. 2026 poz. 553](https://dziennikustaw.gov.pl/D2026000055301.pdf) | Form + Załącznik 1–5 (ne zaman hangi ek) |
| [WSC Mazowieckie — praca](https://migrant.wsc.mazowieckie.pl/pl/procedury/zezwolenie-na-pobyt-czasowy-w-celu-wykonywania-pracy) | İş: zał.1, sigorta, işveren mali/faaliyet, düzenlenen meslek |
| [WSC — Karta Polaka stały](https://migrant.wsc.mazowieckie.pl/pl/procedury/pobyt-staly-dla-posiadacza-karty-polaka) | Karta + yerleşme; skarbowa genelde yok |

## Katmanlı seçim (yanlış liste = eksik peşinde koşmak)

```
track → purpose | basis → familyLink
```

| track | Alt alan | Örnek |
|-------|----------|--------|
| `pobyt-czasowy` | `purpose` | praca, studia, rodzina, dzialalnosc, **staz**, **wolontariat** |
| `pobyt-staly` | `basis` | malzonek-pl, dziecko-pl, **karta-polaka**, **polskie-pochodzenie**, pobyt-ciagly, inne |
| `rodzina` purpose | `familyLink` | malzonek, dziecko, rodzic, inne |
| `rezydent-ue` / `blue-card` | — | doğrudan slot seti |

`basis=inne` / `familyLink=inne` → **müşteri notu zorunlu**.

## Ortak çekirdek (MOS formal)

| Slot | Zorunlu | Not |
|------|---------|-----|
| `pasaport_tum_sayfalar` | evet | tüm sayfalar |
| `fotograf_biometryczna` | evet | 684×883, ≤2,5 MB, 35×45, ≤6 ay |
| `oplata_skarbowa` | evet* | *Karta Polaka stały’de genelde yok |
| `oplata_karta_pobytu` | evet | **100 zł** ayrı |
| `ubezpieczenie_zdrowotne` | evet | |
| `adres_zamieszkania` | evet | |
| `tlumaczenie_przysiegle` | hayır | yabancı dil belgeleri |
| `ek_wojewoda` | hayır | sonradan gelen wezwanie |

## Kategori → ek belgeler (özet)

| Profil | Zorunlu ekler (kodda) |
|--------|------------------------|
| czasowy / **praca** | Zał.1, sözleşme, işveren mali+faaliyet, (ops. yetki, starosta, düzenlenen meslek) |
| czasowy / **studia** | Zał.5, okul zaświadczenia, geçim |
| czasowy / **rodzina** | sponsor + ortak yaşam + ilişki belgeleri |
| czasowy / **dzialalnosc** | KRS/CEIDG, gelir/vergi; yönetim yoluysa Zał.1 |
| czasowy / **staz** | Zał.3, staj sözleşmesi, geçim |
| czasowy / **wolontariat** | Zał.3, gönüllülük sözleşmesi, geçim |
| stały / **malzonek-pl** | evlilik, eş vatandaşlığı, ortak yaşam/süre |
| stały / **karta-polaka** | Karta + yerleşme ekleri (skarbowa yok) |
| stały / **polskie-pochodzenie** | köken + yeminli çeviri |
| stały / **pobyt-ciagly** | önceki izinler + kesintisiz kalış + geçim |
| **blue-card** | Zał.1–2, ≥1y sözleşme, diploma, işveren mali |
| **rezydent-ue** | 5 yıl, istikrarlı gelir, sigorta |

## Operatör notu

- Załącznik 1/3/5 çoğu zaman **MOS içinde üçüncü taraf e-imza** ile tamamlanır; müşteriden sözleşme + koşulların uyumu + (gerekirse) yetki belgesi yine de toplanır ki dosya hazır olsun.  
- Wojewoda sonra da ek isteyebilir — `ek_wojewoda` slotu bunun için.

## Województwo katmanı

Başvuruda **województwo zorunlu** (hangi WSC / portal).

| Katman | İçerik | Kural |
|--------|--------|--------|
| Ulusal belgeler | `residence-slots.ts` | Yalnızca UDSC MOS, Dz.U. 2026/553, açık WSC “dokumenty do wniosku” satırları |
| Województwo | `voivodeships.ts` | WSC / inPOL URL + not; **yerel upload slotu yok** ta ki kaynakta ek ek net yazılana kadar |
| Ödeme sonrası | `next-steps.ts` | MOS, e-Doręczenia, WSC, inPOL, şahsi çağrı — süreç adımları, uydurma evrak değil |

**Yasak:** Kaynağı olmayan “e-Doręczenia ekran görüntüsü”, “PESEL belgesi”, “tabelka” vb. zorunlu slot uydurmak.  
Bunlar süreç bilgisidir → başarı sayfası / MOS rehberi.

Yerel ek ekleme protokolü: WSC URL + alıntı + `verifiedAt` + profil anahtarı → `localExtrasByVoivodeship`.

- [MOS rehberi (kamu)](../src/app/[locale]/rehber/mos/page.tsx)

## İlgili

- [`36-evrak-slotlari.md`](36-evrak-slotlari.md)  
- [`35-paketler.md`](35-paketler.md)
