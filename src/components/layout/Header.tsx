"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { tours } from '@/data/tours';

// Simple utility if @/lib/utils not created yet, usually create-next-app makes it otherwise inline
// But for now I will inline the cn function in the component or create lib/utils helper.
// Wait, create-next-app with shadcn-like flags usually creates lib/utils, but I didn't use shadcn CLI.
// I will create lib/utils.ts as well.

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Tours', href: '/#tours' },
        { name: 'About', href: '/#about' },
        // Contact is handled separately
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled || mobileMenuOpen ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6 text-white"
            )}
            onMouseLeave={() => setDropdownOpen(false)}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
                    <span className={cn(isScrolled || mobileMenuOpen ? "text-arctic-blue" : "text-white")}>Greenland</span>
                    <span className="text-arctic-gold">SeaSafari</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "font-medium transition-colors hover:text-arctic-gold",
                                isScrolled ? "text-arctic-night" : "text-white/90"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className={cn(
                            "font-medium transition-colors hover:text-arctic-gold",
                            isScrolled ? "text-arctic-night" : "text-white/90"
                        )}
                    >
                        Contact
                    </Link>

                    <div className="relative group" onMouseEnter={() => setDropdownOpen(true)}>
                        <Button
                            variant={isScrolled ? "primary" : "outline"}
                            size="sm"
                            className={cn(!isScrolled && "text-white border-white hover:bg-white/10")}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            Book Now <ChevronDown className="ml-2 w-4 h-4" />
                        </Button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-arctic-ice/20 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                <div className="py-2">
                                    {tours.map((tour) => (
                                        <Link
                                            key={tour.id}
                                            href={`/book?tourId=${tour.id}`}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-arctic-ice/10 transition-colors"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            <img
                                                src={tour.image}
                                                alt={tour.title}
                                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                            />
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-arctic-blue truncate">{tour.title}</p>
                                                <p className="text-xs text-arctic-night/60">{tour.duration} • {tour.price}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? (
                        <X className={isScrolled || mobileMenuOpen ? "text-arctic-blue" : "text-white"} />
                    ) : (
                        <Menu className={isScrolled ? "text-arctic-blue" : "text-white"} />
                    )}
                </button>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg p-4 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-lg font-medium text-arctic-blue hover:text-arctic-gold"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-medium text-arctic-blue hover:text-arctic-gold"
                    >
                        Contact
                    </Link>

                    <div className="pt-4 border-t border-gray-100">
                        <p className="text-sm font-bold text-arctic-night/50 uppercase tracking-wider mb-2">Book a Tour</p>
                        <div className="space-y-2">
                            {tours.map((tour) => (
                                <Link
                                    key={tour.id}
                                    href={`/book?tourId=${tour.id}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-between p-3 bg-arctic-ice/10 rounded-lg hover:bg-arctic-blue/10 transition-colors"
                                >
                                    <span className="font-medium text-arctic-blue text-sm">{tour.title}</span>
                                    <ChevronRight className="w-4 h-4 text-arctic-blue/50" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
