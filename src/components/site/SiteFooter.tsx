import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/racube-logo.png.asset.json";

const cols: { title: string; items: { label: string; to: string }[] }[] = [
  {
    title: "Solutions",
    items: [
      { label: "Genesys Cloud", to: "/genesys" },
      { label: "All Solutions", to: "/solutions" },
      { label: "AI Lab", to: "/ai-lab" },
      { label: "Case Studies", to: "/case-studies" },
    ],
  },
  {
    title: "Industries",
    items: [
      { label: "Banking", to: "/industries" },
      { label: "Healthcare", to: "/industries" },
      { label: "Retail", to: "/industries" },
      { label: "Telecom", to: "/industries" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-white/10">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#1B75FF] to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={logo.url} alt="RACube Technologies" className="h-15 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Genesys Premier Partner. Helping global enterprises modernize CCaaS, UCaaS, AI, Cloud and Customer Experience ecosystems.
            </p>
            <div className="flex gap-3 text-muted-foreground">
              {[Linkedin, Twitter, Github, Mail].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-lg border border-white/10 hover:border-[#1B75FF] hover:text-foreground transition">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-4">{c.title}</div>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {c.items.map((i) => (
                  <li key={i.label}>
                    <Link to={i.to} className="hover:text-foreground transition-colors">{i.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} RACube Technologies. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Official Genesys Premier Partner
          </div>
        </div>
      </div>
    </footer>
  );
}
