'use client'
import { Clock, Microscope, Pill, ScanHeart, UserCheck } from "lucide-react";
import {
    NavItems
} from "@/components/ui/navbar-pelayanan";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function PenunjangMedikPage() {
    const [activeSection, setActiveSection] = useState('farmasi');

    const navItems = [
        {
            name: "Farmasi 24 jam",
            id: "farmasi",
            icon: <Pill className="h-4 w-4" />,
            onItemClick: () => setActiveSection('farmasi')
        },
        {
            name: "Laboratorium 24 jam",
            id: "lab",
            icon: <Microscope className="h-4 w-4" />,
            onItemClick: () => setActiveSection('lab')
        },
        {
            name: "Radiologi",
            id: "radiologi",
            icon: <ScanHeart className="h-4 w-4" />,
            onItemClick: () => setActiveSection('radiologi')
        },
    ];

    const renderContent = () => {
        switch(activeSection) {
            case 'farmasi':
                return (
                    <>
                        <h1 className="text-4xl md:text-5xl font-bold">Farmasi 24 Jam</h1>
                        <p className="text-xl">Layanan farmasi kami siap melayani Anda kapan saja.</p>
                    </>
                );
            case 'lab':
                return (
                    <>
                        <h1 className="text-4xl md:text-5xl font-bold">Laboratorium 24 Jam</h1>
                        <p className="text-xl">Layanan laboratorium lengkap dengan peralatan modern.</p>
                    </>
                );
            case 'radiologi':
                return (
                    <>
                        <h1 className="text-4xl md:text-5xl font-bold">Radiologi</h1>
                        <p className="text-xl">Layanan pencitraan medis dengan teknologi terkini.</p>
                    </>
                );
        }
    };

    const renderDetailContent = () => {
        switch(activeSection) {
            case 'farmasi':
                return (
                    <>
                        <div className="flex gap-5 flex-col md:flex-row items-start mb-10">
                            <div className="mb-6 md:mb-0">
                                <div className="bg-[#ff6400] p-4 rounded-xl inline-block">
                                    <Clock color="white" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Layanan 24 Jam</h2>
                                <p className="text-gray-600 leading-relaxed text-justify">
                                    Farmasi RS DKT Pagongan Tegal siap melayani kebutuhan obat-obatan Anda selama 24 jam.
                                    Dilayani oleh apoteker profesional yang siap memberikan konsultasi penggunaan obat.
                                </p>
                            </div>
                        </div>
                    </>
                );
            case 'lab':
                return (
                    <>
                        <div className="flex gap-5 flex-col md:flex-row items-start mb-10">
                            <div className="mb-6 md:mb-0">
                                <div className="bg-[#ff6400] p-4 rounded-xl inline-block">
                                    <Microscope color="white" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Laboratorium Modern</h2>
                                <p className="text-gray-600 leading-relaxed text-justify">
                                    Laboratorium kami dilengkapi dengan peralatan modern dan staff yang kompeten.
                                    Memberikan hasil yang akurat dan cepat untuk berbagai jenis pemeriksaan.
                                </p>
                            </div>
                        </div>
                    </>
                );
            case 'radiologi':
                return (
                    <>
                        <div className="flex gap-5 flex-col md:flex-row items-start mb-10">
                            <div className="mb-6 md:mb-0">
                                <div className="bg-[#ff6400] p-4 rounded-xl inline-block">
                                    <ScanHeart color="white" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Radiologi Digital</h2>
                                <p className="text-gray-600 leading-relaxed text-justify">
                                    Unit radiologi kami menggunakan teknologi pencitraan digital terkini.
                                    Memberikan hasil yang detail dan akurat untuk diagnosis yang tepat.
                                </p>
                            </div>
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="flex flex-col justify-center items-center px-10 mb-30 pb-20">
            <div className="bg-black text-white h-96 flex justify-center items-center p-6 rounded-3xl shadow-lg w-full relative overflow-hidden">
                <div className="pointer-events-none absolute top-60 -left-60 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-700 via-teal-700 to-green-700 opacity-60 blur-[160px] mix-blend-lighten" />
                <div className="flex flex-col space-y-3 justify-center items-center md:mb-0">
                    {renderContent()}
                </div>
            </div>

            <div className="w-full px-10 flex mt-30">
                <Card className="h-fit w-[300px]">
                    <CardContent>
                        <NavItems items={navItems.map(item => ({
                            name: item.name,
                            icon: item.icon,
                            onItemClick: item.onItemClick
                        }))} className="h-fit -z-0" />
                    </CardContent>
                </Card>
                <div className="flex flex-3 justify-center items-center gap-10">
                    <section className="container mx-auto rounded-3xl shadow-2xl">
                        <div className="bg-white rounded-xl p-8 md:p-12 max-w-4xl mx-auto">
                            {renderDetailContent()}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}