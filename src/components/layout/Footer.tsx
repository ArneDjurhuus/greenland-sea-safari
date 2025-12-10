"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Footer() {
    const pathname = usePathname();

    // Hide footer on admin pages
    if (pathname?.startsWith('/admin')) return null;

    return (
        <footer className="bg-arctic-night text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="font-serif text-2xl font-bold tracking-tight mb-4 block">
                            <span className="text-white">Greenland</span>
                            <span className="text-arctic-gold">SeaSafari</span>
                        </Link>
                        <p className="text-arctic-ice/80 max-w-sm mb-6">
                            Experience the unbridled beauty of the Arctic. From floating among icebergs to witnessing the majestic whales, your adventure starts here.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-serif text-lg font-semibold mb-4 text-arctic-gold">Tours</h3>
                        <ul className="space-y-2 text-arctic-ice/80">
                            <li><Link href="/tours/icefjord-safari" className="hover:text-white transition-colors">Iceberg Safari</Link></li>
                            <li><Link href="/tours/whale-watching" className="hover:text-white transition-colors">Whale Watching</Link></li>
                            <li><Link href="/tours/midnight-sun" className="hover:text-white transition-colors">Midnight Sun</Link></li>
                            <li><Link href="/tours/hot-tub" className="hover:text-white transition-colors">Floating Hot Tub</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-serif text-lg font-semibold mb-4 text-arctic-gold">Contact</h3>
                        <ul className="space-y-2 text-arctic-ice/80">
                            <li>Ilulissat, Greenland</li>
                            <li><a href="mailto:info@greenlandseasafari.com" className="hover:text-white transition-colors">info@greenlandseasafari.com</a></li>
                            <li>+299 48 33 28</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-arctic-ice/60">
                    © {new Date().getFullYear()} Greenland Sea Safari. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
