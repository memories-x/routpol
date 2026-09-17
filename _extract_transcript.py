import json
import os

path = r"C:\Users\memories\.cursor\projects\c-Users-memories-Desktop-pol-turk\agent-transcripts\414c2c43-5e20-4184-8fd6-90c92adf5f3d\414c2c43-5e20-4184-8fd6-90c92adf5f3d.jsonl"
out_dir = r"C:\Users\memories\Desktop\pol-turk\_transcript_extract"
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

def match_file(p: str) -> str | None:
    p_norm = p.replace("\\", "/")
    for suffix, name in sorted(SUFFIXES, key=lambda x: -len(x[0])):
        if suffix == "app/layout.tsx" and "[locale]" in p_norm:
            continue
        if p_norm.endswith(suffix) or suffix in p_norm:
            return name
    return None

writes = {name: [] for _, name in SUFFIXES}
strreplaces = {name: [] for _, name in SUFFIXES}

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
                    strreplaces[fn].append((i, old, new))

print("=== WRITE SUMMARY (before line 1210) ===")
for _, name in SUFFIXES:
    w = writes[name]
    print(
        f"{name}: {len(w)} writes at {[x[0] for x in w]}, "
        f"{len(strreplaces[name])} strreplaces"
    )

print("\n=== EXTRACTING ===")
for _, name in SUFFIXES:
    w = writes[name]
    if not w:
        print(f"{name}: NO WRITE")
        continue
    content = w[-1][1]
    last_write_line = w[-1][0]
    applied = 0
    missed = 0
    for line_num, old, new in strreplaces[name]:
        if line_num > last_write_line:
            if old in content:
                content = content.replace(old, new, 1)
                applied += 1
            else:
                missed += 1
    out_path = os.path.join(out_dir, name)
    with open(out_path, "w", encoding="utf-8", newline="\n") as out:
        out.write(content)
    print(
        f"{name}: saved {len(content.splitlines())} lines "
        f"(write@{last_write_line}, +{applied} patches, {missed} missed)"
    )
