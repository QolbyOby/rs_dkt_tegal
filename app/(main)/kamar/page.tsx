// File: src/components/HospitalRoomInfo.tsx

"use client"; // Diperlukan jika Anda menggunakan Next.js App Router

import React, { useState, useMemo, useEffect } from 'react';

// 1. Impor Ikon dari Lucide React
import {
     Bed,
    CircleDollarSign, Users,
    Crown,
    BedDouble,
    BedSingle,
    Clock
} from 'lucide-react';

// 2. Impor Komponen dari shadcn/ui
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Definisi Tipe Data (Tetap sama)
type RoomStatus = 'available' | 'occupied' | 'maintenance';

interface Room {
    id: number;
    status: RoomStatus;
    price: string;
    capacity: number;
    features: string[];
}

// Data Kamar (Bisa dari API)
const roomData: Room[] = [
    { id: 101,   status: "available", price: "Rp 350.000/hari", capacity: 2, features: ["AC", "TV", "Kamar Mandi"] },
    { id: 102,   status: "occupied", price: "Rp 350.000/hari", capacity: 2, features: ["AC", "TV", "Kamar Mandi"] },
    { id: 103,   status: "maintenance", price: "Rp 350.000/hari", capacity: 2, features: ["AC", "TV", "Kamar Mandi"] },
    { id: 201, status: "available", price: "Rp 500.000/hari", capacity: 2, features: ["AC", "TV", "Kamar Mandi", "Kulkas"] },
    { id: 401,  status: "available", price: "Rp 1.200.000/hari", capacity: 2, features: ["AC", "TV", "Kamar Mandi", "Kulkas", "Ruang Tamu"] },
    { id: 501,   status: "occupied", price: "Rp 2.500.000/hari", capacity: 2, features: ["AC", "TV", "Kamar Mandi", "Kulkas", "Balkon"] },
];

// Helper untuk styling Badge berdasarkan status
const getStatusBadgeVariant = (status: RoomStatus): 'default' | 'destructive' | 'secondary' => {
    switch (status) {
        case 'available':
            return 'default'; // Biasanya hijau, bisa dikustomisasi di tailwind.config.js
        case 'occupied':
            return 'destructive'; // Merah
        case 'maintenance':
            return 'secondary'; // Abu-abu
    }
};

const statusTextMap: Record<RoomStatus, string> = {
    available: "Tersedia",
    occupied: "Terisi",
    maintenance: "Perawatan",
};


// Komponen Card untuk setiap kamar (di-refactor dengan shadcn/ui)
const RoomCard: React.FC<{ room: Room }> = ({ room }) => (
    <Card className="flex flex-col h-full transition-all hover:shadow-lg">
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-xl">Kamar {room.id}</CardTitle>
                </div>
                <Badge variant={getStatusBadgeVariant(room.status)}>
                    {statusTextMap[room.status]}
                </Badge>
            </div>
        </CardHeader>
        <CardContent className="flex-grow">
            <div className="space-y-3">
                <div className="flex items-center text-sm">
                    <CircleDollarSign className="w-4 h-4 mr-2 text-primary" />
                    <span className="font-semibold">{room.price}</span>
                </div>
                <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2 text-primary" />
                    <span>Kapasitas: {room.capacity} orang</span>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground mb-2">Fasilitas:</p>
                    <div className="flex flex-wrap gap-2">
                        {room.features.map(feature => (
                            <Badge key={feature} variant="outline">{feature}</Badge>
                        ))}
                    </div>
                </div>
            </div>
        </CardContent>
        <div className="p-6 pt-0">
            <Button className="w-full">
                <Clock className="w-4 h-4 mr-2" />
                Update Terakhir 19:00 24/5/2025

            </Button>
        </div>
    </Card>
);

// Komponen Utama
const HospitalRoomInfo: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState<RoomStatus | 'all'>('all');
    const [activeFloor, setActiveFloor] = useState<string>('all');
    const [lastUpdated, setLastUpdated] = useState('');

    useEffect(() => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        setLastUpdated(now.toLocaleDateString('id-ID', options) + ' WIB');
    }, []);

    const filteredRooms = useMemo(() => {
        return roomData.filter(room => {
            const matchesFilter = activeFilter === 'all' || room.status === activeFilter;
            const matchesSearch = searchTerm === '' ||
                room.id.toString().includes(searchTerm) ||
                room.status.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [searchTerm, activeFilter]);

    const stats = {
        total: roomData.length,
        available: roomData.filter(r => r.status === 'available').length,
        occupied: roomData.filter(r => r.status === 'occupied').length,
        maintenance: roomData.filter(r => r.status === 'maintenance').length,
    };

    const filterButtons: { label: string; filter: RoomStatus | 'all'; }[] = [
        { label: 'Semua', filter: 'all' },
        { label: 'Tersedia', filter: 'available' },
        { label: 'Terisi', filter: 'occupied' },
        { label: 'Perawatan', filter: 'maintenance' }
    ];


    return (
        <div className="bg-background min-h-screen text-foreground">
            <div className="container mx-auto px-4 py-8">
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="relative flex-grow">
                                <h1 className="text-3xl font-bold text-primary mb-2">Informasi Ketersediaan Kamar</h1>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                {filterButtons.map(({ label, filter }) => (
                                    <Button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        variant={activeFilter === filter ? 'default' : 'outline'}
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard icon={Crown} label="Total Kamar VIP" value={stats.total} />
                    <StatCard icon={BedDouble} label="Total kamar 1" value={stats.available} />
                    <StatCard icon={BedSingle} label="Total Kamar 2" value={stats.occupied} />
                    <StatCard icon={Bed} label="Total Kamar 3" value={stats.maintenance} />
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold tracking-tight mb-4">Daftar Kamar</h2>
                    {filteredRooms.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredRooms.map(room => (
                                <RoomCard key={room.id} room={room} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>Tidak ada kamar yang sesuai dengan kriteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Komponen Card untuk Statistik (di-refactor dengan shadcn/ui)
const StatCard: React.FC<{ icon: React.ElementType; label: string; value: number; }> = ({ icon: Icon, label, value }) => (
    <Card>
        <CardContent className="p-6 flex items-center">
            <div className="p-3 rounded-md bg-primary/10 text-primary mr-4">
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </CardContent>
    </Card>
);

export default HospitalRoomInfo;