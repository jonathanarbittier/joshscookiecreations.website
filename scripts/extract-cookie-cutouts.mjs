import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const source = process.argv[2];
const outputDirectory = process.argv[3];

if (!source || !outputDirectory) {
  throw new Error("Usage: node scripts/extract-cookie-cutouts.mjs <source.jpg> <output-directory>");
}

const selections = [
  { name: "cookie-01", left: 2366, top: 1234, width: 400, height: 360, seedX: 228, seedY: 185, radiusX: 135, radiusY: 110 },
  { name: "cookie-02", left: 2848, top: 1267, width: 400, height: 360, seedX: 220, seedY: 184, radiusX: 145, radiusY: 120 },
  { name: "cookie-03", left: 3253, top: 1289, width: 400, height: 360, seedX: 200, seedY: 180, radiusX: 150, radiusY: 130 },
  { name: "cookie-04", left: 2475, top: 1662, width: 400, height: 360, seedX: 200, seedY: 180, radiusX: 150, radiusY: 130 },
  { name: "cookie-05", left: 2969, top: 1716, width: 400, height: 360, seedX: 170, seedY: 205, radiusX: 135, radiusY: 110 },
  { name: "cookie-06", left: 3364, top: 1706, width: 400, height: 360, seedX: 200, seedY: 200, radiusX: 145, radiusY: 120 },
  { name: "cookie-07", left: 2432, top: 2089, width: 400, height: 360, seedX: 250, seedY: 220, radiusX: 135, radiusY: 110 },
  { name: "cookie-08", left: 2947, top: 2144, width: 400, height: 360, seedX: 200, seedY: 180, radiusX: 150, radiusY: 130 },
];

await mkdir(outputDirectory, { recursive: true });

function maskComponent(data, width, height, channels, seedX, seedY, radiusX, radiusY) {
  const selected = new Uint8Array(width * height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const pixel = y * width + x;
      const normalizedRadius = ((x - seedX) / radiusX) ** 2 + ((y - seedY) / radiusY) ** 2;
      selected[pixel] = normalizedRadius <= 1 ? 1 : 0;
    }
  }
  return selected;
}

const previewTiles = [];
for (const selection of selections) {
  const { data, info } = await sharp(source)
    .extract({ left: selection.left, top: selection.top, width: selection.width, height: selection.height })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const binary = maskComponent(data, info.width, info.height, info.channels, selection.seedX, selection.seedY, selection.radiusX, selection.radiusY);
  const alpha = new Uint8Array(info.width * info.height);
  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      let total = 0;
      let samples = 0;
      for (let dy = -2; dy <= 2; dy += 1) {
        for (let dx = -2; dx <= 2; dx += 1) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < info.width && ny >= 0 && ny < info.height) {
            total += binary[ny * info.width + nx];
            samples += 1;
          }
        }
      }
      alpha[y * info.width + x] = Math.round((total / samples) * 255);
    }
  }

  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let pixel = 0; pixel < info.width * info.height; pixel += 1) {
    const sourceOffset = pixel * info.channels;
    const targetOffset = pixel * 4;
    rgba[targetOffset] = data[sourceOffset];
    rgba[targetOffset + 1] = data[sourceOffset + 1];
    rgba[targetOffset + 2] = data[sourceOffset + 2];
    rgba[targetOffset + 3] = alpha[pixel];
  }

  const outputPath = path.join(outputDirectory, `${selection.name}.png`);
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  const preview = await sharp(outputPath).resize({ width: 260, height: 220, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  previewTiles.push(preview);
}

const tileWidth = 300;
const tileHeight = 250;
await sharp({ create: { width: tileWidth * 4, height: tileHeight * 2, channels: 4, background: "#20ace1" } })
  .composite(previewTiles.map((input, index) => ({ input, left: (index % 4) * tileWidth + 20, top: Math.floor(index / 4) * tileHeight + 15 })))
  .png()
  .toFile("/tmp/jcc-cookie-cutouts-preview.png");
