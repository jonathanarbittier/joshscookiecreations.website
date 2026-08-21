import type { Metadata } from "next";
import "./globals.css";

const liveUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(liveUrl),
  title: "Josh's Cookie Creations | Fresh Baked Fun",
  description: "Cookies, Oreo truffles, dipped treats, and personal local delivery from Boss Baker Josh in Central Florida.",
  openGraph: { title: "Josh's Cookie Creations", description: "Fresh baked fun, delivered by Josh.", type: "website", url: liveUrl, images: [{ url: "/og.png", width: 1200, height: 630, alt: "Josh's Cookie Creations" }] },
  twitter: { card: "summary_large_image", title: "Josh's Cookie Creations", description: "Fresh baked fun, delivered by Josh.", images: ["/og.png"] },
  icons: { icon: "/images/logo.webp" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
