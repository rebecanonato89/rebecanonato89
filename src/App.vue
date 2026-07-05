<template>
  <div class="container" :class="{ 'high-contrast-mode': isHighContrast, 'light-mode': isLightMode, 'app-mode': isGameRoute }">
    <div class="bg-icons" aria-hidden="true">
      <svg class="bg-icon bg-icon-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="8 4 2 12 8 20"></polyline><polyline points="16 4 22 12 16 20"></polyline></svg>
      <svg class="bg-icon bg-icon-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3H6a2 2 0 0 0-2 2v2a2 2 0 0 1-2 2 2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h2"></path><path d="M16 3h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0-2 2v2a2 2 0 0 1-2 2h-2"></path></svg>
      <svg class="bg-icon bg-icon-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>
      <svg class="bg-icon bg-icon-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="5" rx="8" ry="3"></ellipse><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5"></path><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"></path></svg>
      <svg class="bg-icon bg-icon-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>
      <svg class="bg-icon bg-icon-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"></rect><polyline points="6 9 10 12 6 15"></polyline><line x1="12" y1="15" x2="16" y2="15"></line></svg>
      <svg class="bg-icon bg-icon-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="5" rx="1"></rect><rect x="2" y="15" width="20" height="5" rx="1"></rect><line x1="6" y1="6.5" x2="6.01" y2="6.5"></line><line x1="6" y1="17.5" x2="6.01" y2="17.5"></line></svg>
      <svg class="bg-icon bg-icon-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 13a10 10 0 0 1 14 0"></path><path d="M8.5 16.5a5 5 0 0 1 7 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
      <svg class="bg-icon bg-icon-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="7" height="7" rx="1"></rect><rect x="13" y="13" width="7" height="7" rx="1"></rect><rect x="4" y="13" width="7" height="7" rx="1"></rect></svg>
      <svg class="bg-icon bg-icon-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6" y="6" width="12" height="12" rx="1"></rect><line x1="6" y1="1" x2="6" y2="4"></line><line x1="12" y1="1" x2="12" y2="4"></line><line x1="18" y1="1" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="23"></line><line x1="12" y1="20" x2="12" y2="23"></line><line x1="18" y1="20" x2="18" y2="23"></line><line x1="1" y1="6" x2="4" y2="6"></line><line x1="1" y1="12" x2="4" y2="12"></line><line x1="1" y1="18" x2="4" y2="18"></line><line x1="20" y1="6" x2="23" y2="6"></line><line x1="20" y1="12" x2="23" y2="12"></line><line x1="20" y1="18" x2="23" y2="18"></line></svg>
      <svg class="bg-icon bg-icon-11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
      <svg class="bg-icon bg-icon-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
    </div>

    <a href="#main-content" class="skip-link" @click.prevent="skipToMain">Pular para o conteúdo principal</a>

    <aside class="a11y-toolbar" aria-label="Ferramentas de acessibilidade e tema">
      <button @click="toggleTheme" class="a11y-btn theme-btn" :aria-label="isLightMode ? 'Ativar modo escuro' : 'Ativar modo claro'">
        <svg v-if="!isLightMode" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="5"></circle>
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"></path>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>

      <div class="a11y-divider" aria-hidden="true"></div>

      <button @click="changeFontSize(-1)" class="a11y-btn" aria-label="Diminuir tamanho da fonte">A-</button>
      <button @click="changeFontSize(1)" class="a11y-btn" aria-label="Aumentar tamanho da fonte">A+</button>
      <button @click="resetFontSize" class="a11y-btn" aria-label="Restaurar tamanho da fonte padrão">A</button>
      <button @click="toggleHighContrast" class="a11y-btn" :aria-pressed="isHighContrast" aria-label="Alternar modo de alto contraste restrito">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a10 10 0 0 0 0 20z" fill="currentColor"></path>
        </svg>
      </button>
    </aside>

    <header>
      <div class="brand">
        <h1>Rebeca Nonato</h1>
        <span>SYS.INIT // SOFTWARE_ENGINEER_SENIOR</span>
      </div>
      <nav aria-label="Navegação Principal">
        <ul v-if="$route.path === '/'">
          <li><a href="#about" @click.prevent="scrollToId('about')">Identidade</a></li>
          <li><a href="#experience" @click.prevent="scrollToId('experience')">Log Execução</a></li>
          <li><a href="#projects" @click.prevent="scrollToId('projects')">Deployments</a></li>
          <li><router-link to="/arcade" class="nav-highlight">Arcade</router-link></li>
          <li><router-link to="/recursos" class="nav-highlight">Recursos</router-link></li>
          <li><router-link to="/servicos" class="nav-highlight">Serviços</router-link></li>
          <li><a href="#contact" @click.prevent="scrollToId('contact')">Uplink</a></li>
        </ul>
        <ul v-else>
          <li><router-link to="/">&larr; Portfólio</router-link></li>
          <li><router-link to="/arcade">Arcade</router-link></li>
          <li><router-link to="/recursos">Recursos</router-link></li>
          <li><router-link to="/servicos">Serviços</router-link></li>
        </ul>
      </nav>
    </header>

    <router-view />

    <footer>
      <p>CONSTRUÍDO COM VUE.JS, HTML SEMÂNTICO E CSS FLUIDO. ACESSIBILIDADE NIVEL AAA.</p>
      <p>REBECA NONATO &copy; 2026</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      fontSizeStep: 0,
      isHighContrast: false,
      isLightMode: false,
    };
  },
  computed: {
    // Rotas de jogo entram em "modo app": some o cabeçalho/rodapé do portfólio
    // e o jogo ganha a tela inteira (cada jogo tem sua barra própria de volta).
    isGameRoute() {
      return ['/go', '/damas', '/memoria'].includes(this.$route.path);
    }
  },
  mounted() {
    // Recupera a preferência de tema do usuário (caso ele já tenha alterado antes)
    const savedTheme = localStorage.getItem('rebeca-portfolio-lightmode');
    if (savedTheme === 'true') {
      this.isLightMode = true;
      this.applyBodyClass();
    }
  },
  methods: {
    toggleTheme() {
      this.isLightMode = !this.isLightMode;
      localStorage.setItem('rebeca-portfolio-lightmode', this.isLightMode);
      this.applyBodyClass();
    },
    applyBodyClass() {
      // Sincroniza a cor de fundo real do body para evitar barras brancas/pretas no scroll overflow
      if (this.isHighContrast) {
        document.body.style.backgroundColor = '#000000';
      } else if (this.isLightMode) {
        document.body.style.backgroundColor = '#f7f6fb';
      } else {
        document.body.style.backgroundColor = '#0b0d17';
      }
    },
    changeFontSize(step) {
      this.fontSizeStep += step;
      if (this.fontSizeStep > 4) this.fontSizeStep = 4;
      if (this.fontSizeStep < -2) this.fontSizeStep = -2;
      this.applyFontSize();
    },
    resetFontSize() {
      this.fontSizeStep = 0;
      this.applyFontSize();
    },
    applyFontSize() {
      const newSize = 100 + (this.fontSizeStep * 10);
      document.documentElement.style.fontSize = `${newSize}%`;
    },
    toggleHighContrast() {
      this.isHighContrast = !this.isHighContrast;
      this.applyBodyClass();
    },
    scrollToId(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },
    skipToMain() {
      const el = document.getElementById('main-content');
      if (!el) return;
      el.setAttribute('tabindex', '-1');
      el.focus();
      el.scrollIntoView();
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

/* =========================================
   VARIÁVEIS PADRÃO (DARK MODE / ÍNDIGO+ÂMBAR)
   ========================================= */
:root {
  --bg-base: #0b0d17;
  --bg-surface: rgba(20, 18, 38, 0.7);
  --accent-core: #8b5cf6;
  --accent-dim: rgba(139, 92, 246, 0.15);
  --accent-border: rgba(139, 92, 246, 0.35);
  --accent-warm: #f5a524;
  --text-main: #e8e6f5;
  --text-muted: #9691b5;
  --scrim-overlay: rgba(6, 6, 14, 0.88);

  --font-ui: 'Space Grotesk', sans-serif;
  --font-read: 'Inter', sans-serif;
  --font-code: 'JetBrains Mono', monospace;

  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
}

/* =========================================
   VARIÁVEIS MODO CLARO (LIGHT MODE)
   ========================================= */
.light-mode {
  --bg-base: #f7f6fb;
  --bg-surface: rgba(255, 255, 255, 0.85);
  --accent-core: #6d28d9; /* Violeta mais escuro para contraste em fundo claro */
  --accent-dim: rgba(109, 40, 217, 0.08);
  --accent-border: rgba(109, 40, 217, 0.25);
  --accent-warm: #b8770a;
  --text-main: #201c33;
  --text-muted: #5b5570;
  --scrim-overlay: rgba(235, 232, 245, 0.88);
}

/* =========================================
   VARIÁVEIS ALTO CONTRASTE (PRIORIDADE MÁXIMA)
   ========================================= */
.high-contrast-mode {
  --bg-base: #000000;
  --bg-surface: #000000;
  --accent-core: #FFFF00; /* Amarelo puro */
  --accent-dim: transparent;
  --accent-border: #FFFF00;
  --accent-warm: #FFFF00;
  --text-main: #FFFFFF;
  --text-muted: #FFFFFF;
  --scrim-overlay: #000000;
}

/* RESET */
* { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 100%; scroll-behavior: smooth; }

body {
  font-family: var(--font-read);
  background-color: var(--bg-base);
  color: var(--text-main);
  line-height: 1.6;
  transition: background-color 0.4s ease, color 0.4s ease;
}

.container {
  position: relative;
  min-height: 100vh;
  background-color: var(--bg-base);
  transition: background-color 0.4s ease, max-width 0.3s ease;
  padding: 0 var(--space-lg);
  max-width: 1000px;
  margin: 0 auto;
}

/* =========================================
   ÍCONES DE TI FLUTUANDO NO FUNDO
   ========================================= */
.bg-icons {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  color: var(--accent-core);
}
.bg-icon {
  position: absolute;
  fill: none;
  opacity: 0.09;
  animation: drift-float 26s ease-in-out infinite alternate;
}
.light-mode .bg-icon { opacity: 0.12; }
.high-contrast-mode .bg-icons { display: none; }

.bg-icon-1  { top: 8%;  left: 6%;   width: 56px; animation-duration: 24s; }
.bg-icon-2  { top: 18%; right: 10%; width: 44px; animation-duration: 30s; animation-delay: -4s; }
.bg-icon-3  { top: 4%;  right: 30%; width: 64px; animation-duration: 34s; animation-delay: -12s; }
.bg-icon-4  { top: 38%; left: 16%;  width: 48px; animation-duration: 22s; animation-delay: -8s; }
.bg-icon-5  { top: 62%; left: 4%;   width: 52px; animation-duration: 28s; animation-delay: -18s; }
.bg-icon-6  { top: 72%; right: 8%;  width: 60px; animation-duration: 32s; animation-delay: -6s; }
.bg-icon-7  { top: 46%; right: 22%; width: 40px; animation-duration: 20s; animation-delay: -14s; }
.bg-icon-8  { top: 86%; left: 30%;  width: 36px; animation-duration: 26s; animation-delay: -10s; }
.bg-icon-9  { top: 28%; left: 44%;  width: 32px; animation-duration: 24s; animation-delay: -20s; }
.bg-icon-10 { top: 92%; right: 38%; width: 46px; animation-duration: 30s; animation-delay: -2s; }
.bg-icon-11 { top: 14%; left: 36%;  width: 42px; animation-duration: 34s; animation-delay: -16s; }
.bg-icon-12 { top: 56%; right: 46%; width: 38px; animation-duration: 22s; animation-delay: -9s; }

@keyframes drift-float {
  0%   { transform: translate(0, 0) rotate(0deg); }
  50%  { transform: translate(12px, -16px) rotate(4deg); }
  100% { transform: translate(-10px, 10px) rotate(-3deg); }
}

@media (max-width: 768px) {
  .bg-icon-9, .bg-icon-10, .bg-icon-11, .bg-icon-12 { display: none; }
}

/* Em telas grandes o conteúdo cresce em vez de ficar preso numa coluna estreita */
@media (min-width: 1440px) {
  .container { max-width: 1200px; }
}
@media (min-width: 1800px) {
  .container { max-width: 1440px; }
}
@media (min-width: 2200px) {
  .container { max-width: 1680px; }
}

/* Modo app (Go Game): esconde o cabeçalho e rodapé do portfólio em qualquer
   tamanho de tela, priorizando o espaço da tela pro tabuleiro. A navegação de
   volta ao portfólio passa a existir só na barra compacta própria do jogo. */
.app-mode header,
.app-mode footer {
  display: none;
}

/* =========================================
   ACESSBILIDADE & BARRA HUD
   ========================================= */
.skip-link {
  position: absolute; top: -100px; left: 0;
  background: var(--accent-core); color: #000;
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
  outline: 2px dashed var(--accent-core); outline-offset: 4px;
  box-shadow: 0 0 15px var(--accent-dim); border-radius: 4px;
}

.a11y-toolbar {
  position: fixed; top: 20px; right: 20px;
  display: flex; gap: 8px; align-items: center;
  z-index: 1000; background: var(--bg-surface);
  padding: 8px; border: 1px solid var(--accent-border);
  border-radius: 8px; backdrop-filter: blur(10px);
  transition: background 0.4s, border-color 0.4s;
}

.a11y-divider {
  width: 1px; height: 24px; background-color: var(--accent-border);
  margin: 0 4px;
}

.a11y-btn {
  background: transparent; color: var(--text-main);
  border: 1px solid var(--accent-border); border-radius: 4px;
  padding: 6px 12px; font-family: var(--font-code);
  font-size: 1rem; font-weight: bold; cursor: pointer;
  transition: background 0.25s cubic-bezier(.2,.8,.2,1), color 0.25s cubic-bezier(.2,.8,.2,1),
    box-shadow 0.25s cubic-bezier(.2,.8,.2,1), transform 0.25s cubic-bezier(.2,.8,.2,1);
  display: flex; align-items: center; justify-content: center;
}
.a11y-btn:hover, .a11y-btn:focus-visible {
  background: var(--accent-core); color: var(--bg-base);
  box-shadow: 0 0 12px var(--accent-dim);
  transform: translateY(-1px);
}
.a11y-btn svg { width: 16px; height: 16px; }
.theme-btn { padding: 6px 8px; }

/* =========================================
   LAYOUT & COMPONENTES
   ========================================= */
header {
  padding: var(--space-lg) 0; display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid var(--accent-border); margin-bottom: var(--space-xl);
  background: var(--bg-surface);
  position: sticky; top: 0; z-index: 100; backdrop-filter: blur(8px);
  transition: background 0.4s, border-color 0.4s;
  /* Reserva espaço à direita para a barra de acessibilidade fixa (top:20/right:20),
     evitando que itens de navegação fiquem escondidos/inclicáveis atrás dela. */
  padding-right: 300px;
}

/* Gradiente na borda superior apenas no Dark Mode (Fica feio no claro) */
.container:not(.light-mode):not(.high-contrast-mode) header {
  background: linear-gradient(180deg, rgba(11,13,23,0.95) 0%, rgba(11,13,23,0) 100%);
}

.brand h1 { font-family: var(--font-ui); font-size: 2rem; color: var(--text-main); text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 10px var(--accent-dim); }
.brand span { font-family: var(--font-code); font-size: 0.8rem; color: var(--accent-core); }
nav ul { list-style: none; display: flex; gap: var(--space-lg); }
nav a { color: var(--text-muted); text-decoration: none; font-family: var(--font-ui); font-size: 1.1rem; text-transform: uppercase; transition: 0.3s; }
nav a:hover { color: var(--accent-core); text-shadow: 0 0 8px var(--accent-dim); }
nav a.nav-highlight { color: var(--accent-core); }

section { margin-bottom: var(--space-xl); }
.section-title {
  font-family: var(--font-ui); font-size: 2.2rem; color: var(--text-main); margin-bottom: var(--space-lg);
  display: flex; align-items: center; gap: var(--space-md);
}
.section-title::before { content: ''; display: block; width: 12px; height: 12px; background: var(--accent-core); box-shadow: 0 0 10px var(--accent-dim); }

.hud-card {
  background: var(--bg-surface);
  border: 1px solid var(--accent-border);
  border-radius: 8px;
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  transition: transform 0.35s cubic-bezier(.2,.8,.2,1), border-color 0.35s cubic-bezier(.2,.8,.2,1),
    box-shadow 0.35s cubic-bezier(.2,.8,.2,1), background 0.4s ease;
  backdrop-filter: blur(10px);
  color: var(--text-main);
}
.hud-card p, .hud-card strong {
  color: var(--text-main);
}
.hud-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-core);
  box-shadow: 0 8px 28px var(--accent-dim);
}

.high-contrast-mode .hud-card { border-width: 2px; box-shadow: none !important; }

.card-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-md); border-bottom: 1px dashed var(--accent-dim); padding-bottom: var(--space-sm); }
.card-title { font-family: var(--font-ui); font-size: 1.6rem; color: var(--text-main); margin-bottom: 0; }
.card-period { font-family: var(--font-code); font-size: 0.85rem; color: var(--accent-core); }

.card-desc { color: var(--text-main); font-size: 0.95rem; flex-grow: 1; margin-bottom: var(--space-lg); }
.card-desc p, .card-desc ul, .card-desc li { color: var(--text-main) !important; }

.project-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-lg); }

.tech-list { list-style: none; display: flex; flex-wrap: wrap; gap: var(--space-sm); margin-bottom: var(--space-lg); }
.tech-tag { font-family: var(--font-code); font-size: 0.75rem; color: var(--accent-core); background: var(--accent-dim); border: 1px dashed var(--accent-border); padding: 4px 8px; border-radius: 4px; }

.btn-hud {
  display: inline-flex; align-items: center; gap: 8px; background: var(--accent-dim); color: var(--accent-core);
  border: 1px solid var(--accent-border); padding: 8px 16px; font-family: var(--font-ui); font-size: 1.1rem;
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
  box-shadow: 0 0 10px var(--accent-dim); transition: background 0.4s;
}
.timeline-date { font-family: var(--font-code); font-size: 0.85rem; color: var(--accent-core); margin-bottom: 4px; display: block; }
.timeline-title { font-family: var(--font-ui); font-size: 1.3rem; color: var(--text-main); margin-bottom: 2px; }
.timeline-org { font-weight: 600; color: var(--text-main); font-size: 1rem; margin-bottom: 8px; }
.timeline-desc { color: var(--text-muted); font-size: 0.95rem; }

footer { border-top: 1px solid var(--accent-border); padding: var(--space-lg) 0; text-align: center; font-family: var(--font-code); font-size: 0.8rem; color: var(--text-muted); }

/* =========================================
   RESPONSIVIDADE E DISTÚRBIOS VESTIBULARES
   ========================================= */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}

@media (max-width: 768px) {
  header { flex-direction: column; gap: var(--space-md); align-items: flex-start; padding-right: 0; }
  nav ul { flex-wrap: wrap; gap: var(--space-md); }
  .section-title { font-size: 1.8rem; }
  .card-header { flex-direction: column; }
  .a11y-toolbar { top: auto; bottom: 20px; right: 20px; }
  .container { padding: 0 var(--space-md); }

  /* No celular, o Go Game ocupa a tela inteira (sem padding/fundo do portfólio),
     pra parecer um aplicativo separado em vez de uma página comum. */
  .app-mode.container {
    padding: 0;
    min-height: 100dvh;
  }
  .app-mode .skip-link {
    display: none;
  }
  /* A barra fixa de acessibilidade vira uma faixa presa no topo (em vez de flutuar
     sobre o rodapé da tela), pra não tampar os botões principais do jogo. */
  .app-mode .a11y-toolbar {
    position: sticky;
    top: 0;
    bottom: auto;
    right: auto;
    left: auto;
    width: 100%;
    justify-content: center;
    border-radius: 0;
    border-width: 0 0 1px 0;
    z-index: 200;
  }
}

@media (max-width: 420px) {
  .container { padding: 0 12px; }
  .brand h1 { font-size: 1.5rem; }
}
</style>