import { TourDetail } from "@/components/features/TourDetail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Tour } from "@/types/tour";
import { unstable_noStore as noStore } from 'next/cache';

// Generate dynamic metadata for each tour page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    noStore();
    const { id } = await params;
    const supabase = await createClient();
    
    const { data: tour } = await supabase
        .from('tours')
        .select('*')
        .eq('slug', id)
        .single();

    if (!tour) {
        return {
            title: 'Tour Not Found',
        };
    }

    return {
        title: tour.title,
        description: tour.description,
        openGraph: {
            title: `${tour.title} | Greenland Sea Safari`,
            description: tour.description,
            images: tour.image_url ? [{ url: tour.image_url, alt: tour.title }] : [],
        },
    };
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function TourPage({ params }: PageProps) {
    noStore();
    // Await params first (Next.js 15+ requirement pattern, safe for 14 too)
    const { id } = await params;
    const supabase = await createClient();

    const { data: tour } = await supabase
        .from('tours')
        .select('*')
        .eq('slug', id)
        .single();

    if (!tour) {
        notFound();
    }

    return <TourDetail tour={tour} />;
}
