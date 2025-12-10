import { createClient } from '@/lib/supabase/server';
import BookingsClient, { BookingData } from './BookingsClient';

export default async function BookingsPage() {
    const supabase = await createClient();

    const { data: bookings, error } = await supabase
        .from('bookings')
        .select(`
            *,
            tours (
                title
            )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching bookings:', error);
        // In a real app, you might want to show an error state or throw an error
        return <div>Error loading bookings. Please check the console.</div>;
    }

    // Cast the data to the expected type (Supabase types might need generation, but for now we cast)
    const typedBookings = (bookings || []) as unknown as BookingData[];

    return <BookingsClient initialBookings={typedBookings} />;
}
