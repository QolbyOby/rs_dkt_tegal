// src/components/PromoCard.tsx

import React from 'react';
import { Card } from "@/components/ui/card";
import { HeartPulse } from 'lucide-react'; // Menggunakan ikon sebagai logo

export const PromoCard = () => {
    return (

        <Card className="relative overflow-hidden h-full flex flex-col justify-between bg-orange-500 text-white shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
            {/* Latar belakang SVG untuk pola gelembung */}
            <div className="absolute inset-0 z-0">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                    {/* Menggunakan fill solid dengan opacity terpisah lebih andal */}
                    <circle cx="20%" cy="80%" r="55" fill="white" opacity="0.08" />
                    <circle cx="85%" cy="30%" r="75" fill="white" opacity="0.1" />
                    <circle cx="90%" cy="95%" r="40" fill="white" opacity="0.07" />
                </svg>
            </div>

            {/* Konten Kartu */}
            <div className="relative z-10 p-6 flex flex-col h-full">
                <div className="mb-4">
                    {/* Ganti dengan logo Anda jika ada, di sini kita pakai ikon */}
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                        <HeartPulse size={28} />
                        IGD
                    </h3>
                </div>
                <p className="text-sm text-blue-100 mt-auto">
                    Unit Gawat Darurat dengan tim medis profesional yang responsif
                </p>
            </div>
        </Card>
    );
};