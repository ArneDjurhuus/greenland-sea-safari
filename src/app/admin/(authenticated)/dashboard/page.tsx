"use client";

import { Heading } from '@/components/ui/Typography';
import { mockBookings } from '@/data/bookings';
import { DollarSign, Users, Calendar, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
    // Calculate stats
    const totalRevenue = mockBookings.reduce((acc, booking) => {
        const price = parseInt(booking.totalPrice.replace('.', '').replace(' DKK', ''));
        return booking.status !== 'cancelled' ? acc + price : acc;
    }, 0);

    const totalBookings = mockBookings.length;
    const pendingBookings = mockBookings.filter(b => b.status === 'pending').length;
    const totalGuests = mockBookings.reduce((acc, b) => b.status !== 'cancelled' ? acc + b.guests : acc, 0);

    const stats = [
        { name: 'Total Revenue', value: `${totalRevenue.toLocaleString()} DKK`, icon: DollarSign, color: 'bg-green-500' },
        { name: 'Total Bookings', value: totalBookings, icon: Calendar, color: 'bg-blue-500' },
        { name: 'Pending Requests', value: pendingBookings, icon: TrendingUp, color: 'bg-orange-500' },
        { name: 'Total Guests', value: totalGuests, icon: Users, color: 'bg-purple-500' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <Heading level={1} className="text-arctic-blue">Dashboard</Heading>
                <p className="text-arctic-night/60">Overview of your tour business</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                                    <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                                </div>
                                <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">This Month</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            <p className="text-sm text-gray-500">{stat.name}</p>
                        </div>
                    );
                })}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <Heading level={3} className="text-lg! mb-0!">Recent Bookings</Heading>
                    <button className="text-sm text-arctic-blue font-medium hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Booking ID</th>
                                <th className="px-6 py-4 font-medium">Customer</th>
                                <th className="px-6 py-4 font-medium">Tour</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockBookings.slice(0, 5).map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-gray-500">{booking.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {booking.customerName}
                                        <div className="text-xs text-gray-400 font-normal">{booking.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{booking.tourName}</td>
                                    <td className="px-6 py-4 text-gray-600">{booking.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                                            ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                            ${booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                                        `}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium text-gray-900">{booking.totalPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
