// Helpers para transformar dados estruturados em "linhas de código" tokenizadas
// (usadas pelas visões sobre.md, experiencia.log, certificacoes.log,
// deployments.json e contato.md, renderizadas pelo componente CodeFileView).

export function tok(text, cls, href) {
  return href ? { text, cls, href } : { text, cls };
}

function indentTok(depth) {
  return tok('  '.repeat(depth), 'plain');
}

function scalarTokens(value) {
  if (typeof value === 'string') {
    const quoted = JSON.stringify(value);
    if (/^https?:\/\//.test(value) || /^mailto:/.test(value)) {
      return [tok(quoted, 'string', value)];
    }
    return [tok(quoted, 'string')];
  }
  if (typeof value === 'number') return [tok(String(value), 'num')];
  if (typeof value === 'boolean') return [tok(String(value), 'bool')];
  if (value === null) return [tok('null', 'bool')];
  return [tok(String(value), 'plain')];
}

function emitValue(value, depth, lines, hasComma) {
  const comma = hasComma ? ',' : '';
  if (Array.isArray(value)) {
    if (!value.length) {
      lines.push([indentTok(depth), tok('[]' + comma, 'punct')]);
      return;
    }
    lines.push([indentTok(depth), tok('[', 'punct')]);
    value.forEach((item, i) => emitValue(item, depth + 1, lines, i < value.length - 1));
    lines.push([indentTok(depth), tok(']' + comma, 'punct')]);
  } else if (value !== null && typeof value === 'object') {
    const keys = Object.keys(value);
    if (!keys.length) {
      lines.push([indentTok(depth), tok('{}' + comma, 'punct')]);
      return;
    }
    lines.push([indentTok(depth), tok('{', 'punct')]);
    keys.forEach((key, i) => emitEntry(key, value[key], depth + 1, lines, i === keys.length - 1));
    lines.push([indentTok(depth), tok('}' + comma, 'punct')]);
  } else {
    lines.push([indentTok(depth), ...scalarTokens(value), tok(comma, 'punct')]);
  }
}

function emitEntry(key, value, depth, lines, isLast) {
  const comma = isLast ? '' : ',';
  const isArr = Array.isArray(value);
  const isObj = value !== null && typeof value === 'object' && !isArr;
  if (isArr || isObj) {
    const empty = isArr ? value.length === 0 : Object.keys(value).length === 0;
    if (empty) {
      lines.push([indentTok(depth), tok('"' + key + '"', 'key'), tok(': ', 'punct'), tok((isArr ? '[]' : '{}') + comma, 'punct')]);
      return;
    }
    lines.push([indentTok(depth), tok('"' + key + '"', 'key'), tok(': ', 'punct'), tok(isArr ? '[' : '{', 'punct')]);
    if (isArr) {
      value.forEach((item, i) => emitValue(item, depth + 1, lines, i < value.length - 1));
    } else {
      const keys = Object.keys(value);
      keys.forEach((k, i) => emitEntry(k, value[k], depth + 1, lines, i === keys.length - 1));
    }
    lines.push([indentTok(depth), tok((isArr ? ']' : '}') + comma, 'punct')]);
  } else {
    lines.push([indentTok(depth), tok('"' + key + '"', 'key'), tok(': ', 'punct'), ...scalarTokens(value), tok(comma, 'punct')]);
  }
}

// Converte um valor JS (array/objeto) em linhas de tokens no formato JSON real.
export function toJsonLines(value) {
  const lines = [];
  emitValue(value, 0, lines, false);
  return lines;
}
