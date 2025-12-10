'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

const tourImages: Record<string, string> = {
    'midnight-sun': 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80',
    'ice-fjord': 'https://images.unsplash.com/photo-1476673160081-cf065c08c6b8?w=800&q=80',
    'hot-tub': '/hottub_1.png',
    'whale-watching': 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?w=800&q=80',
    'icefjord-safari': 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80',
};

export async function seedTourImages() {
    const supabase = await createClient();
    
    const { data: tours, error: fetchError } = await supabase
        .from('tours')
        .select('id, slug');
    
    if (fetchError) {
        console.error('Error fetching tours:', fetchError);
        return { success: false, error: fetchError.message };
    }

    const results = [];
    
    for (const tour of tours || []) {
        const imageUrl = tourImages[tour.slug];
        if (imageUrl) {
            const { error } = await supabase
                .from('tours')
                .update({ image_url: imageUrl })
                .eq('id', tour.id);
            
            if (error) {
                results.push({ slug: tour.slug, success: false, error: error.message });
            } else {
                results.push({ slug: tour.slug, success: true, imageUrl });
            }
        } else {
            // Default fallback for any tour without a specific image
            const { error } = await supabase
                .from('tours')
                .update({ image_url: 'https://images.unsplash.com/photo-1517783999520-f068a0cab52e?w=800&q=80' })
                .eq('id', tour.id);
            
            results.push({ slug: tour.slug, success: !error, imageUrl: 'fallback' });
        }
    }
    
    // Force revalidation of all routes
    revalidatePath('/', 'layout');
    revalidatePath('/admin/tours');
    
    return { success: true, results };
}
