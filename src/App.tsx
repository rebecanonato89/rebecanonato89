import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

type Lang = 'pt' | 'en' | 'zh';
type SectionKey = 'about' | 'stack' | 'projects' | 'diff' | 'contact';

const dict: Record<Lang, Record<string, string>> = {
  pt: {
    welcome: 'Bem-vinda ao meu mapa',
    about: 'Sobre',
    stack: 'Stack',
    projects: 'Projetos',
    differentials: 'Diferenciais',
    contact: 'Contato',
    sound_on: 'Som ligado',
    sound_off: 'Som desligado',
    hide: 'Ocultar',
  },
  en: {
    welcome: 'Welcome to my map',
    about: 'About',
    stack: 'Stack',
    projects: 'Projects',
    differentials: 'Differentials',
    contact: 'Contact',
    sound_on: 'Sound on',
    sound_off: 'Sound off',
    hide: 'Hide',
  },
  zh: {
    welcome: '欢迎来到我的地图',
    about: '关于',
    stack: '技术栈',
    projects: '项目',
    differentials: '优势',
    contact: '联系',
    sound_on: '声音开',
    sound_off: '声音关',
    hide: '隐藏',
  },
};

function t(lang: Lang, key: string) {
  return dict[lang][key] ?? key;
}

// Icons
const icons = {
  user: (
    <svg className="icon" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="11" r="7" stroke="var(--tech-cyan)" strokeWidth="2" />
      <rect x="4" y="22" width="24" height="6" rx="3" stroke="var(--tech-cyan)" strokeWidth="2" />
    </svg>
  ),
  stack: (
    <svg className="icon" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="8" width="24" height="6" rx="3" stroke="var(--tech-cyan)" strokeWidth="2" />
      <rect x="4" y="18" width="24" height="6" rx="3" stroke="var(--tech-cyan)" strokeWidth="2" />
    </svg>
  ),
  project: (
    <svg className="icon" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="6" width="20" height="20" rx="5" stroke="var(--tech-cyan)" strokeWidth="2" />
      <path d="M10 16h12" stroke="var(--tech-cyan)" strokeWidth="2" />
    </svg>
  ),
  diff: (
    <svg className="icon" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke="var(--tech-cyan)" strokeWidth="2" />
      <path d="M10 16h12" stroke="var(--tech-cyan)" strokeWidth="2" />
      <path d="M16 10v12" stroke="var(--tech-cyan)" strokeWidth="2" />
    </svg>
  ),
  contact: (
    <svg className="icon" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="8" width="24" height="16" rx="4" stroke="var(--tech-cyan)" strokeWidth="2" />
      <path d="M4 12l12 8 12-8" stroke="var(--tech-cyan)" strokeWidth="2" />
    </svg>
  ),
  sun: (
    <svg className="icon" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="7" stroke="var(--tech-cyan)" strokeWidth="2" />
      <g stroke="var(--tech-cyan)" strokeWidth="2">
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="16" y1="26" x2="16" y2="30" />
        <line x1="2" y1="16" x2="6" y2="16" />
        <line x1="26" y1="16" x2="30" y2="16" />
      </g>
    </svg>
  ),
  moon: (
    <svg className="icon" viewBox="0 0 32 32" fill="none">
      <path d="M24 16a8 8 0 1 1-8-8c0 4.418 3.582 8 8 8z" stroke="var(--tech-cyan)" strokeWidth="2" />
    </svg>
  ),
  sound: (
    <svg className="icon" viewBox="0 0 32 32" fill="none">
      <rect x="8" y="12" width="6" height="8" rx="2" fill="var(--tech-cyan)" />
      <path d="M18 16c2 0 4 2 4 4" stroke="var(--tech-cyan)" strokeWidth="2" />
    </svg>
  ),
};

type NodeDef = {
  id: SectionKey;
  labelKey: string;
  icon: React.ReactNode;
  pos: { x: number; y: number }; // percentage (0..100)
  links: SectionKey[];
};

const langs: Lang[] = ['pt', 'en', 'zh'];

function useBeep() {
  const ctxRef = useRef<AudioContext | null>(null);

  return () => {
    try {
      if (!ctxRef.current) ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = ctxRef.current!;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = 660;
      g.gain.value = 0.04;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.05);
    } catch {
      // ignore
    }
  };
}

export default function App() {
  const [lang, setLang] = useState<Lang>('pt');
  const [dark, setDark] = useState(false);
  const [sound, setSound] = useState(false);
  const [active, setActive] = useState<SectionKey | null>('about'); // começa em Sobre, mas pode ocultar
  const playBeep = useBeep();

  const bgRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState<{ w: number; h: number }>({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  const nodes: NodeDef[] = useMemo(
    () => [
      { id: 'about', labelKey: 'about', icon: icons.user, pos: { x: 18, y: 34 }, links: ['stack', 'diff'] },
      { id: 'stack', labelKey: 'stack', icon: icons.stack, pos: { x: 28, y: 70 }, links: ['projects', 'diff'] },
      { id: 'projects', labelKey: 'projects', icon: icons.project, pos: { x: 74, y: 30 }, links: ['contact', 'diff'] },
      { id: 'diff', labelKey: 'differentials', icon: icons.diff, pos: { x: 76, y: 72 }, links: ['contact'] },
      { id: 'contact', labelKey: 'contact', icon: icons.contact, pos: { x: 50, y: 86 }, links: [] },
    ],
    []
  );

  // Resize observer
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const cr = entries[0]?.contentRect;
      if (!cr) return;
      setStageSize({ w: cr.width, h: cr.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Dark mode toggle (fix)
  useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  // Background effect
  useEffect(() => {
    const canvas = bgRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let animationId: number;

    function resize() {
      canvas!!.width = window.innerWidth;
      canvas!!.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas!!.width, canvas!!.height);
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
      grad.addColorStop(0, 'rgba(0,234,255,0.25)');
      grad.addColorStop(1, 'rgba(30,144,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas!!.width, canvas!!.height);
      animationId = requestAnimationFrame(draw);
    }
    draw();

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const activeNode = useMemo(() => {
    if (!active) return null;
    return nodes.find(n => n.id === active) ?? null;
  }, [active, nodes]);

  // Camera: if no active, no pan/zoom
  const camera = useMemo(() => {
    if (!activeNode) return { dx: 0, dy: 0, zoom: 1 };
    const cx = stageSize.w / 2;
    const cy = stageSize.h / 2;
    const ax = (activeNode.pos.x / 100) * stageSize.w;
    const ay = (activeNode.pos.y / 100) * stageSize.h;
    const dx = cx - ax;
    const dy = cy - ay;
    const zoom = 1.04;
    return { dx, dy, zoom };
  }, [activeNode, stageSize.h, stageSize.w]);

  function onActivate(id: SectionKey) {
    setActive(id);
    if (sound) playBeep();
  }

  function nodeState(id: SectionKey) {
    return id === active ? 'node active' : 'node inactive';
  }

  function pathBetween(a: NodeDef, b: NodeDef) {
    const x1 = (a.pos.x / 100) * stageSize.w;
    const y1 = (a.pos.y / 100) * stageSize.h;
    const x2 = (b.pos.x / 100) * stageSize.w;
    const y2 = (b.pos.y / 100) * stageSize.h;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const c1x = x1 + dx * 0.35;
    const c1y = y1 + dy * 0.05;
    const c2x = x1 + dx * 0.65;
    const c2y = y1 + dy * 0.95;
    return `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;
  }

  function renderCardContent() {
    if (!active) return null;

    if (active === 'about') {
      return (
        <>
          <h3 className="card-title">{icons.user} {t(lang, 'about')}</h3>
          <p className="card-lead">
            Backend • Arquitetura • Sistemas distribuídos • Consistência • Segurança • Qualidade
          </p>

          {/* Sobre (README) */}
          {lang === 'pt' && (
            <>
              <p className="card-text">
                🚀 Olá! Eu sou a Rebeca, apaixonada por construir sistemas robustos, escaláveis e com propósito. Minha missão é transformar requisitos complexos em soluções elegantes, documentadas e fáceis de manter.
              </p>
              <p className="card-text">
                🧩 Gosto de desafios reais: consistência, segurança, observabilidade, escalabilidade e decisões técnicas transparentes. Aqui você encontra projetos com código aberto, documentação clara e foco em qualidade.
              </p>
            </>
          )}

          {lang === 'en' && (
            <p className="card-text">
              Software engineer focused on backend and architecture. I enjoy systems with real constraints: consistency, security, observability, and scalability. This profile prioritizes projects with clear documentation and explicit technical decisions.
            </p>
          )}

          {lang === 'zh' && (
            <p className="card-text">
              我是一名专注于后端与架构的软件工程师，偏好真实约束下的系统：一致性、安全性、可观测性与可扩展性。该主页重点展示有清晰文档与明确技术决策的项目。
            </p>
          )}
        </>
      );
    }

    if (active === 'stack') {
      return (
        <>
          <h3 className="card-title">{icons.stack} {t(lang, 'stack')}</h3>

          <p className="card-text">
            <b>{lang === 'pt' ? 'Principais' : lang === 'en' ? 'Core' : '核心'}:</b>{' '}
            Kotlin · Java · TypeScript · NestJS · PostgreSQL · Docker · AWS · Git · Linux · React
          </p>

          <p className="card-text">
            <b>{lang === 'pt' ? 'Ferramentas e práticas' : lang === 'en' ? 'Tools & practices' : '工具与实践'}:</b>{' '}
            Clean Architecture · CQRS · Event Sourcing · Testes automatizados · CI/CD · Observabilidade
          </p>

          <div className="card-links">
            <a href="https://skillicons.dev/icons?i=kotlin,java,ts,nestjs,postgres,docker,aws,git,linux,react" target="_blank" rel="noopener noreferrer">
              skillicons (preview)
            </a>
          </div>
        </>
      );
    }

    if (active === 'projects') {
      return (
        <>
          <h3 className="card-title">{icons.project} {t(lang, 'projects')}</h3>

          {/* Sem scroll de página; aqui é conteúdo colapsável */}
          <div className="card-collapsible">
            <details open>
              <summary><b>Hedge CLI</b> — TypeScript, Node.js</summary>
              <div className="card-detail">
                Detector híbrido com gating de LLM. Heurística estática + LLM só quando necessário, otimizando custo vs. precisão.
                <div><a href="https://github.com/rebecanonato89/hedge-cli" target="_blank" rel="noopener noreferrer">Acessar</a></div>
              </div>
            </details>

            <details>
              <summary><b>AllRev</b> — NestJS, PostgreSQL, Docker</summary>
              <div className="card-detail">
                Backend SaaS multi-tenant com RBAC, autenticação e controle de acesso.
                <div><a href="https://github.com/Devs-IO/allrev-backend" target="_blank" rel="noopener noreferrer">Acessar</a></div>
              </div>
            </details>

            <details>
              <summary><b>ClinicFiapApp</b> — Java, Spring, Kafka, Docker</summary>
              <div className="card-detail">
                Microsserviços com Outbox, Kafka, CQRS, resiliência e consistência eventual.
                <div><a href="https://github.com/fiap-tech-challenge-java/clinicfiapp-monorepo" target="_blank" rel="noopener noreferrer">Acessar</a></div>
              </div>
            </details>

            <details>
              <summary><b>Food Fiapp</b> — Java, JUnit, Docker</summary>
              <div className="card-detail">
                Clean Architecture, Java 21, testes automatizados e qualidade.
                <div><a href="https://github.com/fiap-tech-challenge-java/food-fiapp" target="_blank" rel="noopener noreferrer">Acessar</a></div>
              </div>
            </details>

            <details>
              <summary><b>TechChallenge</b> — Docker, Node.js</summary>
              <div className="card-detail">
                Execução local via Docker, guia prático para containers.
                <div><a href="https://github.com/fiap-tech-challenge-java/fiap-tech-challenge" target="_blank" rel="noopener noreferrer">Acessar</a></div>
              </div>
            </details>

            <details>
              <summary><b>Equinox</b> — TypeScript, React</summary>
              <div className="card-detail">
                Repositório público TypeScript, base Create React App.
                <div><a href="https://github.com/rebecanonato89/equinox" target="_blank" rel="noopener noreferrer">Acessar</a></div>
              </div>
            </details>
          </div>
        </>
      );
    }

    if (active === 'diff') {
      return (
        <>
          <h3 className="card-title">{icons.diff} {t(lang, 'differentials')}</h3>
          <ul className="card-bullets">
            <li>Documentação clara e decisões técnicas justificadas</li>
            <li>Projetos com testes, CI/CD e exemplos de uso</li>
            <li>Foco em arquitetura limpa, escalabilidade e segurança</li>
            <li>Experiência com sistemas distribuídos, microsserviços e cloud</li>
            <li>Comunicação transparente e colaboração</li>
          </ul>
        </>
      );
    }

    return (
      <>
        <h3 className="card-title">{icons.contact} {t(lang, 'contact')}</h3>
        <div className="card-links">
          <a href="https://www.linkedin.com/in/rebecanonato89/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://rebecanonato89.dev" target="_blank" rel="noopener noreferrer">Portfólio</a>
          <a href="mailto:rebeca.nonato.dev@gmail.com">Email</a>
          <a href="https://github.com/rebecanonato89" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </>
    );
  }

  return (
    <>
      <canvas id="bg-effect" ref={bgRef} />

      <div id="stage" ref={stageRef}>
        <header className="topbar">
          <div className="topbar-left">
            <div className="brand">
              <div className="brand-name">Rebeca Nonato</div>
              <div className="brand-sub">{t(lang, 'welcome')}</div>
            </div>
          </div>

          <div className="topbar-right">
            <button className="theme-toggle" onClick={() => setDark(d => !d)} title={dark ? 'Light' : 'Dark'}>
              {dark ? icons.sun : icons.moon}
            </button>

            <button className="sound-toggle" onClick={() => setSound(s => !s)} title={t(lang, sound ? 'sound_off' : 'sound_on')}>
              {icons.sound}
            </button>

            {langs.map(l => (
              <button key={l} className={`lang-btn${lang === l ? ' active' : ''}`} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        {/* Backdrop para ocultar o card e ver o mapa */}
        {active && <div className="backdrop" onClick={() => setActive(null)} />}

        {active && (
          <div className="center-card" role="region" aria-label="Content">
            <div className="card-actions">
              <button className="hide-btn" onClick={() => setActive(null)} type="button">{t(lang, 'hide')}</button>
            </div>
            {renderCardContent()}
          </div>
        )}

        <div
          className="map-layer"
          style={{ transform: `translate(${camera.dx}px, ${camera.dy}px) scale(${camera.zoom})` }}
        >
          <svg className="map-links" width={stageSize.w} height={stageSize.h} aria-hidden="true">
            {nodes.flatMap(n =>
              n.links.map(to => {
                const b = nodes.find(x => x.id === to);
                if (!b) return null;
                const key = `${n.id}__${b.id}`;
                const isHot = n.id === active || b.id === active;
                return <path key={key} d={pathBetween(n, b)} className={isHot ? 'link hot' : 'link'} vectorEffect="non-scaling-stroke" />;
              })
            )}
          </svg>

          {nodes.map(n => {
            const left = (n.pos.x / 100) * stageSize.w;
            const top = (n.pos.y / 100) * stageSize.h;
            return (
              <button
                key={n.id}
                className={nodeState(n.id)}
                style={{ left, top }}
                onMouseEnter={() => onActivate(n.id)}
                onClick={() => onActivate(n.id)}
                type="button"
              >
                <span className="node-icon">{n.icon}</span>
                <span className="node-label">{t(lang, n.labelKey)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
