import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/components/site/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RACube Technologies — Genesys Premier Partner | Enterprise CX, Cloud & AI" },
      { name: "description", content: "Genesys Premier Partner helping global enterprises modernize CCaaS, UCaaS, AI, Cloud and CRM. Customer Experience transformation, contact center modernization and Salesforce consulting." },
      { name: "keywords", content: "Genesys Premier Partner, Genesys Cloud Consulting, CCaaS, UCaaS, Customer Experience Transformation, Contact Center Modernization, Salesforce Consulting, AI Customer Experience, Cloud Migration" },
      { property: "og:title", content: "RACube Technologies — Genesys Premier Partner" },
      { property: "og:description", content: "Enterprise CX, Cloud and AI transformation. Official Genesys Premier Partner." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});
