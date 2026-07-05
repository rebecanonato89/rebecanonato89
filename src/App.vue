<template>
  <div class="ide-root" :class="[themeClass, { 'high-contrast-mode': isHighContrast, 'app-mode': isGameRoute }]">
    <a href="#main-content" class="skip-link" @click.prevent="skipToMain">Pular para o conteúdo principal</a>

    <!-- ===================== MODO JOGO: tela cheia, sem chrome de IDE ===================== -->
    <div v-if="isGameRoute" class="game-shell">
      <router-view />
    </div>

    <!-- ===================== MODO IDE: título, sidebar, abas, editor, terminal, status ===================== -->
    <template v-else>
      <header class="ide-titlebar">
        <div class="ide-titlebar-left">
          <span class="ide-dot ide-dot--red" aria-hidden="true"></span>
          <span class="ide-dot ide-dot--yellow" aria-hidden="true"></span>
          <span class="ide-dot ide-dot--green" aria-hidden="true"></span>
          <router-link to="/" class="ide-titlebar-brand">
            <IdeIcon type="project" aria-hidden="true" />
            <span class="ide-titlebar-project">rebecanonato89</span>
            <span class="ide-titlebar-sep" aria-hidden="true">›</span>
            <span class="ide-titlebar-file">{{ activeTabMeta.label }}</span>
          </router-link>
        </div>

        <nav class="ide-titlebar-menu" aria-label="Navegação Principal">
          <router-link to="/" class="ide-menu-item" exact-active-class="ide-menu-item--active">Início</router-link>
          <router-link to="/arcade" class="ide-menu-item" active-class="ide-menu-item--active">Arcade</router-link>
          <router-link to="/recursos" class="ide-menu-item" active-class="ide-menu-item--active">Recursos</router-link>
          <router-link to="/servicos" class="ide-menu-item" active-class="ide-menu-item--active">Serviços</router-link>
          <a href="#contact" class="ide-menu-item" @click.prevent="scrollToId('contact')">Contato</a>
        </nav>

        <div class="ide-titlebar-right">
          <button type="button" class="ide-title-btn" @click="changeFontSize(-1)" aria-label="Diminuir tamanho da fonte">A-</button>
          <button type="button" class="ide-title-btn" @click="changeFontSize(1)" aria-label="Aumentar tamanho da fonte">A+</button>
          <button
            type="button"
            class="ide-title-btn"
            :class="{ 'ide-title-btn--active': isHighContrast }"
            :aria-pressed="isHighContrast"
            aria-label="Alternar modo de alto contraste"
            @click="toggleHighContrast"
          >
            <IdeIcon type="contrast" />
          </button>
          <button type="button" class="ide-theme-toggle" @click="toggleTheme" :aria-label="'Tema: ' + themeLabel + '. Clique para alternar.'">
            <IdeIcon :type="theme === 'dracula' ? 'bat' : 'cup'" />
            <span>{{ themeLabel }}</span>
          </button>
          <a href="https://github.com/rebecanonato89" target="_blank" rel="noopener noreferrer" class="ide-title-btn" aria-label="Abrir GitHub em nova aba">
            GH
          </a>
        </div>
      </header>

      <div class="ide-workbench">
        <div class="ide-activity-bar">
          <button
            type="button"
            class="ide-activity-btn"
            :class="{ 'ide-activity-btn--active': sidebarOpen }"
            aria-label="Alternar painel de projeto"
            :aria-pressed="sidebarOpen"
            @click="sidebarOpen = !sidebarOpen"
          >
            <IdeIcon type="project" />
          </button>
          <button
            type="button"
            class="ide-activity-btn"
            :class="{ 'ide-activity-btn--active': terminalOpen }"
            aria-label="Alternar terminal"
            :aria-pressed="terminalOpen"
            @click="terminalOpen = !terminalOpen"
          >
            <IdeIcon type="terminal" />
          </button>
        </div>

        <div v-if="sidebarOpen" class="ide-sidebar-backdrop" @click="sidebarOpen = false"></div>

        <IdeSidebar
          v-if="sidebarOpen"
          :tree="sidebarTree"
          :active-node-id="selectedNodeId"
          @open="openNode"
          @collapse="sidebarOpen = false"
        />

        <div class="ide-main">
          <div class="ide-tabbar" role="tablist" aria-label="Abas abertas">
            <button
              v-for="tab in openTabs"
              :key="tab.path"
              type="button"
              role="tab"
              class="ide-tab"
              :class="{ 'ide-tab--active': tab.path === $route.path }"
              :aria-selected="tab.path === $route.path"
              @click="activateTab(tab)"
            >
              <IdeIcon :type="tab.icon" class="ide-tab-icon" :class="'ide-tab-icon--' + tab.icon" />
              <span>{{ tab.label }}</span>
              <span
                v-if="openTabs.length > 1"
                class="ide-tab-close"
                role="button"
                :aria-label="'Fechar aba ' + tab.label"
                @click.stop="closeTab(tab)"
              >
                <IdeIcon type="close" />
              </span>
            </button>
          </div>

          <div class="ide-breadcrumb" aria-hidden="true">
            <IdeIcon type="project" />
            <span>rebecanonato89</span>
            <template v-for="crumb in breadcrumb" :key="crumb">
              <span class="ide-breadcrumb-sep">›</span>
              <span>{{ crumb }}</span>
            </template>
          </div>

          <div id="ide-editor-content" class="ide-editor-content">
            <router-view />
          </div>

          <div v-if="terminalOpen" class="ide-terminal-dock">
            <IdeTerminal @collapse="terminalOpen = false" />
          </div>
        </div>
      </div>

      <footer class="ide-statusbar">
        <div class="ide-statusbar-left">
          <span class="ide-statusbar-item"><IdeIcon type="branch" /> main</span>
          <span class="ide-statusbar-item ide-statusbar-item--ok"><IdeIcon type="check" /> Claude Code pronto</span>
        </div>
        <div class="ide-statusbar-right">
          <span class="ide-statusbar-item">UTF-8</span>
          <span class="ide-statusbar-item">Vue 3</span>
          <button type="button" class="ide-statusbar-item ide-statusbar-btn" @click="terminalOpen = !terminalOpen">
            <IdeIcon type="terminal" /> Terminal
          </button>
        </div>
      </footer>
    </template>
  </div>
</template>

<script>
import IdeIcon from './components/IdeIcon.vue';
import IdeSidebar from './components/IdeSidebar.vue';
import IdeTerminal from './components/IdeTerminal.vue';

// Metadados das "abas" abertáveis (rotas que viram arquivo na barra de abas).
// Rotas de jogo (/go, /damas, /memoria) ficam fora disso: abrem em tela cheia.
const PATH_META = {
  '/': { label: 'home.vue', icon: 'vue', breadcrumb: ['src', 'views', 'Home.vue'] },
  '/arcade': { label: 'arcade.vue', icon: 'vue', breadcrumb: ['src', 'views', 'Arcade.vue'] },
  '/recursos': { label: 'recursos.vue', icon: 'vue', breadcrumb: ['src', 'views', 'Resources.vue'] },
  '/servicos': { label: 'servicos.vue', icon: 'vue', breadcrumb: ['src', 'views', 'Servicos.vue'] },
};
const GAME_ROUTES = ['/go', '/damas', '/memoria'];

export default {
  name: 'App',
  components: { IdeIcon, IdeSidebar, IdeTerminal },
  data() {
    return {
      fontSizeStep: 0,
      isHighContrast: false,
      theme: 'dracula',
      sidebarOpen: true,
      terminalOpen: true,
      selectedNodeId: 'sobre',
      openTabs: [{ path: '/', label: PATH_META['/'].label, icon: PATH_META['/'].icon }],
      sidebarTree: [
        {
          id: 'root', label: 'rebecanonato89', type: 'folder', expanded: true, children: [
            {
              id: 'perfil', label: 'perfil', type: 'folder', expanded: true, children: [
                { id: 'sobre', label: 'sobre.md', type: 'file', icon: 'md', path: '/', hash: '#about' },
                { id: 'experiencia', label: 'experiencia.log', type: 'file', icon: 'log', path: '/', hash: '#experience' },
                { id: 'certificacoes', label: 'certificacoes.log', type: 'file', icon: 'log', path: '/', hash: '#education' },
              ],
            },
            {
              id: 'projetos', label: 'projetos', type: 'folder', expanded: true, children: [
                { id: 'deployments', label: 'deployments.json', type: 'file', icon: 'json', path: '/', hash: '#projects' },
              ],
            },
            {
              id: 'arcade', label: 'arcade', type: 'folder', expanded: false, children: [
                { id: 'arcade-index', label: 'arcade.vue', type: 'file', icon: 'vue', path: '/arcade' },
                { id: 'go', label: 'go.js', type: 'file', icon: 'game', path: '/go' },
                { id: 'damas', label: 'damas.js', type: 'file', icon: 'game', path: '/damas' },
                { id: 'memoria', label: 'memoria.js', type: 'file', icon: 'game', path: '/memoria' },
              ],
            },
            { id: 'servicos', label: 'servicos.vue', type: 'file', icon: 'vue', path: '/servicos' },
            { id: 'recursos', label: 'recursos.vue', type: 'file', icon: 'vue', path: '/recursos' },
            { id: 'contato', label: 'contato.md', type: 'file', icon: 'md', path: '/', hash: '#contact' },
          ],
        },
      ],
    };
  },
  computed: {
    // Rotas de jogo entram em "modo app": tela cheia, sem chrome de IDE
    // (cada jogo já tem sua própria barra de volta ao Arcade).
    isGameRoute() {
      return GAME_ROUTES.includes(this.$route.path);
    },
    themeClass() {
      return this.theme === 'cappuccino' ? 'theme-cappuccino' : 'theme-dracula';
    },
    themeLabel() {
      return this.theme === 'cappuccino' ? 'Cappuccino' : 'Dracula';
    },
    activeTabMeta() {
      return this.openTabs.find((t) => t.path === this.$route.path) || PATH_META['/'];
    },
    breadcrumb() {
      const meta = PATH_META[this.$route.path];
      return meta ? meta.breadcrumb : PATH_META['/'].breadcrumb;
    },
  },
  watch: {
    '$route.path'(newPath) {
      if (GAME_ROUTES.includes(newPath)) return;
      const meta = PATH_META[newPath];
      if (meta && !this.openTabs.some((t) => t.path === newPath)) {
        this.openTabs.push({ path: newPath, label: meta.label, icon: meta.icon });
      }
    },
  },
  mounted() {
    const savedTheme = localStorage.getItem('rebeca-ide-theme');
    if (savedTheme === 'cappuccino' || savedTheme === 'dracula') {
      this.theme = savedTheme;
    }
    this.applyBodyClass();
    if (window.innerWidth <= 900) {
      this.sidebarOpen = false;
    }
    if (window.innerWidth <= 640) {
      this.terminalOpen = false;
    }
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'dracula' ? 'cappuccino' : 'dracula';
      localStorage.setItem('rebeca-ide-theme', this.theme);
      this.applyBodyClass();
    },
    applyBodyClass() {
      // Sincroniza o fundo real do body pra evitar tapumes claros/escuros no overscroll.
      if (this.isHighContrast) {
        document.body.style.backgroundColor = '#000000';
      } else if (this.theme === 'cappuccino') {
        document.body.style.backgroundColor = '#f7f1e8';
      } else {
        document.body.style.backgroundColor = '#282a36';
      }
    },
    toggleHighContrast() {
      this.isHighContrast = !this.isHighContrast;
      this.applyBodyClass();
    },
    changeFontSize(step) {
      this.fontSizeStep += step;
      if (this.fontSizeStep > 4) this.fontSizeStep = 4;
      if (this.fontSizeStep < -2) this.fontSizeStep = -2;
      const newSize = 100 + this.fontSizeStep * 10;
      document.documentElement.style.fontSize = `${newSize}%`;
    },
    // Clique num item do sidebar: se for jogo, abre em tela cheia; senão abre/ativa
    // a aba correspondente no meio (editor) e rola até o trecho (hash), se houver.
    openNode(node) {
      this.selectedNodeId = node.id;
      if (GAME_ROUTES.includes(node.path)) {
        this.$router.push(node.path);
        return;
      }
      const meta = PATH_META[node.path];
      if (meta && !this.openTabs.some((t) => t.path === node.path)) {
        this.openTabs.push({ path: node.path, label: meta.label, icon: meta.icon });
      }
      if (this.$route.path !== node.path) {
        this.$router.push({ path: node.path, hash: node.hash || undefined }).then(() => {
          if (node.hash) this.$nextTick(() => this.scrollToHash(node.hash));
        });
      } else if (node.hash) {
        this.scrollToHash(node.hash);
      }
      if (window.innerWidth <= 900) this.sidebarOpen = false;
    },
    activateTab(tab) {
      if (this.$route.path !== tab.path) this.$router.push(tab.path);
    },
    closeTab(tab) {
      const idx = this.openTabs.findIndex((t) => t.path === tab.path);
      if (idx === -1 || this.openTabs.length === 1) return;
      const wasActive = this.$route.path === tab.path;
      this.openTabs.splice(idx, 1);
      if (wasActive) {
        const next = this.openTabs[idx] || this.openTabs[idx - 1];
        this.$router.push(next.path);
      }
    },
    scrollToId(id) {
      if (this.$route.path !== '/') {
        this.$router.push('/').then(() => this.$nextTick(() => this.scrollToHash('#' + id)));
      } else {
        this.scrollToHash('#' + id);
      }
    },
    scrollToHash(hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },
    skipToMain() {
      const el = document.getElementById('main-content');
      if (!el) return;
      el.setAttribute('tabindex', '-1');
      el.focus();
      el.scrollIntoView();
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

/* =========================================
   TEMA DRACULA (ESCURO) — padrão
   ========================================= */
:root,
.theme-dracula {
  --bg-base: #282a36;
  --bg-surface: rgba(68, 71, 90, 0.45);
  --accent-core: #bd93f9;
  --accent-dim: rgba(189, 147, 249, 0.15);
  --accent-border: rgba(189, 147, 249, 0.35);
  --accent-warm: #ffb86c;
  --text-main: #f8f8f2;
  --text-muted: #6272a4;
  --scrim-overlay: rgba(33, 34, 44, 0.92);
  --card-shadow: rgba(0, 0, 0, 0.45);

  --ide-titlebar-bg: #21222c;
  --ide-sidebar-bg: #21222c;
  --ide-sidebar-hover: rgba(98, 114, 164, 0.18);
  --ide-sidebar-active-bg: rgba(189, 147, 249, 0.18);
  --ide-sidebar-active-text: #bd93f9;
  --ide-tab-bg: #191a21;
  --ide-tab-active-bg: #282a36;
  --ide-statusbar-bg: #21222c;
  --ide-border: #14151b;
  --ide-icon-vue: #50fa7b;
  --ide-icon-js: #f1fa8c;
  --ide-icon-json: #ffb86c;
  --ide-icon-md: #8be9fd;
  --ide-icon-log: #8b8fa3;
  --ide-icon-folder: #90a4d4;

  --font-ui: 'Space Grotesk', sans-serif;
  --font-read: 'Inter', sans-serif;
  --font-code: 'JetBrains Mono', monospace;

  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: clamp(3rem, 6vw, 5.5rem);

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 18px;
}

/* =========================================
   TEMA CAPPUCCINO (CLARO)
   ========================================= */
.theme-cappuccino {
  --bg-base: #f7f1e8;
  --bg-surface: rgba(255, 250, 243, 0.85);
  --accent-core: #6f4e37;
  --accent-dim: rgba(111, 78, 55, 0.08);
  --accent-border: rgba(111, 78, 55, 0.25);
  --accent-warm: #c17a3d;
  --text-main: #4a3728;
  --text-muted: #8a7361;
  --scrim-overlay: rgba(239, 230, 216, 0.9);
  --card-shadow: rgba(111, 78, 55, 0.12);

  --ide-titlebar-bg: #efe6d8;
  --ide-sidebar-bg: #efe6d8;
  --ide-sidebar-hover: rgba(111, 78, 55, 0.08);
  --ide-sidebar-active-bg: rgba(111, 78, 55, 0.16);
  --ide-sidebar-active-text: #6f4e37;
  --ide-tab-bg: #e7dcc9;
  --ide-tab-active-bg: #fffaf3;
  --ide-statusbar-bg: #efe6d8;
  --ide-border: #ddcfb8;
  --ide-icon-vue: #2f9e63;
  --ide-icon-js: #a8790a;
  --ide-icon-json: #b5651d;
  --ide-icon-md: #2b7a9e;
  --ide-icon-log: #8a7361;
  --ide-icon-folder: #a9652e;
}

/* =========================================
   ALTO CONTRASTE (ACESSIBILIDADE — prioridade máxima)
   ========================================= */
.high-contrast-mode {
  --bg-base: #000000;
  --bg-surface: #000000;
  --accent-core: #FFFF00;
  --accent-dim: transparent;
  --accent-border: #FFFF00;
  --accent-warm: #FFFF00;
  --text-main: #FFFFFF;
  --text-muted: #FFFFFF;
  --scrim-overlay: #000000;
  --card-shadow: transparent;

  --ide-titlebar-bg: #000000;
  --ide-sidebar-bg: #000000;
  --ide-sidebar-hover: rgba(255, 255, 0, 0.15);
  --ide-sidebar-active-bg: rgba(255, 255, 0, 0.25);
  --ide-sidebar-active-text: #FFFF00;
  --ide-tab-bg: #000000;
  --ide-tab-active-bg: #000000;
  --ide-statusbar-bg: #000000;
  --ide-border: #FFFF00;
  --ide-icon-vue: #FFFF00;
  --ide-icon-js: #FFFF00;
  --ide-icon-json: #FFFF00;
  --ide-icon-md: #FFFF00;
  --ide-icon-log: #FFFF00;
  --ide-icon-folder: #FFFF00;
}

/* RESET */
* { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 100%; }

body {
  font-family: var(--font-read);
  background-color: var(--bg-base);
  color: var(--text-main);
  line-height: 1.6;
}

.ide-root {
  min-height: 100vh;
  background-color: var(--bg-base);
  transition: background-color 0.3s ease;
}

/* =========================================
   ACESSIBILIDADE
   ========================================= */
.skip-link {
  position: absolute; top: -100px; left: 0;
  background: var(--accent-core); color: var(--bg-base);
  padding: var(--space-md); z-index: 9999;
  font-family: var(--font-ui); font-weight: bold; text-transform: uppercase;
  transition: top 0.2s; text-decoration: none;
}
.skip-link:focus { top: 0; }

.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;
}

*:focus-visible {
  outline: 2px dashed var(--accent-core); outline-offset: 2px;
  box-shadow: 0 0 15px var(--accent-dim); border-radius: 4px;
}

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}

/* =========================================
   BARRA DE TÍTULO (estilo IntelliJ IDEA)
   ========================================= */
.ide-titlebar {
  height: 48px;
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  padding: 0 var(--space-md);
  background: var(--ide-titlebar-bg);
  border-bottom: 1px solid var(--ide-border);
}
.ide-titlebar-left { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.ide-dot { width: 11px; height: 11px; border-radius: 50%; }
.ide-dot--red { background: #ff5f57; }
.ide-dot--yellow { background: #febc2e; }
.ide-dot--green { background: #28c840; }
.ide-titlebar-brand {
  display: flex; align-items: center; gap: 6px; margin-left: 10px;
  color: var(--text-main); text-decoration: none;
  font-family: var(--font-ui); font-weight: 600; font-size: 0.95rem;
}
.ide-titlebar-brand svg { color: var(--accent-core); width: 16px; height: 16px; }
.ide-titlebar-project { color: var(--text-muted); }
.ide-titlebar-sep { color: var(--text-muted); }
.ide-titlebar-file { color: var(--text-main); }

.ide-titlebar-menu {
  display: flex; align-items: center; gap: 4px; flex: 1;
  overflow-x: auto;
}
.ide-menu-item {
  color: var(--text-muted); text-decoration: none; font-family: var(--font-ui);
  font-size: 0.85rem; padding: 6px 12px; border-radius: var(--radius-sm);
  white-space: nowrap; transition: background 0.2s, color 0.2s;
}
.ide-menu-item:hover { background: var(--ide-sidebar-hover); color: var(--text-main); }
.ide-menu-item--active { color: var(--accent-core); font-weight: 600; }

.ide-titlebar-right { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
.ide-title-btn {
  background: transparent; color: var(--text-muted);
  border: 1px solid var(--accent-border); border-radius: var(--radius-sm);
  padding: 5px 10px; font-family: var(--font-code); font-size: 0.8rem; font-weight: 700;
  cursor: pointer; text-decoration: none; display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, color 0.2s;
}
.ide-title-btn svg { width: 15px; height: 15px; }
.ide-title-btn:hover, .ide-title-btn--active { background: var(--accent-core); color: var(--bg-base); }

.ide-theme-toggle {
  display: flex; align-items: center; gap: 6px;
  background: var(--accent-dim); color: var(--accent-core);
  border: 1px solid var(--accent-border); border-radius: var(--radius-sm);
  padding: 5px 12px; font-family: var(--font-ui); font-weight: 600; font-size: 0.8rem;
  cursor: pointer; transition: background 0.2s, transform 0.2s;
}
.ide-theme-toggle svg { width: 16px; height: 16px; }
.ide-theme-toggle:hover { background: var(--accent-core); color: var(--bg-base); transform: translateY(-1px); }

/* =========================================
   WORKBENCH (sidebar + editor + terminal)
   ========================================= */
.ide-workbench {
  display: flex;
  height: calc(100vh - 48px - 30px);
  height: calc(100dvh - 48px - 30px);
}

.ide-activity-bar {
  width: 42px; flex-shrink: 0;
  background: var(--ide-titlebar-bg);
  border-right: 1px solid var(--ide-border);
  display: flex; flex-direction: column; align-items: center;
  padding-top: var(--space-sm); gap: 4px;
}
.ide-activity-btn {
  width: 32px; height: 32px; border-radius: var(--radius-sm);
  background: transparent; border: none; color: var(--text-muted);
  display: flex; align-items: center; justify-content: center; cursor: pointer;
}
.ide-activity-btn svg { width: 18px; height: 18px; }
.ide-activity-btn:hover { background: var(--ide-sidebar-hover); color: var(--text-main); }
.ide-activity-btn--active { color: var(--accent-core); background: var(--accent-dim); }

.ide-sidebar-backdrop { display: none; }

.ide-main {
  flex: 1; min-width: 0;
  display: flex; flex-direction: column;
}

.ide-tabbar {
  display: flex; align-items: stretch; overflow-x: auto;
  background: var(--ide-tab-bg); border-bottom: 1px solid var(--ide-border);
  flex-shrink: 0;
}
.ide-tab {
  display: flex; align-items: center; gap: 7px;
  background: transparent; border: none; border-right: 1px solid var(--ide-border);
  color: var(--text-muted); font-family: var(--font-code); font-size: 0.82rem;
  padding: 9px 10px 9px 14px; cursor: pointer; white-space: nowrap;
  border-bottom: 2px solid transparent;
}
.ide-tab:hover { color: var(--text-main); }
.ide-tab--active {
  background: var(--ide-tab-active-bg); color: var(--text-main);
  border-bottom-color: var(--accent-core);
}
.ide-tab-icon--vue { color: var(--ide-icon-vue); }
.ide-tab-icon--js { color: var(--ide-icon-js); }
.ide-tab-close {
  display: flex; align-items: center; justify-content: center;
  width: 16px; height: 16px; border-radius: 3px; color: var(--text-muted);
}
.ide-tab-close:hover { background: var(--ide-sidebar-hover); color: var(--text-main); }
.ide-tab-close svg { width: 10px; height: 10px; }

.ide-breadcrumb {
  display: flex; align-items: center; gap: 6px; flex-shrink: 0;
  padding: 5px 14px; font-family: var(--font-code); font-size: 0.72rem;
  color: var(--text-muted); background: var(--bg-base); border-bottom: 1px solid var(--ide-border);
}
.ide-breadcrumb svg { width: 12px; height: 12px; color: var(--accent-core); }
.ide-breadcrumb-sep { opacity: 0.6; }

.ide-editor-content {
  flex: 1; min-height: 0; overflow-y: auto;
  background: var(--bg-base);
  padding: var(--space-lg);
}
.ide-editor-content #main-content {
  max-width: 1000px; margin: 0 auto;
}
@media (min-width: 1440px) { .ide-editor-content #main-content { max-width: 1150px; } }
@media (min-width: 1800px) { .ide-editor-content #main-content { max-width: 1320px; } }

.ide-terminal-dock {
  height: 260px; flex-shrink: 0;
}

/* =========================================
   BARRA DE STATUS
   ========================================= */
.ide-statusbar {
  height: 30px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 var(--space-md);
  background: var(--ide-statusbar-bg);
  border-top: 1px solid var(--ide-border);
  font-family: var(--font-code); font-size: 0.72rem; color: var(--text-muted);
}
.ide-statusbar-left, .ide-statusbar-right { display: flex; align-items: center; gap: var(--space-md); }
.ide-statusbar-item { display: flex; align-items: center; gap: 5px; }
.ide-statusbar-item svg { width: 12px; height: 12px; }
.ide-statusbar-item--ok { color: var(--ide-icon-vue); }
.ide-statusbar-btn { background: transparent; border: none; color: var(--text-muted); cursor: pointer; font-family: var(--font-code); font-size: 0.72rem; }
.ide-statusbar-btn:hover { color: var(--accent-core); }

/* =========================================
   MODO JOGO (tela cheia, layout de página normal)
   ========================================= */
.game-shell {
  max-width: 1000px; margin: 0 auto; padding: 0 var(--space-lg);
  min-height: 100dvh; background: var(--bg-base);
}
@media (min-width: 1440px) { .game-shell { max-width: 1200px; } }

/* =========================================
   COMPONENTES COMPARTILHADOS (usados pelas páginas)
   ========================================= */
section { margin-bottom: var(--space-xl); }
.section-title {
  font-family: var(--font-ui); font-size: 2.2rem; color: var(--text-main);
  margin-bottom: var(--space-lg); padding-bottom: var(--space-md);
  display: flex; align-items: center; gap: var(--space-md);
  border-bottom: 1px solid var(--accent-border);
}
.section-title::before {
  content: ''; display: block; width: 10px; height: 10px; border-radius: 50%;
  background: var(--accent-core); box-shadow: 0 0 10px var(--accent-dim); flex-shrink: 0;
}

.hud-card {
  background: var(--bg-surface);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px var(--card-shadow);
  transition: transform 0.35s cubic-bezier(.2,.8,.2,1), border-color 0.35s cubic-bezier(.2,.8,.2,1),
    box-shadow 0.35s cubic-bezier(.2,.8,.2,1), background 0.3s ease;
  backdrop-filter: blur(10px);
  color: var(--text-main);
}
.hud-card p, .hud-card strong { color: var(--text-main); }
.hud-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-core);
  box-shadow: 0 8px 28px var(--accent-dim);
}
.high-contrast-mode .hud-card { border-width: 2px; box-shadow: none !important; }

.card-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-md); border-bottom: 1px solid var(--accent-dim); padding-bottom: var(--space-sm); }
.card-title { font-family: var(--font-ui); font-size: 1.6rem; color: var(--text-main); margin-bottom: 0; }
.card-period { font-family: var(--font-code); font-size: 0.85rem; color: var(--accent-core); }

.card-desc { color: var(--text-main); font-size: 0.95rem; flex-grow: 1; margin-bottom: var(--space-lg); }
.card-desc p, .card-desc ul, .card-desc li { color: var(--text-main) !important; }

.project-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-lg); }

.tech-list { list-style: none; display: flex; flex-wrap: wrap; gap: var(--space-sm); margin-bottom: var(--space-lg); }
.tech-tag { font-family: var(--font-code); font-size: 0.75rem; color: var(--accent-core); background: var(--accent-dim); border: 1px solid var(--accent-border); padding: 4px 10px; border-radius: var(--radius-sm); }

.btn-hud {
  display: inline-flex; align-items: center; gap: 8px; background: var(--accent-dim); color: var(--accent-core);
  border: 1px solid var(--accent-border); border-radius: var(--radius-md); padding: 8px 18px; font-family: var(--font-ui); font-size: 1.1rem;
  text-decoration: none; text-transform: uppercase; align-self: flex-start;
  transition: background 0.3s cubic-bezier(.2,.8,.2,1), color 0.3s cubic-bezier(.2,.8,.2,1),
    box-shadow 0.3s cubic-bezier(.2,.8,.2,1), transform 0.3s cubic-bezier(.2,.8,.2,1);
}
.btn-hud:hover {
  background: var(--accent-core); color: var(--bg-base);
  box-shadow: 0 0 18px var(--accent-dim); transform: translateY(-2px) scale(1.02);
}
.btn-hud--live { background: var(--accent-core); color: var(--bg-base); font-weight: 700; }
.btn-hud--live:hover {
  box-shadow: 0 0 26px var(--accent-warm); background: var(--accent-warm);
  transform: translateY(-2px) scale(1.02);
}

.timeline { list-style: none; position: relative; padding-left: 30px; }
.timeline::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
  background: linear-gradient(to bottom, var(--accent-core), transparent);
}
.timeline-item { position: relative; margin-bottom: var(--space-lg); }
.timeline-item::before {
  content: ''; position: absolute; left: -36px; top: 6px; width: 14px; height: 14px;
  background: var(--bg-base); border: 2px solid var(--accent-core); border-radius: 50%;
  box-shadow: 0 0 10px var(--accent-dim); transition: background 0.3s;
}
.timeline-date { font-family: var(--font-code); font-size: 0.85rem; color: var(--accent-core); margin-bottom: 4px; display: block; }
.timeline-title { font-family: var(--font-ui); font-size: 1.3rem; color: var(--text-main); margin-bottom: 2px; }
.timeline-org { font-weight: 600; color: var(--text-main); font-size: 1rem; margin-bottom: 8px; }
.timeline-desc { color: var(--text-muted); font-size: 0.95rem; }

/* =========================================
   RESPONSIVIDADE
   ========================================= */
@media (max-width: 900px) {
  .ide-titlebar-menu { display: none; }
  .ide-sidebar-backdrop {
    display: block; position: fixed; inset: 48px 0 30px 0;
    background: rgba(0, 0, 0, 0.45); z-index: 40;
  }
  .ide-workbench .ide-sidebar {
    position: fixed; top: 48px; bottom: 30px; left: 42px;
    width: min(80vw, 300px); z-index: 41; box-shadow: 4px 0 24px rgba(0,0,0,0.35);
  }
}

@media (max-width: 640px) {
  .ide-titlebar { gap: var(--space-sm); padding: 0 8px; }
  .ide-titlebar-brand { margin-left: 4px; }
  .ide-titlebar-project { display: none; }
  .ide-titlebar-sep { display: none; }
  .ide-title-btn:nth-of-type(1), .ide-title-btn:nth-of-type(2) { display: none; }
  .ide-theme-toggle span { display: none; }
  .ide-terminal-dock { height: 200px; }
  .ide-editor-content { padding: var(--space-md); }
  .section-title { font-size: 1.7rem; }
  .card-header { flex-direction: column; }
  .ide-statusbar { font-size: 0.65rem; padding: 0 8px; }
  .ide-statusbar-left, .ide-statusbar-right { gap: var(--space-sm); }
}

@media (max-width: 768px) {
  .game-shell { padding: 0; }
}
</style>
