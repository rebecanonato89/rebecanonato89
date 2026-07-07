<template>
  <main id="main-content">
    <section id="fork" aria-label="Escolha seu caminho">
      <div class="hud-card">
        <p class="card-desc">
          <strong>Recrutador?</strong> Continue rolando para ver minha trajetória técnica. ↓<br />
          <strong>Precisa de um site ou sistema para o seu negócio?</strong>
          <router-link to="/servicos" class="btn-hud" style="margin-left: 8px;">Conheça meus serviços →</router-link>
        </p>
      </div>
    </section>

    <section id="about" aria-labelledby="about-title">
      <h2 id="about-title" class="section-title">Parâmetros do Sistema</h2>
      <div class="hud-card">
        <p><strong>Engenheira de Software com +7 anos de experiência, focada em sistemas distribuídos e microsserviços cloud-native.</strong></p>
        <p>Especialista na implementação, evolução e sustentação em ambientes AWS (Lambda, API Gateway, EC2, ECS, EKS) com forte vivência em mensageria orientada a eventos (Kafka, SQS). Minha atuação é baseada na aplicação rigorosa de padrões como Clean Architecture, Arquitetura Hexagonal e SOLID.</p>
        <p>Possuo amplo histórico no gerenciamento de incidentes críticos (war rooms, incidentes P1/P2) e manutenção da estabilidade operacional através de práticas profundas de observabilidade (Datadog, CloudWatch) e pipelines automatizados (CI/CD, GitHub Actions, Docker).</p>
        <div class="tech-list" style="margin-top: 15px;">
          <span class="tech-tag">Node.js</span>
          <span class="tech-tag">Kotlin</span>
          <span class="tech-tag">Java (Spring)</span>
          <span class="tech-tag">C#</span>
          <span class="tech-tag">AWS</span>
          <span class="tech-tag">Kafka</span>
          <span class="tech-tag">Microservices</span>
        </div>
      </div>
    </section>

    <section id="experience" aria-labelledby="experience-title">
      <h2 id="experience-title" class="section-title">Log de Execução Profissional</h2>
      <ol class="timeline">
        <li class="timeline-item">
          <span class="timeline-date">{{ currentRole.period }}</span>
          <h3 class="timeline-title">{{ currentRole.role }}</h3>
          <div class="timeline-org">{{ currentRole.company }}</div>
          <p v-if="currentRole.description" class="timeline-desc">{{ currentRole.description }}</p>
        </li>
      </ol>
      <router-link to="/experiencia" class="btn-hud btn-hud--live">Ver histórico completo (experiencia.log) →</router-link>
    </section>

    <section id="education" aria-labelledby="education-title">
      <h2 id="education-title" class="section-title">Data Banks & Certificações</h2>
      <div class="hud-card">
        <p class="card-desc">
          Pós-graduanda em Arquitetura e Desenvolvimento Java (FIAP), mestre em Engenharia de Sistemas e Automação (UFLA)
          e certificações recentes em AWS, Machine Learning e Agentic AI.
        </p>
        <router-link to="/certificacoes" class="btn-hud btn-hud--live">Ver formação e certificações completas →</router-link>
      </div>
    </section>

    <section id="publications" aria-labelledby="publications-title">
      <h2 id="publications-title" class="section-title">Publicações Acadêmicas</h2>
      <div class="hud-card">
        <p class="card-desc">
          {{ publicationsData.length }} publicações em conferências e periódicos científicos — de gestão ambiental e
          inovação no setor público a saúde digital.
        </p>
        <router-link to="/publicacoes" class="btn-hud btn-hud--live">Ver publicações completas →</router-link>
      </div>
    </section>

    <section id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title" class="section-title">Deployments & Cases</h2>
      <div class="project-grid">
        <article v-for="project in projectsData" :key="project.title" class="hud-card">
          <header class="card-header">
            <h3 class="card-title">{{ project.title }}</h3>
            <span class="card-period">{{ project.period }}</span>
          </header>

          <div class="card-desc" v-html="project.description"></div>
          <ul class="tech-list" aria-label="Stack Tecnológica">
            <li v-for="tech in project.stack" :key="tech" class="tech-tag">{{ tech }}</li>
          </ul>
          <div style="display: flex; gap: var(--space-sm); flex-wrap: wrap;">
            <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="btn-hud btn-hud--live">
              Acessar App <span class="sr-only"> (Abre em uma nova aba)</span>
            </a>
            <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="btn-hud">
              Repositório <span class="sr-only"> (Abre em uma nova aba)</span>
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

    <section id="arcade-preview" aria-labelledby="arcade-preview-title">
      <h2 id="arcade-preview-title" class="section-title">Arcade // Jogue no Browser</h2>
      <div class="hud-card">
        <p class="card-desc" style="margin-bottom: var(--space-md);">
          Jogos implementados do zero — regras, IA e interface — direto no navegador.
          Go com Monte Carlo, Damas brasileiras com minimax e um jogo da memória para relaxar.
        </p>
        <div class="arcade-preview-row">
          <router-link to="/go" class="btn-hud">⚫ Go</router-link>
          <router-link to="/damas" class="btn-hud">🔴 Damas</router-link>
          <router-link to="/memoria" class="btn-hud">🃏 Memória</router-link>
          <router-link to="/arcade" class="btn-hud btn-hud--live">Ver o Arcade completo</router-link>
        </div>
      </div>
    </section>

    <section id="resources-preview" aria-labelledby="resources-preview-title">
      <h2 id="resources-preview-title" class="section-title">Recursos // Biblioteca Aberta</h2>
      <div class="hud-card">
        <p class="card-desc" style="margin-bottom: var(--space-md);">
          Curadoria de recursos gratuitos para quem desenvolve ou está aprendendo:
          livros para download (como a <strong>BibliotecaDev</strong>), roadmaps de carreira,
          ferramentas do dia a dia e cursos abertos. Útil mesmo que você não esteja me contratando. 😉
        </p>
        <router-link to="/recursos" class="btn-hud btn-hud--live">Explorar a biblioteca</router-link>
      </div>
    </section>

    <section id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" class="section-title">Estabelecer Conexão</h2>
      <div class="hud-card">
        <h3 class="card-title">Canais Seguros</h3>
        <p class="card-desc">Conexões abertas para propostas de engenharia, arquitetura e discussões sobre resiliência de sistemas críticos.</p>
        <div style="display: flex; gap: var(--space-md); flex-wrap: wrap;">
          <a href="https://www.linkedin.com/in/rebecanonato89/" target="_blank" rel="noopener noreferrer" class="btn-hud">
            LinkedIn <span class="sr-only"> (Abre em uma nova aba)</span>
          </a>
          <a href="https://github.com/rebecanonato89" target="_blank" rel="noopener noreferrer" class="btn-hud">
            GitHub <span class="sr-only"> (Abre em uma nova aba)</span>
          </a>
          <a href="mailto:rebecanonato89@gmail.com" class="btn-hud">Email Direto</a>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ProjectPreviewModal from '../components/ProjectPreviewModal.vue';
import { experienceData, publicationsData, projectsData } from '../data/profileData.js';

export default {
  name: 'Home',
  components: { ProjectPreviewModal },
  data() {
    return {
      previewProject: null,
      experienceData,
      publicationsData,
      projectsData,
    };
  },
  computed: {
    currentRole() {
      return this.experienceData[0];
    },
  },
  methods: {
    openPreview(project) {
      this.previewProject = project;
    },
    closePreview() {
      this.previewProject = null;
    }
  }
};
</script>

<style scoped>
.arcade-preview-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}
</style>
