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


// // File: app/(main)/kamar/page.tsx

// "use client";

// import React, { useState, useEffect } from 'react';
// import {
//     Bed,
//     CircleDollarSign, Users,
//     Crown,
//     BedDouble,
//     BedSingle
// } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import Image, { StaticImageData } from 'next/image';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge';
// import {
//     Carousel,
//     CarouselApi,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious,
// } from "@/components/ui/carousel";

// import kamar_I from "@/public/img/kamar_I.jpeg";

// type RoomDetail = { name: string; capacity: number; };
// type RoomTypeData = {
//     id: string;
//     name: string;
//     price: string;
//     images: StaticImageData[];
//     rooms: RoomDetail[];
//     facilities: string[];
// };


// const roomData: RoomTypeData[] = [
//     {
//         id: "type1",
//         name: "Kamar Tipe I",
//         price: "Rp 210.000",
//         images: [kamar_I, kamar_I, kamar_I],
//         rooms: [
//             { name: "Bougenville 1", capacity: 2 },
//             { name: "Bougenville 2", capacity: 2 },
//             { name: "Bougenville 3", capacity: 2 },
//             { name: "Bougenville 4", capacity: 2 }
//         ],
//         facilities: ["AC", "Kulkas", "Tempat Tidur", "Kamar Mandi"]
//     },
//     {
//         id: "type2",
//         name: "Kamar Tipe II",
//         price: "Rp 210.000",
//         images: [kamar_I, kamar_I],
//         rooms: [
//             { name: "Bougenville 5", capacity: 2 },
//             { name: "Bougenville 6", capacity: 2 },
//             { name: "Anggrek 2", capacity: 1 },
//             { name: "Anggrek 3", capacity: 2 },
//         ],
//         facilities: ["AC", "Kulkas", "Tempat Tidur", "Kamar Mandi"]
//     },
//     {
//         id: "type3",
//         name: "Kamar Tipe III",
//         price: "Rp 210.000",
//         images: [kamar_I, kamar_I, kamar_I, kamar_I],
//         rooms: [
//             { name: "Bougenville 7", capacity: 3 },
//             { name: "Bougenville 8", capacity: 3 },
//             { name: "Bougenville 9", capacity: 3 },
//             { name: "Anggrek 4", capacity: 3 },
//             { name: "Anggrek 5", capacity: 6 },
//             { name: "Perinatologi", capacity: 3 },
//         ],
//         facilities: ["AC", "Tempat Tidur", "Kamar Mandi"]
//     },
//     {
//         id: "vip",
//         name: "Kamar VIP",
//         price: "Rp 210.000",
//         images: [kamar_I],
//         rooms: [
//             { name: "Ruang VIP", capacity: 1 },
//         ],
//         facilities: ["AC", "Kulkas", "TV", "Sofa", "Kamar Mandi Dalam"]
//     },
//     {
//         id: "isolasi",
//         name: "Dahlia (ISOLASI)",
//         price: "Rp 210.000",
//         images: [kamar_I, kamar_I],
//         rooms: [
//             { name: "Dahlia 1", capacity: 5 },
//         ],
//         facilities: ["AC", "Ventilasi Khusus", "Kamar Mandi Dalam"]
//     },
//     {
//         id: "intensif",
//         name: "Ruang Intensif",
//         price: "Rp 210.000",
//         images: [kamar_I, kamar_I, kamar_I],
//         rooms: [
//             { name: "ICU (Dengan Ventilator)", capacity: 3 },
//             { name: "PICU (Dengan Ventilator)", capacity: 2 },
//         ],
//         facilities: ["Monitor Jantung", "Ventilator", "Peralatan Medis Lengkap"]
//     }
// ];


// const RoomCard: React.FC<{ roomType: RoomTypeData }> = ({ roomType }) => {
//     const [api, setApi] = useState<CarouselApi>();
//     const [current, setCurrent] = useState(0);
//     const [count, setCount] = useState(0);

//     useEffect(() => {
//         if (!api) {
//             return;
//         }
//         setCount(api.scrollSnapList().length);
//         setCurrent(api.selectedScrollSnap());

//         api.on("select", () => {
//             setCurrent(api.selectedScrollSnap());
//         });
//     }, [api]);

//     return (
//         <Card className="flex flex-col h-full transition-all hover:shadow-lg w-full">
//             <CardHeader>
//                 <div className="flex justify-between items-start">
//                     <CardTitle className="text-xl">{roomType.name}</CardTitle>
//                     <div className="flex items-center text-sm">
//                         <CircleDollarSign className="w-4 h-4 mr-2 text-primary" />
//                         <span className="font-semibold">{roomType.price}</span>
//                     </div>
//                 </div>
//                 <div className='mt-2'>
//                     <Carousel setApi={setApi} className="w-full group">
//                         <CarouselContent>
//                             {roomType.images.map((imageSrc, index) => (
//                                 <CarouselItem key={index}>
//                                     <div className="p-1">
//                                         <Image
//                                             src={imageSrc}
//                                             alt={`${roomType.name} - Gambar ${index + 1}`}
//                                             className='rounded-xl w-full h-auto object-cover aspect-video'
//                                             width={500}
//                                             height={300}
//                                         />
//                                     </div>
//                                 </CarouselItem>
//                             ))}
//                         </CarouselContent>
//                         <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity duration-300" />
//                         <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity duration-300" />
//                     </Carousel>
//                     <div className="flex justify-center items-center gap-2 mt-4">
//                         {Array.from({ length: count }).map((_, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => api?.scrollTo(index)}
//                                 className={`h-2 rounded-full transition-all duration-300 ${current === index ? 'w-4 bg-primary' : 'w-2 bg-primary/50'
//                                     }`}
//                                 aria-label={`Go to slide ${index + 1}`}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </CardHeader>
//             <CardContent className="flex-grow">
//                 <div className="space-y-4">
//                     {roomType.rooms.length > 0 && (
//                         <Card className='p-2'>
//                             <Table>
//                                 <TableHeader>
//                                     <TableRow>
//                                         <TableHead className="border-r"><Bed className="w-4 h-4 inline-block mr-2" />Ruangan</TableHead>
//                                         <TableHead><Users className="w-4 h-4 inline-block mr-2" />Kapasitas</TableHead>
//                                     </TableRow>
//                                 </TableHeader>
//                                 <TableBody>
//                                     {roomType.rooms.map((room, index) => (
//                                         <TableRow key={index}>
//                                             <TableCell className="border-r">{room.name}</TableCell>
//                                             <TableCell>{room.capacity}</TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </Card>
//                     )}
//                     <div>
//                         <p className="text-sm text-muted-foreground mb-2">Fasilitas:</p>
//                         <div className="flex flex-wrap gap-2">
//                             {roomType.facilities.map((facility, index) => (
//                                 <Badge key={index} variant="default" className='px-4 py-2 text-sm'>{facility}</Badge>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };


// const StatCard: React.FC<{ icon: React.ElementType; label: string; value: number; tt: number }> = ({ icon: Icon, label, value, tt }) => (
//     <Card>
//         <CardContent className="p-4 md:p-6 flex items-center">
//             <div className="p-3 rounded-md bg-primary/10 text-primary mr-2 md:mr-4">
//                 <Icon className="h-5 w-5 md:h-6 md:w-6" />
//             </div>
//             <div>
//                 <p className="text-xs md:text-sm text-muted-foreground">{label}</p>
//                 <div className='flex items-center'>
//                     <p className="text-lg md:text-2xl font-bold mr-2">{value}</p>
//                     <Bed className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-primary" />
//                     <p className="text-xs md:text-sm text-muted-foreground">{tt}</p>
//                 </div>
//             </div>
//         </CardContent>
//     </Card>
// );

// const HospitalRoomInfo: React.FC = () => {
//     return (
//         <div className="bg-background min-h-screen text-foreground px-4 md:px-10 pb-20">
//             <div className="container mx-auto py-8">
//                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
//                     <StatCard icon={Crown} label="Kamar VIP" value={1} tt={1} />
//                     <StatCard icon={BedDouble} label="kamar 1" value={4} tt={8} />
//                     <StatCard icon={BedSingle} label="Kamar 2" value={4} tt={7} />
//                     <StatCard icon={Bed} label="Kamar 3" value={7} tt={24} />
//                     <StatCard icon={Bed} label="Kamar ISOLASI" value={1} tt={5} />
//                     <StatCard icon={Bed} label="Kamar ICU PICU" value={2} tt={5} />
//                 </div>

//                 <div className="mb-8">
//                     <h2 className="text-2xl font-semibold tracking-tight mb-4">Daftar Kamar</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {roomData.map((roomType) => (
//                             <RoomCard key={roomType.id} roomType={roomType} />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HospitalRoomInfo;


// // File: app/(main)/kamar/page.tsx

// "use client";

// import React, { useState, useEffect } from 'react';
// import {
//     Bed,
//     CircleDollarSign, Users,
//     Crown,
//     BedDouble,
//     BedSingle,
//     ArrowLeft, ArrowRight // Tambahkan ikon untuk Carousel
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import Image, { StaticImageData } from 'next/image';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// // Import Carousel components
// import {
//     Carousel,
//     CarouselApi,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious,
// } from "@/components/ui/carousel";

// // Impor gambar (pastikan path sudah benar)
// import kamar_I from "@/public/img/kamar_I.jpeg"; // Gunakan sebagai placeholder untuk berbagai gambar

// type RoomDetail = { name: string; capacity: number; };
// type RoomTypeData = {
//     id: string;
//     name: string;
//     price: string;
//     images: StaticImageData[];
//     rooms: RoomDetail[];
//     facilities: string[];
// };


// // Data untuk semua tipe kamar, disimpan dalam satu array
// const roomData = [
//     {
//         id: "type1",
//         name: "Kamar Tipe I",
//         price: "Rp 210.000",
//         images: [kamar_I, kamar_I, kamar_I], // Array of images for carousel
//         rooms: [
//             { name: "Bougenville 1", capacity: 2 },
//             { name: "Bougenville 2", capacity: 2 },
//             { name: "Bougenville 3", capacity: 2 },
//             { name: "Bougenville 4", capacity: 2 }
//         ],
//         facilities: ["AC", "Kulkas", "Tempat Tidur", "Kamar Mandi"]
//     },
//     {
//         id: "type2",
//         name: "Kamar Tipe II",
//         price: "Rp 210.000",
//         images: [kamar_I, kamar_I],
//         rooms: [
//             { name: "Bougenville 5", capacity: 2 },
//             { name: "Bougenville 6", capacity: 2 },
//             { name: "Anggrek 2", capacity: 1 },
//             { name: "Anggrek 3", capacity: 2 },
//         ],
//         facilities: ["AC", "Kulkas", "Tempat Tidur", "Kamar Mandi"]
//     },
//     {
//         id: "type3",
//         name: "Kamar Tipe III",
//         price: "Rp 210.000",
//         images: [kamar_I, kamar_I, kamar_I, kamar_I],
//         rooms: [
//             { name: "Bougenville 7", capacity: 3 },
//             { name: "Bougenville 8", capacity: 3 },
//             { name: "Bougenville 9", capacity: 3 },
//             { name: "Anggrek 4", capacity: 3 },
//             { name: "Anggrek 5", capacity: 6 },
//             { name: "Perinatologi", capacity: 3 },
//         ],
//         facilities: ["AC", "Tempat Tidur", "Kamar Mandi"]
//     },
//     {
//         id: "vip",
//         name: "Kamar VIP",
//         price: "Rp 210.000",
//         images: [kamar_I],
//         rooms: [
//             { name: "Ruang VIP", capacity: 1 },
//         ],
//         facilities: ["AC", "Kulkas", "TV", "Sofa", "Kamar Mandi Dalam"]
//     },
//     {
//         id: "isolasi",
//         name: "Dahlia (ISOLASI)",
//         price: "Rp 210.000",
//         images: [kamar_I, kamar_I],
//         rooms: [
//             { name: "Dahlia 1", capacity: 5 },
//         ],
//         facilities: ["AC", "Ventilasi Khusus", "Kamar Mandi Dalam"]
//     },
//     {
//         id: "intensif",
//         name: "Ruang Intensif",
//         price: "Rp 210.000",
//         images: [kamar_I, kamar_I, kamar_I],
//         rooms: [
//             { name: "ICU (Dengan Ventilator)", capacity: 3 },
//             { name: "PICU (Dengan Ventilator)", capacity: 2 },
//         ],
//         facilities: ["Monitor Jantung", "Ventilator", "Peralatan Medis Lengkap"]
//     }
// ];


// // Komponen Utama
// const RoomCard: React.FC<{ roomType: RoomTypeData }> = ({ roomType }) => {
//     const [api, setApi] = useState<CarouselApi>();
//     const [current, setCurrent] = useState(0);
//     const [count, setCount] = useState(0);

//     useEffect(() => {
//         if (!api) {
//             return;
//         }
//         setCount(api.scrollSnapList().length);
//         setCurrent(api.selectedScrollSnap());

//         api.on("select", () => {
//             setCurrent(api.selectedScrollSnap());
//         });
//     }, [api]);

//     return (
//         <div className='break-inside-avoid p-2'>
//             <Card className="flex flex-col h-full transition-all hover:shadow-lg">
//                 <CardHeader>
//                     <div className="flex justify-between items-start">
//                         <CardTitle className="text-xl">{roomType.name}</CardTitle>
//                         <div className="flex items-center text-sm">
//                             <CircleDollarSign className="w-4 h-4 mr-2 text-primary" />
//                             <span className="font-semibold">{roomType.price}</span>
//                         </div>
//                     </div>
//                     <div className='mt-2'>
//                         <Carousel setApi={setApi} className="w-full group">
//                             <CarouselContent>
//                                 {roomType.images.map((imageSrc, index) => (
//                                     <CarouselItem key={index}>
//                                         <div className="p-1">
//                                             <Image
//                                                 src={imageSrc}
//                                                 alt={`${roomType.name} - Gambar ${index + 1}`}
//                                                 className='rounded-xl w-full h-auto object-cover aspect-video'
//                                                 width={500}
//                                                 height={300}
//                                             />
//                                         </div>
//                                     </CarouselItem>
//                                 ))}
//                             </CarouselContent>
//                             <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity duration-300" />

//                             {/* DAN TAMBAHKAN disabled:opacity-0 DI SINI */}
//                             <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity duration-300" />
//                         </Carousel>
//                         {/* Indikator Titik */}
//                         <div className="flex justify-center items-center gap-2 mt-4">
//                             {Array.from({ length: count }).map((_, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => api?.scrollTo(index)}
//                                     className={`h-2 rounded-full transition-all duration-300 ${current === index ? 'w-4 bg-primary' : 'w-2 bg-primary/50'
//                                         }`}
//                                     aria-label={`Go to slide ${index + 1}`}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 </CardHeader>
//                 <CardContent className="flex-grow">
//                     <div className="space-y-4">
//                         {roomType.rooms.length > 0 && (
//                             <Card className='p-2'>
//                                 <Table>
//                                     <TableHeader>
//                                         <TableRow>
//                                             <TableHead className="border-r"><Bed className="w-4 h-4 inline-block mr-2" />Ruangan</TableHead>
//                                             <TableHead><Users className="w-4 h-4 inline-block mr-2" />Kapasitas</TableHead>
//                                         </TableRow>
//                                     </TableHeader>
//                                     <TableBody>
//                                         {roomType.rooms.map((room, index) => (
//                                             <TableRow key={index}>
//                                                 <TableCell className="border-r">{room.name}</TableCell>
//                                                 <TableCell>{room.capacity}</TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </Card>
//                         )}
//                         <div>
//                             <p className="text-sm text-muted-foreground mb-2">Fasilitas:</p>
//                             <div className="flex flex-wrap gap-2">
//                                 {roomType.facilities.map((facility, index) => (
//                                     <Badge key={index} variant="default" className='px-4 py-2 text-sm'>{facility}</Badge>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };


// // --- KOMPONEN UTAMA ---
// const HospitalRoomInfo: React.FC = () => {
//     return (
//         <div className="bg-background min-h-screen text-foreground px-10">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
//                     {/* StatCard components */}
//                     <StatCard icon={Crown} label="Kamar VIP" value={1} tt={1} />
//                     <StatCard icon={BedDouble} label="kamar 1" value={4} tt={8} />
//                     <StatCard icon={BedSingle} label="Kamar 2" value={4} tt={7} />
//                     <StatCard icon={Bed} label="Kamar 3" value={7} tt={24} />
//                     <StatCard icon={Bed} label="Kamar ISOLASI" value={1} tt={5} />
//                     <StatCard icon={Bed} label="Kamar ICU PICU" value={2} tt={5} />
//                 </div>

//                 <div className="mb-8">
//                     <h2 className="text-2xl font-semibold tracking-tight mb-4">Daftar Kamar</h2>
//                     <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
//                         {/* Mapping data kamar ke komponen RoomCard */}
//                         {roomData.map((roomType) => (
//                             <RoomCard key={roomType.id} roomType={roomType} />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Komponen Card untuk Statistik (tidak berubah)
// const StatCard: React.FC<{ icon: React.ElementType; label: string; value: number; tt: number }> = ({ icon: Icon, label, value, tt }) => (
//     <Card>
//         <CardContent className="p-6 flex items-center">
//             <div className="p-3 rounded-md bg-primary/10 text-primary mr-4">
//                 <Icon className="h-6 w-6" />
//             </div>
//             <div>
//                 <p className="text-sm text-muted-foreground">{label}</p>
//                 <div className='flex items-center'>
//                     <p className="text-2xl font-bold mr-2">{value}</p>
//                     <Bed className="w-4 h-4 mr-2 text-primary" />
//                     <p className="text-sm text-muted-foreground">{tt}</p>
//                 </div>
//             </div>
//         </CardContent>
//     </Card>
// );

// export default HospitalRoomInfo;


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