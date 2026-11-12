"use client";

import Lenis from "lenis";
import {
  AnimatePresence,
  cancelFrame,
  frame,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

/* ---------- Smooth scroll ---------- */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: false });
    (window as unknown as { __lenis: Lenis }).__lenis = lenis;
    // Drive Lenis from Framer Motion's frame loop so scroll position and every
    // scroll-linked animation update in the same frame (no 1-frame jitter).
    const raf = ({ timestamp }: { timestamp: number }) => lenis.raf(timestamp);
    frame.update(raf, true);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href")!);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.6 });
      }
    };
    document.addEventListener("click", onClick);

    const obs = new MutationObserver(() => {
      if (document.documentElement.classList.contains("modal-open")) lenis.stop();
      else lenis.start();
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelFrame(raf);
      document.removeEventListener("click", onClick);
      obs.disconnect();
      lenis.destroy();
    };
  }, []);
  return null;
}

/* ---------- Custom cursor ---------- */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(t ? t.dataset.cursor || "" : null);
    };
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", d);
    window.addEventListener("pointerup", u);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", d);
      window.removeEventListener("pointerup", u);
    };
  }, [x, y]);

  if (!enabled) return null;
  const big = label !== null;
  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div
        className={`cursor-ring ${big ? "is-big" : ""}`}
        style={{ x: rx, y: ry }}
        animate={{ scale: down ? 0.85 : 1 }}
      >
        <AnimatePresence>
          {big && label && (
            <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

/* ---------- Loader ---------- */
export function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("modal-open");
    const start = performance.now();
    const total = 2100;
    let id = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) id = requestAnimationFrame(tick);
      else {
        setLeaving(true);
        setTimeout(() => {
          document.documentElement.classList.remove("modal-open");
          onDone();
        }, 900);
      }
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [onDone]);

  return (
    <motion.div
      className="loader"
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      animate={leaving ? { clipPath: "inset(0 0 100% 0)" } : {}}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="loader__inner">
        <motion.img
          src="/lusso-mark.png"
          alt=""
          className="loader__mark"
          initial={{ clipPath: "inset(100% 0 0 0)", y: 30 }}
          animate={{ clipPath: "inset(0% 0 0 0)", y: 0 }}
          transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
        />
        <div className="loader__word">
          {"LUSSO".split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.6 + i * 0.07, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {c}
            </motion.span>
          ))}
        </div>
        <div className="loader__bar">
          <span style={{ transform: `scaleX(${count / 100})` }} />
        </div>
        <p className="loader__count">{String(count).padStart(3, "0")}</p>
      </div>
    </motion.div>
  );
}

/* ---------- Navigation ---------- */
const LINKS = [
  { href: "#reel", label: "The Reel" },
  { href: "#collection", label: "Collection" },
  { href: "#craft", label: "Craft" },
  { href: "#visit", label: "Visit" },
];

export function Nav({ ready }: { ready: boolean }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);

  useMotionValueEvent(scrollY, "change", (v) => {
    setSolid(v > 40);
    setHidden(v > last.current && v > 400 && !open);
    last.current = v;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("modal-open", open);
  }, [open]);

  return (
    <>
      <motion.header
        className={`nav ${solid ? "is-solid" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: ready && !hidden ? 0 : -100 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#top" className="nav__brand" data-cursor="Home">
          <img src="/lusso-mark.png" alt="" />
          <span>
            LUSSO <small>LIVING</small>
          </span>
        </a>
        <nav className="nav__links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} data-cursor="Go">
              <span data-text={l.label}>{l.label}</span>
            </a>
          ))}
        </nav>
        <a href="#visit" className="btn btn--outline nav__cta" data-cursor="Visit">
          Book a visit
        </a>
        <button className={`nav__burger ${open ? "is-open" : ""}`} onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <span />
          <span />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <em>0{i + 1}</em>
                {l.label}
              </motion.a>
            ))}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              {SITE.phone}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
