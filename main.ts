import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Six Words, One Story — a complete story in exactly six words.
// A man comes home after being gone; the locks have been changed.
// Everything about why he left, how long he was gone, and what she
// decided while he was away is left for the reader to fill in.
const STORY = "He knocked. She'd changed the locks.";

const words = STORY.trim().split(/\s+/);
if (words.length !== 6) {
  throw new Error(`expected exactly 6 words, got ${words.length}`);
}
if (STORY.length > 60) {
  throw new Error(`story exceeds 60 characters: ${STORY.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", STORY, "utf8");

// Read back and verify the file holds exactly the story — no trailing
// newline, no extra bytes — so the 1-60 character gate cannot drift.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== STORY) {
  throw new Error("entry.txt does not match the story exactly");
}
