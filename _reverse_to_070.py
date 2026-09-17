import json
import os

path = r"C:\Users\memories\.cursor\projects\c-Users-memories-Desktop-pol-turk\agent-transcripts\414c2c43-5e20-4184-8fd6-90c92adf5f3d\414c2c43-5e20-4184-8fd6-90c92adf5f3d.jsonl"
repo = r"C:\Users\memories\Desktop\pol-turk"
out_dir = os.path.join(repo, "_transcript_extract")
os.makedirs(out_dir, exist_ok=True)
CUTOFF = 1210

SUFFIXES = [
    ("components/sections/Hero.tsx", "Hero.tsx"),
    ("components/layout/Header.tsx", "Header.tsx"),
    ("components/layout/Footer.tsx", "Footer.tsx"),
    ("app/globals.css", "globals.css"),
    ("app/layout.tsx", "layout_root.tsx"),
    ("app/[locale]/page.tsx", "page.tsx"),
    ("components/sections/Services.tsx", "Services.tsx"),
    ("components/sections/Process.tsx", "Process.tsx"),
    ("components/sections/Scope.tsx", "Scope.tsx"),
    ("components/sections/WhyUs.tsx", "WhyUs.tsx"),
    ("components/sections/Faq.tsx", "Faq.tsx"),
    ("components/sections/Contact.tsx", "Contact.tsx"),
    ("components/sections/SocialProof.tsx", "SocialProof.tsx"),
    ("app/[locale]/layout.tsx", "locale_layout.tsx"),
]

SUFFIX_TO_PATH = {
    "Hero.tsx": "src/components/sections/Hero.tsx",
    "Header.tsx": "src/components/layout/Header.tsx",
    "Footer.tsx": "src/components/layout/Footer.tsx",
    "globals.css": "src/app/globals.css",
    "layout_root.tsx": "src/app/layout.tsx",
    "page.tsx": "src/app/[locale]/page.tsx",
    "Services.tsx": "src/components/sections/Services.tsx",
    "Process.tsx": "src/components/sections/Process.tsx",
    "Scope.tsx": "src/components/sections/Scope.tsx",
    "WhyUs.tsx": "src/components/sections/WhyUs.tsx",
    "Faq.tsx": "src/components/sections/Faq.tsx",
    "Contact.tsx": "src/components/sections/Contact.tsx",
    "SocialProof.tsx": "src/components/sections/SocialProof.tsx",
    "locale_layout.tsx": "src/app/[locale]/layout.tsx",
}


def match_file(p: str) -> str | None:
    p_norm = p.replace("\\", "/")
    for suffix, name in sorted(SUFFIXES, key=lambda x: -len(x[0])):
        if suffix == "app/layout.tsx" and "[locale]" in p_norm:
            continue
        if p_norm.endswith(suffix) or suffix in p_norm:
            return name
    return None


# Collect all ops
all_ops = []  # (line, fn, type, data)
writes_before = {name: [] for _, name in SUFFIXES}

with open(path, "r", encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        try:
            obj = json.loads(line)
        except json.JSONDecodeError:
            continue
        content = obj.get("message", {}).get("content", [])
        if not isinstance(content, list):
            continue
        for item in content:
            if not isinstance(item, dict) or item.get("type") != "tool_use":
                continue
            tname = item.get("name")
            inp = item.get("input", {})
            p = inp.get("path", "")
            fn = match_file(p)
            if not fn:
                continue
            if tname == "Write" and "contents" in inp:
                op = ("write", inp["contents"])
                all_ops.append((i, fn, op))
                if i < CUTOFF:
                    writes_before[fn].append((i, inp["contents"]))
            elif tname == "StrReplace":
                old = inp.get("old_string")
                new = inp.get("new_string")
                if old is not None and new is not None:
                    all_ops.append((i, fn, ("patch", old, new)))

# Sort by line descending for reverse apply (only ops AFTER cutoff)
ops_after = sorted(
    [(i, fn, op) for i, fn, op in all_ops if i >= CUTOFF],
    key=lambda x: -x[0],
)

# Load disk
state = {}
for name, rel in SUFFIX_TO_PATH.items():
    fp = os.path.join(repo, rel)
    if os.path.exists(fp):
        with open(fp, "r", encoding="utf-8") as f:
            state[name] = f.read()

# Track write reversions - when reversing a Write, restore last known content before that line
def content_before_line(fn: str, line: int) -> str | None:
    candidates = [(l, c) for l, c in writes_before[fn] if l < line]
    if candidates:
        return candidates[-1][1]
    # also check writes between cutoff and line from all_ops
    candidates2 = [
        (l, op[1])
        for l, f, op in all_ops
        if f == fn and op[0] == "write" and l < line
    ]
    if candidates2:
        return candidates2[-1][1]
    return None


print("=== REVERSE FROM DISK (undo ops >= line 1210) ===")
reversed_log = {name: [] for name in SUFFIX_TO_PATH}

for i, fn, op in ops_after:
    if fn not in state:
        continue
    if op[0] == "patch":
        _, old, new = op
        if new in state[fn]:
            state[fn] = state[fn].replace(new, old, 1)
            reversed_log[fn].append(f"L{i} patch OK")
        else:
            reversed_log[fn].append(f"L{i} patch MISS")
    elif op[0] == "write":
        prev = content_before_line(fn, i)
        if prev is not None:
            state[fn] = prev
            reversed_log[fn].append(f"L{i} write -> restored pre-write")
        else:
            reversed_log[fn].append(f"L{i} write -> NO PRE-WRITE BACKUP")

# For files still missing or patch-only: forward apply patches before cutoff on top of write base
for _, name in SUFFIXES:
    w = writes_before[name]
    if name not in state and w:
        content = w[-1][1]
        last_write = w[-1][0]
        for i, fn, op in all_ops:
            if fn != name or i >= CUTOFF or op[0] != "patch":
                continue
            if i > last_write:
                _, old, new = op
                if old in content:
                    content = content.replace(old, new, 1)
        state[name] = content

# Save
for name, content in state.items():
    out_path = os.path.join(out_dir, name)
    with open(out_path, "w", encoding="utf-8", newline="\n") as out:
        out.write(content)
    rev = reversed_log.get(name, [])
    print(f"{name}: {len(content.splitlines())} lines, reversed {len(rev)} ops")
    for r in rev[:5]:
        print(f"  {r}")
    if len(rev) > 5:
        print(f"  ... +{len(rev)-5} more")

# package.json changes at 0.8.0
print("\n=== PACKAGE.JSON 0.8.0 WRITE SEARCH ===")
with open(path, "r", encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        if i < 1210 or i > 1220:
            continue
        if "package.json" in line and "Write" in line:
            print(f"Found Write package.json at line {i}")

# Extract line 1268 new files list
print("\n=== NEW 0.8.0 FILES (from assistant summary line ~1268) ===")
new_files = [
    "src/lib/cn.ts",
    "src/components/ui/Button.tsx",
    "src/components/ui/Card.tsx",
    "src/components/ui/Section.tsx",
    "src/components/ui/Badge.tsx",
    "src/components/ui/Prose.tsx",
    "src/components/ui/Stat.tsx",
    "src/components/sections/DocumentTransform.tsx",
    "src/components/sections/WhatWeDo.tsx",
    "src/components/sections/ProductFlowPreview.tsx",
    "src/lib/ui-classes.ts",
]
for nf in new_files:
    print(f"  {nf}")
