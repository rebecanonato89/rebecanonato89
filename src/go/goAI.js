import { BLACK, otherColor, EMPTY } from './goBoard.js';

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function emptyIndices(board) {
  const out = [];
  for (let i = 0; i < board.cells.length; i++) {
    if (board.cells[i] === EMPTY) out.push(i);
  }
  return out;
}

// Jogadas legais (sem suicídio/ko) que não preenchem um olho próprio óbvio.
function candidateMoves(board, color, { allowEyeFill = false } = {}) {
  const candidates = [];
  const empties = emptyIndices(board);
  for (const p of empties) {
    const [x, y] = board.xy(p);
    if (!allowEyeFill && board.isLikelyEye(x, y, color)) continue;
    const test = board.clone();
    const res = test.tryPlay(x, y, color);
    if (!res) continue;
    candidates.push({ index: p, x, y, captured: res.captured.length });
  }
  return candidates;
}

// ---------- Nível 1: Fácil (aleatório com bom senso mínimo) ----------
function level1Move(board, color) {
  const candidates = candidateMoves(board, color);
  if (candidates.length === 0) return { type: 'pass' };

  const capturingMoves = candidates.filter((c) => c.captured > 0);
  if (capturingMoves.length && Math.random() < 0.7) {
    return { type: 'play', ...pick(capturingMoves) };
  }
  return { type: 'play', ...pick(shuffle(candidates)) };
}

// ---------- Heurística compartilhada (níveis 2 e 3) ----------
function evaluateMove(board, color, x, y) {
  const opponent = otherColor(color);
  const test = board.clone();
  const res = test.tryPlay(x, y, color);
  if (!res) return null;

  let score = 0;
  score += res.captured.length * 15;

  const p = test.idx(x, y);
  const own = test.groupAndLiberties(p);
  score += Math.min(own.liberties.size, 6) * 2;
  if (own.liberties.size === 1) score -= 12;

  const checkedGroups = new Set();
  for (const n of test.neighborsOf(p)) {
    if (test.cells[n] === opponent && !checkedGroups.has(n)) {
      const g = test.groupAndLiberties(n);
      g.stones.forEach((s) => checkedGroups.add(s));
      if (g.liberties.size === 1) score += 8;
    }
  }

  let adjFriend = 0;
  for (const n of board.neighborsOf(board.idx(x, y))) {
    if (board.cells[n] === color) adjFriend++;
  }
  score += adjFriend * 1.5;

  const size = board.size;
  const edgeDist = Math.min(x, y, size - 1 - x, size - 1 - y);
  score += Math.min(edgeDist, 3);

  score += Math.random() * 3;
  return score;
}

function quickScoreEstimate(board, color) {
  const estimate = board.computeAreaScore();
  const own = color === BLACK
    ? estimate.blackStones + estimate.blackTerritory
    : estimate.whiteStones + estimate.whiteTerritory;
  const opp = color === BLACK
    ? estimate.whiteStones + estimate.whiteTerritory
    : estimate.blackStones + estimate.blackTerritory;
  return own - opp;
}

// ---------- Nível 2: Médio (heurística gulosa com leve aleatoriedade) ----------
function level2Move(board, color) {
  const candidates = candidateMoves(board, color);
  if (candidates.length === 0) return { type: 'pass' };

  let bestScore = -Infinity;
  for (const c of candidates) {
    const score = evaluateMove(board, color, c.x, c.y);
    c.score = score ?? -999;
    if (c.score > bestScore) bestScore = c.score;
  }

  if (bestScore < 1 && quickScoreEstimate(board, color) >= 0) {
    return { type: 'pass' };
  }

  candidates.sort((a, b) => b.score - a.score);
  const top = candidates.filter((c) => c.score >= bestScore - 2);
  const choice = pick(top);
  return { type: 'play', x: choice.x, y: choice.y };
}

// ---------- Nível 3: Difícil (Monte Carlo com orçamento de tempo) ----------
function randomPlayoutPolicy(board, color) {
  const empties = shuffle(emptyIndices(board));
  for (const p of empties) {
    const [x, y] = board.xy(p);
    if (board.isLikelyEye(x, y, color)) continue;
    if (board.tryPlay(x, y, color)) return true;
  }
  return false;
}

function runPlayout(board, color, maxMoves) {
  const work = board.clone();
  let toMove = color;
  let passesInRow = 0;
  let moves = 0;
  while (passesInRow < 2 && moves < maxMoves) {
    const played = randomPlayoutPolicy(work, toMove);
    passesInRow = played ? 0 : passesInRow + 1;
    toMove = otherColor(toMove);
    moves++;
  }
  return work.computeAreaScore();
}

function scoreMarginFor(color, areaScore, komi) {
  const blackScore = areaScore.blackStones + areaScore.blackTerritory;
  const whiteScore = areaScore.whiteStones + areaScore.whiteTerritory + komi;
  return color === BLACK ? blackScore - whiteScore : whiteScore - blackScore;
}

function level3Move(board, color, komi, budgetMs) {
  const candidates = candidateMoves(board, color);
  if (candidates.length === 0) return { type: 'pass' };

  const scored = candidates
    .map((c) => ({ ...c, heuristic: evaluateMove(board, color, c.x, c.y) ?? -999 }))
    .sort((a, b) => b.heuristic - a.heuristic);

  const maxCandidates = board.size <= 9 ? 14 : board.size <= 13 ? 10 : 8;
  const pool = scored.slice(0, maxCandidates).map((c) => ({ ...c, total: 0, count: 0 }));
  const maxMoves = board.size * board.size * 2;
  const deadline = performance.now() + budgetMs;

  let round = 0;
  const hardCap = pool.length * 500;
  while (performance.now() < deadline && round < hardCap) {
    const target = pool[round % pool.length];
    const test = board.clone();
    test.tryPlay(target.x, target.y, color);
    const area = runPlayout(test, otherColor(color), maxMoves);
    target.total += scoreMarginFor(color, area, komi);
    target.count += 1;
    round++;
  }

  let best = pool[0];
  let bestAvg = -Infinity;
  for (const r of pool) {
    const avg = r.count ? r.total / r.count : r.heuristic;
    if (avg > bestAvg) {
      bestAvg = avg;
      best = r;
    }
  }
  return { type: 'play', x: best.x, y: best.y };
}

// ---------- Ponto de entrada ----------
export function chooseAIMove(match, level) {
  const board = match.board;
  const color = match.currentColor;

  // Salvaguarda: evita partidas infinitas em caso de comportamento inesperado.
  if (match.moveLog.length > board.size * board.size * 3) {
    return { type: 'pass' };
  }

  if (level === 1) return level1Move(board, color);
  if (level === 2) return level2Move(board, color);

  const budgetMs = board.size <= 9 ? 1200 : board.size <= 13 ? 1800 : 2400;
  return level3Move(board, color, match.komi, budgetMs);
}
