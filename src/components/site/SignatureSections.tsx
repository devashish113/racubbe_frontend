import { motion, useScroll, useTransform, useInView, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Bot, Cloud, Headphones, Workflow, Shield, Sparkles, Network,
  ArrowUpRight, Zap, LineChart, GitBranch, Layers, Boxes,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

/* ─────────────────────────────────────────────────────────────
   1. CINEMATIC BAND  (TTEC Digital × OpenAI feel)
   Big serif headline, mesh gradient, parallax words
────────────────────────────────────────────────────────────── */
export function CinematicBand() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.2, 1, 1, 0.3]);

  const words = ["Experience.", "Intelligence.", "Velocity.", "Outcomes."];

  return (
    <section ref={ref} className="relative py-40 overflow-hidden mesh-gradient">
      <motion.div style={{ y: y2 }} className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <motion.div
        style={{ y: y1, opacity }}
        className="relative mx-auto max-w-6xl px-6 text-center"
      >
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/70 glass px-4 py-2 rounded-full">
          <Sparkles size={12} /> The RACube Operating Model
        </div>
        <h2 className="mt-10 text-5xl md:text-7xl lg:text-8xl  leading-[0.95] tracking-tight font-display font-semibold">
          We engineer{" "}
          <span className="font-serif-display italic text-gradient">customer</span>
          <br />
          {words.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
              className="inline-block mx-3 font-serif-display italic my-3"
              style={{ color: i % 2 === 0 ? "#1B75FF" : "#fff" }}
            >
              {w}
            </motion.span>
          ))}
        </h2>
        <p className="mt-10 max-w-2xl mx-auto text-lg text-white/70">
          One integrated platform team across Genesys, AI, Cloud and CX - composing
          experiences that move enterprise metrics, not vanity dashboards.
        </p>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. BENTO CAPABILITIES  (Harness × Vercel feel)
────────────────────────────────────────────────────────────── */
export function BentoCapabilities() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1B75FF] font-semibold">
              <span className="h-px w-8 bg-[#1B75FF]" /> Platform capabilities
            </div>
            <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              One platform.{" "}
              <span className="font-serif-display italic text-gradient">Every</span> CX surface.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            From journey design to agentic AI in production - modular building blocks
            engineered to ship in weeks, not quarters.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 auto-rows-[160px]">
          {/* Hero bento */}
          <div className="bento-card relative col-span-12 lg:col-span-8 row-span-2 rounded-3xl glass border-gradient p-8 overflow-hidden group">
            <div className="absolute inset-0 mesh-gradient opacity-60" />
            <div className="absolute top-0 right-0 h-72 w-72 conic-ring rounded-full opacity-25 blur-2xl" />
            <div className="relative h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/80">
                  <Headphones size={14} /> Genesys Cloud CX
                </div>
                <ArrowUpRight className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
              </div>
              <div>
                <h3 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight">
                  Premier-tier <span className="font-serif-display italic">delivery</span> for the
                  world's most demanding contact centers.
                </h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Journey Orchestration", "WEM", "Speech Analytics", "AI Agents", "PSTN"].map(t => (
                    <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/15">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stat */}
          <div className="bento-card relative col-span-6 lg:col-span-4 row-span-1 rounded-3xl glass border-gradient p-6 overflow-hidden">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-aurora opacity-20 blur-2xl" />
            <div className="text-xs uppercase tracking-[0.2em] text-[#1B75FF]">Deployments</div>
            <div className="mt-2 text-5xl font-semibold font-display">
              <Counter to={350} suffix="+" />
            </div>
            <div className="text-sm text-muted-foreground mt-1">Genesys Cloud orgs delivered</div>
          </div>

          {/* AI */}
          <div className="bento-card relative col-span-6 lg:col-span-4 row-span-1 rounded-3xl glass border-gradient p-6 overflow-hidden">
            <Bot className="text-[#1B75FF]" />
            <div className="mt-3 font-semibold">Agentic AI</div>
            <div className="text-sm text-muted-foreground mt-1">Bots, copilots, RAG, evals - production-grade.</div>
          </div>

          {/* Cloud */}
          <div className="bento-card relative col-span-6 lg:col-span-4 row-span-1 rounded-3xl glass border-gradient p-6 overflow-hidden">
            <Cloud className="text-[#1B75FF]" />
            <div className="mt-3 font-semibold">Cloud Modernization</div>
            <div className="text-sm text-muted-foreground mt-1">AWS · Azure · GCP - IaC + FinOps.</div>
          </div>

          {/* Workflow tall */}
          <div className="bento-card relative col-span-12 lg:col-span-4 row-span-2 rounded-3xl bg-aurora p-8 overflow-hidden text-white">
            <div className="absolute inset-0 dot-grid opacity-30" />
            <div className="relative h-full flex flex-col justify-between">
              <Workflow />
              <div>
                <div className="text-3xl font-semibold leading-tight">CCaaS Migration Engine</div>
                <p className="mt-3 text-white/85 text-sm leading-relaxed">
                  Zero-downtime cutovers from Avaya / Cisco / NICE to Genesys Cloud - with parallel-run playbooks.
                </p>
                <Link to="/solutions" className="mt-6 inline-flex items-center gap-1 text-sm font-medium">
                  Explore migration <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* DevOps */}
          <div className="bento-card relative col-span-6 lg:col-span-4 row-span-1 rounded-3xl glass border-gradient p-6 overflow-hidden">
            <GitBranch className="text-[#1B75FF]" />
            <div className="mt-3 font-semibold">Platform Engineering</div>
            <div className="text-sm text-muted-foreground mt-1">DevOps, CI/CD, SRE, golden paths.</div>
          </div>

          {/* Security */}
          <div className="bento-card relative col-span-6 lg:col-span-4 row-span-1 rounded-3xl glass border-gradient p-6 overflow-hidden">
            <Shield className="text-[#1B75FF]" />
            <div className="mt-3 font-semibold">Security & Compliance</div>
            <div className="text-sm text-muted-foreground mt-1">SOC2, HIPAA, PCI - secure by design.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   3. SCROLL PROCESS  (Miratech editorial × ServiceNow)
   Sticky left title, scrolling steps right
────────────────────────────────────────────────────────────── */
const steps = [
  { n: "01", t: "Discover", d: "Journey mapping, voice-of-customer, gap analysis and a measurable outcome model - co-created with your teams." , icon: LineChart },
  { n: "02", t: "Design", d: "Reference architecture, conversation design, AI orchestration patterns and integration blueprints.", icon: Layers },
  { n: "03", t: "Deliver", d: "Agile pods of certified Genesys architects, AI engineers and cloud specialists ship in 6-week cycles.", icon: Workflow },
  { n: "04", t: "Optimize", d: "Continuous tuning of bots, routing, WEM and analytics - tied to NPS, AHT and conversion.", icon: Zap },
];

export function ScrollProcess() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1B75FF] font-semibold">
              <span className="h-px w-8 bg-[#1B75FF]" /> How we deliver
            </div>
            <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              A delivery model{" "}
              <span className="font-serif-display italic text-gradient">engineered</span> for outcomes.
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md">
              No theater. No 200-page decks. Just architects, engineers and operators
              who have shipped Genesys, AI and Cloud at enterprise scale - repeatedly.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-aurora text-white text-sm font-medium shadow-glow"
            >
              Start a discovery <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="relative rounded-3xl glass border-gradient p-8 overflow-hidden group"
            >
              <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#1B75FF] to-transparent opacity-60" />
              <div className="flex items-start gap-6">
                <div className="text-5xl md:text-5xl font-serif-display italic text-gradient leading-none px-2">{s.n}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <s.icon className="text-[#1B75FF]" size={18} />
                    <h3 className="text-2xl font-semibold tracking-tight">{s.t}</h3>
                  </div>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
                {/* <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition" /> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   4. OUTCOME STATS GRID  (GTS CX × Accenture)
   Big animated counters with cinematic numerals
────────────────────────────────────────────────────────────── */
const stats = [
  { v: 42, suf: "%", l: "Average AHT reduction", s: "Across 80+ contact-center modernizations" },
  { v: 3.2, suf: "x", l: "Faster cutover", s: "Versus traditional CCaaS migrations" },
  { v: 99.99, suf: "%", l: "Platform uptime", s: "Mission-critical Genesys Cloud SLAs" },
  { v: 28, suf: "+", l: "Countries delivered", s: "Globally distributed delivery pods" },
];

export function OutcomeStats() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 mesh-gradient opacity-30" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1B75FF] font-semibold">
            <span className="h-px w-8 bg-[#1B75FF]" /> Outcomes, not output
          </div>
          <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            The numbers behind the{" "}
            <span className="font-serif-display italic text-gradient">work</span>.
          </h2>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-3xl glass border-gradient p-8 overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-aurora opacity-10 blur-2xl group-hover:opacity-30 transition duration-700" />
              <div className="text-6xl md:text-7xl font-semibold font-display tracking-tight leading-none">
                <Counter to={s.v} suffix={s.suf} />
              </div>
              <div className="mt-6 text-sm font-medium">{s.l}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.s}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   5. MANIFESTO CTA (Vercel × OpenAI)
────────────────────────────────────────────────────────────── */
export function ManifestoCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 mesh-gradient opacity-90" />
        <div className="absolute inset-0 dot-grid opacity-40" />
      </div>
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95]"
        >
          Let's build the{" "}
          <span className="font-serif-display italic text-gradient">next chapter</span>{" "}
          of your CX.
        </motion.h2>
        <p className="mt-8 text-white/70 max-w-2xl mx-auto text-lg">
          Talk to a RACube architect. Walk away with a reference architecture and a
          measurable 90-day roadmap - at no cost.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link
            to="/contact"
            className="relative overflow-hidden sheen inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-black font-medium"
          >
            Book a discovery call <ArrowUpRight size={16} />
          </Link>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass text-white font-medium border border-white/20"
          >
            Explore solutions
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Helpers
────────────────────────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);
  const display = Number.isInteger(to) ? Math.round(val).toString() : val.toFixed(2);
  return <span ref={ref}>{display}{suffix}</span>;
}
