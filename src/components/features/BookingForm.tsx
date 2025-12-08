"use client";

import { useState } from "react";
import { BookingCalendar } from "./BookingCalendar";
import { Button } from "@/components/ui/Button";
import { Check, User, Users } from "lucide-react";
import { Tour } from '@/data/tours';

interface BookingFormProps {
    tour: Tour;
}

export function BookingForm({ tour }: BookingFormProps) {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [date, setDate] = useState<Date | undefined>();
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);

    const pricePerAdult = parseInt(tour.price.replace(/\D/g, ''));
    const pricePerChild = Math.round(pricePerAdult * 0.5);
    const total = (adults * pricePerAdult) + (children * pricePerChild);

    const handleDateSelect = (d: Date) => {
        setDate(d);
        setStep(2);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(3);
    };

    if (step === 3) {
        return (
            <div className="bg-white p-8 rounded-xl shadow-lg border border-arctic-green/30 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-arctic-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
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

    return (
        <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Column: Input */}
            <div className="space-y-8">
                {/* Step 1: Date */}
                <section className={`transition-opacity ${step !== 1 && step !== 2 ? "opacity-50 pointer-events-none" : ""}`}>
                    <div className="flex items-center gap-3 mb-4">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? "bg-arctic-blue text-white" : "bg-arctic-ice/30"}`}>1</span>
                        <h3 className="font-serif text-lg font-bold">Select Date</h3>
                    </div>
                    <BookingCalendar onDateSelect={handleDateSelect} selectedDate={date} />
                </section>

                {/* Step 2: Guests & Details */}
                {step >= 2 && (
                    <section className="animate-in slide-in-from-bottom-4 fade-in duration-500">
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? "bg-arctic-blue text-white" : "bg-arctic-ice/30"}`}>2</span>
                            <h3 className="font-serif text-lg font-bold">Guests & Details</h3>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-arctic-ice/20 space-y-6">
                            {/* Guest Counters */}
                            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <User className="w-5 h-5 text-arctic-blue/60" />
                                    <div>
                                        <p className="font-medium">Adults</p>
                                        <p className="text-xs text-arctic-night/50">Age 13+</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded-full border hover:bg-gray-50">-</button>
                                    <span className="w-4 text-center">{adults}</span>
                                    <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 rounded-full border hover:bg-gray-50">+</button>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-arctic-blue/60" />
                                    <div>
                                        <p className="font-medium">Children</p>
                                        <p className="text-xs text-arctic-night/50">Age 2-12 ({Math.round(pricePerAdult * 0.5)} DKK)</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded-full border hover:bg-gray-50">-</button>
                                    <span className="w-4 text-center">{children}</span>
                                    <button onClick={() => setChildren(children + 1)} className="w-8 h-8 rounded-full border hover:bg-gray-50">+</button>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                                <input type="text" placeholder="Full Name" required className="w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-arctic-blue/20" />
                                <input type="email" placeholder="Email Address" required className="w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-arctic-blue/20" />
                                <Button type="submit" size="lg" className="w-full mt-4">Complete Request</Button>
                            </form>
                        </div>
                    </section>
                )}
            </div>

            {/* Right Column: Summary Card (Sticky) */}
            <div className="lg:sticky lg:top-24">
                <div className="bg-arctic-night text-white p-6 rounded-xl shadow-xl">
                    <h3 className="font-serif text-xl font-bold mb-6 text-arctic-gold">Booking Summary</h3>

                    <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
                        <div
                            className="w-20 h-20 bg-cover bg-center rounded-lg flex-shrink-0"
                            style={{ backgroundImage: `url(${tour.image})` }}
                        />
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
                            <span className="text-arctic-ice/80">{adults} Adults</span>
                            <span>DKK {adults * pricePerAdult}</span>
                        </div>
                        {children > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-arctic-ice/80">{children} Children</span>
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
    );
}
