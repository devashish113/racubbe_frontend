import { createFileRoute, Link } from "@tanstack/react-router";
import { Solutions, TechEcosystem } from "@/components/site/HomePage";
import { FlipCards, PageHero } from "@/components/site/FlipCards";
import { FlowDivider } from "@/components/site/MotionFX";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Enterprise Solutions — RACube Technologies" },
      { name: "description", content: "A complete portfolio of CCaaS, UCaaS, Genesys Cloud, Salesforce, AI and DevOps solutions for the modern enterprise." },
      { property: "og:title", content: "Enterprise Solutions — RACube Technologies" },
      { property: "og:description", content: "CX, Cloud and AI solutions engineered for global enterprises." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Enterprise solutions"
        title={<>One <span className="text-gradient">integrated</span> portfolio for modern CX.</>}
        subtitle="From Genesys Cloud and CCaaS to AI orchestration, cloud architecture and managed services — engineered for outcomes."
      />
      <Solutions />
      <FlowDivider />
      <FlipCards />
      <FlowDivider />
      <TechEcosystem />
      <CTA />
    </>
  );
}

function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-aurora text-white font-medium shadow-glow">
          Talk to an architect <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
