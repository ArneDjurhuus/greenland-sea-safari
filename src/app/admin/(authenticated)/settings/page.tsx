import { createClient } from '@/lib/supabase/server';
import SettingsClient from './SettingsClient';
import { SettingsData } from './types';

export default async function SettingsPage() {
    const supabase = await createClient();

    const { data: settings, error } = await supabase
        .from('settings')
        .select('*')
        .single();

    if (error) {
        console.error('Error fetching settings:', error);
        // Fallback to default if no settings found (shouldn't happen if seeded)
        const defaultSettings: SettingsData = {
            id: '',
            company_name: 'Greenland Sea Safari',
            email: 'info@greenlandseasafari.com',
            phone: '+299 123 456',
            website: 'https://greenlandseasafari.com',
            address: 'Ilulissat Harbor, 3952 Ilulissat, Greenland',
            notify_on_booking: true,
            notify_on_cancellation: true,
            auto_confirm_bookings: false,
        };
        return <SettingsClient initialSettings={defaultSettings} />;
    }

    return <SettingsClient initialSettings={settings} />;
}
