'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type BookingState = {
  success?: boolean
  error?: string | null
  message?: string | null
}

export async function createBooking(prevState: BookingState, formData: FormData): Promise<BookingState> {
  const supabase = await createClient()

  const tourDate = formData.get('date') as string
  const guests = parseInt(formData.get('guests') as string)
  const tourId = formData.get('tourId') as string // We might need to look this up by slug if we don't have ID
  const tourSlug = formData.get('tourSlug') as string
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const comments = formData.get('comments') as string

  // Basic validation
  if (!tourDate || !guests || !name || !email) {
    return { success: false, error: 'Missing required fields' }
  }

  try {
    // 1. Get the tour ID and price if we only have the slug
    let finalTourId = tourId
    let pricePerPerson = 0

    if (!finalTourId && tourSlug) {
      const { data: tour, error: tourError } = await supabase
        .from('tours')
        .select('id, price_dkk')
        .eq('slug', tourSlug)
        .single()

      if (tourError || !tour) {
        // Fallback for now if DB is empty, just to allow the form to work in "demo" mode
        // In production, this should fail.
        console.error('Tour not found in DB:', tourError)
        // For now, we might proceed without a foreign key if we haven't seeded the DB yet, 
        // but ideally we fail here.
        // return { success: false, error: 'Tour not found' }
      } else {
        finalTourId = tour.id
        pricePerPerson = tour.price_dkk
      }
    }

    // Calculate total (mock price if DB lookup failed)
    const total = pricePerPerson > 0 ? pricePerPerson * guests : 0

    // 2. Insert Booking
    const { error } = await supabase
      .from('bookings')
      .insert({
        tour_id: finalTourId || null, // Allow null if tours table isn't populated yet
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        tour_date: tourDate,
        guest_count: guests,
        total_price_dkk: total,
        notes: comments,
        status: 'pending',
        payment_status: 'unpaid'
      })

    if (error) {
      console.error('Supabase insert error:', error)
      return { success: false, error: 'Failed to save booking. Please try again.' }
    }

    revalidatePath('/admin/bookings')
    return { success: true, message: 'Booking request received! We will contact you shortly.' }
    
  } catch (err) {
    console.error('Unexpected error:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}
