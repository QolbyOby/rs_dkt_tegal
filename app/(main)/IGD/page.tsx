import Image from "next/image";
import Igd from '@/public/img/igd.png'
import { Clock, UserCheck } from "lucide-react";
import Banner from "@/components/Banner";

export default function IgdPage() {
    return (
        <div className="flex flex-col justify-center items-center px-10 mb-30">

            <Banner title="Instalasi Gawat Darurat" />

            <div className="flex justify-center items-center px-10 gap-10 pt-25">
                <section className="container mx-auto rounded-3xl shadow-2xl">

                    <div className="bg-white rounded-xl p-8 md:p-12 max-w-4xl mx-auto">
                        <div className="flex gap-5 flex-col md:flex-row items-start mb-10">
                            <div className="mb-6 md:mb-0">
                                <div className="bg-[#ff6400] p-4 rounded-xl inline-block">
                                    <Clock color="white" />
                                </div>
                            </div>
                            <div className="">
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Layanan 24 Jam</h2>
                                <p className="text-gray-600 leading-relaxed text-justify">

                                    Instalasi Gawat Darurat RS DKT Pagongan Tegal siap melayani pasien yang mengalami kegawatdaruratan medis selama 24 jam.
                                    Pelayanan IGD ditangani oleh Dokter jaga dan perawat yang profesional dan kompeten untuk melakukan tindakan resusitasi
                                    pasien ataupun kasus medis lainnya.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-5 flex-col md:flex-row items-start">
                            <div className=" mb-6 md:mb-0 order-2 md:order-1">
                                <div className="bg-[#ff6400] p-4 rounded-xl inline-block">
                                    <UserCheck color="white" />
                                </div>
                            </div>
                            <div className="order-1 md:order-2 ">
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Tim Profesional</h2>
                                <p className="text-gray-600 leading-relaxed text-justify">
                                    Apabila dibutuhkan penanganan lebih lanjut, akan segera kami konsultasikan kepada dokter spesialis yang ada di rumah sakit kami.
                                    Kami memiliki jaringan dokter spesialis yang lengkap untuk memberikan penanganan terbaik bagi pasien.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <Image src={Igd} alt="IGD" className="" />
            </div>
        </div>
    )
}