<template>
  <div class="container" :class="{ 'high-contrast-mode': isHighContrast, 'light-mode': isLightMode, 'app-mode': isGameRoute }">
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
          <li><a href="#contact" @click.prevent="scrollToId('contact')">Uplink</a></li>
        </ul>
        <ul v-else>
          <li><router-link to="/">&larr; Portfólio</router-link></li>
          <li><router-link to="/arcade">Arcade</router-link></li>
          <li><router-link to="/recursos">Recursos</router-link></li>
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
        document.body.style.backgroundColor = '#f4f7fb';
      } else {
        document.body.style.backgroundColor = '#030509';
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Rajdhani:wght@500;600;700&family=Fira+Code:wght@400;500&display=swap');

/* =========================================
   VARIÁVEIS PADRÃO (DARK MODE / SCI-FI)
   ========================================= */
:root {
  --bg-base: #030509;
  --bg-surface: rgba(10, 15, 25, 0.7);
  --cyan-core: #00e5ff;
  --cyan-dim: rgba(0, 229, 255, 0.15);
  --cyan-border: rgba(0, 229, 255, 0.3);
  --text-main: #e2e8f0;
  --text-muted: #8892b0;
  
  --font-ui: 'Rajdhani', sans-serif;
  --font-read: 'Inter', sans-serif;
  --font-code: 'Fira Code', monospace;
  
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
}

/* =========================================
   VARIÁVEIS MODO CLARO (LIGHT MODE)
   ========================================= */
.light-mode {
  --bg-base: #f4f7fb;
  --bg-surface: rgba(255, 255, 255, 0.85);
  --cyan-core: #0066cc; /* Azul Elétrico mais escuro para contraste */
  --cyan-dim: rgba(0, 102, 204, 0.1);
  --cyan-border: rgba(0, 102, 204, 0.3);
  --text-main: #1a202c;
  --text-muted: #4a5568;
}

/* =========================================
   VARIÁVEIS ALTO CONTRASTE (PRIORIDADE MÁXIMA)
   ========================================= */
.high-contrast-mode {
  --bg-base: #000000;
  --bg-surface: #000000;
  --cyan-core: #FFFF00; /* Amarelo puro */
  --cyan-dim: transparent;
  --cyan-border: #FFFF00;
  --text-main: #FFFFFF;
  --text-muted: #FFFFFF;
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

/* O grid de fundo precisa ser gerenciado pelo wrapper para respeitar os temas */
.container {
  min-height: 100vh;
  background-color: var(--bg-base);
  background-image: 
    linear-gradient(var(--cyan-dim) 1px, transparent 1px),
    linear-gradient(90deg, var(--cyan-dim) 1px, transparent 1px);
  background-size: 40px 40px;
  background-attachment: fixed;
  transition: background-color 0.4s ease, max-width 0.3s ease;
  padding: 0 var(--space-lg);
  max-width: 1000px;
  margin: 0 auto;
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

/* Desliga fundo no alto contraste */
.high-contrast-mode.container { background-image: none !important; }

/* =========================================
   ACESSBILIDADE & BARRA HUD
   ========================================= */
.skip-link {
  position: absolute; top: -100px; left: 0;
  background: var(--cyan-core); color: #000;
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
  outline: 2px dashed var(--cyan-core); outline-offset: 4px;
  box-shadow: 0 0 15px var(--cyan-dim); border-radius: 4px;
}

.a11y-toolbar {
  position: fixed; top: 20px; right: 20px;
  display: flex; gap: 8px; align-items: center;
  z-index: 1000; background: var(--bg-surface);
  padding: 8px; border: 1px solid var(--cyan-border);
  border-radius: 8px; backdrop-filter: blur(10px);
  transition: background 0.4s, border-color 0.4s;
}

.a11y-divider {
  width: 1px; height: 24px; background-color: var(--cyan-border);
  margin: 0 4px;
}

.a11y-btn {
  background: transparent; color: var(--text-main);
  border: 1px solid var(--cyan-border); border-radius: 4px;
  padding: 6px 12px; font-family: var(--font-code);
  font-size: 1rem; font-weight: bold; cursor: pointer;
  transition: all 0.2s; display: flex; align-items: center; justify-content: center;
}
.a11y-btn:hover, .a11y-btn:focus-visible {
  background: var(--cyan-core); color: var(--bg-base);
}
.a11y-btn svg { width: 16px; height: 16px; }
.theme-btn { padding: 6px 8px; }

/* =========================================
   LAYOUT & COMPONENTES
   ========================================= */
header {
  padding: var(--space-lg) 0; display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid var(--cyan-border); margin-bottom: var(--space-xl);
  background: var(--bg-surface);
  position: sticky; top: 0; z-index: 100; backdrop-filter: blur(8px);
  transition: background 0.4s, border-color 0.4s;
  /* Reserva espaço à direita para a barra de acessibilidade fixa (top:20/right:20),
     evitando que itens de navegação fiquem escondidos/inclicáveis atrás dela. */
  padding-right: 300px;
}

/* Gradiente na borda superior apenas no Dark Mode (Fica feio no claro) */
body:not(.light-mode):not(.high-contrast-mode) header {
  background: linear-gradient(180deg, rgba(3,5,9,0.95) 0%, rgba(3,5,9,0) 100%);
}

.brand h1 { font-family: var(--font-ui); font-size: 2rem; color: var(--text-main); text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 10px var(--cyan-dim); }
.brand span { font-family: var(--font-code); font-size: 0.8rem; color: var(--cyan-core); }
nav ul { list-style: none; display: flex; gap: var(--space-lg); }
nav a { color: var(--text-muted); text-decoration: none; font-family: var(--font-ui); font-size: 1.1rem; text-transform: uppercase; transition: 0.3s; }
nav a:hover { color: var(--cyan-core); text-shadow: 0 0 8px var(--cyan-dim); }
nav a.nav-highlight { color: var(--cyan-core); }

section { margin-bottom: var(--space-xl); }
.section-title {
  font-family: var(--font-ui); font-size: 2.2rem; color: var(--text-main); margin-bottom: var(--space-lg);
  display: flex; align-items: center; gap: var(--space-md);
}
.section-title::before { content: ''; display: block; width: 12px; height: 12px; background: var(--cyan-core); box-shadow: 0 0 10px var(--cyan-dim); }

.hud-card {
  background: var(--bg-surface); 
  border: 1px solid var(--cyan-border); 
  border-radius: 8px;
  padding: var(--space-lg); 
  display: flex; 
  flex-direction: column; 
  transition: all 0.3s;
  backdrop-filter: blur(10px);
  color: var(--text-main); 
}
.hud-card p, .hud-card strong {
  color: var(--text-main);
}
.hud-card:hover { 
  transform: translateY(-3px); 
  border-color: var(--cyan-core); 
  box-shadow: 0 5px 20px var(--cyan-dim); 
}

.high-contrast-mode .hud-card { border-width: 2px; box-shadow: none !important; }

.card-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-md); border-bottom: 1px dashed var(--cyan-dim); padding-bottom: var(--space-sm); }
.card-title { font-family: var(--font-ui); font-size: 1.6rem; color: var(--text-main); margin-bottom: 0; }
.card-period { font-family: var(--font-code); font-size: 0.85rem; color: var(--cyan-core); }

.card-desc { color: var(--text-main); font-size: 0.95rem; flex-grow: 1; margin-bottom: var(--space-lg); }
.card-desc p, .card-desc ul, .card-desc li { color: var(--text-main) !important; }

.project-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-lg); }

.tech-list { list-style: none; display: flex; flex-wrap: wrap; gap: var(--space-sm); margin-bottom: var(--space-lg); }
.tech-tag { font-family: var(--font-code); font-size: 0.75rem; color: var(--cyan-core); background: var(--cyan-dim); border: 1px dashed var(--cyan-border); padding: 4px 8px; border-radius: 4px; }

.btn-hud { display: inline-flex; align-items: center; gap: 8px; background: var(--cyan-dim); color: var(--cyan-core); border: 1px solid var(--cyan-border); padding: 8px 16px; font-family: var(--font-ui); font-size: 1.1rem; text-decoration: none; text-transform: uppercase; transition: all 0.3s; align-self: flex-start; }
.btn-hud:hover { background: var(--cyan-core); color: var(--bg-base); box-shadow: 0 0 15px var(--cyan-dim); }
.btn-hud--live { background: var(--cyan-core); color: var(--bg-base); font-weight: 700; }
.btn-hud--live:hover { box-shadow: 0 0 25px var(--cyan-core); opacity: 0.85; }

.timeline { list-style: none; position: relative; padding-left: 30px; }
.timeline::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
  background: linear-gradient(to bottom, var(--cyan-core), transparent);
}
.timeline-item { position: relative; margin-bottom: var(--space-lg); }
.timeline-item::before {
  content: ''; position: absolute; left: -36px; top: 6px; width: 14px; height: 14px;
  background: var(--bg-base); border: 2px solid var(--cyan-core); border-radius: 50%;
  box-shadow: 0 0 10px var(--cyan-dim); transition: background 0.4s;
}
.timeline-date { font-family: var(--font-code); font-size: 0.85rem; color: var(--cyan-core); margin-bottom: 4px; display: block; }
.timeline-title { font-family: var(--font-ui); font-size: 1.3rem; color: var(--text-main); margin-bottom: 2px; }
.timeline-org { font-weight: 600; color: var(--text-main); font-size: 1rem; margin-bottom: 8px; }
.timeline-desc { color: var(--text-muted); font-size: 0.95rem; }

footer { border-top: 1px solid var(--cyan-border); padding: var(--space-lg) 0; text-align: center; font-family: var(--font-code); font-size: 0.8rem; color: var(--text-muted); }

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
    background-image: none;
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