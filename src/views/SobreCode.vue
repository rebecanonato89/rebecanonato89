<template>
  <main id="main-content">
    <h2 class="section-title">sobre.md</h2>
    <CodeFileView :lines="lines" />
  </main>
</template>

<script>
import CodeFileView from '../components/CodeFileView.vue';
import { tok } from '../utils/codeLines.js';
import { aboutData } from '../data/profileData.js';

export default {
  name: 'SobreCode',
  components: { CodeFileView },
  computed: {
    lines() {
      const lines = [];
      lines.push([tok('# sobre.md', 'heading')]);
      lines.push([]);
      lines.push([tok('> ', 'punct'), tok(aboutData.headline, 'string')]);
      lines.push([]);
      aboutData.paragraphs.forEach((p) => {
        lines.push([tok(p, 'plain')]);
        lines.push([]);
      });
      lines.push([tok('## Stack principal', 'heading')]);
      aboutData.stack.forEach((tech) => {
        lines.push([tok('- ', 'punct'), tok(tech, 'key')]);
      });
      return lines;
    },
  },
};
</script>
