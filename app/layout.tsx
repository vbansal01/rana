import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: { default: "RANA — Rajasthan Association of North America", template: "%s | RANA" },
  description:
    "Rajasthan Association of North America — celebrating culture, community, and heritage across the continent.",
  metadataBase: new URL("https://rana.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rana.org",
    siteName: "RANA",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFEF9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
