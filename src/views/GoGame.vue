<template>
  <main id="main-content">
    <div class="go-app-bar">
      <router-link to="/arcade" class="go-app-back" aria-label="Fechar e voltar ao arcade">&larr; Arcade</router-link>
      <span class="go-app-title">Go Game</span>
    </div>

    <section id="go-game" aria-labelledby="go-game-title">
      <h2 id="go-game-title" class="section-title">Go Game — Humano vs Máquina</h2>

      <div class="hud-card go-intro" v-if="!match">
        <p>
          Implementação própria das regras de Go (Baduk/Weiqi): captura de grupos por liberdade zero,
          proibição de jogadas suicidas e regra do Ko (não repetir a posição anterior). A partida termina
          quando os dois lados passam a vez em sequência; a pontuação é por área (regras chinesas — pedras
          vivas + território), com <strong>komi de 7,5</strong> para a Branca compensar o Preto jogar primeiro.
        </p>
        <p>Você joga com as <strong>pedras pretas</strong> e começa. A máquina joga com as brancas.</p>
      </div>

      <div class="hud-card go-panel">
        <div class="go-controls-row">
          <div class="go-control-row">
            <label for="go-size">Tabuleiro</label>
            <select id="go-size" v-model.number="size" :disabled="isMatchActive">
              <option :value="9">9×9 (rápido)</option>
              <option :value="13">13×13</option>
              <option :value="19">19×19 (tradicional)</option>
            </select>
          </div>
          <div class="go-control-row">
            <label for="go-level">Nível da máquina</label>
            <select id="go-level" v-model.number="level">
              <option :value="1">1 — Fácil (aleatória)</option>
              <option :value="2">2 — Médio (heurística)</option>
              <option :value="3">3 — Difícil (Monte Carlo)</option>
            </select>
          </div>
          <button class="btn-hud btn-hud--live" @click="startNewGame">
            {{ match ? 'Novo Jogo' : 'Iniciar Partida' }}
          </button>
        </div>

        <template v-if="match">
          <div class="go-panel-divider" aria-hidden="true"></div>
          <p class="go-message" aria-live="polite">{{ message }}</p>

          <div class="go-status-row">
            <div class="go-captures">
              <span>⚫ Preto: {{ blackCaptures }} capturas</span>
              <span>⚪ Branco: {{ whiteCaptures }} capturas · komi {{ match.komi }}</span>
            </div>

            <div class="go-actions" v-if="phase === 'play'">
              <button class="btn-hud" :disabled="!isHumanTurn || isAIThinking || isAnimating" @click="passHuman">Passar</button>
              <button class="btn-hud" :disabled="isAIThinking || isAnimating" @click="resignHuman">Desistir</button>
            </div>
            <div class="go-actions" v-else-if="phase === 'scoring'">
              <button class="btn-hud" @click="resumePlayClick">Continuar Jogando</button>
              <button class="btn-hud btn-hud--live" @click="confirmScoreClick">Confirmar Placar</button>
            </div>
          </div>

          <form v-if="phase === 'play'" class="go-coord-form" @submit.prevent="submitCoordinate">
            <label for="go-coord">Jogar por coordenada</label>
            <div class="go-coord-inputs">
              <input
                id="go-coord"
                v-model="coordInput"
                type="text"
                autocomplete="off"
                :disabled="!isHumanTurn || isAIThinking || isAnimating"
                placeholder="ex.: D4"
              />
              <button type="submit" class="btn-hud" :disabled="!isHumanTurn || isAIThinking || isAnimating">Jogar</button>
            </div>
          </form>

          <p v-if="phase === 'scoring'" class="go-scoring-hint">
            Clique numa pedra do tabuleiro para marcar/desmarcar o grupo como morto. As áreas destacadas
            mostram o território estimado para cada lado com a marcação atual.
          </p>
        </template>
      </div>

      <template v-if="match">
        <div class="hud-card go-board-card">
          <div class="go-board-outer">
            <div class="go-board-frame">
              <div class="go-corner" aria-hidden="true"></div>
              <div class="go-col-labels" aria-hidden="true">
                <span v-for="x in size" :key="'cl' + x" class="go-label" :style="labelSizeStyle">{{ columnLabel(x - 1) }}</span>
              </div>
              <div class="go-row-labels" aria-hidden="true">
                <span v-for="y in size" :key="'rl' + y" class="go-label" :style="labelSizeStyle">{{ rowLabel(y - 1) }}</span>
              </div>
              <div class="go-board" :style="boardStyle" role="grid" :aria-label="`Tabuleiro de Go ${size} por ${size}`">
                <div
                  v-for="(cell, index) in cells"
                  :key="index"
                  class="go-cell"
                  :class="cellEdgeClasses(index)"
                  role="gridcell"
                >
                  <button
                    type="button"
                    class="go-point"
                    :disabled="!isCellClickable(index)"
                    :aria-label="cellAriaLabel(index)"
                    @click="onCellClick(index)"
                  >
                    <span v-if="hoshiSet.has(index) && cell === EMPTY" class="hoshi" aria-hidden="true"></span>
                    <span v-if="cell === EMPTY" class="stone-preview" aria-hidden="true"></span>
                    <span
                      v-if="cell !== EMPTY"
                      class="stone"
                      :class="[stoneClass(index), { 'stone-dead': isDeadStone(index) }]"
                      aria-hidden="true"
                    ></span>
                    <span v-if="isDeadStone(index)" class="dead-mark" aria-hidden="true">×</span>
                    <span v-if="index === lastMoveIndex" class="last-move-marker" aria-hidden="true"></span>
                    <span v-if="territoryClass(index)" class="territory-mark" :class="territoryClass(index)" aria-hidden="true"></span>
                    <span v-if="captureFlashIndices.includes(index)" class="capture-flash" aria-hidden="true"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="phase === 'finished' && finalResult" class="hud-card go-result" role="status">
          <h3 class="card-title">Fim de Jogo</h3>

          <p v-if="finalResult.resigned">
            {{ finalResult.resignedBy === BLACK ? 'Você desistiu.' : 'A máquina desistiu.' }}
            Vitória {{ finalResult.winner === BLACK ? 'do Humano (Preto)' : 'da Máquina (Branco)' }}!
          </p>
          <template v-else>
            <div class="score-table-wrap">
              <table class="score-table">
                <thead>
                  <tr>
                    <th scope="col">&nbsp;</th>
                    <th scope="col">Preto (Você)</th>
                    <th scope="col">Branco (Máquina)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Pedras vivas</th>
                    <td>{{ finalResult.blackStones }}</td>
                    <td>{{ finalResult.whiteStones }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Território</th>
                    <td>{{ finalResult.blackTerritory }}</td>
                    <td>{{ finalResult.whiteTerritory }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Komi</th>
                    <td>—</td>
                    <td>+{{ finalResult.komi }}</td>
                  </tr>
                  <tr class="score-total">
                    <th scope="row">Total</th>
                    <td>{{ finalResult.blackScore }}</td>
                    <td>{{ finalResult.whiteScore }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="result-headline">
              {{ resultHeadline }}
            </p>
          </template>

          <button class="btn-hud btn-hud--live" @click="startNewGame">Jogar Novamente</button>
        </div>
      </template>
    </section>
  </main>
</template>

<script>
import { markRaw } from 'vue';
import { BLACK, WHITE, EMPTY, hoshiPoints } from '../go/goBoard.js';
import { GoMatch } from '../go/goMatch.js';
import { chooseAIMove } from '../go/goAI.js';

const COLUMN_LETTERS = 'ABCDEFGHJKLMNOPQRST'; // convenção do Go: letras pulando o "I"
const BASE_CELL_PX = { 9: 44, 13: 34, 19: 26 };

export default {
  name: 'GoGame',
  data() {
    return {
      BLACK,
      WHITE,
      EMPTY,
      size: 9,
      level: 2,
      match: null,
      cells: [],
      currentColor: BLACK,
      phase: null,
      blackCaptures: 0,
      whiteCaptures: 0,
      lastMoveIndex: -1,
      message: 'Escolha o tamanho do tabuleiro e o nível da máquina, depois inicie a partida.',
      isAIThinking: false,
      isAnimating: false,
      captureFlashIndices: [],
      coordInput: '',
      scorePreview: null,
      finalResult: null,
      hoshiSet: new Set()
    };
  },
  computed: {
    isHumanTurn() {
      return this.currentColor === BLACK;
    },
    isMatchActive() {
      return this.phase === 'play' || this.phase === 'scoring';
    },
    boardStyle() {
      const base = BASE_CELL_PX[this.size] || 30;
      const cell = `clamp(20px, calc((92vw - 48px) / ${this.size}), ${base}px)`;
      return {
        '--cell-size': cell,
        gridTemplateColumns: `repeat(${this.size}, var(--cell-size))`,
        gridTemplateRows: `repeat(${this.size}, var(--cell-size))`
      };
    },
    labelSizeStyle() {
      const base = BASE_CELL_PX[this.size] || 30;
      const cell = `clamp(20px, calc((92vw - 48px) / ${this.size}), ${base}px)`;
      return { width: cell, height: cell };
    },
    resultHeadline() {
      const r = this.finalResult;
      if (!r) return '';
      if (r.winner === null) return `Empate! ${r.blackScore} a ${r.whiteScore}.`;
      const who = r.winner === BLACK ? 'Vitória do Humano (Preto)' : 'Vitória da Máquina (Branco)';
      return `${who} por ${r.margin.toFixed(1)} ponto(s).`;
    }
  },
  methods: {
    columnLabel(x) {
      return COLUMN_LETTERS[x] || '?';
    },
    rowLabel(y) {
      return this.size - y;
    },
    computeHoshi() {
      const set = new Set();
      hoshiPoints(this.size).forEach(([a, b]) => set.add(b * this.size + a));
      return set;
    },
    startNewGame() {
      this.match = markRaw(new GoMatch(this.size, 7.5));
      this.hoshiSet = this.computeHoshi();
      this.coordInput = '';
      this.scorePreview = null;
      this.finalResult = null;
      this.syncFromMatch();
      this.updateMessageAfterMove();
    },
    syncFromMatch() {
      if (!this.match) return;
      this.cells = Array.from(this.match.board.cells);
      this.currentColor = this.match.currentColor;
      this.phase = this.match.phase;
      this.blackCaptures = this.match.captures[BLACK];
      this.whiteCaptures = this.match.captures[WHITE];
      const lm = this.match.lastMove;
      this.lastMoveIndex = lm && !lm.pass ? this.match.board.idx(lm.x, lm.y) : -1;
      if (this.phase === 'scoring') {
        this.refreshScorePreview();
      }
      if (this.phase === 'finished') {
        this.finalResult = this.match.result;
      }
    },
    refreshScorePreview() {
      if (!this.match) return;
      this.scorePreview = this.match.computeScore();
    },
    updateMessageAfterMove() {
      if (this.phase === 'finished') {
        this.message = 'Partida encerrada — veja o resultado abaixo.';
      } else if (this.phase === 'scoring') {
        this.message = 'Ambos passaram a vez. Reveja o território, marque pedras mortas se necessário e confirme o placar (ou continue jogando).';
      } else if (this.currentColor === BLACK) {
        this.message = 'Sua vez — jogue com as pedras pretas.';
      } else {
        this.message = 'Máquina pensando...';
      }
    },
    isCellClickable(index) {
      if (!this.match) return false;
      if (this.phase === 'play') {
        return this.cells[index] === EMPTY && this.isHumanTurn && !this.isAIThinking && !this.isAnimating;
      }
      if (this.phase === 'scoring') {
        return this.cells[index] !== EMPTY;
      }
      return false;
    },
    onCellClick(index) {
      if (!this.isCellClickable(index)) return;
      const x = index % this.size;
      const y = Math.floor(index / this.size);
      if (this.phase === 'play') {
        this.attemptHumanMove(x, y);
      } else if (this.phase === 'scoring') {
        this.match.toggleDeadGroupAt(x, y);
        this.refreshScorePreview();
      }
    },
    attemptHumanMove(x, y) {
      if (!this.match || this.phase !== 'play' || !this.isHumanTurn || this.isAIThinking || this.isAnimating) return;
      const res = this.match.playAt(x, y);
      if (!res.ok) {
        this.message = res.reason || 'Jogada ilegal.';
        return;
      }
      this.applyMoveResult(res, x, y, BLACK);
    },
    // Aplica o resultado de uma jogada em duas etapas quando há captura, para dar
    // tempo do jogador perceber quais pedras foram comidas em vez de tudo mudar de uma vez.
    async applyMoveResult(res, x, y, color) {
      const capturedPositions = res.capturedPositions || [];
      if (capturedPositions.length) {
        this.isAnimating = true;
        const movedIndex = y * this.size + x;
        const interim = this.cells.slice();
        interim[movedIndex] = color;
        this.cells = interim;
        this.captureFlashIndices = capturedPositions;
        const n = capturedPositions.length;
        const who = color === BLACK ? 'Você capturou' : 'A máquina capturou';
        this.message = `${who} ${n} pedra${n > 1 ? 's' : ''}!`;
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      this.syncFromMatch();

      if (capturedPositions.length) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        this.captureFlashIndices = [];
        this.isAnimating = false;
      }

      if (this.phase === 'play' && this.currentColor === WHITE) {
        this.triggerAIMove();
      } else {
        this.updateMessageAfterMove();
      }
    },
    submitCoordinate() {
      const parsed = this.parseCoordinate(this.coordInput);
      if (!parsed) {
        this.message = 'Coordenada inválida. Use letra + número, ex.: D4 (a letra "I" não é usada).';
        return;
      }
      this.coordInput = '';
      this.attemptHumanMove(parsed.x, parsed.y);
    },
    parseCoordinate(str) {
      if (!str) return null;
      const m = String(str).trim().toUpperCase().match(/^([A-HJ-Z])\s*(\d{1,2})$/);
      if (!m) return null;
      const colIndex = COLUMN_LETTERS.indexOf(m[1]);
      if (colIndex === -1 || colIndex >= this.size) return null;
      const rowNum = parseInt(m[2], 10);
      if (rowNum < 1 || rowNum > this.size) return null;
      return { x: colIndex, y: this.size - rowNum };
    },
    passHuman() {
      if (!this.match || this.phase !== 'play' || !this.isHumanTurn || this.isAIThinking || this.isAnimating) return;
      this.match.pass();
      this.syncFromMatch();
      if (this.phase === 'play' && this.currentColor === WHITE) {
        this.triggerAIMove();
      } else {
        this.updateMessageAfterMove();
      }
    },
    resignHuman() {
      if (!this.match || this.phase !== 'play' || this.isAIThinking || this.isAnimating) return;
      this.match.resign(BLACK);
      this.syncFromMatch();
      this.updateMessageAfterMove();
    },
    confirmScoreClick() {
      if (!this.match || this.phase !== 'scoring') return;
      this.match.confirmScore();
      this.syncFromMatch();
      this.updateMessageAfterMove();
    },
    resumePlayClick() {
      if (!this.match || this.phase !== 'scoring') return;
      this.match.resumePlay();
      this.syncFromMatch();
      this.updateMessageAfterMove();
      if (this.phase === 'play' && this.currentColor === WHITE) {
        this.triggerAIMove();
      }
    },
    async triggerAIMove() {
      if (!this.match || this.phase !== 'play' || this.currentColor !== WHITE) return;
      this.isAIThinking = true;
      this.message = 'Máquina pensando...';
      await this.$nextTick();
      await new Promise((resolve) => setTimeout(resolve, 30));

      // Garante uma pausa mínima perceptível: nos níveis rápidos (fácil/médio) a IA decide
      // quase instantaneamente, o que fazia a jogada "pular" sem dar tempo de acompanhar.
      const minThinkMs = 550;
      const startedAt = performance.now();
      const move = chooseAIMove(this.match, this.level);
      const elapsed = performance.now() - startedAt;
      if (elapsed < minThinkMs) {
        await new Promise((resolve) => setTimeout(resolve, minThinkMs - elapsed));
      }

      this.isAIThinking = false;

      if (move.type === 'pass') {
        this.match.pass();
        this.syncFromMatch();
        this.updateMessageAfterMove();
        return;
      }

      const res = this.match.playAt(move.x, move.y);
      if (!res.ok) {
        // Salvaguarda: nunca deveria acontecer (a IA só propõe jogadas legais).
        this.match.pass();
        this.syncFromMatch();
        this.updateMessageAfterMove();
        return;
      }
      await this.applyMoveResult(res, move.x, move.y, WHITE);
    },
    stoneClass(index) {
      return this.cells[index] === BLACK ? 'stone-black' : 'stone-white';
    },
    isDeadStone(index) {
      return this.phase === 'scoring' && this.match && this.match.deadStones.has(index);
    },
    territoryClass(index) {
      if (this.phase !== 'scoring' || !this.scorePreview || this.cells[index] !== EMPTY) return null;
      const owner = this.scorePreview.territoryMap[index];
      if (owner === BLACK) return 'territory-black';
      if (owner === WHITE) return 'territory-white';
      return null;
    },
    cellAriaLabel(index) {
      const x = index % this.size;
      const y = Math.floor(index / this.size);
      const coord = this.columnLabel(x) + this.rowLabel(y);
      const val = this.cells[index];
      let desc = val === BLACK ? 'pedra preta' : val === WHITE ? 'pedra branca' : 'vazio';
      if (this.isDeadStone(index)) desc += ', marcada como morta';
      return `Interseção ${coord}, ${desc}`;
    },
    cellEdgeClasses(index) {
      const x = index % this.size;
      const y = Math.floor(index / this.size);
      return {
        'is-left': x === 0,
        'is-right': x === this.size - 1,
        'is-top': y === 0,
        'is-bottom': y === this.size - 1
      };
    }
  }
};
</script>

<style scoped>
/* Barra de topo compacta: substitui o cabeçalho grande do portfólio (que fica
   escondido nesta página) em qualquer tamanho de tela, sobrando mais espaço
   pro tabuleiro. */
.go-app-bar {
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
  border-bottom: 1px solid var(--accent-border);
}
.go-app-back {
  color: var(--accent-core);
  text-decoration: none;
  font-family: var(--font-ui);
  font-size: 1rem;
  text-transform: uppercase;
  white-space: nowrap;
}
.go-app-title {
  font-family: var(--font-ui);
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-main);
  font-size: 0.95rem;
}

/* Título reduzido: no jogo o espaço vertical vale mais que um título grande. */
#go-game-title {
  font-size: 1.3rem;
  margin-bottom: 10px;
}

.go-intro p {
  margin-bottom: var(--space-sm);
  color: var(--text-main);
}
.go-intro p:last-child {
  margin-bottom: 0;
}

/* Painel único (controles + status) — compacto de propósito, pra sobrar altura
   de tela pro tabuleiro, que é o que realmente importa durante a partida. */
.go-panel {
  padding: 12px var(--space-lg);
  gap: 6px;
}
.go-controls-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--space-md) var(--space-lg);
}
.go-control-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.go-control-row label {
  font-family: var(--font-code);
  font-size: 0.75rem;
  color: var(--accent-core);
  text-transform: uppercase;
}
.go-control-row select {
  background: var(--bg-surface);
  color: var(--text-main);
  border: 1px solid var(--accent-border);
  border-radius: 4px;
  padding: 6px 8px;
  font-family: var(--font-read);
  font-size: 0.9rem;
}

.go-panel-divider {
  border-top: 1px dashed var(--accent-dim);
  margin: var(--space-sm) 0;
}
.go-message {
  font-family: var(--font-ui);
  font-size: 1.05rem;
  color: var(--text-main);
  min-height: 1.4em;
}
.go-status-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm) var(--space-md);
}
.go-captures {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  font-family: var(--font-code);
  font-size: 0.8rem;
  color: var(--text-muted);
}
.go-actions {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}
.go-coord-form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  padding-top: var(--space-sm);
  border-top: 1px dashed var(--accent-dim);
}
.go-coord-form label {
  font-family: var(--font-code);
  font-size: 0.75rem;
  color: var(--text-muted);
}
.go-coord-inputs {
  display: flex;
  gap: 8px;
}
.go-coord-inputs input {
  background: var(--bg-surface);
  color: var(--text-main);
  border: 1px solid var(--accent-border);
  border-radius: 4px;
  padding: 6px 8px;
  width: 110px;
  font-family: var(--font-code);
}
.go-coord-inputs input:disabled,
.go-coord-inputs button:disabled {
  opacity: 0.5;
}
.go-scoring-hint {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 4px;
}

.go-board-card {
  padding: var(--space-sm) var(--space-md);
}
.go-board-card.hud-card:hover {
  transform: none;
  box-shadow: none;
  border-color: var(--accent-border);
}
.go-board-outer {
  overflow-x: auto;
  padding: 4px;
}
.go-board-frame {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'corner cols'
    'rows board';
  width: max-content;
  margin: 0 auto;
}
.go-corner {
  grid-area: corner;
}
.go-col-labels {
  grid-area: cols;
  display: flex;
}
.go-row-labels {
  grid-area: rows;
  display: flex;
  flex-direction: column;
}
.go-label {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-code);
  font-size: 0.7rem;
  color: var(--text-muted);
}

.go-board {
  display: grid;
  background: #dcb35c;
  border: 2px solid #8a6a2f;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
}
.high-contrast-mode .go-board {
  background: #000000;
  border-color: #ffff00;
}

.go-cell {
  position: relative;
  width: var(--cell-size);
  height: var(--cell-size);
}
.go-cell::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1.5px;
  background: #3d2c0f;
  transform: translateY(-50%);
  pointer-events: none;
}
.go-cell::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1.5px;
  background: #3d2c0f;
  transform: translateX(-50%);
  pointer-events: none;
}
.high-contrast-mode .go-cell::before,
.high-contrast-mode .go-cell::after {
  background: #ffff00;
}
.go-cell.is-left::before {
  left: 50%;
}
.go-cell.is-right::before {
  right: 50%;
}
.go-cell.is-top::after {
  top: 50%;
}
.go-cell.is-bottom::after {
  bottom: 50%;
}

.go-point {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
}
.go-point:disabled {
  cursor: default;
}

.hoshi {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18%;
  height: 18%;
  min-width: 4px;
  min-height: 4px;
  background: #3d2c0f;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.high-contrast-mode .hoshi {
  background: #ffff00;
}

.stone-preview {
  position: absolute;
  inset: 8%;
  border-radius: 50%;
  background: rgba(10, 10, 10, 0.35);
  opacity: 0;
  transition: opacity 0.15s;
}
.go-point:not(:disabled):hover .stone-preview,
.go-point:not(:disabled):focus-visible .stone-preview {
  opacity: 1;
}

.stone {
  position: absolute;
  inset: 6%;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: opacity 0.2s;
}
.stone-black {
  background: radial-gradient(circle at 32% 28%, #6a6a6a, #0a0a0a 70%);
}
.stone-white {
  background: radial-gradient(circle at 32% 28%, #ffffff, #c7c7c7 75%);
  border: 1px solid #999;
}
.stone-dead {
  opacity: 0.35;
}
.high-contrast-mode .stone-black {
  background: #000000;
  border: 2px solid #ffff00;
}
.high-contrast-mode .stone-white {
  background: #ffffff;
  border: 2px solid #000000;
}

.dead-mark {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff3b3b;
  font-weight: 700;
  font-size: calc(var(--cell-size) * 0.6);
  pointer-events: none;
}

.last-move-marker {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 26%;
  height: 26%;
  border: 2px solid var(--accent-core);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.territory-mark {
  position: absolute;
  inset: 22%;
  border-radius: 3px;
  pointer-events: none;
}
.territory-black {
  background: rgba(0, 0, 0, 0.55);
}
.territory-white {
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(0, 0, 0, 0.2);
}

/* Flash que marca as pedras capturadas, pra dar tempo do jogador perceber a captura
   em vez da pedra simplesmente sumir do tabuleiro sem aviso. */
.capture-flash {
  position: absolute;
  inset: 4%;
  border-radius: 50%;
  background: rgba(255, 70, 70, 0.55);
  box-shadow: 0 0 14px rgba(255, 70, 70, 0.85);
  animation: go-capture-pulse 0.9s ease-out forwards;
  pointer-events: none;
}
@keyframes go-capture-pulse {
  0% { opacity: 0.95; transform: scale(0.75); }
  35% { opacity: 0.9; transform: scale(1.15); }
  100% { opacity: 0; transform: scale(1.4); }
}
@media (prefers-reduced-motion: reduce) {
  .capture-flash { animation: none; opacity: 0.6; }
}

.go-result {
  gap: var(--space-md);
}
.score-table-wrap {
  overflow-x: auto;
}
.score-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-code);
  font-size: 0.9rem;
}
.score-table th,
.score-table td {
  border: 1px solid var(--accent-border);
  padding: 8px 12px;
  text-align: center;
  color: var(--text-main);
}
.score-table thead th {
  color: var(--accent-core);
}
.score-total th,
.score-total td {
  font-weight: 700;
  background: var(--accent-dim);
}
.result-headline {
  font-family: var(--font-ui);
  font-size: 1.3rem;
  color: var(--accent-core);
}

@media (max-width: 768px) {
  .go-controls-row {
    flex-direction: column;
    align-items: stretch;
  }

  #main-content {
    padding: 0 12px 24px;
  }

  .go-app-bar {
    top: 52px; /* fica logo abaixo da barra de acessibilidade, que também é sticky no topo */
    margin: 0 -12px var(--space-md);
    padding: 12px 16px;
  }

  #go-game-title {
    font-size: 1.3rem;
  }
}
</style>
