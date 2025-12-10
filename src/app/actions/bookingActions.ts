'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'

export async function updateBookingStatus(
    bookingId: string, 
    newStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed'
) {
    await requireAdmin()
    const supabase = await createClient()

    const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId)

    if (error) {
        console.error('Error updating booking status:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/admin/bookings')
    revalidatePath('/admin/dashboard')
    return { success: true }
}

export async function updatePaymentStatus(
    bookingId: string, 
    newStatus: 'unpaid' | 'paid' | 'refunded'
) {
    await requireAdmin()
    const supabase = await createClient()

    const { error } = await supabase
        .from('bookings')
        .update({ payment_status: newStatus })
        .eq('id', bookingId)

    if (error) {
        console.error('Error updating payment status:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/admin/bookings')
    return { success: true }
}

export async function deleteBooking(bookingId: string) {
    await requireAdmin()
    const supabase = await createClient()

    const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId)

    if (error) {
        console.error('Error deleting booking:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/admin/bookings')
    revalidatePath('/admin/dashboard')
    return { success: true }
}
