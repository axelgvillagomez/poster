/**
 * generate-qr.js
 * Genera el QR code que apunta a la app AR en GitHub Pages.
 * Uso: node generate-qr.js
 */

const QRCode = require("qrcode");
const path = require("path");

const AR_URL = "https://axelgvillagomez.github.io/poster/";

const outputSVG = path.resolve(__dirname, "qr.svg");
const outputPNG = path.resolve(__dirname, "qr.png");

(async () => {
  // Generate PNG
  await QRCode.toFile(outputPNG, AR_URL, {
    type: "png",
    width: 300,
    margin: 1,
    color: { dark: "#0d2b10", light: "#ffffff" },
    errorCorrectionLevel: "H",
  });

  // Generate SVG
  await QRCode.toFile(outputSVG, AR_URL, {
    type: "svg",
    width: 300,
    margin: 1,
    color: { dark: "#0d2b10", light: "#ffffff" },
    errorCorrectionLevel: "H",
  });

  console.log(`✅ QR generado apuntando a: ${AR_URL}`);
  console.log(`📁 PNG: ${outputPNG}`);
  console.log(`📁 SVG: ${outputSVG}`);
})();
