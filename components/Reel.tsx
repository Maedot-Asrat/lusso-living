"use client";

import { motion, MotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import FurnitureArt from "./FurnitureArt";
import { useProductModal } from "./ProductModal";
import { PRODUCTS, Product, REEL_IDS } from "@/lib/products";

/**
 * THE ATELIER REEL
 * A pinned, horizontally-scrolling stage. As each piece slides to centre,
 * its gold sketch draws itself, dimension lines appear, and then the
 * materials "pour in" until the finished piece stands on the floor.
 */
export default function Reel() {
  const items = REEL_IDS.map((id) => PRODUCTS.find((p) => p.id === id)!) as Product[];
  const panels = items.length + 1;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(panels - 1) * 100}vw`]);
  const ghostX = useTransform(scrollYProgress, [0, 1], ["10%", "-60%"]);
  const [index, setIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIndex(Math.min(items.length, Math.round(v * (panels - 1))));
  });

  return (
    <section className="reel" id="reel" ref={ref} style={{ height: `${panels * 100}vh` }}>
      <div className="reel__sticky">
        <motion.div className="reel__ghost" style={{ x: ghostX }} aria-hidden>
          Atelier · Atelier · Atelier
        </motion.div>

        <motion.div className="reel__track" style={{ x, width: `${panels * 100}vw` }}>
          <div className="reel__panel reel__panel--intro">
            <p className="eyebrow">The Atelier Reel</p>
            <h2 className="display">
              From a single line <br />
              <em>to the heart of your home.</em>
            </h2>
            <p className="reel__hint">
              Keep scrolling. Each piece is sketched in gold, measured, then dressed in its finished materials.
            </p>
            <div className="reel__arrow" aria-hidden>
              <span />
            </div>
          </div>

          {items.map((p, i) => (
            <ReelPanel key={p.id} product={p} i={i + 1} total={panels - 1} progress={scrollYProgress} />
          ))}
        </motion.div>

        <div className="reel__hud">
          <span className="reel__count">
            <b>{String(index).padStart(2, "0")}</b> / {String(items.length).padStart(2, "0")}
          </span>
          <div className="reel__bar">
            <motion.span style={{ scaleX: scrollYProgress }} />
          </div>
          <span className="reel__label">{index === 0 ? "Begin" : items[index - 1]?.tagline}</span>
        </div>
      </div>
    </section>
  );
}

function ReelPanel({
  product,
  i,
  total,
  progress,
}: {
  product: Product;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const { open } = useProductModal();
  const r = (a: number) => Math.max(0, Math.min(1, a / total));
  const draw = useTransform(progress, [r(i - 0.8), r(i - 0.2)], [0, 1]);
  const fill = useTransform(progress, [r(i - 0.28), r(i - 0.02)], [0, 1]);
  const textOpacity = useTransform(progress, [r(i - 0.55), r(i - 0.2), r(i + 0.35), r(i + 0.7)], [0, 1, 1, 0]);
  const textY = useTransform(progress, [r(i - 0.55), r(i - 0.2)], [60, 0]);
  const wordX = useTransform(progress, [r(i - 1), r(i + 1)], ["30%", "-30%"]);
  const artScale = useTransform(progress, [r(i - 0.8), r(i), r(i + 0.8)], [0.86, 1, 0.9]);
  const step = useTransform(draw, (d): string => (d < 0.98 ? "Sketching" : "Finishing"));

  return (
    <article className="reel__panel">
      <motion.span className="reel__word" style={{ x: wordX }} aria-hidden>
        {product.italian}
      </motion.span>

      <motion.div className="reel__text" style={{ opacity: textOpacity, y: textY }}>
        <p className="eyebrow">
          <span className="reel__num">{String(i).padStart(2, "0")}</span> {product.room}
        </p>
        <h3 className="reel__name">{product.name}</h3>
        <p className="reel__tag">{product.tagline}</p>
        <p className="reel__desc">{product.description}</p>
        <ul className="reel__specs">
          {product.specs.map((s) => (
            <li key={s.label}>
              <span>{s.label}</span>
              {s.value}
            </li>
          ))}
        </ul>
        <button className="btn btn--gold" onClick={() => open(product.id)} data-cursor="Open">
          Configure this piece
        </button>
      </motion.div>

      <motion.div className="reel__art" style={{ scale: artScale }}>
        <motion.span className="reel__status">{step}</motion.span>
        <FurnitureArt kind={product.kind} draw={draw} fill={fill} fabric={product.fabric} wood={product.wood} />
      </motion.div>
    </article>
  );
}
