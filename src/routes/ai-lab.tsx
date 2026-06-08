import { createFileRoute } from "@tanstack/react-router";
import { AILab } from "@/components/site/HomePage";
import { FlipCards, PageHero, NeuralGraphic } from "@/components/site/FlipCards";
import { FlowDivider } from "@/components/site/MotionFX";

export const Route = createFileRoute("/ai-lab")({
  head: () => ({
    meta: [
      { title: "AI & CX Innovation Lab - RACube Technologies" },
      { name: "description", content: "Generative AI, agentic orchestration, conversational AI and speech analytics engineered for enterprise CX." },
      { property: "og:title", content: "AI & CX Innovation Lab - RACube" },
      { property: "og:description", content: "Where human + machine shape enterprise customer experience." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="AI & CX Innovation Lab"
        title={<>Where <span className="text-gradient">human + machine</span> shape CX.</>}
        subtitle="From generative agents to real-time speech intelligence - production-grade AI systems that move enterprise metrics."
      />
      <section className="py-8">
        <NeuralGraphic />
      </section>
      <AILab />
      <FlowDivider />
      <FlipCards />
    </>
  );
}
