<template>
  <div class="term hud-card" @click="focusInput">
    <div class="term-titlebar" aria-hidden="true">
      <span class="term-dot term-dot--red"></span>
      <span class="term-dot term-dot--yellow"></span>
      <span class="term-dot term-dot--green"></span>
      <span class="term-titlebar-text">rebeca@nonato.dev — bash</span>
    </div>

    <div class="term-screen" ref="screen" aria-live="polite">
      <div v-for="(line, index) in lines" :key="index" class="term-line" :class="'term-line--' + line.type">
        <template v-if="line.type === 'input'"><span class="term-prompt">{{ prompt }}</span> {{ line.text }}</template>
        <template v-else>{{ line.text }}</template>
      </div>
      <form class="term-input-row" @submit.prevent="run">
        <label class="term-prompt" for="term-input">{{ prompt }}</label>
        <input
          id="term-input"
          ref="input"
          v-model="command"
          type="text"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          aria-label="Terminal interativo: digite help para ver os comandos"
          placeholder="digite 'help' e pressione Enter"
        />
      </form>
    </div>
  </div>
</template>

<script>
// Terminal interativo da home: um jeito diferente de navegar pelo portfólio.
// Comandos de navegação usam o router; o restante imprime respostas na tela.
export default {
  name: 'HeroTerminal',
  data() {
    return {
      prompt: 'visitante@rebeca.dev:~$',
      command: '',
      lines: [
        { type: 'system', text: '// SISTEMA ONLINE — portfólio v3.0 carregado' },
        { type: 'system', text: '// Engenheira de Software · Backend · Sistemas Distribuídos · Cloud' },
        { type: 'output', text: "Digite 'help' para listar os comandos disponíveis." },
      ],
    };
  },
  methods: {
    focusInput() {
      // Só rouba o foco em clique direto; seleção de texto continua funcionando
      if (!window.getSelection().toString()) this.$refs.input.focus();
    },
    print(text, type = 'output') {
      this.lines.push({ type, text });
    },
    scrollDown() {
      this.$nextTick(() => {
        const screen = this.$refs.screen;
        if (screen) screen.scrollTop = screen.scrollHeight;
      });
    },
    run() {
      const raw = this.command.trim();
      this.command = '';
      if (!raw) return;
      this.print(raw, 'input');

      const cmd = raw.toLowerCase();
      const commands = {
        help: () => {
          this.print('Comandos disponíveis:');
          this.print('  sobre      → quem sou eu');
          this.print('  projetos   → deployments e cases');
          this.print('  arcade     → jogos no browser (go, damas, memoria)');
          this.print('  recursos   → biblioteca de livros, ferramentas e cursos');
          this.print('  servicos   → contrate sites, sistemas e automações');
          this.print('  contato    → canais de contato');
          this.print('  go | damas | memoria → abre o jogo direto');
          this.print('  github | linkedin    → abre em nova aba');
          this.print('  whoami | clear');
        },
        sobre: () => this.goToSection('about', 'Abrindo parâmetros do sistema…'),
        projetos: () => this.goToSection('projects', 'Listando deployments…'),
        contato: () => this.goToSection('contact', 'Estabelecendo conexão…'),
        arcade: () => this.goToRoute('/arcade', 'Iniciando arcade…'),
        recursos: () => this.goToRoute('/recursos', 'Abrindo biblioteca de recursos…'),
        servicos: () => this.goToRoute('/servicos', 'Abrindo página de serviços…'),
        go: () => this.goToRoute('/go', 'Carregando tabuleiro de Go…'),
        damas: () => this.goToRoute('/damas', 'Carregando tabuleiro de Damas…'),
        memoria: () => this.goToRoute('/memoria', 'Embaralhando cartas…'),
        github: () => this.openExternal('https://github.com/rebecanonato89'),
        linkedin: () => this.openExternal('https://www.linkedin.com/in/rebecanonato89/'),
        whoami: () => {
          this.print('Rebeca Nonato — Engenheira de Software (+7 anos).');
          this.print('Backend, sistemas distribuídos, AWS, Kafka, Clean Architecture.');
          this.print('Também: professora universitária no passado, gamer de tabuleiro no presente.');
        },
        clear: () => { this.lines = []; },
        sudo: () => this.print('visitante is not in the sudoers file. This incident will be reported. 😄'),
        ls: () => this.print('sobre/  projetos/  arcade/  recursos/  servicos/  contato/'),
        pwd: () => this.print('/home/rebeca/portfolio'),
      };

      const action = commands[cmd] || commands[cmd.replace(/^\.\//, '')];
      if (action) {
        action();
      } else {
        this.print(`bash: ${raw}: comando não encontrado. Digite 'help'.`, 'error');
      }
      this.scrollDown();
    },
    goToSection(id, feedback) {
      this.print(feedback);
      if (this.$route.path !== '/') {
        this.$router.push('/').then(() => this.scrollTo(id));
      } else {
        this.scrollTo(id);
      }
    },
    scrollTo(id) {
      this.$nextTick(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    },
    goToRoute(path, feedback) {
      this.print(feedback);
      setTimeout(() => this.$router.push(path), 400);
    },
    openExternal(url) {
      this.print(`Abrindo ${url} em nova aba…`);
      window.open(url, '_blank', 'noopener,noreferrer');
    },
  },
};
</script>

<style scoped>
.term {
  padding: 0;
  overflow: hidden;
  margin-bottom: var(--space-xl);
  cursor: text;
}
.term-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px var(--space-md);
  border-bottom: 1px solid var(--accent-border);
  background: var(--accent-dim);
}
.term-dot {
  width: 12px; height: 12px; border-radius: 50%;
}
.term-dot--red { background: #ff5f57; }
.term-dot--yellow { background: #febc2e; }
.term-dot--green { background: #28c840; }
.term-titlebar-text {
  margin-left: var(--space-sm);
  font-family: var(--font-code);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.term-screen {
  padding: var(--space-md) var(--space-lg);
  font-family: var(--font-code);
  font-size: 0.85rem;
  line-height: 1.7;
  max-height: 300px;
  overflow-y: auto;
}
.term-line { white-space: pre-wrap; word-break: break-word; color: var(--text-main); }
.term-line--system { color: var(--accent-core); }
.term-line--input { color: var(--text-main); }
.term-line--error { color: #ff6b6b; }
.high-contrast-mode .term-line--error { color: #ffff00; }

.term-prompt {
  color: var(--accent-core);
  font-weight: 500;
  white-space: nowrap;
}
.term-input-row {
  display: flex;
  gap: 8px;
  align-items: center;
}
.term-input-row input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-main);
  font-family: var(--font-code);
  font-size: 0.85rem;
  caret-color: var(--accent-core);
  min-width: 0;
}
.term-input-row input::placeholder { color: var(--text-muted); opacity: 0.7; }
.term-input-row input:focus-visible { outline: none; box-shadow: none; }

@media (max-width: 768px) {
  .term-screen { max-height: 240px; padding: var(--space-md); }
}
</style>
