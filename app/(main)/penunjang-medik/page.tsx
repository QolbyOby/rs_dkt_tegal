'use client'
import { Clock, HeartPulse, Microscope, Pill, ScanHeart, UserCheck } from "lucide-react";
import {
    NavItems
} from "@/components/ui/navbar-pelayanan";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import radiologi from "@/public/img/radiologi.png"
import Image from "next/image";

export default function PenunjangMedikPage() {
    const searchParams = useSearchParams();
    const section = searchParams.get('section');
    const [activeSection, setActiveSection] = useState('farmasi');

    useEffect(() => {
        if (section) {
            setActiveSection(section);
        }
    }, [section]);


    const navItems = [
        {
            name: "Farmasi 24 jam",
            id: "farmasi",
            link: "/penunjang-medik?section=farmasi",
            icon: <Pill className="h-4 w-4" />,
        },
        {
            name: "Laboratorium 24 jam",
            id: "lab",
            link: "/penunjang-medik?section=lab",
            icon: <Microscope className="h-4 w-4" />,
        },
        {
            name: "Radiologi",
            id: "radiologi",
            link: "/penunjang-medik?section=radiologi",
            icon: <ScanHeart className="h-4 w-4" />,
        },
    ];

    const renderDetailContent = () => {
        switch (activeSection) {
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
                        <div className="flex gap-5 flex-col md:flex-row justify-between items-start mb-10">
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
                        <div className="flex gap-5 flex-col md:flex-col  items-start mb-10">
                            <Card className="bg-[#19392C] w-full">
                                <CardContent className="flex justify-between gap-2">
                                    <div className="flex justify-center items-center gap-2">
                                        <Image src={radiologi} alt="radiologi" className="w-15" />
                                        <h1 className="text-5xl text-white font-semibold tracking-tight text-balance">Radiologi</h1>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="h-10 w-10 bg-white rounded-full"></span>
                                        <span className="h-10 w-10 bg-white rounded-full"></span>
                                        <span className="h-10 w-20 bg-white rounded-full"></span>
                                    </div>
                                </CardContent>
                            </Card>
                            <div className="flex ">
                                <div>
                                    <p className="flex-1">
                                        Unit Radiologi RUMAH SAKIT DKT PAGONGAN TEGAL merupakan unit pelayanan penunjang medis yang bertujuan memberikan layanan pemeriksaan radiologi dan akan memberikan hasil berupa foto/ imaging yang akan digunakan sebagai penunjang untuk membantu dokter dalam menegakkan diagnosa suatu penyakit pada pasien, agar perawatan yang diberikan tepat.
                                    </p>
                                    <div>
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1 gap-2 ">
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
                                        <CardContent>
                                            <div className="relative z-10 flex flex-col h-full">
                                                <div className="mb-4">
                                                    <h3 className="text-2xl font-bold flex items-center gap-2">
                                                        <HeartPulse size={28} />
                                                        Visi
                                                    </h3>
                                                </div>
                                                <p className="text-base text-blue-100 mt-auto">
                                                    Mendukung Visi Rumah Sakit agar mencapai pelayanan yang bermutu, pendidikan  dan pelatihan.
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent>
                                            <div className="relative z-10 flex flex-col h-full ">
                                                <div className="mb-4">
                                                    <h3 className="text-2xl font-bold flex items-center gap-2">
                                                        <HeartPulse size={28} />
                                                        Misi
                                                    </h3>
                                                </div>
                                                <ul className="list-disc list-inside">
                                                    <li>
                                                        Memberikan Pelayanan Radiologi yang bermutu dan aman.
                                                    </li>
                                                    <li>
                                                        Mendidik dan mengembangkan tenaga professional radiografer yang handal dan mampu bersaing di era MEA.
                                                    </li>
                                                    <li>
                                                        Melakukan pengembangan ilmu pengetahuan dan teknologi di bidang radiologi.
                                                    </li>
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                            <div>
                                <h1>Keunggulan</h1>
                            </div>
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="flex flex-col justify-center items-center px-10 mb-30 pb-20">
            <div className="bg-black text-white h-96 flex justify-center items-center p-6 rounded-3xl shadow-lg w-full relative overflow-hidden">
                <div className="pointer-events-none absolute top-60 -left-60 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-orange-700 via-amber-700 to-yellow-700 opacity-60 blur-[160px] mix-blend-lighten" />
                <div className="flex flex-col text-5xl font-light space-y-3 justify-center items-center md:mb-0">
                    Penunjang Medik
                </div>
            </div>

            <div className="w-full gap-10 px-10 flex mt-30">
                <Card className="h-fit w-[300px]">
                    <CardContent>
                        <NavItems
                            items={navItems.map(item => ({
                                ...item,
                                className: activeSection === item.id ? "bg-orange-400 text-white rounded-full" : ""
                            }))}
                            className="-z-0 gap-2"
                        />
                    </CardContent>
                </Card>
                <div className="flex flex-3 justify-center items-center gap-10">
                    <section className="container mx-auto rounded-3xl shadow-2xl">
                        <div className="bg-white rounded-xl p-8 md:py-12 mx-auto">
                            {renderDetailContent()}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}