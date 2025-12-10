"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Show banner after a small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom-full duration-500">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white/95 backdrop-blur-md border border-arctic-ice/20 shadow-2xl rounded-2xl p-6 md:flex items-center justify-between gap-6">
                    <div className="flex-1 mb-4 md:mb-0">
                        <h3 className="text-lg font-bold text-arctic-blue mb-2">We value your privacy</h3>
                        <p className="text-arctic-night/70 text-sm leading-relaxed">
                            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                            By clicking &quot;Accept All&quot;, you consent to our use of cookies. 
                            Read our <Link href="/privacy" className="text-arctic-blue underline hover:text-arctic-gold transition-colors">Privacy Policy</Link>.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <Button 
                            variant="outline" 
                            onClick={handleDecline}
                            className="border-arctic-ice/30 hover:bg-arctic-ice/10 text-arctic-night"
                        >
                            Decline
                        </Button>
                        <Button 
                            onClick={handleAccept}
                            className="bg-arctic-blue text-white hover:bg-arctic-blue/90 shadow-lg shadow-arctic-blue/20"
                        >
                            Accept All
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
