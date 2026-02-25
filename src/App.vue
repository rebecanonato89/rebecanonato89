<template>
  <div class="container">
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
            <ul class="tech-list" aria-label="Stack">
              <li v-for="tech in project.stack" :key="tech" class="tech-tag">{{ tech }}</li>
            </ul>
            <a :href="project.link" target="_blank" rel="noopener noreferrer" class="btn-hud">Repositório</a>
          </article>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title" class="section-title">Estabelecer Conexão</h2>
        <div class="hud-card">
          <h3 class="card-title">Canais Seguros</h3>
          <p class="card-desc">Conexões abertas para propostas de engenharia, arquitetura e discussões sobre resiliência de sistemas críticos.</p>
          <div style="display: flex; gap: var(--space-md); flex-wrap: wrap;">
            <a href="https://www.linkedin.com/in/rebecanonato89/" target="_blank" rel="noopener noreferrer" class="btn-hud">LinkedIn</a>
            <a href="https://github.com/rebecanonato89" target="_blank" rel="noopener noreferrer" class="btn-hud">GitHub</a>
            <a href="mailto:rebecanonato89@gmail.com" class="btn-hud">Email Direto</a>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <p>CONSTRUÍDO COM VUE.JS, HTML SEMÂNTICO E CSS FLUIDO. ACESSIBILIDADE NIVEL MASTER.</p>
      <p>REBECA NONATO &copy; 2026</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
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
          role: 'AWS Educate Machine Learning Foundations - Training Badge',
          company: 'Amazon Web Services (AWS)',
          period: 'Jun 2025',
          description: 'Competências: AWS'
        },
        {
          role: 'Introducing Generative AI with AWS',
          company: 'Udacity',
          period: 'Jun 2025',
          description: 'Competências: Large Language Models, AWS para IA Generativa e mais 3'
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
          role: 'Bertelsmann Data Science Challenge Scholarship Course',
          company: 'Udacity',
          period: 'Mar 2022',
          description: 'Competências: Análise estatística, Python e mais 5'
        },
        {
          role: 'Scrum Fundamentals',
          company: 'International Scrum Institute™',
          period: 'Jan 2017'
        },
        {
          role: 'Mestrado em Engenharia de Sistemas e Automação',
          company: 'Universidade Federal de Lavras (UFLA)',
          period: 'Jan 2012 - Dez 2014'
        },
        {
          role: 'Bacharelado em Matemática',
          company: 'Faculdade Educacional da Lapa',
          period: 'Jan 2013 - Dez 2017'
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
          description: '<p>Plataforma SaaS projetada com arquitetura Multi-Tenant para servir múltiplas empresas a partir de uma única instância.</p><p style="margin-top: 10px;"><strong>Back-end:</strong> NestJS/TypeScript, PostgreSQL (TypeORM), JWT e RBAC para controle de acesso restrito e seguro.</p><p style="margin-top: 10px;"><strong>Front-end:</strong> SPA em Angular 17 (standalone components), NgRx para gestão de estado e Route Guards para segurança espelhada.</p>',
          stack: ['NestJS', 'Angular 17', 'PostgreSQL', 'Multi-Tenant', 'JWT'],
          link: 'https://github.com/Devs-IO/allrev-backend'
        },
        {
          title: 'ClinicFiapApp - Microsserviços de Agendamento Hospitalar',
          period: 'Ago 2025 - Dez 2025',
          description: '<p>Solução backend modular distribuída (Scheduler, Notification, History) com comunicação assíncrona.</p><ul style="margin-top: 10px; padding-left: 20px;"><li><strong>Integridade:</strong> Outbox Pattern manual para consistência de dados.</li><li><strong>CQRS:</strong> History Service atua como base de leitura alimentada por eventos.</li><li><strong>Resiliência:</strong> Consumidores Kafka idempotentes e configuração de Dead Letter Queues (DLQ).</li><li><strong>Infraestrutura:</strong> Docker Compose com Zookeeper e Kafka UI.</li></ul>',
          stack: ['Java', 'Spring', 'Kafka', 'GraphQL', 'CQRS'],
          link: 'https://github.com/fiap-tech-challenge-java/clinicfiapp-monorepo'
        },
        {
          title: 'Food Fiapp: API de Gestão de Restaurantes',
          period: 'Jul 2025 - Out 2025',
          description: '<p>Sistema robusto desenvolvido em Java 21 e Spring Boot 3.5.5 seguindo rigorosamente os princípios de Clean Architecture.</p><ul style="margin-top: 10px; padding-left: 20px;"><li><strong>Qualidade:</strong> Testes Unitários (JUnit 5/Mockito), Integração (H2), e Arquitetura (ArchUnit). Cobertura configurada para >90% no JaCoCo.</li><li><strong>Armazenamento:</strong> Integração com object storage MinIO.</li><li><strong>Infra:</strong> Totalmente containerizado via Docker.</li></ul>',
          stack: ['Java 21', 'Clean Architecture', 'MinIO', 'Docker', 'JUnit 5'],
          link: 'https://github.com/fiap-tech-challenge-java/food-fiapp'
        },
        {
          title: 'TechChallenge: API de Gestão de Usuários',
          period: 'Mai 2025 - Jul 2025',
          description: '<p>API RESTful em Java 21 focada em gerenciamento de usuários. Implementação central baseada em Arquitetura Hexagonal (Ports & Adapters) para isolamento do domínio de negócio.</p><ul style="margin-top: 10px; padding-left: 20px;"><li><strong>Segurança:</strong> Autenticação via Spring Security e JWT com RBAC estruturado (OWNER vs CUSTOMER).</li><li><strong>Qualidade:</strong> SOLID, MapStruct, tratamento global de exceções e testes automatizados.</li></ul>',
          stack: ['Java 21', 'Arquitetura Hexagonal', 'JWT', 'Spring Security', 'PostgreSQL'],
          link: 'https://github.com/fiap-tech-challenge-java/fiap-tech-challenge'
        },
        {
          title: 'Equinox Solar CRM: Plataforma Full-Stack & Pesquisa',
          period: 'Mar 2023 - Dez 2023',
          description: '<p>Plataforma para CRM e ambiente de pesquisa para otimização de testes de software usando IA.</p><ul style="margin-top: 10px; padding-left: 20px;"><li><strong>Seleção de Testes:</strong> Uso de Machine Learning (scikit-learn) para identificar subconjuntos de testes relevantes para mudanças no código.</li><li><strong>Geração de Testes:</strong> Investigação do uso de LLMs para sugerir novos testes unitários e atuar como hedge de segurança.</li></ul>',
          stack: ['NestJS', 'TypeScript', 'Machine Learning', 'Python', 'NLP'],
          link: '#'
        }
      ]
    };
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Rajdhani:wght@500;600;700&family=Fira+Code:wght@400;500&display=swap');

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

* { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 100%; scroll-behavior: smooth; }
body {
  font-family: var(--font-read);
  background-color: var(--bg-base);
  color: var(--text-main);
  line-height: 1.6;
  background-image: 
    linear-gradient(rgba(0, 229, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 229, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  background-attachment: fixed;
}

.skip-link {
  position: absolute; top: -100px; left: 0;
  background: var(--cyan-core); color: #000;
  padding: var(--space-md); z-index: 9999;
  font-family: var(--font-ui); font-weight: bold; text-transform: uppercase;
  transition: top 0.2s; text-decoration: none;
}
.skip-link:focus { top: 0; }

*:focus-visible {
  outline: 2px dashed var(--cyan-core);
  outline-offset: 4px;
  box-shadow: 0 0 15px var(--cyan-dim);
  border-radius: 4px;
}

.container { max-width: 1000px; margin: 0 auto; padding: 0 var(--space-lg); }
header {
  padding: var(--space-lg) 0; display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid var(--cyan-border); margin-bottom: var(--space-xl);
  background: linear-gradient(180deg, rgba(3,5,9,0.95) 0%, rgba(3,5,9,0) 100%);
  position: sticky; top: 0; z-index: 100; backdrop-filter: blur(8px);
}
.brand h1 { font-family: var(--font-ui); font-size: 2rem; color: #fff; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 10px var(--cyan-dim); }
.brand span { font-family: var(--font-code); font-size: 0.8rem; color: var(--cyan-core); }
nav ul { list-style: none; display: flex; gap: var(--space-lg); }
nav a { color: var(--text-muted); text-decoration: none; font-family: var(--font-ui); font-size: 1.1rem; text-transform: uppercase; transition: 0.3s; }
nav a:hover { color: var(--cyan-core); text-shadow: 0 0 8px var(--cyan-core); }
section { margin-bottom: var(--space-xl); }
.section-title {
  font-family: var(--font-ui); font-size: 2.2rem; color: #fff; margin-bottom: var(--space-lg);
  display: flex; align-items: center; gap: var(--space-md);
}
.section-title::before { content: ''; display: block; width: 12px; height: 12px; background: var(--cyan-core); box-shadow: 0 0 10px var(--cyan-core); }
.hero p { font-size: 1.1rem; color: var(--text-muted); margin-bottom: var(--space-md); }
.hero strong { color: var(--text-main); font-weight: 500; }

/* Alterado para 1fr (coluna única) para comportar a riqueza de texto dos projetos */
.project-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-lg); }
.hud-card {
  background: var(--bg-surface); border: 1px solid var(--cyan-border); border-radius: 8px;
  padding: var(--space-lg); display: flex; flex-direction: column; transition: 0.3s;
  backdrop-filter: blur(10px);
}
.hud-card:hover { transform: translateY(-3px); border-color: var(--cyan-core); box-shadow: 0 5px 20px rgba(0, 229, 255, 0.1); }

/* Ajustes do cabeçalho do Card para exibir a data */
.card-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-md); border-bottom: 1px dashed var(--cyan-dim); padding-bottom: var(--space-sm); }
.card-title { font-family: var(--font-ui); font-size: 1.6rem; color: #fff; margin-bottom: 0; }
.card-period { font-family: var(--font-code); font-size: 0.85rem; color: var(--cyan-core); }

.card-desc { color: var(--text-muted); font-size: 0.95rem; flex-grow: 1; margin-bottom: var(--space-lg); }
.tech-list { list-style: none; display: flex; flex-wrap: wrap; gap: var(--space-sm); margin-bottom: var(--space-lg); }
.tech-tag { font-family: var(--font-code); font-size: 0.75rem; color: var(--cyan-core); background: rgba(0, 229, 255, 0.05); border: 1px dashed var(--cyan-border); padding: 4px 8px; border-radius: 4px; }
.btn-hud { display: inline-flex; align-items: center; gap: 8px; background: rgba(0, 229, 255, 0.1); color: var(--cyan-core); border: 1px solid var(--cyan-border); padding: 8px 16px; font-family: var(--font-ui); font-size: 1.1rem; text-decoration: none; text-transform: uppercase; transition: all 0.3s; align-self: flex-start; }
.btn-hud:hover { background: var(--cyan-core); color: #000; box-shadow: 0 0 15px var(--cyan-core); }

.timeline { list-style: none; position: relative; padding-left: 30px; }
.timeline::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
  background: linear-gradient(to bottom, var(--cyan-core), rgba(0,229,255,0.1));
}
.timeline-item { position: relative; margin-bottom: var(--space-lg); }
.timeline-item::before {
  content: ''; position: absolute; left: -36px; top: 6px; width: 14px; height: 14px;
  background: var(--bg-base); border: 2px solid var(--cyan-core); border-radius: 50%;
  box-shadow: 0 0 10px var(--cyan-core);
}
.timeline-date { font-family: var(--font-code); font-size: 0.85rem; color: var(--cyan-core); margin-bottom: 4px; display: block; }
.timeline-title { font-family: var(--font-ui); font-size: 1.3rem; color: #fff; margin-bottom: 2px; }
.timeline-org { font-weight: 600; color: var(--text-main); font-size: 1rem; margin-bottom: 8px; }
.timeline-desc { color: var(--text-muted); font-size: 0.95rem; }
footer { border-top: 1px solid var(--cyan-border); padding: var(--space-lg) 0; text-align: center; font-family: var(--font-code); font-size: 0.8rem; color: var(--text-muted); }

@media (max-width: 768px) {
  header { flex-direction: column; gap: var(--space-md); align-items: flex-start; }
  nav ul { flex-wrap: wrap; gap: var(--space-md); }
  .section-title { font-size: 1.8rem; }
  .card-header { flex-direction: column; }
}
</style>