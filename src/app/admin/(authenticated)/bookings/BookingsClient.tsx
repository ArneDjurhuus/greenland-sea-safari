"use client";

import { useState, useTransition } from 'react';
import { Heading } from '@/components/ui/Typography';
import { Search, Filter, Download, MoreHorizontal, Check, X, Clock, Trash2, CreditCard } from 'lucide-react';
import { updateBookingStatus, deleteBooking } from '@/app/actions/bookingActions';

// Define the shape of the booking data we expect from the server
export type BookingData = {
    id: string;
    customer_name: string;
    customer_email: string;
    tour_date: string;
    guest_count: number;
    status: string;
    payment_status?: string;
    total_price_dkk: number;
    tours: {
        title: string;
    } | null;
};

interface BookingsClientProps {
    initialBookings: BookingData[];
}

export default function BookingsClient({ initialBookings }: BookingsClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const filteredBookings = initialBookings.filter(booking => {
        const matchesSearch = 
            booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.id.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const handleStatusChange = (bookingId: string, newStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed') => {
        startTransition(async () => {
            await updateBookingStatus(bookingId, newStatus);
            setOpenMenu(null);
        });
    };

    const handleDelete = (bookingId: string) => {
        if (confirm('Are you sure you want to delete this booking?')) {
            startTransition(async () => {
                await deleteBooking(bookingId);
                setOpenMenu(null);
            });
        }
    };

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
                        <option value="completed">Completed</option>
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
                                <th className="px-6 py-4 font-medium">Payment</th>
                                <th className="px-6 py-4 font-medium text-right">Amount</th>
                                <th className="px-6 py-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                                        No bookings found.
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((booking) => (
                                    <tr key={booking.id} className={`hover:bg-gray-50/50 transition-colors ${isPending ? 'opacity-50' : ''}`}>
                                        <td className="px-6 py-4 font-mono text-gray-500 text-xs">{booking.id.slice(0, 8)}...</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {booking.customer_name}
                                            <div className="text-xs text-gray-400 font-normal">{booking.customer_email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{booking.tours?.title || 'Unknown Tour'}</td>
                                        <td className="px-6 py-4 text-gray-600">{new Date(booking.tour_date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-gray-600">{booking.guest_count}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                                                ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                                ${booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                                                ${booking.status === 'completed' ? 'bg-blue-100 text-blue-800' : ''}
                                            `}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                ${booking.payment_status === 'paid' ? 'bg-green-100 text-green-800' : ''}
                                                ${booking.payment_status === 'unpaid' ? 'bg-gray-100 text-gray-600' : ''}
                                                ${booking.payment_status === 'refunded' ? 'bg-purple-100 text-purple-800' : ''}
                                            `}>
                                                <CreditCard className="w-3 h-3" />
                                                {booking.payment_status || 'unpaid'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-gray-900">
                                            DKK {booking.total_price_dkk.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 relative">
                                            <button 
                                                onClick={() => setOpenMenu(openMenu === booking.id ? null : booking.id)}
                                                className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"
                                            >
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                            
                                            {/* Dropdown Menu */}
                                            {openMenu === booking.id && (
                                                <div className="absolute right-0 top-12 z-10 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                                                    <button
                                                        onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                    >
                                                        <Check className="w-4 h-4 text-green-600" />
                                                        Confirm
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(booking.id, 'pending')}
                                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                    >
                                                        <Clock className="w-4 h-4 text-yellow-600" />
                                                        Mark Pending
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(booking.id, 'completed')}
                                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                    >
                                                        <Check className="w-4 h-4 text-blue-600" />
                                                        Mark Completed
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                    >
                                                        <X className="w-4 h-4 text-red-600" />
                                                        Cancel
                                                    </button>
                                                    <hr className="my-1" />
                                                    <button
                                                        onClick={() => handleDelete(booking.id)}
                                                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
