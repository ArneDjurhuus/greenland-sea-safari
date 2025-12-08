"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Heading, Text } from "@/components/ui/Typography";
import { motion } from "framer-motion";

export function HeroSection() {
    return (
        <section className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center justify-center">
            {/* Background with overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop")', // Authentic Arctic Look
                }}
            >
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
                        <Button variant="outline" size="lg" className="text-lg px-8 border-white text-white hover:bg-white/10">
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
            >
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
                    <div className="w-1 h-2 bg-white rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
