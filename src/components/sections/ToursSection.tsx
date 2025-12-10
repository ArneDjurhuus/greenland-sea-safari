import Link from "next/link";
import Image from "next/image";

import { Card } from "@/components/ui/Card";
import { Heading, Text } from "@/components/ui/Typography";
import { Clock } from "lucide-react";
import { Tour } from "@/types/tour";

interface ToursSectionProps {
    tours: Tour[];
}

export function ToursSection({ tours }: ToursSectionProps) {
    return (
        <section id="tours" className="py-16 md:py-24 bg-arctic-white relative overflow-hidden" aria-labelledby="tours-section-heading">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-arctic-ice/10 rounded-full blur-3xl -z-10" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-arctic-gold/5 rounded-full blur-3xl -z-10" aria-hidden="true" />

            <div className="container mx-auto px-4">
                <div className="text-center mb-10 md:mb-16">
                    <Heading level={2} id="tours-section-heading" className="mb-4">Unforgettable Adventures</Heading>
                    <Text className="max-w-2xl mx-auto">
                        Choose from our curated selection of exclusive tours designed to show you standard Arctic beauty from unique perspectives.
                    </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tours.map((tour) => (
                        <Link href={`/tours/${tour.slug}`} key={tour.id} className="group block h-full">
                            <Card className="flex flex-col h-full bg-white border-0 shadow-lg shadow-arctic-blue/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                                <div className="relative h-48 w-full overflow-hidden">
                                    {tour.image_url ? (
                                        <Image
                                            src={tour.image_url}
                                            alt={`${tour.title} - Arctic tour experience`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-arctic-blue shadow-sm">
                                        DKK {tour.price_dkk}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col grow">
                                    <h3 className="font-serif text-xl font-bold text-arctic-blue mb-2 line-clamp-2 group-hover:text-arctic-gold transition-colors">
                                        {tour.title}
                                    </h3>

                                    <div className="flex items-center gap-2 text-sm text-arctic-night/60 mb-4">
                                        <Clock size={16} aria-hidden="true" />
                                        <span>{tour.duration}</span>
                                    </div>
                                    
                                    <p className="text-arctic-night/70 text-sm line-clamp-3 mb-6 grow">
                                        {tour.description}
                                    </p>
                                    
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-medium text-arctic-blue group-hover:text-arctic-gold transition-colors">
                                        <span>View Details</span>
                                        <span aria-hidden="true">→</span>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
