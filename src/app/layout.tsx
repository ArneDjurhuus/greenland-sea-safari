import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/features/CookieConsent";
import { Analytics } from "@vercel/analytics/react";
import { createClient } from "@/lib/supabase/server";
import { unstable_noStore as noStore } from 'next/cache';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  noStore();
  const supabase = await createClient();
  const { data: tours } = await supabase
    .from('tours')
    .select('*')
    .eq('is_active', true)
    .order('price_dkk', { ascending: true });

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased text-arctic-night bg-arctic-white`}
      >
        {/* Skip to main content link for keyboard accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:bg-arctic-blue focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <Header tours={tours || []} />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
