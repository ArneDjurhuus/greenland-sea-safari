'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createTour(formData: FormData) {
    const supabase = await createClient();
    
    const rawData = {
        slug: formData.get('slug') as string,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        duration: formData.get('duration') as string,
        price_dkk: parseInt(formData.get('price_dkk') as string),
        max_guests: parseInt(formData.get('max_guests') as string),
        is_active: formData.get('is_active') === 'on',
    };

    const { error } = await supabase
        .from('tours')
        .insert(rawData);

    if (error) {
        console.error('Error creating tour:', error);
        throw new Error('Failed to create tour');
    }

    revalidatePath('/admin/tours');
}

export async function updateTour(id: string, formData: FormData) {
    const supabase = await createClient();
    
    const rawData = {
        slug: formData.get('slug') as string,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        duration: formData.get('duration') as string,
        price_dkk: parseInt(formData.get('price_dkk') as string),
        max_guests: parseInt(formData.get('max_guests') as string),
        is_active: formData.get('is_active') === 'on',
    };

    const { error } = await supabase
        .from('tours')
        .update(rawData)
        .eq('id', id);

    if (error) {
        console.error('Error updating tour:', error);
        throw new Error('Failed to update tour');
    }

    revalidatePath('/admin/tours');
}

export async function deleteTour(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('tours')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting tour:', error);
        throw new Error('Failed to delete tour');
    }

    revalidatePath('/admin/tours');
}

export async function toggleTourStatus(id: string, isActive: boolean) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('tours')
        .update({ is_active: isActive })
        .eq('id', id);

    if (error) {
        console.error('Error toggling tour status:', error);
        throw new Error('Failed to toggle tour status');
    }

    revalidatePath('/admin/tours');
}
