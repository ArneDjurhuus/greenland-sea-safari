'use server';

import { createClient } from '@/lib/supabase/server';

/**
 * Verify that the current user is authenticated as an admin.
 * Returns the user if authenticated, throws an error if not.
 */
export async function requireAdmin() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        throw new Error('Unauthorized: Admin access required');
    }

    return user;
}

/**
 * Check if the current user is authenticated.
 * Returns the user if authenticated, null otherwise.
 */
export async function getAuthenticatedUser() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}
