import { createFileRoute } from "@tanstack/react-router";
import { Industries, CaseStudies } from "@/components/site/HomePage";
import { PageHero } from "@/components/site/FlipCards";
import { FlowDivider } from "@/components/site/MotionFX";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — RACube Technologies" },
      { name: "description", content: "Deep CX, AI and cloud expertise across banking, healthcare, retail, telecom, insurance, government and logistics." },
      { property: "og:title", content: "Industries — RACube Technologies" },
      { property: "og:description", content: "Industry-deep delivery for regulated, customer-led enterprises." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>Built for <span className="text-gradient">regulated, customer-led</span> enterprises.</>}
        subtitle="We design and run CX transformations in the most demanding industries on earth."
      />
      <Industries />
      <FlowDivider />
      <CaseStudies />
    </>
  );
}
