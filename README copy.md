# Lusso Living — website

Next.js 16 (App Router) · React 19 · Framer Motion · Lenis smooth scroll. No backend needed.

## Run it
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```
Deploys to Vercel as-is (import the folder/repo, no settings needed).

## What's on the page
1. **Loader**: the gold L mark rises in, "LUSSO" letters reveal, then a curtain lifts.
2. **Hero**: the logo with mouse-parallax tilt and a light sheen. A gold sketch of a curved sofa draws itself behind it.
3. **Statement**: words light up one by one as you scroll.
4. **The Atelier Reel** (the signature piece): a pinned, horizontally scrolling stage. As each product slides in, its blueprint draws itself in gold with dimension lines. Then the materials pour in until the finished piece stands on the floor.
5. **Collection**: room filters and 3D-tilt cards. Hovering a card strips it back to its blueprint. Clicking opens the **Atelier configurator**, where you can switch upholstery and timber live, toggle the blueprint, and send an inquiry by Telegram or phone.
6. **Craftsmanship**: the four-step process and the three brand promises (premium design, quality finishing, fair pricing).
7. **Made for every chapter**: expanding panels for newlyweds, families and bespoke clients.
8. **Showroom & contact**: socials, hours and an inquiry form.

## Edit content
| What | Where |
|---|---|
| Phone, address, hours, social links | `lib/site.ts` |
| Products, descriptions, specs, default colours | `lib/products.ts` |
| Which products appear in the Reel | `REEL_IDS` in `lib/products.ts` |
| Fabric & timber swatches | `FABRICS` / `WOODS` in `lib/products.ts` |
| Furniture line drawings | `lib/art.ts` |
| Colours, fonts, spacing | `:root` in `app/globals.css` |
| Logo files | `public/lusso-logo.png`, `public/lusso-mark.png` |

**Before launch:** the contact details and product names/specs are placeholders. The inquiry form shows a thank-you
state but doesn't send anywhere yet (see the `TODO` in `components/Sections.tsx`). Connect it to Formspree, a
Telegram bot or your own API.
