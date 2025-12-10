"use client";

import { useState } from 'react';
import { Heading } from '@/components/ui/Typography';
import { Search, Mail, Phone, Calendar } from 'lucide-react';
import { CustomerData } from './types';

interface CustomersClientProps {
    initialCustomers: CustomerData[];
}

export default function CustomersClient({ initialCustomers }: CustomersClientProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = initialCustomers.filter(customer =>
        customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.customer_email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <Heading level={1} className="text-arctic-blue">Customers</Heading>
                    <p className="text-arctic-night/60">View all customers who have made bookings</p>
                </div>
                <div className="text-sm text-gray-500">
                    {initialCustomers.length} total customers
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-arctic-blue focus:ring-2 focus:ring-arctic-blue/20 outline-none"
                    />
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Customer</th>
                                <th className="px-6 py-4 font-medium">Contact</th>
                                <th className="px-6 py-4 font-medium">Bookings</th>
                                <th className="px-6 py-4 font-medium">Total Spent</th>
                                <th className="px-6 py-4 font-medium">Last Booking</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCustomers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No customers found.
                                    </td>
                                </tr>
                            ) : (
                                filteredCustomers.map((customer, index) => (
                                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-arctic-blue/10 flex items-center justify-center text-arctic-blue font-bold">
                                                    {customer.customer_name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-medium text-gray-900">{customer.customer_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Mail className="w-3.5 h-3.5" />
                                                    <span className="text-xs">{customer.customer_email}</span>
                                                </div>
                                                {customer.customer_phone && (
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Phone className="w-3.5 h-3.5" />
                                                        <span className="text-xs">{customer.customer_phone}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1 text-gray-600">
                                                <Calendar className="w-4 h-4" />
                                                {customer.booking_count}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            DKK {customer.total_spent.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(customer.last_booking).toLocaleDateString()}
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
