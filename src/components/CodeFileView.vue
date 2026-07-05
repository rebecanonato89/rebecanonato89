<template>
  <div class="code-file">
    <div class="code-file-body">
      <div v-for="(line, i) in lines" :key="i" class="code-line">
        <span class="code-lineno">{{ i + 1 }}</span>
        <span class="code-content">
          <template v-for="(seg, j) in line" :key="j">
            <a
              v-if="seg.href"
              :href="seg.href"
              target="_blank"
              rel="noopener noreferrer"
              :class="'tok-' + (seg.cls || 'plain') + ' tok-link'"
            >{{ seg.text }}</a>
            <span v-else :class="'tok-' + (seg.cls || 'plain')">{{ seg.text }}</span>
          </template>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// Renderiza linhas de "código" tokenizadas (gutter de números + spans coloridos
// por tipo de token) — usado pelas visões sobre.md, experiencia.log,
// certificacoes.log, deployments.json e contato.md abertas a partir do sidebar.
export default {
  name: 'CodeFileView',
  props: {
    lines: { type: Array, required: true },
  },
};
</script>

<style scoped>
.code-file {
  background: var(--code-bg);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 20px var(--card-shadow);
  overflow-x: auto;
}
.code-file-body {
  padding: var(--space-md) 0;
  font-family: var(--font-code);
  font-size: 0.88rem;
  line-height: 1.75;
}
.code-line { display: flex; padding: 0 var(--space-md); }
.code-line:hover { background: var(--ide-sidebar-hover); }
.code-lineno {
  flex-shrink: 0;
  width: 38px;
  text-align: right;
  padding-right: 18px;
  color: var(--code-lineno);
  user-select: none;
  opacity: 0.75;
}
.code-content { white-space: pre-wrap; word-break: break-word; }

.tok-plain { color: var(--code-plain); }
.tok-heading { color: var(--code-heading); font-weight: 700; }
.tok-comment { color: var(--code-comment); font-style: italic; }
.tok-string { color: var(--code-string); }
.tok-key { color: var(--code-key); }
.tok-num { color: var(--code-num); }
.tok-bool { color: var(--code-bool); }
.tok-punct { color: var(--code-punct); opacity: 0.85; }
.tok-link { text-decoration: none; border-bottom: 1px dashed currentColor; }
.tok-link:hover { color: var(--accent-core); }
</style>
