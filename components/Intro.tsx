"use client";

import { animate, motion, MotionValue, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import FurnitureArt from "./FurnitureArt";

/* ---------- Hero ---------- */
export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const draw = useMotionValue(0);
  const fill = useMotionValue(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const logoX = useTransform(sx, (v) => v * 14);
  const logoY = useTransform(sy, (v) => v * 10);
  const artX = useTransform(sx, (v) => v * -26);
  const rotY = useTransform(sx, (v) => v * 6);
  const rotX = useTransform(sy, (v) => v * -5);

  useEffect(() => {
    if (!ready) return;
    const a = animate(draw, 1, { duration: 3.2, ease: [0.65, 0, 0.35, 1], delay: 0.4 });
    return () => a.stop();
  }, [ready, draw]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const show = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__glow" />
      <div className="hero__frame" aria-hidden>
        <span /> <span /> <span /> <span />
      </div>

      <motion.div className="hero__sketch" style={{ y: artY, x: artX }} aria-hidden>
        <FurnitureArt kind="curved" draw={draw} fill={fill} fabric="#000" wood="#000" hideDims />
      </motion.div>

      <motion.div className="hero__center" style={{ scale, opacity: fade }}>
        <motion.div
          className="hero__logo"
          style={{ x: logoX, y: logoY, rotateX: rotX, rotateY: rotY }}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={ready ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="/lusso-logo.png" alt="Lusso Living — Luxury furniture for modern living" />
          <span className="hero__shine" aria-hidden />
        </motion.div>
      </motion.div>

      <div className="hero__bottom">
        <motion.p className="hero__lede" {...show(0.9)}>
          Sofas, dining sets, beds and fitted kitchens, designed in-house and <em>finished by hand</em> in Ethiopia.
        </motion.p>
        <motion.a href="#statement" className="hero__scroll" {...show(1.1)} data-cursor="Scroll">
          <span>Scroll</span>
          <i />
        </motion.a>
        <motion.ul className="hero__meta" {...show(1.0)}>
          <li>
            <strong>04</strong> Years at the bench
          </li>
          <li>
            <strong>∞</strong> Made-to-order finishes
          </li>
        </motion.ul>
      </div>
    </section>
  );
}

/* ---------- Statement: words light up as you scroll ---------- */
const STATEMENT =
  "Every Lusso piece begins as a single gold line on paper and ends as the place your family gathers. We design it, choose the timber, build the frame and finish it by hand, then deliver it at a price that stays fair.";

export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = STATEMENT.split(" ");
  return (
    <section className="statement" id="statement" ref={ref}>
      <div className="statement__sticky">
        <p className="eyebrow">The Lusso way</p>
        <p className="statement__text">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} gold={/gold|hand|fair/.test(w)}>
              {w}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  gold,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  gold: boolean;
}) {
  const start = range[0] * 0.85;
  const end = range[1] * 0.85;
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className={gold ? "gold-text" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

/* ---------- Marquee ---------- */
export function Marquee() {
  const items = ["Sofas", "Dining Sets", "Beds", "TV Stands", "Fitted Kitchens", "Bespoke Pieces", "Living-Room Sets"];
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        {row.map((t, i) => (
          <span key={i}>
            {t} <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
