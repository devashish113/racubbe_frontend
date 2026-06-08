import { motion, useMotionValue, useSpring, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

/* ============================================================
   Global animated backdrop: particles + parallax blobs + grid
   ============================================================ */
export function AnimatedBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const sy = useSpring(mouseY, { stiffness: 40, damping: 18 });

  // mouse parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 60;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  // particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let particles: P[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      const count = Math.min(90, Math.floor((w * h) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
        a: Math.random() * 0.5 + 0.2,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      // connection lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            const o = (1 - d2 / 14000) * 0.18;
            ctx.strokeStyle = `rgba(27,117,255,${o})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(180,210,255,${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* animated aurora blobs with parallax */}
      <motion.div style={{ x: sx, y: sy }} className="absolute inset-0">
        <motion.div
          animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[15%] h-[520px] w-[520px] rounded-full bg-[#005BFF] blur-[160px] opacity-25"
        />
        <motion.div
          animate={{ x: [0, -50, 40, 0], y: [0, 30, -20, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] right-[10%] h-[460px] w-[460px] rounded-full bg-[#1B75FF] blur-[160px] opacity-20"
        />
        <motion.div
          animate={{ x: [0, 40, -30, 0], y: [0, -30, 40, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[5%] left-[40%] h-[420px] w-[420px] rounded-full bg-[#E53935] blur-[160px] opacity-15"
        />
      </motion.div>

      {/* animated grid */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_80%)]" />

      {/* particle network */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* scan lines */}
      <motion.div
        animate={{ y: ["-10%", "110%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-[#1B75FF]/[0.06] to-transparent"
      />
    </div>
  );
}

/* ============================================================
   Magnetic cursor glow
   ============================================================ */
export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 200, damping: 25 });
  const sy = useSpring(y, { stiffness: 200, damping: 25 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[55] hidden md:block"
    >
      <div className="-translate-x-1/2 -translate-y-1/2 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(27,117,255,0.18),transparent_60%)] mix-blend-screen" />
    </motion.div>
  );
}

/* ============================================================
   Animated section divider with flowing data line
   ============================================================ */
export function FlowDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <motion.div
        animate={{ x: ["-30%", "130%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 h-px w-[30%] bg-gradient-to-r from-transparent via-[#1B75FF] to-transparent shadow-[0_0_20px_#1B75FF]"
      />
    </div>
  );
}

/* ============================================================
   Parallax section wrapper
   ============================================================ */
export function ParallaxLayer({
  children,
  speed = 60,
  className = "",
}: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
