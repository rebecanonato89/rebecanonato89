<template>
  <main id="main-content">
    <h2 class="section-title">certificacoes.log</h2>
    <CodeFileView :lines="lines" />
  </main>
</template>

<script>
import CodeFileView from '../components/CodeFileView.vue';
import { tok } from '../utils/codeLines.js';
import { educationData } from '../data/profileData.js';

export default {
  name: 'CertificacoesCode',
  components: { CodeFileView },
  computed: {
    lines() {
      const lines = [];
      educationData.forEach((item, i) => {
        lines.push([
          tok('[', 'punct'),
          tok(item.period, 'num'),
          tok('] ', 'punct'),
          tok(item.role, 'heading'),
          tok(' @ ', 'punct'),
          tok(item.company, 'key'),
        ]);
        if (item.description) {
          lines.push([tok('    // ', 'punct'), tok(item.description, 'comment')]);
        }
        if (i < educationData.length - 1) lines.push([]);
      });
      return lines;
    },
  },
};
</script>
