import { motion } from "motion/react";
import { Sparkles, Bot, Cloud, Headphones, Network, Workflow } from "lucide-react";
import { SectionShell } from "./HomePage";

const cards = [
  { icon: Headphones, t: "Genesys Cloud CX", front: "Premier-partner delivery", back: "Journey design, AI orchestration, WEM, analytics — full Genesys Cloud stack delivered by certified architects." },
  { icon: Bot, t: "Agentic AI", front: "GenAI that ships", back: "Voice + chat bots, agent assist, knowledge co-pilots, speech analytics — production-grade, observable AI." },
  { icon: Cloud, t: "Cloud Modernization", front: "AWS · Azure · GCP", back: "Landing zones, IaC, secure-by-design networking, FinOps and zero-downtime migrations at enterprise scale." },
  { icon: Network, t: "CCaaS Migration", front: "Avaya/Cisco → Cloud", back: "Zero-downtime cutovers, parallel-run playbooks, integration with CRM, telephony, identity and data lakes." },
  { icon: Workflow, t: "Platform Engineering", front: "DevOps · CI/CD · SRE", back: "Pipelines, observability, golden paths and platform engineering for elite delivery teams." },
  { icon: Sparkles, t: "Experience Design", front: "Journey + insight", back: "CX research, journey orchestration, A/B optimization and outcome dashboards tied to revenue metrics." },
];

export function FlipCards() {
  return (
    <SectionShell
      eyebrow="Interactive capabilities"
      title={<>Hover to reveal — our <span className="text-gradient">delivery muscle</span>, in motion.</>}
    >
      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 [perspective:1400px]">
        {cards.map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.06 }}
            className="group relative h-64 [transform-style:preserve-3d] transition-transform duration-700 hover:[transform:rotateY(180deg)]"
          >
            {/* Front */}
            <div className="absolute inset-0 rounded-2xl glass border-gradient p-6 [backface-visibility:hidden] flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-aurora opacity-20 blur-3xl" />
              <div className="relative">
                <div className="h-11 w-11 rounded-xl bg-aurora grid place-items-center shadow-glow">
                  <c.icon size={20} className="text-white" />
                </div>
                <div className="mt-5 text-lg font-semibold">{c.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{c.front}</div>
              </div>
              <div className="relative text-[11px] uppercase tracking-widest text-[#1B75FF] flex items-center gap-2">
                Hover to reveal
                <span className="h-px w-8 bg-[#1B75FF]" />
              </div>
            </div>
            {/* Back */}
            <div className="absolute inset-0 rounded-2xl bg-aurora p-6 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between shadow-glow overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />
              <div className="relative">
                <div className="text-xs uppercase tracking-[0.2em] text-white/80">{c.t}</div>
                <p className="mt-3 text-sm text-white leading-relaxed">{c.back}</p>
              </div>
              <div className="relative text-xs text-white/80">RACube Technologies →</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

/* Animated globe-grid graphic used on inner pages */
export function GlobeGraphic() {
  return (
    <div className="relative h-72 w-72 mx-auto [perspective:1000px]">
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-white/15 [transform-style:preserve-3d]"
      >
        {[0, 30, 60, 90, 120, 150].map((deg) => (
          <div
            key={deg}
            className="absolute inset-0 rounded-full border border-white/10"
            style={{ transform: `rotateY(${deg}deg)` }}
          />
        ))}
        {[-60, -30, 0, 30, 60].map((deg) => (
          <div
            key={deg}
            className="absolute inset-x-0 mx-auto rounded-full border border-white/10"
            style={{
              transform: `rotateX(${deg}deg)`,
              height: `${Math.cos((deg * Math.PI) / 180) * 100}%`,
              top: `${(1 - Math.cos((deg * Math.PI) / 180)) * 50}%`,
            }}
          />
        ))}
      </motion.div>
      <div className="absolute inset-0 grid place-items-center">
        <div className="h-28 w-28 rounded-full bg-aurora shadow-glow grid place-items-center">
          <div className="text-center text-white">
            <div className="text-[9px] tracking-[0.25em] opacity-80">RACUBE</div>
            <div className="text-sm font-black">CX OS</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Neural-network graphic for AI Lab — pulsing nodes + animated synapses */
export function NeuralGraphic() {
  const nodes = [
    { x: 50, y: 20 }, { x: 20, y: 50 }, { x: 80, y: 50 },
    { x: 35, y: 80 }, { x: 65, y: 80 }, { x: 50, y: 50 },
  ];
  const edges: [number, number][] = [[0,1],[0,2],[0,5],[1,5],[2,5],[3,5],[4,5],[1,3],[2,4],[3,4]];
  return (
    <div className="relative h-72 w-full max-w-md mx-auto">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="syn" x1="0" x2="1">
            <stop offset="0" stopColor="#1B75FF" stopOpacity="0.1" />
            <stop offset="0.5" stopColor="#1B75FF" stopOpacity="1" />
            <stop offset="1" stopColor="#E53935" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke="url(#syn)" strokeWidth="0.4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i} cx={n.x} cy={n.y} r="2.5" fill="#1B75FF"
            animate={{ r: [2.5, 4, 2.5], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, delay: i * 0.25, repeat: Infinity }}
          />
        ))}
        <circle cx="50" cy="50" r="6" fill="#E53935" opacity="0.9" />
      </svg>
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="text-center mt-2">
          <div className="text-[9px] tracking-[0.3em] text-white/70">RACUBE</div>
          <div className="text-sm font-black text-white">AI CORE</div>
        </div>
      </div>
    </div>
  );
}

/* Orbiting constellation for About — represents distributed teams */
export function OrbitGraphic() {
  const orbits = [
    { size: 200, dur: 18, count: 3, color: "#1B75FF" },
    { size: 300, dur: 28, count: 5, color: "#ffffff" },
    { size: 400, dur: 40, count: 7, color: "#E53935" },
  ];
  return (
    <div className="relative h-[420px] w-full grid place-items-center overflow-hidden">
      <div className="absolute h-32 w-32 rounded-full bg-aurora shadow-glow grid place-items-center z-10">
        <div className="text-center text-white">
          <div className="text-[9px] tracking-[0.3em] opacity-80">RACUBE</div>
          <div className="text-sm font-black">GLOBAL</div>
        </div>
      </div>
      {orbits.map((o, oi) => (
        <motion.div
          key={oi}
          className="absolute rounded-full border border-white/10"
          style={{ height: o.size, width: o.size }}
          animate={{ rotate: oi % 2 === 0 ? 360 : -360 }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: o.count }).map((_, i) => {
            const angle = (i / o.count) * 360;
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-glow"
                style={{
                  background: o.color,
                  transform: `rotate(${angle}deg) translateX(${o.size / 2}px) rotate(-${angle}deg)`,
                }}
              />
            );
          })}
        </motion.div>
      ))}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
    </div>
  );
}

/* Page-header hero used by inner pages */
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="relative pt-36 pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[420px] w-[1100px] rounded-full bg-aurora blur-[140px] opacity-40 animate-aurora" />
      </div>
      <div className="absolute inset-0 -z-10 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_80%)]" />
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1B75FF] font-semibold"
        >
          <span className="h-px w-8 bg-[#1B75FF]" />
          {eyebrow}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-muted-foreground max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
