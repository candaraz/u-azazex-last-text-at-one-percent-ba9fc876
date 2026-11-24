// Last Text at One Percent — make.fun entry
// Writes the final text message a dying phone sends at 1% battery
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Node 22, stdlib only, zero network. Deterministic: same bytes every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "At 1% and honestly: I've been at 1% for an hour. I just wanted attention.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read back and guard: the gate needs UTF-8 text of 1-200 chars,
// not only whitespace, on exactly one line, with no trailing newline.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt does not match the expected text byte for byte");
}
if (written.length < 1 || written.length > 200) {
  throw new Error(`entry.txt is ${written.length} chars, outside the 1-200 gate`);
}
if (written.includes("\n")) {
  throw new Error("entry.txt must be a single line");
}
console.log(`wrote ${outPath}`);
