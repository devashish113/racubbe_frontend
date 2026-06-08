import { motion, useScroll, useTransform, useMotionValue, useSpring, animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Sparkles, Cloud, Bot, Headphones, Workflow, Shield,
  Cpu, Globe2, Network, Building2, HeartPulse, ShoppingBag, Signal,
  Landmark, Truck, Briefcase, Phone, MessageSquare, Zap, CheckCircle2,
  TrendingUp, Star, ChevronRight, Calendar
} from "lucide-react";
import { AnimatedBackdrop, CursorGlow, FlowDivider, ParallaxLayer } from "./MotionFX";
import { FlipCards } from "./FlipCards";
import { CinematicBand, BentoCapabilities, ScrollProcess, OutcomeStats, ManifestoCTA } from "./SignatureSections";

/* ============================================================
   1. HERO
============================================================ */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const sy = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      mouseX.set(((e.clientX - r.left) / r.width - 0.5) * 30);
      mouseY.set(((e.clientY - r.top) / r.height - 0.5) * 30);
    };

    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={ref}
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
    >
      {/* aurora bg */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute inset-0 -z-10 opacity-70"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[680px] w-[1100px] rounded-full bg-aurora blur-[140px] opacity-50 animate-aurora" />
        <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-[#E53935] blur-[120px] opacity-25" />
      </motion.div>

      {/* grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-14 xl:gap-20 items-center">
          {/* LEFT CONTENT */}
          <div className="text-left">
            <motion.a
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              href="#genesys"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium tracking-wide"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Official{" "}
              <span className="text-gradient font-semibold">
                Genesys Premier Partner
              </span>
              <ChevronRight size={14} className="opacity-60" />
            </motion.a>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8 text-4xl md:text-4xl xl:text-5xl font-semibold tracking-tight leading-[1.05]"
            >
              Transforming{" "}
              <span className="text-gradient">Customer Experience</span>
              <br className="hidden md:block" /> through AI, Cloud &amp;
              Contact Center innovation.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-7 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              Genesys Premier Partner helping enterprises modernize CCaaS,
              UCaaS, AI, Cloud, CRM and Customer Experience ecosystems -
              end-to-end.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-aurora text-white font-medium shadow-glow hover:scale-[1.03] transition"
              >
                Schedule Consultation
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition"
                />
              </a>

              
            </motion.div>
          </div>

          {/* RIGHT ORBIT VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="relative h-[440px] md:h-[540px] lg:h-[620px] w-full"
          >
            <OrbitingGlobe />
          </motion.div>
        </div>

        {/* mini stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border-gradient bg-white/5"
        >
          {[
            ["100+", "Enterprise Engagements"],
            ["50+", "Cloud Transformations"],
            ["20+", "Tech Specializations"],
            ["99%", "Customer Commitment"],
          ].map(([n, l]) => (
            <div key={l} className="bg-[#0E1424]/90 px-6 py-6 text-left">
              <div className="text-2xl md:text-3xl font-semibold text-gradient">
                {n}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function OrbitingGlobe() {
  const solutions = [
    {
      short: "CCC",
      title: "Cloud Computing Consulting",
      href: "#solutions",
      icon: Cloud,
    },
    {
      short: "CN",
      title: "Collaboration & Networking",
      href: "#solutions",
      icon: Network,
    },
    {
      short: "AI",
      title: "AI & Chatbot",
      href: "#solutions",
      icon: Bot,
    },
    {
      short: "RPO",
      title: "RPO",
      href: "#solutions",
      icon: Briefcase,
    },
    {
      short: "CM",
      title: "Cloud Migration",
      href: "#solutions",
      icon: Workflow,
    },
    {
      short: "ITX",
      title: "IT Accessories Reseller",
      href: "#solutions",
      icon: Cpu,
    },
  ];

  const orbitSize = 520;
  const orbitRadius = orbitSize / 2;

  return (
    <div className="absolute inset-0 grid place-items-center">
      {/* glow behind orbit */}
      <div className="absolute h-[72%] w-[72%] rounded-full bg-[#1B75FF]/10 blur-[90px]" />
      <div className="absolute h-[52%] w-[52%] rounded-full bg-[#E53935]/10 blur-[80px]" />

      {/* outer ring wrapper */}
      <div
        className="absolute"
        style={{
          width: orbitSize,
          height: orbitSize,
        }}
      >
        {/* actual outer ring line */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 55,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full border border-white/10"
        >
          {solutions.map((item, index) => {
            const angle = (index / solutions.length) * 360;
            const Icon = item.icon;

            return (
              <div
                key={item.short}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `rotate(${angle}deg) translateX(${orbitRadius}px)`,
                }}
              >
                <motion.a
  href={item.href}
  title={item.title}
  initial={{ rotate: -angle }}
  animate={{ rotate: -360 - angle }}
  transition={{
    duration: 55,
    repeat: Infinity,
    ease: "linear",
  }}
  whileHover={{ scale: 1.12 }}
  className="-translate-x-1/2 -translate-y-1/2 group relative inline-flex h-16 w-16 items-center justify-center rounded-full glass border border-white/10 hover:border-[#1B75FF]/70 hover:bg-white/10 transition shadow-glow"
>
  <div className="flex flex-col items-center justify-center gap-1">
    <Icon
      size={17}
      className="text-[#1B75FF] group-hover:text-white transition"
    />
    <span className="text-[11px] font-bold tracking-wide text-white">
      {item.short}
    </span>
  </div>

  <span className="pointer-events-none absolute top-full left-1/2 mt-3 w-max max-w-[180px] -translate-x-1/2 rounded-lg bg-[#0E1424] border border-white/10 px-3 py-1.5 text-[11px] text-white opacity-0 group-hover:opacity-100 transition z-20">
    {item.title}
  </span>
</motion.a>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* middle ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 42,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute rounded-full border border-white/10"
        style={{
          width: "58%",
          aspectRatio: 1,
        }}
      />

      {/* inner ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute rounded-full border border-white/10"
        style={{
          width: "38%",
          aspectRatio: 1,
        }}
      />

      {/* core */}
      <div className="relative h-36 w-36 md:h-44 md:w-44 rounded-full bg-aurora grid place-items-center shadow-glow z-10">
        <div className="absolute inset-0 rounded-full bg-aurora blur-2xl opacity-60" />
        <div className="absolute inset-0 rounded-full animate-pulse-ring border-2 border-[#1B75FF]" />

        <div className="relative text-center">
          <div className="text-[9px] md:text-[10px] tracking-widest text-white/70">
            RACUBE
          </div>
          <div className="text-xl md:text-2xl font-black text-white">
            CX OS
          </div>
          <div className="text-[9px] md:text-[10px] tracking-widest text-white/70">
            PLATFORM
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   2. TRUST MARQUEE
============================================================ */
export function TrustBar() {
  const items = ["Genesys Premier Partner", "Salesforce Experts", "AWS Cloud", "Google Cloud",
    "Microsoft Teams", "Cisco", "Avaya", "Zoom", "Amazon Connect", "Oracle SBC", "RingCentral"];
  const row = [...items, ...items];
  return (
    <section className="relative py-12 border-y border-white/10 overflow-hidden">
      <div className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">
        Trusted partner across the modern CX stack
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {row.map((t, i) => (
            <div key={i} className="flex items-center gap-3 text-base md:text-lg font-medium text-muted-foreground hover:text-foreground transition">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1B75FF]" />
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   3. WHO WE ARE / TIMELINE
============================================================ */
export function WhoWeAre() {
  const items = [
    { icon: Cloud, t: "Cloud Transformation", d: "End-to-end cloud migration & modernization across AWS, Azure & GCP." },
    { icon: Headphones, t: "Contact Center Modernization", d: "From legacy IVR to cloud-native omnichannel CX with Genesys." },
    { icon: Bot, t: "AI-Powered CX", d: "Conversational AI, agent assist & speech analytics that scale." },
    { icon: Network, t: "Enterprise Architecture", d: "Reference architectures designed for security, scale & cost." },
    { icon: Globe2, t: "Global Delivery", d: "Distributed engineering pods serving Fortune 1000 enterprises." },
    { icon: Workflow, t: "DevOps Excellence", d: "CI/CD, IaC, observability - engineered for change velocity." },
  ];
  return (
    <SectionShell id="about" eyebrow="Who we are" title="An enterprise CX engineering company built for the AI era.">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
        {items.map((it, i) => (
          <motion.div
            key={it.t}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.05 }}
            className="group relative p-7 rounded-2xl glass border-gradient overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-aurora opacity-0 group-hover:opacity-30 blur-3xl transition duration-700" />
            <it.icon size={22} className="text-[#1B75FF]" />
            <div className="mt-4 font-semibold">{it.t}</div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.d}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

/* ============================================================
   4. ENTERPRISE SOLUTIONS
============================================================ */
export function Solutions() {
  const sols = [
    { icon: Headphones, t: "Genesys Cloud", d: "Premier partner-led design, deployment & optimization for Genesys Cloud CX." },
    { icon: Phone, t: "CCaaS Transformation", d: "Migrate legacy contact centers to modern cloud-native CCaaS platforms." },
    { icon: MessageSquare, t: "UCaaS Solutions", d: "Unified collaboration across Teams, Zoom, Webex & RingCentral." },
    { icon: Cloud, t: "Salesforce Consulting", d: "Service Cloud, Sales Cloud & Industry Cloud implementations." },
    { icon: Bot, t: "AI & Automation", d: "GenAI, agent assist, RPA - automate the next 40% of CX work." },
    { icon: Sparkles, t: "Conversational AI", d: "Lex, Dialogflow CX, Genesys Bot Flows for omnichannel self-service." },
    { icon: Network, t: "Cloud Architecture", d: "Landing zones, multi-region HA & secure-by-design networking." },
    { icon: Workflow, t: "DevOps & CI/CD", d: "Pipelines, IaC and platform engineering for elite delivery teams." },
    { icon: Shield, t: "Oracle SBC", d: "Secure session border controller design, deployment & lifecycle." },
    { icon: Cpu, t: "Contact Center Migration", d: "Avaya / Cisco → Genesys Cloud with zero-downtime cutover." },
    { icon: Briefcase, t: "Collaboration Platforms", d: "Enterprise rollouts of Teams, Zoom, Webex with governance." },
    { icon: Star, t: "Professional Services", d: "Advisory, run, optimize - flexible engagement models." },
  ];
  return (
    <SectionShell id="solutions" eyebrow="Enterprise solutions"
      title={<>A complete portfolio for <span className="text-gradient">modern customer experience</span>.</>}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-14">
        {sols.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 6) * 0.04 }}
            className="group relative p-6 rounded-2xl bg-[#0E1424]/70 border border-white/10 hover:border-[#1B75FF]/60 transition overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1B75FF]/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
            <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 grid place-items-center group-hover:bg-aurora group-hover:border-transparent transition">
              <s.icon size={18} />
            </div>
            <div className="mt-5 font-semibold">{s.t}</div>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            {/* <div className="mt-5 text-xs text-[#1B75FF] inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
              Learn more <ArrowRight size={12} />
            </div> */}
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

/* ============================================================
   5. GENESYS PREMIER PARTNER
============================================================ */
export function GenesysSection() {
  const caps = [
    "CX Transformation", "Cloud Migration", "Omnichannel Journey Design",
    "Workforce Engagement", "AI Experience Orchestration",
    "Contact Center Modernization", "Integration Services", "Managed Services",
  ];
  return (
    <section id="genesys" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-[600px] w-[1200px] rounded-full bg-aurora blur-[160px] opacity-25" />
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <Eyebrow>Strategic partnership</Eyebrow>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Your trusted <span className="text-gradient">Genesys Premier Partner</span>.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-xl">
              From journey design to AI experience orchestration - we deliver
              the entire Genesys Cloud value chain for global enterprises.
              Certified architects, proven playbooks, measurable outcomes.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {caps.map((c) => (
                <div key={c} className="flex items-center gap-2.5 text-sm">
                  <CheckCircle2 size={16} className="text-[#1B75FF]" />
                  {c}
                </div>
              ))}
            </div>
            <div className="mt-10 flex gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-aurora text-white font-medium shadow-glow">
                Start a Genesys engagement <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* visual diagram */}
          <div className="relative h-[480px] rounded-3xl glass-strong p-8 overflow-hidden border-gradient">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,#1B75FF_0%,transparent_50%),radial-gradient(circle_at_80%_80%,#E53935_0%,transparent_50%)]" />
            <div className="relative h-full grid grid-rows-3 gap-4">
              {[
                { t: "Experience Orchestration", x: ["Journey", "AI Agents", "Routing", "Voice/Digital"] },
                { t: "Genesys Cloud Platform", x: ["WEM", "Analytics", "Bot Flows", "Integrations"] },
                { t: "Enterprise Systems", x: ["CRM", "Telephony", "Data Lake", "Identity"] },
              ].map((row, ri) => (
                <motion.div
                  key={row.t}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: ri * 0.15 }}
                  className="rounded-xl border border-white/10 bg-[#0E1424]/70 backdrop-blur p-4"
                >
                  <div className="text-[10px] uppercase tracking-widest text-[#1B75FF] font-semibold">{row.t}</div>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {row.x.map((b) => (
                      <div key={b} className="text-xs px-2 py-2 rounded-lg bg-white/5 border border-white/10 text-center">
                        {b}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   6. AI & CX INNOVATION LAB
============================================================ */
export function AILab() {
  const items = ["Generative AI", "Agentic AI", "Conversational AI", "NLP Solutions",
    "Amazon Lex", "Dialogflow CX", "AI Bots", "Automation Workflows",
    "Speech Analytics", "CX Intelligence"];
  return (
    <section id="ai" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-[#1B75FF] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#E53935] blur-[120px]" />
      </div>
      <div className="mx-auto max-w-7xl px-6 text-center">
        <Eyebrow>AI & CX Innovation Lab</Eyebrow>
        <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
          Where <span className="text-gradient">human + machine</span> shape customer experience.
        </h2>
        <p className="mt-5 max-w-2xl mx-auto text-muted-foreground">
          From generative agents to real-time speech intelligence - we engineer
          AI systems that actually move enterprise CX metrics.
        </p>
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {items.map((i, idx) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.04 }}
              whileHover={{ y: -4 }}
              className="px-4 py-2.5 rounded-full glass text-sm font-medium border-gradient cursor-default"
            >
              <Sparkles size={12} className="inline mr-2 text-[#1B75FF]" />
              {i}
            </motion.span>
          ))}
        </div>

        {/* AI flow visual */}
        <div className="mt-16 grid md:grid-cols-4 gap-3">
          {[
            { t: "Listen", d: "Voice, chat, email, social" },
            { t: "Understand", d: "NLP & intent classification" },
            { t: "Decide", d: "Agentic orchestration" },
            { t: "Act", d: "Resolve or escalate" },
          ].map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="relative p-6 rounded-2xl glass text-left"
            >
              <div className="text-xs text-[#1B75FF] font-semibold">0{i + 1}</div>
              <div className="mt-2 text-lg font-semibold">{s.t}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.d}</div>
              {i < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-2 text-[#1B75FF]">
                  <ChevronRight size={20} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   7. INDUSTRIES
============================================================ */
export function Industries() {
  const inds = [
    { icon: Landmark, t: "Banking & Financial Services" },
    { icon: HeartPulse, t: "Healthcare" },
    { icon: ShoppingBag, t: "Retail" },
    { icon: Signal, t: "Telecommunications" },
    { icon: Shield, t: "Insurance" },
    { icon: Building2, t: "Government" },
    { icon: Truck, t: "Logistics" },
    { icon: Cpu, t: "Technology" },
  ];
  return (
    <SectionShell id="industries" eyebrow="Industries"
      title={<>Deep expertise across <span className="text-gradient">regulated, customer-led</span> industries.</>}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-14">
        {inds.map((i, idx) => (
          <motion.div
            key={i.t}
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -6 }}
            className="group relative aspect-square rounded-2xl p-5 glass overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-aurora opacity-0 group-hover:opacity-20 transition" />
            <i.icon size={22} className="text-[#1B75FF] relative" />
            <div className="relative text-sm font-medium leading-tight">{i.t}</div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

/* ============================================================
   8. TECH ECOSYSTEM
============================================================ */
export function TechEcosystem() {
  const stack = [
    ["Genesys", "Salesforce", "Amazon Connect"],
    ["AWS", "Azure", "Google Cloud"],
    ["Cisco", "Avaya", "Oracle SBC"],
    ["Zoom", "RingCentral", "Microsoft Teams"],
  ];
  return (
    <SectionShell id="tech" eyebrow="Technology ecosystem"
      title={<>One <span className="text-gradient">integrated architecture</span>, every leading platform.</>}>
      <div className="mt-14 grid md:grid-cols-4 gap-3">
        {stack.map((row, ri) => (
          <div key={ri} className="space-y-3">
            {row.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: (ri + i) * 0.06 }}
                className="px-5 py-6 rounded-2xl glass text-center font-medium hover:bg-white/10 transition cursor-default"
              >
                {b}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

/* ============================================================
   9. METRICS
============================================================ */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, onUpdate: (v) => setVal(Math.floor(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export function Metrics() {
  const m = [
    { v: 100, s: "+", l: "Enterprise Engagements" },
    { v: 50, s: "+", l: "Cloud Transformations" },
    { v: 20, s: "+", l: "Tech Specializations" },
    { v: 99, s: "%", l: "Customer Commitment" },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border-gradient bg-[#0E1424]/80 p-10 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 -z-0 opacity-30 bg-aurora blur-3xl" />
          <div className="relative grid md:grid-cols-4 gap-10 text-center">
            {m.map((x) => (
              <div key={x.l}>
                <div className="text-5xl md:text-6xl font-semibold text-gradient">
                  <Counter to={x.v} suffix={x.s} />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{x.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   10. WHY RACUBE
============================================================ */
export function WhyRACube() {
  const items = [
    { t: "Deep CX Expertise", d: "100+ enterprise CX programs delivered end-to-end." },
    { t: "Genesys Premier Partner", d: "Certified architects across Genesys Cloud, PureConnect & PureCloud." },
    { t: "Cloud Native Delivery", d: "Built on AWS, Azure & GCP reference architectures." },
    { t: "AI First Approach", d: "Generative & agentic AI embedded into every workflow." },
    { t: "Multi-Vendor Expertise", d: "Cisco, Avaya, Genesys, Amazon Connect - we know them all." },
    { t: "Global Consulting Team", d: "Distributed pods across NA, EMEA & APAC." },
  ];
  return (
    <SectionShell id="why" eyebrow="Why RACube"
      title={<>The partner enterprises pick when <span className="text-gradient">CX is mission-critical</span>.</>}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-14">
        {items.map((it, i) => (
          <motion.div
            key={it.t}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="p-7 rounded-2xl glass relative overflow-hidden"
          >
            <div className="text-2xl font-semibold text-gradient">0{i + 1}</div>
            <div className="mt-3 font-semibold">{it.t}</div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.d}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

/* ============================================================
   11. CASE STUDIES
============================================================ */
export function CaseStudies() {
  const cs = [
    { tag: "Banking", t: "Migrated 4,000 agents to Genesys Cloud with zero downtime", m: "+32% CSAT · -41% AHT" },
    { tag: "Healthcare", t: "AI-powered triage bot deflecting 65% of inbound calls", m: "$4.2M annual savings" },
    { tag: "Telecom", t: "Omnichannel CX platform launched in 9 months", m: "+18 NPS · -28% churn" },
  ];
  return (
    <SectionShell eyebrow="Client success stories"
      title={<>Real outcomes for <span className="text-gradient">Fortune-class</span> enterprises.</>}>
      <div className="grid md:grid-cols-3 gap-4 mt-14">
        {cs.map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#1B75FF]/60 transition"
          >
            <div className="aspect-[4/3] bg-aurora relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
              <div className="absolute top-4 left-4 text-xs px-2.5 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 font-medium">
                {c.tag}
              </div>
            </div>
            <div className="p-6 bg-[#0E1424]">
              <div className="font-semibold leading-tight">{c.t}</div>
              <div className="mt-3 text-sm text-[#1B75FF] flex items-center gap-2">
                <TrendingUp size={14} /> {c.m}
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition">
                Read case study <ArrowRight size={12} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

/* ============================================================
   12. CAREERS
============================================================ */
export function Careers() {
  const skills = [
    "Genesys",
    "CCaaS",
    "Cloud",
    "AI / GenAI",
    "DevOps",
    "Salesforce",
  ];

  const monsterJobUrl =
    "https://www.monster.com/jobs/search?q=&where=&page=1&cn=RACube+Technologies+LLC&geo=33.1056799%2C-96.79695";

  return (
    <section id="careers" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative rounded-3xl overflow-hidden glass-strong p-10 md:p-16 border-gradient">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-aurora opacity-30 blur-3xl" />

          <div className="grid lg:grid-cols-2 gap-12 relative">
            {/* LEFT CONTENT */}
            <div>
              <Eyebrow>Careers at RACube</Eyebrow>

              <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
                Build the future of{" "}
                <span className="text-gradient">enterprise CX</span>.
              </h2>

              <p className="mt-5 text-muted-foreground max-w-lg leading-relaxed">
                Join a team of CX architects, AI engineers and cloud specialists
                shipping work for the world's most demanding enterprises.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {/* Internal current openings page */}
                <a
                  href="/openings"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-aurora text-white font-medium shadow-glow hover:scale-[1.03] transition"
                >
                  Explore Open Jobs
                  <ArrowRight size={14} />
                </a>

                {/* External Monster job site */}
                <a
                  href={monsterJobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass font-medium hover:bg-white/10 transition"
                >
                  Job Site Link
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                We're hiring expertise in
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <div
                    key={s}
                    className="px-4 py-2.5 rounded-xl glass font-medium text-sm"
                  >
                    {s}
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                {[
                  ["Remote-first", "Globally"],
                  ["Top 1%", "Engineering"],
                  ["Real", "Impact"],
                ].map(([a, b]) => (
                  <div key={a} className="p-4 rounded-xl bg-white/5">
                    <div className="text-sm font-semibold text-gradient">
                      {a}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {b}
                    </div>
                  </div>
                ))}
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   13. CONTACT
============================================================ */
export function ContactExperience() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ industry: "", solution: "", scope: "", name: "", email: "", company: "" });
  const steps = ["Industry", "Solution", "Scope", "Schedule"];

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>Book a consultation</Eyebrow>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            Let's design your <span className="text-gradient">CX transformation</span>.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Tell us a little - we'll match you with the right Genesys / CX architect within 24 hours.
          </p>
        </div>

        <div className="mt-14 rounded-3xl glass-strong border-gradient p-8 md:p-12 relative overflow-hidden">
          {/* steps */}
          <div className="flex items-center justify-between mb-10">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3 flex-1">
                <div className={`h-9 w-9 rounded-full grid place-items-center text-sm font-semibold transition
                  ${i <= step ? "bg-aurora text-white shadow-glow" : "bg-white/5 text-muted-foreground border border-white/10"}`}>
                  {i + 1}
                </div>
                <div className={`text-sm font-medium hidden md:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</div>
                {i < steps.length - 1 && <div className="flex-1 h-px bg-white/10 mx-2" />}
              </div>
            ))}
          </div>

          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
            {step === 0 && (
              <ChoiceGrid
                title="Which industry are you in?"
                options={["Banking", "Healthcare", "Retail", "Telecom", "Insurance", "Government", "Logistics", "Technology"]}
                value={data.industry}
                onChange={(v) => { setData({ ...data, industry: v }); setStep(1); }}
              />
            )}
            {step === 1 && (
              <ChoiceGrid
                title="What's your primary interest?"
                options={["Genesys Cloud", "CCaaS Migration", "AI / Conversational", "Salesforce", "Cloud Architecture", "Managed Services"]}
                value={data.solution}
                onChange={(v) => { setData({ ...data, solution: v }); setStep(2); }}
              />
            )}
            {step === 2 && (
              <ChoiceGrid
                title="Project scope"
                options={["Discovery / Advisory", "Pilot (8–12 weeks)", "Full implementation", "Managed & run"]}
                value={data.scope}
                onChange={(v) => { setData({ ...data, scope: v }); setStep(3); }}
              />
            )}
            {step === 3 && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="text-lg font-semibold mb-5">Tell us about you</div>
                  <div className="space-y-3">
                    {[
                      ["name", "Full name"],
                      ["email", "Work email"],
                      ["company", "Company"],
                    ].map(([k, l]) => (
                      <input
                        key={k}
                        placeholder={l}
                        value={(data as any)[k]}
                        onChange={(e) => setData({ ...data, [k]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#1B75FF] outline-none text-sm transition"
                      />
                    ))}
                    <button
                      onClick={() => alert("Thank you - a RACube CX architect will be in touch within 24 hours.")}
                      className="w-full mt-3 px-5 py-3 rounded-xl bg-aurora text-white font-medium shadow-glow inline-flex items-center justify-center gap-2"
                    >
                      <Calendar size={16} /> Submit & book a slot
                    </button>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Your brief</div>
                  <Summary k="Industry" v={data.industry} />
                  <Summary k="Solution" v={data.solution} />
                  <Summary k="Scope" v={data.scope} />
                  <div className="mt-6 p-4 rounded-xl bg-aurora/20 border border-[#1B75FF]/30 text-sm flex items-start gap-3">
                    <Zap size={16} className="text-[#1B75FF] shrink-0 mt-0.5" />
                    Matched with a Genesys Premier-certified architect for your engagement.
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {step > 0 && step < 3 && (
            <button onClick={() => setStep(step - 1)} className="mt-8 text-sm text-muted-foreground hover:text-foreground">
              ← Back
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function ChoiceGrid({ title, options, value, onChange }: { title: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="text-lg font-semibold mb-6">{title}</div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`px-4 py-4 rounded-xl text-sm font-medium border transition text-left
              ${value === o
                ? "bg-aurora border-transparent text-white shadow-glow"
                : "bg-white/5 border-white/10 hover:border-[#1B75FF]/50 hover:bg-white/10"}`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Summary({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between py-2 text-sm border-b border-white/5">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v || "-"}</span>
    </div>
  );
}

/* ============================================================
   SHARED
============================================================ */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#1B75FF] font-semibold">
      <span className="h-px w-6 bg-[#1B75FF]" />{children}
    </div>
  );
}

export function SectionShell({
  id, eyebrow, title, children,
}: { id?: string; eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="relative py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight leading-tight">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

/* ============================================================
   PAGE
============================================================ */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FlowDivider />
      <TrustBar />
      <CinematicBand />
      <BentoCapabilities />
      <WhoWeAre />
      <FlowDivider />
      <Solutions />
      <GenesysSection />
      <FlowDivider />
      <ScrollProcess />
      <FlipCards />
      <FlowDivider />
      <AILab />
      <Industries />
      <OutcomeStats />
      <FlowDivider />
      <TechEcosystem />
      <Metrics />
      <FlowDivider />
      <WhyRACube />
      <CaseStudies />
      <FlowDivider />
      <Careers />
      <ContactExperience />
      <ManifestoCTA />
    </>
  );
}
