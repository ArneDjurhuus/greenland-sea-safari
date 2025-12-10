import { seedTourImages } from '@/app/actions/seedTourImages';
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    // Require authentication for this endpoint
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json(
            { error: 'Unauthorized: Admin access required' },
            { status: 401 }
        );
    }

    const result = await seedTourImages();
    return NextResponse.json(result);
}
