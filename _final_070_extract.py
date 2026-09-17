import json
import os
import re

TRANSCRIPT = r"C:\Users\memories\.cursor\projects\c-Users-memories-Desktop-pol-turk\agent-transcripts\414c2c43-5e20-4184-8fd6-90c92adf5f3d\414c2c43-5e20-4184-8fd6-90c92adf5f3d.jsonl"
REPO = r"C:\Users\memories\Desktop\pol-turk"
OUT = os.path.join(REPO, "_transcript_extract")
CUTOFF = 1210

FILES = {
    "Hero.tsx": r"components/sections/Hero\.tsx",
    "Header.tsx": r"components/layout/Header\.tsx",
    "Footer.tsx": r"components/layout/Footer\.tsx",
    "globals.css": r"app/globals\.css",
    "layout_root.tsx": r"app/layout\.tsx",
    "page.tsx": r"app/\[locale\]/page\.tsx",
    "Services.tsx": r"components/sections/Services\.tsx",
    "Process.tsx": r"components/sections/Process\.tsx",
    "Scope.tsx": r"components/sections/Scope\.tsx",
    "WhyUs.tsx": r"components/sections/WhyUs\.tsx",
    "Faq.tsx": r"components/sections/Faq\.tsx",
    "Contact.tsx": r"components/sections/Contact\.tsx",
    "SocialProof.tsx": r"components/sections/SocialProof\.tsx",
    "locale_layout.tsx": r"app/\[locale\]/layout\.tsx",
}

DISK = {
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


def match_name(path: str) -> str | None:
    p = path.replace("\\", "/")
    if "[locale]/layout" in p:
        return "locale_layout.tsx"
    if p.endswith("app/layout.tsx"):
        return "layout_root.tsx"
    for name, pat in FILES.items():
        if name in ("layout_root.tsx", "locale_layout.tsx"):
            continue
        if re.search(pat, p):
            return name
    return None


def load_ops(max_line=None):
    ops = []
    with open(TRANSCRIPT, encoding="utf-8") as f:
        for i, line in enumerate(f, 1):
            if max_line and i > max_line:
                break
            obj = json.loads(line)
            for item in obj.get("message", {}).get("content", []):
                if item.get("type") != "tool_use":
                    continue
                name = match_name(item.get("input", {}).get("path", ""))
                if not name:
                    continue
                if item["name"] == "Write":
                    ops.append({"line": i, "file": name, "kind": "write", "contents": item["input"]["contents"]})
                elif item["name"] == "StrReplace":
                    inp = item["input"]
                    if "old_string" in inp and "new_string" in inp:
                        ops.append({"line": i, "file": name, "kind": "patch", "old": inp["old_string"], "new": inp["new_string"]})
    return ops


def last_write_before(ops, fn, line=CUTOFF):
    ws = [o for o in ops if o["file"] == fn and o["kind"] == "write" and o["line"] < line]
    return ws[-1] if ws else None


def apply_patches(content, ops, fn, start_line, end_line):
    ps = [o for o in ops if o["file"] == fn and o["kind"] == "patch" and start_line < o["line"] < end_line]
    ps.sort(key=lambda o: o["line"])
    for o in ps:
        if o["old"] in content:
            content = content.replace(o["old"], o["new"], 1)
        else:
            print(f"  miss {fn} L{o['line']} old_len={len(o['old'])}")
    return content


def reverse_post_cutoff(content, ops, fn):
    post = [o for o in ops if o["file"] == fn and o["line"] >= CUTOFF]
    post.sort(key=lambda o: -o["line"])
    for o in post:
        if o["kind"] == "patch":
            if o["new"] in content:
                content = content.replace(o["new"], o["old"], 1)
        elif o["kind"] == "write":
            prev = last_write_before(ops, fn, o["line"])
            if prev:
                content = prev["contents"]
                content = apply_patches(content, ops, fn, prev["line"], o["line"])
            else:
                print(f"  cannot reverse write {fn} L{o['line']} (no prior write)")
    return content


def build_file(fn, ops):
    w = last_write_before(ops, fn)
    if w:
        content = w["contents"]
        content = apply_patches(content, ops, fn, w["line"], CUTOFF)
        return content, f"Write@{w['line']}"

    # patch-only: forward chain using largest old at first applicable patch
    pre = [o for o in ops if o["file"] == fn and o["kind"] == "patch" and o["line"] < CUTOFF]
    pre.sort(key=lambda o: o["line"])
    content = None
    for o in pre:
        if content is None:
            if len(o["old"]) < 200:
                continue
            content = o["old"]
        if o["old"] in content:
            content = content.replace(o["old"], o["new"], 1)
        else:
            print(f"  chain miss {fn} L{o['line']}")
    if content:
        return content, f"patch-chain L{pre[0]['line']}-L{pre[-1]['line']}"

    # disk fallback
    p = os.path.join(REPO, DISK[fn])
    if os.path.exists(p):
        content = open(p, encoding="utf-8").read()
        content = reverse_post_cutoff(content, ops, fn)
        return content, "disk-reverse"
    return None, "failed"


os.makedirs(OUT, exist_ok=True)
all_ops = load_ops()

print("=== FINAL 0.7.0 EXTRACTION ===")
results = {}
for fn in FILES:
    content, method = build_file(fn, all_ops)
    if content:
        results[fn] = content
        open(os.path.join(OUT, fn), "w", encoding="utf-8", newline="\n").write(content)
        print(f"{fn}: {len(content.splitlines())} lines ({method})")
    else:
        print(f"{fn}: FAILED")

# package.json 0.7.0 deps - extract strreplace at 1260
for o in load_ops(1270):
    if o.get("file") or "package.json" in str(o):
        pass
with open(TRANSCRIPT, encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        if i != 1214 and i != 1260:
            continue
        obj = json.loads(line)
        for item in obj["message"]["content"]:
            inp = item.get("input", {})
            if "package.json" not in inp.get("path", ""):
                continue
            if item["name"] == "StrReplace":
                print("\npackage.json StrReplace L" + str(i))
                print("OLD:", inp["old_string"][:500])
                print("NEW:", inp["new_string"][:500])

# Save metadata
meta = []
for fn, c in results.items():
    meta.append(f"{fn}: {len(c.splitlines())} lines")
open(os.path.join(OUT, "_meta.txt"), "w").write("\n".join(meta))
