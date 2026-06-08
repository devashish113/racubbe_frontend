import { createFileRoute } from "@tanstack/react-router";
import { ContactExperience } from "@/components/site/HomePage";
import { PageHero } from "@/components/site/FlipCards";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — RACube Technologies" },
      { name: "description", content: "Book a consultation with a RACube Genesys / CX architect within 24 hours." },
      { property: "og:title", content: "Contact RACube Technologies" },
      { property: "og:description", content: "Book a consultation with a CX architect." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Book a consultation"
        title={<>Let's design your <span className="text-gradient">CX transformation</span>.</>}
        subtitle="Tell us a little about your engagement — we'll match you with the right Genesys / CX architect within 24 hours."
      />
      <ContactExperience />
    </>
  );
}
