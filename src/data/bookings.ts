export interface Booking {
    id: string;
    customerName: string;
    email: string;
    phone: string;
    tourId: string;
    tourName: string;
    date: string;
    guests: number;
    totalPrice: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    createdAt: string;
}

export const mockBookings: Booking[] = [
    {
        id: 'BK-2025-001',
        customerName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 555 0123',
        tourId: 'midnight-sun',
        tourName: 'Midnight Sun Whale Safari',
        date: '2025-06-25',
        guests: 2,
        totalPrice: '1.990 DKK',
        status: 'confirmed',
        createdAt: '2025-01-15T10:30:00Z'
    },
    {
        id: 'BK-2025-002',
        customerName: 'Sarah Smith',
        email: 'sarah.smith@example.com',
        phone: '+44 20 7123 4567',
        tourId: 'ice-fjord',
        tourName: 'Ice Fjord Explorer',
        date: '2025-07-02',
        guests: 4,
        totalPrice: '3.580 DKK',
        status: 'pending',
        createdAt: '2025-02-20T14:15:00Z'
    },
    {
        id: 'BK-2025-003',
        customerName: 'Michael Brown',
        email: 'm.brown@example.com',
        phone: '+49 30 123456',
        tourId: 'hot-tub',
        tourName: 'Arctic Hot Tub Experience',
        date: '2025-07-10',
        guests: 2,
        totalPrice: '5.000 DKK',
        status: 'cancelled',
        createdAt: '2025-03-05T09:00:00Z'
    },
    {
        id: 'BK-2025-004',
        customerName: 'Emma Wilson',
        email: 'emma.w@example.com',
        phone: '+1 555 9876',
        tourId: 'midnight-sun',
        tourName: 'Midnight Sun Whale Safari',
        date: '2025-08-15',
        guests: 3,
        totalPrice: '2.985 DKK',
        status: 'confirmed',
        createdAt: '2025-04-10T16:45:00Z'
    },
    {
        id: 'BK-2025-005',
        customerName: 'Lars Jensen',
        email: 'lars.jensen@example.dk',
        phone: '+45 12 34 56 78',
        tourId: 'ice-fjord',
        tourName: 'Ice Fjord Explorer',
        date: '2025-06-28',
        guests: 6,
        totalPrice: '5.370 DKK',
        status: 'pending',
        createdAt: '2025-05-01T11:20:00Z'
    }
];
