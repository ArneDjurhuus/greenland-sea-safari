"use client";

import Link from "next/link";

import { tours } from "@/data/tours";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Typography";
import { Clock, Tag } from "lucide-react";
import Image from "next/image";

export function ToursSection() {
    return (
        <div id="tours" className="py-24 bg-arctic-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-arctic-ice/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-arctic-gold/5 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <Heading level={2} className="mb-4">Unforgettable Adventures</Heading>
                    <Text className="max-w-2xl mx-auto">
                        Choose from our curated selection of exclusive tours designed to show you standard Arctic beauty from unique perspectives.
                    </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tours.map((tour) => (
                        <Link href={`/tours/${tour.id}`} key={tour.id} className="group block h-full">
                            <Card className="flex flex-col h-full bg-white border-0 shadow-lg shadow-arctic-blue/5 transition-transform duration-300 group-hover:-translate-y-1">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{
                                            backgroundImage: `url(${tour.image})`
                                        }}
                                    />
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-arctic-blue shadow-sm">
                                        {tour.price}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="font-serif text-xl font-bold text-arctic-blue mb-2 line-clamp-2 group-hover:text-arctic-gold transition-colors">
                                        {tour.title}
                                    </h3>

                                    <div className="flex items-center gap-2 text-sm text-arctic-night/60 mb-4">
                                        <Clock size={16} />
                                        <span>{tour.duration}</span>
                                    </div>

                                    <p className="text-sm text-arctic-night/70 mb-6 line-clamp-3 flex-grow">
                                        {tour.description}
                                    </p>

                                    <div className="space-y-3 mt-auto">
                                        <Button className="w-full">View Details</Button>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
