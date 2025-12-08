"use client";

import { Heading, Text } from "@/components/ui/Typography";
import { ShieldCheck, Anchor, Users } from "lucide-react";

export function BoatSection() {
    const features = [
        { icon: <Users className="w-6 h-6 text-arctic-gold" />, title: "Capacity", desc: "Room for 7 passengers + crew" },
        { icon: <Anchor className="w-6 h-6 text-arctic-gold" />, title: "Poca 600", desc: "Customized for Arctic waters" },
        { icon: <ShieldCheck className="w-6 h-6 text-arctic-gold" />, title: "Safety First", desc: "Full safety equipment & GPS" },
        { icon: <div className="w-6 h-6 font-bold text-arctic-gold flex items-center justify-center">DK</div>, title: "Locally Owned", desc: "Rooted in Greenland" },
    ];

    return (
        <section className="py-24 bg-arctic-blue text-white overflow-hidden relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <Heading level={2} className="text-white mb-6">Our Vessel: Poca 600</Heading>
                        <Text className="text-arctic-ice/80 text-lg mb-8">
                            Explore the Disko Bay in our customized Poca 600. Designed for 7 passengers, it offers an intimate and safe connection to the sea, equipped with all necessary safety gear and modern navigation systems.
                        </Text>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="mt-1 p-2 bg-white/10 rounded-lg h-fit">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-serif font-bold text-lg mb-2">{feature.title}</h4>
                                        <p className="text-sm text-arctic-ice/60">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/20 aspect-[4/3] bg-arctic-night border-4 border-white/5">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-700"
                                style={{
                                    backgroundImage: 'url("/image_of_boat.png")'
                                }}
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-arctic-gold/20 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}
