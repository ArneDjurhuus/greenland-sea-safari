"use client";

import { useState, useEffect } from 'react';
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Wind, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DailyForecast {
    date: string;
    maxTemp: number;
    minTemp: number;
    weatherCode: number;
}

interface WeatherData {
    current: {
        temperature: number;
        weatherCode: number;
        windSpeed: number;
    };
    daily: DailyForecast[];
}

export function WeatherWidget({ className }: { className?: string }) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        async function fetchWeather() {
            try {
                // Ilulissat coordinates: 69.2167° N, 51.1000° W
                const res = await fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=69.2167&longitude=-51.1000&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&timezone=auto'
                );
                const data = await res.json();
                
                const dailyData: DailyForecast[] = data.daily.time.slice(1, 6).map((time: string, index: number) => ({
                    date: time,
                    maxTemp: Math.round(data.daily.temperature_2m_max[index + 1]),
                    minTemp: Math.round(data.daily.temperature_2m_min[index + 1]),
                    weatherCode: data.daily.weather_code[index + 1]
                }));

                setWeather({
                    current: {
                        temperature: Math.round(data.current.temperature_2m),
                        weatherCode: data.current.weather_code,
                        windSpeed: Math.round(data.current.wind_speed_10m)
                    },
                    daily: dailyData
                });
            } catch (error) {
                console.error('Failed to fetch weather', error);
            } finally {
                setLoading(false);
            }
        }

        fetchWeather();
    }, []);

    if (loading) return null;
    if (!weather) return null;

    const getWeatherIcon = (code: number, className: string = "w-6 h-6") => {
        if (code === 0) return <Sun className={cn("text-arctic-gold", className)} />;
        if (code <= 3) return <Cloud className={cn("text-arctic-ice", className)} />;
        if (code <= 48) return <CloudFog className={cn("text-arctic-ice", className)} />;
        if (code <= 57) return <CloudDrizzle className={cn("text-arctic-blue", className)} />;
        if (code <= 67) return <CloudRain className={cn("text-arctic-blue", className)} />;
        if (code <= 77) return <CloudSnow className={cn("text-white", className)} />;
        if (code <= 82) return <CloudRain className={cn("text-arctic-blue", className)} />;
        if (code <= 86) return <CloudSnow className={cn("text-white", className)} />;
        return <CloudLightning className={cn("text-yellow-400", className)} />;
    };

    const getDayName = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });
    };

    return (
        <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
                "bg-arctic-night/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 text-white shadow-2xl min-w-[280px] cursor-pointer transition-all duration-300 ease-in-out overflow-hidden group",
                isExpanded ? "scale-100" : "hover:scale-105",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-widest font-bold text-arctic-gold">
                    Live Weather
                </span>
                <span className="text-[10px] font-medium text-white/60">Ilulissat</span>
            </div>
            
            {/* Current Weather */}
            <div className={cn(
                "flex items-center justify-between gap-4 transition-all duration-300",
                isExpanded ? "mb-6 pb-6 border-b border-white/10" : "mb-2"
            )}>
                <div className="flex items-center gap-3">
                    {getWeatherIcon(weather.current.weatherCode, "w-10 h-10")}
                    <span className="text-4xl font-bold">{weather.current.temperature}°</span>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-white/90">
                        <Wind className="w-4 h-4" />
                        <span>{weather.current.windSpeed} m/s</span>
                    </div>
                </div>
            </div>

            {/* 5-Day Forecast */}
            <div className={cn(
                "space-y-3 transition-all duration-500 ease-in-out overflow-hidden",
                isExpanded ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
            )}>
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2 block">
                    5-Day Forecast
                </span>
                {weather.daily.map((day) => (
                    <div key={day.date} className="flex items-center justify-between text-sm">
                        <span className="w-8 font-medium text-white/80">{getDayName(day.date)}</span>
                        <div className="flex items-center justify-center">
                            {getWeatherIcon(day.weatherCode, "w-4 h-4")}
                        </div>
                        <div className="flex gap-3 w-16 justify-end text-xs">
                            <span className="font-bold">{day.maxTemp}°</span>
                            <span className="text-white/40">{day.minTemp}°</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Visual Cue */}
            <div className="flex justify-center mt-2">
                 <ChevronDown className={cn(
                     "w-4 h-4 text-white/50 transition-transform duration-300",
                     isExpanded ? "rotate-180" : "animate-bounce"
                 )} />
            </div>
        </div>
    );
}
