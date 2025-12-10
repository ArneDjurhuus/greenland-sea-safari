import { createClient } from '@/lib/supabase/server';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
    const supabase = await createClient();

    // Fetch all bookings to calculate stats
    // In a real app with many records, you'd use .count() or specific aggregate queries
    const { data: bookings, error } = await supabase
        .from('bookings')
        .select('total_price_dkk, status, guest_count');

    if (error) {
        console.error('Error fetching dashboard stats:', error);
        return <div>Error loading dashboard.</div>;
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
        totalGuests: stats.guest_count
    }} />;
}
