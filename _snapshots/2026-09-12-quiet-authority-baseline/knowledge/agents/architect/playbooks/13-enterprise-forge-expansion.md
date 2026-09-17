# Enterprise Forge Expansion Playbook (B2B Infrastructure Orchestrator)

> **MİSYON BİLDİRİSİ:** A-CyberSolutions bir "oyun sunucusu paneli" değildir. Kurumsal şirketlere, barındırma bayilerine (resellers), ajanslara ve küresel altyapı sağlayıcılarına otonom, güvenli, denetlenebilir ve yüksek performanslı hibrit bulut orkestrasyonu sunan bir **B2B Enterprise Altyapı Otoritesidir**.

Bu playbook, `ServerForge` modülünün mevcut dar kapsamından çıkarılarak, **Kurumsal Hibrit Bulut Dağıtım Merkezi (Enterprise Infrastructure & Hybrid Cloud Forge)** yapısına dönüştürülmesinin mimari planını, uçuş öncesi (pre-flight) spesifikasyonunu ve 10 katmanlı kurumsal orkestrasyon iskeletini tanımlar.

---

## 1. KANONİK PLANLAMA (YAML)

```yaml
title: "B2B Enterprise Server Forge & Multi-Tenant Infrastructure Expansion"
scope:
  project: ac-panel & ac-daemon
  module: ServerForge.tsx, ForgeService.ts, serverRoutes.ts, ProvisioningEngine.ts, PolicyEngine.ts, TelemetryService.ts, VaultService.ts
  out_of_scope: [ "Müşteri vitrini (ac-website-restored) faturalandırma motoru değişikliği" ]
intent:
  what: "Server Forge modülünü toptan B2B kurumsal standartlara taşıyarak; Template Versioning, Drift Detection, Policy Enforcement, Vault Secrets Injection, Network Topology Awareness ve Golden Image Registry katmanlarını barındıran tam otonom bir orkestratör ürününe dönüştürmek."
  why: "Kaptan emri ve A-CyberSolutions B2B endüstriyel misyonu gereği, tüm firmalara, bayilere ve kurumsal denetimlere (ISO/SOC2/KVKK/GDPR) tam uyumlu, sıfır hata ve sıfır sızıntı prensibiyle hizmet sunabilmek."
  triggered_by: user_request
steps:
  - order: 1
    action: architect_dynamic_catalog_and_versioning
    files: [ "ac-daemon/src/services/ForgeService.ts" ]
    description: "Hardcoded katalog yapılarını dinamik, imzalı (catalog.json.sig) ve şablon versiyonlamasını (ForgeTemplate interface + /var/ac/forge-manifest.json) destekleyen Terraform/Pulumi seviyesinde bir altyapıya taşımak."
    risk: medium
  - order: 2
    action: implement_tenant_scoping_and_policy_engine
    files: [ "ac-daemon/src/services/ForgeService.ts", "ac-daemon/src/services/PolicyEngine.ts", "ac-daemon/src/routes/serverRoutes.ts" ]
    description: "Kiracılara özel izole kataloglar (Private Catalogs) ve kiracıların yasadışı/riskli şablon yüklemesini engelleyen Policy Enforcement Layer (PolicyEngine.validate - Max RAM, --privileged yasağı) inşa etmek."
    risk: high
  - order: 3
    action: integrate_vault_and_network_topology
    files: [ "ac-daemon/src/services/ProvisioningEngine.ts", "ac-daemon/src/services/VaultService.ts" ]
    description: "Provision anında HashiCorp Vault üzerinden güvenli sır enjeksiyonunu (Secrets Injection) ve düğümler arası ağ topolojisi farkındalığını (NetworkGraph.registerNode) devreye almak."
    risk: high
  - order: 4
    action: enforce_drift_detection_and_lifecycle
    files: [ "ac-daemon/src/services/ProvisioningEngine.ts", "ac-daemon/src/services/TelemetryService.ts" ]
    description: "Altyapı sapmalarını otonom tespit eden Drift Detection motorunu, kurumsal yaşam döngüsü kancalarını (postProvision, preUpgrade, gracefulShutdown) ve gerçek zamanlı maliyet/metrik telemetrisini devreye almak."
    risk: high
  - order: 5
    action: upgrade_ui_enterprise_forge
    files: [ "ac-panel/src/pages/ServerForge.tsx" ]
    description: "Kategori filtreleri, kurumsal toptan B2B fiyat etiketleri, otonom CVE/Drift durum rozetleri ve Network Topology görselleştiricisi içeren Accenture Deep Navy stili kurumsal UI inşası."
    risk: medium
dependencies: [ "Axios", "Dockerode", "Crypto", "DNS/Promises", "HashiCorp Vault API" ]
side_effects: [ "Mevcut 3 oyun şablonunun yeni kurumsal versiyonlu ve imzalı veri modeline otonom migrasyonu." ]
rollback:
  trigger: "TypeScript derleme hatası, tsc fail, imza uyuşmazlığı veya çalışma anı Policy/SSRF zafiyet tespiti."
  steps:
    - "Copy-Item ac-daemon/src/services/ForgeService.ts.bak ac-daemon/src/services/ForgeService.ts -Force"
    - "Copy-Item ac-panel/src/pages/ServerForge.tsx.bak ac-panel/src/pages/ServerForge.tsx -Force"
success_criteria: 
  - "ServerForge.tsx sayfasında 10 katmanlı kurumsal B2B altyapı otoritesinin sıfır hata ile çalışması."
  - "Tüm şablonların imzalı olması, manifest dosyalarının yazılması ve drift detection motorunun aktif çalışması."
  - "tsc ve vite build derlemelerinin sıfır hata ve sıfır uyarı vermesi."
stop_conditions: [ "Herhangi bir şablon indirmesinde imza (sig) uyuşmazlığı, Policy ihlali veya private IP sızıntısı tespiti." ]
estimated_effort: 90
risk_overall: high
```

---

## 2. 10 KATMANLI KURUMSAL ORKESTRASYON İSKELETİ (THE ENTERPRISE DIFFERENTIATOR)

Kaptan'ın tecrübe ve vizyonuyla belirlediği, sistemi basit bir "oyun panelinden" çıkarıp **AWS OpsWorks, Kubernetes Operators ve HashiCorp Terraform/Vault** seviyesinde gerçek bir B2B ürününe dönüştüren 10 kritik katman aşağıda detaylandırılmıştır:

### 1. Template Versioning & Reproducible Infrastructure
Kurumsal altyapılarda geriye dönük denetim (Audit), kök neden analizi (RCA) ve SLA taahhütleri için her düğümün tam olarak hangi şablonun hangi versiyonuyla oluşturulduğu bilinmelidir.
*   **Veri Modeli Sözleşmesi:**
    ```typescript
    export interface ForgeTemplate {
      id: string;
      name: string;
      category: 'gaming' | 'db' | 'ai' | 'microservice' | 'private';
      version: string;             // e.g. "1.4.2"
      dockerComposeHash: string;   // SHA-256 of the canonical compose definition
      schemaVersion: number;
      signedAt: Date;
      defaultMemory: number;
      defaultCpu: number;
      ports: string[];
      env: string[];
    }
    ```
*   **Manifest Damgası (Terraform/Pulumi Seviyesi):** Her sunucu provision edildiğinde düğümün ana dizinine `/var/ac/forge-manifest.json` (veya Windows eşdeğeri `C:\ProgramData\ACyberSolutions\volumes\<serverId>\forge-manifest.json`) otonom olarak yazılacaktır.

### 2. Infrastructure Drift Detection (SLA Koruması)
Sunucu oluşturulduktan sonra kiracının (tenant) veya bir saldırganın konteyner içine girip konfigürasyonları değiştirmesi SLA ihlalidir.
*   `ProvisioningEngine` içerisine periyodik bir otonom kanca eklenir:
    *   Konteynerin mevcut `docker inspect` durumu ile `/var/ac/forge-manifest.json` içerisindeki `dockerComposeHash` ve volume hash değerleri karşılaştırılır.
    *   **Drift Tespiti:** Sapma (drift) olduğu anda sistem otonom `ALERT` fırlatır ve kurumsal SLA gereği `Auto-Heal` (otonom onarım/redeploy) seçeneği sunar.

### 3. Policy Engine (Kiracı Kısıtlama Katmanı)
Kiracıların (Tenants/Resellers) sisteme yasadışı, riskli veya aşırı kaynak tüketen şablonlar eklemesini engelleyen otonom kural motorudur.
*   `PolicyEngine.validate(template: ForgeTemplate, tenantPolicy: TenantPolicy)` kancası devreye alınır.
*   **Örnek Kurumsal Kısıtlamalar:**
    *   `Max RAM:` Kiracı başına veya şablon başına maksimum limit (örn: 32GB).
    *   `Forbidden Images:` `--privileged`, `hostNetwork`, `pid: host` gibi sistem çekirdeğine erişen imajlar anında reddedilir.
    *   `Forbidden Syscalls & Ports:` Çekirdek zafiyeti yaratabilecek yetkiler kilitlenir.

### 4. Network Topology Awareness (Ağ Grafiği Farkındalığı)
Ağ topolojisinin sadece UI üzerinde görsel bir süs olarak kalmaması, arka planda tam bir ağ grafiği (Network Graph) olarak işlenmesi sağlanır.
*   Provision sonrasında `NetworkGraph.registerNode(nodeId, tenantId, subnet, exposedPorts)` çalışır.
*   Sistem şu sorulara otonom yanıt verebilir: *Bu düğüm public mi? Private VPC içinde mi? Aynı kiracının DB düğümü ile AI düğümü aynı izole ağda mı?*

### 5. Secrets Injection & Vault Integration
Kurumsal güvenlik standartları gereği veritabanı şifreleri, JWT secret'ları ve API anahtarları asla compose dosyalarında veya disk üzerinde açıkça taşınmaz.
*   Provision anında sistem otonom olarak HashiCorp Vault (veya eşdeğer güvenli Vault servisi) ile konuşur: `Forge → Vault → inject secrets → container env`.
*   Konteyner ayağa kalkarken sırlar doğrudan belleğe enjekte edilir.

### 6. Cost & Resource Telemetry (Gerçek Zamanlı Maliyet Metrikleri)
UI üzerindeki "Wholesale B2B Rate" etiketinin statik ve yanıltıcı olmaması için otonom ölçüm motoru devreye alınır.
*   `TelemetryService`: Docker stats collector ve Node Exporter mantığıyla gerçek CPU/RAM/IOPS kullanımını ölçer, şablonun gerçek altyapı maliyetini ve kiracı başına kaynak tüketimini dinamik olarak hesaplar.

### 7. Template Signing Authority (Tedarik Zinciri Koruması)
SHA-256 dosya bütünlüğünü sağlarken, imza (signature) dosyanın menşeini doğrular.
*   A-CyberSolutions Private Key altyapısı kurularak `catalog.json.sig` ve `template.sig` imza kontrolü devreye alınır.
*   `ForgeService` sadece kriptografik olarak imzalanmış şablonları kabul eder. Bu, kurumsal müşterileri tedarik zinciri saldırılarından (Supply-Chain Attacks) korur.

### 8. Lifecycle Hooks (Kurumsal Yaşam Döngüsü)
Veritabanı ve AI düğümlerinin güvenli bir şekilde yönetilebilmesi için 4 aşamalı kanca mimarisi kurulur:
*   `postProvision()`: Başlangıç veri tohumlama (seeding) ve topoloji kaydı.
*   `healthCheck()`: L7 uygulama seviyesi canlılık denetimi.
*   `preUpgrade()`: Veri yedekleme ve otonom tahliye.
*   `gracefulShutdown()`: Veri kaybı olmadan güvenli durdurma.

### 9. Golden Images / Base Image Registry (Sıfır Zafiyet İmajları)
Kiracıların DockerHub üzerinden güvensiz veya zafiyetli imajlar çekmesi engellenir.
*   Sadece A-CyberSolutions tarafından sertifikalandırılmış ve sıkılaştırılmış (hardened) temel imajlar (`ac-registry.internal/postgres-hardened:16` vb.) kullanılır.
*   Otomatik CVE taraması ve rebuild boru hattı (pipeline) aktif edilir.

### 10. Full Audit Trail (ISO/SOC2/KVKK/GDPR Uyum Loglaması)
Kurumsal denetimlerden geçebilmek için tüm eylemler değişmez (immutable) bir denetim günlüğüne yazılır.
*   *Kim hangi şablonu deploy etti? Hangi bayi eklenti ekledi? Hangi SHA-256 ve manifest damgasıyla işlem yapıldı?* Tüm bu veriler kriptografik olarak loglanır.

---

## 3. UYGULAMA VE DEVREYE ALMA ADIMLARI (KAPTAN ONAYI BEKLENİYOR)

Kaptan'ın **"Tamam, planı uygula"** emri vermesi halinde sistem aşağıdaki sırayla otonom olarak çalışacaktır:
1.  `ac-daemon/src/services/` altında `ForgeService.ts`, `PolicyEngine.ts`, `TelemetryService.ts` ve `VaultService.ts` modülleri 10 katmanlı iskelete göre güncellenecektir.
2.  `ac-panel/src/pages/ServerForge.tsx` sayfası kurumsal topoloji ve B2B fiyatlandırma arayüzüyle güncellenecektir.
3.  Her iki katmanda (`tsc` ve `vite build`) sıfır hata doğrulaması yapılacak ve Sentinel denetiminden geçirilecektir.

*Bu playbook, A-CyberSolutions Triumvira Ajan Ekibi tarafından Kaptan'ın B2B Enterprise Orchestrator vizyonu doğrultusunda hazırlanmış ve mühürlenmiştir.*
