import { socialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { getBaseUrl } from "@/lib/site";

import "./globals.css";
import { SiteIntro } from "@/components/layout/site-intro";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: "Kamanda Management LLC",
    template: "%s | Kamanda Management LLC",
  },

  description:
    "Kamanda Management LLC provides project management, construction support, technology and AI adoption, and specialized business solutions.",

  applicationName: "Kamanda Management LLC",

  keywords: [
    "Kamanda Management LLC",
    "project management",
    "construction support",
    "technology consulting",
    "AI adoption",
    "business solutions",
    "UAE",
    "Saudi Arabia",
  ],

  authors: [
    {
      name: "Kamanda Management LLC",
      url: baseUrl,
    },
  ],

  creator: "Kamanda Management LLC",
  publisher: "Kamanda Management LLC",

  alternates: {
    canonical: "/",
  },

  ...socialMetadata({
    title: "Kamanda Management LLC",
    description:
      "Project management, construction support, technology and AI adoption, and specialized business solutions.",
    path: "/",
  }),

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${manrope.variable} ${cormorantGaramond.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteIntro />
        <div className="site-content">{children}</div>
      </body>
    </html>
  );
}
