# PROJECT CHARTER — Template

> Yeni projeye starter kit kopyaladıktan sonra bu dosyayı `PROJECT_CHARTER.md` olarak kaydet ve doldur.
> Generic starter `AGENTS.md` bu dosyaya referans verir.

---

## 1) Proje kimliği

| Alan | Değer |
|------|-------|
| Proje adı | |
| Amaç (1 cümle) | |
| Hedef kullanıcı | |
| Repo yapısı | |

```
<module-a>/     ← 
<module-b>/     ← 
docs/           ← 
```

## 2) Mutlak kurallar (proje özel)

`project.invariants.yaml` ile senkron tut.

### API (varsa)

Envelope: `{ success, data, error }` veya: _______________

### Port / host (varsa)

Canonical: _______________

### Frontend (varsa)

- Array guards zorunlu: evet / hayır
- Yasak UI: prompt / alert / confirm

### Tasarım (varsa)

Token sistemi: _______________
Yasak raw hex: evet / hayır

### Marka (varsa)

Kullanıcıya görünen isim: _______________
Yasak internal vendor stringleri: _______________

## 3) Bilinen açık kapılar

1. 

## 4) Tech stack

| Bileşen | Versiyon |
|---------|----------|
| | |

## 5) AI ekip briefing

Bu projede çalışan ajan:

1. `docs/wiki/TeamRoster.md` — ekip yapısı
2. `PROJECT_CHARTER.md` — bu dosya
3. `project.invariants.yaml`
4. `knowledge/agents/shared/master-rules.md`
5. `ARCHITECT_TASKS.md` → current_focus
6. `[FRAMEWORK ACK]` ver, plansız kod yazma

---

*Starter kit v1.5.0 — proje bağımsız charter şablonu.*
