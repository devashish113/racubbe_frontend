import { createFileRoute } from "@tanstack/react-router";
import { WhoWeAre, WhyRACube, TrustBar, Metrics } from "@/components/site/HomePage";
import { PageHero, OrbitGraphic } from "@/components/site/FlipCards";
import { FlowDivider } from "@/components/site/MotionFX";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — RACube Technologies" },
      { name: "description", content: "An enterprise CX engineering company built for the AI era. Meet RACube Technologies — Genesys Premier Partner." },
      { property: "og:title", content: "About RACube Technologies" },
      { property: "og:description", content: "Enterprise CX engineering for the AI era." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title={<>An <span className="text-gradient">enterprise CX engineering</span> company for the AI era.</>}
        subtitle="Distributed teams of architects, AI engineers and cloud specialists shipping mission-critical CX for global enterprises."
      />
      <section className="py-6"><OrbitGraphic /></section>
      <WhoWeAre />
      <FlowDivider />
      <TrustBar />
      <WhyRACube />
      <FlowDivider />
      <Metrics />
    </>
  );
}
