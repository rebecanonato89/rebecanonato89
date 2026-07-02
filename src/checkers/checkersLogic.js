// Lógica de Damas (regras brasileiras) implementada do zero, sem bibliotecas.
// Tabuleiro 8x8 representado como array de 64 posições (índice = linha * 8 + coluna).
// Apenas as casas escuras ((linha + coluna) % 2 === 1) são jogáveis.
//
// Valores das casas:
//   0  vazio
//   1  pedra branca   2  dama branca   (humano, parte de baixo, sobe)
//  -1  pedra preta   -2  dama preta    (máquina, parte de cima, desce)
//
// Regras implementadas:
//  - Captura obrigatória, incluindo captura para trás pelas pedras simples.
//  - Lei da maioria: entre as capturas possíveis, vale a que toma mais peças.
//  - Dama voadora: move e captura a qualquer distância na diagonal.
//  - Peças capturadas só saem do tabuleiro no fim do lance (bloqueiam o caminho
//    e não podem ser puladas duas vezes).
//  - Promoção apenas quando a pedra TERMINA o lance na última linha.

export const SIZE = 8;
export const WHITE = 1;
export const BLACK = -1;

const DIRS = [
  [-1, -1], [-1, 1],
  [1, -1], [1, 1],
];

export function createInitialBoard() {
  const board = new Array(64).fill(0);
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) board[row * 8 + col] = -1;
    }
  }
  for (let row = 5; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) board[row * 8 + col] = 1;
    }
  }
  return board;
}

export function rowOf(index) { return Math.floor(index / 8); }
export function colOf(index) { return index % 8; }

function inBoard(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function colorOf(value) {
  if (value > 0) return WHITE;
  if (value < 0) return BLACK;
  return 0;
}

function isKing(value) { return value === 2 || value === -2; }

// --- Capturas de pedra simples (pula casa adjacente, pra frente ou pra trás) ---
function manCaptureSequences(board, pos, color, captured, path) {
  const sequences = [];
  const row = rowOf(pos);
  const col = colOf(pos);

  for (const [dr, dc] of DIRS) {
    const midRow = row + dr, midCol = col + dc;
    const landRow = row + 2 * dr, landCol = col + 2 * dc;
    if (!inBoard(landRow, landCol)) continue;

    const mid = midRow * 8 + midCol;
    const land = landRow * 8 + landCol;
    if (colorOf(board[mid]) !== -color || captured.includes(mid)) continue;
    if (board[land] !== 0) continue;

    const nextCaptured = [...captured, mid];
    const nextPath = [...path, land];
    const deeper = manCaptureSequences(board, land, color, nextCaptured, nextPath);
    if (deeper.length > 0) {
      sequences.push(...deeper);
    } else {
      sequences.push({ path: nextPath, captures: nextCaptured });
    }
  }
  return sequences;
}

// --- Capturas de dama (voadora: varre a diagonal, pousa em qualquer casa livre após a peça) ---
function kingCaptureSequences(board, pos, color, captured, path) {
  const sequences = [];
  const row = rowOf(pos);
  const col = colOf(pos);

  for (const [dr, dc] of DIRS) {
    let r = row + dr, c = col + dc;
    // Avança pelas casas vazias até achar a primeira peça na diagonal
    while (inBoard(r, c) && board[r * 8 + c] === 0) { r += dr; c += dc; }
    if (!inBoard(r, c)) continue;

    const target = r * 8 + c;
    // Peça própria ou já capturada neste lance bloqueia a diagonal
    if (colorOf(board[target]) !== -color || captured.includes(target)) continue;

    // Casas de pouso: todas as vazias imediatamente após a peça capturada
    let lr = r + dr, lc = c + dc;
    while (inBoard(lr, lc) && board[lr * 8 + lc] === 0) {
      const land = lr * 8 + lc;
      const nextCaptured = [...captured, target];
      const nextPath = [...path, land];
      const deeper = kingCaptureSequences(board, land, color, nextCaptured, nextPath);
      if (deeper.length > 0) {
        sequences.push(...deeper);
      } else {
        sequences.push({ path: nextPath, captures: nextCaptured });
      }
      lr += dr; lc += dc;
    }
  }
  return sequences;
}

function captureSequencesFor(board, pos) {
  const value = board[pos];
  const color = colorOf(value);
  // A peça sai da origem durante o lance (a casa fica livre para pouso)
  const working = board.slice();
  working[pos] = 0;
  return isKing(value)
    ? kingCaptureSequences(working, pos, color, [], [])
    : manCaptureSequences(working, pos, color, [], []);
}

function simpleMovesFor(board, pos) {
  const value = board[pos];
  const color = colorOf(value);
  const row = rowOf(pos);
  const col = colOf(pos);
  const moves = [];

  if (isKing(value)) {
    for (const [dr, dc] of DIRS) {
      let r = row + dr, c = col + dc;
      while (inBoard(r, c) && board[r * 8 + c] === 0) {
        moves.push({ from: pos, path: [r * 8 + c], captures: [] });
        r += dr; c += dc;
      }
    }
  } else {
    // Pedra simples só anda pra frente (branca sobe, preta desce)
    const forward = color === WHITE ? -1 : 1;
    for (const dc of [-1, 1]) {
      const r = row + forward, c = col + dc;
      if (inBoard(r, c) && board[r * 8 + c] === 0) {
        moves.push({ from: pos, path: [r * 8 + c], captures: [] });
      }
    }
  }
  return moves;
}

// Retorna todos os lances legais de `color`, já aplicando captura obrigatória
// e a lei da maioria (só valem as sequências com o número máximo de capturas).
export function getLegalMoves(board, color) {
  const captureMoves = [];
  for (let pos = 0; pos < 64; pos++) {
    if (colorOf(board[pos]) !== color) continue;
    for (const seq of captureSequencesFor(board, pos)) {
      captureMoves.push({ from: pos, path: seq.path, captures: seq.captures });
    }
  }

  if (captureMoves.length > 0) {
    const max = Math.max(...captureMoves.map((m) => m.captures.length));
    return captureMoves.filter((m) => m.captures.length === max);
  }

  const moves = [];
  for (let pos = 0; pos < 64; pos++) {
    if (colorOf(board[pos]) !== color) continue;
    moves.push(...simpleMovesFor(board, pos));
  }
  return moves;
}

export function applyMove(board, move) {
  const next = board.slice();
  const value = next[move.from];
  next[move.from] = 0;
  for (const captured of move.captures) next[captured] = 0;

  const destination = move.path[move.path.length - 1];
  const destRow = rowOf(destination);
  const promotes =
    !isKing(value) &&
    ((colorOf(value) === WHITE && destRow === 0) ||
      (colorOf(value) === BLACK && destRow === 7));

  next[destination] = promotes ? value * 2 : value;
  return next;
}

export function countPieces(board, color) {
  let men = 0, kings = 0;
  for (const value of board) {
    if (colorOf(value) === color) {
      if (isKing(value)) kings++; else men++;
    }
  }
  return { men, kings, total: men + kings };
}

// Situação da partida para quem está na vez: 'playing' ou 'lost'
// (sem peças ou sem lances legais = derrota de quem joga).
export function getStatus(board, colorToMove) {
  if (countPieces(board, colorToMove).total === 0) return 'lost';
  if (getLegalMoves(board, colorToMove).length === 0) return 'lost';
  return 'playing';
}
