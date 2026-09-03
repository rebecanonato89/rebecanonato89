// Fonte única de dados do currículo: alimenta a Home (páginas em Vue),
// public/resume.json (JSON Resume, para agentes de IA) e o JSON-LD embutido
// em index.html (para buscadores). Editar aqui é o suficiente para atualizar
// os três.

export const basicsData = {
  name: 'Rebeca Nonato',
  label: 'Software Engineer — Backend & Distributed Systems',
  summary:
    'Engenheira de Software com mais de 10 anos de experiência em desenvolvimento de sistemas, com foco atual em backend, sistemas distribuídos e confiabilidade de produção. Atua com Kotlin, Java e Node.js/TypeScript em arquiteturas orientadas a eventos, integrações assíncronas e ambientes cloud.',
  email: 'rebecanonato89@gmail.com',
  url: 'https://rebecanonato89.dev',
  location: { countryName: 'Brasil' },
  profiles: [
    { network: 'LinkedIn', username: 'rebecanonato89', url: 'https://www.linkedin.com/in/rebecanonato89/' },
    { network: 'GitHub', username: 'rebecanonato89', url: 'https://github.com/rebecanonato89' },
  ],
};

export const highlightsData = [
  { value: '10+', label: 'anos em desenvolvimento de sistemas' },
  { value: '50+', label: 'Lambdas em produção sustentadas' },
  { value: '9', label: 'projetos documentados' },
  { value: '4', label: 'publicações acadêmicas' },
];

export const skillsData = [
  {
    category: 'Backend',
    items: ['Kotlin', 'Java', 'Node.js / TypeScript', 'Spring Boot', 'NestJS', 'PostgreSQL'],
  },
  {
    category: 'Sistemas Distribuídos & Cloud',
    items: ['Event-Driven Architecture', 'Kafka', 'SQS', 'AWS Lambda', 'ECS', 'EKS', 'EC2', 'Docker', 'Kubernetes'],
  },
  {
    category: 'Arquitetura',
    items: ['DDD', 'Clean Architecture', 'Arquitetura Hexagonal', 'CQRS', 'Outbox Pattern', 'Microsserviços', 'Multi-Tenant'],
  },
  {
    category: 'Qualidade & Operações',
    items: ['TDD', 'CI/CD', 'Observabilidade (Datadog, CloudWatch)', 'Idempotência', 'DLQ', 'RBAC', 'Gestão de incidentes P1/P2'],
  },
];

export const experienceData = [
  {
    role: 'Software Engineer (Backend)',
    company: 'Alice (health tech)',
    period: 'Mar 2026 - Presente',
    evolution: 'Atual',
    description: 'Desenvolvimento backend com Kotlin e Spring Boot, atuando em features end-to-end desde modelagem e definição técnica até implementação, testes, deploy e acompanhamento em produção. Participação como feature lead em frentes de maior complexidade, com sistemas orientados a eventos, PostgreSQL, mensageria, confiabilidade, investigação de incidentes, mentoria e colaboração cross-team. Uso de AI-assisted development em planejamento, implementação, testes, debugging, documentação e code review.'
  },
  {
    role: 'Application Development Specialist (Senior Backend)',
    company: 'Accenture',
    period: 'Mai 2025 - Mar 2026',
    evolution: 'Promoção',
    description: 'Promovida a Especialista em reconhecimento à atuação como referência técnica. Referência em ambiente de microsserviços com mais de 50 Lambdas usando Node.js, Kotlin e Java/Spring Boot, incluindo recuperação de sistema legado crítico em Kotlin e atuação em incidentes P1/P2.'
  },
  {
    role: 'Application Development Senior Analyst (Backend)',
    company: 'Accenture',
    period: 'Mai 2021 - Mai 2025',
    description: 'Atuação em múltiplos projetos de consultoria com backend distribuído e serverless. Modernização de runtime Node.js, otimização de queries, análise de logs com CloudWatch, mensageria com SQS/Kafka, pipelines CI/CD e observabilidade com Datadog.'
  },
  {
    role: 'Engenheira de Software Full Stack',
    company: 'Vetta',
    period: 'Out 2020 - Mai 2021',
    description: 'Desenvolvimento em C#/.NET, React e Angular, com foco em performance, tuning de SQL Server e recuperação de projetos legados por engenharia reversa e refatoração.'
  },
  {
    role: 'Analista de Sistemas Full Stack',
    company: 'FUNDECC/LEMAF',
    period: 'Abr 2019 - Out 2020',
    description: 'APIs REST em C#/.NET com integrações a gateways de pagamento, gestão de branches e deploys entre ambientes e resolução de incidentes em produção.'
  },
  {
    role: 'Analista de Sistemas',
    company: 'Accenture',
    period: 'Jan 2016 - Abr 2019',
    description: 'Manutenção de sistemas corporativos de alta disponibilidade em Mainframe com Natural/Adabas, análise de logs, otimização batch e criação de jobs críticos em JCL.'
  },
  {
    role: 'Professora Universitária',
    company: 'Universidade Federal de Lavras (UFLA)',
    period: 'Jan 2013 - Mai 2015',
    evolution: 'Início de carreira',
    description: 'Lecionou disciplinas de algoritmos, linguagens de programação e bancos de dados SQL e NoSQL.'
  }
];

export const educationData = [
  { role: 'Reinvention with Agentic AI', company: 'Accenture', period: 'Dez 2025' },
  { role: 'AWS Educate Machine Learning Foundations', company: 'Amazon Web Services (AWS)', period: 'Jun 2025', description: 'Competências: AWS' },
  { role: 'AWS Certified Cloud Practitioner', company: 'Amazon Web Services (AWS)', period: '2024', description: 'Certificação' },
  { role: 'Introducing Generative AI with AWS', company: 'Udacity', period: 'Jun 2025', description: 'Competências: Large Language Models, AWS para IA Generativa' },
  { role: 'Especialização em Arquitetura e Desenvolvimento Java', company: 'FIAP', period: 'Jan 2024 - Dez 2026' },
  { role: 'ITIL® Foundation', company: 'Axelos', period: 'Certificação' },
  { role: 'Scrum Fundamentals', company: 'SCRUMstudy', period: '2017', description: 'Certificação' },
  { role: 'Bertelsmann Data Science Challenge', company: 'Udacity', period: 'Mar 2022', description: 'Competências: Análise estatística, Python' },
  { role: 'Mestrado em Engenharia de Sistemas e Automação', company: 'Universidade Federal de Lavras (UFLA)', period: 'Jan 2012 - Dez 2014' },
  { role: 'Bacharelado em Sistemas de Informação', company: 'Anhanguera Educacional', period: 'Jan 2008 - Dez 2012' },
  { role: 'Licenciatura em Matemática', company: 'Faculdade Educacional da Lapa', period: '2017' }
];

export const publicationsData = [
  { title: 'O Cadastro Ambiental Rural (CAR) como instrumento de controle ambiental de uso e ocupação do imóvel rural', venue: 'XXI ENGEMA — Encontro Internacional sobre Gestão Empresarial e Meio Ambiente', period: 'Dez 2019' },
  { title: 'Inovação aberta no setor público: como o Ministério da Educação utilizou o crowdstorming para impulsionar a prospecção de soluções inovadoras', venue: 'Capítulo em "Inovação no setor público: teoria, tendências e casos no Brasil"', period: 'Out 2017' },
  { title: 'Non-invasive method to analyse the risk of developing diabetic foot', venue: 'Healthcare Technology Letters', period: 'Abr 2014' },
  { title: 'Desenvolvimento de um Sistema Help Desk para a Universidade Vale do Rio Verde', venue: 'Revista da Universidade Vale do Rio Verde', period: 'Ago 2013' }
];

export const projectsData = [
  {
    title: 'ClinicFiapApp - Microsserviços de Agendamento Hospitalar',
    period: 'Ago 2025 - Dez 2025',
    description: '<p>Projeto acadêmico colaborativo de backend distribuído, organizado em serviços com comunicação assíncrona.</p><ul style="margin-top: 10px; padding-left: 20px;"><li><strong>Consistência:</strong> Outbox Pattern para publicação confiável de eventos.</li><li><strong>Leitura:</strong> CQRS com serviço de histórico alimentado por eventos.</li><li><strong>Resiliência:</strong> consumidores Kafka idempotentes e tratamento de falhas com DLQ.</li></ul>',
    stack: ['Java', 'Spring', 'Kafka', 'CQRS', 'Outbox Pattern'],
    link: 'https://github.com/fiap-tech-challenge-java/clinicfiapp-monorepo'
  },
  {
    title: 'Food Fiapp: API de Gestão de Restaurantes',
    period: 'Jul 2025 - Out 2025',
    description: '<p>Projeto acadêmico em Java 21 e Spring Boot seguindo Clean Architecture.</p><ul style="margin-top: 10px; padding-left: 20px;"><li><strong>Arquitetura:</strong> regras de dependência verificadas automaticamente com ArchUnit.</li><li><strong>Qualidade:</strong> testes unitários e de integração com quality gate de cobertura configurado no build via JaCoCo.</li><li><strong>Infra:</strong> PostgreSQL, MinIO, Docker e Docker Compose.</li></ul>',
    stack: ['Java 21', 'Spring Boot', 'Clean Architecture', 'ArchUnit', 'Docker'],
    link: 'https://github.com/fiap-tech-challenge-java/food-fiapp'
  },
  {
    title: 'Hedge CLI: Análise Estática + IA para Eager Test',
    period: 'Set 2025 - Momento',
    description: '<p>Projeto de pesquisa independente em Engenharia de Software para detecção de Eager Test em projetos Java, combinando análise estática e IA de forma seletiva.</p><ul style="margin-top: 10px; padding-left: 20px;"><li><strong>Análise estática:</strong> tree-sitter para extração de ASTs e features por método de teste.</li><li><strong>LLM gating:</strong> consulta ao modelo apenas para casos de incerteza heurística.</li><li><strong>Ensemble e avaliação:</strong> combinação das predições e métricas como Precision, Recall, F1, MCC e AUC, incluindo acompanhamento de custo do LLM.</li></ul>',
    stack: ['Python', 'tree-sitter', 'AST', 'LLMs', 'Machine Learning'],
    link: 'https://github.com/rebecanonato89/hedge-cli'
  },
  {
    title: 'AllRev: Plataforma SaaS Multi-Tenant',
    period: 'Abr 2025 - Momento',
    description: '<p>Plataforma SaaS multi-tenant desenvolvida para atender múltiplas organizações em uma única aplicação, com separação lógica de dados e controle de acesso.</p><p style="margin-top: 10px;"><strong>Backend:</strong> NestJS/TypeScript, PostgreSQL, autenticação JWT e RBAC.</p><p style="margin-top: 10px;"><strong>Frontend:</strong> Angular 17 com gerenciamento de estado e route guards.</p>',
    stack: ['NestJS', 'Angular 17', 'PostgreSQL', 'Multi-Tenant', 'JWT/RBAC'],
    liveUrl: 'https://allrev.com.br/',
    link: 'https://github.com/Devs-IO/allrev-backend',
    images: [
      { src: '/images/projects/allrev/allrev-login.jpg', alt: 'AllRev — tela de Login do Sistema de Gestão' },
      { src: '/images/projects/allrev/allrev-dashboard.jpg', alt: 'AllRev — Dashboard com ordens em andamento, pendentes e recebimentos' },
      { src: '/images/projects/allrev/allrev-nova-ordem.jpg', alt: 'AllRev — fluxo de criação de Nova Ordem de Serviço' }
    ]
  },
  {
    title: 'Quotes Service: Cotação e Emissão de Apólices',
    period: 'Jan 2026 - Momento',
    description: '<p>MVP de domínio de seguros em Kotlin com foco em modelagem de regras de negócio e DDD.</p><ul style="margin-top: 10px; padding-left: 20px;"><li>Motor de cotação e regras explícitas de aprovação/rejeição.</li><li>Validação funcional com Either para erros de negócio.</li><li>Eventos de domínio e processamento assíncrono com coroutines.</li></ul>',
    stack: ['Kotlin', 'Spring Boot 3', 'DDD', 'Coroutines'],
    link: 'https://github.com/rebecanonato89/quotes-service'
  },
  {
    title: 'TechChallenge: API de Gestão de Usuários',
    period: 'Mai 2025 - Jul 2025',
    description: '<p>Projeto acadêmico em Java 21 com Arquitetura Hexagonal para isolamento do domínio.</p><ul style="margin-top: 10px; padding-left: 20px;"><li><strong>Segurança:</strong> Spring Security, JWT e RBAC.</li><li><strong>Qualidade:</strong> SOLID, MapStruct, tratamento global de exceções e testes automatizados.</li></ul>',
    stack: ['Java 21', 'Spring Boot', 'Arquitetura Hexagonal', 'JWT', 'PostgreSQL'],
    link: 'https://github.com/fiap-tech-challenge-java/fiap-tech-challenge'
  },
  {
    title: 'ConcursoTrack: Tracker de Estudos',
    period: 'Mai 2026 - Momento',
    description: '<p>Aplicação pessoal full-stack para organização de estudos, com fila unificada de conteúdos, propagação de progresso entre concursos, dashboard e autenticação Google OAuth.</p>',
    stack: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'React', 'Docker'],
    liveUrl: 'https://concursotrack.rebecanonato89.dev',
    link: 'https://github.com/rebecanonato89/concursotrack',
    images: [
      { src: '/images/projects/concursotrack/concursotrack-inicio.jpg', alt: 'ConcursoTrack — tela Início: fila em andamento, meta semanal e streak de estudos' },
      { src: '/images/projects/concursotrack/concursotrack-fila.jpg', alt: 'ConcursoTrack — Fila de Estudos unificando tópicos de múltiplos concursos' }
    ]
  },
  {
    title: 'Kube Backend: API Node.js + PostgreSQL no Kubernetes',
    period: 'Nov 2025',
    description: '<p>Laboratório de infraestrutura para deploy de uma API Node.js/Express e PostgreSQL em Kubernetes local, usando Deployments, Services, ConfigMaps e Secrets.</p>',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'Kubernetes'],
    link: 'https://github.com/rebecanonato89/kube-backend'
  },
  {
    title: 'Equinox Solar CRM',
    period: 'Mar 2023 - Dez 2023',
    description: '<p>CRM full-stack para gestão comercial de projetos de energia solar, com backend em NestJS, frontend em Next.js e ambiente containerizado com Docker.</p>',
    stack: ['NestJS', 'Next.js', 'Docker']
  }
];

export const aboutData = {
  headline: 'Engenheira de Software com 10+ anos em desenvolvimento de sistemas, com foco atual em backend e sistemas distribuídos.',
  paragraphs: [
    'Minha trajetória combina desenvolvimento de sistemas corporativos, modernização de aplicações, backend distribuído e sustentação de produção. Hoje concentro minha atuação em Kotlin, Java e Node.js/TypeScript, com mensageria, arquitetura orientada a eventos e ambientes AWS.',
    'Tenho experiência com sistemas críticos, observabilidade, incidentes, CI/CD e decisões arquiteturais sob restrições reais de consistência, disponibilidade e evolução. Nos projetos públicos, busco tornar essas decisões verificáveis por meio de testes, limites arquiteturais e documentação técnica.',
    'IA aparece como ferramenta de engenharia: uso AI-assisted development no fluxo diário e mantenho pesquisa independente que combina análise estática e LLMs. O foco principal continua sendo engenharia de software, backend e sistemas distribuídos.'
  ],
  stack: ['Kotlin', 'Java', 'Node.js / TypeScript', 'Spring Boot', 'AWS', 'Kafka', 'Distributed Systems'],
};

export const contactData = {
  intro: 'Aberta a oportunidades e conversas sobre backend, sistemas distribuídos, confiabilidade e arquitetura de software.',
  channels: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/rebecanonato89/' },
    { label: 'GitHub', url: 'https://github.com/rebecanonato89' },
    { label: 'Email', url: 'mailto:rebecanonato89@gmail.com' },
  ],
};
