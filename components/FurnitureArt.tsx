"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { useId } from "react";
import { ARTS, ArtKind, Tone } from "@/lib/art";

type Props = {
  kind: ArtKind;
  draw: MotionValue<number>; // 0 → 1 : the gold sketch draws itself
  fill: MotionValue<number>; // 0 → 1 : materials pour in
  fabric: string;
  wood: string;
  className?: string;
  hideDims?: boolean;
};

const FIXED: Record<Exclude<Tone, "fabric" | "wood">, string> = {
  stone: "#d9cebc",
  linen: "#efe5d3",
  dark: "#140705",
  accent: "#b98647",
  brass: "#c9a15a",
};

export default function FurnitureArt({ kind, draw, fill, fabric, wood, className, hideDims }: Props) {
  const art = ARTS[kind];
  const uid = useId().replace(/:/g, "");
  const tone = (t: Tone) => (t === "fabric" ? fabric : t === "wood" ? wood : FIXED[t]);

  const lineOpacity = useTransform(fill, [0, 1], [1, 0.32]);
  const dimOpacity = useTransform([draw, fill] as MotionValue<number>[], ([d, f]: number[]) => {
    const inn = Math.min(1, Math.max(0, (d - 0.65) / 0.35));
    return inn * (1 - f * 0.92);
  });
  const shadowOpacity = useTransform(fill, [0, 1], [0, 0.9]);

  const [wx1, wx2, wLabel] = art.dims.w;
  const h = art.dims.h;

  return (
    <svg
      viewBox="0 0 480 300"
      className={className}
      role="img"
      aria-label={`${kind} illustration`}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={`gold-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7dfa6" />
          <stop offset="45%" stopColor="#d6a453" />
          <stop offset="100%" stopColor="#9b6a2d" />
        </linearGradient>
        <linearGradient id={`shade-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.38" />
        </linearGradient>
        <radialGradient id={`floor-${uid}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#000" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* floor shadow */}
      <motion.ellipse cx="240" cy="263" rx="230" ry="14" fill={`url(#floor-${uid})`} style={{ opacity: shadowOpacity }} />

      {/* material fills */}
      <motion.g style={{ opacity: fill }}>
        {art.shapes.map((s, i) => (
          <g key={i}>
            <path d={s.d} fill={tone(s.tone)} style={{ transition: "fill .8s cubic-bezier(.2,.7,.2,1)" }} />
            <path d={s.d} fill={`url(#shade-${uid})`} />
          </g>
        ))}
      </motion.g>

      {/* gold sketch */}
      <motion.g
        style={{ opacity: lineOpacity }}
        fill="none"
        stroke={`url(#gold-${uid})`}
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path d="M14 262 H466" style={{ pathLength: draw }} strokeOpacity={0.5} />
        {art.shapes.map((s, i) => (
          <motion.path key={i} d={s.d} style={{ pathLength: draw }} />
        ))}
        {art.details.map((d, i) => (
          <motion.path key={`d${i}`} d={d} style={{ pathLength: draw }} strokeWidth={d.includes("h0.1") ? 4 : 1} />
        ))}
      </motion.g>

      {/* blueprint dimensions */}
      {!hideDims && (
      <motion.g style={{ opacity: dimOpacity }} stroke="#d6a453" strokeWidth={0.8} fill="none">
        <path d={`M${wx1} 282 H${wx2} M${wx1} 276 V288 M${wx2} 276 V288`} />
        <text
          x={(wx1 + wx2) / 2}
          y={297}
          textAnchor="middle"
          fill="#e9c98a"
          stroke="none"
          style={{ font: "500 10px Jost, sans-serif", letterSpacing: "0.2em" }}
        >
          {wLabel.toUpperCase()}
        </text>
        {h && (
          <>
            <path d={`M${h[2]} ${h[0]} V${h[1]} M${h[2] - 5} ${h[0]} H${h[2] + 5} M${h[2] - 5} ${h[1]} H${h[2] + 5}`} />
            <text
              x={h[2]}
              y={h[0] - 8}
              textAnchor="middle"
              fill="#e9c98a"
              stroke="none"
              style={{ font: "500 10px Jost, sans-serif", letterSpacing: "0.2em" }}
            >
              {h[3].toUpperCase()}
            </text>
          </>
        )}
      </motion.g>
      )}
    </svg>
  );
}
