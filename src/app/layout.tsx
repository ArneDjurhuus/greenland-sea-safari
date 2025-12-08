import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://greenlandseasafari.com'),
  title: {
    default: 'Greenland Sea Safari | Arctic Boat Tours in Ilulissat',
    template: '%s | Greenland Sea Safari',
  },
  description: 'Experience the magic of the Arctic with exclusive boat tours. Whale watching, glacier cruises, and floating hot tub adventures in Ilulissat, Greenland.',
  keywords: ['Greenland tours', 'whale watching', 'Ilulissat', 'Arctic adventure', 'glacier cruise', 'floating hot tub', 'Disko Bay'],
  authors: [{ name: 'Greenland Sea Safari' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://greenlandseasafari.com',
    siteName: 'Greenland Sea Safari',
    title: 'Greenland Sea Safari | Arctic Boat Tours',
    description: 'Exclusive Arctic boat tours in Ilulissat, Greenland. Whale watching, glacier cruises, and unique floating hot tub experiences.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Greenland Sea Safari - Arctic Adventures',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greenland Sea Safari | Arctic Boat Tours',
    description: 'Exclusive Arctic boat tours in Ilulissat, Greenland.',
    images: ['/og-image.jpg'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased text-arctic-night bg-arctic-white`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
