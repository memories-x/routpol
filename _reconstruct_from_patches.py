import json
import os

path = r"C:\Users\memories\.cursor\projects\c-Users-memories-Desktop-pol-turk\agent-transcripts\414c2c43-5e20-4184-8fd6-90c92adf5f3d\414c2c43-5e20-4184-8fd6-90c92adf5f3d.jsonl"
repo = r"C:\Users\memories\Desktop\pol-turk"
out_dir = os.path.join(repo, "_transcript_extract")
os.makedirs(out_dir, exist_ok=True)

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


writes: dict[str, list] = {name: [] for _, name in SUFFIXES}
patches: dict[str, list] = {name: [] for _, name in SUFFIXES}

with open(path, "r", encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        if i >= 1210:
            break
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
                writes[fn].append((i, inp["contents"]))
            elif tname == "StrReplace":
                old = inp.get("old_string")
                new = inp.get("new_string")
                if old is not None and new is not None:
                    patches[fn].append((i, old, new))


def reconstruct(name: str) -> tuple[str | None, str]:
    """Return (content, method)."""
    w = writes[name]
    p = patches[name]

    if w:
        content = w[-1][1]
        last_write = w[-1][0]
        for line_num, old, new in p:
            if line_num > last_write:
                if old in content:
                    content = content.replace(old, new, 1)
        return content, f"Write@{w[-1][0]}+{sum(1 for x in p if x[0]>last_write)} patches"

    # Forward apply all patches from current disk file (reverse undo post-0.8)
    disk_path = os.path.join(repo, SUFFIX_TO_PATH[name])
    if os.path.exists(disk_path):
        with open(disk_path, "r", encoding="utf-8") as f:
            content = f.read()
        # Reverse patches from line 1209 down to 1
        applied = 0
        missed = 0
        for line_num, old, new in reversed(p):
            if new in content:
                content = content.replace(new, old, 1)
                applied += 1
            else:
                missed += 1
        if applied > 0:
            return content, f"reverse-{applied} patches from disk (missed {missed})"

    # Forward apply patches from first old_string as seed (partial)
    if p:
        content = p[0][1]  # first old_string as approximate seed - wrong approach
        return None, f"no base; {len(p)} patches only"

    return None, "no data"


print("=== RECONSTRUCTION ===")
for _, name in SUFFIXES:
    content, method = reconstruct(name)
    if content:
        out_path = os.path.join(out_dir, name)
        with open(out_path, "w", encoding="utf-8", newline="\n") as out:
            out.write(content)
        print(f"{name}: {len(content.splitlines())} lines via {method}")
    else:
        print(f"{name}: FAILED ({method})")

# List all patches for files without write
print("\n=== PATCH-ONLY FILES ===")
for _, name in SUFFIXES:
    if not writes[name] and patches[name]:
        print(f"\n{name} ({len(patches[name])} patches):")
        for line_num, old, new in patches[name]:
            print(f"  L{line_num}: {old[:60]!r} -> {new[:60]!r}")
