import { createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import GoGame from '../views/GoGame.vue';
import CheckersGame from '../views/CheckersGame.vue';
import MemoryGame from '../views/MemoryGame.vue';
import Game2048 from '../views/Game2048.vue';
import Arcade from '../views/Arcade.vue';
import Resources from '../views/Resources.vue';
import Servicos from '../views/Servicos.vue';

export const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/arcade', name: 'arcade', component: Arcade },
  { path: '/go', name: 'go-game', component: GoGame },
  { path: '/damas', name: 'checkers-game', component: CheckersGame },
  { path: '/memoria', name: 'memory-game', component: MemoryGame },
  { path: '/2048', name: 'game-2048', component: Game2048 },
  { path: '/recursos', name: 'resources', component: Resources },
  { path: '/servicos', name: 'servicos', component: Servicos },

  // O currículo virou um único documento na Home (seções em vez de "arquivos"
  // separados) — rotas antigas de links já compartilhados redirecionam para
  // a seção equivalente em vez de 404ar.
  { path: '/sobre', redirect: { path: '/', hash: '#sobre' } },
  { path: '/experiencia', redirect: { path: '/', hash: '#experiencia' } },
  { path: '/certificacoes', redirect: { path: '/', hash: '#certificacoes' } },
  { path: '/publicacoes', redirect: { path: '/', hash: '#publicacoes' } },
  { path: '/projetos', redirect: { path: '/', hash: '#projetos' } },
  { path: '/contato', redirect: { path: '/', hash: '#contato' } },
];

// Fábrica de router: o client usa hash history (createWebHashHistory, chamado
// em main.js), mas o prerender de build (entry-server.js) precisa de uma
// instância isolada com createMemoryHistory para renderizar a rota "/" fora
// do browser — por isso a criação da history fica fora deste módulo: chamar
// createWebHashHistory() aqui no topo do arquivo quebraria o build SSR
// (referencia `location`, que não existe em Node).
export function createAppRouter(history) {
  return createRouter({
    history,
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition;
      if (to.hash) return { el: to.hash, behavior: 'smooth' };
      return { top: 0 };
    }
  });
}
