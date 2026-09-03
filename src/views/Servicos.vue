<template>
  <main id="main-content">
    <section id="servicos-hero" aria-labelledby="servicos-hero-title">
      <h2 id="servicos-hero-title" class="section-title">Contrate // Sites & Sistemas</h2>
      <div class="hud-card">
        <p><strong>Ajudo pequenos negócios a sair do improviso com sites, sistemas internos e automações simples.</strong></p>
        <p>Nada de "faço qualquer sistema" — cada projeto tem escopo fechado, prazo definido e a mesma disciplina de engenharia que aplico em produção para grandes empresas.</p>
      </div>
    </section>

    <section id="servicos-lista" aria-labelledby="servicos-lista-title">
      <h2 id="servicos-lista-title" class="section-title">O Que Eu Faço</h2>
      <div class="project-grid">
        <article v-for="servico in servicosData" :key="servico.titulo" class="hud-card">
          <header class="card-header">
            <h3 class="card-title">{{ servico.titulo }}</h3>
          </header>
          <p class="card-desc">{{ servico.descricao }}</p>
          <ul class="tech-list" aria-label="O que está incluso">
            <li v-for="item in servico.inclui" :key="item" class="tech-tag">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section id="servicos-processo" aria-labelledby="servicos-processo-title">
      <h2 id="servicos-processo-title" class="section-title">Como Funciona</h2>
      <ol class="timeline">
        <li v-for="etapa in processoData" :key="etapa.titulo" class="timeline-item">
          <h3 class="timeline-title">{{ etapa.titulo }}</h3>
          <p class="timeline-desc">{{ etapa.descricao }}</p>
        </li>
      </ol>
    </section>

    <section id="servicos-cases" aria-labelledby="servicos-cases-title">
      <h2 id="servicos-cases-title" class="section-title">Cases Reais</h2>
      <div class="project-grid">
        <article v-for="caso in casesData" :key="caso.titulo" class="hud-card">
          <header class="card-header">
            <h3 class="card-title">{{ caso.titulo }}</h3>
            <span class="card-period">{{ caso.tag }}</span>
          </header>
          <div class="card-desc" v-html="caso.descricao"></div>
          <div style="display: flex; gap: var(--space-sm); flex-wrap: wrap;">
            <a :href="caso.link" target="_blank" rel="noopener noreferrer" class="btn-hud btn-hud--live">
              Acessar <span class="sr-only"> (Abre em uma nova aba)</span>
            </a>
          </div>
        </article>
      </div>
    </section>

    <section id="servicos-investimento" aria-labelledby="servicos-investimento-title">
      <h2 id="servicos-investimento-title" class="section-title">Investimento</h2>
      <div class="hud-card">
        <p class="card-desc">
          Não trabalho com pacote fechado sem conversa antes: o valor final depende do escopo real do seu
          negócio. Cada orçamento é montado depois de entender o que você precisa — sem chute, sem "sistema
          genérico" e sem surpresa no meio do caminho.
        </p>
      </div>
    </section>

    <section id="servicos-contato" aria-labelledby="servicos-contato-title">
      <h2 id="servicos-contato-title" class="section-title">Solicitar Orçamento</h2>
      <div class="hud-card">
        <h3 class="card-title">Fale sobre o seu projeto</h3>
        <p class="card-desc">Conte o que você precisa — site, sistema ou automação — e retorno com uma proposta de escopo.</p>
        <div style="display: flex; gap: var(--space-md); flex-wrap: wrap;">
          <a href="mailto:rebecanonato89@gmail.com?subject=Or%C3%A7amento%20de%20site%2Fsistema" class="btn-hud btn-hud--live">
            Solicitar orçamento por e-mail
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Servicos',
  data() {
    return {
      servicosData: [
        {
          titulo: 'Sites Profissionais',
          descricao: 'Sites institucionais e landing pages para apresentar seu negócio com clareza, com foco em conversão e presença digital.',
          inclui: ['Landing page', 'Site institucional', 'WhatsApp integrado', 'Formulário de contato', 'Google Maps'],
        },
        {
          titulo: 'Sistemas Web Sob Medida',
          descricao: 'Sistemas simples e bem delimitados para organizar processos internos — sem prometer "ERP completo" por um preço de sisteminha.',
          inclui: ['Controle de clientes', 'Orçamentos e pedidos', 'Agenda', 'Financeiro simples', 'Dashboard'],
        },
        {
          titulo: 'Automações & Integrações',
          descricao: 'Automatização de tarefas repetitivas para parar de copiar dados de um lugar para outro manualmente.',
          inclui: ['Planilhas automatizadas', 'Formulário + e-mail', 'Geração de PDF', 'Relatórios automáticos', 'Integração WhatsApp'],
        },
        {
          titulo: 'Lojas, WordPress & Hospedagem',
          descricao: 'Criação e manutenção de lojas e sites em plataformas como WordPress e Wix, incluindo domínio, hospedagem e suporte contínuo.',
          inclui: ['Loja WordPress/Wix', 'Migração de hospedagem', 'Atualização de plugins', 'Backup', 'Manutenção mensal'],
        },
      ],
      processoData: [
        { titulo: '1. Briefing', descricao: 'Entendo seu negócio, o problema real e o que você espera do resultado final.' },
        { titulo: '2. Proposta de escopo fechado', descricao: 'Você recebe um escopo claro do que será entregue, prazo e investimento — sem letras miúdas.' },
        { titulo: '3. Desenvolvimento', descricao: 'Construção do site, sistema ou automação, com pontos de checagem ao longo do caminho.' },
        { titulo: '4. Entrega & suporte', descricao: 'Entrega final com o que foi combinado, mais suporte e manutenção para quem precisar de continuidade.' },
      ],
      casesData: [
        {
          titulo: 'AllRev — Sistema Completo em Produção',
          tag: 'SISTEMA',
          descricao: '<p>Plataforma SaaS multi-tenant com login, dashboard, controle de acesso (RBAC) e gestão de ordens de serviço. Em produção, atendendo clientes reais.</p>',
          link: 'https://app.allrev.com.br',
        },
        {
          titulo: 'FN Monografias — Site + Sistema de Gestão',
          tag: 'SITE & SISTEMA',
          descricao: '<p>Site institucional de apresentação do serviço, com o sistema de gestão de pedidos (AllRev) rodando por trás para organizar todo o fluxo de atendimento.</p>',
          link: 'https://fnmonografias.com.br',
        },
        {
          titulo: 'GetUp Livraria — Loja Online',
          tag: 'LOJA',
          descricao: '<p>Loja online para venda de livros, com catálogo, apresentação de produtos e presença digital própria.</p>',
          link: 'https://www.getuplivraria.com/',
        },
      ],
    };
  },
};
</script>
