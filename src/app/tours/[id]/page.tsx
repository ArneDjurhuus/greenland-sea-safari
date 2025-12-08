import { tours } from "@/data/tours";
import { TourDetail } from "@/components/features/TourDetail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Generate static params for all tours at build time
export async function generateStaticParams() {
    return tours.map((tour) => ({
        id: tour.id,
    }));
}

// Generate dynamic metadata for each tour page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const tour = tours.find((t) => t.id === id);

    if (!tour) {
        return {
            title: 'Tour Not Found',
        };
    }

    return {
        title: tour.title,
        description: tour.fullDescription || tour.description,
        openGraph: {
            title: `${tour.title} | Greenland Sea Safari`,
            description: tour.description,
            images: [{ url: tour.image, alt: tour.title }],
        },
    };
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function TourPage({ params }: PageProps) {
    // Await params first (Next.js 15+ requirement pattern, safe for 14 too)
    const { id } = await params;

    const tour = tours.find((t) => t.id === id);

    if (!tour) {
        notFound();
    }

    return <TourDetail tour={tour} />;
}
