/**
 * export-poster.js
 * Exporta poster.html a poster.jpg usando Puppeteer.
 * Uso: node export-poster.js
 */

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

(async () => {
  const posterPath = path.resolve(__dirname, "poster.html");
  const outputPath = path.resolve(__dirname, "poster.jpg");

  console.log("🌿 Iniciando exportación del póster...");

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Set viewport to A3 at 150 DPI (794 × 1123 px)
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

  await page.goto(`file://${posterPath}`, { waitUntil: "networkidle0", timeout: 15000 });

  // Wait for Google Fonts to load
  await new Promise(r => setTimeout(r, 2000));

  await page.screenshot({
    path: outputPath,
    type: "jpeg",
    quality: 95,
    clip: { x: 0, y: 0, width: 794, height: 1123 },
  });

  await browser.close();

  const size = (fs.statSync(outputPath).size / 1024).toFixed(1);
  console.log(`✅ Póster exportado: poster.jpg (${size} KB)`);
  console.log(`📍 Ruta: ${outputPath}`);
})();
