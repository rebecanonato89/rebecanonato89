<template>
  <main id="main-content">
    <section id="arcade" aria-labelledby="arcade-title">
      <h2 id="arcade-title" class="section-title">Arcade // Jogos no Browser</h2>

      <div class="hud-card arcade-intro">
        <p>
          Todos os jogos abaixo foram implementados <strong>do zero, sem bibliotecas de jogos</strong> —
          regras, inteligência artificial e interface. Cada um é também um estudo de algoritmos:
          Monte Carlo, minimax com poda alfa-beta e gerenciamento de estado. Jogue direto no navegador,
          sem cadastro e sem instalação.
        </p>
      </div>

      <div class="arcade-grid">
        <article v-for="game in games" :key="game.title" class="hud-card arcade-card">
          <div class="arcade-icon" aria-hidden="true">{{ game.icon }}</div>
          <header class="card-header">
            <h3 class="card-title">{{ game.title }}</h3>
            <span class="card-period">{{ game.tag }}</span>
          </header>
          <p class="card-desc">{{ game.description }}</p>
          <ul class="tech-list" aria-label="Técnicas utilizadas">
            <li v-for="tech in game.stack" :key="tech" class="tech-tag">{{ tech }}</li>
          </ul>
          <router-link :to="game.route" class="btn-hud btn-hud--live">
            Jogar agora <span class="sr-only"> ({{ game.title }})</span>
          </router-link>
        </article>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Arcade',
  data() {
    return {
      games: [
        {
          icon: '⚫⚪',
          title: 'Go (Baduk/Weiqi)',
          tag: 'ESTRATÉGIA',
          route: '/go',
          description:
            'O clássico jogo milenar de território. Regras completas: captura de grupos, ko, proibição de suicídio e contagem por área. Três níveis de máquina, do aleatório ao Monte Carlo com orçamento de tempo.',
          stack: ['Monte Carlo', 'Flood Fill', 'Heurísticas'],
        },
        {
          icon: '🔴⚪',
          title: 'Damas Brasileiras',
          tag: 'ESTRATÉGIA',
          route: '/damas',
          description:
            'Regras oficiais brasileiras: captura obrigatória (inclusive para trás), lei da maioria, dama voadora e capturas em cadeia. A máquina calcula com minimax e poda alfa-beta em três profundidades.',
          stack: ['Minimax', 'Poda Alfa-Beta', 'Busca Iterativa'],
        },
        {
          icon: '🃏',
          title: 'Memória — Stack Edition',
          tag: 'CASUAL',
          route: '/memoria',
          description:
            'Jogo da memória com as tecnologias do meu dia a dia. Três dificuldades (16, 24 ou 36 cartas), cronômetro, contador de jogadas e recorde pessoal salvo no navegador.',
          stack: ['Vue 3', 'Animações CSS 3D', 'localStorage'],
        },
        {
          icon: '🔢',
          title: '2048',
          tag: 'CASUAL',
          route: '/2048',
          description:
            'O clássico dos números. Setas ou WASD no desktop, swipe no celular. Pontuação, recorde salvo no navegador e opção de continuar jogando depois de alcançar o 2048.',
          stack: ['Vue 3', 'Manipulação de matriz', 'localStorage'],
        },
      ],
    };
  },
};
</script>

<style scoped>
.arcade-intro {
  margin-bottom: var(--space-lg);
}
.arcade-intro p { color: var(--text-main); }

.arcade-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}
@media (min-width: 900px) {
  .arcade-grid { grid-template-columns: repeat(3, 1fr); }
}

.arcade-card {
  position: relative;
  overflow: hidden;
}
.arcade-icon {
  font-size: 2rem;
  margin-bottom: var(--space-sm);
  filter: drop-shadow(0 0 8px var(--accent-dim));
}
</style>
