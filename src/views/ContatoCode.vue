<template>
  <main id="main-content">
    <h2 class="section-title">contato.md</h2>
    <CodeFileView :lines="lines" />
  </main>
</template>

<script>
import CodeFileView from '../components/CodeFileView.vue';
import { tok } from '../utils/codeLines.js';
import { contactData } from '../data/profileData.js';

export default {
  name: 'ContatoCode',
  components: { CodeFileView },
  computed: {
    lines() {
      const lines = [];
      lines.push([tok('# contato.md', 'heading')]);
      lines.push([]);
      lines.push([tok(contactData.intro, 'plain')]);
      lines.push([]);
      lines.push([tok('**Canais Seguros**', 'heading')]);
      lines.push([]);
      contactData.channels.forEach((ch) => {
        lines.push([
          tok('- [', 'punct'),
          tok(ch.label, 'key'),
          tok('](', 'punct'),
          tok(ch.url, 'string', ch.url),
          tok(')', 'punct'),
        ]);
      });
      return lines;
    },
  },
};
</script>
