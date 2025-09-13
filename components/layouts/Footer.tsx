import Image from "next/image";
import logo from "@/public/img/logo.png";
import { Instagram, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="sm:px-10 md:px-20 relative overflow-hidden bg-[#f7f4eb]">
            <footer className="flex flex-col shadow-xl/30 bg-gradient-to-br from-orange-400 to-orange-600 border rounded-3xl md:mb-40 py-10">
                <div className="mx-auto px-6 md:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Kolom 1: Informasi Kontak (Tetap) */}
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="bg-white p-3 rounded-full">
                                <Image src={logo} alt="logo" className="w-12" />
                            </div>
                            <span className="font-semibold text-lg text-white">RS DKT Tegal</span>
                        </div>
                        <h1 className="mt-4 text-white font-semibold">Alamat</h1>
                        <p className="text-white/80 mt-1 text-sm leading-relaxed">
                            Jl. Raya Pagongan, Adiwerna, Kabupaten Tegal, Jawa Tengah 52125
                        </p>
                        <h1 className="mt-4 text-white font-semibold">Kontak</h1>
                        <p className="text-white/80 mt-1 text-sm">Call Center : (0283) 351420 </p>
                        <p className="text-white/80 mt-1 text-sm">IGD : (0283) 351420 </p>
                    </div>

                    {/* Kolom 2: Jelajahi */}
                    <div className="sm:ml-10 lg:ml-20">
                        <h4 className="font-semibold mb-3 text-white">Jelajahi</h4>
                        <ul className="space-y-2 text-white/80 text-sm">
                            <li><Link href="/profil" className="hover:underline cursor-pointer">Profil</Link></li>
                            <li><Link href="/anggota" className="hover:underline cursor-pointer">Jadwal Dokter</Link></li>
                            <li><Link href="/artikel" className="hover:underline cursor-pointer">Artikel Kesehatan</Link></li>
                            <li><Link href="/kamar" className="hover:underline cursor-pointer">Informasi Kamar</Link></li>
                        </ul>
                    </div>

                    {/* Kolom 3: Layanan Unggulan */}
                    <div className="sm:ml-10 lg:ml-20">
                        <h4 className="font-semibold mb-3 text-white">Layanan Unggulan</h4>
                        <ul className="space-y-2 text-white/80 text-sm">
                            <li><Link href="/IGD" className="hover:underline cursor-pointer">IGD 24 Jam</Link></li>
                            <li><Link href="/poliklinik" className="hover:underline cursor-pointer">Poliklinik</Link></li>
                            <li><Link href="/medical-chek-up" className="hover:underline cursor-pointer">Medical Check-Up</Link></li>
                            <li><Link href="/penunjang-medik" className="hover:underline cursor-pointer">Penunjang Medis</Link></li>
                        </ul>
                    </div>

                    {/* Kolom 4: Sosial Media & Lokasi */}
                    <div className="sm:ml-10 lg:ml-20">
                        <h4 className="font-semibold mb-3 text-white">Temukan Kami</h4>
                        <ul className="space-y-2 text-white/80 text-sm">
                            <li className="flex items-center gap-2 hover:underline cursor-pointer">
                                <Instagram className="w-4 h-4" /> Instagram
                            </li>
                            <li className="flex items-center gap-2 hover:underline cursor-pointer">
                                <Mail className="w-4 h-4" /> Email
                            </li>
                            <li className="flex items-center gap-2 hover:underline cursor-pointer">
                                <MapPin className="w-4 h-4" /> Google Maps
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bagian Copyright */}
                <div className="container mx-auto px-6 md:px-20 mt-8 border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/70 gap-4">
                    <p className="text-center md:text-left">© 2024 RS DKT Tegal. All rights reserved.</p>
                    <p className="text-center md:text-right">Memberikan Pelayanan Terbaik Adalah Prioritas Kami</p>
                </div>
            </footer>

            {/* Elemen Dekoratif */}
            <div className="absolute -bottom-10 md:-bottom-20 left-1/2 -translate-x-1/2 z-10 hidden md:block">
                <h1 className="text-[150px] lg:text-[200px] text-zinc-400 leading-none font-bold whitespace-nowrap">
                    DKT TEGAL
                </h1>
            </div>
            <div className="absolute -bottom-10 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-[-1]" />
        </div>
    )
}

// import Image from "next/image";
// import logo from "@/public/img/logo.png"
// import { Instagram, Linkedin, Mail, Youtube } from "lucide-react";

// export default function Footer() {
//     return (
//         <div className="px-20 relative overflow-hidden ">
//             <footer className="flex flex-col shadow-xl/30 bg-gradient-to-br from-orange-400 to-orange-600 border rounded-3xl mb-40 py-10">
//                 <div className="mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-10">
//                     <div>
//                         <div className="flex items-center gap-2">
//                             <div className="bg-white p-3 rounded-full">
//                                 <Image src={logo} alt="logo" className="w-12" />
//                             </div>
//                             <span className="font-semibold text-lg text-white">RS DKT Tegal</span>
//                         </div>
//                         <h1 className="mt-2 text-white">Alamat</h1>
//                         <p className="text-white/80 mt-1 text-sm leading-relaxed">
//                             Jl. Raya Pagongan Jl. RS DKT Pagongan, Jetis, Lemahduwur, Kec. Adiwerna, Kabupaten Tegal, Jawa Tengah 52125
//                         </p>
//                         <h1 className="mt-2 text-white">Contact</h1>
//                         <p className="text-white/80 mt-1 text-sm">Call Center : (0283) 351420 </p>
//                         <p className="text-white/80 mt-1 text-sm">IGD : (0283) 351420 </p>
//                     </div>
//                     <div className="ml-20">
//                         <h4 className="font-semibold mb-3 text-white">Layanan</h4>
//                         <ul className="space-y-2 text-white/80 text-sm">
//                             <li className="hover:underline cursor-pointer">Features</li>
//                             <li className="hover:underline cursor-pointer">Pricing</li>
//                             <li className="hover:underline cursor-pointer">Integrations</li>
//                             <li className="hover:underline cursor-pointer">Changelog</li>
//                         </ul>
//                     </div>
//                     <div className="ml-20">
//                         <h4 className="font-semibold mb-3 text-white">Resources</h4>
//                         <ul className="space-y-2 text-white/80 text-sm">
//                             <li className="hover:underline cursor-pointer">Documentation</li>
//                             <li className="hover:underline cursor-pointer">Tutorials</li>
//                             <li className="hover:underline cursor-pointer">Blog</li>
//                             <li className="hover:underline cursor-pointer">Support</li>
//                         </ul>
//                     </div>
//                     <div className="ml-20">
//                         <h4 className="font-semibold mb-3 text-white">Company</h4>
//                         <ul className="space-y-2 text-white/80 text-sm">
//                             <li className="hover:underline cursor-pointer">About</li>
//                             <li className="hover:underline cursor-pointer">Careers</li>
//                             <li className="hover:underline cursor-pointer">Contact</li>
//                             <li className="hover:underline cursor-pointer">Partners</li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="container mx-auto px-6 md:px-20 mt-8 border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/70">
//                     <p>© 2025 RS DKT Tegal. All rights reserved.</p>
//                     <div className="flex items-center gap-4 mt-4 text-white">
//                         <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-300" />
//                         <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-300" />
//                         <Mail className="w-5 h-5 cursor-pointer hover:text-gray-300" />
//                     </div>
//                 </div>
//             </footer>
//             <div className="absolute -bottom-20 left-[220px]">
//                 <h1 className="text-[200px] text-zinc-300 leading-none font-bold">
//                     DKT TEGAL
//                 </h1>
//             </div>
//             <div className="absolute -bottom-10 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
//         </div>
//     )
// }
