'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';

export async function updateSettings(formData: FormData) {
    await requireAdmin();
    const supabase = await createClient();
    
    const rawData = {
        company_name: formData.get('companyName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        website: formData.get('website') as string,
        address: formData.get('address') as string,
        notify_on_booking: formData.get('notifyOnBooking') === 'on',
        notify_on_cancellation: formData.get('notifyOnCancellation') === 'on',
        auto_confirm_bookings: formData.get('autoConfirmBookings') === 'on',
        updated_at: new Date().toISOString(),
    };

    // We update the single row where id is not null (since there's only one row)
    // Or better, we fetch the ID first or just update all rows (since there is only one)
    
    const { error } = await supabase
        .from('settings')
        .update(rawData)
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Update all rows (should be only one)

    if (error) {
        console.error('Error updating settings:', error);
        throw new Error('Failed to update settings');
    }

    revalidatePath('/admin/settings');
}
