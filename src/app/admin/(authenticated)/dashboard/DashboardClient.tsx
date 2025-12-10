"use client";

import { Heading } from '@/components/ui/Typography';
import { DollarSign, Users, Calendar, TrendingUp } from 'lucide-react';

interface DashboardClientProps {
    stats: {
        totalRevenue: number;
        totalBookings: number;
        pendingBookings: number;
        totalGuests: number;
    }
}

export default function DashboardClient({ stats }: DashboardClientProps) {
    const statCards = [
        { name: 'Total Revenue', value: `${stats.totalRevenue.toLocaleString()} DKK`, icon: DollarSign, color: 'bg-green-500' },
        { name: 'Total Bookings', value: stats.totalBookings, icon: Calendar, color: 'bg-blue-500' },
        { name: 'Pending Requests', value: stats.pendingBookings, icon: TrendingUp, color: 'bg-orange-500' },
        { name: 'Total Guests', value: stats.totalGuests, icon: Users, color: 'bg-purple-500' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <Heading level={1} className="text-arctic-blue">Dashboard</Heading>
                <p className="text-arctic-night/60">Overview of your tour business</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                                    <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                                </div>
                                <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">All Time</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            <p className="text-sm text-gray-500">{stat.name}</p>
                        </div>
                    );
                })}
            </div>
            
            {/* Recent Activity Placeholder */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                <p className="text-gray-500 text-sm">Real-time activity feed coming soon.</p>
            </div>
        </div>
    );
}
