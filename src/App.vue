<template>
  <div id="app-shell">
    <a href="#main-content" class="skip-link" @click.prevent="skipToMain">{{ copy.a11y.skip }}</a>

    <!-- Modo jogo: tela cheia, sem cabeçalho/rodapé de currículo (cada jogo tem seu próprio botão de voltar) -->
    <template v-if="isGameRoute">
      <router-view />

      <button v-if="showBackTop" type="button" class="back-to-top" :aria-label="copy.a11y.backTop" @click="backToTop">↑</button>
    </template>

    <template v-else>
      <div class="a11y-bar" role="group" :aria-label="copy.a11y.reading">
        <div class="a11y-bar-inner">
          <span class="a11y-bar-label">{{ copy.a11y.reading }}</span>
          <button type="button" class="a11y-btn" @click="changeFontSize(-1)" :aria-label="copy.a11y.decrease">
            A<span aria-hidden="true">−</span>
          </button>
          <button type="button" class="a11y-btn" @click="changeFontSize(1)" :aria-label="copy.a11y.increase">
            A<span aria-hidden="true">+</span>
          </button>
          <button
            type="button"
            class="a11y-btn"
            :class="{ 'a11y-btn--active': isHighContrast }"
            :aria-pressed="isHighContrast"
            :aria-label="copy.a11y.contrast"
            @click="toggleHighContrast"
          >
            {{ copy.a11y.contrast }}
          </button>
          <button
            type="button"
            class="a11y-btn"
            :class="{ 'a11y-btn--active': reduceMotion }"
            :aria-pressed="reduceMotion"
            :aria-label="copy.a11y.motion"
            @click="toggleReduceMotion"
          >
            {{ copy.a11y.motion }}
          </button>
          <button
            type="button"
            class="a11y-btn"
            :aria-label="theme === 'dark' ? copy.a11y.light : copy.a11y.dark"
            @click="toggleTheme"
          >
            {{ theme === 'dark' ? copy.a11y.light : copy.a11y.dark }}
          </button>
        </div>
      </div>

      <header class="site-header">
        <div class="site-header-inner">
          <router-link :to="locale === 'pt-BR' ? '/' : { name: 'localized-home', params: { locale } }" class="brand">
            <span class="brand-name">Rebeca Nonato</span>
            <span class="brand-role">Software Engineer</span>
          </router-link>

          <button
            type="button"
            class="nav-toggle"
            :aria-expanded="navOpen"
            aria-controls="primary-nav"
            @click="navOpen = !navOpen"
          >
            <span aria-hidden="true">{{ navOpen ? '✕' : '☰' }}</span>
            <span class="sr-only">{{ navOpen ? copy.a11y.close : copy.a11y.open }}</span>
          </button>

          <nav id="primary-nav" class="primary-nav" :class="{ 'primary-nav--open': navOpen }" :aria-label="copy.navLabel">
            <router-link
              v-for="item in resumeNavLocalized"
              :key="item.hash"
              :to="{ path: '/', hash: item.hash }"
              class="nav-link"
              :aria-current="activeSection === item.hash.slice(1) ? 'location' : undefined"
              @click="navOpen = false"
            >{{ item.label }}</router-link>
            <span class="nav-divider" aria-hidden="true"></span>
            <router-link to="/servicos" class="nav-link" active-class="nav-link--active" @click="navOpen = false">{{ copy.nav.services }}</router-link>
            <router-link to="/arcade" class="nav-link" active-class="nav-link--active" @click="navOpen = false">{{ copy.nav.arcade }}</router-link>
            <router-link to="/recursos" class="nav-link" active-class="nav-link--active" @click="navOpen = false">{{ copy.nav.resources }}</router-link>
            <div class="locale-picker" role="group" :aria-label="copy.languageLabel"><button v-for="option in localeOptions" :key="option" type="button" :class="{ 'locale-active': option === locale }" :aria-pressed="option === locale" @click="setLocale(option)">{{ LOCALES[option].languageName }}</button></div>
          </nav>
        </div>
      </header>

      <router-view />

      <footer class="site-footer">
        <div class="site-footer-inner">
          <div class="site-footer-col">
            <p class="footer-name">Rebeca Nonato</p>
            <p class="footer-tagline">Software Engineer — Backend, Distributed Systems &amp; Cloud-Native</p>
            <ul class="footer-links" :aria-label="copy.footer.contact">
              <li><a href="mailto:rebecanonato89@gmail.com">rebecanonato89@gmail.com</a></li>
              <li><a href="https://www.linkedin.com/in/rebecanonato89/" target="_blank" rel="noopener noreferrer">LinkedIn<span class="sr-only"> ({{ copy.a11y.external }})</span></a></li>
              <li><a href="https://github.com/rebecanonato89" target="_blank" rel="noopener noreferrer">GitHub<span class="sr-only"> ({{ copy.a11y.external }})</span></a></li>
            </ul>
          </div>

          <div class="site-footer-col">
            <p class="footer-heading">{{ copy.footer.explore }}</p>
            <ul class="footer-links">
              <li><router-link to="/servicos">{{ copy.nav.services }}</router-link></li>
              <li><router-link to="/arcade">{{ copy.nav.arcade }}</router-link></li>
              <li><router-link to="/recursos">{{ copy.nav.resources }}</router-link></li>
            </ul>
          </div>

          <div class="site-footer-col">
            <p class="footer-heading">{{ copy.footer.formats }}</p>
            <ul class="footer-links">
              <li><a href="/rebeca-nonato-curriculo.pdf" download>PDF</a></li>
              <li><a href="/resume.md" download>Markdown</a></li>
              <li><a href="/resume.json">{{ copy.footer.resumeJson }}</a></li>
              <li><a href="/llms.txt">llms.txt</a></li>
              <li><a href="/sitemap.xml">sitemap.xml</a></li>
            </ul>
          </div>
        </div>
        <p class="footer-note">
          {{ copy.footer.note }}
        </p>
      </footer>
    </template>
  </div>
</template>

<script>
import { LOCALES, LOCALE_OPTIONS, DEFAULT_LOCALE, getLocale } from './i18n/index.js';
const GAME_ROUTES = ['/go', '/damas', '/memoria'];

const RESUME_NAV = [
  { hash: '#sobre', key: 'about' },
  { hash: '#projetos', key: 'projects' },
  { hash: '#experiencia', key: 'experience' },
  { hash: '#skills', key: 'skills' },
  { hash: '#certificacoes', key: 'education' },
  { hash: '#contato', key: 'contact' },
];

const ROUTE_TITLES = {
  '/': 'Rebeca Nonato — Software Engineer | Backend & Distributed Systems',
  '/servicos': 'Serviços | Rebeca Nonato',
  '/arcade': 'Arcade | Rebeca Nonato',
  '/recursos': 'Recursos | Rebeca Nonato',
  '/go': 'Go | Arcade | Rebeca Nonato',
  '/damas': 'Damas | Arcade | Rebeca Nonato',
  '/memoria': 'Jogo da Memória | Arcade | Rebeca Nonato',
};

export default {
  name: 'App',
  data() {
    return {
      resumeNav: RESUME_NAV,
      localeOptions: LOCALE_OPTIONS,
      LOCALES,
      locale: getLocale(this.$route.params.locale || (typeof window !== 'undefined' ? localStorage.getItem('rn-locale') : null) || DEFAULT_LOCALE),
      activeSection: 'inicio',
      showBackTop: false,
      sectionObserver: null,
      navOpen: false,
      fontSizeStep: 0,
      isHighContrast: false,
      reduceMotion: false,
      theme: 'dark',
    };
  },
  computed: {
    copy() { return LOCALES[this.locale]; },
    resumeNavLocalized() { return this.resumeNav.map(item => ({ ...item, label: this.copy.nav[item.key] })); },
    isGameRoute() {
      return GAME_ROUTES.includes(this.$route.path);
    },
  },
  watch: {
    '$route'(to) {
      this.navOpen = false;
      this.syncLocale(to);
      this.updateMetadata(to);
    },
  },
  mounted() {
    this.syncLocale(this.$route);
    this.updateMetadata(this.$route);

    // O tema e o contraste já foram aplicados via script inline em index.html
    // (evita flash de tema errado); aqui só sincronizamos o estado reativo.
    this.theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    this.isHighContrast = document.documentElement.getAttribute('data-contrast') === 'high';

    const savedStep = parseInt(localStorage.getItem('rn-font-step') || '0', 10);
    if (!Number.isNaN(savedStep)) this.fontSizeStep = savedStep;

    this.reduceMotion = localStorage.getItem('rn-reduced-motion') === '1';
    this.applyReduceMotionClass();
    this.setupScrollSpy();
    window.addEventListener('scroll', this.updateBackTop, { passive: true });
    this.updateBackTop();
  },
  beforeUnmount() {
    this.sectionObserver?.disconnect();
    window.removeEventListener('scroll', this.updateBackTop);
  },
  methods: {
    syncLocale(route) {
      const routeLocale = route.params && route.params.locale;
      this.locale = getLocale(routeLocale || localStorage.getItem('rn-locale') || DEFAULT_LOCALE);
      localStorage.setItem('rn-locale', this.locale);
    },
    setLocale(locale) {
      const next = getLocale(locale);
      localStorage.setItem('rn-locale', next);
      this.locale = next;
      if (this.isGameRoute) return;
      this.$router.push({ name: 'localized-home', params: { locale: next } });
    },
    updateMetadata(route) {
      const isHome = route.path === '/' || route.name === 'localized-home';
      const meta = isHome ? this.copy : LOCALES[DEFAULT_LOCALE];
      document.documentElement.setAttribute('lang', meta.htmlLang);
      document.title = isHome ? meta.title : ROUTE_TITLES[route.path] || ROUTE_TITLES['/'];
      const description = document.querySelector('meta[name="description"]');
      if (description) description.setAttribute('content', meta.description);
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', meta.title);
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) ogDescription.setAttribute('content', meta.description);
      const ogLocale = document.querySelector('meta[property="og:locale"]');
      if (ogLocale) ogLocale.setAttribute('content', meta.ogLocale);
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) twitterTitle.setAttribute('content', meta.title);
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription) twitterDescription.setAttribute('content', meta.description);
    },
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.theme);
      localStorage.setItem('rn-theme', this.theme);
    },
    toggleHighContrast() {
      this.isHighContrast = !this.isHighContrast;
      if (this.isHighContrast) {
        document.documentElement.setAttribute('data-contrast', 'high');
        localStorage.setItem('rn-contrast', '1');
      } else {
        document.documentElement.removeAttribute('data-contrast');
        localStorage.setItem('rn-contrast', '0');
      }
    },
    toggleReduceMotion() {
      this.reduceMotion = !this.reduceMotion;
      localStorage.setItem('rn-reduced-motion', this.reduceMotion ? '1' : '0');
      this.applyReduceMotionClass();
    },
    applyReduceMotionClass() {
      document.documentElement.classList.toggle('force-reduced-motion', this.reduceMotion);
    },
    changeFontSize(step) {
      this.fontSizeStep = Math.min(4, Math.max(-2, this.fontSizeStep + step));
      localStorage.setItem('rn-font-step', String(this.fontSizeStep));
      document.documentElement.style.fontSize = `${100 + this.fontSizeStep * 10}%`;
    },
    skipToMain() {
      const el = document.getElementById('main-content');
      if (!el) return;
      el.setAttribute('tabindex', '-1');
      el.focus();
      el.scrollIntoView();
    },
    setupScrollSpy() {
      if (!('IntersectionObserver' in window)) return;
      const ids = ['sobre', 'projetos', 'experiencia', 'skills', 'certificacoes', 'contato'];
      this.sectionObserver = new IntersectionObserver((entries) => {
        const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) this.activeSection = visible[0].target.id;
      }, { rootMargin: '-22% 0px -62% 0px', threshold: [0.1, 0.35, 0.6] });
      ids.map(id => document.getElementById(id)).filter(Boolean).forEach(section => this.sectionObserver.observe(section));
    },
    updateBackTop() { this.showBackTop = window.scrollY > Math.max(420, window.innerHeight * 0.7); },
    backToTop() { window.scrollTo({ top: 0, behavior: this.reduceMotion ? 'auto' : 'smooth' }); },
  },
};
</script>

<style>
/* =========================================================================
   Design tokens — tema claro (padrão) / escuro / alto contraste
   ========================================================================= */
:root {
  --bg-base: #f7f9fc;
  --bg-surface: #eef2f8;
  --bg-surface-raised: #ffffff;
  --bg-alternate: #f1f5fa;
  --text-main: #101828;
  --text-muted: #475467;
  --text-subtle: #667085;
  --accent-core: #3157d5;
  --accent-hover: #2546b8;
  --accent-cyan: #087e8b;
  --accent-soft: #98a2b3;
  --accent-glow: rgba(49, 87, 213, 0.14);
  --accent-dim: rgba(29, 78, 216, 0.1);
  --accent-border: #d7deea;
  --code-bg: #e9eef7;
  --status-ok: #138a63;
  --button-text: #ffffff;
  --card-shadow: rgba(15, 23, 42, 0.08);
  --scrim-overlay: rgba(15, 23, 42, 0.6);

  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 18px;

  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.75rem;
  --space-xl: 3rem;

  --font-ui: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-read: 'Atkinson Hyperlegible', 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-code: ui-monospace, 'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', monospace;

  --focus-ring: 3px solid var(--accent-core);
  color-scheme: light;
}

:root[data-theme='dark'] {
  --bg-base: #080D18;
  --bg-surface: #0D1524;
  --bg-surface-raised: #111C2E;
  --bg-alternate: #0B1321;
  --text-main: #F0F5FF;
  --text-muted: #A8B5CA;
  --text-subtle: #7D8DA7;
  --accent-core: #6F8CFF;
  --accent-hover: #91A7FF;
  --accent-cyan: #55D7E5;
  --accent-soft: #40506C;
  --accent-glow: rgba(69, 102, 240, 0.24);
  --accent-dim: rgba(111, 140, 255, 0.13);
  --accent-border: #26344B;
  --code-bg: #09111F;
  --status-ok: #4BD6A2;
  --button-text: #07101D;
  --card-shadow: rgba(0, 0, 0, 0.45);
  --scrim-overlay: rgba(0, 0, 0, 0.7);
  color-scheme: dark;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --bg-base: #080d18;
    --bg-surface: #0f1929;
    --bg-surface-raised: #142137;
    --bg-alternate: #0b1321;
    --text-main: #f2f4f8;
    --text-muted: #aab7ce;
    --text-subtle: #8292ad;
    --accent-core: #6685ff;
    --accent-hover: #8fa5ff;
    --accent-cyan: #42d5e8;
    --accent-soft: #4a5e83;
    --accent-glow: rgba(66, 213, 232, 0.2);
    --accent-dim: rgba(102, 133, 255, 0.15);
    --accent-border: #263650;
    --code-bg: #0a1424;
    --status-ok: #42d5e8;
    --button-text: #07101d;
    --card-shadow: rgba(0, 0, 0, 0.45);
    --scrim-overlay: rgba(0, 0, 0, 0.7);
    color-scheme: dark;
  }
}

:root[data-theme='light'][data-contrast='high'] {
  --bg-base: #ffffff;
  --bg-surface: #ffffff;
  --bg-surface-raised: #ffffff;
  --bg-alternate: #f5f7fb;
  --text-main: #000000;
  --text-muted: #111111;
  --text-subtle: #222222;
  --accent-core: #0645d6;
  --accent-hover: #0036ad;
  --accent-cyan: #0036ad;
  --accent-soft: #000000;
  --accent-glow: transparent;
  --accent-dim: #e5edff;
  --accent-border: #000000;
  --code-bg: #ffffff;
  --status-ok: #0645d6;
  --button-text: #ffffff;
  --card-shadow: transparent;
  --scrim-overlay: rgba(0, 0, 0, 0.9);
  --focus-ring: 3px solid #0645d6;
  color-scheme: light;
}

:root[data-theme='dark'][data-contrast='high'] {
  --bg-base: #000000;
  --bg-surface: #000000;
  --bg-surface-raised: #0a0a0a;
  --bg-alternate: #000000;
  --text-main: #ffffff;
  --text-muted: #f2f2f2;
  --accent-core: #ffd60a;
  --accent-hover: #ffe066;
  --accent-cyan: #ffffff;
  --accent-soft: #ffffff;
  --accent-glow: transparent;
  --accent-dim: rgba(255, 214, 10, 0.2);
  --accent-border: #ffffff;
  --code-bg: #000000;
  --status-ok: #ffffff;
  --button-text: #000000;
  --card-shadow: transparent;
  --scrim-overlay: rgba(0, 0, 0, 0.9);
  --focus-ring: 3px solid #ffd60a;
  color-scheme: dark;
}

/* =========================================================================
   Reset & base
   ========================================================================= */
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
html, body { margin: 0; padding: 0; }

body {
  background: var(--bg-base);
  color: var(--text-main);
  font-family: var(--font-read);
  font-size: 1.0625rem;
  line-height: 1.65;
  min-height: 100vh;
}

img { max-width: 100%; display: block; }

h1, h2, h3, h4 { font-family: var(--font-ui); font-weight: 700; line-height: 1.25; color: var(--text-main); }

a { color: var(--accent-core); }
a:hover { color: var(--accent-hover); }

:focus-visible { outline: var(--focus-ring); outline-offset: 3px; border-radius: 2px; }

.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.skip-link {
  position: absolute;
  top: -100px;
  left: var(--space-md);
  z-index: 3000;
  background: var(--accent-core);
  color: #fff;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-ui);
  font-weight: 600;
  text-decoration: none;
  transition: top 0.15s ease;
}
.skip-link:focus { top: var(--space-md); }

/* =========================================================================
   Reduced motion
   ========================================================================= */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }
}
html.force-reduced-motion *, html.force-reduced-motion *::before, html.force-reduced-motion *::after {
  animation-duration: 0.001ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.001ms !important;
  scroll-behavior: auto !important;
}
html { scroll-behavior: smooth; }

/* =========================================================================
   Accessibility preferences bar
   ========================================================================= */
.a11y-bar {
  background: var(--text-main);
  color: var(--bg-base);
}
.a11y-bar-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.4rem var(--space-md);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  font-family: var(--font-ui);
  font-size: 0.8rem;
}
.a11y-bar-label { opacity: 0.75; margin-right: 0.15rem; }
.a11y-btn {
  background: transparent;
  color: inherit;
  border: 1px solid currentColor;
  border-radius: var(--radius-sm);
  padding: 0.3rem 0.6rem;
  min-height: 24px;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  opacity: 0.85;
}
.a11y-btn:hover { opacity: 1; }
.a11y-btn--active { background: var(--accent-core); border-color: var(--accent-core); color: #101216; opacity: 1; font-weight: 600; }

/* =========================================================================
   Site header
   ========================================================================= */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: color-mix(in srgb, var(--bg-base) 88%, transparent);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--accent-border);
}
.site-header-inner {
  width: calc(100% - 96px);
  max-width: 1480px;
  margin: 0 auto;
  padding: var(--space-sm) var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-md);
}
.brand {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
  text-decoration: none;
  margin-right: auto;
}
.brand-name { font-family: var(--font-ui); font-weight: 700; font-size: 1.05rem; color: var(--text-main); }
.brand-role { font-size: 0.75rem; color: var(--text-muted); }

.nav-toggle {
  display: none;
  background: transparent;
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-sm);
  color: var(--text-main);
  width: 40px;
  height: 40px;
  font-size: 1.1rem;
  cursor: pointer;
}

.primary-nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.2rem;
}
.nav-divider {
  width: 1px;
  height: 18px;
  background: var(--accent-border);
  margin: 0 0.35rem;
}
.nav-link {
  font-family: var(--font-ui);
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--text-main);
  text-decoration: none;
  padding: 0.45rem 0.6rem;
  border-radius: var(--radius-sm);
}
.nav-link:hover { background: var(--accent-dim); color: var(--accent-core); }
.nav-link--active { color: var(--accent-core); font-weight: 700; }

.locale-picker { display: inline-flex; gap: 0.15rem; margin-left: 0.35rem; padding-left: 0.45rem; border-left: 1px solid var(--accent-border); }
.locale-picker button { border: 0; border-radius: var(--radius-sm); padding: 0.4rem 0.45rem; background: transparent; color: var(--text-muted); font: 600 0.72rem var(--font-code); cursor: pointer; }
.locale-picker button:hover, .locale-picker button.locale-active { background: var(--accent-dim); color: var(--accent-core); }

@media (max-width: 1080px) {
  .nav-toggle { display: inline-flex; align-items: center; justify-content: center; }
  .primary-nav {
    display: none;
    position: absolute;
    left: 0; right: 0; top: 100%;
    flex-direction: column;
    align-items: stretch;
    background: var(--bg-base);
    border-bottom: 1px solid var(--accent-border);
    padding: var(--space-sm) var(--space-md) var(--space-md);
  }
  .primary-nav--open { display: flex; }
  .nav-divider { display: none; }
  .locale-picker { margin: 0.35rem 0 0; padding: 0.35rem 0 0; border-left: 0; border-top: 1px solid var(--accent-border); }
  .site-header { position: relative; }
  .nav-link { padding: 0.65rem 0.4rem; border-bottom: 1px solid var(--accent-border); border-radius: 0; }
}

@media (max-width: 1366px) {
  .site-header-inner, .site-footer-inner, .footer-note { width: calc(100% - 64px); }
}

@media (max-width: 1024px) {
  .site-header-inner, .site-footer-inner, .footer-note { width: calc(100% - 40px); }
}

@media (max-width: 700px) {
  .site-header-inner, .site-footer-inner, .footer-note { width: calc(100% - 32px); }
}

/* =========================================================================
   Layout / typography helpers shared by every page
   ========================================================================= */
main {
  display: block;
  max-width: 880px;
  margin: 0 auto;
  padding: var(--space-xl) var(--space-md) var(--space-xl);
}

section { margin-bottom: var(--space-xl); scroll-margin-top: 5.5rem; }
section:last-child { margin-bottom: 0; }

.section-title {
  font-size: 1.4rem;
  margin: 0 0 var(--space-md);
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--accent-border);
}

.hud-card {
  background: var(--bg-surface);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  box-shadow: 0 1px 3px var(--card-shadow);
}

.card-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.5rem; }
.card-title { font-size: 1.1rem; margin: 0; }
.card-period { font-family: var(--font-ui); font-size: 0.8rem; color: var(--text-muted); white-space: nowrap; }
.card-desc { color: var(--text-main); }
.card-desc p { margin: 0 0 0.6rem; }
.card-desc p:last-child { margin-bottom: 0; }
.card-desc ul { margin: 0; }

.tech-list { list-style: none; display: flex; flex-wrap: wrap; gap: 0.4rem; padding: 0; margin: var(--space-sm) 0 0; }
.tech-tag {
  font-family: var(--font-ui);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--accent-core);
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  border-radius: 999px;
  padding: 0.2rem 0.65rem;
}

.project-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-md); }

.btn-hud {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  color: var(--text-main);
  background: var(--bg-surface-raised);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-sm);
  padding: 0.55rem 1rem;
  cursor: pointer;
  line-height: 1.2;
}
.btn-hud:hover { border-color: var(--accent-core); color: var(--accent-core); }
.btn-hud--live { background: var(--accent-core); border-color: var(--accent-core); color: #ffffff; }
.btn-hud--live:hover { background: var(--accent-hover); border-color: var(--accent-hover); color: #ffffff; }

.timeline { list-style: none; margin: 0; padding: 0; border-left: 2px solid var(--accent-border); }
.timeline-item { position: relative; padding: 0 0 var(--space-lg) var(--space-lg); }
.timeline-item:last-child { padding-bottom: 0; }
.timeline-item::before {
  content: '';
  position: absolute;
  left: -7px; top: 0.35rem;
  width: 12px; height: 12px;
  border-radius: 50%;
  background: var(--accent-core);
  border: 2px solid var(--bg-base);
}
.timeline-date { font-family: var(--font-ui); font-size: 0.78rem; font-weight: 600; color: var(--accent-core); text-transform: uppercase; letter-spacing: 0.02em; }
.timeline-title { font-size: 1.05rem; margin: 0.15rem 0 0.1rem; }
.timeline-badge {
  display: inline-block;
  margin-left: 0.5rem;
  font-family: var(--font-ui);
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--accent-core);
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  border-radius: 999px;
  padding: 0.1rem 0.5rem;
  vertical-align: middle;
}
.timeline-org { font-family: var(--font-ui); font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.4rem; }
.timeline-desc { margin: 0; }

/* =========================================================================
   Hero / stats (usados pela Home)
   ========================================================================= */
.hero { margin-bottom: var(--space-xl); }
.hero-eyebrow {
  font-family: var(--font-ui);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent-core);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem;
}
.hero h1 { font-size: 2.1rem; margin: 0 0 0.4rem; }
.hero-role { font-family: var(--font-ui); font-size: 1.1rem; color: var(--text-muted); margin: 0 0 var(--space-md); }
.hero-summary { max-width: 62ch; margin: 0 0 var(--space-md); }
.hero-actions { display: flex; gap: var(--space-sm); flex-wrap: wrap; margin-top: var(--space-md); }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--space-sm);
  margin: var(--space-lg) 0 0;
}
.stat-item {
  background: var(--bg-surface);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  text-align: left;
}
.stat-value {
  font-family: var(--font-ui);
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--accent-core);
  font-variant-numeric: tabular-nums;
  display: block;
}
.stat-label { font-size: 0.82rem; color: var(--text-muted); }

.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-md); }
.skill-group-title { font-family: var(--font-ui); font-size: 0.95rem; margin: 0 0 0.5rem; }

.publication-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-sm); }
.note-secondary { font-size: 0.9rem; color: var(--text-muted); margin-top: var(--space-md); }
.link-btn {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: var(--accent-core);
  text-decoration: underline;
  cursor: pointer;
}
.link-btn:hover { color: var(--accent-hover); }

/* Modo jogo: ocupa a tela inteira sem cabeçalho/rodapé */
.game-shell { min-height: 100vh; }

/* =========================================================================
   Footer
   ========================================================================= */
.site-footer {
  background: var(--bg-surface);
  border-top: 1px solid var(--accent-border);
  padding: var(--space-xl) var(--space-md) var(--space-lg);
}
.site-footer-inner {
  width: calc(100% - 96px);
  max-width: 1480px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-lg);
}
.footer-name { font-family: var(--font-ui); font-weight: 700; margin: 0 0 0.2rem; }
.footer-tagline { color: var(--text-muted); font-size: 0.9rem; margin: 0; }
.footer-heading { font-family: var(--font-ui); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); margin: 0 0 0.5rem; }
.footer-links { list-style: none; margin: 0.6rem 0 0; padding: 0; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.92rem; }
.footer-links a { color: var(--text-main); text-decoration: none; }
.footer-links a:hover { color: var(--accent-core); text-decoration: underline; }
.footer-note {
  width: calc(100% - 96px);
  max-width: 1480px;
  margin: var(--space-lg) auto 0;
  padding-top: var(--space-md);
  border-top: 1px solid var(--accent-border);
  color: var(--text-muted);
  font-size: 0.8rem;
}

/* =========================================================================
   Print — o currículo precisa ficar apresentável impresso / salvo em PDF
   ========================================================================= */
@media print {
  .a11y-bar, .site-header, .site-footer, .skip-link { display: none !important; }
  body { font-size: 12pt; color: #000; background: #fff; }
  main { max-width: 100%; padding: 0; }
  a { color: #000; text-decoration: underline; }
  .hud-card { box-shadow: none; border: 1px solid #999; break-inside: avoid; }
  section { break-inside: avoid-page; }
}
</style>
