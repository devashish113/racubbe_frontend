import { createFileRoute } from "@tanstack/react-router";
import { Careers } from "@/components/site/HomePage";
import { PageHero } from "@/components/site/FlipCards";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers - RACube Technologies" },
      { name: "description", content: "Join RACube. Build the future of enterprise CX with a team of architects, AI engineers and cloud specialists." },
      { property: "og:title", content: "Careers at RACube Technologies" },
      { property: "og:description", content: "Build the future of enterprise CX." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Careers at RACube"
        title={<>Build the future of <span className="text-gradient">enterprise CX</span>.</>}
        subtitle="Remote-first, globally distributed, top 1% engineering - shipping for the world's most demanding enterprises."
      />
      <Careers />
    </>
  );
}
