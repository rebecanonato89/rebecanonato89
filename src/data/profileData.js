// Dados compartilhados entre a Home (narrativa em cards) e as visões "código"
// abertas a partir do sidebar (sobre.md, experiencia.log, certificacoes.log,
// deployments.json, contato.md) — uma única fonte de verdade para não duplicar.

export const experienceData = [
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
];

export const educationData = [
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
];

export const projectsData = [
  {
    title: 'ConcursoTrack: Tracker de Estudos para Concursos Públicos',
    period: 'Mai 2026 - Momento',
    description: '<p>Aplicação web pessoal full-stack para gerenciamento de estudos em concursos públicos de alto nível (TCU, TCE-SP, CGU, SEFAZ-CE e outros).</p><p style="margin-top: 10px;"><strong>Funcionalidades:</strong></p><ul style="margin-top: 5px; padding-left: 20px;"><li><strong>Fila inteligente:</strong> une conteúdos de múltiplos concursos sem duplicação, com ordem de pré-requisitos.</li><li><strong>Check propagado:</strong> marcar um tópico como concluído reflete em todos os concursos que o exigem.</li><li><strong>Dashboard:</strong> streak de dias, heatmap estilo GitHub, progresso por concurso e alertas de prazo.</li><li><strong>Auth:</strong> Google OAuth 2.0 com whitelist de 1 usuário. Mobile-first com bottom tab bar.</li></ul>',
    stack: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'React', 'Vite', 'Tailwind CSS', 'Docker'],
    liveUrl: 'https://concursotrack.rebecanonato89.dev',
    link: 'https://github.com/rebecanonato89/concursotrack',
    images: [
      { src: '/images/projects/concursotrack/concursotrack-inicio.jpg', alt: 'ConcursoTrack — tela Início: fila em andamento, meta semanal e streak de estudos' },
      { src: '/images/projects/concursotrack/concursotrack-fila.jpg', alt: 'ConcursoTrack — Fila de Estudos unificando tópicos de múltiplos concursos' }
    ]
  },
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
    description: '<p>Plataforma SaaS projetada com arquitetura Multi-Tenant para servir múltiplas empresas a partir de uma única instância. Em produção, atendendo clientes reais como a <strong>FN Monografias</strong>.</p><p style="margin-top: 10px;"><strong>Back-end:</strong> NestJS/TypeScript, PostgreSQL (TypeORM), JWT e RBAC para controle de acesso restrito e seguro.</p><p style="margin-top: 10px;"><strong>Front-end:</strong> SPA em Angular 17, NgRx para gestão de estado e Route Guards para segurança espelhada.</p>',
    stack: ['NestJS', 'Angular 17', 'PostgreSQL', 'Multi-Tenant', 'JWT'],
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
    description: '<p>MVP de domínio de seguros (Auto e Vida) explorando Domain-Driven Design em Kotlin, com foco em regras de negócio explícitas de precificação e subscrição.</p><p style="margin-top: 10px;"><strong>Destaques:</strong></p><ul style="margin-top: 5px; padding-left: 20px;"><li>Motor de cotação com cálculo de preço, adicionais de cobertura, fator de idade e aprovação/rejeição automática.</li><li>Validação de entrada via padrão funcional <em>Either</em>, evitando exceptions para erros de negócio.</li><li>Emissão de apólice a partir de cotações aprovadas, com eventos de domínio e processamento assíncrono via coroutines.</li></ul>',
    stack: ['Kotlin', 'Spring Boot 3', 'Java 17', 'DDD', 'Coroutines'],
    link: 'https://github.com/rebecanonato89/quotes-service'
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
  },
  {
    title: 'Kube Backend: API Node.js + PostgreSQL no Kubernetes',
    period: 'Nov 2025',
    description: '<p>Laboratório de infraestrutura demonstrando o deploy de um backend Node.js/Express junto a um PostgreSQL em um cluster Kubernetes local (Minikube).</p><p style="margin-top: 10px;"><strong>Cobertura:</strong> Deployments e Services separados para API e banco, ConfigMaps e Secrets para gestão de configuração sensível, e endpoints de verificação de conectividade com o banco.</p>',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'Kubernetes'],
    link: 'https://github.com/rebecanonato89/kube-backend'
  }
];

export const aboutData = {
  headline: 'Engenheira de Software com +7 anos de experiência, focada em sistemas distribuídos e microsserviços cloud-native.',
  paragraphs: [
    'Especialista na implementação, evolução e sustentação em ambientes AWS (Lambda, API Gateway, EC2, ECS, EKS) com forte vivência em mensageria orientada a eventos (Kafka, SQS). Minha atuação é baseada na aplicação rigorosa de padrões como Clean Architecture, Arquitetura Hexagonal e SOLID.',
    'Possuo amplo histórico no gerenciamento de incidentes críticos (war rooms, incidentes P1/P2) e manutenção da estabilidade operacional através de práticas profundas de observabilidade (Datadog, CloudWatch) e pipelines automatizados (CI/CD, GitHub Actions, Docker).',
  ],
  stack: ['Node.js', 'Kotlin', 'Java (Spring)', 'C#', 'AWS', 'Kafka', 'Microservices'],
};

export const contactData = {
  intro: 'Conexões abertas para propostas de engenharia, arquitetura e discussões sobre resiliência de sistemas críticos.',
  channels: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/rebecanonato89/' },
    { label: 'GitHub', url: 'https://github.com/rebecanonato89' },
    { label: 'Email', url: 'mailto:rebecanonato89@gmail.com' },
  ],
};
