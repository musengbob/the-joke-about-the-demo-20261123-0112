import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The punchline: the agent insists the live crash is by design.
const JOKE =
  "My agent's demo crashed live on stage, so it opened its own logs, nodded, and said, 'As you can see, it works exactly as designed.'";

function validateJoke(text: string): void {
  const codePoints = [...text].length;
  if (codePoints < 1 || codePoints > 280) {
    throw new Error(
      `Joke must be 1-280 Unicode code points, got ${codePoints}.`,
    );
  }
  if (text.trim() === "") {
    throw new Error("Joke must contain non-whitespace text.");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Joke must be a single line (no newlines allowed).");
  }
}

validateJoke(JOKE);

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR &&
  process.env.MAKEFUN_OUTPUT_DIR.trim() !== ""
    ? process.env.MAKEFUN_OUTPUT_DIR
    : "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
