"use client";

import { useState } from 'react';
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Phone, Mail, MapPin, MessageSquare, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import dynamic from 'next/dynamic';
import { submitContactForm } from '@/app/actions/contactActions';

const InteractiveMap = dynamic(() => import('@/components/features/InteractiveMap'), {
    ssr: false,
    loading: () => <div className="h-[200px] w-full bg-arctic-ice/10 animate-pulse rounded-xl flex items-center justify-center text-arctic-blue/50">Loading Map...</div>
});

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const result = await submitContactForm(formData);
        
        setIsSubmitting(false);
        if (result.success) {
            setSubmitStatus({ success: true, message: result.message || 'Message sent successfully!' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
            setSubmitStatus({ success: false, message: result.error || 'Failed to send message' });
        }
    };

    return (
        <div className="min-h-screen pt-20 bg-arctic-ice/10">
            {/* Hero Section */}
            <div className="bg-arctic-blue py-16 text-white text-center">
                <div className="container mx-auto px-4">
                    <Heading level={1} className="text-white mb-4">Get in Touch</Heading>
                    <p className="text-xl text-arctic-ice/80 max-w-2xl mx-auto">
                        Have questions about our tours or want to tailor your Arctic adventure? We are here to help.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <Heading level={3} className="mb-6">Contact Information</Heading>
                            <Text className="mb-8">
                                Whether you're planning ahead or are already in Ilulissat, you can reach us through the following channels.
                            </Text>
                        </div>

                        {/* Phone */}
                        <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm border border-arctic-ice/20">
                            <div className="p-3 bg-arctic-blue/10 rounded-full h-fit">
                                <Phone className="w-6 h-6 text-arctic-blue" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-arctic-blue mb-1">Phone & WhatsApp</h4>
                                <p className="text-arctic-night/80 mb-2 font-mono">+299 483328</p>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-arctic-gold/20 text-arctic-night text-xs rounded-full font-medium">
                                    <AlertCircle className="w-3 h-3" />
                                    <span>In season only (Available from 20/06-2025)</span>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        {/* Location */}
                        <div className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-sm border border-arctic-ice/20">
                            <div className="flex gap-4">
                                <div className="p-3 bg-arctic-green/10 rounded-full h-fit">
                                    <MapPin className="w-6 h-6 text-arctic-green" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-arctic-blue mb-1">Meeting Point</h4>
                                    <p className="text-arctic-night/80 mb-2">
                                        We meet at the harbor gas station called "Tankeeraq".
                                    </p>
                                    <a
                                        href="https://www.google.com/maps/search/?api=1&query=Tankeeraq+Ilulissat+Harbor"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-arctic-blue font-bold hover:underline"
                                    >
                                        View on Google Maps &rarr;
                                    </a>
                                </div>
                            </div>

                            <div className="w-full h-[300px] rounded-lg overflow-hidden">
                                <InteractiveMap
                                    center={[69.22059336934468, -51.09383180224058]}
                                    zoom={15}
                                    markers={[{ position: [69.22059336934468, -51.09383180224058], title: "Meeting Point", content: "Noah Mølgaardsvej, Ilulissat" }]}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm border border-arctic-ice/20">
                            <div className="p-3 bg-arctic-ice/30 rounded-full h-fit">
                                <Mail className="w-6 h-6 text-arctic-blue" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-arctic-blue mb-1">Email</h4>
                                <p className="text-arctic-night/80 mb-2">
                                    You can always reach out to us by mail for inquiries and bookings.
                                </p>
                                {/* Email address wasn't on the old site, adding a placeholder for now or common convention */}
                                <a href="mailto:info@greenlandseasafari.com" className="text-arctic-blue font-bold hover:underline">
                                    info@greenlandseasafari.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-arctic-ice/20 h-fit">
                        <div className="flex items-center gap-3 mb-6">
                            <MessageSquare className="w-6 h-6 text-arctic-gold" />
                            <Heading level={3} className="mb-0!">Send a Message</Heading>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-bold text-arctic-blue">Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-lg border border-arctic-ice/30 focus:border-arctic-blue focus:ring-2 focus:ring-arctic-blue/20 outline-none transition-all"
                                        placeholder="Your name"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold text-arctic-blue">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-lg border border-arctic-ice/30 focus:border-arctic-blue focus:ring-2 focus:ring-arctic-blue/20 outline-none transition-all"
                                        placeholder="your@email.com"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-bold text-arctic-blue">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-lg border border-arctic-ice/30 focus:border-arctic-blue focus:ring-2 focus:ring-arctic-blue/20 outline-none transition-all"
                                    placeholder="Tour inquiry, custom trip, etc."
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-bold text-arctic-blue">Message *</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-lg border border-arctic-ice/30 focus:border-arctic-blue focus:ring-2 focus:ring-arctic-blue/20 outline-none transition-all resize-none"
                                    placeholder="How can we help you?"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            {submitStatus && (
                                <div className={`p-4 rounded-lg flex items-center gap-3 ${
                                    submitStatus.success 
                                        ? 'bg-green-50 text-green-700 border border-green-200' 
                                        : 'bg-red-50 text-red-700 border border-red-200'
                                }`}>
                                    {submitStatus.success ? (
                                        <CheckCircle className="w-5 h-5 shrink-0" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                    )}
                                    <span>{submitStatus.message}</span>
                                </div>
                            )}

                            <Button 
                                type="submit"
                                className="w-full py-4 text-base shadow-lg hover:shadow-xl translate-y-0 hover:-translate-y-1 transition-all"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    'Send Message'
                                )}
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
