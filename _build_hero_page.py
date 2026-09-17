import json
import os

path = r"C:\Users\memories\.cursor\projects\c-Users-memories-Desktop-pol-turk\agent-transcripts\414c2c43-5e20-4184-8fd6-90c92adf5f3d\414c2c43-5e20-4184-8fd6-90c92adf5f3d.jsonl"
out = r"C:\Users\memories\Desktop\pol-turk\_transcript_extract"

# Build Hero 0.7.0
l227new = open(os.path.join(out, "Hero_L227_new.tsx"), encoding="utf-8").read()
l701old = open(os.path.join(out, "Hero_L701_old.txt"), encoding="utf-8").read()
l701new = open(os.path.join(out, "Hero_L701_new.txt"), encoding="utf-8").read()
body = l227new.replace(l701old, l701new)
hero = '''"use client";

import type { SiteContent } from "@/content/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { motion, useReducedMotion } from "framer-motion";

type HeroProps = {
  content: SiteContent;
  locale: string;
};

''' + body
open(os.path.join(out, "Hero.tsx"), "w", encoding="utf-8", newline="\n").write(hero)
print(f"Hero: {len(hero.splitlines())} lines")

# Extract page L1204 patches
with open(path, encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        if i != 1204:
            continue
        for item in json.loads(line)["message"]["content"]:
            if item.get("name") != "StrReplace":
                continue
            p = item["input"]["path"].replace("\\", "/")
            if "[locale]/page.tsx" not in p:
                continue
            old = item["input"]["old_string"]
            new = item["input"]["new_string"]
            print(f"page L{i}: old {len(old)} new {len(new)}")
            open(os.path.join(out, f"page_L{i}_old.txt"), "w", encoding="utf-8").write(old)
            open(os.path.join(out, f"page_L{i}_new.txt"), "w", encoding="utf-8").write(new)

# Services L160
with open(path, encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        if i != 160:
            continue
        for item in json.loads(line)["message"]["content"]:
            if item.get("name") != "StrReplace":
                continue
            p = item["input"].get("path", "").replace("\\", "/")
            if "Services.tsx" not in p:
                continue
            old = item["input"]["old_string"]
            new = item["input"]["new_string"]
            print(f"Services L{i}: old {len(old)} new {len(new)}")
            if len(old) > 500:
                open(os.path.join(out, "Services_L160_old.tsx"), "w", encoding="utf-8").write(old)
            if len(new) > 500:
                open(os.path.join(out, "Services_L160_new.tsx"), "w", encoding="utf-8").write(new)
