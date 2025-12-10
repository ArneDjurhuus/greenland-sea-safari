import { createClient } from '@/lib/supabase/server';
import CustomersClient from './CustomersClient';
import { CustomerData } from './types';

export default async function CustomersPage() {
    const supabase = await createClient();


    // Aggregate customer data from bookings
    const { data: bookings, error } = await supabase
        .from('bookings')
        .select('customer_name, customer_email, customer_phone, total_price_dkk, created_at, status');

    if (error) {
        console.error('Error fetching customers:', error);
        return <div>Error loading customers.</div>;
    }

    // Group by email to get unique customers
    const customerMap = new Map<string, CustomerData>();
    
    (bookings || []).forEach((booking) => {
        const existing = customerMap.get(booking.customer_email);
        if (existing) {
            existing.booking_count++;
            if (booking.status !== 'cancelled') {
                existing.total_spent += booking.total_price_dkk || 0;
            }
            if (new Date(booking.created_at) > new Date(existing.last_booking)) {
                existing.last_booking = booking.created_at;
            }
        } else {
            customerMap.set(booking.customer_email, {
                customer_name: booking.customer_name,
                customer_email: booking.customer_email,
                customer_phone: booking.customer_phone,
                booking_count: 1,
                total_spent: booking.status !== 'cancelled' ? (booking.total_price_dkk || 0) : 0,
                last_booking: booking.created_at,
            });
        }
    });

    const customers = Array.from(customerMap.values()).sort((a, b) => 
        new Date(b.last_booking).getTime() - new Date(a.last_booking).getTime()
    );

    return <CustomersClient initialCustomers={customers} />;
}
