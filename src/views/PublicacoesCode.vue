<template>
  <main id="main-content">
    <h2 class="section-title">publicacoes.log</h2>
    <CodeFileView :lines="lines" />
  </main>
</template>

<script>
import CodeFileView from '../components/CodeFileView.vue';
import { tok } from '../utils/codeLines.js';
import { publicationsData } from '../data/profileData.js';

export default {
  name: 'PublicacoesCode',
  components: { CodeFileView },
  computed: {
    lines() {
      const lines = [];
      publicationsData.forEach((item, i) => {
        lines.push([
          tok('[', 'punct'),
          tok(item.period, 'num'),
          tok('] ', 'punct'),
          tok(item.title, 'heading'),
        ]);
        lines.push([tok('    // ', 'punct'), tok(item.venue, 'comment')]);
        if (i < publicationsData.length - 1) lines.push([]);
      });
      return lines;
    },
  },
};
</script>
