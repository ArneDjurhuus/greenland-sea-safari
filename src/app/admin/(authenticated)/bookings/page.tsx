"use client";

import { useState } from 'react';
import { Heading } from '@/components/ui/Typography';
import { mockBookings } from '@/data/bookings';
import { Search, Filter, Download, MoreHorizontal } from 'lucide-react';

export default function BookingsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredBookings = mockBookings.filter(booking => {
        const matchesSearch = 
            booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.id.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <Heading level={1} className="text-arctic-blue">Bookings</Heading>
                    <p className="text-arctic-night/60">Manage all tour reservations</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-arctic-blue text-white rounded-lg text-sm font-medium hover:bg-arctic-blue/90 shadow-lg shadow-arctic-blue/20">
                        + New Booking
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-arctic-blue focus:ring-2 focus:ring-arctic-blue/20 outline-none"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-200 focus:border-arctic-blue focus:ring-2 focus:ring-arctic-blue/20 outline-none bg-white text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Booking ID</th>
                                <th className="px-6 py-4 font-medium">Customer</th>
                                <th className="px-6 py-4 font-medium">Tour</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Guests</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Amount</th>
                                <th className="px-6 py-4 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4 font-mono text-gray-500">{booking.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {booking.customerName}
                                        <div className="text-xs text-gray-400 font-normal">{booking.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{booking.tourName}</td>
                                    <td className="px-6 py-4 text-gray-600">{booking.date}</td>
                                    <td className="px-6 py-4 text-gray-600">{booking.guests}</td>
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
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredBookings.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                        No bookings found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
}
