// File: app/(main)/kamar/page.tsx

"use client";

import React, { useState, useEffect } from 'react';
import {
    Bed,
    CircleDollarSign, Users,
    Crown,
    BedDouble,
    BedSingle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { RoomType } from '@/lib/db/schema';
import Banner from '@/components/Banner';


const RoomCard: React.FC<{ roomType: RoomType }> = ({ roomType }) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <div className='break-inside-avoid mb-6'>
            <Card className="border border-black bg-[#f9f8f3] flex flex-col h-full transition-all hover:shadow-lg w-full">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{roomType.name}</CardTitle>
                        <div className="flex items-center text-sm">
                            <CircleDollarSign className="w-4 h-4 mr-2 text-primary" />
                            <span className="font-semibold">{roomType.price}</span>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <Carousel setApi={setApi} className="w-full group">
                            <CarouselContent>
                                {roomType.images && roomType.images.length > 0 ? (
                                    roomType.images.map((imageSrc, index) => (
                                        <CarouselItem key={index}>
                                            <div className="p-1">
                                                <Image
                                                    src={imageSrc}
                                                    alt={`${roomType.name} - Gambar ${index + 1}`}
                                                    className='rounded-xl w-full h-auto object-cover aspect-video'
                                                    width={500}
                                                    height={300}
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))
                                ) : (
                                    <CarouselItem>
                                        <div className="p-1 flex items-center justify-center bg-gray-200 rounded-xl aspect-video">
                                            <p className="text-gray-500">Gambar tidak tersedia</p>
                                        </div>
                                    </CarouselItem>
                                )}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity duration-300" />
                            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity duration-300" />
                        </Carousel>
                        <div className="flex justify-center items-center gap-2 mt-4">
                            {Array.from({ length: count }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => api?.scrollTo(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${current === index ? 'w-4 bg-primary' : 'w-2 bg-primary/50'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    <div className="space-y-4">
                        {roomType.rooms && roomType.rooms.length > 0 && (
                            <Card className='p-2 bg-[#f9f8f3]'>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="border-r"><Bed className="w-4 h-4 inline-block mr-2" />Ruangan</TableHead>
                                            <TableHead><Users className="w-4 h-4 inline-block mr-2" />Kapasitas</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {roomType.rooms.map((room, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="border-r">{room.name}</TableCell>
                                                <TableCell>{room.capacity}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>
                        )}
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Fasilitas:</p>
                            <div className="flex flex-wrap gap-2">
                                {roomType.facilities && roomType.facilities.map((facility, index) => (
                                    <Badge key={index} variant="default" className='px-4 py-2 text-sm bg-orange-500 text-background'>{facility}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};


const StatCard: React.FC<{ icon: React.ElementType; label: string; value: number; tt: number }> = ({ icon: Icon, label, value, tt }) => (
    <Card className='border border-black bg-[#f9f8f3]'>
        <CardContent className="p-4 md:p-6 flex items-center">
            <div className="p-3 rounded-md bg-orange-500 text-background mr-2 md:mr-4">
                <Icon className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div>
                <p className="text-xs md:text-sm text-muted-foreground">{label}</p>
                <div className='flex items-center'>
                    <p className="text-lg md:text-2xl font-bold mr-2">{value}</p>
                    <Bed className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-primary" />
                    <p className="text-xs md:text-sm text-muted-foreground">{tt}</p>
                </div>
            </div>
        </CardContent>
    </Card>
);

const HospitalRoomInfo: React.FC = () => {
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRoomTypes() {
            try {
                const response = await fetch('/api/room-types');
                if (response.ok) {
                    const data = await response.json();
                    setRoomTypes(data);
                } else {
                    console.error("Gagal mengambil data kamar");
                }
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchRoomTypes();
    }, []);

    const getStats = (typeName: string) => {
        const roomType = roomTypes.find(rt => rt.name.toLowerCase().includes(typeName.toLowerCase()));
        if (!roomType) return { value: 0, tt: 0 };

        const totalRooms = roomType.rooms.length;
        const totalBeds = roomType.rooms.reduce((acc, room) => acc + room.capacity, 0);

        return { value: totalRooms, tt: totalBeds };
    };

    const vipStats = getStats("vip");
    const tipe1Stats = getStats("tipe i");
    const tipe2Stats = getStats("tipe ii");
    const tipe3Stats = getStats("tipe iii");
    const isolasiStats = getStats("isolasi");
    const intensifStats = getStats("intensif");

    return (
        <div className="bg-[#f7f4eb] min-h-screen text-foreground px-4 md:px-10 pb-20">
            
            <Banner title="Informasi Kamar" />

            <div className="container mx-auto py-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    <StatCard icon={Crown} label="Kamar VIP" value={vipStats.value} tt={vipStats.tt} />
                    <StatCard icon={BedDouble} label="kamar 1" value={tipe1Stats.value} tt={tipe1Stats.tt} />
                    <StatCard icon={BedSingle} label="Kamar 2" value={tipe2Stats.value} tt={tipe2Stats.tt} />
                    <StatCard icon={Bed} label="Kamar 3" value={tipe3Stats.value} tt={tipe3Stats.tt} />
                    <StatCard icon={Bed} label="Kamar ISOLASI" value={isolasiStats.value} tt={isolasiStats.tt} />
                    <StatCard icon={Bed} label="Kamar ICU PICU" value={intensifStats.value} tt={intensifStats.tt} />
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold tracking-tight mb-4">Daftar Kamar</h2>
                    {loading ? (
                        <p>Memuat data kamar...</p>
                    ) : (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                            {roomTypes.map((roomType) => (
                                <RoomCard key={roomType.id} roomType={roomType} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HospitalRoomInfo;