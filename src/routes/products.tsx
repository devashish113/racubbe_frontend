import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  RefreshCw,
  PauseCircle,
  LineChart,
  ScrollText,
  GitBranch,
  Activity,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { PageHero } from "@/components/site/FlipCards";
import { SectionShell } from "@/components/site/HomePage";
import { FlowDivider } from "@/components/site/MotionFX";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products - RACube Technologies" },
      {
        name: "description",
        content:
          "RAautomiTe, RAautoPause, RAdaSh, RALogEd and more - RACube's proprietary product suite for Genesys, CCaaS automation, observability and DevOps.",
      },
      { property: "og:title", content: "Products - RACube Technologies" },
      {
        property: "og:description",
        content:
          "Next-generation CX automation, migration and observability products engineered by RACube.",
      },
    ],
  }),
  component: ProductsPage,
});

type Product = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  icon: typeof RefreshCw;
  description: string;
  bullets: string[];
  accent: string;
};

const products: Product[] = [
  {
    id: "raautomite-sync",
    name: "RAautomiTe - Sync",
    tagline: "Next-generation automation & migration",
    category: "Automation · Migration",
    icon: RefreshCw,
    description:
      "A SaaSified automation and migration engine that unlocks the full potential of DevOps process deployment across Genesys, Amazon Connect and NICE inContact.",
    bullets: [
      "Fully automated pipeline for any CCaaS environment",
      "Proprietary vendor APIs fetch & sync configurations in real time",
      "Replicate flat files across multi-cloud and multi-region",
      "Zero-downtime cutovers with parallel-run safety nets",
    ],
    accent: "from-[#1B75FF] to-[#00D4FF]",
  },
  {
    id: "raautopause",
    name: "RAautoPause",
    tagline: "Secure pause, invoked automatically",
    category: "Genesys Cloud · Compliance",
    icon: PauseCircle,
    description:
      "Triggers secure pause during an active ACD call inside Genesys Cloud - no agent intervention required - based on configurable events.",
    bullets: [
      "Trigger on web navigation, screen-pop values, or custom events",
      "PCI-DSS friendly - protects sensitive caller data",
      "Configurable per queue, flow or business unit",
      "Lightweight footprint, deployed in days not months",
    ],
    accent: "from-[#E53935] to-[#FF6B35]",
  },
  {
    id: "radash-p",
    name: "RAdaSh - P",
    tagline: "Performance & historical dashboard",
    category: "Analytics · Reporting",
    icon: LineChart,
    description:
      "A customizable single-pane portal for interactions, callbacks, call waiting, SLA performance and forecasts - daily, weekly, monthly and yearly.",
    bullets: [
      "Single-pane KPI canvas with role-based views",
      "Interaction, CB, AHT, SLA and forecast tiles",
      "Daily · Weekly · Monthly · Yearly slicers",
      "White-label friendly with brand-matched theming",
    ],
    accent: "from-[#A855F7] to-[#1B75FF]",
  },
  {
    id: "raloged",
    name: "RALogEd",
    tagline: "Configuration audit & log intelligence",
    category: "Observability · Audit",
    icon: ScrollText,
    description:
      "Advanced configuration logging for audit, change capture and a forensic repository of objects, users and timelines.",
    bullets: [
      "Drill-down from user → object changes (who, what, when)",
      "Reverse drill-down from object → user with full timeline",
      "Searchable audit repository with retention policies",
      "Customizable per client environment & compliance need",
    ],
    accent: "from-[#10B981] to-[#1B75FF]",
  },
  {
    id: "raautomite-ops",
    name: "RAautomiTe - Ops",
    tagline: "DevOps automation for CX platforms",
    category: "DevOps · CI/CD",
    icon: GitBranch,
    description:
      "An automation tool blending a unique code base and multi-tech stack in a SaaSified world to maximise DevOps deployment for CX platforms.",
    bullets: [
      "Minimises risk of exposing production to live changes",
      "Automated DevOps pipeline - Lower → UAT → PROD",
      "Protects against configurational and change outages",
      "Plugs into existing GitOps and approval workflows",
    ],
    accent: "from-[#1B75FF] to-[#7C3AED]",
  },
  {
    id: "radash-o",
    name: "RAdaSh - O",
    tagline: "Operations & agent dashboard",
    category: "Operations · Supervisor",
    icon: Activity,
    description:
      "Customizable operations portal - clinic open/close, live call readiness, agent availability, supervisor controls and queue management.",
    bullets: [
      "Live readiness - who's available, who's on queue",
      "Supervisor view & control with log on/off queue actions",
      "Customizable open/close windows and shift visibility",
      "Built for healthcare, BPO and high-volume contact centers",
    ],
    accent: "from-[#FF6B35] to-[#E11D74]",
  },
];

function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title={
          <>
            Proprietary products. <span className="text-gradient">Engineered by RACube.</span>
          </>
        }
        subtitle="A next-generation suite for CX automation, migration, observability and DevOps - built to solve real-world problems we've seen inside global contact centers."
      />

      <ProductGrid />
      <FlowDivider />
      <ProductDetails />
      <FlowDivider />
      <ForensicBand />
      <CTA />
    </>
  );
}

function ProductGrid() {
  return (
    <SectionShell
      eyebrow="The product suite"
      title={
        <>
          Six products. One <span className="text-gradient">delivery DNA.</span>
        </>
      }
    >
      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p, i) => (
          <motion.a
            key={p.id}
            href={`#${p.id}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.05 }}
            className="group relative rounded-2xl glass border-gradient p-6 overflow-hidden hover:-translate-y-1 transition-transform"
          >
            <div
              className={`absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gradient-to-br ${p.accent} opacity-25 blur-3xl group-hover:opacity-40 transition`}
            />
            <div className="relative flex items-start justify-between">
              <div
                className={`h-12 w-12 rounded-xl bg-gradient-to-br ${p.accent} grid place-items-center shadow-glow`}
              >
                <p.icon size={22} className="text-white" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {p.category}
              </span>
            </div>
            <div className="relative mt-5 text-lg font-semibold">{p.name}</div>
            <div className="relative mt-1 text-sm text-muted-foreground">{p.tagline}</div>
            <div className="relative mt-6 text-xs uppercase tracking-widest text-[#1B75FF] flex items-center gap-2">
              Explore <ArrowRight size={12} />
            </div>
          </motion.a>
        ))}
      </div>
    </SectionShell>
  );
}

function ProductDetails() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6 space-y-20">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            id={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className={`grid lg:grid-cols-2 gap-10 items-center scroll-mt-24 ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#1B75FF]">
                {p.category}
              </div>
              <h3 className="mt-3 text-3xl sm:text-4xl font-semibold leading-tight">
                {p.name}
              </h3>
              <p className="mt-2 text-base text-muted-foreground">{p.tagline}</p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <ul className="mt-6 space-y-2.5">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 size={16} className="mt-0.5 text-[#1B75FF] shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-aurora text-white text-sm font-medium shadow-glow hover:scale-[1.03] transition"
              >
                Request a demo <ArrowRight size={14} />
              </Link>
            </div>

            <ProductVisual product={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProductVisual({ product }: { product: Product }) {
  const Icon = product.icon;
  return (
    <div className="relative aspect-[5/4] rounded-3xl glass border-gradient overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${product.accent} opacity-20`}
      />
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div
        className={`absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br ${product.accent} opacity-30 blur-3xl`}
      />
      <div
        className={`absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br ${product.accent} opacity-30 blur-3xl`}
      />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 grid place-items-center"
      >
        <div
          className={`h-28 w-28 rounded-3xl bg-gradient-to-br ${product.accent} grid place-items-center shadow-glow rotate-3`}
        >
          <Icon size={52} className="text-white" />
        </div>
      </motion.div>

      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-white/70">
        <span>RACube · {product.category}</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
          Live
        </span>
      </div>
    </div>
  );
}

function ForensicBand() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-60" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <Sparkles size={12} className="text-[#1B75FF]" /> Forensic & advisory
        </div>
        <h2 className="mt-5 font-serif text-4xl sm:text-5xl leading-tight">
          Forensic engineering for{" "}
          <span className="text-gradient">mission-critical CX.</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Beyond products - RACube embeds with your team to forensically audit,
          re-architect and stabilize the platforms your customers depend on.
        </p>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h3 className="font-serif text-3xl sm:text-4xl">
          See a product in action.
        </h3>
        <p className="mt-3 text-muted-foreground">
          Book a 30-minute walkthrough with a RACube product architect.
        </p>
        <Link
          to="/contact"
          className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-aurora text-white font-medium shadow-glow hover:scale-[1.03] transition"
        >
          Request a live demo <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
