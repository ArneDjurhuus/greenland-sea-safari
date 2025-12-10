"use client";

import { useState } from 'react';
import { Heading } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Mail, Trash2, CheckCircle, Clock } from 'lucide-react';
import { markMessageAsRead, deleteMessage } from '@/app/actions/contactActions';
import { useRouter } from 'next/navigation';

interface Message {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface MessagesClientProps {
    initialMessages: Message[];
}

export default function MessagesClient({ initialMessages }: MessagesClientProps) {
    const [messages, setMessages] = useState(initialMessages);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const router = useRouter();

    const handleMarkAsRead = async (id: string) => {
        setLoadingId(id);
        try {
            await markMessageAsRead(id);
            setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m));
            router.refresh();
        } catch (error) {
            console.error('Failed to mark as read', error);
            alert('Failed to update message');
        } finally {
            setLoadingId(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;
        
        setLoadingId(id);
        try {
            await deleteMessage(id);
            setMessages(messages.filter(m => m.id !== id));
            router.refresh();
        } catch (error) {
            console.error('Failed to delete', error);
            alert('Failed to delete message');
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <Heading level={1} className="text-arctic-blue">Messages</Heading>
                <p className="text-arctic-night/60">Manage inquiries from the contact form</p>
            </div>

            <div className="space-y-4">
                {messages.length === 0 ? (
                    <Card className="p-8 text-center text-gray-500">
                        <Mail className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No messages found.</p>
                    </Card>
                ) : (
                    messages.map((msg) => (
                        <Card key={msg.id} className={`p-6 transition-all ${!msg.is_read ? 'border-l-4 border-l-arctic-blue bg-blue-50/30' : ''}`}>
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-lg text-arctic-night">{msg.subject}</h3>
                                        {!msg.is_read && (
                                            <span className="bg-arctic-blue text-white text-xs px-2 py-1 rounded-full">New</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="font-medium text-gray-700">{msg.name}</span>
                                        <span>&bull;</span>
                                        <a href={`mailto:${msg.email}`} className="hover:text-arctic-blue transition-colors">{msg.email}</a>
                                        <span>&bull;</span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(msg.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mt-4 whitespace-pre-wrap">{msg.message}</p>
                                </div>

                                <div className="flex md:flex-col gap-2 justify-start md:justify-center min-w-[120px]">
                                    {!msg.is_read && (
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            onClick={() => handleMarkAsRead(msg.id)}
                                            disabled={loadingId === msg.id}
                                            className="w-full justify-start"
                                        >
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Mark Read
                                        </Button>
                                    )}
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => handleDelete(msg.id)}
                                        disabled={loadingId === msg.id}
                                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
