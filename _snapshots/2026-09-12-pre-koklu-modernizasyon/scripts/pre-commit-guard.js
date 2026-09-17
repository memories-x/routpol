const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT_DIR, 'guard.config.json');
const EXAMPLE_PATH = path.join(ROOT_DIR, 'guard.config.example.json');

function loadConfig() {
  const file = fs.existsSync(CONFIG_PATH) ? CONFIG_PATH : EXAMPLE_PATH;
  if (!fs.existsSync(file)) {
    return {
      typescriptProjects: [],
      sentinel: { args: ['--all'] },
      skipIfMissing: true,
    };
  }
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function dirExists(cwd) {
  return fs.existsSync(path.join(ROOT_DIR, cwd));
}

const config = loadConfig();
const projects = Array.isArray(config.typescriptProjects) ? config.typescriptProjects : [];
const sentinelArgs = config.sentinel?.args ?? ['--all'];
const skipIfMissing = config.skipIfMissing !== false;

console.log('[INFO] [Pre-Commit Guard] Starting checks...');

let step = 0;
const total = projects.length + 1;

for (const project of projects) {
  step += 1;
  const cwd = project.cwd || '.';
  const name = project.name || cwd;
  const command = project.command || 'npx tsc --noEmit';

  if (skipIfMissing && !dirExists(cwd)) {
    console.log(`[INFO] [${step}/${total}] Skip ${name} — directory not found (${cwd})`);
    continue;
  }

  console.log(`\n[INFO] [${step}/${total}] TypeScript: ${name} (${cwd})`);
  try {
    execSync(command, { cwd: path.join(ROOT_DIR, cwd), stdio: 'inherit' });
    console.log(`[SUCCESS] ${name} TypeScript OK.`);
  } catch {
    console.error(`[CRITICAL] ${name} TypeScript failed. Fix errors before commit.`);
    process.exit(1);
  }
}

step += 1;
console.log(`\n[INFO] [${step}/${total}] Sentinel static audit...`);
try {
  const args = sentinelArgs.join(' ');
  execSync(`node scripts/audit-sentinel.js ${args}`, { cwd: ROOT_DIR, stdio: 'inherit' });
  console.log('[SUCCESS] Sentinel audit OK.');
} catch {
  console.error('[CRITICAL] Sentinel audit failed. Resolve findings before commit.');
  process.exit(1);
}

console.log('\n[SUCCESS] All guard checks passed.\n');
