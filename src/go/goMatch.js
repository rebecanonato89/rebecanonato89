import { GoBoard, BLACK, WHITE, EMPTY, otherColor } from './goBoard.js';

export const PHASE_PLAY = 'play';
export const PHASE_SCORING = 'scoring';
export const PHASE_FINISHED = 'finished';

/**
 * Envolve o GoBoard com o fluxo de uma partida: turnos, passes, rendição,
 * fase de marcação de pedras mortas e contagem final.
 */
export class GoMatch {
  constructor(size = 9, komi = 7.5) {
    this.board = new GoBoard(size);
    this.size = size;
    this.komi = komi;
    this.currentColor = BLACK;
    this.captures = { [BLACK]: 0, [WHITE]: 0 };
    this.consecutivePasses = 0;
    this.moveLog = [];
    this.phase = PHASE_PLAY;
    this.deadStones = new Set();
    this.result = null;
    this.lastMove = null; // { x, y, color } | { pass: true, color } para destaque na UI
  }

  playAt(x, y) {
    if (this.phase !== PHASE_PLAY) return { ok: false, reason: 'Partida não está em jogo.' };
    const color = this.currentColor;
    const res = this.board.tryPlay(x, y, color);
    if (!res) return { ok: false, reason: 'Jogada ilegal.' };

    this.captures[color] += res.captured.length;
    this.moveLog.push({ color, x, y, captured: res.captured.length });
    this.lastMove = { x, y, color };
    this.consecutivePasses = 0;
    this.currentColor = otherColor(color);
    return { ok: true, captured: res.captured.length, capturedPositions: res.captured };
  }

  pass() {
    if (this.phase !== PHASE_PLAY) return { ok: false };
    const color = this.currentColor;
    this.moveLog.push({ color, pass: true });
    this.lastMove = { pass: true, color };
    this.consecutivePasses += 1;
    this.currentColor = otherColor(color);
    if (this.consecutivePasses >= 2) {
      this.phase = PHASE_SCORING;
    }
    return { ok: true, enteredScoring: this.phase === PHASE_SCORING };
  }

  resign(color) {
    this.phase = PHASE_FINISHED;
    this.result = {
      resigned: true,
      winner: otherColor(color),
      resignedBy: color
    };
    return this.result;
  }

  // Alterna o status "morto" de todo o grupo conexo em (x,y). Só vale na fase de contagem.
  toggleDeadGroupAt(x, y) {
    if (this.phase !== PHASE_SCORING) return;
    const p = this.board.idx(x, y);
    if (this.board.cells[p] === EMPTY) return;
    const { stones } = this.board.groupAndLiberties(p);
    const alreadyDead = this.deadStones.has(p);
    stones.forEach((s) => {
      if (alreadyDead) this.deadStones.delete(s);
      else this.deadStones.add(s);
    });
  }

  // Volta a fase de jogo caso os jogadores discordem da pontuação e queiram jogar mais.
  resumePlay() {
    if (this.phase !== PHASE_SCORING) return;
    this.phase = PHASE_PLAY;
    this.consecutivePasses = 0;
    this.deadStones.clear();
  }

  computeScore() {
    const { blackStones, whiteStones, blackTerritory, whiteTerritory, territoryMap } =
      this.board.computeAreaScore(this.deadStones);
    const blackScore = blackStones + blackTerritory;
    const whiteScore = whiteStones + whiteTerritory + this.komi;
    let winner;
    if (blackScore > whiteScore) winner = BLACK;
    else if (whiteScore > blackScore) winner = WHITE;
    else winner = null; // empate (raro com komi fracionário)
    return {
      blackStones,
      whiteStones,
      blackTerritory,
      whiteTerritory,
      blackScore,
      whiteScore,
      komi: this.komi,
      winner,
      margin: Math.abs(blackScore - whiteScore),
      territoryMap
    };
  }

  confirmScore() {
    if (this.phase !== PHASE_SCORING) return null;
    const score = this.computeScore();
    this.phase = PHASE_FINISHED;
    this.result = { resigned: false, ...score };
    return this.result;
  }
}
