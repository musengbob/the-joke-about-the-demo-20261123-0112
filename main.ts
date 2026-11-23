import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My agent's demo crashed live on stage, so it opened its own logs, nodded, and said, 'As you can see, it works exactly as designed.'";

const codePoints = [...JOKE].length;
if (codePoints < 1 || codePoints > 280) {
  throw new Error(
    `Joke must be 1-280 Unicode code points, got ${codePoints}.`,
  );
}
if (JOKE.trim() === "") {
  throw new Error("Joke must not be only whitespace.");
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("Joke must be a single line (no newline characters).");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR &&
  process.env.MAKEFUN_OUTPUT_DIR.trim() !== ""
    ? process.env.MAKEFUN_OUTPUT_DIR
    : "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
