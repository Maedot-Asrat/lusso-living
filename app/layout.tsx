import type { Metadata, Viewport } from "next";
import "@fontsource/cinzel/400.css";
import "@fontsource/cinzel/500.css";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/jost/300.css";
import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lusso Living | Luxury Furniture for Modern Living",
  description:
    "Lusso Living designs and handcrafts premium sofas, dining sets, beds, TV stands and fitted kitchens in Ethiopia, with quality finishing at fair prices.",
  icons: { icon: "/lusso-mark.png" },
  openGraph: {
    title: "Lusso Living",
    description: "Luxury furniture for modern living, handcrafted in Ethiopia.",
    images: ["/lusso-logo-original.jpg"],
  },
};

export const viewport: Viewport = { themeColor: "#170705" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
