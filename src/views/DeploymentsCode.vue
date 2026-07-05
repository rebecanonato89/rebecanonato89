<template>
  <main id="main-content">
    <h2 class="section-title">deployments.json</h2>
    <CodeFileView :lines="lines" />
  </main>
</template>

<script>
import CodeFileView from '../components/CodeFileView.vue';
import { toJsonLines } from '../utils/codeLines.js';
import { projectsData } from '../data/profileData.js';

export default {
  name: 'DeploymentsCode',
  components: { CodeFileView },
  computed: {
    lines() {
      const trimmed = projectsData.map((project) => {
        const entry = {
          title: project.title,
          period: project.period,
          stack: project.stack,
          repo: project.link,
        };
        if (project.liveUrl) entry.live = project.liveUrl;
        return entry;
      });
      return toJsonLines(trimmed);
    },
  },
};
</script>
