"use client";

import { AnimatePresence, animate, motion, useMotionValue } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import FurnitureArt from "./FurnitureArt";
import { FABRICS, PRODUCTS, Product, WOODS } from "@/lib/products";
import { SITE } from "@/lib/site";

type Ctx = { open: (id: string) => void };
const ModalCtx = createContext<Ctx>({ open: () => {} });
export const useProductModal = () => useContext(ModalCtx);

export function ProductModalProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<Product | null>(null);
  const open = useCallback((id: string) => setActive(PRODUCTS.find((p) => p.id === id) ?? null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("modal-open", !!active);
  }, [active]);

  return (
    <ModalCtx.Provider value={{ open }}>
      {children}
      <AnimatePresence>{active && <Atelier key={active.id} product={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </ModalCtx.Provider>
  );
}

function Atelier({ product, onClose }: { product: Product; onClose: () => void }) {
  const [fabric, setFabric] = useState(product.fabric);
  const [wood, setWood] = useState(product.wood);
  const [blueprint, setBlueprint] = useState(false);
  const draw = useMotionValue(0);
  const fill = useMotionValue(0);

  useEffect(() => {
    const a = animate(draw, 1, { duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.25 });
    const b = animate(fill, 1, { duration: 0.9, ease: "easeOut", delay: 1.35 });
    return () => {
      a.stop();
      b.stop();
    };
  }, [draw, fill]);

  useEffect(() => {
    animate(fill, blueprint ? 0 : 1, { duration: 0.7, ease: "easeInOut" });
  }, [blueprint, fill]);

  const fabricName = FABRICS.find((f) => f.hex === fabric)?.name ?? "Custom";
  const woodName = WOODS.find((w) => w.hex === wood)?.name ?? "Custom";
  const message = `Hello Lusso Living, I'm interested in the ${product.name} ${product.tagline.toLowerCase()} in ${fabricName} with ${woodName}.`;

  return (
    <motion.div
      className="atelier"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.2 } }}
      onClick={onClose}
      data-lenis-prevent
    >
      <motion.div
        className="atelier__panel"
        initial={{ clipPath: "inset(50% 0 50% 0)" }}
        animate={{ clipPath: "inset(0% 0 0% 0)" }}
        exit={{ clipPath: "inset(50% 0 50% 0)" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} configurator`}
      >
        <button className="atelier__close" onClick={onClose} data-cursor="Close" aria-label="Close">
          <span />
          <span />
        </button>

        <div className="atelier__stage">
          <span className="atelier__ghost">{product.italian}</span>
          <div className="atelier__art">
            <FurnitureArt kind={product.kind} draw={draw} fill={fill} fabric={fabric} wood={wood} />
          </div>
          <button className={`chip ${blueprint ? "is-on" : ""}`} onClick={() => setBlueprint((b) => !b)} data-cursor="Toggle">
            {blueprint ? "Show finished piece" : "View the blueprint"}
          </button>
        </div>

        <div className="atelier__info">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            {product.room} · {product.tagline}
          </motion.p>
          <motion.h3 className="atelier__name" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
            {product.name}
          </motion.h3>
          <motion.p className="atelier__desc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}>
            {product.description}
          </motion.p>

          <div className="swatches">
            <p className="swatches__label">
              Upholstery <em>{fabricName}</em>
            </p>
            <div className="swatches__row">
              {FABRICS.map((f) => (
                <button
                  key={f.hex}
                  className={`swatch ${fabric === f.hex ? "is-active" : ""}`}
                  style={{ background: f.hex }}
                  onClick={() => setFabric(f.hex)}
                  aria-label={f.name}
                  data-cursor={f.name.split(" ")[0]}
                />
              ))}
            </div>
            <p className="swatches__label">
              Timber <em>{woodName}</em>
            </p>
            <div className="swatches__row">
              {WOODS.map((w) => (
                <button
                  key={w.hex}
                  className={`swatch swatch--wood ${wood === w.hex ? "is-active" : ""}`}
                  style={{ background: w.hex }}
                  onClick={() => setWood(w.hex)}
                  aria-label={w.name}
                  data-cursor={w.name.split(" ").pop()}
                />
              ))}
            </div>
          </div>

          <dl className="specs">
            {product.specs.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="atelier__cta">
            <a
              className="btn btn--gold"
              href={SITE.telegram}
              target="_blank"
              rel="noreferrer"
              onClick={() => navigator.clipboard?.writeText(message).catch(() => {})}
              data-cursor="Inquire"
            >
              Inquire on Telegram
            </a>
            <a className="btn btn--ghost" href={SITE.phoneHref} data-cursor="Call">
              Call the showroom
            </a>
          </div>
          <p className="atelier__note">Your selection is copied to the clipboard, so you can paste it straight into the chat.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
