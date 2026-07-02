<template>
  <main id="main-content">
    <div class="mm-app-bar">
      <router-link to="/arcade" class="mm-app-back" aria-label="Voltar ao arcade">&larr; Arcade</router-link>
      <span class="mm-app-title">Jogo da Memória</span>
    </div>

    <section id="memory-game" aria-labelledby="memory-title">
      <h2 id="memory-title" class="section-title">Memória — Stack Edition</h2>

      <div class="hud-card mm-intro" v-if="!started">
        <p>
          Jogo da memória com as tecnologias do meu dia a dia. Vire duas cartas por vez e
          encontre todos os pares. O relógio começa na primeira carta virada — seu melhor
          tempo fica salvo no navegador.
        </p>
      </div>

      <div class="hud-card mm-panel">
        <div class="mm-controls-row">
          <div class="mm-control-row">
            <label for="mm-difficulty">Dificuldade</label>
            <select id="mm-difficulty" v-model.number="pairCount">
              <option :value="8">Fácil — 16 cartas</option>
              <option :value="12">Médio — 24 cartas</option>
              <option :value="18">Difícil — 36 cartas</option>
            </select>
          </div>
          <button class="btn-hud btn-hud--live" @click="startNewGame">
            {{ started ? 'Reiniciar' : 'Começar' }}
          </button>
        </div>

        <template v-if="started">
          <div class="mm-panel-divider" aria-hidden="true"></div>
          <div class="mm-stats" aria-live="polite">
            <span>⏱ {{ formattedTime }}</span>
            <span>🃏 {{ moves }} jogadas</span>
            <span>✅ {{ matchedPairs }}/{{ pairCount }} pares</span>
            <span v-if="bestForCurrent">🏆 Recorde: {{ formatTime(bestForCurrent.time) }} · {{ bestForCurrent.moves }} jogadas</span>
          </div>
        </template>
      </div>

      <div v-if="started" class="hud-card mm-board-card">
        <div class="mm-grid" :class="'mm-grid--' + pairCount" role="group" aria-label="Cartas do jogo da memória">
          <button
            v-for="card in cards"
            :key="card.id"
            type="button"
            class="mm-card"
            :class="{ 'mm-card--flipped': card.flipped || card.matched, 'mm-card--matched': card.matched }"
            :disabled="card.matched || card.flipped || lockBoard || won"
            :aria-label="card.flipped || card.matched ? card.label : 'Carta virada para baixo'"
            @click="flipCard(card)"
          >
            <span class="mm-card-inner">
              <span class="mm-card-back" aria-hidden="true">&lt;/&gt;</span>
              <span class="mm-card-front" aria-hidden="true">
                <span class="mm-glyph">{{ card.glyph }}</span>
                <span class="mm-label">{{ card.label }}</span>
              </span>
            </span>
          </button>
        </div>

        <div v-if="won" class="mm-victory" role="status">
          <p class="mm-victory-title">// PARES SINCRONIZADOS //</p>
          <p>Você fechou {{ pairCount }} pares em {{ formattedTime }} com {{ moves }} jogadas.</p>
          <p v-if="isNewRecord" class="mm-record">Novo recorde pessoal! 🏆</p>
          <button class="btn-hud btn-hud--live" @click="startNewGame">Jogar de novo</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
const TECH_DECK = [
  { label: 'Java', glyph: '☕' },
  { label: 'Docker', glyph: '🐳' },
  { label: 'PostgreSQL', glyph: '🐘' },
  { label: 'Kafka', glyph: '📨' },
  { label: 'AWS', glyph: '☁️' },
  { label: 'Vue', glyph: '💚' },
  { label: 'Python', glyph: '🐍' },
  { label: 'Git', glyph: '🌿' },
  { label: 'Kubernetes', glyph: '☸️' },
  { label: 'TypeScript', glyph: '🔷' },
  { label: 'Kotlin', glyph: '🟣' },
  { label: 'Terminal', glyph: '💻' },
  { label: 'API REST', glyph: '🔌' },
  { label: 'Segurança', glyph: '🔐' },
  { label: 'Deploy', glyph: '🚀' },
  { label: 'Testes', glyph: '🧪' },
  { label: 'Observab.', glyph: '📈' },
  { label: 'Bug Fix', glyph: '🐛' },
];

const STORAGE_KEY = 'rebeca-memory-best';

export default {
  name: 'MemoryGame',
  data() {
    return {
      pairCount: 8,
      started: false,
      cards: [],
      flippedCards: [],
      lockBoard: false,
      moves: 0,
      matchedPairs: 0,
      seconds: 0,
      timerId: null,
      won: false,
      isNewRecord: false,
      bestScores: this.loadBestScores(),
    };
  },
  computed: {
    formattedTime() { return this.formatTime(this.seconds); },
    bestForCurrent() { return this.bestScores[this.pairCount] || null; },
  },
  beforeUnmount() {
    this.stopTimer();
  },
  methods: {
    loadBestScores() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      } catch (error) {
        return {};
      }
    },
    formatTime(total) {
      const min = String(Math.floor(total / 60)).padStart(2, '0');
      const sec = String(total % 60).padStart(2, '0');
      return `${min}:${sec}`;
    },
    startNewGame() {
      this.stopTimer();
      const deck = TECH_DECK.slice(0, this.pairCount);
      const doubled = deck.flatMap((item, pairIndex) => [
        { id: pairIndex * 2, pairIndex, ...item, flipped: false, matched: false },
        { id: pairIndex * 2 + 1, pairIndex, ...item, flipped: false, matched: false },
      ]);
      // Fisher-Yates
      for (let i = doubled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
      }
      this.cards = doubled;
      this.flippedCards = [];
      this.lockBoard = false;
      this.moves = 0;
      this.matchedPairs = 0;
      this.seconds = 0;
      this.won = false;
      this.isNewRecord = false;
      this.started = true;
    },
    startTimer() {
      if (this.timerId) return;
      this.timerId = setInterval(() => { this.seconds++; }, 1000);
    },
    stopTimer() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    },
    flipCard(card) {
      this.startTimer();
      card.flipped = true;
      this.flippedCards.push(card);
      if (this.flippedCards.length < 2) return;

      this.moves++;
      const [first, second] = this.flippedCards;
      if (first.pairIndex === second.pairIndex) {
        first.matched = true;
        second.matched = true;
        this.flippedCards = [];
        this.matchedPairs++;
        if (this.matchedPairs === this.pairCount) this.finishGame();
      } else {
        this.lockBoard = true;
        setTimeout(() => {
          first.flipped = false;
          second.flipped = false;
          this.flippedCards = [];
          this.lockBoard = false;
        }, 900);
      }
    },
    finishGame() {
      this.stopTimer();
      this.won = true;
      const best = this.bestScores[this.pairCount];
      if (!best || this.seconds < best.time || (this.seconds === best.time && this.moves < best.moves)) {
        this.isNewRecord = true;
        this.bestScores = { ...this.bestScores, [this.pairCount]: { time: this.seconds, moves: this.moves } };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.bestScores));
        } catch (error) {
          // localStorage indisponível (modo privado): recorde só vale na sessão
        }
      }
    },
  },
};
</script>

<style scoped>
.mm-app-bar {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 12px var(--space-lg);
  margin: 0 calc(-1 * var(--space-lg)) var(--space-md);
  background: var(--bg-surface);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--cyan-border);
}
.mm-app-back {
  color: var(--cyan-core);
  text-decoration: none;
  font-family: var(--font-ui);
  font-size: 1rem;
  text-transform: uppercase;
  white-space: nowrap;
}
.mm-app-title {
  font-family: var(--font-ui);
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-main);
  font-size: 0.95rem;
}

#memory-title {
  font-size: 1.3rem;
  margin-bottom: 10px;
}
.mm-intro { margin-bottom: var(--space-md); }
.mm-intro p { color: var(--text-main); }

.mm-panel {
  padding: 12px var(--space-lg);
  gap: 6px;
  margin-bottom: var(--space-md);
}
.mm-controls-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--space-md) var(--space-lg);
}
.mm-control-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.mm-control-row label {
  font-family: var(--font-code);
  font-size: 0.75rem;
  color: var(--cyan-core);
  text-transform: uppercase;
}
.mm-control-row select {
  background: var(--bg-surface);
  color: var(--text-main);
  border: 1px solid var(--cyan-border);
  border-radius: 4px;
  padding: 6px 8px;
  font-family: var(--font-read);
  font-size: 0.9rem;
}
.mm-panel-divider {
  border-top: 1px dashed var(--cyan-dim);
  margin: var(--space-sm) 0;
}
.mm-stats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  font-family: var(--font-code);
  font-size: 0.85rem;
  color: var(--text-main);
}

.mm-board-card {
  padding: var(--space-md);
  align-items: center;
  gap: var(--space-md);
}
.mm-grid {
  display: grid;
  gap: 10px;
  width: 100%;
  max-width: 640px;
}
.mm-grid--8 { grid-template-columns: repeat(4, 1fr); }
.mm-grid--12 { grid-template-columns: repeat(4, 1fr); }
.mm-grid--18 { grid-template-columns: repeat(6, 1fr); }
@media (min-width: 640px) {
  .mm-grid--12 { grid-template-columns: repeat(6, 1fr); }
}

.mm-card {
  aspect-ratio: 3 / 4;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  perspective: 600px;
}
.mm-card:disabled { cursor: default; }
.mm-card-inner {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.4s;
}
.mm-card--flipped .mm-card-inner { transform: rotateY(180deg); }
@media (prefers-reduced-motion: reduce) {
  .mm-card-inner { transition: none; }
}

.mm-card-back,
.mm-card-front {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  backface-visibility: hidden;
  border-radius: 8px;
  border: 1px solid var(--cyan-border);
}
.mm-card-back {
  background:
    repeating-linear-gradient(45deg, var(--cyan-dim) 0 6px, transparent 6px 12px),
    var(--bg-surface);
  border-color: var(--cyan-core);
  box-shadow: inset 0 0 12px var(--cyan-dim);
  color: var(--cyan-core);
  font-family: var(--font-code);
  font-size: 1.2rem;
}
.mm-card:not(:disabled):hover .mm-card-back {
  box-shadow: 0 0 15px var(--cyan-dim);
  border-color: var(--cyan-core);
}
.mm-card-front {
  background: var(--bg-surface);
  transform: rotateY(180deg);
}
.mm-card--matched .mm-card-front {
  border-color: var(--cyan-core);
  box-shadow: 0 0 12px var(--cyan-dim);
}
.mm-glyph { font-size: clamp(1.2rem, 5vw, 2rem); }
.mm-label {
  font-family: var(--font-code);
  font-size: clamp(0.5rem, 1.8vw, 0.7rem);
  color: var(--text-muted);
  text-align: center;
  padding: 0 2px;
}

.mm-victory {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  border: 1px dashed var(--cyan-border);
  border-radius: 8px;
  width: 100%;
}
.mm-victory-title {
  font-family: var(--font-code);
  color: var(--cyan-core);
  letter-spacing: 2px;
}
.mm-victory p { color: var(--text-main); }
.mm-record { color: var(--cyan-core); font-weight: 600; }

@media (max-width: 768px) {
  .mm-app-bar { margin: 0 0 var(--space-md); }
  .mm-grid { gap: 6px; }
}
</style>
