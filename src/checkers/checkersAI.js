// IA de Damas: minimax com poda alfa-beta em 3 níveis.
//  Nível 1: escolhe um lance aleatório entre os legais (captura continua obrigatória).
//  Nível 2: minimax de profundidade 4.
//  Nível 3: aprofundamento iterativo com orçamento de tempo (~900ms), até profundidade 10.

import { getLegalMoves, applyMove, WHITE } from './checkersLogic.js';

const MAN_VALUE = 100;
const KING_VALUE = 270;

// Avaliação sempre da perspectiva das brancas (positivo = melhor para brancas).
function evaluate(board) {
  let score = 0;
  for (let pos = 0; pos < 64; pos++) {
    const value = board[pos];
    if (value === 0) continue;
    const row = Math.floor(pos / 8);
    const col = pos % 8;

    if (value === 1) {
      score += MAN_VALUE + (7 - row) * 4; // avanço em direção à promoção
      if (row === 7) score += 6; // última linha protege contra damas inimigas
    } else if (value === -1) {
      score -= MAN_VALUE + row * 4;
      if (row === 0) score -= 6;
    } else if (value === 2) {
      score += KING_VALUE;
    } else if (value === -2) {
      score -= KING_VALUE;
    }

    // Leve preferência pelo centro (mais mobilidade, menos emboscada na borda)
    if (col >= 2 && col <= 5 && row >= 2 && row <= 5) {
      score += value > 0 ? 3 : -3;
    }
  }
  return score;
}

function minimax(board, colorToMove, depth, alpha, beta, deadline) {
  if (deadline && Date.now() > deadline) throw new Error('timeout');

  const moves = getLegalMoves(board, colorToMove);
  if (moves.length === 0) {
    // Quem está na vez e não tem lance, perdeu
    return colorToMove === WHITE ? -100000 - depth : 100000 + depth;
  }
  if (depth === 0) return evaluate(board);

  // Capturas maiores primeiro melhora a poda
  moves.sort((a, b) => b.captures.length - a.captures.length);

  if (colorToMove === WHITE) {
    let best = -Infinity;
    for (const move of moves) {
      const score = minimax(applyMove(board, move), -colorToMove, depth - 1, alpha, beta, deadline);
      if (score > best) best = score;
      if (best > alpha) alpha = best;
      if (alpha >= beta) break;
    }
    return best;
  }

  let best = Infinity;
  for (const move of moves) {
    const score = minimax(applyMove(board, move), -colorToMove, depth - 1, alpha, beta, deadline);
    if (score < best) best = score;
    if (best < beta) beta = best;
    if (alpha >= beta) break;
  }
  return best;
}

function bestMoveAtDepth(board, color, moves, depth, deadline) {
  let bestMove = moves[0];
  let bestScore = color === WHITE ? -Infinity : Infinity;
  for (const move of moves) {
    const score = minimax(applyMove(board, move), -color, depth - 1, -Infinity, Infinity, deadline);
    if (color === WHITE ? score > bestScore : score < bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  return bestMove;
}

export function chooseMove(board, color, level) {
  const moves = getLegalMoves(board, color);
  if (moves.length === 0) return null;
  if (moves.length === 1) return moves[0];

  if (level <= 1) {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  if (level === 2) {
    return bestMoveAtDepth(board, color, moves, 4, null);
  }

  // Nível 3: aprofundamento iterativo com limite de tempo
  const deadline = Date.now() + 900;
  let best = bestMoveAtDepth(board, color, moves, 4, null);
  for (let depth = 5; depth <= 10; depth++) {
    try {
      best = bestMoveAtDepth(board, color, moves, depth, deadline);
    } catch (error) {
      break; // estourou o orçamento de tempo: fica com a melhor da profundidade anterior
    }
  }
  return best;
}
