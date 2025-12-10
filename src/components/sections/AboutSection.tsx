"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Typography";
import { createPortal } from "react-dom";
import { ShieldCheck, Users, X, MapPin, ExternalLink } from "lucide-react";

export function AboutSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const openButtonRef = useRef<HTMLButtonElement>(null);

    // Handle Escape key to close modal
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsModalOpen(false);
        }
    }, []);

    // Focus trap and body scroll lock
    useEffect(() => {
        if (isModalOpen) {
            const previouslyFocused = document.activeElement as HTMLElement;
            closeButtonRef.current?.focus();
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                document.body.style.overflow = '';
                previouslyFocused?.focus();
            };
        }
    }, [isModalOpen, handleKeyDown]);

    // Handle focus trap
    const handleTabKey = (e: React.KeyboardEvent) => {
        if (e.key !== 'Tab' || !modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (e.shiftKey && document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
        }
    };

    return (
        <section id="about" className="py-24 bg-arctic-ice/20" aria-labelledby="about-section-heading">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <div className="relative rounded-lg overflow-hidden shadow-xl aspect-video">
                            <Image
                                src="https://images.unsplash.com/photo-1531956531700-dc0ee0f1f9a5?q=80&w=2069"
                                alt="Captain navigating a boat through Arctic waters"
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-arctic-blue/10 mix-blend-multiply" />
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <Heading level={2} id="about-section-heading" className="mb-6">About Greenland Sea Safari</Heading>
                        <Text className="mb-6">
                            Founded on a passion for the Arctic, Greenland Sea Safari is dedicated to providing exclusive, safe, and sustainable adventures in the waters of Ilulissat.
                        </Text>
                        <Text className="mb-8">
                            Our experienced captains know the best spots to find whales, the most impressive icebergs, and the perfect angles for the midnight sun. We believe in small groups and big experiences, ensuring you get the personal attention you deserve.
                        </Text>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <h4 className="font-bold text-arctic-blue text-lg mb-1">Expert Guides</h4>
                                <p className="text-sm text-arctic-night/70">Local knowledge & certified safety.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-arctic-blue text-lg mb-1">Premium Fleet</h4>
                                <p className="text-sm text-arctic-night/70">Comfortable, modern vessels.</p>
                            </div>
                        </div>

                        <Button ref={openButtonRef} onClick={() => setIsModalOpen(true)} variant="outline" aria-haspopup="dialog">Learn More About Us!</Button>
                    </div>
                </div>
            </div>

            {/* About Us Modal */}
            {isModalOpen && createPortal(
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    onKeyDown={handleTabKey}
                >
                    <div className="absolute inset-0 bg-arctic-night/90 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} aria-hidden="true" />

                    <div ref={modalRef} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 animate-in fade-in zoom-in duration-300">
                        <button
                            ref={closeButtonRef}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-arctic-blue"
                            aria-label="Close modal"
                        >
                            <X className="w-6 h-6 text-arctic-night" aria-hidden="true" />
                        </button>

                        <div className="p-8 md:p-12 space-y-12 text-arctic-night">
                            {/* Header */}
                            <div className="text-center space-y-4">
                                <Heading level={2} id="modal-title" className="text-arctic-blue">Greenland Sea Safari</Heading>
                                <p className="text-xl font-serif italic text-arctic-blue/70">From a dream of sharing experiences at sea to creating local adventures</p>
                            </div>

                            {/* Founders */}
                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <Heading level={3}>Hans Djurhuus</Heading>
                                    <Text className="text-sm leading-relaxed">
                                        Originally from Sisimiut, Greenland, Hans Djurhuus has spent over 25 years sailing across the globe. After completing his education, he began a long and successful career as a Dual Officer with Maersk A/S. In 2022, driven by a strong connection to his homeland, Hans returned to Greenland and continued his maritime journey with Royal Arctic Line A/S. Motivated by a vision to create new opportunities and share the beauty of Greenland with others, he partnered with entrepreneur Flemming Bisgaard to establish Greenland Sea Safari.
                                    </Text>
                                </div>
                                <div className="space-y-4">
                                    <Heading level={3}>Flemming Bisgaard</Heading>
                                    <Text className="text-sm leading-relaxed">
                                        Flemming Bisgaard, originally from Vorupør, Denmark, has called Ilulissat home for nearly three decades. A licensed helicopter pilot, he spent many years flying a Sikorsky 61 and serving as a search and rescue captain. Alongside his aviation career, he founded BISGAARD TRADING, now known as Bisgaard ApS - a company specializing in property management, accommodation, warehousing, workshop and logistical services. His team has supported a wide range of industries, from tourism and scientific expeditions to film production, maritime logistics, and mineral exploration.
                                    </Text>
                                </div>
                            </div>

                            {/* Vision */}
                            <div className="bg-arctic-blue/5 p-8 rounded-xl border border-arctic-blue/10">
                                <Heading level={3} className="text-center mb-6">A Shared Vision</Heading>
                                <Text className="text-center max-w-2xl mx-auto italic">
                                    &ldquo;United by a shared passion for Greenland&apos;s breathtaking nature, Hans and Flemming founded Greenland Sea Safari to offer exclusive and immersive tours in Ilulissat Icefjord and Disko Bay... Together, they&apos;re committed to delivering outstanding service and showcasing the raw, majestic beauty of Greenland—one journey at a time.&rdquo;
                                </Text>
                            </div>

                            {/* Details Grid */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Company Details */}
                                <div className="space-y-6">
                                    <Heading level={4}>Company Details</Heading>
                                    <ul className="space-y-3 text-sm">
                                        <li className="flex items-center gap-3">
                                            <ShieldCheck className="w-5 h-5 text-arctic-green" aria-hidden="true" />
                                            <span><strong>CVR:</strong> 42305766</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Users className="w-5 h-5 text-arctic-blue" aria-hidden="true" />
                                            <span><strong>Owners:</strong> Hans Djurhuus & Flemming Bisgaard</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-arctic-gold" aria-hidden="true" />
                                            <span>Aron Mathisesenip aqq 9B, Ilulissat, 3952</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Partners */}
                                <div className="space-y-6">
                                    <Heading level={4}>Partner Companies</Heading>

                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h5 className="font-bold text-arctic-blue mb-1">Blue Trail Guesthouse</h5>
                                            <p className="text-xs text-arctic-night/60 mb-2">Accommodation for your stay</p>
                                            <div className="space-y-1 text-xs">
                                                <a href="https://bluetrailguesthouse.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-arctic-blue transition-colors">
                                                    <ExternalLink className="w-3 h-3" aria-hidden="true" /> bluetrailguesthouse.com
                                                </a>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h5 className="font-bold text-arctic-blue mb-1">BISGAARD ApS</h5>
                                            <p className="text-xs text-arctic-night/60 mb-2">Ilulissat Logistics Services</p>
                                            <div className="space-y-1 text-xs">
                                                <p className="flex items-center gap-2">
                                                    <ExternalLink className="w-3 h-3" aria-hidden="true" /> Facebook: ilulissat.logistics.services
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
}
