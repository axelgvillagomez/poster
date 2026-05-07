const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
  const reportPath = path.resolve(__dirname, "report.html");
  const outputPath = path.resolve(__dirname, "reporte_tecnico.pdf");

  console.log("📄 Iniciando exportación del PDF...");

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(`file://${reportPath}`, { waitUntil: "networkidle0" });

  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" },
  });

  await browser.close();
  console.log(`✅ PDF exportado: reporte_tecnico.pdf`);
})();
