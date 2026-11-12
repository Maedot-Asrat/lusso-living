"use client";

import { useCallback, useState } from "react";
import { Cursor, Loader, Nav, SmoothScroll } from "./Chrome";
import { Hero, Marquee, Statement } from "./Intro";
import Reel from "./Reel";
import { Chapters, Collection, Craft, Footer, Visit } from "./Sections";
import { ProductModalProvider } from "./ProductModal";

export default function Experience() {
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);
  return (
    <ProductModalProvider>
      <SmoothScroll />
      <Cursor />
      {!ready && <Loader onDone={done} />}
      <div className="grain" aria-hidden />
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Statement />
        <Reel />
        <Collection />
        <Craft />
        <Chapters />
        <Visit />
      </main>
      <Footer />
    </ProductModalProvider>
  );
}
