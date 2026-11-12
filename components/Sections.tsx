"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import FurnitureArt from "./FurnitureArt";
import { useProductModal } from "./ProductModal";
import { PRODUCTS, Product, ROOMS, Room } from "@/lib/products";
import { SITE } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- Shared reveal ---------- */
function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function SplitTitle({ text, className }: { text: string; className?: string }) {
  return (
    <motion.h2 className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
      {text.split("|").map((line, i) => (
        <span className="line" key={i}>
          <motion.span
            variants={{ hidden: { y: "110%" }, show: { y: 0, transition: { duration: 1.1, delay: i * 0.12, ease } } }}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        </span>
      ))}
    </motion.h2>
  );
}

/* ---------- Collection ---------- */
export function Collection() {
  const [room, setRoom] = useState<"All" | Room>("All");
  const list = PRODUCTS.filter((p) => room === "All" || p.room === room);

  return (
    <section className="collection" id="collection">
      <div className="section-head">
        <p className="eyebrow">The Collection</p>
        <SplitTitle className="display" text="Pieces for every|<em>room you live in.</em>" />
        <p className="section-head__sub">
          Hover any piece to see its blueprint. Open one to try it in different fabrics and timbers.
        </p>
      </div>

      <div className="filters" role="tablist">
        {ROOMS.map((r) => (
          <button key={r} className={`filters__btn ${room === r ? "is-active" : ""}`} onClick={() => setRoom(r)} data-cursor="Filter">
            <span>{r}</span>
          </button>
        ))}
      </div>

      <motion.div className="grid" layout>
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <Card key={p.id} product={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function Card({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const { open } = useProductModal();
  const draw = useMotionValue(0);
  const fill = useMotionValue(0);
  const drawn = useRef(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });

  useEffect(() => {
    if (!inView) return;
    animate(draw, 1, { duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: 0.1 + (index % 3) * 0.12 });
    animate(fill, 1, {
      duration: 0.9,
      delay: 1.4 + (index % 3) * 0.12,
      onComplete: () => {
        drawn.current = true;
      },
    });
  }, [inView, draw, fill, index]);

  return (
    <motion.button
      ref={ref}
      layout
      className="card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.7, ease }}
      onClick={() => open(product.id)}
      onPointerEnter={() => drawn.current && animate(fill, 0, { duration: 0.6 })}
      onPointerLeave={() => {
        drawn.current && animate(fill, 1, { duration: 0.6 });
        rx.set(0);
        ry.set(0);
      }}
      onPointerMove={(e) => {
        const b = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - b.left) / b.width - 0.5) * 8);
        rx.set(-((e.clientY - b.top) / b.height - 0.5) * 8);
      }}
      style={{ rotateX: srx, rotateY: sry }}
      data-cursor="Configure"
    >
      <span className="card__index">{String(PRODUCTS.indexOf(product) + 1).padStart(2, "0")}</span>
      <span className="card__room">{product.room}</span>
      <div className="card__art">
        <FurnitureArt kind={product.kind} draw={draw} fill={fill} fabric={product.fabric} wood={product.wood} />
      </div>
      <div className="card__foot">
        <div>
          <h3>{product.name}</h3>
          <p>{product.tagline}</p>
        </div>
        <span className="card__plus" aria-hidden>
          +
        </span>
      </div>
    </motion.button>
  );
}

/* ---------- Craft ---------- */
const STEPS = [
  { t: "Sketch & measure", d: "Every order starts with a conversation and a tape measure. We draw the piece to fit your room, not a catalogue." },
  { t: "Choose the timber", d: "Solid hardwood is selected and seasoned for the frame, because the parts you never see decide how long it lasts." },
  { t: "Joinery & upholstery", d: "Our craftsmen join, pad and upholster by hand: tight seams, deep cushions, corners that line up." },
  { t: "Finish & deliver", d: "Oiled, polished and inspected under the showroom lights, then delivered and placed in your home." },
];

export function Craft() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="craft" id="craft">
      <div className="section-head section-head--split">
        <div>
          <p className="eyebrow">Craftsmanship</p>
          <SplitTitle className="display" text="Four years|<em>at the bench.</em>" />
        </div>
        <Reveal className="section-head__sub">
          <p>
            Lusso is an Ethiopian furniture house built on three things: premium design, quality finishing and fair pricing.
            Each piece goes through the same four hands-on stages before it reaches your door.
          </p>
        </Reveal>
      </div>

      <div className="steps" ref={ref}>
        <div className="steps__rail">
          <motion.span style={{ scaleX: line }} />
        </div>
        {STEPS.map((s, i) => (
          <Reveal key={s.t} delay={i * 0.12} className="step">
            <span className="step__dot" />
            <span className="step__num">0{i + 1}</span>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </Reveal>
        ))}
      </div>

      <div className="promise">
        {[
          ["Premium design", "Considered proportions and modern lines that sit well in any home."],
          ["Quality finishing", "Hand-rubbed oils, tight upholstery and hardware that's built to be used every day."],
          ["Fair pricing", "Luxury quality made locally, so you pay for the craft and not the import."],
        ].map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.1} className="promise__item">
            <span className="promise__glyph">{["I", "II", "III"][i]}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Chapters (who we design for) ---------- */
const CHAPTERS = [
  {
    k: "The first home",
    h: "For newlyweds",
    d: "Setting up your first place together? Coordinated sofas, dining sets, beds and TV stands that feel like a set without looking matched.",
    kind: "sofa" as const,
    fabric: "#c7b28c",
  },
  {
    k: "The family home",
    h: "For growing families",
    d: "Durable frames, fabrics that forgive and full living-room sets that handle movie nights, homework and Sunday guests.",
    kind: "dining" as const,
    fabric: "#1f4a3b",
  },
  {
    k: "The bespoke home",
    h: "Made to your spec",
    d: "Custom sofas, fitted kitchens and complete furnishing projects, with exclusive finishes designed with you from the first sketch.",
    kind: "curved" as const,
    fabric: "#94502a",
  },
];

export function Chapters() {
  const [active, setActive] = useState(0);
  return (
    <section className="chapters">
      <div className="section-head">
        <p className="eyebrow">Made for every chapter</p>
        <SplitTitle className="display" text="Whatever stage|<em>your home is in.</em>" />
      </div>
      <div className="chapters__row">
        {CHAPTERS.map((c, i) => (
          <ChapterPanel key={c.k} c={c} i={i} active={active === i} onActivate={() => setActive(i)} />
        ))}
      </div>
    </section>
  );
}

function ChapterPanel({
  c,
  i,
  active,
  onActivate,
}: {
  c: (typeof CHAPTERS)[number];
  i: number;
  active: boolean;
  onActivate: () => void;
}) {
  const draw = useMotionValue(1);
  const fill = useMotionValue(active ? 1 : 0);
  useEffect(() => {
    animate(fill, active ? 1 : 0, { duration: 0.8 });
  }, [active, fill]);

  return (
    <div
      className={`chapter ${active ? "is-active" : ""}`}
      onMouseEnter={onActivate}
      onClick={onActivate}
      data-cursor={active ? undefined : "Open"}
    >
      <span className="chapter__num">0{i + 1}</span>
      <span className="chapter__vertical">{c.k}</span>
      <div className="chapter__body">
        <p className="eyebrow">{c.h}</p>
        <h3>{c.k}</h3>
        <p>{c.d}</p>
        <div className="chapter__art">
          <FurnitureArt kind={c.kind} draw={draw} fill={fill} fabric={c.fabric} wood="#5b3521" hideDims />
        </div>
      </div>
    </div>
  );
}

/* ---------- Visit / contact ---------- */
export function Visit() {
  const [sent, setSent] = useState(false);
  return (
    <section className="visit" id="visit">
      <div className="visit__left">
        <p className="eyebrow">The Showroom</p>
        <SplitTitle className="display" text="Come sit|<em>on it first.</em>" />
        <Reveal>
          <p className="visit__lede">
            Furniture is felt before it's bought. Visit the showroom to sink into the sofas, run a hand along the timber and
            talk through your space with our team.
          </p>
          <ul className="visit__info">
            <li>
              <span>Address</span>
              {SITE.showroom}
            </li>
            <li>
              <span>Hours</span>
              {SITE.hours}
            </li>
            <li>
              <span>Phone</span>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </li>
          </ul>
        </Reveal>
        <div className="socials">
          {SITE.socials.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <a href={s.href} target="_blank" rel="noreferrer" className="social" data-cursor="Follow">
                <span className="social__name">{s.name}</span>
                <span className="social__note">{s.note}</span>
                <span className="social__arrow">↗</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="visit__form-wrap" delay={0.15}>
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form
              key="form"
              className="form"
              exit={{ opacity: 0, y: -20 }}
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: connect to your backend, Formspree, or Telegram bot here.
                setSent(true);
              }}
            >
              <h3>Request a visit or quote</h3>
              <label>
                <input required name="name" placeholder=" " />
                <span>Your name</span>
              </label>
              <label>
                <input required name="phone" type="tel" placeholder=" " />
                <span>Phone number</span>
              </label>
              <label>
                <select name="interest" defaultValue="">
                  <option value="" disabled>
                    I&apos;m interested in…
                  </option>
                  <option>Sofas & living-room sets</option>
                  <option>Dining sets</option>
                  <option>Beds & bedroom</option>
                  <option>TV stands</option>
                  <option>Fitted kitchen</option>
                  <option>A full home / bespoke project</option>
                </select>
              </label>
              <label>
                <textarea name="message" rows={3} placeholder=" " />
                <span>Tell us about your space</span>
              </label>
              <button className="btn btn--gold btn--block" type="submit" data-cursor="Send">
                Send request
              </button>
            </motion.form>
          ) : (
            <motion.div key="done" className="form form--done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <img src="/lusso-mark.png" alt="" />
              <h3>Thank you.</h3>
              <p>Our team will call you shortly to arrange your visit.</p>
              <button className="btn btn--ghost" onClick={() => setSent(false)}>
                Send another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>
    </section>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  return (
    <footer className="footer" ref={ref}>
      <div className="footer__top">
        <img src="/lusso-logo.png" alt="Lusso Living" className="footer__logo" />
        <div className="footer__cols">
          <div>
            <h4>Explore</h4>
            <a href="#reel">The Reel</a>
            <a href="#collection">Collection</a>
            <a href="#craft">Craftsmanship</a>
            <a href="#visit">Showroom</a>
          </div>
          <div>
            <h4>Follow</h4>
            {SITE.socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer">
                {s.name}
              </a>
            ))}
          </div>
          <div>
            <h4>Contact</h4>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <span>{SITE.hours}</span>
          </div>
        </div>
      </div>
      <motion.div className="footer__word" style={{ y }} aria-hidden>
        LUSSO
      </motion.div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Lusso Living. Handcrafted in Ethiopia.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
