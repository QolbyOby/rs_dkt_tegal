// app/(main)/farmasi/page.tsx

import Image from "next/image";
import { Clock, Pill } from "lucide-react";

export default function FarmasiPage() {
    return (
        <div className="flex flex-col justify-center items-center px-10 mb-30">
            <div className="bg-black text-white h-96 flex justify-center items-center p-6 rounded-3xl shadow-lg w-full relative overflow-hidden">
                <div className="pointer-events-none absolute top-60 -left-60 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-700 via-teal-700 to-green-700 opacity-60 blur-[160px] mix-blend-lighten" />
                <div className="flex flex-col space-y-3 justify-center items-center md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold ">Farmasi 24 Jam</h1>
                    <p className="text-xl">Layanan farmasi kami siap melayani Anda kapan saja.</p>
                </div>
            </div>

            <div className="flex justify-center items-center px-10 gap-10 pt-25">
                <section className="container mx-auto rounded-3xl shadow-2xl">
                    <div className="bg-white rounded-xl p-8 md:p-12 max-w-4xl mx-auto">
                        <div className="flex gap-5 flex-col md:flex-row items-start mb-10">
                            <div className="mb-6 md:mb-0">
                                <div className="bg-[#1E90FF] p-4 rounded-xl inline-block">
                                    <Clock color="white" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Selalu Buka, Selalu Siap</h2>
                                <p className="text-gray-600 leading-relaxed text-justify">
                                    Unit farmasi kami beroperasi 24 jam sehari, 7 hari seminggu, untuk memastikan Anda selalu mendapatkan akses ke obat-obatan yang Anda butuhkan, kapan pun waktunya.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-5 flex-col md:flex-row items-start">
                            <div className="mb-6 md:mb-0">
                                <div className="bg-[#1E90FF] p-4 rounded-xl inline-block">
                                    <Pill color="white" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Obat Lengkap & Terjamin</h2>
                                <p className="text-gray-600 leading-relaxed text-justify">
                                    Kami menyediakan berbagai macam obat-obatan, baik resep maupun non-resep, dengan kualitas yang terjamin dan di bawah pengawasan apoteker profesional kami.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <Image src="/img/farmasi.png" alt="Farmasi" width={500} height={500} className="rounded-lg" />
            </div>
        </div>
    )
}