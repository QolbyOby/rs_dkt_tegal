// src/components/FeaturedServices.tsx

import React from 'react';
import { ServiceCard } from './ServiceCard';
import { PromoCard } from './PromoCard'; // <-- 1. Impor komponen baru

// Impor ikon dari lucide-react
import {
    Clock, Stethoscope, Eye, HeartPulse, Syringe, FlaskConical, Baby, Activity,
} from 'lucide-react';

// Data layanan tidak perlu diubah
const services = [
    // ... (data layanan Anda tetap sama)
    {
        icon: <Clock size={40} />,
        title: 'Layanan 24 Jam',
        description: 'Kami siap melayani kebutuhan darurat Anda kapan saja, siang dan malam.',
    },
    {
        icon: <Stethoscope size={40} />,
        title: 'MCU (Selasa & Rabu)',
        description: 'Paket Medical Check-Up lengkap untuk kesehatan preventif Anda.',
    },
    {
        icon: <Eye size={40} />,
        title: 'Operasi Katarak Phaco',
        description: 'Metode operasi katarak modern, minimal invasif, dan pemulihan cepat.',
    },
    {
        icon: <Baby size={40} />,
        title: 'Operasi Caesar ERACS',
        description: 'Metode persalinan caesar dengan pemulihan lebih cepat dan minim rasa sakit.',
    },
    {
        icon: <Syringe size={40} />,
        title: 'Farmasi',
        description: 'Menyediakan obat-obatan lengkap dan berkualitas dengan resep dokter.',
    },
    {
        icon: <Activity size={40} />,
        title: 'USG 4 Dimensi',
        description: 'Lihat perkembangan buah hati Anda dengan teknologi USG 4D terkini.',
    },
    {
        icon: <FlaskConical size={40} />,
        title: 'Laboratorium',
        description: 'Hasil tes laboratorium yang cepat, akurat, dan terpercaya.',
    },
];


export const FeaturedServices = () => {
    // Kita tentukan posisi kartu spesial
    const specialCardPosition = 1; // Posisi ke-2 (index 1)

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Layanan Unggulan Kami
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Pelayanan medis terbaik yang kami siapkan khusus untuk Anda dan keluarga.
                    </p>
                </div>

                {/* --- PERUBAHAN UTAMA ADA DI SINI --- */}
                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Tampilkan kartu layanan SEBELUM posisi kartu spesial */}
                    {services.slice(0, specialCardPosition).map((service, index) => (
                        <ServiceCard
                            key={service.title}
                            number={(index + 1).toString().padStart(2, '0')}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                        />
                    ))}

                    {/* Sisipkan kartu spesial di sini */}
                    <PromoCard />

                    {/* Tampilkan sisa kartu layanan SESUDAH posisi kartu spesial */}
                    {services.slice(specialCardPosition).map((service, index) => (
                        <ServiceCard
                            key={service.title}
                            // Penomoran dilanjutkan dari posisi kartu spesial
                            number={(index + specialCardPosition + 1).toString().padStart(2, '0')}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                        />
                    ))}

                </div>
            </div>
        </section>
    );
};