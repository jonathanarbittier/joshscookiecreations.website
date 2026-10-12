import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const sourceDirectory = "/Users/elyadoshnavie/Downloads";
const outputDirectory = path.resolve("public/images/treats");

const images = [
  ["Chocolate-Dipped Cookies in a Perfect Grid.png", "chocolate-dipped-cookies.webp"],
  ["Frosted Chocolate Chip Cookie Bar.png", "frosted-cookie-bar.webp"],
  ["Glossy Chocolate Candy Bar Pile.png", "chocolate-candy-bars.webp"],
  ["Glossy Chocolate Cookie Bars on Blue.png", "chocolate-cookie-bars.webp"],
  ["Pastel Blue Cinnamon Cookie Grid.png", "cinnamon-cookies.webp"],
  ["Tuxedo Truffle Duo on Blue.png", "tuxedo-truffles.webp"],
  ["Two Grids of Golden Chocolate Chip Cookies.png", "chocolate-chip-cookies.webp"],
];

await mkdir(outputDirectory, { recursive: true });

for (const [sourceName, outputName] of images) {
  const sourcePath = path.join(sourceDirectory, sourceName);
  const outputPath = path.join(outputDirectory, outputName);

  await sharp(sourcePath)
    .rotate()
    .webp({ quality: 88, effort: 6, smartSubsample: true })
    .toFile(outputPath);

  const metadata = await sharp(outputPath).metadata();
  console.log(`${outputName}: ${metadata.width}x${metadata.height}`);
}
