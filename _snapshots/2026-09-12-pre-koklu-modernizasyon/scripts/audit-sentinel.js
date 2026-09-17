#!/usr/bin/env node
/**
 * Sentinel: Quality-Lead Audit Engine
 *
 * Tek-dosya regex linter'dan tam teşekküllü kalite-kontrol mentörüne yükseltildi.
 *
 *  - Modüler skill loader (knowledge/agents/sentinel/skills/*.json) — kurallar koda gömülü değil,
 *    bağımsız dosyalarda. Yeni kural = yeni JSON, kod dokunulmuyor.
 *  - Mentor mode: her bulgu için neden + nasıl düzeltilir + referans wiki linki.
 *  - Multi-file + glob + diff mode (sadece git-changed dosyalar).
 *  - Comment/string-aware (regex'i tek başına değil, satır bağlamıyla değerlendirir).
 *  - Quality score (0-100) + JSON + Markdown rapor.
 *  - CHANGELOG ↔ kod tutarlılığı kontrolü.
 *  - TypeScript check (opsiyonel --tsc) — tsc çıktısını da skora dahil eder.
 *  - Self-learning: false positive memory + auto-elevation kalıcı.
 *
 * Kullanım:
 *   node scripts/audit-sentinel.js <file|glob>             # tek dosya / pattern
 *   node scripts/audit-sentinel.js --diff                  # sadece git-changed (HEAD)
 *   node scripts/audit-sentinel.js --all                   # tüm ac-panel/src + ac-daemon/src
 *   node scripts/audit-sentinel.js <target> --learn-fp <line>
 *   node scripts/audit-sentinel.js <target> --report=md    # markdown raporu yaz
 *   node scripts/audit-sentinel.js <target> --tsc          # TS check de yap
 *   node scripts/audit-sentinel.js --list-skills           # yüklü skill'leri göster
 */

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

// --- Plan hash: SHA-256 first 8 hex of canonical YAML ---
function computePlanHash(yamlText) {
  // Canonical: strip comments, normalize whitespace, exclude meta fields.
  const canonical = yamlText
    .split('\n')
    .filter(l => !l.trim().startsWith('#'))
    .map(l => l.trimEnd())
    .filter(l => !/^(plan_hash|plan_id)\s*:/i.test(l.trim()))
    .join('\n')
    .trim();
  return crypto.createHash('sha256').update(canonical).digest('hex').slice(0, 8);
}

const ROOT = path.resolve(__dirname, '..');
const SENTINEL_DIR = path.join(ROOT, 'knowledge', 'agents', 'sentinel');
const ARCHITECT_DIR = path.join(ROOT, 'knowledge', 'agents', 'architect');
const SHARED_DIR = path.join(ROOT, 'knowledge', 'agents', 'shared');
const MEMORY_PATH = path.join(SENTINEL_DIR, 'memory.json');
const SKILLS_DIR = path.join(SENTINEL_DIR, 'skills');
const REPORT_DIR = path.join(SENTINEL_DIR, 'reports');

// --- 1) Memory --------------------------------------------------------------

function loadMemory() {
  if (!fs.existsSync(MEMORY_PATH)) {
    fs.mkdirSync(path.dirname(MEMORY_PATH), { recursive: true });
    fs.writeFileSync(MEMORY_PATH, JSON.stringify({
      falsePositives: [],
      learnedRules: [],
      severityOverrides: {},
      stats: { totalAudits: 0, totalViolations: 0, lastScore: null },
    }, null, 2));
  }
  return JSON.parse(fs.readFileSync(MEMORY_PATH, 'utf8'));
}
function saveMemory(m) { fs.writeFileSync(MEMORY_PATH, JSON.stringify(m, null, 2)); }

const memory = loadMemory();

// --- 2) Skill loader --------------------------------------------------------

function loadSkills() {
  if (!fs.existsSync(SKILLS_DIR)) return [];
  const files = fs.readdirSync(SKILLS_DIR).filter(f => f.endsWith('.json'));
  const skills = [];
  for (const f of files) {
    try {
      const raw = JSON.parse(fs.readFileSync(path.join(SKILLS_DIR, f), 'utf8'));
      if (!raw.id || !Array.isArray(raw.rules)) {
        console.warn(`[Sentinel] Skipping malformed skill: ${f}`);
        continue;
      }
      skills.push({ ...raw, _file: f });
    } catch (e) {
      console.warn(`[Sentinel] Failed to parse ${f}: ${e.message}`);
    }
  }
  return skills;
}

const skills = loadSkills();
const learnedRules = (memory.learnedRules || []).map(r => ({ ...r, skill: 'learned' }));
const allRules = skills.flatMap(s => s.rules.map(r => ({
  ...r,
  skill: s.id,
  skillTitle: s.title,
  skillRef: s.reference,
  scope: r.scope || s.scope,
  ext: r.ext || s.ext,
}))).concat(learnedRules);

// --- 3) File discovery ------------------------------------------------------

const TEXT_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.css']);
const IGNORE_DIRS = new Set(['node_modules', 'dist', 'build', '.git', 'logs', 'sentinel_reports']);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    if (IGNORE_DIRS.has(name)) continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else if (TEXT_EXT.has(path.extname(name))) out.push(full);
  }
  return out;
}

function gitChangedFiles() {
  try {
    const out = execSync('git diff --name-only HEAD', { cwd: ROOT, encoding: 'utf8' });
    return out.split('\n').filter(Boolean)
      .map(p => path.join(ROOT, p))
      .filter(p => fs.existsSync(p) && TEXT_EXT.has(path.extname(p)));
  } catch {
    return [];
  }
}

function expandGlob(pattern) {
  // Basic glob: foo/**/*.tsx
  if (!pattern.includes('*')) {
    if (fs.existsSync(pattern)) {
      const stat = fs.statSync(pattern);
      return stat.isDirectory() ? walk(pattern) : [path.resolve(pattern)];
    }
    return [];
  }
  const segments = pattern.split('/');
  const baseIdx = segments.findIndex(s => s.includes('*'));
  const baseDir = path.resolve(segments.slice(0, baseIdx).join('/') || '.');
  const all = walk(baseDir);
  // Convert glob to regex: ** → .*, * → [^/]*, escape dots
  const re = new RegExp('^' + pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '§§')
    .replace(/\*/g, '[^/]*')
    .replace(/§§/g, '.*') + '$');
  return all.filter(f => re.test(path.relative(ROOT, f).replace(/\\/g, '/')));
}

// --- 4) Audit engine --------------------------------------------------------

function isFalsePositive(file, snippet) {
  const normalized = path.relative(ROOT, file).replace(/\\/g, '/');
  return (memory.falsePositives || []).some(fp =>
    fp.file === normalized && fp.snippet === snippet
  );
}

// Strip line comments and string literals so we don't false-positive on text
// inside comments like "// FIXME: use prompt() somewhere".
function isInsideCommentOrString(line, matchStart) {
  const before = line.slice(0, matchStart);
  // Inside line comment?
  if (before.lastIndexOf('//') >= 0 && !before.slice(before.lastIndexOf('//')).includes('*/')) {
    return 'comment';
  }
  // Inside string literal? (rough: count odd quotes)
  const sQuotes = (before.match(/'/g) || []).length;
  const dQuotes = (before.match(/"/g) || []).length;
  const bQuotes = (before.match(/`/g) || []).length;
  if (sQuotes % 2 === 1 || dQuotes % 2 === 1 || bQuotes % 2 === 1) return 'string';
  return null;
}

function applyRuleToContent(rule, content, filePath) {
  const findings = [];
  const lines = content.split('\n');
  const flags = (rule.flags || 'g').includes('g') ? rule.flags || 'g' : (rule.flags || 'g') + 'g';
  let regex;
  try { regex = new RegExp(rule.pattern, flags); }
  catch (e) { console.warn(`[Sentinel] Bad regex in rule ${rule.id}: ${e.message}`); return findings; }

  // Severity override from memory
  const effectiveSeverity = (memory.severityOverrides || {})[rule.id] || rule.severity || 'warn';

  // File scope filter (rule.scope = "panel" | "daemon" | "any")
  if (rule.scope) {
    const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
    if (rule.scope === 'panel' && !rel.startsWith('ac-panel/')) return findings;
    if (rule.scope === 'daemon' && !rel.startsWith('ac-daemon/')) return findings;
    if (rule.scope === 'website' && !rel.startsWith('ac-website-restored/')) return findings;
  }
  // File extension filter
  if (rule.ext && !rule.ext.includes(path.extname(filePath))) return findings;

  let match;
  while ((match = regex.exec(content)) !== null) {
    if (match.index === regex.lastIndex) regex.lastIndex++;
    const lineIdx = content.substring(0, match.index).split('\n').length - 1;
    const lineStart = content.lastIndexOf('\n', match.index - 1) + 1;
    const matchStartOnLine = match.index - lineStart;
    const line = lines[lineIdx] || '';
    const snippet = line.trim();

    // Skip if inside comment/string (unless rule.allowInComment)
    if (!rule.allowInComment) {
      const inCtx = isInsideCommentOrString(line, matchStartOnLine);
      if (inCtx) continue;
    }
    if (isFalsePositive(filePath, snippet)) continue;
    // ignore-next-line directive
    if (lineIdx > 0 && /sentinel-ignore-next/i.test(lines[lineIdx - 1])) continue;

    findings.push({
      file: path.relative(ROOT, filePath),
      line: lineIdx + 1,
      column: matchStartOnLine + 1,
      ruleId: rule.id,
      skill: rule.skill,
      skillRef: rule.skillRef,
      severity: effectiveSeverity,
      message: rule.message,
      remediation: rule.remediation || null,
      reference: rule.reference || rule.skillRef || null,
      snippet,
      match: match[0],
    });
  }
  return findings;
}

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const findings = [];
  for (const rule of allRules) findings.push(...applyRuleToContent(rule, content, filePath));
  return findings;
}

function zeroEmojiCheck(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const findings = [];
  const lines = content.split('\n');
  const emojiRegex = /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2600-\u26FF]|\uD83E[\uDD10-\uDDFF]/g;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let match;
    while ((match = emojiRegex.exec(line)) !== null) {
      if (match.index === emojiRegex.lastIndex) emojiRegex.lastIndex++;
      findings.push({
        file: path.relative(ROOT, filePath),
        line: i + 1,
        column: match.index + 1,
        ruleId: 'ZERO_EMOJI_POLICY',
        skill: 'communication-discipline',
        severity: 'error',
        message: `Tüzük İhlali (Madde 3.J): Dosyada emoji tespit edildi ("${match[0]}"). AI ajanları ve geliştiriciler %100 profesyonel ve sıfır emojili olmak zorundadır.`,
        remediation: `Emojiyi ("${match[0]}") derhal sil ve yerine [INFO], [SUCCESS], [CRITICAL] gibi metin bazlı etiketler kullan.`,
        reference: 'AGENTS.md → Madde 3.J (Sıfır Emoji Kuralı)',
        snippet: line.trim(),
        match: match[0],
      });
    }
  }
  return findings;
}

// --- 5) Cross-file checks ---------------------------------------------------

function changelogConsistency() {
  // Looks at CHANGELOG.md "removed/kaldırıldı" claims and verifies the named
  // identifier doesn't actually appear in the codebase.
  const clog = path.join(ROOT, 'CHANGELOG.md');
  if (!fs.existsSync(clog)) return [];
  const text = fs.readFileSync(clog, 'utf8');
  const findings = [];
  // Pattern: "Replaced all native `prompt()` calls" or "Removed prompt()" — extract the symbol.
  const claims = [
    { re: /[Rr]eplaced all native `?(prompt|alert|confirm)\(\)`?/g, kind: 'removal' },
    { re: /[Rr]emoved\s+`?(prompt|alert|confirm)\(`?/g, kind: 'removal' },
  ];
  for (const { re } of claims) {
    let m;
    while ((m = re.exec(text)) !== null) {
      const symbol = m[1];
      // Search ac-panel/src for `symbol(` to see if it still exists
      const hits = [];
      for (const f of walk(path.join(ROOT, 'ac-panel', 'src'))) {
        const c = fs.readFileSync(f, 'utf8');
        if (new RegExp(`\\b${symbol}\\s*\\(`).test(c)) hits.push(path.relative(ROOT, f));
      }
      if (hits.length > 0) {
        findings.push({
          file: 'CHANGELOG.md',
          line: text.substring(0, m.index).split('\n').length,
          column: 1,
          ruleId: 'CHANGELOG_INCONSISTENCY',
          skill: 'changelog-consistency',
          severity: 'error',
          message: `CHANGELOG claims "${symbol}()" was removed/replaced, but it still exists in ${hits.length} file(s).`,
          remediation: `Either remove all "${symbol}(" usages from ac-panel/src OR rewrite the CHANGELOG entry to match reality.`,
          reference: 'AGENTS.md → CHANGELOG ↔ Kod Tutarlılığı',
          snippet: m[0],
          match: symbol,
        });
      }
    }
  }
  return findings;
}

// --- 6) Scoring -------------------------------------------------------------

function computeScore(findings, filesAudited) {
  // Start at 100, subtract per finding weighted by severity.
  const weights = { error: 5, warn: 1, info: 0.25 };
  let penalty = 0;
  for (const f of findings) penalty += weights[f.severity] ?? 1;
  // Normalize lightly by file count so larger codebases aren't auto-failing.
  const scaled = filesAudited > 20 ? penalty * (20 / filesAudited) : penalty;
  return Math.max(0, Math.round(100 - scaled));
}

// --- 7) Reporters -----------------------------------------------------------

const C = {
  reset: '\x1b[0m', dim: '\x1b[2m', bold: '\x1b[1m',
  red: '\x1b[31m', yellow: '\x1b[33m', green: '\x1b[32m', cyan: '\x1b[36m', mag: '\x1b[35m',
};
function severityColor(s) { return s === 'error' ? C.red : s === 'warn' ? C.yellow : C.cyan; }

function printText(findings, score, filesAudited) {
  if (findings.length === 0) {
    console.log(`\n${C.green}✅ Compliance achieved. Score: ${score}/100 (${filesAudited} file(s) audited)${C.reset}\n`);
    return;
  }
  // Group by file
  const byFile = new Map();
  for (const f of findings) {
    if (!byFile.has(f.file)) byFile.set(f.file, []);
    byFile.get(f.file).push(f);
  }
  for (const [file, list] of byFile) {
    console.log(`\n${C.bold}${file}${C.reset}`);
    for (const f of list) {
      const col = severityColor(f.severity);
      console.log(`  ${col}${f.severity.toUpperCase().padEnd(5)}${C.reset} ${C.dim}${f.line}:${f.column}${C.reset}  ${f.ruleId}  ${C.dim}[${f.skill}]${C.reset}`);
      console.log(`    ${f.message}`);
      if (f.snippet) console.log(`    ${C.dim}${f.snippet.slice(0, 120)}${C.reset}`);
      if (f.remediation) console.log(`    ${C.cyan}→ ${f.remediation}${C.reset}`);
      if (f.reference) console.log(`    ${C.dim}ref: ${f.reference}${C.reset}`);
    }
  }
  const scoreColor = score >= 90 ? C.green : score >= 70 ? C.yellow : C.red;
  console.log(`\n${C.bold}Sentinel${C.reset} — ${findings.length} bulgu, ${filesAudited} dosya tarandı`);
  console.log(`Quality Score: ${scoreColor}${score}/100${C.reset}\n`);
}

function writeMarkdownReport(findings, score, filesAudited) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const file = path.join(REPORT_DIR, `audit-${ts}.md`);
  let md = `# Sentinel Audit Report\n\n`;
  md += `**Tarih:** ${new Date().toISOString()}\n`;
  md += `**Dosya:** ${filesAudited}, **Bulgu:** ${findings.length}, **Score:** ${score}/100\n\n`;
  if (findings.length === 0) { md += `_Compliance achieved._\n`; }
  else {
    const byFile = new Map();
    for (const f of findings) { if (!byFile.has(f.file)) byFile.set(f.file, []); byFile.get(f.file).push(f); }
    for (const [fname, list] of byFile) {
      md += `## ${fname}\n\n`;
      for (const f of list) {
        md += `- **${f.severity.toUpperCase()}** \`${f.ruleId}\` @ ${f.line}:${f.column} — ${f.message}\n`;
        if (f.snippet) md += `  - \`${f.snippet}\`\n`;
        if (f.remediation) md += `  - **Düzeltme:** ${f.remediation}\n`;
        if (f.reference) md += `  - **Ref:** ${f.reference}\n`;
      }
      md += `\n`;
    }
  }
  fs.writeFileSync(file, md);
  console.log(`${C.dim}Markdown rapor: ${path.relative(ROOT, file)}${C.reset}`);
}

// --- 8) TypeScript integration ---------------------------------------------

function runTsc() {
  const findings = [];
  const targets = [
    { cwd: path.join(ROOT, 'ac-panel'),  cmd: 'npx tsc --noEmit -p tsconfig.app.json', scope: 'panel' },
    { cwd: path.join(ROOT, 'ac-daemon'), cmd: 'npx tsc --noEmit',                       scope: 'daemon' },
  ];
  for (const t of targets) {
    if (!fs.existsSync(t.cwd)) continue;
    let out = '';
    try { execSync(t.cmd, { cwd: t.cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); }
    catch (e) { out = (e.stdout || '') + (e.stderr || ''); }
    const lines = out.split('\n').filter(l => /\.tsx?\(\d+,\d+\): error TS\d+/.test(l));
    for (const l of lines) {
      const m = l.match(/^(.+\.tsx?)\((\d+),(\d+)\): error (TS\d+): (.+)$/);
      if (!m) continue;
      // Skip noise: TS6133 (unused) is Gemini cleanup territory
      if (m[4] === 'TS6133') continue;
      findings.push({
        file: path.relative(ROOT, path.join(t.cwd, m[1])).replace(/\\/g, '/'),
        line: parseInt(m[2]),
        column: parseInt(m[3]),
        ruleId: m[4],
        skill: 'typescript',
        severity: 'error',
        message: m[5],
        remediation: 'Tip hatasını çöz, defensive coding uygula (typeof / Array.isArray).',
        reference: 'AGENTS.md → Defensive Frontend',
        snippet: '',
        match: m[4],
      });
    }
  }
  return findings;
}

// --- 9) CLI -----------------------------------------------------------------

function markFalsePositive(filePath, lineNumber) {
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  const snippet = (lines[lineNumber - 1] || '').trim();
  const normalized = path.relative(ROOT, filePath).replace(/\\/g, '/');
  memory.falsePositives = memory.falsePositives || [];
  memory.falsePositives.push({ file: normalized, snippet, addedAt: new Date().toISOString() });
  saveMemory(memory);
  console.log(`${C.cyan}🧠 Sentinel learned: false positive @ ${normalized}:${lineNumber}${C.reset}`);
}

function listSkills() {
  console.log(`\n${C.bold}Yüklü Skill'ler:${C.reset}\n`);
  for (const s of skills) {
    console.log(`  ${C.cyan}${s.id}${C.reset} — ${s.title}`);
    console.log(`    ${C.dim}${s.description || ''}${C.reset}`);
    console.log(`    ${C.dim}rules: ${s.rules.length}, ref: ${s.reference || '—'}${C.reset}`);
  }
  console.log(`\n  ${C.dim}+ ${learnedRules.length} learned rule(s) from memory${C.reset}\n`);
}

const args = process.argv.slice(2);

if (args.includes('--list-skills')) { listSkills(); process.exit(0); }

if (args.includes('--persona')) {
  const personaPath = path.join(SENTINEL_DIR, 'persona.md');
  if (!fs.existsSync(personaPath)) { console.error('sentinel persona.md not found'); process.exit(1); }
  process.stdout.write(fs.readFileSync(personaPath, 'utf8'));
  process.exit(0);
}

if (args.includes('--architect-persona')) {
  const personaPath = path.join(ARCHITECT_DIR, 'persona.md');
  if (!fs.existsSync(personaPath)) { console.error('architect persona.md not found'); process.exit(1); }
  process.stdout.write(fs.readFileSync(personaPath, 'utf8'));
  process.exit(0);
}

if (args.includes('--charter')) {
  const p = path.join(SHARED_DIR, 'team-charter.md');
  if (!fs.existsSync(p)) { console.error('team-charter.md not found'); process.exit(1); }
  process.stdout.write(fs.readFileSync(p, 'utf8'));
  process.exit(0);
}

// Compute SHA-256 hash of a plan YAML (stdin or --plan-hash <file>)
if (args.includes('--plan-hash')) {
  const idx = args.indexOf('--plan-hash');
  const file = args[idx + 1];
  let yaml;
  if (file && !file.startsWith('--') && fs.existsSync(file)) {
    yaml = fs.readFileSync(file, 'utf8');
  } else {
    // stdin
    yaml = fs.readFileSync(0, 'utf8');
  }
  process.stdout.write(computePlanHash(yaml) + '\n');
  process.exit(0);
}

// Generate empty plan template for a given playbook
if (args.includes('--new-plan')) {
  const idx = args.indexOf('--new-plan');
  const playbookName = args[idx + 1];
  if (!playbookName) {
    const list = fs.readdirSync(path.join(ARCHITECT_DIR, 'playbooks')).filter(f => f.endsWith('.md'));
    console.log('Usage: --new-plan <playbook_name>\nAvailable:\n' + list.map(f => '  ' + f.replace(/\.md$/, '')).join('\n'));
    process.exit(0);
  }
  const playbookPath = path.join(ARCHITECT_DIR, 'playbooks', playbookName.endsWith('.md') ? playbookName : playbookName + '.md');
  const exists = fs.existsSync(playbookPath);
  const template = `# Plan submission for: ${playbookName}
# Playbook reference: ${exists ? playbookPath : '(playbook not found — generic template)'}
# Submit to Architect-01 in an independent session for audit.

title: <eylem-fiilli kısa başlık>

scope:
  project: ac-panel | ac-daemon | ac-website-restored | infrastructure
  module: <dosya / klasör / domain>
  out_of_scope:
    - <bu plan tarafından dokunulMAYACAK alanlar>

intent:
  what: <bir cümle: ne yapılacak>
  why: <bir cümle: niye gerekli + ref>
  triggered_by: user_request | sentinel_finding | regression | scheduled

steps:
  - order: 0
    action: pre_flight_snapshot
    description: |
      For each target file: Copy-Item <file> <file>.bak
      Record mtime baseline for concurrent change detection.
    risk: low

  - order: 1
    action: <eylem fiili>
    files: [<dokunulacak dosyalar>]
    risk: low | medium | high

dependencies:
  - <ön-koşul: route exists, package installed, env defined>

side_effects:
  - <bu değişiklik başka neye dokunabilir>

rollback:
  trigger: "tsc exit code != 0 after any per-file edit, or mtime mismatch"
  steps:
    - "Copy-Item <failed_file>.bak <failed_file> -Force"
    - "Halt sweep, sonraki dosyaya geçme"
  cleanup_on_success:
    - "Tüm .bak dosyalarını sil"
  cleanup_on_failure:
    - ".bak'ları sakla (recovery artifact)"

success_criteria:
  - <ölçülebilir: "tsc 0 hata", "sentinel score >= 90", "baseline N → N-X">

stop_conditions:
  - "tsc exit code != 0 after step N"
  - "target file modified by another agent (mtime check)"
  - <plana özgü stop koşulları>

estimated_effort: <dakika>
risk_overall: low | medium | high | critical
`;
  process.stdout.write(template);
  process.exit(0);
}

// Aggregate stats from memory + learning log
if (args.includes('--telemetry')) {
  const m = JSON.parse(fs.readFileSync(MEMORY_PATH, 'utf8'));
  const learningLog = path.join(SHARED_DIR, 'learning-log.md');
  const learningContent = fs.existsSync(learningLog) ? fs.readFileSync(learningLog, 'utf8') : '';
  const entries = (learningContent.match(/^## \d{4}-\d{2}-\d{2}/gm) || []).length;
  const patterns = (learningContent.match(/\(×\d+\)/g) || []).length;
  console.log('--- Sentinel Telemetry ---');
  console.log(`Total audits:           ${m.stats?.totalAudits ?? 0}`);
  console.log(`Total violations:       ${m.stats?.totalViolations ?? 0}`);
  console.log(`Last score:             ${m.stats?.lastScore ?? 'n/a'}`);
  console.log(`False positives learned:${m.falsePositives?.length ?? 0}`);
  console.log(`Learned rules:          ${m.learnedRules?.length ?? 0}`);
  console.log(`Severity overrides:     ${Object.keys(m.severityOverrides || {}).length}`);
  console.log(`Skills loaded:          ${skills.length}`);
  console.log('');
  console.log('--- Learning Log ---');
  console.log(`Entries:                ${entries}`);
  console.log(`Pattern tags seen:      ${patterns}`);
  process.exit(0);
}

if (args.includes('--playbook')) {
  const idx = args.indexOf('--playbook');
  const name = args[idx + 1];
  if (!name) {
    const list = fs.readdirSync(path.join(ARCHITECT_DIR, 'playbooks')).filter(f => f.endsWith('.md'));
    console.log('Available playbooks:\n' + list.map(f => '  ' + f.replace(/\.md$/, '')).join('\n'));
    process.exit(0);
  }
  const p = path.join(ARCHITECT_DIR, 'playbooks', name.endsWith('.md') ? name : name + '.md');
  if (!fs.existsSync(p)) { console.error(`playbook not found: ${name}`); process.exit(1); }
  process.stdout.write(fs.readFileSync(p, 'utf8'));
  process.exit(0);
}

// --- R14 Claim Verification: audit a completion report's [CLAIM]/[EVIDENCE] structure ---
if (args.includes('--audit-report')) {
  const idx = args.indexOf('--audit-report');
  const file = args[idx + 1];
  if (!file || file.startsWith('--')) {
    console.log('Usage: audit-sentinel --audit-report <report-file>');
    console.log('Validates that every [CLAIM] line is followed by [EVIDENCE] with measurable proof.');
    process.exit(1);
  }
  if (!fs.existsSync(file)) { console.error(`report not found: ${file}`); process.exit(1); }
  const raw = fs.readFileSync(file, 'utf8');
  const lines = raw.split(/\r?\n/);
  const issues = [];
  let claimCount = 0;
  let evidenceCount = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/\[CLAIM\]/i.test(line)) {
      claimCount++;
      // Search next 10 lines for [EVIDENCE]
      let hasEvidence = false;
      let evidenceBody = '';
      for (let j = i + 1; j < Math.min(i + 12, lines.length); j++) {
        if (/\[CLAIM\]/i.test(lines[j])) break;
        if (/\[EVIDENCE\]/i.test(lines[j])) {
          hasEvidence = true;
          // Collect evidence block (next ~8 lines or until next CLAIM)
          for (let k = j; k < Math.min(j + 10, lines.length); k++) {
            if (k > j && /\[CLAIM\]/i.test(lines[k])) break;
            evidenceBody += lines[k] + '\n';
          }
          break;
        }
      }
      if (!hasEvidence) {
        issues.push({ line: i + 1, claim: line.trim().slice(0, 100), reason: 'no [EVIDENCE] within 10 lines' });
      } else {
        evidenceCount++;
        // Evidence quality heuristics: must contain at least ONE of
        //   - code fence ``` with content
        //   - arrow "→" followed by digits or "0"/"N hits"/"match"
        //   - file path + line number
        //   - count/number ("count: 0", "= 0", etc.)
        const hasCodeFence = /```[\s\S]*?```/.test(evidenceBody);
        const hasMeasurable = /→\s*\S+|=\s*\d+|count\s*[:=]\s*\d+|\d+\s+(hit|match|mention|finding|occurrence)/i.test(evidenceBody);
        const hasPath = /[a-zA-Z_\-./]+:\d+/.test(evidenceBody);
        if (!hasCodeFence && !hasMeasurable && !hasPath) {
          issues.push({
            line: i + 1,
            claim: line.trim().slice(0, 100),
            reason: '[EVIDENCE] is verbal-only (no code fence / measurable / path:line)',
          });
        }
      }
    }
  }
  console.log(`--- R14 Report Audit: ${file} ---`);
  console.log(`Claims found:     ${claimCount}`);
  console.log(`Evidence blocks:  ${evidenceCount}`);
  console.log(`Issues:           ${issues.length}`);
  if (issues.length > 0) {
    console.log('');
    for (const x of issues) {
      console.log(`L${x.line}: ${x.reason}`);
      console.log(`        ${x.claim}`);
    }
    console.log('');
    console.log('VERDICT: REJECTED — report violates R14 Claim Verification Protocol.');
    process.exit(2);
  }
  if (claimCount === 0) {
    console.log('');
    console.log('VERDICT: REJECTED — report contains zero [CLAIM] markers (R14 requires structured claims).');
    process.exit(2);
  }
  console.log('');
  console.log('VERDICT: PASS — all claims have measurable evidence blocks.');
  process.exit(0);
}

const learnIdx = args.indexOf('--learn-fp');
if (learnIdx >= 0) {
  const file = args.find(a => !a.startsWith('--'));
  const line = parseInt(args[learnIdx + 1]);
  if (!file || !line) { console.log('Usage: --learn-fp <line> <file>'); process.exit(1); }
  markFalsePositive(file, line);
  process.exit(0);
}

const wantTsc = args.includes('--tsc');
const wantMd = args.some(a => a === '--report=md' || a === '--md');
let targets = [];

if (args.includes('--diff')) {
  targets = gitChangedFiles();
} else if (args.includes('--all')) {
  targets = [
    ...walk(path.join(ROOT, 'ac-panel', 'src')),
    ...walk(path.join(ROOT, 'ac-daemon', 'src')),
  ];
} else {
  const positional = args.find(a => !a.startsWith('--'));
  if (!positional) {
    console.log('Usage:');
    console.log('  audit-sentinel <file|glob>');
    console.log('  audit-sentinel --diff');
    console.log('  audit-sentinel --all [--tsc] [--report=md]');
    console.log('  audit-sentinel --list-skills');
    console.log('  audit-sentinel --audit-report <report-file>   # R14: validate [CLAIM]/[EVIDENCE] structure');
    console.log('  audit-sentinel <file> --learn-fp <line>');
    process.exit(1);
  }
  targets = expandGlob(positional);
}

if (targets.length === 0) {
  console.log(`${C.yellow}No files matched.${C.reset}`);
  process.exit(0);
}

console.log(`${C.bold}🛡  Sentinel${C.reset} scanning ${targets.length} file(s)...`);
const findings = [];
for (const f of targets) findings.push(...auditFile(f), ...zeroEmojiCheck(f));
findings.push(...changelogConsistency());
if (wantTsc) findings.push(...runTsc());

const score = computeScore(findings, targets.length);
memory.stats.totalAudits++;
memory.stats.totalViolations += findings.length;
memory.stats.lastScore = score;
saveMemory(memory);

printText(findings, score, targets.length);
if (wantMd) writeMarkdownReport(findings, score, targets.length);

process.exit(findings.some(f => f.severity === 'error') ? 1 : 0);
