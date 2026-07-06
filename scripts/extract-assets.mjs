#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync } from "node:fs";
import path from "node:path";

const srcDir = process.argv[2];
if (!srcDir) {
  console.error("Usage: node scripts/extract-assets.mjs <path-to-portfolio/project>");
  process.exit(1);
}

const outDir = path.join(process.cwd(), "public", "images");
mkdirSync(outDir, { recursive: true });

const slots = JSON.parse(readFileSync(path.join(srcDir, ".image-slots.state.json"), "utf8"));

const SLOT_TO_FILE = {
  portrait: "portrait.webp",
  "shot-roots-recipes": "roots-recipes.webp",
  "shot-redverse": "redverse.webp",
  "shot-blacklisted": "blacklisted.webp",
};

for (const [slotId, fileName] of Object.entries(SLOT_TO_FILE)) {
  const slot = slots[slotId];
  if (!slot?.u) {
    console.warn(`Skipping ${slotId}: no image data found`);
    continue;
  }
  const base64 = slot.u.replace(/^data:image\/webp;base64,/, "");
  writeFileSync(path.join(outDir, fileName), Buffer.from(base64, "base64"));
  console.log(`Wrote public/images/${fileName}`);
}

const uploadsDir = path.join(srcDir, "uploads");
const resumeFile = readdirSync(uploadsDir).find((f) => f.startsWith("resume_file"));
if (resumeFile) {
  copyFileSync(path.join(uploadsDir, resumeFile), path.join(process.cwd(), "public", "resume.pdf"));
  console.log("Wrote public/resume.pdf");
} else {
  console.warn("No resume file found in uploads/");
}
