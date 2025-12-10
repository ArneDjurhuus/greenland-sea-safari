"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface BookingCalendarProps {
    onDateSelect: (date: Date) => void;
    selectedDate?: Date;
}

export function BookingCalendar({ onDateSelect, selectedDate }: BookingCalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate days in the current month
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    // Adjust for Monday start (0 = Monday, 6 = Sunday)
    const startDayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const isPastDate = (day: number) => {
        const date = new Date(year, month, day);
        return date < today;
    };

    const isSelectedDate = (day: number) => {
        if (!selectedDate) return false;
        return (
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year
        );
    };

    const monthYearLabel = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-arctic-ice/20" role="application" aria-label="Booking calendar">
            <div className="flex items-center justify-between mb-6">
                <h3 id="calendar-heading" className="font-serif text-lg font-bold text-arctic-blue">
                    {monthYearLabel}
                </h3>
                <div className="flex gap-2" role="group" aria-label="Calendar navigation">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={goToPreviousMonth}
                        aria-label={`Go to previous month`}
                    >
                        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={goToNextMonth}
                        aria-label={`Go to next month`}
                    >
                        <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-semibold text-arctic-night/50" role="row" aria-label="Days of the week">
                <div role="columnheader" aria-label="Monday">Mo</div>
                <div role="columnheader" aria-label="Tuesday">Tu</div>
                <div role="columnheader" aria-label="Wednesday">We</div>
                <div role="columnheader" aria-label="Thursday">Th</div>
                <div role="columnheader" aria-label="Friday">Fr</div>
                <div role="columnheader" aria-label="Saturday">Sa</div>
                <div role="columnheader" aria-label="Sunday">Su</div>
            </div>

            <div className="grid grid-cols-7 gap-2" role="grid" aria-labelledby="calendar-heading">
                {Array.from({ length: startDayOffset }).map((_, i) => (
                    <div key={`empty-${i}`} aria-hidden="true" />
                ))}
                {days.map((day) => {
                    const isSelected = isSelectedDate(day);
                    const isPast = isPastDate(day);
                    // Mock availability - in production, this would come from a database
                    const isAvailable = !isPast && day % 3 !== 0;
                    const dateObj = new Date(year, month, day);
                    const dateLabel = dateObj.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

                    return (
                        <button
                            key={day}
                            onClick={() => isAvailable && onDateSelect(dateObj)}
                            disabled={!isAvailable}
                            aria-label={`${dateLabel}${isSelected ? ', selected' : ''}${!isAvailable ? ', unavailable' : ''}`}
                            aria-pressed={isSelected}
                            className={`
                                h-10 w-full rounded-md text-sm font-medium transition-all flex items-center justify-center relative
                                focus:outline-none focus:ring-2 focus:ring-arctic-blue focus:ring-offset-2
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
                                <div className="absolute bottom-1 w-1 h-1 bg-arctic-green rounded-full" aria-hidden="true" />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 flex gap-4 text-xs text-arctic-night/60 justify-center" aria-label="Calendar legend">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-arctic-blue" aria-hidden="true" /> Selected</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-arctic-white border border-arctic-ice" aria-hidden="true" /> Available</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-arctic-green" aria-hidden="true" /> Best Value</div>
            </div>
        </div>
    );
}
