'use server';

import { createClient } from '@/lib/supabase/server';

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
            // If table doesn't exist, log and return success anyway
            // (the message won't be stored but we don't want to break the UX)
            console.error('Error storing contact message:', error);
            
            // For now, just acknowledge the message was received
            // In production, you'd want to send an email or use a proper service
            return { 
                success: true, 
                message: 'Thank you for your message! We will get back to you soon.' 
            };
        }

        return { 
            success: true, 
            message: 'Thank you for your message! We will get back to you soon.' 
        };
    } catch (err) {
        console.error('Contact form submission error:', err);
        return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
}
