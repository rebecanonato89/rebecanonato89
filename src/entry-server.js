import { createSSRApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
import App from './App.vue';
import { createAppRouter } from './router/index.js';
import { createMemoryHistory } from 'vue-router';

// Usado só em build time (scripts/prerender.js) para gerar o HTML estático da
// rota "/" — a única que importa pro crawler, já que o app usa hash routing
// (o servidor nunca vê o fragmento depois do #).
export async function render(url = '/') {
  const app = createSSRApp(App);
  const router = createAppRouter(createMemoryHistory());
  app.use(router);

  router.push(url);
  await router.isReady();

  return renderToString(app);
}
