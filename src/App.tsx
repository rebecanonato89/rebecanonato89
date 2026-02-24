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

const langs: Lang[] = ['pt', 'en', 'zh'];

/** Slightly nicer inline icons (consistent stroke + glow via CSS) */
const icons = {
  user: (
    <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 21a8 8 0 0 0-16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  stack: (
    <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 3 8l9 5 9-5-9-5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M3 12l9 5 9-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M3 16l9 5 9-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  project: (
    <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 3h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 14 21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 14v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  diff: (
    <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2 4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  contact: (
    <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4h16v16H4V4Z" stroke="currentColor" strokeWidth="2" />
      <path d="M4 8l8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  sun: (
    <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  moon: (
    <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 12.79A9 9 0 0 1 12.79 3a7 7 0 1 0 8.21 9.79Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.18" />
      <path d="M21 12.79A9 9 0 0 1 12.79 3a7 7 0 1 0 8.21 9.79Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  sound: (
    <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 9a4 4 0 0 1 0 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18.5 7a7 7 0 0 1 0 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

function useBeep() {
  const ctxRef = useRef<AudioContext | null>(null);

  return () => {
    try {
      if (!ctxRef.current) ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = ctxRef.current!;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = 740;
      g.gain.value = 0.03;
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
  // Inicializa o tema com base no localStorage ou padrão claro
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme-dark');
    return saved === 'true';
  });
  const [sound, setSound] = useState(false);
  const [active, setActive] = useState<SectionKey | null>('about');

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

  // Dark mode toggle (reliable)
  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('theme-dark', String(dark));
  }, [dark]);

  // Background glow effect (canvas)
  useEffect(() => {
    const canvas = bgRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let animationId = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // glow layers (subtle)
      const g1 = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 260);
      g1.addColorStop(0, 'rgba(0,234,255,0.18)');
      g1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (canvas) {
        const g2 = ctx.createRadialGradient(canvas.width * 0.8, canvas.height * 0.25, 0, canvas.width * 0.8, canvas.height * 0.25, 320);
        g2.addColorStop(0, 'rgba(30,144,255,0.14)');
        g2.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

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

  // Camera pan (Option B). If no active node -> neutral (see full map).
  const camera = useMemo(() => {
    if (!activeNode) return { dx: 0, dy: 0, zoom: 1 };
    const cx = stageSize.w / 2;
    const cy = stageSize.h / 2;
    const ax = (activeNode.pos.x / 100) * stageSize.w;
    const ay = (activeNode.pos.y / 100) * stageSize.h;
    const dx = cx - ax;
    const dy = cy - ay;
    const zoom = 1.05;
    return { dx, dy, zoom };
  }, [activeNode, stageSize.h, stageSize.w]);

  function onActivate(id: SectionKey) {
    setActive(id);
    if (sound) playBeep();
  }

  function nodeState(id: SectionKey) {
    if (!active) return 'node';
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
          <h3 className="card-title">
            <span className="card-ico">{icons.user}</span> {t(lang, 'about')}
          </h3>

          {lang === 'pt' && (
            <>
              <p className="card-lead">
                Backend • Arquitetura • Sistemas distribuídos • Consistência • Segurança • Qualidade
              </p>
              <p className="card-text">
                🚀 Olá! Eu sou a Rebeca, apaixonada por construir sistemas robustos, escaláveis e com propósito.
                Minha missão é transformar requisitos complexos em soluções elegantes, documentadas e fáceis de manter.
              </p>
              <p className="card-text">
                🧩 Gosto de desafios reais: consistência, segurança, observabilidade, escalabilidade e decisões técnicas transparentes.
                Aqui você encontra projetos com código aberto, documentação clara e foco em qualidade.
              </p>
            </>
          )}

          {lang === 'en' && (
            <>
              <p className="card-lead">
                Backend • Architecture • Distributed systems • Consistency • Security • Quality
              </p>
              <p className="card-text">
                I’m Rebeca. I build robust, scalable systems with purpose. I care about clear documentation,
                explicit technical decisions, and real-world constraints (consistency, security, observability).
              </p>
            </>
          )}

          {lang === 'zh' && (
            <>
              <p className="card-lead">
                后端 • 架构 • 分布式系统 • 一致性 • 安全 • 质量
              </p>
              <p className="card-text">
                我是 Rebeca，专注于后端与架构，偏好真实约束下的系统：一致性、安全性、可观测性与可扩展性。
                这里展示文档清晰、技术决策明确、重视质量的项目。
              </p>
            </>
          )}
        </>
      );
    }

    if (active === 'stack') {
      return (
        <>
          <h3 className="card-title">
            <span className="card-ico">{icons.stack}</span> {t(lang, 'stack')}
          </h3>

          <p className="card-text">
            <b>{lang === 'pt' ? 'Principais' : lang === 'en' ? 'Core' : '核心'}:</b>{' '}
            Kotlin · Java · TypeScript · NestJS · PostgreSQL · Docker · AWS · Git · Linux · React
          </p>

          <p className="card-text">
            <b>{lang === 'pt' ? 'Práticas' : lang === 'en' ? 'Practices' : '实践'}:</b>{' '}
            Clean Architecture · CQRS · Event Sourcing · Testes automatizados · CI/CD · Observabilidade
          </p>

          <div className="card-links">
            <a
              href="https://skillicons.dev/icons?i=kotlin,java,ts,nestjs,postgres,docker,aws,git,linux,react"
              target="_blank"
              rel="noopener noreferrer"
            >
              skillicons (preview)
            </a>
          </div>
        </>
      );
    }

    if (active === 'projects') {
      return (
        <>
          <h3 className="card-title">
            <span className="card-ico">{icons.project}</span> {t(lang, 'projects')}
          </h3>

          <div className="card-collapsible">
            <details open>
              <summary><b>Hedge CLI</b> — TypeScript, Node.js</summary>
              <div className="card-detail">
                Detector híbrido com gating de LLM (heurística + LLM só quando necessário).
                <div><a href="https://github.com/rebecanonato89/hedge-cli" target="_blank" rel="noopener noreferrer">GitHub</a></div>
              </div>
            </details>

            <details>
              <summary><b>AllRev</b> — NestJS, PostgreSQL, Docker</summary>
              <div className="card-detail">
                Backend multi-tenant com autenticação e controle de acesso.
                <div><a href="https://github.com/Devs-IO/allrev-backend" target="_blank" rel="noopener noreferrer">GitHub</a></div>
              </div>
            </details>

            <details>
              <summary><b>ClinicFiapApp</b> — Java, Spring, Kafka, Docker</summary>
              <div className="card-detail">
                Microsserviços com Outbox + Kafka + CQRS, foco em consistência.
                <div><a href="https://github.com/fiap-tech-challenge-java/clinicfiapp-monorepo" target="_blank" rel="noopener noreferrer">GitHub</a></div>
              </div>
            </details>

            <details>
              <summary><b>Food Fiapp</b> — Java, JUnit, Docker</summary>
              <div className="card-detail">
                Clean Architecture, Java 21, testes automatizados.
                <div><a href="https://github.com/fiap-tech-challenge-java/food-fiapp" target="_blank" rel="noopener noreferrer">GitHub</a></div>
              </div>
            </details>

            <details>
              <summary><b>TechChallenge</b> — Docker, Node.js</summary>
              <div className="card-detail">
                Execução local via Docker (guia prático para containers).
                <div><a href="https://github.com/fiap-tech-challenge-java/fiap-tech-challenge" target="_blank" rel="noopener noreferrer">GitHub</a></div>
              </div>
            </details>

            <details>
              <summary><b>Equinox</b> — TypeScript, React</summary>
              <div className="card-detail">
                Base React/TypeScript (Create React App).
                <div><a href="https://github.com/rebecanonato89/equinox" target="_blank" rel="noopener noreferrer">GitHub</a></div>
              </div>
            </details>
          </div>
        </>
      );
    }

    if (active === 'diff') {
      return (
        <>
          <h3 className="card-title">
            <span className="card-ico">{icons.diff}</span> {t(lang, 'differentials')}
          </h3>
          <ul className="card-bullets">
            <li>{lang === 'pt' ? 'Documentação clara e decisões técnicas justificadas' : lang === 'en' ? 'Clear documentation and justified technical decisions' : '清晰文档与有依据的技术决策'}</li>
            <li>{lang === 'pt' ? 'Projetos com testes, CI/CD e exemplos de uso' : lang === 'en' ? 'Projects with tests, CI/CD and usage examples' : '包含测试、CI/CD与用例'}</li>
            <li>{lang === 'pt' ? 'Foco em arquitetura limpa, escalabilidade e segurança' : lang === 'en' ? 'Focus on clean architecture, scalability and security' : '专注架构、扩展性与安全'}</li>
            <li>{lang === 'pt' ? 'Experiência com sistemas distribuídos e cloud' : lang === 'en' ? 'Experience with distributed systems and cloud' : '分布式系统与云经验'}</li>
            <li>{lang === 'pt' ? 'Comunicação transparente e colaboração' : lang === 'en' ? 'Transparent communication and collaboration' : '透明沟通与协作'}</li>
          </ul>
        </>
      );
    }

    return (
      <>
        <h3 className="card-title">
          <span className="card-ico">{icons.contact}</span> {t(lang, 'contact')}
        </h3>
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
            <button
              className={`theme-toggle${dark ? ' active' : ''}`}
              onClick={() => setDark(d => !d)}
              title={dark ? 'Light mode' : 'Dark mode'}
              aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}
              type="button"
            >
              <span className={`btn-ico${dark ? ' on' : ''}`}>{dark ? icons.sun : icons.moon}</span>
            </button>

            <button
              className="sound-toggle"
              onClick={() => setSound(s => !s)}
              title={t(lang, sound ? 'sound_off' : 'sound_on')}
              aria-label={t(lang, sound ? 'sound_off' : 'sound_on')}
              type="button"
            >
              <span className={`btn-ico${sound ? ' on' : ''}`}>{icons.sound}</span>
            </button>

            {langs.map(l => (
              <button
                key={l}
                className={`lang-btn${lang === l ? ' active' : ''}`}
                onClick={() => setLang(l)}
                type="button"
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        {/* Click outside to hide card */}
        {active && <div className="backdrop" onClick={() => setActive(null)} />}

        {active && (
          <div className="center-card pop" role="region" aria-label="Content">
            <div className="card-actions">
              <button className="hide-btn" onClick={() => setActive(null)} type="button">
                {t(lang, 'hide')}
              </button>
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
                return (
                  <path
                    key={key}
                    d={pathBetween(n, b)}
                    className={isHot ? 'link hot' : 'link'}
                    vectorEffect="non-scaling-stroke"
                  />
                );
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
