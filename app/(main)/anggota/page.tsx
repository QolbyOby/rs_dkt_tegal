// app/(main)/anggota/page.tsx
'use client'

import { useState, useEffect } from "react";
import ProfileCard from "@/components/ProfileCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Doctor } from "@/lib/db/schema";

type ScheduleGroup = { days: string[]; time: string };

const kategoriList = [
    { label: "All", value: "all" },
    { label: "Dokter Umum", value: "umum" },
    { label: "Dokter Spesialis", value: "spesialis" },
];

const hariList = [
    { label: "Semua Hari", value: "all" },
    { label: "Senin", value: "Senin" },
    { label: "Selasa", value: "Selasa" },
    { label: "Rabu", value: "Rabu" },
    { label: "Kamis", value: "Kamis" },
    { label: "Jumat", value: "Jumat" },
    { label: "Sabtu", value: "Sabtu" },
    { label: "Minggu", value: "Minggu" },
];

const AnggotaPage = () => {
    const [dokterList, setDokterList] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [kategori, setKategori] = useState("all");
    const [hari, setHari] = useState("all");

    useEffect(() => {
        async function fetchDokter() {
            setLoading(true);
            try {
                const response = await fetch('/api/doctors');
                if (response.ok) {
                    const data = await response.json();
                    setDokterList(data);
                }
            } catch (error) {
                console.error("Gagal mengambil data dokter:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDokter();
    }, []);

    // Memfilter dokter berdasarkan hari yang dipilih
    const dokterBerdasarkanHari = dokterList.filter((dokter) => {
        const parsedSchedules: ScheduleGroup[] = dokter.schedules ? JSON.parse(dokter.schedules as string) : [];
        return hari === "all" || parsedSchedules.some(schedule => schedule.days.some(day => day.toLowerCase() === hari.toLowerCase()));
    });

    // Memisahkan dokter umum dan spesialis dari list yang sudah difilter hari
    const dokterUmum = dokterBerdasarkanHari.filter(d => d.category === 'umum');
    const dokterSpesialis = dokterBerdasarkanHari.filter(d => d.category === 'spesialis');


    if (loading) return <p className="text-center py-10">Memuat data dokter...</p>

    return (
        <div className="px-3 md:px-10 mb-20">
            <div className="flex px-2 md:px-10 pt-6 w-full justify-between items-center flex-col md:flex-row gap-4 md:gap-0">
                <Card className="bg-foreground w-fit">
                    <CardContent className="flex justify-between items-center">
                        <div className="flex gap-3 flex-wrap justify-center">
                            {kategoriList.map((item) => (
                                <Button
                                    key={item.value}
                                    variant={kategori === item.value ? "default" : "outline"}
                                    className="px-2 md:px-5 py-2 md:py-4 rounded-xl text-xs md:text-base"
                                    onClick={() => setKategori(item.value)}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <div className="flex  gap-4 items-center">
                    <h1 className="text-sm md:text-base">Pilih Hari</h1>
                    <Select value={hari} onValueChange={setHari}>
                        <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Pilih Hari" />
                        </SelectTrigger>
                        <SelectContent>
                            {hariList.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Bagian untuk menampilkan dokter */}
            <div className="mt-5 px-2 md:px-10">
                {kategori === 'all' && (
                    <>
                        {/* Tampilkan Dokter Spesialis */}
                        {dokterSpesialis.length > 0 && (
                            <div className="mb-10">
                                <h1 className="text-2xl font-bold mb-4">Dokter Spesialis</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {dokterSpesialis.map((dokter) => (
                                        <ProfileCard
                                            kategori={dokter.category}
                                            nama_spesialis={dokter.specialistName || ""}
                                            key={dokter.id}
                                            gambar={{ src: dokter.imageUrl || '/img/default-avatar.png', height: 300, width: 300 }}
                                            schedules={dokter.schedules ? JSON.parse(dokter.schedules as string) : []}
                                            nama={dokter.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tampilkan Dokter Umum */}
                        {dokterUmum.length > 0 && (
                            <div>
                                <h1 className="text-2xl font-bold mb-4">Dokter Umum</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {dokterUmum.map((dokter) => (
                                        <ProfileCard
                                            kategori={dokter.category}
                                            nama_spesialis={dokter.specialistName || ""}
                                            key={dokter.id}
                                            gambar={{ src: dokter.imageUrl || '/img/default-avatar.png', height: 300, width: 300 }}
                                            schedules={dokter.schedules ? JSON.parse(dokter.schedules as string) : []}
                                            nama={dokter.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {kategori === 'spesialis' && (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Dokter Spesialis</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {dokterSpesialis.map((dokter) => (
                                <ProfileCard
                                    kategori={dokter.category}
                                    nama_spesialis={dokter.specialistName || ""}
                                    key={dokter.id}
                                    gambar={{ src: dokter.imageUrl || '/img/default-avatar.png', height: 300, width: 300 }}
                                    schedules={dokter.schedules ? JSON.parse(dokter.schedules as string) : []}
                                    nama={dokter.name}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {kategori === 'umum' && (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Dokter Umum</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {dokterUmum.map((dokter) => (
                                <ProfileCard
                                    kategori={dokter.category}
                                    nama_spesialis={dokter.specialistName || ""}
                                    key={dokter.id}
                                    gambar={{ src: dokter.imageUrl || '/img/default-avatar.png', height: 300, width: 300 }}
                                    schedules={dokter.schedules ? JSON.parse(dokter.schedules as string) : []}
                                    nama={dokter.name}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnggotaPage;










// 'use client'

// import { useState } from "react";
// import Navbar from "@/components/layouts/Navbar";
// import ProfileCard from "@/components/ProfileCard";
// import ketua_terbaru from "@/public/img/ketua_terbaru.png";
// import dokter13 from "@/public/img/13.webp";
// import dokter14 from "@/public/img/14.webp";
// import dokter15 from "@/public/img/15.webp";
// import dokter16 from "@/public/img/16.webp";
// import dokter17 from "@/public/img/17.webp";
// import dokter18 from "@/public/img/18.webp";
// import dokter19 from "@/public/img/19.webp";
// import dokter20 from "@/public/img/20.webp";
// import dokter21 from "@/public/img/21.webp";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// const dokterList = [
//     { gambar: ketua_terbaru, nama: "Dr Muhammad Maskun Qolbi", kategori: "umum", jadwal: "Senin, Selasa, Rabu", jam: "07:00 - 10:00" },
//     { gambar: dokter13, nama: "Dr Spesialis A", kategori: "spesialis", jadwal: "Senin, Kamis", jam: "07:00 - 10:00" },
//     { gambar: dokter14, nama: "Dr Umum B", kategori: "umum", jadwal: "Jumat", jam: "07:00 - 10:00" },
//     { gambar: dokter15, nama: "Dr Spesialis B", kategori: "spesialis", jadwal: "Senin, Jumat", jam: "07:00 - 10:00" },
//     { gambar: dokter16, nama: "Dr Umum C", kategori: "umum", jadwal: "Rabu", jam: "07:00 - 10:00" },
//     { gambar: dokter17, nama: "Dr Spesialis C", kategori: "spesialis", jadwal: "Senin, Selasa, Rabu", jam: "07:00 - 10:00" },
//     { gambar: dokter18, nama: "Dr Umum D", kategori: "umum", jadwal: "Senin, Selasa, Rabu", jam: "07:00 - 10:00" },
//     { gambar: dokter19, nama: "Dr Spesialis D", kategori: "spesialis", jadwal: "Senin, Selasa, Rabu", jam: "07:00 - 10:00" },
//     { gambar: dokter20, nama: "Dr Umum E", kategori: "umum", jadwal: "Senin, Selasa, Rabu", jam: "07:00 - 10:00" },
//     { gambar: dokter21, nama: "Dr Spesialis E", kategori: "spesialis", jadwal: "Senin, Selasa, Rabu", jam: "07:00 - 10:00" },
// ];

// const kategoriList = [
//     { label: "All", value: "all" },
//     { label: "Dokter Umum", value: "umum" },
//     { label: "Dokter Spesialis", value: "spesialis" },
// ];

// const hariList = [
//     { label: "Semua Hari", value: "all" },
//     { label: "Senin", value: "Senin" },
//     { label: "Selasa", value: "Selasa" },
//     { label: "Rabu", value: "Rabu" },
//     { label: "Kamis", value: "Kamis" },
//     { label: "Jumat", value: "Jumat" },
//     { label: "Sabtu", value: "Sabtu" },
//     { label: "Minggu", value: "Minggu" },
// ];

// const AnggotaPage = () => {
//     const [kategori, setKategori] = useState("all");
//     const [hari, setHari] = useState("all");

//     const filteredDokter = dokterList.filter((dokter) => {
//         const kategoriMatch = kategori === "all" || dokter.kategori === kategori;
//         const hariMatch =
//             hari === "all" ||
//             dokter.jadwal.split(", ").map((h) => h.trim()).includes(hari);
//         return kategoriMatch && hariMatch;
//     });

//     return (
//         <div className="px-3 md:px-10">
//             <div className="flex px-2 md:px-10 pt-6 w-full justify-between items-center flex-col md:flex-row gap-4 md:gap-0">
//                 <Card className="bg-foreground w-fit">
//                     <CardContent className="flex justify-between items-center">
//                         <div className="flex gap-3 flex-wrap justify-center">
//                             {kategoriList.map((item) => (
//                                 <Button
//                                     key={item.value}
//                                     variant={kategori === item.value ? "default" : "outline"}
//                                     className="px-2 md:px-5 py-2 md:py-4 rounded-xl text-xs md:text-base"
//                                     onClick={() => setKategori(item.value)}
//                                 >
//                                     {item.label}
//                                 </Button>
//                             ))}
//                         </div>
//                     </CardContent>
//                 </Card>
//                 <div className="flex  gap-3 items-center">
//                     <h1 className="text-sm md:text-base">Pilih Hari</h1>
//                     <Select value={hari} onValueChange={setHari}>
//                         <SelectTrigger className="w-[160px]">
//                             <SelectValue placeholder="Pilih Hari" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             {hariList.map((item) => (
//                                 <SelectItem key={item.value} value={item.value}>
//                                     {item.label}
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>
//                 </div>
//             </div>
//             <div className="px-2 md:px-10">
//                 <h1 className="mt-5 text-2xl font-bold ">
//                     {kategori === "umum" && "Dokter Umum"}
//                     {kategori === "spesialis" && "Dokter Spesialis"}
//                     {kategori === "all" && "Semua Dokter"}
//                 </h1>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 md:p-10">
//                 {filteredDokter.map((dokter, idx) => (
//                     <ProfileCard
//                         key={idx}
//                         gambar={dokter.gambar}
//                         jadwal={dokter.jadwal}
//                         jam={dokter.jam}
//                         nama={dokter.nama}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AnggotaPage;