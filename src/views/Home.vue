<template>
  <main id="main-content">
    <section id="inicio" class="hero" aria-labelledby="hero-title">
      <p class="hero-eyebrow">Software Engineering Portfolio</p>
      <h1 id="hero-title">{{ basicsData.name }}</h1>
      <p class="hero-role">{{ basicsData.label }}</p>
      <p class="hero-summary">{{ basicsData.summary }}</p>

      <div class="hero-actions">
        <a href="mailto:rebecanonato89@gmail.com" class="btn-hud btn-hud--live">Entrar em contato</a>
        <a href="https://github.com/rebecanonato89" target="_blank" rel="noopener noreferrer" class="btn-hud">
          GitHub<span class="sr-only"> (abre em nova aba)</span>
        </a>
        <a href="https://www.linkedin.com/in/rebecanonato89/" target="_blank" rel="noopener noreferrer" class="btn-hud">
          LinkedIn<span class="sr-only"> (abre em nova aba)</span>
        </a>
      </div>
      <p class="note-secondary hero-resume-links">
        Currículo:
        <a href="/rebeca-nonato-curriculo.pdf" download>PDF</a>
        <span aria-hidden="true">·</span>
        <a href="/resume.md" download>Markdown</a>
        <span aria-hidden="true">·</span>
        <a href="/resume.json">JSON</a>
        <span aria-hidden="true">·</span>
        <button type="button" class="link-btn" @click="printResume">Imprimir</button>
      </p>

      <div class="stats-grid" role="list" aria-label="Números em destaque">
        <div v-for="h in highlightsData" :key="h.label" class="stat-item" role="listitem">
          <span class="stat-value">{{ h.value }}</span>
          <span class="stat-label">{{ h.label }}</span>
        </div>
      </div>
    </section>

    <section id="sobre" aria-labelledby="sobre-title">
      <h2 id="sobre-title" class="section-title">Sobre</h2>
      <div class="hud-card">
        <p v-for="(paragraph, i) in aboutData.paragraphs" :key="i">{{ paragraph }}</p>
      </div>
    </section>

    <section id="experiencia" aria-labelledby="experiencia-title">
      <h2 id="experiencia-title" class="section-title">Experiência</h2>
      <p class="lede-note">
        Progressão de Analista de Sistemas a referência técnica em backend — cargos e datas verificáveis no
        <a href="/resume.json">resume.json</a>.
      </p>
      <ol class="timeline">
        <li v-for="job in experienceData" :key="job.role + job.company + job.period" class="timeline-item">
          <div class="timeline-date">
            <time>{{ job.period }}</time>
            <span v-if="job.evolution" class="timeline-badge">{{ job.evolution }}</span>
          </div>
          <h3 class="timeline-title">{{ job.role }}</h3>
          <div class="timeline-org">{{ job.company }}</div>
          <p class="timeline-desc">{{ job.description }}</p>
        </li>
      </ol>
    </section>

    <section id="projetos" aria-labelledby="projetos-title">
      <h2 id="projetos-title" class="section-title">Engenharia &amp; Projetos</h2>
      <p class="section-intro">
        Uma seleção de projetos públicos que evidencia arquitetura, sistemas distribuídos, qualidade de software,
        Kotlin/Java e infraestrutura. O contexto de cada projeto é identificado para diferenciar trabalho acadêmico,
        laboratório técnico, pesquisa independente e produto.
      </p>

      <h3 class="project-group-title">Projetos em destaque</h3>
      <div class="project-grid project-grid--featured">
        <article v-for="project in featuredProjects" :key="project.title" class="hud-card project-card project-card--featured">
          <header class="card-header">
            <h4 class="card-title">{{ project.title }}</h4>
            <span class="card-period">{{ project.period }}</span>
          </header>

          <div class="card-desc" v-html="project.description"></div>
          <ul class="tech-list" aria-label="Stack técnica">
            <li v-for="tech in project.stack" :key="tech" class="tech-tag">{{ tech }}</li>
          </ul>
          <div class="hero-actions">
            <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="btn-hud btn-hud--live">
              Acessar app<span class="sr-only"> (abre em nova aba)</span>
            </a>
            <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="btn-hud">
              Repositório<span class="sr-only"> (abre em nova aba)</span>
            </a>
            <button
              v-if="project.images && project.images.length"
              type="button"
              class="btn-hud"
              @click="openPreview(project)"
            >
              Ver prévia
            </button>
          </div>
        </article>
      </div>

      <h3 v-if="complementaryProjects.length" class="project-group-title project-group-title--secondary">Outros projetos</h3>
      <div v-if="complementaryProjects.length" class="project-grid project-grid--secondary">
        <article v-for="project in complementaryProjects" :key="project.title" class="hud-card project-card project-card--secondary">
          <header class="card-header">
            <h4 class="card-title">{{ project.title }}</h4>
            <span class="card-period">{{ project.period }}</span>
          </header>
          <div class="card-desc" v-html="project.description"></div>
          <ul class="tech-list" aria-label="Stack técnica">
            <li v-for="tech in project.stack" :key="tech" class="tech-tag">{{ tech }}</li>
          </ul>
          <div class="hero-actions">
            <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="btn-hud btn-hud--live">
              Acessar app<span class="sr-only"> (abre em nova aba)</span>
            </a>
            <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="btn-hud">
              Repositório<span class="sr-only"> (abre em nova aba)</span>
            </a>
            <button
              v-if="project.images && project.images.length"
              type="button"
              class="btn-hud"
              @click="openPreview(project)"
            >
              Ver prévia
            </button>
          </div>
        </article>
      </div>
    </section>

    <ProjectPreviewModal
      v-if="previewProject"
      :title="previewProject.title"
      :images="previewProject.images"
      @close="closePreview"
    />

    <section id="skills" aria-labelledby="skills-title">
      <h2 id="skills-title" class="section-title">Skills</h2>
      <div class="skills-grid">
        <div v-for="group in skillsData" :key="group.category">
          <h3 class="skill-group-title">{{ group.category }}</h3>
          <ul class="tech-list" :aria-label="group.category">
            <li v-for="item in group.items" :key="item" class="tech-tag">{{ item }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="certificacoes" aria-labelledby="certificacoes-title">
      <h2 id="certificacoes-title" class="section-title">Certificações &amp; Formação</h2>
      <ol class="timeline">
        <li v-for="edu in educationData" :key="edu.role + edu.company" class="timeline-item">
          <div class="timeline-date"><time>{{ edu.period }}</time></div>
          <h3 class="timeline-title">{{ edu.role }}</h3>
          <div class="timeline-org">{{ edu.company }}</div>
          <p v-if="edu.description" class="timeline-desc">{{ edu.description }}</p>
        </li>
      </ol>
    </section>

    <section id="publicacoes" aria-labelledby="publicacoes-title">
      <h2 id="publicacoes-title" class="section-title">Publicações</h2>
      <ul class="publication-list">
        <li v-for="pub in publicationsData" :key="pub.title" class="hud-card">
          <p class="card-title">{{ pub.title }}</p>
          <p class="card-desc" style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.25rem;">
            {{ pub.venue }} — {{ pub.period }}
          </p>
        </li>
      </ul>
    </section>

    <section id="open-source" aria-labelledby="open-source-title">
      <h2 id="open-source-title" class="section-title">Open Source &amp; Arcade</h2>
      <div class="hud-card">
        <p class="card-desc">
          Fora do trabalho remunerado, escrevo código por conta própria: jogos implementados do zero — regras, IA e
          interface — direto no navegador (Go com Monte Carlo, Damas brasileiras com minimax e poda alfa-beta) e uma
          curadoria de recursos gratuitos para quem desenvolve ou está aprendendo.
        </p>
        <div class="hero-actions">
          <router-link to="/arcade" class="btn-hud">Ver o Arcade</router-link>
          <router-link to="/recursos" class="btn-hud">Recursos gratuitos</router-link>
        </div>
      </div>
    </section>

    <section id="contato" aria-labelledby="contato-title">
      <h2 id="contato-title" class="section-title">Contato</h2>
      <div class="hud-card">
        <p class="card-desc">{{ contactData.intro }}</p>
        <div class="hero-actions">
          <a
            v-for="channel in contactData.channels"
            :key="channel.label"
            :href="channel.url"
            :target="channel.url.startsWith('http') ? '_blank' : null"
            :rel="channel.url.startsWith('http') ? 'noopener noreferrer' : null"
            class="btn-hud"
          >
            {{ channel.label }}<span v-if="channel.url.startsWith('http')" class="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
        <p class="note-secondary">
          Precisa de um site, sistema ou automação para o seu negócio?
          <router-link to="/servicos">Conheça meus serviços</router-link>.
        </p>
      </div>
    </section>
  </main>
</template>

<script>
import ProjectPreviewModal from '../components/ProjectPreviewModal.vue';
import {
  basicsData,
  highlightsData,
  aboutData,
  experienceData,
  skillsData,
  educationData,
  publicationsData,
  projectsData,
  contactData,
} from '../data/profileData.js';

const FEATURED_PROJECT_TITLES = [
  'ClinicFiapApp - Microsserviços de Agendamento Hospitalar',
  'Food Fiapp: API de Gestão de Restaurantes',
  'Hedge CLI: Análise Estática + IA para Eager Test',
  'Quotes Service: Cotação e Emissão de Apólices',
  'TechChallenge: API de Gestão de Usuários',
  'Kube Backend: API Node.js + PostgreSQL no Kubernetes',
];

export default {
  name: 'Home',
  components: { ProjectPreviewModal },
  data() {
    return {
      previewProject: null,
      basicsData,
      highlightsData,
      aboutData,
      experienceData,
      skillsData,
      educationData,
      publicationsData,
      projectsData,
      contactData,
    };
  },
  computed: {
    featuredProjects() {
      return FEATURED_PROJECT_TITLES
        .map((title) => this.projectsData.find((project) => project.title === title))
        .filter(Boolean);
    },
    complementaryProjects() {
      return this.projectsData.filter((project) => !FEATURED_PROJECT_TITLES.includes(project.title));
    },
  },
  methods: {
    openPreview(project) {
      this.previewProject = project;
    },
    closePreview() {
      this.previewProject = null;
    },
    printResume() {
      window.print();
    },
  },
};
</script>

<style scoped>
.lede-note { color: var(--text-muted); font-size: 0.9rem; margin: -0.5rem 0 var(--space-md); }
.lede-note a { color: var(--text-muted); text-decoration: underline; }
.hero-resume-links { display: flex; flex-wrap: wrap; gap: 0.45rem; align-items: center; }
.hero-resume-links a { color: var(--text-muted); text-decoration: underline; text-underline-offset: 0.18em; }
.section-intro { max-width: 74ch; color: var(--text-muted); margin: -0.35rem 0 var(--space-lg); }
.project-group-title { margin: 0 0 var(--space-md); font-size: 1.05rem; letter-spacing: 0.02em; }
.project-group-title--secondary { margin-top: var(--space-xl); }
.project-card { height: 100%; }
.project-card--featured { border-color: color-mix(in srgb, var(--accent-core) 35%, var(--accent-border)); }
.project-card--secondary { background: var(--bg-surface); }
.project-grid--secondary { opacity: 0.96; }
@media (max-width: 640px) {
  .hero-resume-links { align-items: flex-start; }
}
</style>
