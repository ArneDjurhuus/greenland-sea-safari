'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export async function submitContactForm(data: ContactFormData) {
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
        return { success: false, error: 'Please fill in all required fields' };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return { success: false, error: 'Please enter a valid email address' };
    }

    try {
        const supabase = await createClient();

        // Store the contact message in database
        const { error } = await supabase
            .from('contact_messages')
            .insert({
                name: data.name,
                email: data.email,
                subject: data.subject || 'General Inquiry',
                message: data.message,
            });

        if (error) {
            console.error('Error storing contact message:', error);
            throw new Error('Failed to save message');
        }

        return { 
            success: true, 
            message: 'Thank you for your message! We will get back to you soon.' 
        };
    } catch (error) {
        console.error('Contact form error:', error);
        return { success: false, error: 'Something went wrong. Please try again.' };
    }
}

export async function getMessages() {
    await requireAdmin();
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching messages:', error);
        throw new Error('Failed to fetch messages');
    }

    return data;
}

export async function markMessageAsRead(id: string) {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', id);

    if (error) {
        console.error('Error marking message as read:', error);
        throw new Error('Failed to update message');
    }

    revalidatePath('/admin/messages');
    return { success: true };
}

export async function deleteMessage(id: string) {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting message:', error);
        throw new Error('Failed to delete message');
    }

    revalidatePath('/admin/messages');
    return { success: true };
}
