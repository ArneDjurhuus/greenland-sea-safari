"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Typography';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple mock authentication
        if (email === 'admin@greenlandseasafari.com' && password === 'admin123') {
            // Set a cookie or local storage
            localStorage.setItem('admin-auth', 'true');
            router.push('/admin/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-arctic-ice/20 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-arctic-ice/20">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-arctic-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-arctic-blue" />
                    </div>
                    <Heading level={2} className="text-arctic-blue">Admin Login</Heading>
                    <p className="text-arctic-night/60">Sign in to manage bookings</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-arctic-night/70 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-arctic-ice/30 focus:border-arctic-blue focus:ring-2 focus:ring-arctic-blue/20 outline-none transition-all"
                            placeholder="admin@greenlandseasafari.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-arctic-night/70 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-arctic-ice/30 focus:border-arctic-blue focus:ring-2 focus:ring-arctic-blue/20 outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full bg-arctic-blue text-white hover:bg-arctic-blue/90 py-6">
                        Sign In
                    </Button>
                </form>
                
                <div className="mt-6 text-center text-xs text-arctic-night/40">
                    <p>Demo Credentials:</p>
                    <p>admin@greenlandseasafari.com / admin123</p>
                </div>
            </div>
        </div>
    );
}
