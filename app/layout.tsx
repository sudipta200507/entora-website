import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://entora.space"),
  title: "Entora | AI Development Company & Custom AI Solutions",
  description:
    "Entora is an AI development company building custom AI solutions, SaaS development systems, and AI automation services for scalable business growth.",
  keywords: [
    "AI Development Company",
    "Custom AI Solutions",
    "SaaS Development",
    "AI Automation Services",
  ],
  openGraph: {
    title: "Entora | AI-First Technology Partner",
    description:
      "Build intelligent software, automation systems, and scalable web platforms with Entora.",
    url: "https://entora.space",
    siteName: "Entora",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Entora | AI-First Technology Partner",
    description:
      "Custom AI solutions, SaaS development, and automation services built for scale.",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen bg-ink text-slate-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
