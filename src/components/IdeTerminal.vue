<template>
  <div class="ide-terminal-panel">
    <div class="ide-terminal-tabbar">
      <div class="ide-terminal-tab ide-terminal-tab--active">
        <IdeIcon type="terminal" />
        <span>bash</span>
      </div>
      <span class="ide-terminal-tabbar-info">rebeca@nonato.dev — claude</span>
      <button type="button" class="ide-terminal-collapse" aria-label="Recolher terminal" @click="$emit('collapse')">
        <IdeIcon type="chevron" style="transform: rotate(90deg);" />
      </button>
    </div>

    <div class="ide-terminal-screen" ref="screen" @click="focusInput" aria-live="polite">
      <div v-for="(line, index) in lines" :key="index" class="term-line" :class="'term-line--' + line.type">
        <template v-if="line.type === 'input'"><span class="term-prompt">{{ prompt }}</span> {{ line.text }}</template>
        <template v-else>{{ line.text }}</template>
      </div>
      <form class="term-input-row" @submit.prevent="run">
        <label class="term-prompt" for="ide-term-input">{{ prompt }}</label>
        <input
          id="ide-term-input"
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
import IdeIcon from './IdeIcon.vue';

// Painel de terminal fixado na base da IDE: simula uma sessão bash com o
// Claude Code já em execução. Comandos de navegação usam o router; o resto
// só imprime respostas na tela — um jeito diferente de navegar pelo portfólio.
export default {
  name: 'IdeTerminal',
  components: { IdeIcon },
  emits: ['collapse'],
  data() {
    return {
      prompt: '❯',
      command: '',
      lines: [
        { type: 'system', text: '$ claude' },
        { type: 'system', text: '✻ Claude Code — sessão iniciada em ~/rebecanonato89' },
        { type: 'output', text: 'Engenheira de Software · Backend · Sistemas Distribuídos · Cloud' },
        { type: 'output', text: "Digite 'help' para listar os comandos disponíveis." },
      ],
    };
  },
  methods: {
    focusInput() {
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
        this.print(`comando não encontrado: ${raw}. Digite 'help'.`, 'error');
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
.ide-terminal-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #191a21;
  border-top: 1px solid var(--ide-border);
}

.ide-terminal-tabbar {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 10px;
  height: 32px;
  background: #21222c;
  border-bottom: 1px solid #14151b;
  flex-shrink: 0;
}
.ide-terminal-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 100%;
  padding: 0 10px;
  font-family: var(--font-code);
  font-size: 0.78rem;
  color: #8b8fa3;
  border-bottom: 2px solid transparent;
}
.ide-terminal-tab--active {
  color: #f8f8f2;
  border-bottom-color: #bd93f9;
  background: #191a21;
}
.ide-terminal-tabbar-info {
  margin-left: auto;
  font-family: var(--font-code);
  font-size: 0.72rem;
  color: #6272a4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ide-terminal-collapse {
  background: transparent;
  border: none;
  color: #8b8fa3;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  flex-shrink: 0;
}
.ide-terminal-collapse:hover { color: #bd93f9; background: rgba(189,147,249,0.12); }

.ide-terminal-screen {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 10px 16px;
  font-family: var(--font-code);
  font-size: 0.85rem;
  line-height: 1.65;
  cursor: text;
}
.term-line { white-space: pre-wrap; word-break: break-word; color: #f8f8f2; }
.term-line--system { color: #bd93f9; }
.term-line--input { color: #f8f8f2; }
.term-line--error { color: #ff5555; }

.term-prompt {
  color: #50fa7b;
  font-weight: 700;
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
  color: #f8f8f2;
  font-family: var(--font-code);
  font-size: 0.85rem;
  caret-color: #50fa7b;
  min-width: 0;
}
.term-input-row input::placeholder { color: #6272a4; opacity: 0.8; }
.term-input-row input:focus-visible { outline: none; box-shadow: none; }
</style>
