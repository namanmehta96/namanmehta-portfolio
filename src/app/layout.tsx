import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { site } from "@/data/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  // Raw hex allowed here (browser chrome config, not a component) — matches the background token.
  themeColor: "#0d1117",
};

export const metadata: Metadata = {
  // TODO: set real domain
  metadataBase: new URL("https://namanmehta-portfolio.vercel.app"),
  alternates: {
    canonical: "./",
  },
  title: {
    default: "Naman Mehta · Portfolio",
    template: "%s · Naman Mehta",
  },
  description: `${site.tagline} Case studies in data, product and AI strategy by ${site.name}.`,
  openGraph: {
    siteName: "Naman Mehta · Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}>
        <LenisProvider>
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
