import { Figtree, Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

// Primary: Maison Neue (local)
export const maisonNeue = localFont({
  src: [
    {
      path: "../../lib/font/Maison/Maison-Neue.woff2",
      weight: "300",
    },
    {
      path: "../../lib/font/Maison/Maison-Neue-Demi.woff2",
      weight: "400",
    },
    {
      path: "../../lib/font/Maison/Maison-Neue-Book.woff2",
      weight: "500",
    },
    {
      path: "../../lib/font/Maison/Maison-Neue-Bold.woff2",
      weight: "600",
    },
    {
      path: "../../lib/font/Maison/Maison-Neue-Black.woff2",
      weight: "700",
    },
    {
      path: "../../lib/font/Maison/Maison-Neue-Extended-Bold.woff2",
      weight: "800",
    },
    {
      path: "../../lib/font/Maison/Maison-Neue-Extended-Extra-Bold.woff2",
      weight: "900",
    },
  ],
  variable: "--font-maison-neue",
  display: "swap",
});

export const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});
