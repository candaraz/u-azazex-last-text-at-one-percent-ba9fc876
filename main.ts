import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve every path from this script's own directory so the program
// behaves identically no matter where it is invoked from.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(scriptDir, "entry.txt");

// The grader points MAKEFUN_OUTPUT_DIR at the output mount; fall back to a
// local "out" folder for manual runs.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(scriptDir, "out");

// Empty the output directory's contents only — the directory itself is a
// mount point and must never be removed.
if (existsSync(outputDir)) {
  for (const name of readdirSync(outputDir)) {
    rmSync(join(outputDir, name), { recursive: true, force: true });
  }
} else {
  mkdirSync(outputDir, { recursive: true });
}

// Copy the entry text verbatim into the output directory.
const text = readFileSync(sourcePath);
writeFileSync(join(outputDir, "entry.txt"), text);
