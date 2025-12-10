"use client";

import { useState } from "react";
import Image from "next/image";
import { BookingCalendar } from "./BookingCalendar";
import { Button } from "@/components/ui/Button";
import { Check, User, Users, ChevronDown, ChevronUp } from "lucide-react";
import { Tour } from '@/data/tours';

interface BookingFormProps {
    tour: Tour;
}

export function BookingForm({ tour }: BookingFormProps) {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [date, setDate] = useState<Date | undefined>();
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
    const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

    const pricePerAdult = parseInt(tour.price.replace(/\D/g, ''));
    const pricePerChild = Math.round(pricePerAdult * 0.5);
    const total = (adults * pricePerAdult) + (children * pricePerChild);

    const handleDateSelect = (d: Date) => {
        setDate(d);
        setStep(2);
    };

    const validateForm = () => {
        const newErrors: { name?: string; email?: string } = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setStep(3);
        }
    };

    if (step === 3) {
        return (
            <div className="bg-white p-8 rounded-xl shadow-lg border border-arctic-green/30 text-center animate-in fade-in zoom-in duration-300" role="alert" aria-live="polite">
                <div className="w-16 h-16 bg-arctic-green/10 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                    <Check className="w-8 h-8 text-arctic-green" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-arctic-blue mb-2">Booking Requested!</h2>
                <p className="text-arctic-night/70 mb-6">
                    Thank you for choosing Greenland Sea Safari. We have received your request for <strong>{tour.title}</strong> on <strong>{date?.toLocaleDateString()}</strong>.
                </p>
                <div className="bg-arctic-ice/10 p-4 rounded-lg text-sm text-arctic-night/80 mb-6">
                    <p>We will email you shortly with confirmation and payment details.</p>
                </div>
                <Button onClick={() => window.location.href = '/'} variant="outline">Back to Home</Button>
            </div>
        );
    }

    // Mobile Summary Component
    const MobileSummary = () => (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-arctic-night text-white shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
            <button 
                onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
                className="w-full p-4 flex items-center justify-between"
                aria-expanded={mobileSummaryOpen}
                aria-controls="mobile-booking-summary"
            >
                <div className="flex items-center gap-3">
                    <span className="text-sm text-arctic-ice/80">Total</span>
                    <span className="text-xl font-bold text-arctic-gold">DKK {total}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-arctic-ice/60">{adults + children} guests</span>
                    {mobileSummaryOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                </div>
            </button>
            
            {mobileSummaryOpen && (
                <div id="mobile-booking-summary" className="px-4 pb-4 border-t border-white/10 pt-4 space-y-3 animate-in slide-in-from-bottom-2 duration-200">
                    <div className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                                src={tour.image}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="64px"
                            />
                        </div>
                        <div>
                            <p className="font-bold text-sm leading-tight">{tour.title}</p>
                            <p className="text-xs text-arctic-ice/70">{tour.duration}</p>
                        </div>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-arctic-ice/80">Date</span>
                            <span>{date ? date.toLocaleDateString() : "Select date"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-arctic-ice/80">{adults} Adults × DKK {pricePerAdult}</span>
                            <span>DKK {adults * pricePerAdult}</span>
                        </div>
                        {children > 0 && (
                            <div className="flex justify-between">
                                <span className="text-arctic-ice/80">{children} Children × DKK {pricePerChild}</span>
                                <span>DKK {children * pricePerChild}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <>
            <div className="grid lg:grid-cols-2 gap-8 items-start pb-24 lg:pb-0">
                {/* Left Column: Input */}
                <div className="space-y-8">
                    {/* Step 1: Date */}
                    <section className={`transition-opacity ${step !== 1 && step !== 2 ? "opacity-50 pointer-events-none" : ""}`} aria-labelledby="step-1-heading">
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? "bg-arctic-blue text-white" : "bg-arctic-ice/30"}`} aria-hidden="true">1</span>
                            <h3 id="step-1-heading" className="font-serif text-lg font-bold">Select Date</h3>
                        </div>
                        <BookingCalendar onDateSelect={handleDateSelect} selectedDate={date} />
                    </section>

                    {/* Step 2: Guests & Details */}
                    {step >= 2 && (
                        <section className="animate-in slide-in-from-bottom-4 fade-in duration-500" aria-labelledby="step-2-heading">
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? "bg-arctic-blue text-white" : "bg-arctic-ice/30"}`} aria-hidden="true">2</span>
                                <h3 id="step-2-heading" className="font-serif text-lg font-bold">Guests & Details</h3>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-arctic-ice/20 space-y-6">
                                {/* Guest Counters */}
                                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <User className="w-5 h-5 text-arctic-blue/60" aria-hidden="true" />
                                        <div>
                                            <p className="font-medium" id="adults-label">Adults</p>
                                            <p className="text-xs text-arctic-night/50">Age 13+</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3" role="group" aria-labelledby="adults-label">
                                        <button 
                                            onClick={() => setAdults(Math.max(1, adults - 1))} 
                                            className="w-10 h-10 rounded-full border hover:bg-gray-50 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-arctic-blue"
                                            aria-label="Decrease number of adults"
                                            disabled={adults <= 1}
                                        >
                                            <span aria-hidden="true">−</span>
                                        </button>
                                        <span className="w-6 text-center font-medium" aria-live="polite" aria-atomic="true">{adults}</span>
                                        <button 
                                            onClick={() => setAdults(Math.min(7, adults + children) > adults + children ? adults : adults + 1)} 
                                            className="w-10 h-10 rounded-full border hover:bg-gray-50 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-arctic-blue"
                                            aria-label="Increase number of adults"
                                            disabled={adults + children >= 7}
                                        >
                                            <span aria-hidden="true">+</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <Users className="w-5 h-5 text-arctic-blue/60" aria-hidden="true" />
                                        <div>
                                            <p className="font-medium" id="children-label">Children</p>
                                            <p className="text-xs text-arctic-night/50">Age 2-12 (DKK {pricePerChild})</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3" role="group" aria-labelledby="children-label">
                                        <button 
                                            onClick={() => setChildren(Math.max(0, children - 1))} 
                                            className="w-10 h-10 rounded-full border hover:bg-gray-50 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-arctic-blue"
                                            aria-label="Decrease number of children"
                                            disabled={children <= 0}
                                        >
                                            <span aria-hidden="true">−</span>
                                        </button>
                                        <span className="w-6 text-center font-medium" aria-live="polite" aria-atomic="true">{children}</span>
                                        <button 
                                            onClick={() => setChildren(adults + children >= 7 ? children : children + 1)} 
                                            className="w-10 h-10 rounded-full border hover:bg-gray-50 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-arctic-blue"
                                            aria-label="Increase number of children"
                                            disabled={adults + children >= 7}
                                        >
                                            <span aria-hidden="true">+</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Capacity warning */}
                                {adults + children >= 7 && (
                                    <p className="text-sm text-arctic-gold bg-arctic-gold/10 p-3 rounded-lg" role="alert">
                                        Maximum capacity of 7 guests reached. For larger groups, please contact us.
                                    </p>
                                )}

                                {/* Form Fields */}
                                <form onSubmit={handleSubmit} className="space-y-4 pt-2" noValidate>
                                    <div>
                                        <label htmlFor="booking-name" className="block text-sm font-medium text-arctic-blue mb-1">
                                            Full Name <span className="text-red-500" aria-hidden="true">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            id="booking-name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required 
                                            autoComplete="name"
                                            aria-required="true"
                                            aria-invalid={!!errors.name}
                                            aria-describedby={errors.name ? "name-error" : undefined}
                                            className={`w-full p-3 rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-arctic-blue/20`}
                                        />
                                        {errors.name && (
                                            <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">{errors.name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="booking-email" className="block text-sm font-medium text-arctic-blue mb-1">
                                            Email Address <span className="text-red-500" aria-hidden="true">*</span>
                                        </label>
                                        <input 
                                            type="email" 
                                            id="booking-email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required 
                                            autoComplete="email"
                                            aria-required="true"
                                            aria-invalid={!!errors.email}
                                            aria-describedby={errors.email ? "email-error" : undefined}
                                            className={`w-full p-3 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-arctic-blue/20`}
                                        />
                                        {errors.email && (
                                            <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">{errors.email}</p>
                                        )}
                                    </div>
                                    <Button type="submit" size="lg" className="w-full mt-4">Complete Request</Button>
                                </form>
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column: Summary Card (Sticky) - Desktop only */}
                <div className="hidden lg:block lg:sticky lg:top-24">
                    <div className="bg-arctic-night text-white p-6 rounded-xl shadow-xl">
                        <h3 className="font-serif text-xl font-bold mb-6 text-arctic-gold">Booking Summary</h3>

                        <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                    src={tour.image}
                                    alt=""
                                    fill
                                    className="object-cover"
                                    sizes="80px"
                                />
                            </div>
                            <div>
                                <p className="font-bold leading-tight mb-1">{tour.title}</p>
                                <p className="text-sm text-arctic-ice/70">{tour.duration}</p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-arctic-ice/80">Date</span>
                                <span className="font-medium">{date ? date.toLocaleDateString() : "Select date"}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-arctic-ice/80">{adults} Adults × DKK {pricePerAdult}</span>
                                <span>DKK {adults * pricePerAdult}</span>
                            </div>
                            {children > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-arctic-ice/80">{children} Children × DKK {pricePerChild}</span>
                                    <span>DKK {children * pricePerChild}</span>
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                            <span className="text-arctic-ice/60 text-sm">Total</span>
                            <span className="text-2xl font-bold text-arctic-gold">DKK {total}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Mobile Summary Bar */}
            <MobileSummary />
        </>
    );
}
