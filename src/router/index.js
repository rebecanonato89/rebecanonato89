import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import GoGame from '../views/GoGame.vue';
import CheckersGame from '../views/CheckersGame.vue';
import MemoryGame from '../views/MemoryGame.vue';
import Game2048 from '../views/Game2048.vue';
import Arcade from '../views/Arcade.vue';
import Resources from '../views/Resources.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/arcade', name: 'arcade', component: Arcade },
  { path: '/go', name: 'go-game', component: GoGame },
  { path: '/damas', name: 'checkers-game', component: CheckersGame },
  { path: '/memoria', name: 'memory-game', component: MemoryGame },
  { path: '/2048', name: 'game-2048', component: Game2048 },
  { path: '/recursos', name: 'resources', component: Resources },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0 };
  }
});

export default router;
