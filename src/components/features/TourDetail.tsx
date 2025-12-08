"use client";

import { Tour } from '@/data/tours';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
import { Clock, Check, Info } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(() => import('@/components/features/InteractiveMap'), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-arctic-ice/10 animate-pulse rounded-xl flex items-center justify-center text-arctic-blue/50">Loading Map...</div>
});


interface TourDetailProps {
    tour: Tour;
}

export function TourDetail({ tour }: TourDetailProps) {
    return (
        <div className="min-h-screen pt-20">
            {/* Hero */}
            <div
                className="relative h-[60vh] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${tour.image})` }}
            >
                <div className="absolute inset-0 bg-arctic-blue/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-arctic-white via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
                    <div className="max-w-3xl">
                        <span className="inline-block px-3 py-1 bg-arctic-gold text-arctic-night text-xs font-bold rounded mb-4">
                            {tour.duration}
                        </span>
                        <Heading level={1} className="text-arctic-blue mb-4">{tour.title}</Heading>
                        <p className="text-xl text-arctic-blue/80 font-medium">{tour.price} per person</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Description */}
                        <section>
                            <Heading level={3} className="mb-4">Experience</Heading>
                            <Text className="text-lg leading-relaxed">{tour.fullDescription || tour.description}</Text>
                        </section>

                        {/* Highlights */}
                        <section>
                            <Heading level={3} className="mb-4">Highlights</Heading>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {tour.highlights.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 p-4 bg-white shadow-sm border border-arctic-ice/20 rounded-lg">
                                        <Check className="text-arctic-green w-5 h-5 flex-shrink-0" />
                                        <span className="text-arctic-night/80">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Itinerary */}
                        {tour.itinerary && (
                            <section>
                                <Heading level={3} className="mb-6">Itinerary</Heading>
                                <div className="border-l-2 border-arctic-ice/30 pl-8 space-y-8 relative">
                                    {tour.itinerary.map((item, idx) => (
                                        <div key={idx} className="relative">
                                            <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-arctic-blue border-4 border-arctic-white" />
                                            <span className="text-sm font-bold text-arctic-blue/60 block mb-1">{item.time}</span>
                                            <h4 className="text-lg font-semibold text-arctic-blue">{item.activity}</h4>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Route Map */}
                        {tour.route && tour.coordinates && (
                            <section>
                                <Heading level={3} className="mb-6">Tour Route</Heading>
                                <InteractiveMap
                                    center={tour.coordinates}
                                    zoom={12}
                                    markers={[{ position: tour.coordinates, title: "Start Point", content: "Ilulissat Harbor" }]}
                                    route={tour.route}
                                />
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Booking Card */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-arctic-ice/20 sticky top-24">
                            <Heading level={4} className="mb-4">Book This Tour</Heading>
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-3xl font-bold text-arctic-blue">{tour.price}</span>
                                <span className="text-sm text-arctic-night/60">/ person</span>
                            </div>
                            <Link
                                href={`/book?tourId=${tour.id}`}
                                className="inline-flex w-full items-center justify-center rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-arctic-gold font-sans tracking-wide bg-arctic-blue text-white hover:bg-arctic-blue/90 shadow-lg shadow-arctic-blue/20 h-12 px-8 text-base mb-4"
                            >
                                Check Availability
                            </Link>
                            <p className="text-xs text-center text-arctic-night/50">Free cancellation up to 48 hours before.</p>
                        </div>

                        {/* Packing List */}
                        {tour.whatToBring && (
                            <div className="bg-arctic-ice/10 p-6 rounded-xl">
                                <div className="flex items-center gap-2 mb-4">
                                    <Info className="w-5 h-5 text-arctic-blue" />
                                    <Heading level={4} className="!text-lg !mb-0">What to Bring</Heading>
                                </div>
                                <ul className="space-y-2">
                                    {tour.whatToBring.map((item, idx) => (
                                        <li key={idx} className="text-sm text-arctic-night/80 flex gap-2">
                                            <span className="text-arctic-blue">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Included */}
                        {tour.included && (
                            <div className="bg-arctic-green/5 p-6 rounded-xl">
                                <Heading level={4} className="!text-lg mb-4 text-arctic-green/80">Included</Heading>
                                <ul className="space-y-2">
                                    {tour.included.map((item, idx) => (
                                        <li key={idx} className="text-sm text-arctic-night/80 flex gap-2">
                                            <Check className="w-4 h-4 text-arctic-green" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Fixed Booking Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-arctic-ice/20 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 flex items-center justify-between">
                <div>
                    <p className="text-xs text-arctic-night/60">From</p>
                    <p className="text-xl font-bold text-arctic-blue">{tour.price}</p>
                </div>
                <Link
                    href={`/book?tourId=${tour.id}`}
                    className="inline-flex items-center justify-center rounded-lg bg-arctic-blue text-white px-8 py-3 font-bold shadow-lg hover:bg-arctic-blue/90"
                >
                    Book Now
                </Link>
            </div>
        </div>
    );
}
