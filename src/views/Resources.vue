<template>
  <main id="main-content">
    <section id="resources" aria-labelledby="resources-title">
      <h2 id="resources-title" class="section-title">Recursos // Biblioteca Aberta</h2>

      <div class="hud-card res-intro">
        <p>
          Uma curadoria de <strong>recursos gratuitos e de qualidade</strong> que eu uso e recomendo:
          livros, roadmaps, ferramentas e cursos. Tudo aberto, sem cadastro pago — salve esta página
          e volte sempre que precisar. Contribuições e sugestões são bem-vindas via
          <a href="https://github.com/rebecanonato89/rebecanonato89/issues" target="_blank" rel="noopener noreferrer">issues no GitHub</a>.
        </p>
      </div>

      <section
        v-for="category in categories"
        :key="category.title"
        class="res-category"
        :aria-labelledby="'res-' + category.id"
      >
        <h3 :id="'res-' + category.id" class="res-category-title">
          <span aria-hidden="true">{{ category.icon }}</span> {{ category.title }}
        </h3>
        <div class="res-grid">
          <a
            v-for="item in category.items"
            :key="item.name"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="hud-card res-card"
            :class="{ 'res-card--featured': item.featured }"
          >
            <div class="res-card-top">
              <span class="res-name">{{ item.name }}</span>
              <span v-if="item.featured" class="res-badge">Destaque</span>
              <span v-else-if="item.lang" class="res-lang">{{ item.lang }}</span>
            </div>
            <p class="res-desc">{{ item.description }}</p>
            <span class="res-url" aria-hidden="true">{{ shortUrl(item.url) }} ↗</span>
          </a>
        </div>
      </section>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Resources',
  data() {
    return {
      categories: [
        {
          id: 'books',
          icon: '📚',
          title: 'Livros e Bibliotecas de Download',
          items: [
            {
              name: 'BibliotecaDev',
              url: 'https://github.com/KAYOKG/BibliotecaDev',
              description: 'Acervo enorme de livros de programação para download: Java, Python, JavaScript, arquitetura, bancos de dados e muito mais.',
              featured: true,
            },
            {
              name: 'Free Programming Books (PT-BR)',
              url: 'https://github.com/EbookFoundation/free-programming-books/blob/main/books/free-programming-books-pt_BR.md',
              description: 'A maior lista do mundo de livros de programação gratuitos, na seção em português. Mantida pela Free Ebook Foundation.',
              lang: 'PT-BR',
            },
            {
              name: 'Goalkicker Books',
              url: 'https://books.goalkicker.com/',
              description: 'Dezenas de livros em PDF compilados da documentação do Stack Overflow: Java, SQL, Python, Git, Kotlin e mais.',
              lang: 'EN',
            },
            {
              name: 'Papers We Love',
              url: 'https://github.com/papers-we-love/papers-we-love',
              description: 'Coleção de papers acadêmicos clássicos de ciência da computação — sistemas distribuídos, bancos de dados, linguagens.',
              lang: 'EN',
            },
          ],
        },
        {
          id: 'roadmaps',
          icon: '🗺️',
          title: 'Roadmaps e Guias de Estudo',
          items: [
            {
              name: 'roadmap.sh',
              url: 'https://roadmap.sh',
              description: 'Roadmaps visuais e interativos de carreira: backend, frontend, DevOps, IA, arquitetura de software e mais.',
              lang: 'EN',
            },
            {
              name: 'System Design Primer',
              url: 'https://github.com/donnemartin/system-design-primer',
              description: 'O guia definitivo (e gratuito) de system design: escalabilidade, cache, filas, bancos — essencial para entrevistas sênior.',
              lang: 'EN',
            },
            {
              name: 'Refactoring Guru',
              url: 'https://refactoring.guru/pt-br',
              description: 'Design patterns e refatoração explicados com ilustrações excelentes, totalmente traduzido para português.',
              lang: 'PT-BR',
            },
            {
              name: 'Build Your Own X',
              url: 'https://github.com/codecrafters-io/build-your-own-x',
              description: 'Aprenda construindo: tutoriais para criar seu próprio banco de dados, docker, git, compilador, blockchain…',
              lang: 'EN',
            },
            {
              name: 'Tech Interview Handbook',
              url: 'https://www.techinterviewhandbook.org/',
              description: 'Preparação completa e gratuita para entrevistas técnicas: algoritmos, behavioral e negociação de salário.',
              lang: 'EN',
            },
          ],
        },
        {
          id: 'tools',
          icon: '🛠️',
          title: 'Ferramentas do Dia a Dia',
          items: [
            {
              name: 'regex101',
              url: 'https://regex101.com',
              description: 'Teste e depure expressões regulares com explicação passo a passo de cada token.',
              lang: 'EN',
            },
            {
              name: 'Crontab Guru',
              url: 'https://crontab.guru',
              description: 'Traduz expressões cron para linguagem humana. Nunca mais erre um agendamento.',
              lang: 'EN',
            },
            {
              name: 'JWT.io',
              url: 'https://jwt.io',
              description: 'Decodifique e inspecione tokens JWT direto no navegador — indispensável para depurar autenticação.',
              lang: 'EN',
            },
            {
              name: 'Excalidraw',
              url: 'https://excalidraw.com',
              description: 'Quadro branco virtual com estética de desenho à mão. Perfeito para diagramas de arquitetura.',
              lang: 'EN',
            },
            {
              name: 'JSON Crack',
              url: 'https://jsoncrack.com',
              description: 'Visualize JSONs gigantes como grafos navegáveis. Salva vidas ao depurar payloads complexos.',
              lang: 'EN',
            },
            {
              name: 'DevDocs',
              url: 'https://devdocs.io',
              description: 'Documentação de dezenas de linguagens e frameworks unificada, com busca rápida e modo offline.',
              lang: 'EN',
            },
          ],
        },
        {
          id: 'courses',
          icon: '🎓',
          title: 'Cursos e Certificações Gratuitas',
          items: [
            {
              name: 'Curso em Vídeo',
              url: 'https://www.cursoemvideo.com',
              description: 'Cursos gratuitos do Gustavo Guanabara: lógica, Python, Java, HTML/CSS e Git — a melhor porta de entrada em português.',
              lang: 'PT-BR',
            },
            {
              name: 'freeCodeCamp',
              url: 'https://www.freecodecamp.org',
              description: 'Certificações gratuitas com projetos práticos: web, JavaScript, bancos relacionais, machine learning.',
              lang: 'EN',
            },
            {
              name: 'CS50 — Harvard',
              url: 'https://cs50.harvard.edu/x/',
              description: 'O curso introdutório de ciência da computação mais famoso do mundo, gratuito e com certificado opcional.',
              lang: 'EN',
            },
            {
              name: 'AWS Skill Builder',
              url: 'https://skillbuilder.aws',
              description: 'Centenas de cursos oficiais gratuitos da AWS — o caminho para as certificações Cloud Practitioner e além.',
              lang: 'EN',
            },
            {
              name: 'Full Stack Open',
              url: 'https://fullstackopen.com/pt/',
              description: 'Curso universitário completo (Univ. de Helsinque) de desenvolvimento web moderno: React, Node, GraphQL, TypeScript.',
              lang: 'PT-BR',
            },
          ],
        },
      ],
    };
  },
  methods: {
    shortUrl(url) {
      return url.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/').slice(0, 2).join('/');
    },
  },
};
</script>

<style scoped>
.res-intro { margin-bottom: var(--space-lg); }
.res-intro p { color: var(--text-main); }
.res-intro a { color: var(--accent-core); }

.res-category { margin-bottom: var(--space-xl); }
.res-category-title {
  font-family: var(--font-ui);
  font-size: 1.5rem;
  color: var(--text-main);
  margin-bottom: var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.res-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}
@media (min-width: 700px) {
  .res-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1100px) {
  .res-grid { grid-template-columns: repeat(3, 1fr); }
}

.res-card {
  text-decoration: none;
  gap: var(--space-sm);
  padding: var(--space-md);
}
.res-card--featured {
  border-color: var(--accent-core);
  box-shadow: 0 0 18px var(--accent-dim);
}
.res-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
}
.res-name {
  font-family: var(--font-ui);
  font-size: 1.2rem;
  color: var(--text-main);
}
.res-badge {
  font-family: var(--font-code);
  font-size: 0.7rem;
  background: var(--accent-core);
  color: var(--bg-base);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  font-weight: 700;
  white-space: nowrap;
}
.res-lang {
  font-family: var(--font-code);
  font-size: 0.7rem;
  color: var(--accent-core);
  border: 1px solid var(--accent-border);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  white-space: nowrap;
}
.res-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  flex-grow: 1;
}
.res-card:hover .res-desc { color: var(--text-main); }
.res-url {
  font-family: var(--font-code);
  font-size: 0.75rem;
  color: var(--accent-core);
}
</style>
