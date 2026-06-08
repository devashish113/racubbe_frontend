import { Link, useRouterState } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@/assets/racube-logo.png";

const nav = [
  { label: "Solutions", to: "/solutions" },
  { label: "Products", to: "/products" },
  { label: "Genesys", to: "/genesys" },
  { label: "AI Lab", to: "/ai-lab" },
  { label: "Industries", to: "/industries" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "About", to: "/about" },
  { label: "Careers", to: "/careers" },
] as const;

export function SiteHeader() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["rgba(5,8,22,0.4)", "rgba(5,8,22,0.85)"]);
  const border = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0.04)", "rgba(255,255,255,0.1)"]);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <motion.header
      style={{ backgroundColor: bg, borderColor: border }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b transition-colors"
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src={logo}
            alt="RACube Technologies"
            className="h-15 w-auto drop-shadow-[0_0_18px_rgba(27,117,255,0.45)] group-hover:scale-105 transition"
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm text-muted-foreground">
          {nav.map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.label}
                to={n.to}
                className={`relative text-[16px] transition-colors ${active ? "text-foreground" : "hover:text-foreground"}`}
                style={{ fontWeight:400 }}
              >
                {n.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-1.5 h-0.5 bg-aurora rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className="text-sm font-medium px-4 py-2 rounded-full bg-aurora text-white shadow-glow hover:scale-[1.03] transition inline-flex items-center gap-1.5"
          >
            Schedule Consultation <ArrowRight size={14} />
          </Link>
        </div>
        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden glass-strong border-t border-white/10 px-6 py-4 space-y-3">
          {nav.map((n) => (
            <Link key={n.label} to={n.to} onClick={() => setOpen(false)} className="block text-sm">
              {n.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="block text-sm font-medium text-gradient">
            Schedule Consultation →
          </Link>
        </div>
      )}
    </motion.header>
  );
}
