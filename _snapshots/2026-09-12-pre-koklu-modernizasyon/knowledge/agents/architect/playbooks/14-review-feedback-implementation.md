# Playbook 14 — Review Feedback Implementation

> Kaynak: mhattingpete/claude-skills-marketplace — `review-implementing` skill. A-CyberSolutions R1-R22 kurallarına ve Architect-01 gate formatına uyarlandı.

## Ne Zaman Kullanılır

Bu playbook şu durumlarda tetiklenir:
- Kullanıcı kod inceleme (review) yorumları ilettiğinde
- Sentinel denetim raporu `CHANGES_REQUESTED` döndürdüğünde
- Architect-01 `REVISE` kararı verdiğinde
- PR feedback veya başka bir AI ajanının bulgusu implement edilecekse

## Prosedür

### Faz 0 — Geri Bildirimleri Ayrıştır

Her review yorumunu bağımsız bir iş kalemime çevir. Birden fazla endişeyi içeren tek bir yorum varsa, alt kalemlere böl.

```yaml
# Örnek yapı
review_items:
  - id: R1
    source: "Sentinel Skill 04 — api-contract"
    finding: "Route /servers/create envelope eksik"
    files: ["ac-daemon/src/routes/serverRoutes.ts"]
    risk: medium
  - id: R2
    source: "Architect-01 G6"
    finding: "Rollback adımları somut değil"
    files: ["plan.yaml"]
    risk: low
```

**Kural:** Belirsiz yorumlar için implementasyona geçme — önce kullanıcıya netleştirme sorusu sor. R22 (Intent Parsing) zorunlu.

### Faz 1 — Öncelik Sırası

Kalemleri şu sırayla işle:

| Öncelik | Kategori | Örnek |
|---|---|---|
| 1 | Sentinel BLOCKER / Architect ABORT | Security ihlali, envelope eksik |
| 2 | Tip hatası / derleme hatası | TypeScript error, `any` kullanımı |
| 3 | Davranış değişikliği gerektiren | Logic düzeltme, route sırası |
| 4 | Dokümantasyon / CHANGELOG | Wiki güncelleme, CHANGELOG eksik |
| 5 | Style / NIT | Isimlendirme, yorum kalitesi |

Yüksek öncelik kalemleri düşük öncelik kalemlerini bloke eder. Düşük öncelik kalemi için yüksek riskli bir dosyayı değiştirme.

### Faz 2 — Her Kalem İçin Uygulama Döngüsü

Her kalem için sırayla:

```
1. Hedef dosyayı oku (view_file veya grep)
2. Mevcut durumu doğrula — kaleme yol açan kod hâlâ orada mı?
3. En minimal değişikliği yap (R18 Atomic Changes)
4. tsc --noEmit çalıştır
5. Sentinel audit çalıştır (ilgili dosya)
6. Kalemi tamamlandı işaretle
7. Sonraki kaleme geç
```

**Hiçbir zaman:** Birden fazla kalemi aynı anda implement etme. Bir kalem bitmeden diğerine geçme.

### Faz 3 — Doğrulama

Tüm kalemler tamamlandıktan sonra:

```bash
# TypeScript kontrolü
npx tsc --noEmit -p tsconfig.app.json   # ac-panel/
npx tsc --noEmit                         # ac-daemon/

# Sentinel full sweep
node scripts/audit-sentinel.js --all --tsc
```

Quality Score 85 altındaysa tamamlandı sayma.

### Faz 4 — R14 Verification Block

```
[CLAIM] <kalem ID>: <yapılan değişiklik>
[EVIDENCE] <dosya:satır> veya <grep çıktısı> veya <tsc çıktısı>
```

Her kalem için ayrı `[CLAIM]` / `[EVIDENCE]` çifti. Genel "tamamlandı" cümlesi R14 ihlali.

## Hata Durumları

| Durum | Aksiyon |
|---|---|
| Yorumun hedef ettiği kod artık mevcut değil | Kullanıcıya bildir, kalemi atlama — önce netleştir |
| Düzeltme başka testleri kırıyor | Fix'i geri al, kök nedeni analiz et, yeni kalem aç |
| Yorumlar çelişiyor | Kullanıcıya çatışmayı göster, karar beklenmeden implement etme |
| Düzeltme scope dışına taşıyor | R18 gereği dur, yeni plan submit et |

## Yasaklı Davranışlar

- Birden fazla kalemi batch halinde implement etmek
- Belirsiz yorumu "anladım" varsayarak implement etmek
- R14 kanıtı olmadan "tamamlandı" raporlamak
- Scope dışı düzeltme yapmak ("hazır girmişken bunu da...")

## Çıktı Formatı

```
[REVIEW IMPLEMENTATION REPORT]

Items processed: N
Items skipped (clarification needed): M

[CLAIM] R1: Route envelope eklendi
[EVIDENCE] ac-daemon/src/routes/serverRoutes.ts:42 → `res.json({ success: true, data: result, error: null })`

[CLAIM] R2: Rollback adımları somutlaştırıldı
[EVIDENCE] plan.yaml:rollback.steps → 3 somut adım (Copy-Item, tsc check, Halt)

tsc exit code: 0
Sentinel quality score: 91
```

---

*Playbook 14 — Kaynak: review-implementing (mhattingpete), A-CyberSolutions R1-R22 uyarlaması*
*Son güncelleme: 2026-05-17*
