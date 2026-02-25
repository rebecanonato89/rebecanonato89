<template>
  <div class="container" :class="{ 'high-contrast-mode': isHighContrast, 'light-mode': isLightMode }">
    <a href="#main-content" class="skip-link">Pular para o conteúdo principal</a>

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
        <ul>
          <li><a href="#about">Identidade</a></li>
          <li><a href="#experience">Log Execução</a></li>
          <li><a href="#education">Data Banks</a></li>
          <li><a href="#projects">Deployments</a></li>
          <li><a href="#contact">Uplink</a></li>
        </ul>
      </nav>
    </header>

    <main id="main-content">
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
          <li v-for="item in experienceData" :key="item.role + item.company" class="timeline-item">
            <span class="timeline-date">{{ item.period }}</span>
            <h3 class="timeline-title">{{ item.role }}</h3>
            <div class="timeline-org">{{ item.company }}</div>
            <p v-if="item.description" class="timeline-desc">{{ item.description }}</p>
          </li>
        </ol>
      </section>

      <section id="education" aria-labelledby="education-title">
        <h2 id="education-title" class="section-title">Data Banks & Certificações</h2>
        <ol class="timeline">
          <li v-for="item in educationData" :key="item.role" class="timeline-item">
            <span class="timeline-date">{{ item.period }}</span>
            <h3 class="timeline-title">{{ item.role }}</h3>
            <div class="timeline-org">{{ item.company }}</div>
            <p v-if="item.description" class="timeline-desc" style="color: var(--cyan-core); font-size: 0.85rem; margin-top: 4px;">{{ item.description }}</p>
          </li>
        </ol>
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
            <a :href="project.link" target="_blank" rel="noopener noreferrer" class="btn-hud">
              Repositório <span class="sr-only"> (Abre em uma nova aba)</span>
            </a>
          </article>
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
      experienceData: [
        {
          role: 'Application Development Analyst (Senior Backend)',
          company: 'Accenture',
          period: 'Mai 2021 - Presente',
          description: 'Referência técnica em ambientes de microsserviços (+50 Lambdas) utilizando Node.js, Kotlin e Java. Gerenciamento de incidentes críticos em produção (war rooms) e recuperação de sistemas legados instáveis. Forte atuação em CI/CD, mensageria (SQS/Kafka) e monitoramento (Datadog).'
        },
        {
          role: 'Engenheira de Software Full Stack',
          company: 'Vetta',
          period: 'Out 2020 - Mai 2021',
          description: 'Desenvolvimento em C# (.NET), React e Angular. Otimização pesada de queries (SQL Server tuning) e recuperação de projetos legados através de engenharia reversa e refatoração arquitetural.'
        },
        {
          role: 'Analista de Sistemas Full Stack',
          company: 'Agência Zetta',
          period: 'Abr 2019 - Out 2020',
          description: 'Desenvolvimento de APIs REST (.NET) e interfaces Angular. Gestão de branches complexas no GitLab, refinamento técnico como ponto focal Scrum e integração de gateways de pagamento governamentais.'
        },
        {
          role: 'Analista de Sistemas',
          company: 'Accenture',
          period: 'Jan 2016 - Abr 2019',
          description: 'Manutenção de sistemas corporativos de alta disponibilidade (Mainframe, Natural/Adabas). Análise de logs, otimização batch e criação de jobs críticos (JCLs).'
        },
        {
          role: 'Professora Universitária',
          company: 'Universidade Federal de Lavras (UFLA)',
          period: 'Nov 2013 - Mai 2015',
          description: 'Lecionou disciplinas de arquitetura de software, algoritmos e banco de dados (SQL e NoSQL).'
        }
      ],
      educationData: [
        {
          role: 'Reinvention with Agentic AI',
          company: 'Accenture',
          period: 'Dez 2025'
        },
        {
          role: 'AWS Educate Machine Learning Foundations',
          company: 'Amazon Web Services (AWS)',
          period: 'Jun 2025',
          description: 'Competências: AWS'
        },
        {
          role: 'Introducing Generative AI with AWS',
          company: 'Udacity',
          period: 'Jun 2025',
          description: 'Competências: Large Language Models, AWS para IA Generativa'
        },
        {
          role: 'Especialização em Arquitetura e Desenvolvimento Java',
          company: 'FIAP',
          period: 'Jan 2024 - Dez 2026'
        },
        {
          role: 'ITIL® Foundation',
          company: 'Axelos',
          period: 'Certificação'
        },
        {
          role: 'Bertelsmann Data Science Challenge',
          company: 'Udacity',
          period: 'Mar 2022',
          description: 'Competências: Análise estatística, Python'
        },
        {
          role: 'Mestrado em Engenharia de Sistemas e Automação',
          company: 'Universidade Federal de Lavras (UFLA)',
          period: 'Jan 2012 - Dez 2014'
        },
        {
          role: 'Bacharelado em Sistemas de Informação',
          company: 'Anhanguera Educacional',
          period: 'Jan 2008 - Dez 2012'
        }
      ],
      projectsData: [
        {
          title: 'Hedge CLI: Detector Híbrido de "Eager Test" Smells com IA',
          period: 'Set 2025 - Momento',
          description: '<p>Ferramenta de linha de comando (CLI) desenvolvida em Python (Pesquisa de Doutorado). O projeto investiga uma abordagem híbrida para detecção de "Eager Test", otimizando o trade-off entre custo computacional e precisão.</p><p style="margin-top: 10px;"><strong>Pipeline Híbrido:</strong></p><ul style="margin-top: 5px; padding-left: 20px;"><li><strong>Análise Estática:</strong> Uso de tree-sitter para parsear ASTs Java e aplicação de modelo heurístico.</li><li><strong>LLM Gating:</strong> Aciona um Large Language Model apenas se o score heurístico for incerto.</li><li><strong>Ensemble:</strong> Pondera os resultados para a classificação final.</li></ul>',
          stack: ['Python', 'AST', 'LLMs', 'Pesquisa', 'Machine Learning'],
          link: 'https://github.com/rebecanonato89/hedge-cli'
        },
        {
          title: 'AllRev: Plataforma SaaS Multi-Tenant Full-Stack',
          period: 'Abr 2025 - Momento',
          description: '<p>Plataforma SaaS projetada com arquitetura Multi-Tenant para servir múltiplas empresas a partir de uma única instância.</p><p style="margin-top: 10px;"><strong>Back-end:</strong> NestJS/TypeScript, PostgreSQL (TypeORM), JWT e RBAC para controle de acesso restrito e seguro.</p><p style="margin-top: 10px;"><strong>Front-end:</strong> SPA em Angular 17, NgRx para gestão de estado e Route Guards para segurança espelhada.</p>',
          stack: ['NestJS', 'Angular 17', 'PostgreSQL', 'Multi-Tenant', 'JWT'],
          link: 'https://github.com/Devs-IO/allrev-backend'
        },
        {
          title: 'ClinicFiapApp - Microsserviços de Agendamento Hospitalar',
          period: 'Ago 2025 - Dez 2025',
          description: '<p>Solução backend modular distribuída (Scheduler, Notification, History) com comunicação assíncrona.</p><ul style="margin-top: 10px; padding-left: 20px;"><li><strong>Integridade:</strong> Outbox Pattern manual para consistência de dados.</li><li><strong>CQRS:</strong> History Service atua como base de leitura alimentada por eventos.</li><li><strong>Resiliência:</strong> Consumidores Kafka idempotentes e configuração de Dead Letter Queues (DLQ).</li></ul>',
          stack: ['Java', 'Spring', 'Kafka', 'GraphQL', 'CQRS'],
          link: 'https://github.com/fiap-tech-challenge-java/clinicfiapp-monorepo'
        },
        {
          title: 'Food Fiapp: API de Gestão de Restaurantes',
          period: 'Jul 2025 - Out 2025',
          description: '<p>Sistema robusto desenvolvido em Java 21 e Spring Boot 3.5.5 seguindo rigorosamente os princípios de Clean Architecture.</p><ul style="margin-top: 10px; padding-left: 20px;"><li><strong>Qualidade:</strong> Testes Unitários (JUnit 5/Mockito), Integração (H2), e Arquitetura (ArchUnit). Cobertura configurada para >90% no JaCoCo.</li><li><strong>Armazenamento:</strong> Integração com object storage MinIO.</li></ul>',
          stack: ['Java 21', 'Clean Architecture', 'MinIO', 'Docker', 'JUnit 5'],
          link: 'https://github.com/fiap-tech-challenge-java/food-fiapp'
        },
        {
          title: 'TechChallenge: API de Gestão de Usuários',
          period: 'Mai 2025 - Jul 2025',
          description: '<p>API RESTful em Java 21 focada em gerenciamento de usuários. Implementação central baseada em Arquitetura Hexagonal (Ports & Adapters) para isolamento do domínio de negócio.</p><ul style="margin-top: 10px; padding-left: 20px;"><li><strong>Segurança:</strong> Autenticação via Spring Security e JWT com RBAC estruturado.</li><li><strong>Qualidade:</strong> SOLID, MapStruct, tratamento global de exceções e testes automatizados.</li></ul>',
          stack: ['Java 21', 'Arquitetura Hexagonal', 'JWT', 'Spring Security', 'PostgreSQL'],
          link: 'https://github.com/fiap-tech-challenge-java/fiap-tech-challenge'
        }
      ]
    };
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
  transition: background-color 0.4s ease;
  padding: 0 var(--space-lg);
  max-width: 1000px;
  margin: 0 auto;
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
  header { flex-direction: column; gap: var(--space-md); align-items: flex-start; }
  nav ul { flex-wrap: wrap; gap: var(--space-md); }
  .section-title { font-size: 1.8rem; }
  .card-header { flex-direction: column; }
  .a11y-toolbar { top: auto; bottom: 20px; right: 20px; }
}
</style>