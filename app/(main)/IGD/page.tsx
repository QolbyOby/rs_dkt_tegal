import Image from "next/image";
import Igd from '@/public/img/igd.png'
import { Clock, UserCheck } from "lucide-react";

export default function IgdPage() {
    return (
        <div className="flex flex-col justify-center items-center px-10 mb-30">
            <div className="bg-black text-white h-96 flex justify-center items-center p-6 rounded-3xl shadow-lg w-full relative overflow-hidden">
                <div className="pointer-events-none absolute top-60 -left-60 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-orange-700 via-amber-700 to-yellow-700 opacity-60 blur-[160px] mix-blend-lighten" />
                <div className="pointer-events-none absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-orange-700 via-amber-700 to-yellow-700 opacity-50 blur-[140px] mix-blend-lighten" />
                <div className="pointer-events-none absolute bottom-0 left-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-orange-700 via-amber-700 to-yellow-700 opacity-40 blur-[140px] mix-blend-lighten" />
                <div className="flex flex-col space-y-3 justify-center items-center  md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold ">Instalasi Gawat Darurat</h1>
                    <p className="text-xl">Pelayanan gawat darurat 24 jam  siap membantu Anda.</p>
                    <button className="bg-white text-primary px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300">
                        <a href="https://wa.me/62895389453841" target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <i className="fas fa-phone-alt mr-2"></i> Hubungi IGD
                        </a>
                    </button>
                </div>
            </div>

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