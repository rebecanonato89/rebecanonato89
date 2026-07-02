// Motor de regras do jogo de Go (Baduk/Weiqi).
// Implementação própria, sem dependências externas.

export const EMPTY = 0;
export const BLACK = 1;
export const WHITE = 2;

export function otherColor(color) {
  return color === BLACK ? WHITE : BLACK;
}

// Pontos de hoshi (estrelas) padrão por tamanho de tabuleiro.
export function hoshiPoints(size) {
  if (size === 9) {
    return [[2, 2], [2, 6], [6, 2], [6, 6], [4, 4]];
  }
  if (size === 13) {
    return [[3, 3], [3, 9], [9, 3], [9, 9], [6, 6]];
  }
  if (size === 19) {
    return [
      [3, 3], [3, 9], [3, 15],
      [9, 3], [9, 9], [9, 15],
      [15, 3], [15, 9], [15, 15]
    ];
  }
  return [];
}

/**
 * Tabuleiro de Go de baixo nível: aplica regras de captura, suicídio e ko simples.
 * Não conhece "vez de jogar", passes ou fim de partida — isso fica a cargo de GoMatch.
 */
export class GoBoard {
  constructor(size) {
    this.size = size;
    this.cells = new Int8Array(size * size);
    // Ponto proibido pela regra do ko simples para a PRÓXIMA jogada (-1 = nenhum).
    this.koPoint = -1;
  }

  clone() {
    const copy = new GoBoard(this.size);
    copy.cells.set(this.cells);
    copy.koPoint = this.koPoint;
    return copy;
  }

  inBounds(x, y) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size;
  }

  idx(x, y) {
    return y * this.size + x;
  }

  xy(index) {
    return [index % this.size, Math.floor(index / this.size)];
  }

  neighborsOf(index) {
    const size = this.size;
    const x = index % size;
    const y = Math.floor(index / size);
    const result = [];
    if (x > 0) result.push(index - 1);
    if (x < size - 1) result.push(index + 1);
    if (y > 0) result.push(index - size);
    if (y < size - 1) result.push(index + size);
    return result;
  }

  // Vizinhos diagonais (usado para heurística de "olho").
  diagonalsOf(index) {
    const size = this.size;
    const x = index % size;
    const y = Math.floor(index / size);
    const result = [];
    if (x > 0 && y > 0) result.push(index - size - 1);
    if (x < size - 1 && y > 0) result.push(index - size + 1);
    if (x > 0 && y < size - 1) result.push(index + size - 1);
    if (x < size - 1 && y < size - 1) result.push(index + size + 1);
    return result;
  }

  // Retorna { stones: number[], liberties: Set<number> } do grupo conexo em `index`.
  groupAndLiberties(index) {
    const color = this.cells[index];
    const stones = [];
    const liberties = new Set();
    const seen = new Set([index]);
    const stack = [index];
    while (stack.length) {
      const cur = stack.pop();
      stones.push(cur);
      for (const n of this.neighborsOf(cur)) {
        const c = this.cells[n];
        if (c === EMPTY) {
          liberties.add(n);
        } else if (c === color && !seen.has(n)) {
          seen.add(n);
          stack.push(n);
        }
      }
    }
    return { stones, liberties };
  }

  isLegalMove(x, y, color) {
    if (!this.inBounds(x, y)) return false;
    const p = this.idx(x, y);
    if (this.cells[p] !== EMPTY) return false;
    if (p === this.koPoint) return false;
    // Simulação rápida em clone para checar suicídio sem mutar o tabuleiro real.
    const test = this.clone();
    return test.tryPlay(x, y, color) !== null;
  }

  /**
   * Tenta jogar uma pedra `color` em (x,y). Muta o tabuleiro se a jogada for legal.
   * Retorna { captured: number[], koPoint: number } em caso de sucesso, ou null se ilegal.
   */
  tryPlay(x, y, color) {
    if (!this.inBounds(x, y)) return null;
    const p = this.idx(x, y);
    if (this.cells[p] !== EMPTY) return null;
    if (p === this.koPoint) return null;

    const opponent = otherColor(color);
    this.cells[p] = color;

    const captured = [];
    const visitedGroups = new Set();
    for (const n of this.neighborsOf(p)) {
      if (this.cells[n] === opponent && !visitedGroups.has(n)) {
        const { stones, liberties } = this.groupAndLiberties(n);
        stones.forEach((s) => visitedGroups.add(s));
        if (liberties.size === 0) {
          stones.forEach((s) => {
            this.cells[s] = EMPTY;
          });
          captured.push(...stones);
        }
      }
    }

    const own = this.groupAndLiberties(p);
    if (own.liberties.size === 0) {
      // Suicídio: desfaz tudo.
      this.cells[p] = EMPTY;
      captured.forEach((s) => {
        this.cells[s] = opponent;
      });
      return null;
    }

    let newKoPoint = -1;
    if (captured.length === 1 && own.stones.length === 1 && own.liberties.size === 1) {
      newKoPoint = captured[0];
    }
    this.koPoint = newKoPoint;

    return { captured, koPoint: newKoPoint };
  }

  countLegalMoves(color) {
    let count = 0;
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i] === EMPTY) {
        const [x, y] = this.xy(i);
        if (this.isLegalMove(x, y, color)) count++;
      }
    }
    return count;
  }

  /**
   * Heurística de "olho verdadeiro": todos os vizinhos ortogonais são da mesma cor
   * e, das diagonais existentes, no máximo 1 pode ser de outra cor (0 se o ponto
   * estiver na borda/canto). Usada para a IA evitar preencher os próprios olhos.
   */
  isLikelyEye(x, y, color) {
    const p = this.idx(x, y);
    if (this.cells[p] !== EMPTY) return false;
    for (const n of this.neighborsOf(p)) {
      if (this.cells[n] !== color) return false;
    }
    const diagonals = this.diagonalsOf(p);
    let hostileDiagonals = 0;
    const opponent = otherColor(color);
    for (const d of diagonals) {
      if (this.cells[d] === opponent) hostileDiagonals++;
    }
    const isEdge = diagonals.length < 4;
    const allowed = isEdge ? 0 : 1;
    return hostileDiagonals <= allowed;
  }

  /**
   * Pontuação por área (regras chinesas): pedras vivas no tabuleiro + território vazio
   * cercado exclusivamente por uma cor. `deadSet` (Set<number>) marca pedras consideradas
   * mortas: são removidas do tabuleiro efetivo antes do cálculo.
   */
  computeAreaScore(deadSet = new Set()) {
    const size = this.size;
    const effective = new Int8Array(this.cells);
    for (const d of deadSet) effective[d] = EMPTY;

    const territory = new Int8Array(size * size); // 0 neutro, 1 preto, 2 branco
    const visited = new Uint8Array(size * size);

    const neighborsOf = (index) => this.neighborsOf(index);

    for (let i = 0; i < effective.length; i++) {
      if (effective[i] !== EMPTY || visited[i]) continue;
      const region = [];
      const borderColors = new Set();
      const stack = [i];
      visited[i] = 1;
      while (stack.length) {
        const cur = stack.pop();
        region.push(cur);
        for (const n of neighborsOf(cur)) {
          if (effective[n] === EMPTY) {
            if (!visited[n]) {
              visited[n] = 1;
              stack.push(n);
            }
          } else {
            borderColors.add(effective[n]);
          }
        }
      }
      let owner = 0;
      if (borderColors.size === 1) {
        owner = [...borderColors][0];
      }
      for (const r of region) territory[r] = owner;
    }

    let blackStones = 0;
    let whiteStones = 0;
    let blackTerritory = 0;
    let whiteTerritory = 0;
    for (let i = 0; i < effective.length; i++) {
      if (effective[i] === BLACK) blackStones++;
      else if (effective[i] === WHITE) whiteStones++;
      else if (territory[i] === BLACK) blackTerritory++;
      else if (territory[i] === WHITE) whiteTerritory++;
    }

    return {
      blackStones,
      whiteStones,
      blackTerritory,
      whiteTerritory,
      territoryMap: territory
    };
  }
}
