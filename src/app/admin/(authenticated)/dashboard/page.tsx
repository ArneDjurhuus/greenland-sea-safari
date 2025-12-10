import { createClient } from '@/lib/supabase/server';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
    const supabase = await createClient();

    // Fetch all bookings to calculate stats
    const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('total_price_dkk, status, guest_count');

    if (bookingsError) {
        console.error('Error fetching dashboard stats:', bookingsError);
        return <div>Error loading dashboard.</div>;
    }

    // Fetch unread messages count
    const { count: unreadMessagesCount, error: messagesError } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);

    if (messagesError) {
        console.error('Error fetching messages stats:', messagesError);
    }

    const stats = (bookings || []).reduce((acc, booking) => {
        // Total Bookings
        acc.totalBookings++;

        // Pending
        if (booking.status === 'pending') {
            acc.pendingBookings++;
        }

        // Revenue & Guests (only for non-cancelled)
        if (booking.status !== 'cancelled') {
            acc.totalRevenue += booking.total_price_dkk || 0;
            acc.guest_count += booking.guest_count || 0;
        }

        return acc;
    }, {
        totalRevenue: 0,
        totalBookings: 0,
        pendingBookings: 0,
        guest_count: 0
    });

    return <DashboardClient stats={{
        totalRevenue: stats.totalRevenue,
        totalBookings: stats.totalBookings,
        pendingBookings: stats.pendingBookings,
        totalGuests: stats.guest_count,
        unreadMessages: unreadMessagesCount || 0
    }} />;
}
