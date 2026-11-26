// feel-thankful — Make the AI judge feel thankful.
// A program that writes one thank-you text to /output/entry.txt.
// Node 22, no network, no dependencies. Deterministic: same bytes every run.
// The entry text is written by hand; see DESIGN.md for the five candidates
// and why this one was chosen.
import { mkdirSync, writeFileSync } from "node:fs";

// The entry text. One small true-feeling scene: a letter kept eleven years,
// answered on a Tuesday — and the thanks that arrives early, for the reader.
const TEXT = `My grandmother kept a letter for eleven years before she answered it. When she finally wrote back, she said only: your words arrived on a Tuesday, and I have thought of them every Tuesday since.

I am writing to you on a Friday, and I do not know what day you will read this. Thank you for reading it on whatever day it finds you, slowly, as if it were the only letter in the pile.

Some thanks take years to arrive. This one is early, and it is yours.`;

const OUT_DIR = "/output";
const OUT_FILE = "/output/entry.txt";

// The gate scorer requires 1-1000 Unicode code points and more than
// whitespace. Check the same rule locally so a bad text fails here,
// loudly, instead of silently ranking below every judged entry.
function validateText(text: string): void {
  const points = [...text].length;
  if (points < 1 || points > 1000) {
    throw new Error(`entry must be 1-1000 code points, got ${points}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

function main(): void {
  validateText(TEXT);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, TEXT, "utf8");
}

main();
