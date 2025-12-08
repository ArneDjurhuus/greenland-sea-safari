import { tours } from "@/data/tours";
import { BookingForm } from "@/components/features/BookingForm";
import { notFound } from "next/navigation";
import { Heading } from "@/components/ui/Typography";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book Your Tour",
    description: "Reserve your spot on an unforgettable Arctic adventure. Secure online booking for whale watching, glacier cruises, and more.",
};

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BookingPage({ searchParams }: PageProps) {
    const { tourId } = await searchParams;

    if (!tourId || typeof tourId !== 'string') {
        // Default or fallback if no tour selected, maybe redirect or show generic
        // For this MVP we expect a tourId
        return (
            <div className="container mx-auto py-24 text-center">
                <Heading level={2}>Please select a tour to book</Heading>
            </div>
        );
    }

    const tour = tours.find((t) => t.id === tourId);

    if (!tour) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-arctic-ice/10">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <Heading level={1}>Secure Your Spot</Heading>
                    <p className="text-arctic-night/60">Complete your reservation for an unforgettable Arctic experience.</p>
                </div>

                <BookingForm tour={tour} />
            </div>
        </div>
    );
}
