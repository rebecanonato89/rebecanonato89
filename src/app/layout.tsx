import type { Metadata } from "next";
import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";

import "./globals.css";
import { content } from "@/content";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SkipToContent from "@/components/SkipToContent";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600"],
});

const defaultCopy = content.pt;

export const metadata: Metadata = {
  metadataBase: new URL(defaultCopy.seo.url),
  title: {
    default: defaultCopy.seo.title,
    template: `%s | ${defaultCopy.name}`,
  },
  description: defaultCopy.seo.description,
  openGraph: {
    type: "website",
    title: defaultCopy.seo.title,
    description: defaultCopy.seo.description,
    siteName: defaultCopy.seo.siteName,
    url: defaultCopy.seo.url,
    images: [
      {
        url: defaultCopy.seo.ogImage,
        width: 1200,
        height: 630,
        alt: defaultCopy.name,
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={defaultCopy.locale}
      className={`${plex.variable} ${serif.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-base-900 text-base-100">
        <SkipToContent />
        <div className="min-h-screen bg-grid-fade">
          <Header />
          <main id="content" className="container-grid py-12">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
