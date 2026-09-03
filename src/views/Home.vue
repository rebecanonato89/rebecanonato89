<template>
  <main id="main-content">
    <section id="inicio" class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">Software Engineer · Backend &amp; Distributed Systems</p>
        <h1 id="hero-title">I build backend systems<br><span>that need to keep working.</span></h1>
        <p class="hero-name">Rebeca Nonato <span aria-hidden="true">/</span> Software Engineer</p>
        <p class="hero-subheadline">Backend · Distributed Systems · Event-Driven · Cloud</p>
        <p class="hero-stack" aria-label="Stack principal">Kotlin · Java · Node.js · AWS · Kafka</p>
        <div class="actions" aria-label="Ações principais">
          <a href="#projetos" class="button primary">Ver projetos</a>
          <a href="https://github.com/rebecanonato89" target="_blank" rel="noopener noreferrer" class="button">GitHub<span class="sr-only"> (abre em nova aba)</span></a>
          <a href="https://www.linkedin.com/in/rebecanonato89/" target="_blank" rel="noopener noreferrer" class="button">LinkedIn<span class="sr-only"> (abre em nova aba)</span></a>
          <a :href="`mailto:${basicsData.email}`" class="button">Contato</a>
        </div>
        <div class="resume-links" aria-label="Currículo em outros formatos"><span>Currículo</span><a href="/rebeca-nonato-curriculo.pdf" download>PDF</a><a href="/resume.md" download>Markdown</a><a href="/resume.json">JSON</a><button type="button" @click="printResume">Imprimir</button></div>
      </div>
      <div class="system-visual" aria-hidden="true">
        <svg viewBox="0 0 620 470"><defs><linearGradient id="flow" x1="0" x2="1"><stop offset="0" stop-color="var(--accent-core)"/><stop offset="1" stop-color="var(--accent-cyan)"/></linearGradient></defs><g fill="none" stroke="url(#flow)" stroke-width="2"><path d="M92 105H242C278 105 278 190 314 190H475"/><path d="M92 344H220C266 344 266 265 312 265H520"/><path d="M314 190V265"/></g><g class="nodes"><rect x="42" y="70" width="110" height="70" rx="14"/><rect x="252" y="155" width="124" height="70" rx="14"/><rect x="250" y="230" width="128" height="70" rx="14"/><rect x="440" y="155" width="132" height="70" rx="14"/><rect x="458" y="309" width="114" height="70" rx="14"/></g><g class="labels" text-anchor="middle"><text x="97" y="111">REQUEST</text><text x="314" y="196">EVENT</text><text x="314" y="271">QUEUE</text><text x="506" y="196">CONSUMER</text><text x="515" y="350">STORE</text></g><g class="dots"><circle cx="202" cy="105" r="5"/><circle cx="411" cy="190" r="5"/><circle cx="184" cy="344" r="5"/><circle cx="415" cy="265" r="5"/></g></svg>
        <p><span></span> designed for failure, recovery and change</p>
      </div>
    </section>

    <section id="projetos" class="section projects" aria-labelledby="projetos-title">
      <header class="section-heading"><div><p class="eyebrow">Selected Engineering Work</p><h2 id="projetos-title">Projetos em Destaque</h2></div><p>Decisões de engenharia documentadas em código público — do domínio ao deploy.</p></header>
      <div class="projects-layout">
        <article v-for="(project, index) in featuredProjects" :key="project.title" class="project-card" :class="{ lead: index === 0 }">
          <div class="project-index" aria-hidden="true">0{{ index + 1 }}</div>
          <div class="project-content">
            <div class="project-meta"><span>{{ projectContext(project.title) }}</span><time>{{ project.period }}</time></div>
            <h3>{{ shortTitle(project.title) }}</h3>
            <div class="project-description" v-html="project.description"></div>
            <div v-if="projectFlow(project.title)" class="mini-flow" :aria-label="`Fluxo simplificado de ${shortTitle(project.title)}`"><template v-for="(step, i) in projectFlow(project.title)" :key="step"><span>{{ step }}</span><i v-if="i < projectFlow(project.title).length - 1" aria-hidden="true">→</i></template></div>
            <ul class="tech-list" aria-label="Tecnologias e padrões"><li v-for="tech in project.stack" :key="tech">{{ tech }}</li></ul>
            <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="project-link">Ver repositório ↗<span class="sr-only"> (abre em nova aba)</span></a>
          </div>
        </article>
      </div>
    </section>

    <section id="sobre" class="section about" aria-labelledby="sobre-title"><div class="section-heading compact"><p class="eyebrow">Profile</p><h2 id="sobre-title">Engenharia para sistemas reais.</h2></div><div class="about-copy"><p>{{ aboutData.paragraphs[0] }}</p><p>{{ aboutData.paragraphs[1] }}</p></div></section>

    <section id="experiencia" class="section" aria-labelledby="experiencia-title">
      <header class="section-heading"><div><p class="eyebrow">Experience</p><h2 id="experiencia-title">Trajetória profissional</h2></div><p>Mais de 10 anos construindo, modernizando e sustentando sistemas.</p></header>
      <ol class="career"><li v-for="job in experienceData" :key="job.role + job.company + job.period"><i aria-hidden="true"></i><time>{{ job.period }}</time><div><div class="career-title"><h3>{{ job.role }}</h3><span v-if="job.evolution">{{ job.evolution }}</span></div><p class="company">{{ job.company }}</p><p>{{ compactExperience(job) }}</p></div></li></ol>
    </section>

    <section id="skills" class="section" aria-labelledby="skills-title">
      <header class="section-heading"><div><p class="eyebrow">Capabilities</p><h2 id="skills-title">Competências por domínio</h2></div><p>Ferramentas a serviço de arquitetura, confiabilidade e evolução.</p></header>
      <div class="skills"><article v-for="group in domainSkills" :key="group.category"><span aria-hidden="true">{{ group.number }}</span><h3>{{ group.category }}</h3><p>{{ group.primary }}</p><ul class="tech-list" :aria-label="group.category"><li v-for="item in group.items" :key="item">{{ item }}</li></ul></article></div>
    </section>

    <section class="section compact-area" aria-label="Formação e publicações">
      <div id="certificacoes"><div class="section-heading compact"><p class="eyebrow">Learning</p><h2>Formação &amp; Certificações</h2></div><ul class="compact-list"><li v-for="edu in educationData" :key="edu.role + edu.company"><div><strong>{{ edu.role }}</strong><span>{{ edu.company }}</span></div><time>{{ edu.period }}</time></li></ul></div>
      <div id="publicacoes"><div class="section-heading compact"><p class="eyebrow">Writing</p><h2>Publicações</h2></div><ul class="compact-list"><li v-for="pub in publicationsData" :key="pub.title"><div><strong>{{ pub.title }}</strong><span>{{ pub.venue }}</span></div><time>{{ pub.period }}</time></li></ul></div>
    </section>

    <section class="section machine" aria-labelledby="machine-title"><div><p class="eyebrow">Under the hood</p><h2 id="machine-title">Built for humans and machines</h2><p>Este portfólio usa HTML semântico e conteúdo prerenderizado para ser legível por pessoas, mecanismos de busca e agentes — sem abrir mão de acessibilidade.</p></div><ul aria-label="Características técnicas do portfólio"><li>Accessibility</li><li>Semantic HTML</li><li>Structured Data</li><li>JSON Resume</li><li>LLM-readable</li><li>Prerendered content</li></ul></section>

    <section id="contato" class="contact" aria-labelledby="contato-title"><p class="eyebrow">Start a conversation</p><h2 id="contato-title">Let’s build reliable systems.</h2><p>{{ contactData.intro }}</p><div class="actions"><a v-for="channel in contactData.channels" :key="channel.label" :href="channel.url" :target="channel.url.startsWith('http') ? '_blank' : null" :rel="channel.url.startsWith('http') ? 'noopener noreferrer' : null" class="button primary">{{ channel.label }}<span v-if="channel.url.startsWith('http')" class="sr-only"> (abre em nova aba)</span></a></div></section>
  </main>
</template>

<script>
import { basicsData, aboutData, experienceData, educationData, publicationsData, projectsData, contactData } from '../data/profileData.js';
const FEATURED = ['ClinicFiapApp - Microsserviços de Agendamento Hospitalar','Food Fiapp: API de Gestão de Restaurantes','Hedge CLI: Análise Estática + IA para Eager Test','Quotes Service: Cotação e Emissão de Apólices','TechChallenge: API de Gestão de Usuários','Kube Backend: API Node.js + PostgreSQL no Kubernetes'];
const CONTEXT = { ClinicFiapApp: 'Projeto acadêmico colaborativo', Food: 'Projeto acadêmico', Hedge: 'Independent Software Engineering Research', Quotes: 'Projeto pessoal · MVP', TechChallenge: 'Projeto acadêmico', Kube: 'Laboratório de infraestrutura' };
const FLOWS = { ClinicFiapApp: ['API','Command','Kafka','Consumer','Outbox','Database'], Food: ['HTTP','Use Case','Domain','Adapter'], Hedge: ['Java tests','AST','Heuristics','LLM gate','Ensemble'], Quotes: ['Quote','Domain rules','Event','Coroutine'] };
export default {
  name: 'Home', data() { return { basicsData, aboutData, experienceData, educationData, publicationsData, projectsData, contactData }; },
  computed: {
    featuredProjects() { return FEATURED.map(title => this.projectsData.find(project => project.title === title)).filter(Boolean); },
    domainSkills() { return [
      { number:'01', category:'Backend', primary:'Kotlin · Java · Node.js', items:['Spring Boot','NestJS','PostgreSQL'] },
      { number:'02', category:'Distributed Systems', primary:'Kafka · SQS', items:['Event-Driven','CQRS','Outbox','Idempotência'] },
      { number:'03', category:'Architecture', primary:'DDD · Clean Architecture', items:['Hexagonal','Microsserviços','Multi-Tenant'] },
      { number:'04', category:'Cloud & Reliability', primary:'AWS · Docker · Kubernetes', items:['Datadog','CloudWatch','CI/CD','DLQ'] },
      { number:'05', category:'Engineering Quality', primary:'TDD · Testes automatizados', items:['ArchUnit','Observabilidade','Code review'] },
    ]; },
  },
  methods: {
    shortTitle(title) { return title.split(/:| - /)[0]; },
    projectContext(title) { const key = Object.keys(CONTEXT).find(item => title.startsWith(item)); return CONTEXT[key] || 'Projeto público'; },
    projectFlow(title) { const key = Object.keys(FLOWS).find(item => title.startsWith(item)); return FLOWS[key] || null; },
    compactExperience(job) { return job.description.split(/(?<=[.!?])\s+/).slice(0, 2).join(' '); },
    printResume() { window.print(); },
  },
};
</script>

<style scoped>
main{overflow:hidden}.hero{max-width:1240px;min-height:720px;margin:auto;padding:clamp(5rem,10vw,9rem) 1.5rem 6rem;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(340px,.8fr);gap:4rem;align-items:center}.eyebrow{margin:0 0 1rem;color:var(--accent-cyan);font:700 .76rem var(--font-code);letter-spacing:.14em;text-transform:uppercase}.hero h1{max-width:850px;margin:0;font-size:clamp(3rem,6.2vw,5.8rem);line-height:.98;letter-spacing:-.065em}.hero h1 span{color:var(--text-muted)}.hero-name{margin:2rem 0 .45rem;font-family:var(--font-ui);font-weight:650}.hero-name span{margin:0 .5rem;color:var(--accent-core)}.hero-subheadline,.hero-stack{margin:.3rem 0;color:var(--text-muted)}.hero-stack{font: .88rem var(--font-code)}.actions{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:2rem}.button{min-height:44px;padding:.68rem 1rem;border:1px solid var(--accent-border);border-radius:8px;display:inline-flex;align-items:center;justify-content:center;color:var(--text-main);font:650 .88rem var(--font-ui);text-decoration:none;transition:.2s}.button:hover{border-color:var(--accent-core);background:var(--accent-dim);color:var(--text-main);transform:translateY(-2px)}.button.primary{border-color:var(--accent-core);background:var(--accent-core);color:var(--button-text)}.button.primary:hover{background:var(--accent-hover);color:var(--button-text)}.resume-links{display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1.35rem;color:var(--text-subtle);font:.75rem var(--font-code)}.resume-links a,.resume-links button{padding:0;border:0;background:none;color:var(--text-muted);font:inherit;text-decoration:underline;text-underline-offset:3px;cursor:pointer}.system-visual{position:relative}.system-visual:before{content:'';position:absolute;inset:12% 8%;background:radial-gradient(circle,var(--accent-glow),transparent 66%);filter:blur(24px)}.system-visual svg{position:relative;width:100%;height:auto}.nodes rect{fill:var(--bg-surface-raised);stroke:var(--accent-border);stroke-width:2}.labels{fill:var(--text-muted);font:700 12px var(--font-code);letter-spacing:.08em}.dots{fill:var(--accent-cyan)}.system-visual p{margin:-1rem 0 0;color:var(--text-subtle);font:.7rem var(--font-code);text-align:center}.system-visual p span{width:7px;height:7px;margin-right:.45rem;border-radius:50%;display:inline-block;background:var(--status-ok)}
.section{max-width:1180px;margin:auto;padding:clamp(4.5rem,8vw,7rem) 1.5rem}.section-heading{margin-bottom:2.5rem;display:grid;grid-template-columns:1.1fr .9fr;gap:2rem;align-items:end}.section-heading h2,.contact h2{margin:0;font-size:clamp(2.1rem,4vw,3.6rem);letter-spacing:-.045em}.section-heading>p{max-width:48ch;margin:0;color:var(--text-muted)}.section-heading.compact{display:block}.projects{max-width:1240px}.projects-layout{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.project-card{min-width:0;position:relative;padding:clamp(1.5rem,3vw,2.3rem);border:1px solid var(--accent-border);border-radius:18px;background:linear-gradient(145deg,var(--bg-surface-raised),var(--bg-surface));overflow:hidden}.project-card.lead{grid-column:1/-1;display:grid;grid-template-columns:100px minmax(0,1fr)}.project-index{color:var(--accent-soft);font:700 clamp(2rem,4vw,4rem) var(--font-code)}.project-content{min-width:0}.project-meta{display:flex;flex-wrap:wrap;justify-content:space-between;gap:.5rem 1rem;color:var(--text-subtle);font:.7rem var(--font-code);letter-spacing:.06em;text-transform:uppercase}.project-meta span{color:var(--accent-cyan)}.project-card h3{margin:.8rem 0 1.25rem;font-size:clamp(1.5rem,2.5vw,2.2rem)}.project-description{color:var(--text-muted)}.project-description :deep(p),.project-description :deep(ul){margin:0 0 .7rem}.project-description :deep(ul){padding-left:1.2rem!important}.mini-flow{margin:1.5rem 0;padding:1rem;display:flex;align-items:center;gap:.55rem;overflow-x:auto;border:1px solid var(--accent-border);border-radius:10px;background:var(--code-bg);font:650 .68rem var(--font-code)}.mini-flow span{padding:.35rem .55rem;border-radius:5px;background:var(--accent-dim);white-space:nowrap}.mini-flow i{color:var(--accent-cyan);font-style:normal}.tech-list{margin:1.25rem 0;padding:0;display:flex;flex-wrap:wrap;gap:.45rem;list-style:none}.tech-list li{max-width:100%;padding:.3rem .58rem;border:1px solid var(--accent-border);border-radius:999px;color:var(--text-muted);font:.7rem var(--font-code);overflow-wrap:anywhere}.project-link{font:700 .82rem var(--font-ui);text-decoration:none}
.about{display:grid;grid-template-columns:.8fr 1.2fr;gap:5rem}.about-copy{display:grid;gap:1.2rem;color:var(--text-muted);font-size:1.08rem}.about-copy p{margin:0}.career{margin:0;padding:0;list-style:none}.career li{position:relative;padding:0 0 2.4rem 2rem;display:grid;grid-template-columns:180px minmax(0,1fr);gap:2rem}.career li:before{content:'';position:absolute;left:4px;top:12px;bottom:-12px;width:1px;background:var(--accent-border)}.career li:last-child:before{display:none}.career>li>i{position:absolute;left:0;top:8px;width:9px;height:9px;border:2px solid var(--accent-core);border-radius:50%;background:var(--bg-base)}.career time{color:var(--text-subtle);font:.73rem var(--font-code)}.career-title{display:flex;flex-wrap:wrap;align-items:center;gap:.7rem}.career-title h3{margin:0;font-size:1.05rem}.career-title span{padding:.16rem .45rem;border-radius:999px;background:var(--accent-dim);color:var(--accent-cyan);font:.65rem var(--font-code)}.career .company{margin:.18rem 0 .45rem;color:var(--accent-core);font-weight:700}.career li>div>p:last-child{max-width:76ch;margin:0;color:var(--text-muted);font-size:.92rem}.skills{display:grid;grid-template-columns:repeat(6,1fr);gap:1rem}.skills article{grid-column:span 2;padding:1.5rem;border-top:2px solid var(--accent-core);background:var(--bg-surface)}.skills article:nth-child(4),.skills article:nth-child(5){grid-column:span 3}.skills article>span{color:var(--accent-soft);font:700 .75rem var(--font-code)}.skills h3{margin:1.5rem 0 .5rem}.skills p{margin:0;color:var(--text-muted)}
.compact-area{max-width:1240px;display:grid;grid-template-columns:1fr 1fr;gap:4rem}.compact-list{margin:0;padding:0;list-style:none}.compact-list li{padding:.85rem 0;border-bottom:1px solid var(--accent-border);display:flex;justify-content:space-between;gap:1rem}.compact-list strong,.compact-list span{display:block}.compact-list strong{font:650 .86rem var(--font-ui)}.compact-list span,.compact-list time{color:var(--text-subtle);font-size:.72rem}.compact-list time{flex:0 0 auto;font-family:var(--font-code)}.machine{margin-block:4rem;padding:clamp(2rem,5vw,4rem);border:1px solid var(--accent-border);border-radius:18px;display:grid;grid-template-columns:1fr 1fr;gap:4rem;background:var(--bg-surface)}.machine h2{margin:0 0 1rem;font-size:clamp(1.8rem,3vw,2.7rem)}.machine p{max-width:57ch;margin:0;color:var(--text-muted)}.machine ul{margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:.7rem;list-style:none}.machine li{padding:.65rem .8rem;border-left:2px solid var(--accent-core);background:var(--bg-surface-raised);font:.74rem var(--font-code)}.contact{max-width:1180px;margin:5rem auto 0;padding:clamp(4rem,9vw,8rem) 1.5rem;text-align:center}.contact>p:not(.eyebrow){max-width:56ch;margin:1.2rem auto 0;color:var(--text-muted)}.contact .actions{justify-content:center}
@media(max-width:900px){.hero{min-height:auto;grid-template-columns:1fr;padding-top:5rem}.system-visual{max-width:540px;margin:auto}.about{grid-template-columns:1fr;gap:1rem}.skills article{grid-column:span 3}.skills article:last-child{grid-column:1/-1}.compact-area{gap:2rem}}@media(max-width:700px){.section-heading,.compact-area,.machine{grid-template-columns:1fr;gap:1.25rem}.projects-layout{grid-template-columns:1fr}.project-card.lead{grid-column:auto;display:block}.career li{grid-template-columns:1fr;gap:.4rem}.skills{grid-template-columns:1fr}.skills article,.skills article:nth-child(4),.skills article:nth-child(5),.skills article:last-child{grid-column:auto}}@media(max-width:430px){.hero,.section,.contact{padding-left:1rem;padding-right:1rem}.hero h1{font-size:clamp(2.55rem,13vw,3.25rem)}.actions .button{width:100%}.system-visual{margin-inline:-1rem}.project-meta{display:block}.project-meta time,.compact-list time{display:block;margin-top:.35rem}.compact-list li{display:block}.machine ul{grid-template-columns:1fr}}@media print{.system-visual,.actions,.resume-links{display:none}.hero{min-height:0}}
</style>
