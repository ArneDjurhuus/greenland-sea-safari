"use client";

import { useState } from 'react';
import { Heading } from '@/components/ui/Typography';
import { Save, Building, Mail, Phone, Globe, Bell, Shield } from 'lucide-react';
import { SettingsData } from './types';
import { updateSettings } from '@/app/actions/settingsActions';

interface SettingsClientProps {
    initialSettings: SettingsData;
}

export default function SettingsClient({ initialSettings }: SettingsClientProps) {
    const [settings, setSettings] = useState(initialSettings);
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        const formData = new FormData(e.currentTarget);
        
        try {
            await updateSettings(formData);
            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Failed to save settings');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <Heading level={1} className="text-arctic-blue">Settings</Heading>
                    <p className="text-arctic-night/60">Manage your business settings</p>
                </div>
                <button 
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-arctic-blue text-white rounded-lg text-sm font-medium hover:bg-arctic-blue/90 shadow-lg shadow-arctic-blue/20 disabled:opacity-50"
                >
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                    <Building className="w-5 h-5 text-arctic-blue" />
                    <h2 className="font-bold text-gray-900">Company Information</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                value={settings.company_name}
                                onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-arctic-blue focus:ring-2 focus:ring-arctic-blue/20 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="url"
                                    name="website"
                                    value={settings.website}
                                    onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-arctic-blue focus:ring-2 focus:ring-arctic-blue/20 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={settings.email}
                                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-arctic-blue focus:ring-2 focus:ring-arctic-blue/20 outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={settings.phone}
                                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-arctic-blue focus:ring-2 focus:ring-arctic-blue/20 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                            name="address"
                            value={settings.address}
                            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-arctic-blue focus:ring-2 focus:ring-arctic-blue/20 outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                    <Bell className="w-5 h-5 text-arctic-blue" />
                    <h2 className="font-bold text-gray-900">Notifications</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-900">New Booking Alerts</h3>
                            <p className="text-sm text-gray-500">Receive email notifications when a new booking is made</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                name="notifyOnBooking"
                                checked={settings.notify_on_booking}
                                onChange={(e) => setSettings({ ...settings, notify_on_booking: e.target.checked })}
                                className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-arctic-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-arctic-blue"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-900">Cancellation Alerts</h3>
                            <p className="text-sm text-gray-500">Receive email notifications when a booking is cancelled</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                name="notifyOnCancellation"
                                checked={settings.notify_on_cancellation}
                                onChange={(e) => setSettings({ ...settings, notify_on_cancellation: e.target.checked })}
                                className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-arctic-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-arctic-blue"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Booking Rules */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                    <Shield className="w-5 h-5 text-arctic-blue" />
                    <h2 className="font-bold text-gray-900">Booking Rules</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-900">Auto-confirm Bookings</h3>
                            <p className="text-sm text-gray-500">Automatically confirm bookings when payment is received</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                name="autoConfirmBookings"
                                checked={settings.auto_confirm_bookings}
                                onChange={(e) => setSettings({ ...settings, auto_confirm_bookings: e.target.checked })}
                                className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-arctic-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-arctic-blue"></div>
                        </label>
                    </div>
                </div>
            </div>
        </form>
    );
}
