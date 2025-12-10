"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import { motion } from "framer-motion";
import { Play, X, Volume2, VolumeX } from "lucide-react";

// Configuration: Set to true when you have a background video ready
const USE_VIDEO_BACKGROUND = false;
const VIDEO_BACKGROUND_URL = "/videos/hero-background.mp4"; // Update with your video path
const VIDEO_MODAL_URL = ""; // Update with your modal video URL (YouTube embed, Vimeo, or mp4)

export function HeroSection() {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const modalVideoRef = useRef<HTMLVideoElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const openVideoModal = () => {
        setIsVideoModalOpen(true);
    };

    const closeVideoModal = useCallback(() => {
        setIsVideoModalOpen(false);
        if (modalVideoRef.current) {
            modalVideoRef.current.pause();
        }
    }, []);

    // Handle Escape key and focus management
    useEffect(() => {
        if (isVideoModalOpen) {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') closeVideoModal();
            };
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
            closeButtonRef.current?.focus();

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                document.body.style.overflow = '';
            };
        }
    }, [isVideoModalOpen, closeVideoModal]);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <section className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center justify-center">
            {/* Background - Video or Image */}
            <div className="absolute inset-0 z-0">
                {USE_VIDEO_BACKGROUND ? (
                    <>
                        <video
                            ref={videoRef}
                            autoPlay
                            loop
                            muted={isMuted}
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                            poster="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop"
                        >
                            <source src={VIDEO_BACKGROUND_URL} type="video/mp4" />
                        </video>
                        {/* Mute/Unmute button for video background */}
                        <button
                            onClick={toggleMute}
                            className="absolute bottom-24 right-6 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                            aria-label={isMuted ? "Unmute video" : "Mute video"}
                        >
                            {isMuted ? (
                                <VolumeX className="w-5 h-5 text-white" />
                            ) : (
                                <Volume2 className="w-5 h-5 text-white" />
                            )}
                        </button>
                    </>
                ) : (
                    <Image
                        src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop"
                        alt="Arctic landscape with icebergs in Greenland"
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="100vw"
                    />
                )}
                <div className="absolute inset-0 bg-arctic-night/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-arctic-night/90" />
            </div>

            {/* Content */}
            <div className="container relative z-10 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Heading level={1} className="text-white mb-6 drop-shadow-lg">
                        Experience the Magic of <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-arctic-ice to-arctic-gold">
                            Greenland
                        </span>
                    </Heading>

                    <Text className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 drop-shadow-md font-light">
                        Exclusive boat tours, drifting hot tubs, and unforgettable Arctic adventures in Ilulissat.
                    </Text>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="#tours">
                            <Button variant="secondary" size="lg" className="text-lg px-8">
                                Explore Tours
                            </Button>
                        </Link>
                        <Button 
                            variant="outline" 
                            size="lg" 
                            className="text-lg px-8 border-white text-white hover:bg-white/10 inline-flex items-center gap-2"
                            onClick={openVideoModal}
                            aria-label="Watch video about Greenland Sea Safari"
                        >
                            <Play className="w-5 h-5" aria-hidden="true" />
                            Watch Video
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
            >
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
                    <div className="w-1 h-2 bg-white rounded-full" />
                </div>
            </motion.div>

            {/* Video Modal */}
            {isVideoModalOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="video-modal-title"
                >
                    <div 
                        className="absolute inset-0 bg-arctic-night/95 backdrop-blur-sm" 
                        onClick={closeVideoModal}
                        aria-hidden="true"
                    />
                    
                    <div className="relative z-10 w-full max-w-4xl animate-in fade-in zoom-in duration-300">
                        <button
                            ref={closeButtonRef}
                            onClick={closeVideoModal}
                            className="absolute -top-12 right-0 p-2 text-white hover:text-arctic-gold transition-colors focus:outline-none focus:ring-2 focus:ring-arctic-gold rounded-full"
                            aria-label="Close video"
                        >
                            <X className="w-8 h-8" aria-hidden="true" />
                        </button>
                        
                        <h2 id="video-modal-title" className="sr-only">Greenland Sea Safari Video</h2>
                        
                        <div className="aspect-video bg-arctic-night rounded-xl overflow-hidden shadow-2xl border border-white/10">
                            {VIDEO_MODAL_URL ? (
                                <video 
                                    ref={modalVideoRef}
                                    className="w-full h-full object-cover"
                                    controls
                                    autoPlay
                                >
                                    <source src={VIDEO_MODAL_URL} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/60">
                                    <div className="text-center p-8">
                                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                                            <Play className="w-10 h-10 opacity-50" aria-hidden="true" />
                                        </div>
                                        <p className="text-xl font-serif mb-2">Video Coming Soon</p>
                                        <p className="text-sm text-white/40 max-w-md">
                                            We&apos;re preparing an amazing video showcasing the Arctic adventures 
                                            that await you. Check back soon!
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
