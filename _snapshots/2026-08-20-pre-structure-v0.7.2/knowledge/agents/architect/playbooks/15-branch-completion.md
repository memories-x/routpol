# Playbook 15 — Development Branch Completion

> Kaynak: obra/superpowers — `finishing-a-development-branch` skill. A-CyberSolutions Workflow Disiplini (AGENTS.md §4), R7 Invariants ve filesystem snapshot rollback pattern'ına uyarlandı.

## Ne Zaman Kullanılır

Bu playbook şu durumlarda tetiklenir:
- Bir feature veya fix implementasyonu tamamlandığında
- Sentinel denetimi `APPROVED` döndürdüğünde
- Architect-01 `PROCEED` kararından sonra tüm implementation adımları bitti
- Kullanıcı "bu işi bitir" veya "değişiklikleri kapat" dediğinde

## Prosedür

### Adım 1 — TypeScript Derleme Doğrulaması

Herhangi bir entegrasyon adımına geçmeden önce:

```bash
# ac-panel varsa
npx tsc --noEmit -p tsconfig.app.json

# ac-daemon varsa
npx tsc --noEmit
```

**Hata varsa:** Derleme hatası giderilmeden bu playbook'un hiçbir adımı uygulanmaz. Hatalar çözülüp tekrar çalıştır.

### Adım 2 — Sentinel Full Sweep

```bash
node scripts/audit-sentinel.js --all --tsc
```

Quality Score 85 altındaysa: Bulguları gider, tekrar çalıştır. Skor yeşilse devam.

### Adım 3 — CHANGELOG Tutarlılık Kontrolü

Yapılan her değişiklik için CHANGELOG.md'ye giriş yaz:

```markdown
## [YYYY-MM-DD] — <kısa başlık>

### Değişim
<ne değişti>

### Neden
<teknik gerekçe>

### Teknik Detay
<etkilenen dosyalar, kritik kararlar>
```

**R7.7 Zorunluluğu:** "X eklendi" yazıyorsan X koda grep ile mevcut olmalı. "Y kaldırıldı" yazıyorsan Y grep sonucu 0 olmalı. CHANGELOG yalan yazarsa: `BLOCKER`.

### Adım 4 — Wiki Güncelleme Kontrolü

Değiştirilen bileşene ait wiki node varsa güncelle. Yoksa oluştur.

```
docs/wiki/<ComponentName>.md
```

R8 gereği: Wiki güncellenmemişse çalışma `CHANGES_REQUESTED`.

### Adım 5 — Kullanıcıya Tamamlama Seçenekleri Sun

Tüm kontroller yeşilse, kullanıcıya tam olarak şu 4 seçeneği sun:

```
Uygulama tamamlandı. Ne yapmak istiyorsunuz?

1. Değişiklikleri olduğu gibi bırak (production deploy için hazır)
2. Tüm dosyaların .bak snapshot'larını temizle
3. Bir sonraki göreve geç (bu değişiklikleri şimdilik dondur)
4. Bu değişiklikleri geri al (snapshot'lardan restore et)

Seçim?
```

Seçenek 4 için önce onay al:
```
Bu işlem şu dosyaları geri alır: <dosya listesi>
Devam etmek için 'geri-al' yazın.
```

### Adım 6 — Seçim Uygula

| Seçenek | Aksiyon |
|---|---|
| 1 — Bırak | Son durumu raporla. .bak dosyaları yerinde kalsın (recovery artifact). |
| 2 — .bak Temizle | `.bak` uzantılı tüm snapshot dosyalarını sil. |
| 3 — Dondur | `docs/wiki/ActiveTasks.md` → backlog'a ekle, raporla. |
| 4 — Geri Al | `.bak` dosyalarından `Copy-Item .bak → original -Force` ile restore et. |

## Çıktı Formatı

```
[BRANCH COMPLETION REPORT]

tsc: PASS (0 errors)
Sentinel quality score: 92
CHANGELOG: Updated (YYYY-MM-DD entry)
Wiki: docs/wiki/<Component>.md updated

Action taken: <seçilen seçenek>

[CLAIM] Implementation tamamlandı
[EVIDENCE] tsc exit 0 + Sentinel score 92/100 + CHANGELOG line added

— Architect-01 handoff complete @ <ISO timestamp>
```

## Hata Durumları

| Durum | Aksiyon |
|---|---|
| tsc hata | Hataları gider, adım 1'den başlat |
| Sentinel 85 altı | Bulguları gider, adım 2'yi tekrar çalıştır |
| .bak snapshot yok (geri alma istenirse) | Kullanıcıyı bildir — restore mümkün değil, manuel müdahale gerekli |
| CHANGELOG grep uyuşmuyor | CHANGELOG'u düzelt, sahte girdi ekleme |

## Yasaklı Davranışlar

- tsc veya Sentinel kontrolü atlamak
- CHANGELOG yazmadan "tamamlandı" bildirmek
- Seçenek 4 için onay almadan geri alma yapmak
- R14 kanıtı olmadan "tamamlandı" raporlamak
- Hata durumunda sessiz kalmak (R21)

---

*Playbook 15 — Kaynak: finishing-a-development-branch (obra/superpowers), A-CyberSolutions R1-R22 uyarlaması*
*Son güncelleme: 2026-05-17*
