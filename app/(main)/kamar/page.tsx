// File: app/(main)/kamar/page.tsx

"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
    Bed,
    CircleDollarSign, Users,
    Crown,
    BedDouble,
    BedSingle,
    Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Room } from "@/lib/db/schema"; // Impor tipe Room

type RoomStatus = 'available' | 'occupied' | 'maintenance';
import tabelKamar from '@/public/img/kamar_satset.png'
import Image from 'next/image';
import kamar_I from "@/public/img/kamar_I.jpeg"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AnimatePresence, motion } from "framer-motion"

// Helper untuk styling Badge berdasarkan status
const getStatusBadgeVariant = (status: RoomStatus): 'default' | 'destructive' | 'secondary' => {
    switch (status) {
        case 'available':
            return 'default';
        case 'occupied':
            return 'destructive';
        case 'maintenance':
            return 'secondary';
    }
};

const statusTextMap: Record<RoomStatus, string> = {
    available: "Tersedia",
    occupied: "Terisi",
    maintenance: "Perawatan",
};

// Komponen Card untuk setiap kamar
const RoomCard: React.FC<{ room: Room }> = ({ room }) => {
    // Parsing fitur dari string JSON
    const features = room.features ? JSON.parse(room.features) : [];

    const timeZoneOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    return (
        <Card className="flex flex-col h-full transition-all hover:shadow-lg">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl">{room.roomNumber}</CardTitle>
                    </div>
                    <Badge variant={getStatusBadgeVariant(room.status || 'maintenance')}>
                        {room.status ? statusTextMap[room.status] : 'Unknown'}
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
                            {features.map((feature: string) => (
                                <Badge key={feature} variant="outline">{feature}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
            <div className="p-6 pt-0">
                <Button className="w-full">
                    <Clock className="w-4 h-4 mr-2" />
                    Update Terakhir: {room.lastUpdated ? new Date(room.lastUpdated).toLocaleString('id-ID', timeZoneOptions) : '-'}
                </Button>
            </div>
        </Card>
    );
};



// Komponen Utama
const HospitalRoomInfo: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<RoomStatus | 'all'>('all');
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/kamar');
                if (response.ok) {
                    const data = await response.json();
                    setRooms(data);
                }
            } catch (error) {
                console.error("Gagal mengambil data kamar:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    const filteredRooms = useMemo(() => {
        if (activeFilter === 'all') {
            return rooms;
        }
        return rooms.filter(room => room.status === activeFilter);
    }, [rooms, activeFilter]);

    const stats = useMemo(() => ({
        total: rooms.length,
        available: rooms.filter(r => r.status === 'available').length,
        occupied: rooms.filter(r => r.status === 'occupied').length,
        maintenance: rooms.filter(r => r.status === 'maintenance').length,
    }), [rooms]);


    const filterButtons: { label: string; filter: RoomStatus | 'all'; }[] = [
        { label: 'Semua', filter: 'all' },
        { label: 'Tersedia', filter: 'available' },
        { label: 'Terisi', filter: 'occupied' },
        { label: 'Perawatan', filter: 'maintenance' }
    ];

    if (loading) {
        return <div className="text-center py-12">Memuat data kamar...</div>;
    }

    return (
        <div className="bg-background min-h-screen text-foreground px-10">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
                    <StatCard icon={Crown} label="Kamar VIP" value={1} tt={1} />
                    <StatCard icon={BedDouble} label="kamar 1" value={4} tt={8} />
                    <StatCard icon={BedSingle} label="Kamar 2" value={4} tt={7} />
                    <StatCard icon={Bed} label="Kamar 3" value={7} tt={24} />
                    <StatCard icon={Bed} label="Kamar ISOLASI" value={1} tt={5} />
                    <StatCard icon={Bed} label="Kamar ICU  PICU" value={2} tt={5} />
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold tracking-tight mb-4">Daftar Kamar</h2>
                    {filteredRooms.length > 0 ? (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 spaye-y-6">
                            {/* {filteredRooms.map(room => (
                                <RoomCard key={room.id} room={room} />
                            ))} */}
                            <div className='break-inside-avoid p-2'>
                                <Card className="flex flex-col h-full transition-all hover:shadow-lg">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-xl">Kamar Tipe I</CardTitle>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <CircleDollarSign className="w-4 h-4 mr-2 text-primary" />
                                                <span className="font-semibold">Rp 210.000</span>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <Image src={kamar_I} alt='kamar' className='rounded-xl' />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <div className="space-y-3">
                                            <Card className='p-2'>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="border-b">
                                                            <TableHead className="border-r">
                                                                <div className="flex items-center text-sm">
                                                                    <Bed className="w-4 h-4 mr-2 text-primary" />
                                                                    Nama Ruangan
                                                                </div>
                                                            </TableHead>
                                                            <TableHead>
                                                                <div className="flex items-center text-sm">
                                                                    <Users className="w-4 h-4 mr-2 text-primary" />
                                                                    Kapasitas
                                                                </div>
                                                            </TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className="border-r">Bougenville 1</TableCell>
                                                            <TableCell>2</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell className="border-r">Bougenville 2</TableCell>
                                                            <TableCell>2</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell className="border-r">Bougenville 3</TableCell>
                                                            <TableCell>2</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell className="border-r">Bougenville 3</TableCell>
                                                            <TableCell>2</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </Card>
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-2">Fasilitas:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    <Badge variant="outline">AC</Badge>
                                                    <Badge variant="outline">Kulkas</Badge>
                                                    <Badge variant="outline">Tempat Tidur</Badge>
                                                    <Badge variant="outline">Kamar Mandi</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <div className="p-6 pt-0">
                                        <Button className="w-full" onClick={() => setOpen(true)}>
                                            <Clock className="w-4 h-4 mr-2" />
                                            Lihat Foto Lainnya
                                        </Button>
                                    </div>
                                </Card>

                                <AnimatePresence>
                                    {open && (
                                        <motion.div
                                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            {/* Konten Modal */}
                                            <motion.div
                                                className="relative bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6"
                                                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                {/* Tombol Close */}
                                                <button
                                                    onClick={() => setOpen(false)}
                                                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
                                                >
                                                    X
                                                </button>

                                                <h2 className="text-xl font-semibold mb-4">Foto Lainnya</h2>

                                                {/* Grid Foto */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <Image src={kamar_I} alt="foto" className="rounded-lg" />
                                                    <Image src={kamar_I} alt="foto" className="rounded-lg" />
                                                    <Image src={kamar_I} alt="foto" className="rounded-lg" />
                                                    <Image src={kamar_I} alt="foto" className="rounded-lg" />
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className='break-inside-avoid p-2'>
                                <Card className="flex flex-col h-full transition-all hover:shadow-lg">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-xl">Kamar Tipe II</CardTitle>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <CircleDollarSign className="w-4 h-4 mr-2 text-primary" />
                                                <span className="font-semibold">Rp 210.000</span>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <Image src={kamar_I} alt='kamar' className='rounded-xl' />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <div className="space-y-3">
                                            <Card className='p-2'>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="border-b">
                                                            <TableHead className="border-r">
                                                                <div className="flex items-center text-sm">
                                                                    <Bed className="w-4 h-4 mr-2 text-primary" />
                                                                    Nama Ruangan
                                                                </div>
                                                            </TableHead>
                                                            <TableHead>
                                                                <div className="flex items-center text-sm">
                                                                    <Users className="w-4 h-4 mr-2 text-primary" />
                                                                    Kapasitas
                                                                </div>
                                                            </TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className="border-r">Bougenville 4</TableCell>
                                                            <TableCell>2</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell className="border-r">Bougenville 5</TableCell>
                                                            <TableCell>2</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell className="border-r">Anggrek 2</TableCell>
                                                            <TableCell>1</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell className="border-r">Anggrek 3</TableCell>
                                                            <TableCell>2</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </Card>
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-2">Fasilitas:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    <Badge variant="outline">AC</Badge>
                                                    <Badge variant="outline">Kulkas</Badge>
                                                    <Badge variant="outline">Tempat Tidur</Badge>
                                                    <Badge variant="outline">Kamar Mandi</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <div className="p-6 pt-0">
                                        <Button className="w-full">
                                            <Clock className="w-4 h-4 mr-2" />
                                            Lihat Foto Lainnya
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                            <div className='break-inside-avoid p-2'>
                                <Card className="flex flex-col h-full transition-all hover:shadow-lg">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-xl">Kamar Tipe III</CardTitle>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <CircleDollarSign className="w-4 h-4 mr-2 text-primary" />
                                                <span className="font-semibold">Rp 210.000</span>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <Image src={kamar_I} alt='kamar' className='rounded-xl' />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <div className="space-y-3">
                                            <Card className='p-2'>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="border-b">
                                                            <TableHead className="border-r">
                                                                <div className="flex items-center text-sm">
                                                                    <Bed className="w-4 h-4 mr-2 text-primary" />
                                                                    Nama Ruangan
                                                                </div>
                                                            </TableHead>
                                                            <TableHead>
                                                                <div className="flex items-center text-sm">
                                                                    <Users className="w-4 h-4 mr-2 text-primary" />
                                                                    Kapasitas
                                                                </div>
                                                            </TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className="border-r">Bougenville 6</TableCell>
                                                            <TableCell>3</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell className="border-r">Bougenville 7</TableCell>
                                                            <TableCell>3</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell className="border-r">Bougenville 8</TableCell>
                                                            <TableCell>3</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell className="border-r">Bougenville 9</TableCell>
                                                            <TableCell>3</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell className="border-r">Anggrek 4</TableCell>
                                                            <TableCell>3</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell className="border-r">Anggrek 5</TableCell>
                                                            <TableCell>6</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell className="border-r">Perinatologi</TableCell>
                                                            <TableCell>3</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </Card>
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-2">Fasilitas:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    <Badge variant="outline">AC</Badge>
                                                    <Badge variant="outline">Kulkas</Badge>
                                                    <Badge variant="outline">Tempat Tidur</Badge>
                                                    <Badge variant="outline">Kamar Mandi</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <div className="p-6 pt-0">
                                        <Button className="w-full">
                                            <Clock className="w-4 h-4 mr-2" />
                                            Lihat Foto Lainnya
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                            <div className='break-inside-avoid p-2'>
                                <Card className="flex flex-col h-full transition-all hover:shadow-lg">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-xl">Kamar VIP</CardTitle>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <CircleDollarSign className="w-4 h-4 mr-2 text-primary" />
                                                <span className="font-semibold">Rp 210.000</span>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <Image src={kamar_I} alt='kamar' className='rounded-xl' />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <div className="space-y-3">
                                            <Card className='p-2'>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="border-b">
                                                            <TableHead className="border-r">
                                                                <div className="flex items-center text-sm">
                                                                    <Bed className="w-4 h-4 mr-2 text-primary" />
                                                                    Nama Ruangan
                                                                </div>
                                                            </TableHead>
                                                            <TableHead>
                                                                <div className="flex items-center text-sm">
                                                                    <Users className="w-4 h-4 mr-2 text-primary" />
                                                                    Kapasitas
                                                                </div>
                                                            </TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className="border-r">Ruang VIP</TableCell>
                                                            <TableCell>1</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </Card>
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-2">Fasilitas:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    <Badge variant="outline">AC</Badge>
                                                    <Badge variant="outline">Kulkas</Badge>
                                                    <Badge variant="outline">Tempat Tidur</Badge>
                                                    <Badge variant="outline">Kamar Mandi</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <div className="p-6 pt-0">
                                        <Button className="w-full">
                                            <Clock className="w-4 h-4 mr-2" />
                                            Lihat Foto Lainnya
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                            <div className='break-inside-avoid p-2'>
                                <Card className="flex flex-col h-full transition-all hover:shadow-lg">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-xl">Dahlia (ISOLASI)</CardTitle>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <CircleDollarSign className="w-4 h-4 mr-2 text-primary" />
                                                <span className="font-semibold">Rp 210.000</span>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <Image src={kamar_I} alt='kamar' className='rounded-xl' />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-2">Fasilitas:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    <Badge variant="outline">AC</Badge>
                                                    <Badge variant="outline">Kulkas</Badge>
                                                    <Badge variant="outline">Tempat Tidur</Badge>
                                                    <Badge variant="outline">Kamar Mandi</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <div className="p-6 pt-0">
                                        <Button className="w-full">
                                            <Clock className="w-4 h-4 mr-2" />
                                            Lihat Foto Lainnya
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                            <div className='break-inside-avoid p-2'>
                                <Card className="flex flex-col h-full transition-all hover:shadow-lg">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-xl">Ruang Intensif</CardTitle>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <CircleDollarSign className="w-4 h-4 mr-2 text-primary" />
                                                <span className="font-semibold">Rp 210.000</span>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <Image src={kamar_I} alt='kamar' className='rounded-xl' />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <div className="space-y-3">
                                            <Card className='p-2'>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="border-b">
                                                            <TableHead className="border-r">
                                                                <div className="flex items-center text-sm">
                                                                    <Bed className="w-4 h-4 mr-2 text-primary" />
                                                                    Nama Ruangan
                                                                </div>
                                                            </TableHead>
                                                            <TableHead>
                                                                <div className="flex items-center text-sm">
                                                                    <Users className="w-4 h-4 mr-2 text-primary" />
                                                                    Kapasitas
                                                                </div>
                                                            </TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className="border-r">ICU (Dengan Ventilator) </TableCell>
                                                            <TableCell>3</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell className="border-r">PICU (Dengan Ventilator)</TableCell>
                                                            <TableCell>2</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </Card>
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-2">Fasilitas:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    <Badge variant="outline">AC</Badge>
                                                    <Badge variant="outline">Kulkas</Badge>
                                                    <Badge variant="outline">Tempat Tidur</Badge>
                                                    <Badge variant="outline">Kamar Mandi</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <div className="p-6 pt-0">
                                        <Button className="w-full">
                                            <Clock className="w-4 h-4 mr-2" />
                                            Lihat Foto Lainnya
                                        </Button>
                                    </div>
                                </Card>
                            </div>
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

// Komponen Card untuk Statistik
const StatCard: React.FC<{ icon: React.ElementType; label: string; value: number; tt: number }> = ({ icon: Icon, label, value, tt }) => (
    <Card>
        <CardContent className="p-6 flex items-center">
            <div className="p-3 rounded-md bg-primary/10 text-primary mr-4">
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <div className='flex items-center'>
                    <p className="text-2xl font-bold mr-2">{value}</p>
                    <Bed className="w-4 h-4 mr-2 text-primary" />
                    <p className="text-sm text-muted-foreground">{tt}</p>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default HospitalRoomInfo;


// // File: src/components/HospitalRoomInfo.tsx

// "use client"; // Diperlukan jika Anda menggunakan Next.js App Router

// import React, { useState, useMemo, useEffect } from 'react';

// // 1. Impor Ikon dari Lucide React
// import {
//      Bed,
//     CircleDollarSign, Users,
//     Crown,
//     BedDouble,
//     BedSingle,
//     Clock
// } from 'lucide-react';

// // 2. Impor Komponen dari shadcn/ui
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';

// // Definisi Tipe Data (Tetap sama)
// type RoomStatus = 'available' | 'occupied' | 'maintenance';

// interface Room {
//     id: number;
//     status: RoomStatus;
//     price: string;
//     capacity: number;
//     features: string[];
// }

// // Data Kamar (Bisa dari API)
// const roomData: Room[] = [
//     { id: 101,   status: "available", price: "Rp 350.000/hari", capacity: 2, features: ["AC", "TV", "Kamar Mandi"] },
//     { id: 102,   status: "occupied", price: "Rp 350.000/hari", capacity: 2, features: ["AC", "TV", "Kamar Mandi"] },
//     { id: 103,   status: "maintenance", price: "Rp 350.000/hari", capacity: 2, features: ["AC", "TV", "Kamar Mandi"] },
//     { id: 201, status: "available", price: "Rp 500.000/hari", capacity: 2, features: ["AC", "TV", "Kamar Mandi", "Kulkas"] },
//     { id: 401,  status: "available", price: "Rp 1.200.000/hari", capacity: 2, features: ["AC", "TV", "Kamar Mandi", "Kulkas", "Ruang Tamu"] },
//     { id: 501,   status: "occupied", price: "Rp 2.500.000/hari", capacity: 2, features: ["AC", "TV", "Kamar Mandi", "Kulkas", "Balkon"] },
// ];

// // Helper untuk styling Badge berdasarkan status
// const getStatusBadgeVariant = (status: RoomStatus): 'default' | 'destructive' | 'secondary' => {
//     switch (status) {
//         case 'available':
//             return 'default'; // Biasanya hijau, bisa dikustomisasi di tailwind.config.js
//         case 'occupied':
//             return 'destructive'; // Merah
//         case 'maintenance':
//             return 'secondary'; // Abu-abu
//     }
// };

// const statusTextMap: Record<RoomStatus, string> = {
//     available: "Tersedia",
//     occupied: "Terisi",
//     maintenance: "Perawatan",
// };


// // Komponen Card untuk setiap kamar (di-refactor dengan shadcn/ui)
// const RoomCard: React.FC<{ room: Room }> = ({ room }) => (
//     <Card className="flex flex-col h-full transition-all hover:shadow-lg">
//         <CardHeader>
//             <div className="flex justify-between items-start">
//                 <div>
//                     <CardTitle className="text-xl">Kamar {room.id}</CardTitle>
//                 </div>
//                 <Badge variant={getStatusBadgeVariant(room.status)}>
//                     {statusTextMap[room.status]}
//                 </Badge>
//             </div>
//         </CardHeader>
//         <CardContent className="flex-grow">
//             <div className="space-y-3">
//                 <div className="flex items-center text-sm">
//                     <CircleDollarSign className="w-4 h-4 mr-2 text-primary" />
//                     <span className="font-semibold">{room.price}</span>
//                 </div>
//                 <div className="flex items-center text-sm">
//                     <Users className="w-4 h-4 mr-2 text-primary" />
//                     <span>Kapasitas: {room.capacity} orang</span>
//                 </div>
//                 <div>
//                     <p className="text-sm text-muted-foreground mb-2">Fasilitas:</p>
//                     <div className="flex flex-wrap gap-2">
//                         {room.features.map(feature => (
//                             <Badge key={feature} variant="outline">{feature}</Badge>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </CardContent>
//         <div className="p-6 pt-0">
//             <Button className="w-full">
//                 <Clock className="w-4 h-4 mr-2" />
//                 Update Terakhir 19:00 24/5/2025

//             </Button>
//         </div>
//     </Card>
// );

// // Komponen Utama
// const HospitalRoomInfo: React.FC = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [activeFilter, setActiveFilter] = useState<RoomStatus | 'all'>('all');
//     const [activeFloor, setActiveFloor] = useState<string>('all');
//     const [lastUpdated, setLastUpdated] = useState('');

//     useEffect(() => {
//         const now = new Date();
//         const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//         setLastUpdated(now.toLocaleDateString('id-ID', options) + ' WIB');
//     }, []);

//     const filteredRooms = useMemo(() => {
//         return roomData.filter(room => {
//             const matchesFilter = activeFilter === 'all' || room.status === activeFilter;
//             const matchesSearch = searchTerm === '' ||
//                 room.id.toString().includes(searchTerm) ||
//                 room.status.toLowerCase().includes(searchTerm.toLowerCase());
//             return matchesFilter && matchesSearch;
//         });
//     }, [searchTerm, activeFilter]);

//     const stats = {
//         total: roomData.length,
//         available: roomData.filter(r => r.status === 'available').length,
//         occupied: roomData.filter(r => r.status === 'occupied').length,
//         maintenance: roomData.filter(r => r.status === 'maintenance').length,
//     };

//     const filterButtons: { label: string; filter: RoomStatus | 'all'; }[] = [
//         { label: 'Semua', filter: 'all' },
//         { label: 'Tersedia', filter: 'available' },
//         { label: 'Terisi', filter: 'occupied' },
//         { label: 'Perawatan', filter: 'maintenance' }
//     ];


//     return (
//         <div className="bg-background min-h-screen text-foreground">
//             <div className="container mx-auto px-4 py-8">
//                 <Card className="mb-8">
//                     <CardContent className="p-6">
//                         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                             <div className="relative flex-grow">
//                                 <h1 className="text-3xl font-bold text-primary mb-2">Informasi Ketersediaan Kamar</h1>
//                             </div>
//                             <div className="flex items-center gap-2 flex-wrap">
//                                 {filterButtons.map(({ label, filter }) => (
//                                     <Button
//                                         key={filter}
//                                         onClick={() => setActiveFilter(filter)}
//                                         variant={activeFilter === filter ? 'default' : 'outline'}
//                                     >
//                                         {label}
//                                     </Button>
//                                 ))}
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//                     <StatCard icon={Crown} label="Total Kamar VIP" value={stats.total} />
//                     <StatCard icon={BedDouble} label="Total kamar 1" value={stats.available} />
//                     <StatCard icon={BedSingle} label="Total Kamar 2" value={stats.occupied} />
//                     <StatCard icon={Bed} label="Total Kamar 3" value={stats.maintenance} />
//                 </div>

//                 <div className="mb-8">
//                     <h2 className="text-2xl font-semibold tracking-tight mb-4">Daftar Kamar</h2>
//                     {filteredRooms.length > 0 ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {filteredRooms.map(room => (
//                                 <RoomCard key={room.id} room={room} />
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-12 text-muted-foreground">
//                             <p>Tidak ada kamar yang sesuai dengan kriteria.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Komponen Card untuk Statistik (di-refactor dengan shadcn/ui)
// const StatCard: React.FC<{ icon: React.ElementType; label: string; value: number; }> = ({ icon: Icon, label, value }) => (
//     <Card>
//         <CardContent className="p-6 flex items-center">
//             <div className="p-3 rounded-md bg-primary/10 text-primary mr-4">
//                 <Icon className="h-6 w-6" />
//             </div>
//             <div>
//                 <p className="text-sm text-muted-foreground">{label}</p>
//                 <p className="text-2xl font-bold">{value}</p>
//             </div>
//         </CardContent>
//     </Card>
// );

// export default HospitalRoomInfo;