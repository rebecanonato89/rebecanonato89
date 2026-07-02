import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import GoGame from '../views/GoGame.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/go', name: 'go-game', component: GoGame }
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
