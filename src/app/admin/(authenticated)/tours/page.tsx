import { createClient } from '@/lib/supabase/server';
import ToursClient from './ToursClient';
import { TourData } from './types';

export default async function ToursPage() {
    const supabase = await createClient();


    const { data: tours, error } = await supabase
        .from('tours')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching tours:', error);
        return <div>Error loading tours.</div>;
    }

    return <ToursClient initialTours={(tours || []) as TourData[]} />;
}
