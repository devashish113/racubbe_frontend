import { createFileRoute } from "@tanstack/react-router";
import { CaseStudies, Metrics } from "@/components/site/HomePage";
import { PageHero } from "@/components/site/FlipCards";
import { FlowDivider } from "@/components/site/MotionFX";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — RACube Technologies" },
      { name: "description", content: "Real outcomes for Fortune-class enterprises. CX, Genesys, AI and cloud transformation success stories." },
      { property: "og:title", content: "Case Studies — RACube Technologies" },
      { property: "og:description", content: "Measurable outcomes from real RACube engagements." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Client success stories"
        title={<>Real outcomes for <span className="text-gradient">Fortune-class</span> enterprises.</>}
        subtitle="Selected programs delivered by RACube — measured in CSAT lift, AHT reduction, deflection and revenue."
      />
      <CaseStudies />
      <FlowDivider />
      <Metrics />
    </>
  );
}
