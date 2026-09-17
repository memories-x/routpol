import json
import os

path = r"C:\Users\memories\.cursor\projects\c-Users-memories-Desktop-pol-turk\agent-transcripts\414c2c43-5e20-4184-8fd6-90c92adf5f3d\414c2c43-5e20-4184-8fd6-90c92adf5f3d.jsonl"
repo = r"C:\Users\memories\Desktop\pol-turk"
out_dir = os.path.join(repo, "_transcript_extract")
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

SUFFIX_TO_PATH = {name: f"src/{s.split('/',1)[1] if s.startswith('components') or s.startswith('app') else s}" for s, name in SUFFIXES}
# fix paths
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


def collect_ops(cutoff_max=None):
    ops = []
    with open(path, "r", encoding="utf-8") as f:
        for i, line in enumerate(f, 1):
            if cutoff_max and i > cutoff_max:
                break
            try:
                obj = json.loads(line)
            except json.JSONDecodeError:
                continue
            for item in obj.get("message", {}).get("content", []):
                if item.get("type") != "tool_use":
                    continue
                inp = item.get("input", {})
                fn = match_file(inp.get("path", ""))
                if not fn:
                    continue
                if item.get("name") == "Write" and "contents" in inp:
                    ops.append((i, fn, "write", inp["contents"]))
                elif item.get("name") == "StrReplace":
                    old = inp.get("old_string")
                    new = inp.get("new_string")
                    if old is not None and new is not None:
                        ops.append((i, fn, "patch", old, new))
    return ops


def apply_forward(content, ops, fn, max_line):
    patches = [(i, o, n) for i, f, t, *rest in ops if f == fn and t == "patch" and i < max_line for o, n in [rest]]
    patches.sort(key=lambda x: x[0])
    for i, old, new in patches:
        if content is None:
            # use old as seed if large enough
            if len(old) > 500:
                content = old
        if content and old in content:
            content = content.replace(old, new, 1)
        else:
            print(f"  WARN {fn} L{i}: patch miss (old len={len(old)})")
    return content


def build_070(fn):
    all_ops = collect_ops()
    writes_before = [(i, c) for i, f, t, c, *_ in all_ops if f == fn and t == "write" and i < CUTOFF]

    if writes_before:
        content = writes_before[-1][1]
        content = apply_forward(content, all_ops, fn, CUTOFF)
        # apply patches after last write before cutoff
        last_w = writes_before[-1][0]
        for i, f, t, *rest in all_ops:
            if f == fn and t == "patch" and last_w < i < CUTOFF:
                old, new = rest
                if old in content:
                    content = content.replace(old, new, 1)
        return content, f"Write@{writes_before[-1][0]}+patches"

    # No write: forward from largest old_string in patches before cutoff
    patches = [(i, o, n) for i, f, t, *rest in all_ops if f == fn and t == "patch" and i < CUTOFF for o, n in [rest]]
    if not patches:
        return None, "no ops"

    # find largest old_string as seed candidate
    largest = max(patches, key=lambda x: len(x[1]))
    content = largest[1]
    # apply all patches in order from beginning (may double-apply; use sequential)
    content = None
    for i, old, new in sorted(patches, key=lambda x: x[0]):
        if content is None:
            if len(old) > 200:
                content = old
                content = content.replace(old, new, 1)
            continue
        if old in content:
            content = content.replace(old, new, 1)
        else:
            print(f"  WARN {fn} L{i}: skip (old len={len(old)})")

    if content:
        return content, f"patch-chain from L{patches[0][0]}-L{patches[-1][0]}"

    # fallback: disk reverse patches >= cutoff only
    fp = os.path.join(repo, SUFFIX_TO_PATH[fn])
    if os.path.exists(fp):
        content = open(fp, encoding="utf-8").read()
        post = [(i, o, n) for i, f, t, *rest in all_ops if f == fn and t == "patch" and i >= CUTOFF for o, n in [rest]]
        for i, old, new in sorted(post, key=lambda x: -x[0]):
            if new in content:
                content = content.replace(new, old, 1)
        # reverse writes >= cutoff: restore forward-built if we had partial
        return content, "disk-reverse-patches-only"

    return None, "failed"


os.makedirs(out_dir, exist_ok=True)
print("=== BUILD 0.7.0 STATE ===")
for _, name in SUFFIXES:
    content, method = build_070(name)
    if content:
        fp = os.path.join(out_dir, name)
        with open(fp, "w", encoding="utf-8", newline="\n") as f:
            f.write(content)
        print(f"{name}: {len(content.splitlines())} lines via {method}")
    else:
        print(f"{name}: FAILED ({method})")

# Also save direct Write extracts before cutoff
print("\n=== DIRECT WRITES (Header/Footer/WhyUs/SocialProof/locale_layout) ===")
for _, name in ["Header.tsx", "Footer.tsx", "WhyUs.tsx", "SocialProof.tsx", "locale_layout.tsx", "layout_root.tsx"]:
    content, method = build_070(name)
    if content:
        print(f"{name}: OK ({method})")

# Extract 0.8.0 globals write for reference
for i, f, t, c in collect_ops(1220):
    if f == "globals.css" and t == "write" and i == 1214:
        with open(os.path.join(out_dir, "globals.css.080"), "w", encoding="utf-8") as out:
            out.write(c)

# package.json at 0.7.0 - read strreplace at 1260
print("\n=== package.json 0.8.0 change ===")
with open(path, encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        if i == 1260:
            obj = json.loads(line)
            for item in obj["message"]["content"]:
                if item.get("name") == "StrReplace" and "package.json" in item["input"].get("path", ""):
                    print("OLD version snippet:", item["input"]["old_string"][:200])
                    print("NEW version snippet:", item["input"]["new_string"][:200])
