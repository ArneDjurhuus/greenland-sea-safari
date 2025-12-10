"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, Users, Settings, LogOut, Ship, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from '@/app/actions/authActions';

export function AdminSidebar() {
    const pathname = usePathname();

    const links = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
        { name: 'Messages', href: '/admin/messages', icon: Mail },
        { name: 'Customers', href: '/admin/customers', icon: Users },
        { name: 'Tours', href: '/admin/tours', icon: Ship },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="w-64 bg-arctic-night text-white min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-50">
            <div className="p-6 border-b border-white/10">
                <h1 className="text-xl font-serif font-bold text-white">
                    Greenland<span className="text-arctic-gold">Admin</span>
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                isActive 
                                    ? "bg-arctic-blue text-white" 
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{link.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <form action={signOut}>
                    <button
                        type="submit"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-colors w-full"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
