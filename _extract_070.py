import json

path = r"C:\Users\memories\.cursor\projects\c-Users-memories-Desktop-pol-turk\agent-transcripts\414c2c43-5e20-4184-8fd6-90c92adf5f3d\414c2c43-5e20-4184-8fd6-90c92adf5f3d.jsonl"
out = r"C:\Users\memories\Desktop\pol-turk\_transcript_extract"

def match_hero(p):
    return "sections/Hero.tsx" in p.replace("\\", "/")

def match_file(p, suffix):
    return suffix in p.replace("\\", "/")

targets = {
    "Hero.tsx": "sections/Hero.tsx",
    "globals.css": "app/globals.css",
    "Services.tsx": "sections/Services.tsx",
    "Process.tsx": "sections/Process.tsx",
    "Scope.tsx": "sections/Scope.tsx",
    "Faq.tsx": "sections/Faq.tsx",
    "Contact.tsx": "sections/Contact.tsx",
    "page.tsx": "[locale]/page.tsx",
}

# Extract Write at line 1217 for key files (first 0.8.0 write - NOT what we want)
# Extract last Write BEFORE 1210
# Extract Write at 1217 as separate reference

last_write_before = {}
write_1217 = {}

with open(path, "r", encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        try:
            obj = json.loads(line)
        except:
            continue
        for item in obj.get("message", {}).get("content", []):
            if item.get("type") != "tool_use" or item.get("name") != "Write":
                continue
            inp = item["input"]
            p = inp.get("path", "")
            c = inp.get("contents", "")
            for name, suffix in targets.items():
                if match_file(p, suffix):
                    if i < 1210:
                        last_write_before[name] = (i, c)
                    if 1210 <= i <= 1225:
                        write_1217[name] = (i, c)

print("Last Write BEFORE 1210:")
for k, v in sorted(last_write_before.items()):
    print(f"  {k}: line {v[0]}, {len(v[1])} chars, {len(v[1].splitlines())} lines")

print("\nWrite at 1210-1225 (0.8.0 batch):")
for k, v in sorted(write_1217.items()):
    print(f"  {k}: line {v[0]}, {len(v[1])} chars")

# Save 0.7.0 candidates from last write before 1210
import os
for k, (ln, c) in last_write_before.items():
    fp = os.path.join(out, f"{k}.pre1210_write")
    with open(fp, "w", encoding="utf-8") as f:
        f.write(c)
    print(f"Saved {fp}")

# For Hero - forward apply patches before 1210 starting from... 
# use write_1217 Hero's inverse? No.
# Extract all hero patches before 1210
hero_patches = []
with open(path, "r", encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        if i >= 1210:
            break
        try:
            obj = json.loads(line)
        except:
            continue
        for item in obj.get("message", {}).get("content", []):
            if item.get("name") == "StrReplace" and match_hero(item["input"].get("path","")):
                hero_patches.append((i, item["input"]["old_string"], item["input"]["new_string"]))

print(f"\nHero patches before 1210: {len(hero_patches)}")
for i, old, new in hero_patches:
    print(f"  L{i}: old={len(old)} new={len(new)}")

# If we have 0.8.0 hero write at 1217, reverse first patch's old might match part of 0.7.0
if "Hero.tsx" in write_1217:
    h080 = write_1217["Hero.tsx"][1]
    with open(os.path.join(out, "Hero.tsx.080_write"), "w", encoding="utf-8") as f:
        f.write(h080)
    print(f"\nSaved Hero 0.8.0 write ({len(h080)} chars)")

# Extract globals.css write before 1214 - check line 465 layout write for globals
# globals last patch before 1210 at 701
globals_patches = []
with open(path, "r", encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        if i >= 1210:
            break
        try:
            obj = json.loads(line)
        except:
            continue
        for item in obj.get("message", {}).get("content", []):
            inp = item.get("input", {})
            if "globals.css" in inp.get("path", "").replace("\\", "/"):
                if item.get("name") == "StrReplace":
                    globals_patches.append((i, inp["old_string"], inp["new_string"]))
                elif item.get("name") == "Write":
                    print(f"globals Write at L{i}: {len(inp.get('contents',''))} chars")

print(f"globals patches before 1210: {len(globals_patches)}")

# Extract package.json strreplace around 1214
with open(path, "r", encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        if "package.json" not in line:
            continue
        if i < 1200 or i > 1270:
            continue
        try:
            obj = json.loads(line)
        except:
            continue
        for item in obj.get("message", {}).get("content", []):
            if item.get("name") in ("Write", "StrReplace") and "package.json" in item.get("input", {}).get("path", ""):
                print(f"package.json {item['name']} at L{i}")
