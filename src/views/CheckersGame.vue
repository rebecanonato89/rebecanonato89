<template>
  <main id="main-content">
    <div class="dm-app-bar">
      <router-link to="/arcade" class="dm-app-back" aria-label="Voltar ao arcade">&larr; Arcade</router-link>
      <span class="dm-app-title">Damas</span>
    </div>

    <section id="checkers-game" aria-labelledby="checkers-title">
      <h2 id="checkers-title" class="section-title">Damas — Humano vs Máquina</h2>

      <div class="hud-card dm-intro" v-if="!started">
        <p>
          Damas nas <strong>regras brasileiras</strong>, implementadas do zero: captura obrigatória
          (inclusive para trás pelas pedras), <strong>lei da maioria</strong> (vale a sequência que captura
          mais peças), <strong>dama voadora</strong> e capturas em cadeia. A máquina joga com busca
          minimax e poda alfa-beta.
        </p>
        <p>Você joga com as <strong>peças claras</strong> (parte de baixo) e começa. Clique numa peça e depois na casa de destino — em capturas múltiplas, clique casa por casa.</p>
      </div>

      <div class="hud-card dm-panel">
        <div class="dm-controls-row">
          <div class="dm-control-row">
            <label for="dm-level">Nível da máquina</label>
            <select id="dm-level" v-model.number="level">
              <option :value="1">1 — Fácil (aleatória)</option>
              <option :value="2">2 — Médio (minimax raso)</option>
              <option :value="3">3 — Difícil (busca profunda)</option>
            </select>
          </div>
          <button class="btn-hud btn-hud--live" @click="startNewGame">
            {{ started ? 'Novo Jogo' : 'Iniciar Partida' }}
          </button>
          <button v-if="started && !gameOver" class="btn-hud" :disabled="isAIThinking" @click="resign">Desistir</button>
        </div>

        <template v-if="started">
          <div class="dm-panel-divider" aria-hidden="true"></div>
          <p class="dm-message" aria-live="polite">{{ message }}</p>
          <div class="dm-counts">
            <span>⛀ Você: {{ whiteCount.total }} peças ({{ whiteCount.kings }} damas)</span>
            <span>⛂ Máquina: {{ blackCount.total }} peças ({{ blackCount.kings }} damas)</span>
          </div>
        </template>
      </div>

      <div v-if="started" class="hud-card dm-board-card">
        <div class="dm-board" role="grid" aria-label="Tabuleiro de damas 8 por 8">
          <button
            v-for="index in 64"
            :key="index - 1"
            type="button"
            class="dm-square"
            :class="squareClasses(index - 1)"
            role="gridcell"
            :disabled="!isSquareClickable(index - 1)"
            :aria-label="squareAriaLabel(index - 1)"
            @click="onSquareClick(index - 1)"
          >
            <span v-if="displayBoard[index - 1] !== 0" class="dm-piece" :class="pieceClasses(index - 1)" aria-hidden="true">
              <span v-if="Math.abs(displayBoard[index - 1]) === 2" class="dm-crown">♛</span>
            </span>
            <span v-if="isTargetSquare(index - 1)" class="dm-target" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import {
  createInitialBoard,
  getLegalMoves,
  applyMove,
  countPieces,
  WHITE,
  BLACK,
} from '../checkers/checkersLogic.js';
import { chooseMove } from '../checkers/checkersAI.js';

export default {
  name: 'CheckersGame',
  data() {
    return {
      level: 2,
      started: false,
      board: [],
      turn: WHITE,
      selected: null,      // casa da peça escolhida pelo humano
      candidates: [],      // lances legais da peça escolhida, filtrados pelo caminho já clicado
      stepIndex: 0,        // quantas casas do caminho o humano já clicou
      legalMoves: [],
      lastMoveSquares: [], // origem + caminho do último lance (destaque visual)
      isAIThinking: false,
      gameOver: false,
      message: '',
      quietKingMoves: 0,   // lances de dama sem captura (regra de empate)
    };
  },
  computed: {
    whiteCount() { return countPieces(this.board, WHITE); },
    blackCount() { return countPieces(this.board, BLACK); },
    isHumanTurn() { return this.turn === WHITE && !this.gameOver && !this.isAIThinking; },
    mustCapture() {
      return this.legalMoves.length > 0 && this.legalMoves[0].captures.length > 0;
    },
    // Tabuleiro exibido: durante uma captura múltipla do humano, a peça aparece
    // na casa intermediária já clicada (as capturadas só saem no fim do lance).
    displayBoard() {
      if (this.selected === null || this.stepIndex === 0) return this.board;
      const shown = this.board.slice();
      const current = this.candidates[0].path[this.stepIndex - 1];
      shown[current] = shown[this.selected];
      shown[this.selected] = 0;
      return shown;
    },
  },
  methods: {
    startNewGame() {
      this.board = createInitialBoard();
      this.turn = WHITE;
      this.started = true;
      this.gameOver = false;
      this.isAIThinking = false;
      this.selected = null;
      this.candidates = [];
      this.stepIndex = 0;
      this.lastMoveSquares = [];
      this.quietKingMoves = 0;
      this.refreshLegalMoves();
      this.message = 'Sua vez. Você joga com as peças claras.';
    },
    refreshLegalMoves() {
      this.legalMoves = getLegalMoves(this.board, this.turn);
    },
    isDark(index) {
      return (Math.floor(index / 8) + (index % 8)) % 2 === 1;
    },
    squareClasses(index) {
      return {
        'dm-square--dark': this.isDark(index),
        'dm-square--selected': this.currentPieceSquare() === index,
        'dm-square--last': this.lastMoveSquares.includes(index),
      };
    },
    pieceClasses(index) {
      const value = this.displayBoard[index];
      return {
        'dm-piece--white': value > 0,
        'dm-piece--black': value < 0,
      };
    },
    // Casa onde está a peça em movimento (origem ou casa intermediária clicada)
    currentPieceSquare() {
      if (this.selected === null) return null;
      if (this.stepIndex === 0) return this.selected;
      return this.candidates[0].path[this.stepIndex - 1];
    },
    targetSquares() {
      if (this.selected === null || this.gameOver || !this.isHumanTurn) return [];
      return [...new Set(this.candidates.map((m) => m.path[this.stepIndex]))];
    },
    isTargetSquare(index) {
      return this.targetSquares().includes(index);
    },
    isSquareClickable(index) {
      if (!this.isHumanTurn) return false;
      if (this.isTargetSquare(index)) return true;
      // Só permite trocar de peça antes de iniciar a sequência de cliques
      if (this.stepIndex === 0) {
        return this.legalMoves.some((m) => m.from === index);
      }
      return false;
    },
    squareAriaLabel(index) {
      const row = 8 - Math.floor(index / 8);
      const col = String.fromCharCode(97 + (index % 8));
      const value = this.displayBoard[index];
      let piece = 'casa vazia';
      if (value === 1) piece = 'sua pedra';
      if (value === 2) piece = 'sua dama';
      if (value === -1) piece = 'pedra da máquina';
      if (value === -2) piece = 'dama da máquina';
      return `${col}${row}: ${piece}`;
    },
    onSquareClick(index) {
      if (!this.isHumanTurn) return;

      if (this.isTargetSquare(index)) {
        this.candidates = this.candidates.filter((m) => m.path[this.stepIndex] === index);
        this.stepIndex++;
        const pathLength = this.candidates[0].path.length;
        if (this.stepIndex >= pathLength) {
          this.playHumanMove(this.candidates[0]);
        } else {
          this.message = 'Captura em cadeia: continue clicando nas casas.';
        }
        return;
      }

      // Seleção (ou troca) de peça
      const moves = this.legalMoves.filter((m) => m.from === index);
      if (moves.length > 0) {
        this.selected = index;
        this.candidates = moves;
        this.stepIndex = 0;
        this.message = this.mustCapture
          ? 'Captura obrigatória! Clique na casa de destino.'
          : 'Clique na casa de destino.';
      }
    },
    playHumanMove(move) {
      this.executeMove(move);
      this.selected = null;
      this.candidates = [];
      this.stepIndex = 0;
      if (this.gameOver) return;
      this.message = 'Máquina pensando…';
      this.isAIThinking = true;
      // setTimeout libera o navegador pra pintar o lance humano antes da busca da IA
      setTimeout(() => this.playAIMove(), 350);
    },
    playAIMove() {
      const move = chooseMove(this.board, BLACK, this.level);
      this.isAIThinking = false;
      if (!move) {
        this.finish('Você venceu! A máquina não tem lances.');
        return;
      }
      this.executeMove(move);
      if (!this.gameOver) {
        this.message = this.mustCapture
          ? 'Sua vez — captura obrigatória!'
          : 'Sua vez.';
      }
    },
    executeMove(move) {
      const movingValue = this.board[move.from];
      this.board = applyMove(this.board, move);
      this.lastMoveSquares = [move.from, ...move.path];

      // Regra de empate: 40 lances seguidos de dama sem captura
      if (move.captures.length === 0 && Math.abs(movingValue) === 2) {
        this.quietKingMoves++;
      } else {
        this.quietKingMoves = 0;
      }
      if (this.quietKingMoves >= 40) {
        this.finish('Empate: 40 lances de dama sem captura.');
        return;
      }

      this.turn = -this.turn;
      this.refreshLegalMoves();

      if (this.legalMoves.length === 0) {
        this.finish(this.turn === WHITE
          ? 'A máquina venceu. Sem lances disponíveis para você.'
          : 'Você venceu! A máquina ficou sem lances.');
      }
    },
    finish(text) {
      this.gameOver = true;
      this.message = text;
    },
    resign() {
      this.finish('Você desistiu. Vitória da máquina — bora de revanche?');
    },
  },
};
</script>

<style scoped>
.dm-app-bar {
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
.dm-app-back {
  color: var(--cyan-core);
  text-decoration: none;
  font-family: var(--font-ui);
  font-size: 1rem;
  text-transform: uppercase;
  white-space: nowrap;
}
.dm-app-title {
  font-family: var(--font-ui);
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-main);
  font-size: 0.95rem;
}

#checkers-title {
  font-size: 1.3rem;
  margin-bottom: 10px;
}

.dm-intro p {
  margin-bottom: var(--space-sm);
  color: var(--text-main);
}
.dm-intro p:last-child { margin-bottom: 0; }
.dm-intro { margin-bottom: var(--space-md); }

.dm-panel {
  padding: 12px var(--space-lg);
  gap: 6px;
  margin-bottom: var(--space-md);
}
.dm-controls-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--space-md) var(--space-lg);
}
.dm-control-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.dm-control-row label {
  font-family: var(--font-code);
  font-size: 0.75rem;
  color: var(--cyan-core);
  text-transform: uppercase;
}
.dm-control-row select {
  background: var(--bg-surface);
  color: var(--text-main);
  border: 1px solid var(--cyan-border);
  border-radius: 4px;
  padding: 6px 8px;
  font-family: var(--font-read);
  font-size: 0.9rem;
}
.dm-panel-divider {
  border-top: 1px dashed var(--cyan-dim);
  margin: var(--space-sm) 0;
}
.dm-message {
  font-family: var(--font-ui);
  font-size: 1.05rem;
  color: var(--text-main);
  min-height: 1.4em;
}
.dm-counts {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  font-family: var(--font-code);
  font-size: 0.8rem;
  color: var(--text-muted);
}

.dm-board-card {
  padding: var(--space-md);
  align-items: center;
}
.dm-board {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: min(92vw, 560px);
  aspect-ratio: 1;
  border: 2px solid var(--cyan-border);
  box-shadow: 0 0 25px var(--cyan-dim);
}
.dm-square {
  position: relative;
  border: none;
  padding: 0;
  background: rgba(230, 240, 255, 0.08);
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dm-square--dark {
  background: rgba(0, 229, 255, 0.14);
}
.light-mode .dm-square { background: #e8eef6; }
.light-mode .dm-square--dark { background: #9db8d4; }
.dm-square:not(:disabled) { cursor: pointer; }
.dm-square--selected {
  outline: 2px solid var(--cyan-core);
  outline-offset: -2px;
}
.dm-square--last {
  box-shadow: inset 0 0 0 2px rgba(0, 229, 255, 0.45);
}

.dm-piece {
  width: 76%;
  height: 76%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(0.9rem, 3.4vw, 1.5rem);
}
.dm-piece--white {
  background: radial-gradient(circle at 33% 30%, #ffffff, #b8c6d4 70%);
  border: 1px solid #8fa3b5;
  color: #1a2733;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}
.dm-piece--black {
  background: radial-gradient(circle at 33% 30%, #3c4654, #0b111a 75%);
  border: 1px solid #05080d;
  color: #00e5ff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
}
.dm-crown { line-height: 1; }

.dm-target {
  position: absolute;
  width: 34%;
  height: 34%;
  border-radius: 50%;
  background: var(--cyan-core);
  opacity: 0.55;
  animation: dm-pulse 1.2s ease-in-out infinite;
  pointer-events: none;
}
@keyframes dm-pulse {
  0%, 100% { transform: scale(0.85); opacity: 0.45; }
  50% { transform: scale(1); opacity: 0.75; }
}
@media (prefers-reduced-motion: reduce) {
  .dm-target { animation: none; }
}

.high-contrast-mode .dm-square { background: #1a1a1a; }
.high-contrast-mode .dm-square--dark { background: #333300; }
.high-contrast-mode .dm-target { background: #ffff00; }

@media (max-width: 768px) {
  .dm-app-bar { margin: 0 0 var(--space-md); }
  .dm-board { width: min(96vw, 560px); }
}
</style>
