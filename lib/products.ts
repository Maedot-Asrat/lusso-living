import type { ArtKind } from "./art";

export type Room = "Living" | "Dining" | "Bedroom" | "Media" | "Kitchen";

export type Product = {
  id: string;
  name: string;
  italian: string; // the word behind the name, used as a big background word
  room: Room;
  kind: ArtKind;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  fabric: string;
  wood: string;
  /** Optional: drop a real photo in /public/products and set it here */
  image?: string;
};

export const FABRICS = [
  { name: "Ivory Bouclé", hex: "#e8ddc9" },
  { name: "Cognac Leather", hex: "#94502a" },
  { name: "Emerald Velvet", hex: "#1f4a3b" },
  { name: "Midnight Velvet", hex: "#1f2a45" },
  { name: "Sand Linen", hex: "#c7b28c" },
  { name: "Terracotta", hex: "#ad5737" },
];

export const WOODS = [
  { name: "Walnut", hex: "#5b3521" },
  { name: "Natural Oak", hex: "#b88a57" },
  { name: "Ebony", hex: "#2b1a12" },
];

/*
 * Product names, descriptions and dimensions are placeholders written for the
 * launch — replace them with the real catalogue.
 */
export const PRODUCTS: Product[] = [
  {
    id: "aurelia",
    name: "Aurelia",
    italian: "Divano",
    room: "Living",
    kind: "sofa",
    tagline: "Three-seat sofa",
    description:
      "Rolled arms, deep feather-wrapped cushions and a solid hardwood frame. The sofa you'll still love when the kids are grown.",
    specs: [
      { label: "Dimensions", value: "240 × 95 × 85 cm" },
      { label: "Frame", value: "Kiln-dried hardwood" },
      { label: "Seats", value: "Three, deep-set" },
    ],
    fabric: "#e8ddc9",
    wood: "#5b3521",
  },
  {
    id: "tavola",
    name: "Tavola",
    italian: "Tavola",
    room: "Dining",
    kind: "dining",
    tagline: "Dining table & chairs",
    description:
      "A solid timber table with tapered legs and upholstered chairs, sized for Sunday lunches that run long.",
    specs: [
      { label: "Table", value: "200 × 100 × 76 cm" },
      { label: "Seats", value: "6 – 8 guests" },
      { label: "Finish", value: "Hand-rubbed oil" },
    ],
    fabric: "#c7b28c",
    wood: "#b88a57",
  },
  {
    id: "notte",
    name: "Notte",
    italian: "Notte",
    room: "Bedroom",
    kind: "bed",
    tagline: "Upholstered bed",
    description:
      "A tall channel-tufted headboard on a timber frame with matching bedside tables. Quiet, warm and made for slow mornings.",
    specs: [
      { label: "Mattress size", value: "180 × 200 cm" },
      { label: "Headboard", value: "Channel-tufted" },
      { label: "Includes", value: "Pair of bedside tables" },
    ],
    fabric: "#1f2a45",
    wood: "#5b3521",
  },
  {
    id: "linea",
    name: "Linea",
    italian: "Linea",
    room: "Media",
    kind: "media",
    tagline: "TV stand & media console",
    description:
      "Fluted push-to-open doors hide every cable and remote. Floats on slim brass legs so the room feels lighter.",
    specs: [
      { label: "Dimensions", value: "220 × 45 × 60 cm" },
      { label: "Doors", value: "Four, fluted" },
      { label: "Legs", value: "Brushed brass" },
    ],
    fabric: "#ad5737",
    wood: "#2b1a12",
  },
  {
    id: "cucina",
    name: "Cucina",
    italian: "Cucina",
    room: "Kitchen",
    kind: "kitchen",
    tagline: "Fitted kitchen",
    description:
      "Measured, built and installed for your exact space: soft-close cabinetry, a stone-look worktop and storage worked out with you.",
    specs: [
      { label: "Sizing", value: "Made to measure" },
      { label: "Hardware", value: "Soft-close throughout" },
      { label: "Service", value: "Design, build & install" },
    ],
    fabric: "#c7b28c",
    wood: "#b88a57",
  },
  {
    id: "sinuosa",
    name: "Sinuosa",
    italian: "Curva",
    room: "Living",
    kind: "curved",
    tagline: "Bespoke curved sofa",
    description:
      "A sweeping, channel-stitched curve for larger living rooms. Its length, depth and fabric are all set to your specification.",
    specs: [
      { label: "Dimensions", value: "From 320 cm" },
      { label: "Made", value: "To your specification" },
      { label: "Base", value: "Recessed plinth" },
    ],
    fabric: "#1f4a3b",
    wood: "#2b1a12",
  },
  {
    id: "velluto",
    name: "Velluto",
    italian: "Velluto",
    room: "Living",
    kind: "lounge",
    tagline: "Lounge chair & side table",
    description:
      "A rounded tub chair with button-tufted back and a brass-stem side table. The reading corner, solved.",
    specs: [
      { label: "Dimensions", value: "88 × 85 × 92 cm" },
      { label: "Back", value: "Button-tufted" },
      { label: "Pairs with", value: "Brass side table" },
    ],
    fabric: "#94502a",
    wood: "#2b1a12",
  },
  {
    id: "orbita",
    name: "Orbita",
    italian: "Orbita",
    room: "Living",
    kind: "coffee",
    tagline: "Pedestal coffee table",
    description:
      "A stone-look top on a hand-fluted timber drum. Heavy, grounded and quietly sculptural.",
    specs: [
      { label: "Dimensions", value: "Ø 120 × 42 cm" },
      { label: "Base", value: "Hand-fluted timber" },
      { label: "Top", value: "Stone-look finish" },
    ],
    fabric: "#ad5737",
    wood: "#5b3521",
  },
];

export const REEL_IDS = ["aurelia", "tavola", "notte", "linea", "cucina"];
export const ROOMS: ("All" | Room)[] = ["All", "Living", "Dining", "Bedroom", "Media", "Kitchen"];
