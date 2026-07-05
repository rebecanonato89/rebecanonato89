<template>
  <svg
    class="ide-icon"
    :class="'ide-icon--' + type"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <!-- Pastas -->
    <path v-if="type === 'folder'" d="M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6z" fill="currentColor" />
    <g v-else-if="type === 'folder-open'">
      <path d="M3 6a1 1 0 0 1 1-1h5l2 2h8a1 1 0 0 1 1 1v1H6.5a1 1 0 0 0-.95.68L3 18V6z" fill="currentColor" />
      <path d="M2.2 9.5A1 1 0 0 1 3.15 8.8h17.7a1 1 0 0 1 .95 1.32l-2.2 6.6a1 1 0 0 1-.95.68H4.4a1 1 0 0 1-.95-.68l-2.2-6.6z" fill="currentColor" opacity="0.75" />
    </g>

    <!-- Arquivo genérico -->
    <path v-else-if="type === 'file'" d="M6 2h8l4 4v16H6V2z" fill="none" stroke="currentColor" stroke-width="1.6" />

    <!-- .vue -->
    <g v-else-if="type === 'vue'">
      <path d="M6 2h8l4 4v16H6V2z" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.35" />
      <path d="M8.2 8h2l1.8 3.1L13.8 8h2l-3.8 6.4z" fill="currentColor" />
    </g>

    <!-- .js -->
    <g v-else-if="type === 'js'">
      <path d="M6 2h8l4 4v16H6V2z" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.35" />
      <text x="7.3" y="16.5" font-size="7.5" font-weight="700" fill="currentColor" font-family="monospace">JS</text>
    </g>

    <!-- .json -->
    <g v-else-if="type === 'json'">
      <path d="M6 2h8l4 4v16H6V2z" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.35" />
      <path d="M9 9.5c-1 0-1.4.5-1.4 1.3v1c0 .6-.2 1-.9 1.2.7.2.9.6.9 1.2v1c0 .8.4 1.3 1.4 1.3M15 9.5c1 0 1.4.5 1.4 1.3v1c0 .6.2 1 .9 1.2-.7.2-.9.6-.9 1.2v1c0 .8-.4 1.3-1.4 1.3" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" />
    </g>

    <!-- .md -->
    <g v-else-if="type === 'md'">
      <path d="M6 2h8l4 4v16H6V2z" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.35" />
      <path d="M7.5 15.5v-5l1.8 2.3 1.8-2.3v5M14.2 10.5v3.2M12.7 12.3l1.5 1.6 1.5-1.6" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <!-- .log -->
    <g v-else-if="type === 'log'">
      <path d="M6 2h8l4 4v16H6V2z" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.35" />
      <line x1="8" y1="10" x2="16" y2="10" stroke="currentColor" stroke-width="1.1" />
      <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" stroke-width="1.1" />
      <line x1="8" y1="16" x2="13" y2="16" stroke="currentColor" stroke-width="1.1" />
    </g>

    <!-- controle de jogo (arcade) -->
    <g v-else-if="type === 'game'">
      <path d="M7 9h10a4 4 0 0 1 4 4.6l-.5 2.4a2 2 0 0 1-3.4 1L15 15H9l-2.1 2a2 2 0 0 1-3.4-1L3 13.6A4 4 0 0 1 7 9z" fill="none" stroke="currentColor" stroke-width="1.5" />
      <line x1="7.5" y1="12" x2="7.5" y2="14.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
      <line x1="6.25" y1="13.25" x2="8.75" y2="13.25" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
      <circle cx="16.5" cy="12.5" r="0.9" fill="currentColor" />
      <circle cx="14.7" cy="14.3" r="0.9" fill="currentColor" />
    </g>

    <!-- projeto (raiz) -->
    <path v-else-if="type === 'project'" d="M4 20V6a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v2H4z M4 10h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10z" fill="currentColor" />

    <!-- terminal -->
    <g v-else-if="type === 'terminal'">
      <rect x="3" y="4" width="18" height="16" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.5" />
      <polyline points="7 9 10.5 12 7 15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="12" y1="15" x2="16.5" y2="15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </g>

    <!-- chevron (expandir) -->
    <polyline v-else-if="type === 'chevron'" points="9 6 15 12 9 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

    <!-- fechar aba -->
    <g v-else-if="type === 'close'">
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
    </g>

    <!-- morcego (tema Dracula) -->
    <path v-else-if="type === 'bat'" d="M12 6c.6-1.6 2-2.6 3.3-2 .9.4 1.2 1.5.9 2.6 1.8-.3 3.5.4 4.3 1.9.5.9.2 1.7-.6 1.8-1 .1-2-.3-2.9-.9.6 1.1.7 2.3.2 3-.5.7-1.5.6-2.3-.1-.5 1.4-1.5 2.5-2.9 2.9-1.4-.4-2.4-1.5-2.9-2.9-.8.7-1.8.8-2.3.1-.5-.7-.4-1.9.2-3-.9.6-1.9 1-2.9.9-.8-.1-1.1-.9-.6-1.8.8-1.5 2.5-2.2 4.3-1.9-.3-1.1 0-2.2.9-2.6 1.3-.6 2.7.4 3.3 2z" fill="currentColor" />

    <!-- xícara (tema Cappuccino) -->
    <g v-else-if="type === 'cup'">
      <path d="M5 9h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9z" fill="none" stroke="currentColor" stroke-width="1.6" />
      <path d="M16 10.5h1.5a2.2 2.2 0 0 1 0 4.4H16" fill="none" stroke="currentColor" stroke-width="1.6" />
      <path d="M8 6.5c0-1 1-1 1-2M11.5 6.5c0-1 1-1 1-2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" fill="none" />
    </g>

    <!-- contraste (acessibilidade) -->
    <g v-else-if="type === 'contrast'">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6" />
      <path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" />
    </g>

    <!-- git branch -->
    <g v-else-if="type === 'branch'">
      <circle cx="7" cy="6" r="2" fill="none" stroke="currentColor" stroke-width="1.5" />
      <circle cx="7" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1.5" />
      <circle cx="17" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="1.5" />
      <path d="M7 8v8M7 10a5 5 0 0 0 5 5h3M17 8v0" fill="none" stroke="currentColor" stroke-width="1.4" />
    </g>

    <!-- check -->
    <polyline v-else-if="type === 'check'" points="4 12.5 9 17.5 20 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script>
export default {
  name: 'IdeIcon',
  props: {
    type: { type: String, required: true },
  },
};
</script>

<style scoped>
.ide-icon {
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  display: inline-block;
}
</style>
