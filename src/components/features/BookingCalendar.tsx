"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface BookingCalendarProps {
    onDateSelect: (date: Date) => void;
    selectedDate?: Date;
}

export function BookingCalendar({ onDateSelect, selectedDate }: BookingCalendarProps) {
    const [currentDate] = useState(new Date());

    // Mocking current month view (static for simplicity of visual demo)
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const startDayOffset = 4; // Arbitrary start day for visual alignment

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-arctic-ice/20">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-lg font-bold text-arctic-blue">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-semibold text-arctic-night/50">
                <div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div>
            </div>

            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: startDayOffset }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}
                {days.map((day) => {
                    const isSelected = selectedDate?.getDate() === day;
                    const isAvailable = day % 3 !== 0; // Mock availability

                    return (
                        <button
                            key={day}
                            onClick={() => isAvailable && onDateSelect(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                            disabled={!isAvailable}
                            className={`
                h-10 w-full rounded-md text-sm font-medium transition-all flex items-center justify-center relative
                ${isSelected
                                    ? "bg-arctic-blue text-white shadow-md scale-105"
                                    : isAvailable
                                        ? "hover:bg-arctic-ice/20 text-arctic-night bg-arctic-white"
                                        : "opacity-30 cursor-not-allowed bg-arctic-ice/5 text-arctic-night/40"
                                }
              `}
                        >
                            {day}
                            {isAvailable && !isSelected && (day % 4 === 0) && (
                                <div className="absolute bottom-1 w-1 h-1 bg-arctic-green rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 flex gap-4 text-xs text-arctic-night/60 justify-center">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-arctic-blue" /> Selected</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-arctic-white border border-arctic-ice" /> Available</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-arctic-green" /> Best Value</div>
            </div>
        </div>
    );
}
