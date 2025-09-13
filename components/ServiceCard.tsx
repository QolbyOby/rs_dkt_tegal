// src/components/ServiceCard.tsx

import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"; // Pastikan path ini sesuai

// Tipe properti (props) untuk komponen kita
interface ServiceCardProps {
    number: string;
    icon?: React.ReactNode;
    title?: string;
    description: string;
    className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ number, icon, title, description, className }) => {   
    return (
        // Gunakan komponen Card dari shadcn/ui sebagai dasar
        // `relative` dan `overflow-hidden` penting untuk posisi nomor
        <Card className={`relative overflow-hidden h-full flex flex-col border border-foreground transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl ${className}`}>
            {/* Nomor besar sebagai latar belakang */}
            <span className="absolute top-0 left-4 text-8xl font-extrabold text-orange-400/20 z-0">
                {number}
            </span>

            {/* Wrapper untuk konten agar berada di atas nomor */}
            <div className="relative z-10 flex flex-col flex-grow h-full bg-[#f9f8f3] mt-6">
                <CardHeader className="flex flex-row items-center gap-3">
                    <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
                </CardHeader>

                <CardContent className="flex flex-col flex-grow">
                    <p className="text-sm text-muted-foreground flex-grow mb-6">
                        {description}
                    </p>
                    <div className="text-primary self-end">{icon}</div>
                </CardContent>
            </div>
        </Card>
    );
};