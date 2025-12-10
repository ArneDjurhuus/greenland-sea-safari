export type TourData = {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    duration: string | null;
    price_dkk: number;
    max_guests: number | null;
    image_url: string | null;
    is_active: boolean;
    created_at: string;
};
