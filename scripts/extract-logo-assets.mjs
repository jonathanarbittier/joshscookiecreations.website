import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const source = process.argv[2];
const outputDirectory = process.argv[3];

if (!source || !outputDirectory) {
  throw new Error("Usage: node scripts/extract-logo-assets.mjs <logo.webp> <output-directory>");
}

const assets = [
  { name: "mascot", left: 300, top: 250, width: 310, height: 235 },
  { name: "wordmark", left: 175, top: 35, width: 560, height: 225 },
];

await mkdir(outputDirectory, { recursive: true });

for (const asset of assets) {
  const { data, info } = await sharp(source)
    .extract({ left: asset.left, top: asset.top, width: asset.width, height: asset.height })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rowBackgrounds = [];
  for (let y = 0; y < info.height; y += 1) {
    let r = 0;
    let g = 0;
    let b = 0;
    let samples = 0;
    for (let x = 0; x < info.width; x += 1) {
      if (x >= 18 && x < info.width - 18) continue;
      const offset = (y * info.width + x) * info.channels;
      r += data[offset];
      g += data[offset + 1];
      b += data[offset + 2];
      samples += 1;
    }
    rowBackgrounds.push([r / samples, g / samples, b / samples]);
  }

  const output = Buffer.alloc(info.width * info.height * 4);
  for (let y = 0; y < info.height; y += 1) {
    const [backgroundR, backgroundG, backgroundB] = rowBackgrounds[y];
    for (let x = 0; x < info.width; x += 1) {
      const pixel = y * info.width + x;
      const sourceOffset = pixel * info.channels;
      const outputOffset = pixel * 4;
      const r = data[sourceOffset];
      const g = data[sourceOffset + 1];
      const b = data[sourceOffset + 2];
      const distance = Math.sqrt((r - backgroundR) ** 2 + (g - backgroundG) ** 2 + (b - backgroundB) ** 2);
      const alpha = asset.name === "wordmark"
        ? Math.max(0, Math.min(255, Math.round(((backgroundG - g - 5) / 68) * 255)))
        : Math.max(0, Math.min(255, Math.round(((distance - 5) / 26) * 255)));
      const opacity = alpha / 255;
      const unmix = (channel, background) => opacity > 0.04
        ? Math.max(0, Math.min(255, Math.round((channel - (1 - opacity) * background) / opacity)))
        : 0;
      output[outputOffset] = unmix(r, backgroundR);
      output[outputOffset + 1] = unmix(g, backgroundG);
      output[outputOffset + 2] = unmix(b, backgroundB);
      output[outputOffset + 3] = alpha;
    }
  }

  await sharp(output, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDirectory, `${asset.name}.png`));
}

const mascot = await sharp(path.join(outputDirectory, "mascot.png"))
  .resize({ width: 220, height: 180, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();
const wordmark = await sharp(path.join(outputDirectory, "wordmark.png"))
  .resize({ width: 430, height: 180, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await sharp({ create: { width: 720, height: 240, channels: 4, background: "#fff8ed" } })
  .composite([{ input: mascot, left: 35, top: 30 }, { input: wordmark, left: 255, top: 30 }])
  .png()
  .toFile("/tmp/jcc-logo-assets-preview.png");
