# Pro-Performance Prompt Engineering

Bu doküman, **Gemini 3 Flash gibi düşük-maliyetli bir modelle Pro seviyesi (High) performansa ulaşmak için** kullanılan teknikleri içerir. Burada anlatılan yaklaşımlar persona dosyalarına ve playbook'lara gömülüdür; bu sayfa **neden öyle yazıldığını** açıklar.

## Temel İlke

Modern LLM performansı **ham IQ değil yapı**'dan gelir. Flash bir modele "kod inceleyin" denirse generic geri dönüş alır; ama aynı modele **rol + sınır + format + örnek + cezalı yasaklar** verirsen Pro-grade çıktı üretir. Sentinel ve Architect persona'ları tam bu mantıkla yazıldı.

## 7 Teknik (Persona'larda Uygulanmış)

### 1. Rol Kilidi (Role Lock)

Tek satırlık rol kilidi modeli "yardımcı asistan" zihninden çıkarır:

> "Sen bir coding assistant değilsin. Sen Sentinel'sin."

Negatif tanım (ne **değil**sin) modelin reflex davranışlarını bloke eder. "Helpful assistant" karakteri Flash'te çok güçlü; kilitlenmezse devreye girer ve kuralları gevşetir.

### 2. Yasaklı Dil Listesi (Forbidden Phrases)

Flash drama'ya meyilli (özellikle Türkçe'de): "siber", "lüks", "God-Tier" gibi süslü ifadeler kullanır. Persona §IX/§XII'de açıkça yasak.

Etki: drama→substance oranı düzelir, çıktı denetlenebilir hale gelir.

### 3. Yapısal Output Şeması

Output'u serbest metin değil **şablon** olarak tanımla. Sentinel §VI ve Architect §VI'da 11 alanlı tablo + zorunlu imza satırı.

Etki: Pro modeller bu şablonu zaten doğru üretir; Flash modeli **şablon takip etmeye odaklanınca** içerikte de derinleşir. "Format dolduruyor olmak" doğru içerik üretmenin proxy'sidir.

### 4. Karar Enumlu (Decision Enum)

Verdict serbest cümle değil; PROCEED | REVISE | ABORT | DEFER gibi sıkı enum. Flash sıkı enum'a uyduğunda kararsızlık halüsinasyonu azalır.

### 5. Hiyerarşik Kaynak Listesi (Source Hierarchy)

Persona §III ve §IV'te bilgi kaynakları sıralandı (AGENTS.md, wiki, skills, memory). Flash kendi başına "neyi okumalı" sorusunu cevaplayamaz; ama numaralı liste verirsen sırayla okur.

Etki: context utilization Flash'te Pro'ya yaklaşır.

### 6. Self-Skepticism Protokolü

Persona §VIII'de yer alan "kalibrasyon" bölümü modeli **kendi yanılgısını yönetmeye** zorlar. Bu Flash'te eksik (Pro'da içsel olarak vardır).

Tipik etki: DEFER kararının frekansı doğru artar (false positive AND false negative azalır).

### 7. Memory-As-Context

`knowledge/agents/<agent>/memory.json` ve `shared/learning-log.md` ile her audit'e geçmiş bilgi enjekte edilir. Flash'in zayıf yanı uzun konuşma boyunca kaybolan context; persistent memory bu kayıbı dışsallaştırır.

## Pratik Konfigürasyon (Gemini 3 Flash için)

LLM tool'unu Sentinel/Architect olarak çalıştırırken:

```
System Prompt: <persona.md içeriği — ~3-4k token>
Context Documents (read-only): AGENTS.md, ARCHITECT_TASKS.md, ilgili wiki
User Message: <plan YAML veya kod diff>
Temperature: 0.2 (deterministic auditor)
Max Tokens: 2000 (yapısal output yeterli)
Stop Sequences: ["— End of Audit"]
```

**Temperature 0.2 kritik:** Auditor yaratıcı değil, prosedürel olmalı. Pro modelde 0.7 yine işe yarar ama Flash'te ≤0.3 sıkılığı korur.

## Anti-Pattern'lar (Yapma)

- **"Asistan ol ve yardımcı ol"** tipi açılış → Flash bunu duyduğu an rol kilidini kırar
- **"Kibarca düzelt"** → Pro yapabilir, Flash gevşer ve BLOCKER'ı MINOR yapar
- **"En iyi pratiği öner"** → Flash burada genel cevap üretir, proje-spesifik kaybolur
- **Sıralı listesiz checklist** → Flash atlar, Pro tamamlar
- **Tek bir uzun paragraf** → Flash okumaz, Pro okur

## Beklenen Sonuç

Doğru konfigürasyonda Gemini 3 Flash:
- Sentinel role'ünde Pro'nun ~85-90% performansı (regex+skill destekli)
- Architect role'ünde Pro'nun ~70-80% performansı (sübjektif risk analizi Pro'da daha derin)
- Maliyet: Pro'nun 1/8-1/10'u

Bu trade-off A-CyberSolutions için kabul edilebilir çünkü:
1. Static engine (Sentinel CLI) zaten deterministik
2. Architect bağımsız oturumdan koşar — model gücü tek nokta değil
3. Yanlış-pozitif insan operatorca kalibre ediliyor (false-positive memory)

## Pro Modelden Ne Zaman Yararlan

Bu personalar Flash optimize. Pro modeli sadece şu durumlarda kullan:
- Mimari karar (yeni servis pattern'i seçimi)
- Security incident root cause analizi
- Major refactor planlama (Playbook 01'in audit'i)
- Performance optimization (heuristic değil ölçüm-bazlı)

Rutin code review için Flash + bu persona yeterli — yetiyor olmasını istemen yeter.
