import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
});

const title = "Danish Khan — Mobile App Developer";
const description =
  "Danish Khan builds mobile apps people love — 7+ years crafting scalable, performance-driven iOS and cross-platform applications with Swift, SwiftUI, Flutter, and Supabase.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: site.url,
    images: ["/images/portrait.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/portrait.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg font-display text-text antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
