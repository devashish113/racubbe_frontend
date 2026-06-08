import { createFileRoute } from "@tanstack/react-router";
import { GenesysSection, Metrics, CaseStudies } from "@/components/site/HomePage";
import { PageHero } from "@/components/site/FlipCards";
import { FlowDivider } from "@/components/site/MotionFX";
import { ScrollProcess } from "@/components/site/SignatureSections";

export const Route = createFileRoute("/genesys")({
  head: () => ({
    meta: [
      { title: "Genesys Premier Partner — RACube Technologies" },
      { name: "description", content: "Certified Genesys Cloud delivery — journey design, AI orchestration, WEM, analytics and managed services for global enterprises." },
      { property: "og:title", content: "Genesys Premier Partner — RACube" },
      { property: "og:description", content: "End-to-end Genesys Cloud delivery from a Premier Partner." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Strategic partnership"
        title={<>Your trusted <span className="text-gradient">Genesys Premier Partner</span>.</>}
        subtitle="Certified architects, proven playbooks, measurable CX outcomes — across Genesys Cloud, PureConnect and PureCloud."
      />
      <GenesysSection />
      <FlowDivider />
      <ScrollProcess />
      <FlowDivider />
      <Metrics />
      <FlowDivider />
      <CaseStudies />
    </>
  );
}
