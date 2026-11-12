/**
 * Line-art "blueprints" for every product.
 * Each piece is drawn in a 480 × 300 elevation, floor at y = 262.
 *  - shapes  → outlined, then filled with a material tone
 *  - details → stroke-only lines (seams, flutes, handles)
 *  - dims    → dimension annotations shown while in "blueprint" mode
 *
 * Swap any of these for real product photography later — see README.
 */

export type Tone = "fabric" | "wood" | "stone" | "linen" | "dark" | "accent" | "brass";
export type Shape = { d: string; tone: Tone };
export type ArtKind =
  | "sofa"
  | "curved"
  | "lounge"
  | "coffee"
  | "dining"
  | "bed"
  | "media"
  | "kitchen";

export type Art = {
  shapes: Shape[];
  details: string[];
  dims: { w: [number, number, string]; h?: [number, number, number, string] };
};

const flutes = (x1: number, x2: number, y1: number, y2: number, step = 9) => {
  let d = "";
  for (let x = x1 + step; x < x2 - 2; x += step) d += `M${x} ${y1} V${y2} `;
  return d.trim();
};

const taperedFlutes = () => {
  // pedestal goes from 170–310 at y204 to 182–298 at y262
  let d = "";
  for (let i = 1; i < 14; i++) {
    const t = i / 14;
    const top = 170 + 140 * t;
    const bottom = 182 + 116 * t;
    d += `M${top.toFixed(1)} 204 L${bottom.toFixed(1)} 262 `;
  }
  return d.trim();
};

export const ARTS: Record<ArtKind, Art> = {
  sofa: {
    shapes: [
      { d: "M52 222 H428 V238 H52 Z", tone: "fabric" },
      { d: "M86 186 V124 Q86 106 104 106 H376 Q394 106 394 124 V186 Z", tone: "fabric" },
      { d: "M94 182 V128 Q94 116 106 116 H180 Q190 116 190 128 V182 Z", tone: "fabric" },
      { d: "M195 182 V128 Q195 116 207 116 H273 Q285 116 285 128 V182 Z", tone: "fabric" },
      { d: "M290 182 V128 Q290 116 302 116 H374 Q386 116 386 128 V182 Z", tone: "fabric" },
      { d: "M106 180 L102 152 Q101 145 108 145 L150 147 Q157 147 156 154 L154 180 Q153 185 147 185 L112 185 Q107 185 106 180 Z", tone: "accent" },
      { d: "M88 208 V194 Q88 184 98 184 H180 Q189 184 189 194 V208 Z", tone: "fabric" },
      { d: "M189 208 V194 Q189 184 199 184 H281 Q291 184 291 194 V208 Z", tone: "fabric" },
      { d: "M291 208 V194 Q291 184 301 184 H382 Q392 184 392 194 V208 Z", tone: "fabric" },
      { d: "M88 208 H392 V222 H88 Z", tone: "fabric" },
      { d: "M52 222 V152 Q52 132 70 132 Q88 132 88 152 V222 Z", tone: "fabric" },
      { d: "M392 222 V152 Q392 132 410 132 Q428 132 428 152 V222 Z", tone: "fabric" },
      { d: "M66 238 L62 262 H70 L76 238 Z", tone: "wood" },
      { d: "M404 238 L410 262 H418 L414 238 Z", tone: "wood" },
    ],
    details: ["M58 150 Q70 142 82 150", "M398 150 Q410 142 422 150", "M58 230 H422"],
    dims: { w: [52, 428, "240 cm"], h: [106, 262, 452, "85 cm"] },
  },

  curved: {
    shapes: [
      { d: "M56 204 Q52 124 240 110 Q428 124 424 204 Z", tone: "fabric" },
      { d: "M44 206 Q240 190 436 206 V230 Q240 244 44 230 Z", tone: "fabric" },
      { d: "M300 196 Q300 182 316 182 H370 Q386 182 386 196 Q386 206 370 206 H316 Q300 206 300 196 Z", tone: "accent" },
      { d: "M70 232 Q240 248 410 232 V244 Q240 258 70 244 Z", tone: "dark" },
      { d: "M92 247 V262 H104 V249 Z", tone: "brass" },
      { d: "M376 249 V262 H388 V247 Z", tone: "brass" },
    ],
    details: [
      "M100 152 Q98 176 100 198",
      "M160 130 V196",
      "M220 120 V194",
      "M260 120 V194",
      "M320 130 V196",
      "M380 152 Q382 176 380 198",
    ],
    dims: { w: [44, 436, "320 cm"], h: [110, 262, 458, "78 cm"] },
  },

  lounge: {
    shapes: [
      { d: "M128 228 H352 V242 H128 Z", tone: "fabric" },
      { d: "M150 212 V142 Q150 94 240 94 Q330 94 330 142 V212 Z", tone: "fabric" },
      { d: "M128 228 V164 Q128 146 144 146 Q160 146 160 164 V228 Z", tone: "fabric" },
      { d: "M320 228 V164 Q320 146 336 146 Q352 146 352 164 V228 Z", tone: "fabric" },
      { d: "M160 214 V198 Q160 186 172 186 H308 Q320 186 320 198 V214 Z", tone: "fabric" },
      { d: "M160 214 H320 V228 H160 Z", tone: "fabric" },
      { d: "M146 242 L140 262 H148 L156 242 Z", tone: "wood" },
      { d: "M324 242 L332 262 H340 L334 242 Z", tone: "wood" },
      { d: "M380 196 H446 V202 H380 Z", tone: "wood" },
      { d: "M409 202 H417 V256 H409 Z", tone: "brass" },
      { d: "M394 256 H432 V262 H394 Z", tone: "brass" },
      { d: "M400 196 Q392 176 404 166 H422 Q434 176 426 196 Z", tone: "accent" },
    ],
    details: ["M200 132 h0.1 M240 122 h0.1 M280 132 h0.1 M220 158 h0.1 M260 158 h0.1", "M406 166 Q398 140 388 128 M418 166 Q428 138 440 132"],
    dims: { w: [128, 352, "88 cm"], h: [94, 262, 106, "92 cm"] },
  },

  coffee: {
    shapes: [
      { d: "M170 204 H310 L298 262 H182 Z", tone: "wood" },
      { d: "M102 196 Q102 188 112 188 H368 Q378 188 378 196 V204 H102 Z", tone: "stone" },
      { d: "M196 188 Q196 168 228 166 H252 Q284 168 284 188 Z", tone: "accent" },
      { d: "M300 188 V180 H352 V188 Z", tone: "fabric" },
      { d: "M306 180 V174 H346 V180 Z", tone: "linen" },
    ],
    details: [taperedFlutes()],
    dims: { w: [102, 378, "Ø 120 cm"], h: [188, 262, 420, "42 cm"] },
  },

  dining: {
    shapes: [
      { d: "M54 96 Q54 86 64 86 H74 Q84 86 84 96 V186 H54 Z", tone: "fabric" },
      { d: "M54 184 H116 Q122 184 122 190 V200 H54 Z", tone: "fabric" },
      { d: "M58 200 V262 H66 V200 Z", tone: "wood" },
      { d: "M110 200 V262 H118 V200 Z", tone: "wood" },
      { d: "M426 96 Q426 86 416 86 H406 Q396 86 396 96 V186 H426 Z", tone: "fabric" },
      { d: "M426 184 H364 Q358 184 358 190 V200 H426 Z", tone: "fabric" },
      { d: "M422 200 V262 H414 V200 Z", tone: "wood" },
      { d: "M370 200 V262 H362 V200 Z", tone: "wood" },
      { d: "M96 148 H384 V160 H96 Z", tone: "wood" },
      { d: "M110 160 H370 V172 H110 Z", tone: "wood" },
      { d: "M118 172 L124 262 H134 L132 172 Z", tone: "wood" },
      { d: "M348 172 L346 262 H356 L362 172 Z", tone: "wood" },
      { d: "M228 148 Q218 128 232 112 H248 Q262 128 252 148 Z", tone: "accent" },
    ],
    details: [
      "M236 112 Q230 90 220 78 M244 112 Q252 86 266 74 M240 112 V82",
      "M150 148 Q150 142 170 142 Q190 142 190 148",
      "M290 148 Q290 142 310 142 Q330 142 330 148",
    ],
    dims: { w: [96, 384, "200 cm"], h: [148, 262, 456, "76 cm"] },
  },

  bed: {
    shapes: [
      { d: "M80 250 V98 Q80 80 98 80 H382 Q400 80 400 98 V250 Z", tone: "fabric" },
      { d: "M14 196 H66 V254 H14 Z", tone: "wood" },
      { d: "M414 196 H466 V254 H414 Z", tone: "wood" },
      { d: "M32 196 Q28 182 40 174 Q52 182 48 196 Z", tone: "accent" },
      { d: "M26 174 L32 150 H48 L54 174 Z", tone: "linen" },
      { d: "M424 196 V186 H458 V196 Z", tone: "accent" },
      { d: "M428 186 V178 H452 V186 Z", tone: "linen" },
      { d: "M70 204 H410 V240 H70 Z", tone: "wood" },
      { d: "M84 204 V178 Q84 168 94 168 H386 Q396 168 396 178 V204 Z", tone: "linen" },
      { d: "M108 168 Q102 140 126 134 H204 Q226 140 218 168 Z", tone: "linen" },
      { d: "M262 168 Q254 140 276 134 H354 Q378 140 372 168 Z", tone: "linen" },
      { d: "M206 168 Q200 150 222 146 H258 Q280 150 274 168 Z", tone: "accent" },
      { d: "M84 188 H396 V204 H84 Z", tone: "fabric" },
      { d: "M80 240 V262 H90 V240 Z", tone: "wood" },
      { d: "M390 240 V262 H400 V240 Z", tone: "wood" },
    ],
    details: [flutes(80, 400, 92, 130, 40), "M14 224 H66 M414 224 H466"],
    dims: { w: [70, 410, "180 × 200 cm"] },
  },

  media: {
    shapes: [
      { d: "M140 36 H340 V142 H140 Z", tone: "dark" },
      { d: "M44 162 H436 V168 H44 Z", tone: "wood" },
      { d: "M50 168 H430 V232 H50 Z", tone: "wood" },
      { d: "M66 232 L62 262 H70 L76 232 Z", tone: "brass" },
      { d: "M404 232 L410 262 H418 L414 232 Z", tone: "brass" },
      { d: "M384 162 Q374 140 388 126 H400 Q414 140 404 162 Z", tone: "accent" },
      { d: "M78 162 V152 H132 V162 Z", tone: "fabric" },
      { d: "M84 152 V144 H124 V152 Z", tone: "linen" },
    ],
    details: [
      "M145 168 V232 M240 168 V232 M335 168 V232",
      flutes(50, 145, 176, 224),
      flutes(145, 240, 176, 224),
      flutes(240, 335, 176, 224),
      flutes(335, 430, 176, 224),
      "M152 48 L196 48",
    ],
    dims: { w: [44, 436, "220 cm"], h: [162, 262, 458, "60 cm"] },
  },

  kitchen: {
    shapes: [
      { d: "M60 44 H420 V118 H60 Z", tone: "wood" },
      { d: "M60 118 H420 V172 H60 Z", tone: "stone" },
      { d: "M110 172 V140 Q110 132 124 132 H136 Q150 132 150 140 V172 Z", tone: "wood" },
      { d: "M330 172 Q326 156 336 150 H352 Q362 156 358 172 Z", tone: "accent" },
      { d: "M50 172 H430 V182 H50 Z", tone: "stone" },
      { d: "M60 182 H420 V254 H60 Z", tone: "wood" },
      { d: "M64 254 H416 V262 H64 Z", tone: "dark" },
    ],
    details: [
      "M150 44 V118 M240 44 V118 M330 44 V118",
      "M150 182 V254 M240 182 V254 M330 182 V254 M60 206 H150 M330 206 H420",
      "M138 96 V110 M162 96 V110 M318 96 V110 M342 96 V110",
      "M90 194 H120 M360 194 H390 M138 216 V236 M162 216 V236 M228 200 V230 M252 200 V230 M318 216 V236 M342 216 V236",
      "M240 172 V150 Q240 140 252 140 H262 V146",
    ],
    dims: { w: [50, 430, "Made to measure"] },
  },
};
