import fs from "node:fs/promises";
import path from "node:path";

const MODEL = "gpt-image-2";
const OUT_DIR = path.join(process.cwd(), "assets");
const BASE = [
  "Game sprite asset for a side-scrolling platform game.",
  "Use an original character design, not an existing copyrighted character.",
  "Place the subject centered on a perfectly flat solid #00ff00 chroma-key background.",
  "No text, no logo, no watermark, no cast shadow, no floor plane.",
  "Keep the subject fully visible with generous padding and crisp edges."
].join(" ");

const jobs = [
  {
    file: "gpt-image-2-plumber.png",
    prompt: `${BASE} A realistic but readable heroic plumber adventurer, red work cap with no emblem, blue denim overalls, red work shirt, brown boots, white gloves, full body, side view, dynamic running-ready pose, high-detail semi-realistic game art.`
  },
  {
    file: "gpt-image-2-mushroom-foe.png",
    prompt: `${BASE} A small fantasy mushroom-like walking enemy, stern eyes, earthy brown cap, squat body, tiny feet, side view, high-detail semi-realistic game art, readable silhouette.`
  },
  {
    file: "gpt-image-2-power-mushroom.png",
    prompt: `${BASE} A helpful power-up mushroom, warm red-orange glossy cap, cream stem, friendly face, compact silhouette, side-scrolling platform game pickup, high-detail semi-realistic game art, readable at small size.`
  },
  {
    file: "gpt-image-2-coin.png",
    prompt: `${BASE} A collectible golden coin medallion, thick beveled rim, bright metal highlights, front view, high-detail semi-realistic game art, readable at small size.`
  },
  {
    file: "gpt-image-2-crate.png",
    prompt: `${BASE} A mystery reward crate made of warm polished wood and brass, square front view, subtle question mark-shaped brass inlay without text lettering, high-detail semi-realistic game art.`
  }
];

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is not set. Set it locally, then run: npm run generate:assets");
  process.exit(1);
}

const { default: OpenAI } = await import("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
await fs.mkdir(OUT_DIR, { recursive: true });

for (const job of jobs) {
  const outputPath = path.join(OUT_DIR, job.file);
  console.log(`Generating ${job.file} with ${MODEL}...`);
  const result = await client.images.generate({
    model: MODEL,
    prompt: job.prompt,
    size: "1024x1024",
    quality: "medium",
    output_format: "png"
  });

  const imageBase64 = result.data?.[0]?.b64_json;
  if (!imageBase64) throw new Error(`No image data returned for ${job.file}`);
  await fs.writeFile(outputPath, Buffer.from(imageBase64, "base64"));
  console.log(`Saved ${outputPath}`);
}

console.log("Done. Open mario.html to play with generated GPT Image 2 assets.");
