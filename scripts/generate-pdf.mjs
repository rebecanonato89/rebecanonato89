// Gera public/rebeca-nonato-curriculo.pdf a partir da Home já buildada,
// aplicando os estilos de @media print definidos em src/App.vue.
//
// Não roda como parte de `npm run build`: adicionar Playwright às
// dependências do projeto faria o build de produção (Netlify/Vercel) baixar
// um Chromium inteiro a cada deploy, o que é caro e desnecessário — o PDF só
// precisa ser regenerado quando o conteúdo do currículo muda de verdade.
//
// Uso (manual, sempre que o currículo mudar):
//   npm run build
//   npm install --no-save playwright && npx playwright install --with-deps chromium
//   node scripts/generate-pdf.mjs
import { preview } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(new URL('.', import.meta.url)));

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error(
    '[generate-pdf] O pacote "playwright" não está instalado.\n' +
    'Rode: npm install --no-save playwright && npx playwright install --with-deps chromium'
  );
  process.exit(1);
}

const server = await preview({ root: rootDir, preview: { port: 4321, strictPort: true } });
const url = `http://localhost:4321/`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.emulateMedia({ media: 'print' });
  await page.goto(url, { waitUntil: 'networkidle' });
  const outPath = path.join(rootDir, 'public', 'rebeca-nonato-curriculo.pdf');
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '14mm', bottom: '14mm', left: '12mm', right: '12mm' },
  });
  console.log(`[generate-pdf] PDF gerado em ${outPath}`);
} finally {
  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
}
