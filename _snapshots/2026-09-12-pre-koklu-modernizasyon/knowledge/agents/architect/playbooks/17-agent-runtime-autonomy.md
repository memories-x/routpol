# Playbook 17 — Agent Runtime Autonomy

> Operatör, ajanın talebe göre çalışma modunu (Agent/Plan/Debug/Ask/Multitask) **kendisi seçmesine** izin verdiğinde bu playbook geçerlidir.
> Master rule: **R24**

---

## Ne zaman kullanılır

- Operatör "istediğin modda geç, en iyi sonuca ulaş" dediğinde
- Belirsiz talep — önce mod seçimi gerekli
- Uzun oturumda mod değişimi (debug → agent → ship)

---

## Mod seçim matrisi

| Sinyal | Mod |
|--------|-----|
| "Düzelt", "ekle", "çalıştır", net tek iş | **Agent** |
| Mimari karar, 3+ geçerli yol, büyük refactor | **Plan** |
| Hata mesajı, beklenmeyen davranış, fail log | **Debug** |
| "Nasıl çalışıyor?", "açıkla", review-only | **Ask** |
| Bağımsız 2+ iş paketi (test + docs + fix) | **Multitask** |

### Dev-workflow alt pipeline (feature işleri)

```
Checkpoint? → Plan gate? → Implement → QA-only → Ship
```

Küçük tek dosya fix → doğrudan Agent, plan gate atlanabilir (R1 istisnası: operatör explicit veya 1 dosya).

---

## Otonomi sınırları (değişmez)

| Durum | Aksiyon |
|-------|---------|
| R13 direction lock çatışması | Operatöre sor — otonom geçiş yok |
| `current_focus` dışı iş | ABORT veya archive öner |
| Git commit/push | Sadece operatör isteyince |
| Cross-project değişiklik | Onay gerekli |
| Heavy disk iş | Playbook 16 gate |

---

## Mod geçiş kuralları

1. **Debug → Agent:** Root cause kanıtlandıktan sonra fix.
2. **Plan → Agent:** PROCEED (bağımsız Architect veya operatör onayı).
3. **Agent → QA-only:** Kod değişti; doğrula, scope genişletme.
4. **QA-only → Ship:** Guard + sentinel PASS.
5. **Herhangi → Ask:** Operatör soru sordu; değişiklik yapma.

Mod değişimini operatöre her seferinde sorma — kısa `[INFO] Mode: debug — investigating X` yeterli.

---

## Token disiplini (tüm modlar)

1. Plan `scope` / `modify_files` dışına çıkma
2. Repo-wide grep sadece debug modunda
3. Checkpoint önce uzun tur
4. Handoff notu: son 5 entry

---

## Response şablonu

```
[RUNTIME] mode=<agent|plan|debug|ask|multitask>
reason: <why this mode>
next: <single action>
limits: <any operator gate pending>
```

---

*Playbook 17 — Operator-granted runtime autonomy, starter kit.*
