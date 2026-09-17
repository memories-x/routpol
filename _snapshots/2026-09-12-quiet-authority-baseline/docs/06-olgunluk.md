# 06 — Olgunluk skorkartı

**Durum:** Kanonik · **2026-08-19** · Yol haritası kod kapanışı

---

## Güncel bant

| Katman | Puan | Not |
|--------|------|-----|
| Konum & ürün | 15/16 | Faz 2 kararı kanonik |
| Operasyon paneli | 12/16 | PanelUser, audit, PL/EN nav |
| Veri & teknik | 13/14 | 35+ test, CI, Playwright, payment kolonları |
| Şirket / yasal | 9/14 | Gizlilik 3 dil + purge; imzalı RODO operatörde |
| Marka & güven | 7/10 | Final marka bekliyor |
| Canlı yayın | 2/12 | Deploy hazır; prod yok |

**Sistem ~B · Şirket ~C− · Genel min = C− (kod)**

Prod canlı + operatör checklist → hedef **B / C**.

---

## Yol haritası fazları

| Faz | Kod | Operatör |
|-----|-----|----------|
| 1 Güvenlik | Tamam | — |
| 2 Hakikat | Tamam | Avukat teyidi sürekli |
| 3 Test/CI | Tamam | Postgres smoke |
| 4 Canlı | Tamam | Marka, Stripe, RODO imza |
| 5 Gelir | Tamam | — |
| 6 Ölçek | Ertelendi | — |

Detay: `docs/07-yol-haritasi-durum.md`

## Eski doküman

`docs/46-kurumsal-olgunluk-skorkarti.md` → `_archive/`
