// components/ProfileCard.tsx

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { Card } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { CalendarClock, Clock } from 'lucide-react';

type ScheduleGroup = { days: string[]; time: string };

type ProfileCardProps = {
    gambar: StaticImageData | { src: string; height: number; width: number };
    nama: string;
    kategori: string;
    nama_spesialis: string
    schedules: ScheduleGroup[];
};

const ProfileCard = ({ gambar, nama, kategori, nama_spesialis, schedules }: ProfileCardProps) => {

    const allDays = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

    // Membuat pemetaan dari hari ke waktu praktek untuk pencarian cepat
    const scheduleMap = new Map<string, string>();
    schedules.forEach(group => {
        group.days.forEach(day => {
            scheduleMap.set(day, group.time);
        });
    });

    return (
        <div className="bg-foreground pb-6 rounded-3xl shadow-lg w-80 text-white mt-4 flex flex-col h-full">
            <div className="flex justify-center bg-white h-[300px] rounded-2xl overflow-hidden mx-2 mt-2">
                <Image src={gambar} alt={nama} width={300} height={300} loading='lazy' className="w-full h-auto object-cover " />
            </div>
            <div className="text-center mt-5 mx-4 flex flex-col flex-grow">
                <div className="flex items-start justify-start mb-1">
                    <h2 className="text-xl text-start font-bold mr-2">
                        {kategori === "spesialis" ? `Poliklinik ${nama_spesialis}` : "Dokter Umum"}
                    </h2>
                </div>

                {/* --- [PERUBAHAN] Tampilan Jadwal Menggunakan Tabel (Senin-Minggu) --- */}
                {kategori === "spesialis" && (
                    <Card className='p-2 w-full bg-white/10 text-white border-white/20 mt-2'>
                        <Table>
                            <TableHeader>
                                <TableRow className='border-white/20 hover:bg-white/20'>
                                    <TableHead className="border-r border-white/20 text-white"><CalendarClock className="w-4 h-4 inline-block mr-2" />Hari</TableHead>
                                    <TableHead className='text-white'><Clock className="w-4 h-4 inline-block mr-2" />Waktu / Jam</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allDays.map((day, index) => (
                                    <TableRow key={index} className='border-white/20 hover:bg-white/10'>
                                        <TableCell className="border-r border-white/20">{day}</TableCell>
                                        <TableCell>{scheduleMap.get(day) || '-'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                )}
                {/* --- [AKHIR PERUBAHAN] --- */}

                <button className="w-full bg-background text-black py-2 px-4 rounded-xl font-semibold flex items-center justify-center space-x-1 hover:bg-secondary transition-colors mt-auto">
                    <span>{nama}</span>
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;


// import React from 'react';
// import Image, { StaticImageData } from 'next/image';
// import { Clock3, CalendarClock } from 'lucide-react';
// type ProfileCardProps = {
//     gambar: StaticImageData;
//     nama: string;
//     jadwal: string;
//     jam: string;
// };

// const ProfileCard = ({ gambar, nama, jadwal, jam }: ProfileCardProps) => {
//     return (
//         <div className="bg-foreground p-6 rounded-3xl shadow-lg w-80 text-white">

//             <div className="flex justify-center bg-white rounded-3xl">
//                 <Image src={gambar} alt="ketua_terbaru" width={300} height={300} loading='lazy' className="w-full h-auto object-cover " />
//             </div>
//             <div className="text-center mt-5">
//                 <div className="flex items-center justify-start mb-1">
//                     <h2 className="text-xl font-bold mr-2">Dokter Umum</h2>
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 text-green-500"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                     >
//                         <path
//                             fillRule="evenodd"
//                             d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                             clipRule="evenodd"
//                         />
//                     </svg>
//                 </div>
//                 <div className="flex flex-col justify-center items-start gap-2 mb-4">
//                     <p className='text-white'>Jadwal Praktek</p>
//                     <div className="flex items-center text-white">
//                         <CalendarClock className="mr-1" />
//                         <span>{jadwal}</span>
//                     </div>
//                     <div className="flex items-center text-white">
//                         <Clock3 className="mr-1" />
//                         <span>{jam}</span>
//                     </div>
//                 </div>
//                 <button className="w-full bg-white text-black py-2 px-4 rounded-full font-semibold flex items-center justify-center space-x-1 hover:bg-gray-600 transition-colors">
//                     <span>{nama}</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ProfileCard;