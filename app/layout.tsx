import type { Metadata } from "next";
import "./globals.css";

function toUrl(value: string | undefined): URL | undefined {
  const candidate = value?.trim();

  if (!candidate) return undefined;

  try {
    return new URL(candidate);
  } catch {
    try {
      return new URL(`https://${candidate}`);
    } catch {
      return undefined;
    }
  }
}

const metadataBase = toUrl(process.env.NEXT_PUBLIC_SITE_URL)
  ?? toUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  ?? toUrl(process.env.VERCEL_URL)
  ?? new URL("http://localhost:3000");

export const metadata: Metadata = {
  metadataBase,
  title: "Josh's Cookie Creations | Fresh Baked Fun",
  description: "Cookies, Oreo truffles, dipped treats, and personal local delivery from Boss Baker Josh in Central Florida.",
  openGraph: { title: "Josh's Cookie Creations", description: "Fresh baked fun, delivered by Josh.", type: "website", url: metadataBase, images: [{ url: "/og.png", width: 1200, height: 630, alt: "Josh's Cookie Creations" }] },
  twitter: { card: "summary_large_image", title: "Josh's Cookie Creations", description: "Fresh baked fun, delivered by Josh.", images: ["/og.png"] },
  icons: { icon: "/images/logo.webp" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
