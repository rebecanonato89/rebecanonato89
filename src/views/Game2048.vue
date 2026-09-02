<template>
  <main id="main-content">
    <div class="mm-app-bar">
      <router-link to="/arcade" class="mm-app-back" aria-label="Voltar ao arcade">&larr; Arcade</router-link>
      <span class="mm-app-title">2048</span>
    </div>

    <section id="game-2048" aria-labelledby="g2048-title">
      <h2 id="g2048-title" class="section-title">2048</h2>

      <div class="hud-card g2048-intro">
        <p>
          Junte peças de mesmo valor para chegar em <strong>2048</strong>. Use as setas do teclado
          (ou WASD) no desktop, ou arraste o dedo na tela no celular. Seu recorde fica salvo no navegador.
        </p>
      </div>

      <div class="hud-card g2048-panel">
        <div class="g2048-stats" aria-live="polite">
          <div class="g2048-stat">
            <span class="g2048-stat-label">Pontos</span>
            <span class="g2048-stat-value">{{ score }}</span>
          </div>
          <div class="g2048-stat">
            <span class="g2048-stat-label">Recorde</span>
            <span class="g2048-stat-value">{{ best }}</span>
          </div>
        </div>
        <button class="btn-hud btn-hud--live" @click="startNewGame">Novo jogo</button>
      </div>

      <div
        class="hud-card g2048-board-card"
        tabindex="0"
        role="group"
        aria-label="Tabuleiro do 2048"
        @keydown="handleKeydown"
        @touchstart.passive="onTouchStart"
        @touchend="onTouchEnd"
      >
        <div class="g2048-board">
          <div class="g2048-cell-bg" v-for="n in 16" :key="'bg' + n"></div>
          <div class="g2048-tiles">
            <div
              v-for="tile in flatTiles"
              :key="tile.id"
              class="g2048-tile"
              :class="['g2048-tile--' + tile.value, { 'g2048-tile--new': tile.isNew, 'g2048-tile--merged': tile.isMerged }]"
              :style="tilePosition(tile)"
            >
              {{ tile.value }}
            </div>
          </div>
        </div>

        <div v-if="won && !keepPlaying" class="g2048-overlay" role="status">
          <p class="g2048-overlay-title">// 2048 ALCANÇADO //</p>
          <p>Você chegou na peça 2048 com {{ score }} pontos.</p>
          <div class="g2048-overlay-actions">
            <button class="btn-hud btn-hud--live" @click="keepPlaying = true">Continuar jogando</button>
            <button class="btn-hud" @click="startNewGame">Novo jogo</button>
          </div>
        </div>

        <div v-else-if="gameOver" class="g2048-overlay" role="status">
          <p class="g2048-overlay-title">// SEM MOVIMENTOS //</p>
          <p>Fim de jogo com {{ score }} pontos.</p>
          <button class="btn-hud btn-hud--live" @click="startNewGame">Jogar de novo</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
const SIZE = 4;
const STORAGE_KEY = 'rebeca-2048-best';

function emptyGrid() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
}

function transpose(grid) {
  return grid[0].map((_, col) => grid.map((row) => row[col]));
}

function reverseRows(grid) {
  return grid.map((row) => [...row].reverse());
}

export default {
  name: 'Game2048',
  data() {
    return {
      grid: emptyGrid(),
      score: 0,
      best: this.loadBest(),
      won: false,
      keepPlaying: false,
      gameOver: false,
      nextId: 1,
      touchStartX: 0,
      touchStartY: 0,
    };
  },
  computed: {
    flatTiles() {
      const tiles = [];
      for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
          const tile = this.grid[row][col];
          if (tile) tiles.push({ ...tile, row, col });
        }
      }
      return tiles;
    },
  },
  mounted() {
    this.startNewGame();
  },
  methods: {
    loadBest() {
      try {
        return Number(localStorage.getItem(STORAGE_KEY)) || 0;
      } catch (error) {
        return 0;
      }
    },
    saveBest() {
      try {
        localStorage.setItem(STORAGE_KEY, String(this.best));
      } catch (error) {
        // localStorage indisponível (modo privado): recorde só vale na sessão
      }
    },
    tilePosition(tile) {
      const step = 100 / SIZE;
      return {
        transform: `translate(${tile.col * 100}%, ${tile.row * 100}%)`,
        width: `${step}%`,
        height: `${step}%`,
      };
    },
    startNewGame() {
      this.grid = emptyGrid();
      this.score = 0;
      this.won = false;
      this.keepPlaying = false;
      this.gameOver = false;
      this.spawnTile();
      this.spawnTile();
      this.$nextTick(() => this.$el.querySelector('.g2048-board-card')?.focus());
    },
    spawnTile() {
      const empties = [];
      for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
          if (!this.grid[row][col]) empties.push([row, col]);
        }
      }
      if (empties.length === 0) return;
      const [row, col] = empties[Math.floor(Math.random() * empties.length)];
      const value = Math.random() < 0.9 ? 2 : 4;
      this.grid[row][col] = { id: this.nextId++, value, isNew: true, isMerged: false };
    },
    clearTileFlags() {
      for (const row of this.grid) {
        for (const tile of row) {
          if (tile) {
            tile.isNew = false;
            tile.isMerged = false;
          }
        }
      }
    },
    // Desliza e funde uma linha para a esquerda. Retorna a linha resultante + pontos ganhos.
    slideRowLeft(row) {
      const tiles = row.filter(Boolean);
      const result = [];
      let gained = 0;
      let i = 0;
      while (i < tiles.length) {
        const current = tiles[i];
        const next = tiles[i + 1];
        if (next && next.value === current.value) {
          const merged = { id: this.nextId++, value: current.value * 2, isNew: false, isMerged: true };
          result.push(merged);
          gained += merged.value;
          i += 2;
        } else {
          result.push({ ...current, isNew: false, isMerged: false });
          i += 1;
        }
      }
      while (result.length < SIZE) result.push(null);
      return { row: result, gained };
    },
    applyMove(direction) {
      if (this.gameOver || (this.won && !this.keepPlaying)) return;

      let working = this.grid.map((row) => [...row]);
      if (direction === 'up' || direction === 'down') working = transpose(working);
      if (direction === 'right' || direction === 'down') working = reverseRows(working);

      let gained = 0;
      const slid = working.map((row) => {
        const res = this.slideRowLeft(row);
        gained += res.gained;
        return res.row;
      });

      let result = slid;
      if (direction === 'right' || direction === 'down') result = reverseRows(result);
      if (direction === 'up' || direction === 'down') result = transpose(result);

      const moved = JSON.stringify(this.serializeValues(this.grid)) !== JSON.stringify(this.serializeValues(result));
      if (!moved) return;

      this.clearTileFlags();
      this.grid = result;
      this.score += gained;
      if (this.score > this.best) {
        this.best = this.score;
        this.saveBest();
      }
      this.spawnTile();

      if (!this.won && this.flatTiles.some((t) => t.value >= 2048)) {
        this.won = true;
      }
      if (this.isBoardFull() && !this.hasAnyMerge()) {
        this.gameOver = true;
      }
    },
    serializeValues(grid) {
      return grid.map((row) => row.map((tile) => (tile ? tile.value : 0)));
    },
    isBoardFull() {
      return this.grid.every((row) => row.every((tile) => tile !== null));
    },
    hasAnyMerge() {
      for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
          const value = this.grid[row][col]?.value;
          if (!value) return true;
          const right = this.grid[row][col + 1]?.value;
          const down = this.grid[row + 1]?.[col]?.value;
          if (right === value || down === value) return true;
        }
      }
      return false;
    },
    handleKeydown(event) {
      const map = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down',
        a: 'left', d: 'right', w: 'up', s: 'down', A: 'left', D: 'right', W: 'up', S: 'down' };
      const direction = map[event.key];
      if (!direction) return;
      event.preventDefault();
      this.applyMove(direction);
    },
    onTouchStart(event) {
      const touch = event.changedTouches[0];
      this.touchStartX = touch.clientX;
      this.touchStartY = touch.clientY;
    },
    onTouchEnd(event) {
      const touch = event.changedTouches[0];
      const dx = touch.clientX - this.touchStartX;
      const dy = touch.clientY - this.touchStartY;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const threshold = 24;
      if (Math.max(absX, absY) < threshold) return;
      if (absX > absY) {
        this.applyMove(dx > 0 ? 'right' : 'left');
      } else {
        this.applyMove(dy > 0 ? 'down' : 'up');
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

#g2048-title { font-size: 1.3rem; margin-bottom: 10px; }
.g2048-intro { margin-bottom: var(--space-md); }
.g2048-intro p { color: var(--text-main); }

.g2048-panel {
  padding: 12px var(--space-lg);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}
.g2048-stats { display: flex; gap: var(--space-lg); }
.g2048-stat { display: flex; flex-direction: column; gap: 2px; }
.g2048-stat-label {
  font-family: var(--font-code);
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--text-muted);
}
.g2048-stat-value {
  font-family: var(--font-ui);
  font-size: 1.3rem;
  color: var(--cyan-core);
}

.g2048-board-card {
  padding: var(--space-md);
  align-items: center;
  gap: var(--space-md);
  position: relative;
  outline: none;
}

.g2048-board {
  position: relative;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 1 / 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 8px;
  padding: 8px;
  border-radius: 10px;
  background: var(--bg-surface);
  border: 1px solid var(--cyan-border);
}
.g2048-cell-bg {
  border-radius: 6px;
  background: var(--cyan-dim);
  border: 1px solid var(--cyan-border);
}
.g2048-tiles {
  position: absolute;
  inset: 8px;
}
.g2048-tile {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 4px;
  box-sizing: border-box;
  font-family: var(--font-ui);
  font-weight: 700;
  font-size: clamp(1rem, 5vw, 1.6rem);
  color: var(--text-main);
  background: var(--cyan-core);
  border: 1px solid var(--cyan-border);
  transition: transform 0.12s ease-in-out;
}
.g2048-tile--2 { opacity: 0.25; }
.g2048-tile--4 { opacity: 0.35; }
.g2048-tile--8 { opacity: 0.45; }
.g2048-tile--16 { opacity: 0.55; }
.g2048-tile--32 { opacity: 0.65; }
.g2048-tile--64 { opacity: 0.72; }
.g2048-tile--128 { opacity: 0.8; font-size: clamp(0.9rem, 4.5vw, 1.4rem); }
.g2048-tile--256 { opacity: 0.86; font-size: clamp(0.9rem, 4.5vw, 1.4rem); }
.g2048-tile--512 { opacity: 0.92; font-size: clamp(0.9rem, 4.5vw, 1.4rem); }
.g2048-tile--1024 { opacity: 0.97; color: var(--bg-base); font-size: clamp(0.75rem, 4vw, 1.2rem); }
.g2048-tile--2048 { opacity: 1; color: var(--bg-base); font-size: clamp(0.75rem, 4vw, 1.2rem); box-shadow: 0 0 16px var(--cyan-core); }

.g2048-tile--new { animation: g2048-pop 0.18s ease-out; }
.g2048-tile--merged { animation: g2048-pop 0.18s ease-out; }
@keyframes g2048-pop {
  from { transform: scale(0.4); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .g2048-tile { transition: none; }
  .g2048-tile--new, .g2048-tile--merged { animation: none; }
}

.g2048-overlay {
  position: absolute;
  inset: var(--space-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  text-align: center;
  background: var(--bg-surface);
  backdrop-filter: blur(4px);
  border: 1px dashed var(--cyan-border);
  border-radius: 10px;
  padding: var(--space-md);
}
.g2048-overlay-title {
  font-family: var(--font-code);
  color: var(--cyan-core);
  letter-spacing: 2px;
}
.g2048-overlay p { color: var(--text-main); }
.g2048-overlay-actions { display: flex; gap: var(--space-sm); flex-wrap: wrap; justify-content: center; }

@media (max-width: 768px) {
  .mm-app-bar { margin: 0 0 var(--space-md); }
  .g2048-panel { flex-direction: row; }
}
</style>

