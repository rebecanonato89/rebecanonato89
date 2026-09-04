<template>
  <main id="main-content">
    <section id="inicio" class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">{{ copy.hero.eyebrow }}</p>
        <h1 id="hero-title">{{ copy.hero.headline }}<br><span>{{ copy.hero.headlineAccent }}</span></h1>
        <p class="hero-name">{{ copy.hero.nameRole }}</p>
        <p class="hero-subheadline">{{ copy.hero.focus }}</p>
        <p class="hero-stack" :aria-label="copy.hero.stack">{{ copy.hero.stack }}</p>
        <div class="tech-strip" :aria-label="copy.hero.techLabel"><span v-for="technology in technologyLogos" :key="technology.name" class="tech-logo-item"><img :src="technology.src" :alt="technology.name" :class="{ 'tech-logo--mono': technology.mono }" loading="eager"/> <span>{{ technology.name }}</span></span></div>
        <div class="actions" :aria-label="copy.hero.projects">
          <a href="#projetos" class="button primary">{{ copy.hero.projects }}</a>
          <a href="https://github.com/rebecanonato89" target="_blank" rel="noopener noreferrer" class="button"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.1-1.45-1.1-1.45-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 7.35c.85 0 1.7.11 2.49.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>GitHub<span class="sr-only"> ({{ copy.a11y.external }})</span></a>
          <a href="https://www.linkedin.com/in/rebecanonato89/" target="_blank" rel="noopener noreferrer" class="button"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5.2 3.5a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM3.4 9h3.6v11.5H3.4V9Zm5.8 0h3.4v1.57h.05c.47-.9 1.62-1.85 3.34-1.85 3.57 0 4.23 2.35 4.23 5.4v6.38h-3.55v-5.66c0-1.35-.03-3.08-1.88-3.08s-2.17 1.47-2.17 2.98v5.76H9.2V9Z"/></svg>LinkedIn<span class="sr-only"> ({{ copy.a11y.external }})</span></a>
          <a :href="`mailto:${basicsData.email}`" class="button">{{ copy.hero.contact }}</a>
        </div>
        <div class="resume-links" :aria-label="copy.footer.formats"><span>{{ copy.hero.resume }}</span><a href="/rebeca-nonato-curriculo.pdf" download>{{ copy.hero.pdf }}</a><a href="/resume.md" download>{{ copy.hero.markdown }}</a><a href="/resume.json">{{ copy.hero.json }}</a><button type="button" @click="printResume">{{ copy.hero.print }}</button></div>
      </div>
      <div class="system-visual" aria-hidden="true">
        <svg viewBox="0 0 620 470"><defs><linearGradient id="flow" x1="0" x2="1"><stop offset="0" stop-color="var(--accent-core)"/><stop offset="1" stop-color="var(--accent-cyan)"/></linearGradient></defs><g fill="none" stroke="url(#flow)" stroke-width="2"><path d="M92 105H242C278 105 278 190 314 190H475"/><path d="M92 344H220C266 344 266 265 312 265H520"/><path d="M314 190V265"/></g><g class="nodes"><rect x="42" y="70" width="110" height="70" rx="14"/><rect x="252" y="155" width="124" height="70" rx="14"/><rect x="250" y="230" width="128" height="70" rx="14"/><rect x="440" y="155" width="132" height="70" rx="14"/><rect x="458" y="309" width="114" height="70" rx="14"/></g><g class="labels" text-anchor="middle"><text x="97" y="111">REQUEST</text><text x="314" y="196">EVENT</text><text x="314" y="271">QUEUE</text><text x="506" y="196">CONSUMER</text><text x="515" y="350">STORE</text></g><g class="dots"><circle cx="202" cy="105" r="5"/><circle cx="411" cy="190" r="5"/><circle cx="184" cy="344" r="5"/><circle cx="415" cy="265" r="5"/></g></svg>
        <p><span></span> {{ copy.hero.diagramNote }}</p>
      </div>
    </section>

    <section id="projetos" class="section projects" aria-labelledby="projetos-title">
      <header class="section-heading"><div><p class="eyebrow">{{ copy.sections.selectedEyebrow }}</p><h2 id="projetos-title">{{ copy.sections.projectsTitle }}</h2></div><p>{{ copy.sections.projectsIntro }}</p></header>
      <div class="projects-layout">
        <article v-for="(project, index) in featuredProjects" :key="project.title" class="project-card" :class="{ lead: index === 0, closing: index === featuredProjects.length - 1 }">
          <div class="project-index" aria-hidden="true">0{{ index + 1 }}</div>
          <div class="project-content">
            <div class="project-meta"><span>{{ projectContext(project.title) }}</span><time>{{ project.period }}</time></div>
            <h3>{{ shortTitle(project.title) }}</h3>
            <div class="project-description" v-html="localizedDescription(project)"></div>
            <div v-if="projectFlow(project.title)" class="mini-flow" :aria-label="`${copy.flowLabel} ${shortTitle(project.title)}`"><template v-for="(step, i) in projectFlow(project.title)" :key="step"><span>{{ step }}</span><i v-if="i < projectFlow(project.title).length - 1" aria-hidden="true">→</i></template></div>
            <ul class="tech-list" :aria-label="copy.stackLabel"><li v-for="tech in project.stack" :key="tech">{{ tech }}</li></ul>
            <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="project-link">{{ copy.projectLink }} ↗<span class="sr-only"> ({{ copy.a11y.external }})</span></a>
          </div>
        </article>
      </div>
    </section>

    <section id="sobre" class="section about" aria-labelledby="sobre-title"><div class="section-heading compact"><p class="eyebrow">{{ copy.sections.profileEyebrow }}</p><h2 id="sobre-title">{{ copy.sections.aboutTitle }}</h2></div><div class="about-copy"><p>{{ copy.about[0] }}</p><p>{{ copy.about[1] }}</p></div></section>

    <section id="experiencia" class="section surface-alt" aria-labelledby="experiencia-title">
      <header class="section-heading"><div><p class="eyebrow">{{ copy.sections.experienceEyebrow }}</p><h2 id="experiencia-title">{{ copy.sections.experienceTitle }}</h2></div><p>{{ copy.sections.experienceIntro }}</p></header>
      <ol class="career"><li v-for="job in experienceData" :key="job.role + job.company + job.period"><i aria-hidden="true"></i><time>{{ job.period }}</time><div><div class="career-title"><h3>{{ job.role }}</h3><span v-if="job.evolution">{{ job.evolution }}</span></div><p class="company">{{ job.company }}</p><p>{{ localizedExperience(job) }}</p></div></li></ol>
    </section>

    <section id="skills" class="section" aria-labelledby="skills-title">
      <header class="section-heading"><div><p class="eyebrow">{{ copy.sections.capabilitiesEyebrow }}</p><h2 id="skills-title">{{ copy.sections.capabilitiesTitle }}</h2></div><p>{{ copy.sections.capabilitiesIntro }}</p></header>
      <div class="skills"><article v-for="group in domainSkills" :key="group.category"><span aria-hidden="true">{{ group.number }}</span><span class="skill-symbol" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16M7 4v4M17 10v4M10 16v4"/></svg></span><h3>{{ group.category }}</h3><div v-if="skillLogos(group.category).length" class="skill-logos"><img v-for="technology in skillLogos(group.category)" :key="technology.name" :src="technology.src" :alt="technology.name" :class="{ 'tech-logo--mono': technology.mono }" loading="lazy"/></div><p>{{ group.primary }}</p><ul class="tech-list" :aria-label="group.category"><li v-for="item in group.items" :key="item">{{ item }}</li></ul></article></div>
    </section>

    <section class="section compact-area surface-alt" aria-label="Formação e publicações">
      <div id="certificacoes"><div class="section-heading compact"><p class="eyebrow">{{ copy.sections.learningEyebrow }}</p><h2>{{ copy.sections.educationTitle }}</h2></div><ul class="compact-list"><li v-for="edu in educationData" :key="edu.role + edu.company"><div><strong>{{ edu.role }}</strong><span>{{ edu.company }}</span></div><time>{{ edu.period }}</time></li></ul></div>
      <div id="publicacoes"><div class="section-heading compact"><p class="eyebrow">{{ copy.sections.writingEyebrow }}</p><h2>{{ copy.sections.publicationsTitle }}</h2></div><ul class="compact-list"><li v-for="pub in publicationsData" :key="pub.title"><div><strong>{{ pub.title }}</strong><span>{{ pub.venue }}</span></div><time>{{ pub.period }}</time></li></ul></div>
    </section>

    <section class="section machine" aria-labelledby="machine-title"><div><p class="eyebrow">{{ copy.sections.underEyebrow }}</p><h2 id="machine-title">{{ copy.sections.machineTitle }}</h2><p>{{ copy.sections.machineText }}</p></div><ul :aria-label="copy.sections.machineTitle"><li v-for="item in copy.machineItems" :key="item">{{ item }}</li></ul></section>

    <section id="contato" class="contact" aria-labelledby="contato-title"><p class="eyebrow">{{ copy.sections.contactEyebrow }}</p><h2 id="contato-title">{{ copy.sections.contactTitle }}</h2><p>{{ copy.contactIntro }}</p><div class="actions"><a v-for="channel in contactData.channels" :key="channel.label" :href="channel.url" :target="channel.url.startsWith('http') ? '_blank' : null" :rel="channel.url.startsWith('http') ? 'noopener noreferrer' : null" class="button primary">{{ channel.label }}<span v-if="channel.url.startsWith('http')" class="sr-only"> ({{ copy.a11y.external }})</span></a></div></section>
  </main>
</template>

<script>
import { basicsData, aboutData, experienceData, educationData, publicationsData, projectsData, contactData } from '../data/profileData.js';
import { LOCALES, getLocale } from '../i18n/index.js';
const FEATURED = ['ClinicFiapApp - Microsserviços de Agendamento Hospitalar','Food Fiapp: API de Gestão de Restaurantes','Hedge CLI: Análise Estática + IA para Eager Test','Quotes Service: Cotação e Emissão de Apólices','TechChallenge: API de Gestão de Usuários','Kube Backend: API Node.js + PostgreSQL no Kubernetes'];
const CONTEXT = { ClinicFiapApp: 'Projeto acadêmico colaborativo', Food: 'Projeto acadêmico', Hedge: 'Independent Software Engineering Research', Quotes: 'Projeto pessoal · MVP', TechChallenge: 'Projeto acadêmico', Kube: 'Laboratório de infraestrutura' };
const FLOWS = { ClinicFiapApp: ['API','Command','Kafka','Consumer','Outbox','Database'], Food: ['HTTP','Use Case','Domain','Adapter'], Hedge: ['Java tests','AST','Heuristics','LLM gate','Ensemble'], Quotes: ['Quote','Domain rules','Event','Coroutine'], Kube: ['Application','Docker','Kubernetes','PostgreSQL'] };
export default {
  name: 'Home', data() { return { basicsData, aboutData, experienceData, educationData, publicationsData, projectsData, contactData, locale: getLocale(this.$route.params.locale || (typeof window !== 'undefined' ? localStorage.getItem('rn-locale') : null)), technologyLogos: [{ name: 'Kotlin', src: '/tech-icons/kotlin.svg' }, { name: 'Java', src: '/tech-icons/java.svg', mono: true }, { name: 'Node.js', src: '/tech-icons/nodejs.svg' }, { name: 'AWS', src: '/tech-icons/aws.svg' }, { name: 'Kafka', src: '/tech-icons/kafka.svg', mono: true }] }; },
  watch: { '$route'(route) { this.locale = getLocale(route.params.locale || localStorage.getItem('rn-locale')); } },
  computed: {
    featuredProjects() { return FEATURED.map(title => this.projectsData.find(project => project.title === title)).filter(Boolean); },
    copy() { return LOCALES[this.locale]; },
    domainSkills() { return this.copy.domains; },
  },
  methods: {
    shortTitle(title) { return title.split(/:| - /)[0]; },
    projectContext(title) { const key = Object.keys(CONTEXT).find(item => title.startsWith(item)); return this.copy.contexts[key] || this.copy.contexts.default; },
    projectFlow(title) { const key = Object.keys(FLOWS).find(item => title.startsWith(item)); return FLOWS[key] || null; },
    localizedDescription(project) { const key = Object.keys(this.copy.projectDescriptions).find(item => project.title.startsWith(item)); return this.copy.projectDescriptions[key] || project.description; },
    localizedExperience(job) { const role = job.role; const key = role.includes('Specialist') ? 'AccentureSpecialist' : role.includes('Senior Analyst') ? 'AccentureSenior' : role.includes('Alice') ? 'Alice' : role.includes('Vetta') ? 'Vetta' : role.includes('FUNDECC') ? 'FUNDECC' : role === 'Analista de Sistemas' ? 'AccentureLegacy' : role.includes('Professora') ? 'UFLA' : null; return this.copy.experienceIntro[key] || job.description; },
    skillLogos(category) { if (category === 'Backend') return this.technologyLogos.slice(0, 3); if (category === 'Distributed Systems') return [this.technologyLogos[4]]; if (category === 'Cloud & Reliability') return [this.technologyLogos[3]]; return []; },
    printResume() { window.print(); },
  },
};
</script>

<style scoped>
main{overflow:hidden}.hero{max-width:1240px;min-height:620px;margin:auto;padding:clamp(3.75rem,7vw,6.5rem) 1.5rem 4rem;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(340px,.8fr);gap:3rem;align-items:center}.eyebrow{margin:0 0 1rem;color:var(--accent-cyan);font:700 .76rem var(--font-code);letter-spacing:.14em;text-transform:uppercase}.hero h1{max-width:800px;margin:0;font-size:clamp(2.8rem,5.5vw,5.05rem);line-height:.98;letter-spacing:-.065em}.hero h1 span{color:var(--text-muted)}.hero-name{margin:1.5rem 0 .45rem;font-family:var(--font-ui);font-weight:650}.hero-name span{margin:0 .5rem;color:var(--accent-core)}.hero-subheadline,.hero-stack{margin:.3rem 0;color:var(--text-muted)}.hero-stack{font:.88rem var(--font-code)}.actions{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:1.5rem}.button{min-height:44px;padding:.68rem 1rem;border:1px solid var(--accent-border);border-radius:8px;display:inline-flex;align-items:center;justify-content:center;color:var(--text-main);font:650 .88rem var(--font-ui);text-decoration:none;transition:.2s}.button:hover{border-color:var(--accent-core);background:var(--accent-dim);color:var(--text-main);transform:translateY(-2px)}.button.primary{border-color:var(--accent-core);background:var(--accent-core);color:var(--button-text)}.button.primary:hover{background:var(--accent-hover);color:var(--button-text)}.resume-links{display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1rem;color:var(--text-subtle);font:.75rem var(--font-code)}.resume-links a,.resume-links button{padding:0;border:0;background:none;color:var(--text-muted);font:inherit;text-decoration:underline;text-underline-offset:3px;cursor:pointer}.system-visual{position:relative}.system-visual:before{content:'';position:absolute;inset:12% 8%;background:radial-gradient(circle,var(--accent-glow),transparent 66%);filter:blur(24px)}.system-visual svg{position:relative;width:100%;height:auto}.nodes rect{fill:var(--bg-surface-raised);stroke:var(--accent-border);stroke-width:2}.labels{fill:var(--text-muted);font:700 12px var(--font-code);letter-spacing:.08em}.dots{fill:var(--accent-cyan)}.system-visual p{margin:-1rem 0 0;color:var(--text-subtle);font:.7rem var(--font-code);text-align:center}.system-visual p span{width:7px;height:7px;margin-right:.45rem;border-radius:50%;display:inline-block;background:var(--status-ok)}
.section{max-width:1180px;margin:auto;padding:clamp(3.5rem,6vw,5.25rem) 1.5rem}.section-heading{margin-bottom:2.5rem;display:grid;grid-template-columns:1.1fr .9fr;gap:2rem;align-items:end}.section-heading h2,.contact h2{margin:0;font-size:clamp(2.1rem,4vw,3.6rem);letter-spacing:-.045em}.section-heading>p{max-width:48ch;margin:0;color:var(--text-muted)}.section-heading.compact{display:block}.projects{max-width:1240px}.projects-layout{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.project-card{min-width:0;position:relative;padding:clamp(1.5rem,3vw,2.3rem);border:1px solid var(--accent-border);border-radius:18px;background:linear-gradient(145deg,var(--bg-surface-raised),var(--bg-surface));overflow:hidden}.project-card.lead{grid-column:1/-1;display:grid;grid-template-columns:100px minmax(0,1fr)}.project-index{color:var(--accent-soft);font:700 clamp(2rem,4vw,4rem) var(--font-code)}.project-content{min-width:0}.project-meta{display:flex;flex-wrap:wrap;justify-content:space-between;gap:.5rem 1rem;color:var(--text-subtle);font:.7rem var(--font-code);letter-spacing:.06em;text-transform:uppercase}.project-meta span{color:var(--accent-cyan)}.project-card h3{margin:.8rem 0 1.25rem;font-size:clamp(1.5rem,2.5vw,2.2rem)}.project-description{color:var(--text-muted)}.project-description :deep(p),.project-description :deep(ul){margin:0 0 .7rem}.project-description :deep(ul){padding-left:1.2rem!important}.mini-flow{margin:1.5rem 0;padding:.8rem;display:flex;flex-wrap:wrap;align-items:center;gap:.4rem;border:1px solid var(--accent-border);border-radius:10px;background:var(--code-bg);font:650 .64rem var(--font-code)}.mini-flow span{padding:.3rem .45rem;border-radius:5px;background:var(--accent-dim);white-space:nowrap}.mini-flow i{color:var(--accent-cyan);font-style:normal}.tech-list{margin:1.25rem 0;padding:0;display:flex;flex-wrap:wrap;gap:.45rem;list-style:none}.tech-list li{max-width:100%;padding:.3rem .58rem;border:1px solid var(--accent-border);border-radius:999px;color:var(--text-muted);font:.7rem var(--font-code);overflow-wrap:anywhere}.project-link{font:700 .82rem var(--font-ui);text-decoration:none}
.about{display:grid;grid-template-columns:.8fr 1.2fr;gap:5rem}.about-copy{display:grid;gap:1.2rem;color:var(--text-muted);font-size:1.08rem}.about-copy p{margin:0}.career{margin:0;padding:0;list-style:none}.career li{position:relative;padding:0 0 2.4rem 2rem;display:grid;grid-template-columns:180px minmax(0,1fr);gap:2rem}.career li:before{content:'';position:absolute;left:4px;top:12px;bottom:-12px;width:1px;background:var(--accent-border)}.career li:last-child:before{display:none}.career>li>i{position:absolute;left:0;top:8px;width:9px;height:9px;border:2px solid var(--accent-core);border-radius:50%;background:var(--bg-base)}.career time{color:var(--text-subtle);font:.73rem var(--font-code)}.career-title{display:flex;flex-wrap:wrap;align-items:center;gap:.7rem}.career-title h3{margin:0;font-size:1.05rem}.career-title span{padding:.16rem .45rem;border-radius:999px;background:var(--accent-dim);color:var(--accent-cyan);font:.65rem var(--font-code)}.career .company{margin:.18rem 0 .45rem;color:var(--accent-core);font-weight:700}.career li>div>p:last-child{max-width:76ch;margin:0;color:var(--text-muted);font-size:.92rem}.skills{display:grid;grid-template-columns:repeat(6,1fr);gap:1rem}.skills article{grid-column:span 2;padding:1.5rem;border-top:2px solid var(--accent-core);background:var(--bg-surface)}.skills article:nth-child(4),.skills article:nth-child(5){grid-column:span 3}.skills article>span{color:var(--accent-soft);font:700 .75rem var(--font-code)}.skills h3{margin:1.5rem 0 .5rem}.skills p{margin:0;color:var(--text-muted)}
.compact-area{max-width:1240px;display:grid;grid-template-columns:1fr 1fr;gap:4rem}.compact-list{margin:0;padding:0;list-style:none}.compact-list li{padding:.85rem 0;border-bottom:1px solid var(--accent-border);display:flex;justify-content:space-between;gap:1rem}.compact-list strong,.compact-list span{display:block}.compact-list strong{font:650 .86rem var(--font-ui)}.compact-list span,.compact-list time{color:var(--text-subtle);font-size:.72rem}.compact-list time{flex:0 0 auto;font-family:var(--font-code)}.machine{margin-block:2.5rem;padding:clamp(2rem,4vw,3rem);border:1px solid var(--accent-border);border-radius:18px;display:grid;grid-template-columns:1fr 1fr;gap:3rem;background:var(--bg-surface)}.machine h2{margin:0 0 1rem;font-size:clamp(1.8rem,3vw,2.7rem)}.machine p{max-width:57ch;margin:0;color:var(--text-muted)}.machine ul{margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:.7rem;list-style:none}.machine li{padding:.65rem .8rem;border-left:2px solid var(--accent-core);background:var(--bg-surface-raised);font:.74rem var(--font-code)}.contact{max-width:1180px;margin:3.5rem auto 0;padding:clamp(3.5rem,7vw,6rem) 1.5rem;text-align:center}.contact>p:not(.eyebrow){max-width:56ch;margin:1.2rem auto 0;color:var(--text-muted)}.contact .actions{justify-content:center}
@media(max-width:900px){.hero{min-height:auto;grid-template-columns:1fr;padding-top:4rem}.system-visual{max-width:540px;margin:auto}.about{grid-template-columns:1fr;gap:1rem}.skills article{grid-column:span 3}.skills article:last-child{grid-column:1/-1}.compact-area{gap:2rem}.mini-flow i{display:none}.mini-flow span{flex:1 1 90px;text-align:center}}@media(max-width:700px){.section-heading,.compact-area,.machine{grid-template-columns:1fr;gap:1.25rem}.projects-layout{grid-template-columns:1fr}.project-card.lead{grid-column:auto;display:block}.career li{grid-template-columns:1fr;gap:.4rem}.skills{grid-template-columns:1fr}.skills article,.skills article:nth-child(4),.skills article:nth-child(5),.skills article:last-child{grid-column:auto}}@media(max-width:430px){.hero,.section,.contact{padding-left:1rem;padding-right:1rem}.hero h1{font-size:clamp(2.4rem,12vw,3rem)}.actions .button{width:100%}.system-visual{margin-inline:-1rem}.project-meta{display:block}.project-meta time,.compact-list time{display:block;margin-top:.35rem}.compact-list li{display:block}.machine ul{grid-template-columns:1fr}.mini-flow span{flex-basis:100%}}@media print{.system-visual,.actions,.resume-links{display:none}.hero{min-height:0}}

/* Wide editorial layout and subtle section rhythm. */
main{max-width:none;margin:0;padding:0}
.hero{width:calc(100% - 96px);max-width:1480px;padding-inline:0;grid-template-columns:minmax(0,1.15fr) minmax(380px,.85fr);gap:clamp(3rem,6vw,6rem)}
.hero .actions{flex-wrap:nowrap}
.section{width:calc(100% - 96px);max-width:1400px;padding:clamp(3.1rem,4.5vw,4.5rem) 0}
.projects,.surface-alt{background:var(--bg-alternate);box-shadow:0 0 0 100vmax var(--bg-alternate);clip-path:inset(0 -100vmax)}
.projects,.compact-area{max-width:1480px}
.project-card.lead,.project-card.closing{grid-column:1/-1;display:grid;grid-template-columns:100px minmax(0,1fr)}
.project-description{max-width:78ch}
.mini-flow{display:flex;flex-wrap:wrap;overflow:visible}
.mini-flow span{min-width:0;flex:1 1 76px;white-space:normal;text-align:center}
.mini-flow i{flex:0 0 auto;text-align:center}
.contact{width:calc(100% - 96px);max-width:1480px;border-radius:20px;background:var(--bg-alternate)}
.machine{padding-inline:clamp(2.5rem,6vw,6rem)}
@media(max-width:1366px){.hero,.section,.contact{width:calc(100% - 64px)}.hero{gap:3rem}.hero h1{font-size:clamp(2.8rem,5.25vw,4.65rem)}}
@media(max-width:1024px){.hero,.section,.contact{width:calc(100% - 40px)}.hero{grid-template-columns:minmax(0,1.15fr) minmax(300px,.85fr);gap:2rem}.hero .button{padding-inline:.8rem}.site-header-inner,.site-footer-inner,.footer-note{width:calc(100% - 40px)}}
@media(max-width:900px){.hero{grid-template-columns:1fr}.hero .actions{flex-wrap:wrap}.project-card.closing{display:block}.mini-flow{grid-template-columns:repeat(2,minmax(0,1fr))}.mini-flow i{display:none}}
@media(max-width:700px){.hero,.section,.contact{width:calc(100% - 32px)}.project-card.lead{display:block}.site-header-inner,.site-footer-inner,.footer-note{width:calc(100% - 32px)}}
@media(max-width:430px){.hero,.section,.contact{padding-left:0;padding-right:0}.mini-flow{grid-template-columns:1fr}.system-visual{margin-inline:0}}
.tech-strip{display:flex;flex-wrap:wrap;gap:1rem 1.2rem;margin-top:1.25rem;color:var(--text-muted);font:600 .7rem var(--font-code)}
.tech-logo-item{display:inline-flex;align-items:center;gap:.4rem}
.tech-logo-item img{width:18px;height:18px;object-fit:contain}
.skill-logos{display:flex;gap:.65rem;margin:1rem 0 .7rem;min-height:24px}
.skill-logos img{width:22px;height:22px;object-fit:contain}
.button svg{width:1rem;height:1rem;fill:currentColor;flex:0 0 auto;margin-right:.45rem}.skill-symbol{display:block;width:30px;height:30px;margin:1rem 0 .2rem;color:var(--accent-cyan)}.skill-symbol svg{width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}.skills article:nth-child(3) .skill-symbol{color:var(--accent-core)}.skills article:nth-child(4) .skill-symbol{color:var(--accent-cyan)}.skills article:nth-child(5) .skill-symbol{color:var(--accent-core)}
:global(.back-to-top){position:fixed;right:clamp(1rem,3vw,2rem);bottom:clamp(1rem,3vw,2rem);z-index:20;width:2.75rem;height:2.75rem;border:1px solid var(--accent-border);border-radius:999px;background:var(--bg-surface-raised);color:var(--text-main);font-size:1.3rem;line-height:1;box-shadow:0 8px 24px var(--card-shadow);cursor:pointer;transition:background .2s,border-color .2s,transform .2s}.back-to-top:hover{border-color:var(--accent-core);background:var(--accent-dim);transform:translateY(-2px)}
:global(:root[data-theme='dark']) .tech-logo--mono{filter:invert(1)}
@media(max-width:700px){.tech-strip{gap:.7rem .9rem}.tech-logo-item img{width:16px;height:16px}}
</style>
