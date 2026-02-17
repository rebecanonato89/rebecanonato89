export type LocaleKey = "pt" | "en";

export const content = {
  pt: {
    locale: "pt-BR",
    name: "Rebeca Nonato",
    tagline:
      "Engenharia de Software focada em sistemas reais, escaláveis e sustentáveis",
    seo: {
      title: "Rebeca Nonato | Engenharia de Software",
      description:
        "Engenheira de Software com foco em sistemas reais, escaláveis e sustentáveis.",
      siteName: "Rebeca Nonato",
      url: "https://rebecanonato89.github.io",
      ogImage: "/og.svg",
    },
    nav: {
      home: "Home",
      services: "Serviços",
      projects: "Projetos",
      about: "Sobre",
      contact: "Contato",
    },
    ui: {
      theme: {
        dark: "Escuro",
        light: "Claro",
      },
      language: {
        pt: "PT",
        en: "EN",
      },
    },
    a11y: {
      skipToContent: "Ir para o conteúdo",
      primaryNav: "Navegação principal",
    },
    home: {
      headline: "Engenharia de Software para produtos e plataformas em escala",
      lead:
        "Atuação técnica com foco em arquitetura, entrega sustentável e evolução de sistemas complexos.",
      highlights: [
        "Arquitetura orientada a domínio e requisitos reais",
        "Evolução segura de código legado",
        "Entrega alinhada ao produto",
      ],
    },
    services: {
      title: "Serviços",
      lead:
        "Atendimento técnico direto, com foco em diagnóstico preciso e melhoria contínua.",
      items: [
        "Arquitetura e refatoração de sistemas legados",
        "Backend (Node.js, Java, Kotlin, C#)",
        "Frontend orientado a produto",
        "Modelagem de domínio",
        "Correção de bugs estruturais",
        "Apoio técnico a times",
      ],
    },
    projects: {
      title: "Projetos",
      lead:
        "Repositórios públicos coletados diretamente da API do GitHub.",
      filterLabel: "Filtrar por linguagem",
      allLanguages: "Todas as linguagens",
      emptyValue: "-",
      noDescription: "Sem descrição",
      noLanguage: "Sem linguagem",
      empty: "Nenhum projeto encontrado para este filtro.",
    },
    about: {
      title: "Sobre",
      lead:
        "Engenheira de Software com foco em diagnóstico técnico, arquitetura e evolução sustentável.",
      paragraphs: [
        "Atuo com sistemas que exigem clareza de domínio, performance e manutenção consistente ao longo do tempo.",
        "Prioridade em reduzir risco técnico, melhorar a previsibilidade e garantir que a plataforma suporte crescimento real.",
      ],
      focusTitle: "Áreas de foco",
      focusItems: [
        "Arquitetura modular e integrações críticas",
        "Refatoração guiada por métricas e risco",
        "Apoio técnico a squads e lideranças",
      ],
    },
    contact: {
      title: "Contato",
      lead:
        "Envie uma mensagem com contexto técnico. Retorno direto e objetivo.",
      form: {
        name: "Nome",
        email: "Email",
        company: "Empresa (opcional)",
        message: "Mensagem",
        submit: "Enviar",
        success: "Mensagem enviada. Obrigada!",
        error: "Não foi possível enviar. Tente novamente.",
      },
    },
    validation: {
      required: "Campo obrigatório",
      invalidEmail: "Email inválido",
    },
    footer: {
      note: "Disponível para projetos técnicos e consultoria.",
    },
  },
  en: {
    locale: "en",
    name: "Rebeca Nonato",
    tagline:
      "Software Engineering focused on real, scalable, and sustainable systems",
    seo: {
      title: "Rebeca Nonato | Software Engineering",
      description:
        "Software Engineer focused on real, scalable, and sustainable systems.",
      siteName: "Rebeca Nonato",
      url: "https://rebecanonato89.github.io",
      ogImage: "/og.svg",
    },
    nav: {
      home: "Home",
      services: "Services",
      projects: "Projects",
      about: "About",
      contact: "Contact",
    },
    ui: {
      theme: {
        dark: "Dark",
        light: "Light",
      },
      language: {
        pt: "PT",
        en: "EN",
      },
    },
    a11y: {
      skipToContent: "Skip to content",
      primaryNav: "Primary navigation",
    },
    home: {
      headline: "Software engineering for scalable products and platforms",
      lead:
        "Technical execution focused on architecture, sustainable delivery, and the evolution of complex systems.",
      highlights: [
        "Domain-driven architecture and real requirements",
        "Safe evolution of legacy code",
        "Delivery aligned with product goals",
      ],
    },
    services: {
      title: "Services",
      lead:
        "Direct technical engagement with precise diagnosis and continuous improvement.",
      items: [
        "Architecture and refactoring of legacy systems",
        "Backend (Node.js, Java, Kotlin, C#)",
        "Product-oriented frontend",
        "Domain modeling",
        "Structural bug fixing",
        "Technical support for teams",
      ],
    },
    projects: {
      title: "Projects",
      lead:
        "Public repositories fetched directly from the GitHub API.",
      filterLabel: "Filter by language",
      allLanguages: "All languages",
      emptyValue: "-",
      noDescription: "No description",
      noLanguage: "No language",
      empty: "No projects found for this filter.",
    },
    about: {
      title: "About",
      lead:
        "Software Engineer focused on technical diagnosis, architecture, and sustainable evolution.",
      paragraphs: [
        "I work with systems that demand domain clarity, performance, and consistent long-term maintainability.",
        "Priority on reducing technical risk, improving predictability, and ensuring the platform supports real growth.",
      ],
      focusTitle: "Focus areas",
      focusItems: [
        "Modular architecture and critical integrations",
        "Refactoring guided by metrics and risk",
        "Technical support for squads and leadership",
      ],
    },
    contact: {
      title: "Contact",
      lead:
        "Send a message with technical context. Direct and objective response.",
      form: {
        name: "Name",
        email: "Email",
        company: "Company (optional)",
        message: "Message",
        submit: "Send",
        success: "Message sent. Thank you!",
        error: "Could not send. Please try again.",
      },
    },
    validation: {
      required: "Required field",
      invalidEmail: "Invalid email",
    },
    footer: {
      note: "Available for technical projects and consulting.",
    },
  },
} as const;
