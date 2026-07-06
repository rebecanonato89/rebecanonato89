// Injeta o HTML da rota "/" (a única que um bot vê, já que o app usa hash
// routing) no dist/index.html gerado pelo `vite build`, usando o bundle SSR
// gerado por `vite build --ssr src/entry-server.js --outDir dist-ssr`.
// Roda como último passo de `npm run build`; dist-ssr é descartado no final,
// pois só existe pra gerar esse snapshot em build time (não é servido).
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(new URL('.', import.meta.url)));
const distDir = path.join(rootDir, 'dist');
const ssrDir = path.join(rootDir, 'dist-ssr');
const ssrEntry = path.join(ssrDir, 'entry-server.mjs');

const { render } = await import(pathToFileUrl(ssrEntry));
const appHtml = await render('/');

const indexPath = path.join(distDir, 'index.html');
const original = readFileSync(indexPath, 'utf-8');

if (!original.includes('<div id="app"></div>')) {
  throw new Error('prerender: <div id="app"></div> não encontrado em dist/index.html');
}

const prerendered = original.replace('<div id="app"></div>', `<div id="app">${appHtml}</div>`);
writeFileSync(indexPath, prerendered);

rmSync(ssrDir, { recursive: true, force: true });

console.log('[prerender] conteúdo estático da Home injetado em dist/index.html');

function pathToFileUrl(p) {
  return new URL(`file://${p}`).href;
}
