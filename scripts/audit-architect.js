const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const ARCHITECT_FILE = path.join(ROOT_DIR, 'ARCHITECT_TASKS.md');

console.log('🏛️  [Architect-01] Programatik Plan Denetimi Başlıyor...');

if (!fs.existsSync(ARCHITECT_FILE)) {
  console.log('⚠️ ARCHITECT_TASKS.md bulunamadı. Denetim atlanıyor.');
  process.exit(0);
}

const content = fs.readFileSync(ARCHITECT_FILE, 'utf-8');
const yamlMatch = content.match(/```yaml\n([\s\S]*?)```/);

if (!yamlMatch) {
  console.error('❌ [CRITICAL] ARCHITECT_TASKS.md içerisinde geçerli bir YAML bloğu bulunamadı!');
  process.exit(1);
}

const yamlContent = yamlMatch[1];
console.log('----------------------------------------');
console.log('🎯 MEVCUT ODAK (CURRENT FOCUS):');
console.log(yamlContent.trim());
console.log('----------------------------------------');

// Fallback logic if git is missing: Warn the agent
try {
  const gitStatus = execSync('git status -s', { cwd: ROOT_DIR, encoding: 'utf-8' });
  if (gitStatus.trim().length > 0) {
    console.log('📝 Değiştirilen dosyalar tespit edildi. Lütfen bu dosyaların mevcut odak ile eşleştiğinden emin olun.');
    console.log(gitStatus.trim());
  } else {
    console.log('✅ Temiz çalışma ağacı. Değişiklik yok.');
  }
} catch (e) {
  console.log('⚠️ Git komutu bulunamadı. Lütfen yaptığınız değişikliklerin odak dışına çıkmadığını manuel teyit edin.');
}

console.log('\n✅ [Architect-01] Otonom denetim tamamlandı.');
