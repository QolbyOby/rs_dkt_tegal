import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Activity, ShieldCheck, UserCheck, FileSpreadsheet, Star, Briefcase, Beaker, Ribbon, Microscope } from "lucide-react";
import kamar from "@/public/img/kamar_I.jpeg"
import Image from "next/image";
import bg_md from "@/public/img/bg_md.png"
import { ServiceCard } from "@/components/ServiceCard";

export default function MedicalCheckupPage() {

    const packages = [
        {
            title: "Paket Sederhana",
            price: 550000,
            icon: <ShieldCheck />,
            features: [
                { category: "Pemeriksaan Fisik", items: ["Rik Umum", "Rik Organ Luar dan Eksterminitas Atas dan Bawah", "Rik Telinga, Hidung dan Tenggorokan", "Rik Gigi dan Mulut"] },
                { category: "Pemeriksaan Penunjang", items: ["Radiologi (Foto Thorax)", "EKG"] },
                { category: "Laboratorium", items: ["Darah Rutin", "Gula Darah (Puasa)", "Cholesterol", "Asam Urat", "Urine Lengkap"] },
                { category: "Administrasi", items: [] }
            ]
        },
        {
            title: "Paket Standar",
            subtitle: "(Calon Karyawan/TNI-Polri/Sekolah)",
            price: 550000,
            icon: <UserCheck />,
            features: [
                { category: "Pemeriksaan Fisik", items: ["Rik Umum", "Rik Organ Luar dan Eksterminitas Atas dan Bawah", "Rik Telinga, Hidung dan Tenggorokan", "Rik Gigi dan Mulut"] },
                { category: "Pemeriksaan Penunjang", items: ["Radiologi (Foto Thorax)", "EKG"] },
                { category: "Laboratorium", items: ["Darah Lengkap (Darah Rutin+LED)", "Gula Darah (Puasa)", "Cholesterol", "Asam Urat", "Urine Lengkap", "Fungsi Hati (SGPT&SGOT)", "Fungsi Ginjal (Ureum&Creatinin)"] },
                { category: "Administrasi", items: [] }
            ]
        },
        {
            title: "Paket Lengkap",
            price: 885000,
            icon: <FileSpreadsheet />,
            features: [
                { category: "Pemeriksaan Fisik", items: ["Rik Umum", "Rik Organ Luar dan Eksterminitas Atas dan Bawah", "Rik Telinga, Hidung dan Tenggorokan", "Rik Gigi dan Mulut", "Rik Mata"] },
                { category: "Pemeriksaan Penunjang", items: ["Radiologi (Foto Thorax)", "USG"] },
                { category: "Laboratorium", items: ["Darah Lengkap (Darah Rutin+LED)", "Gula Darah (Puasa)", "Cholesterol", "Asam Urat", "Urine Lengkap", "Fungsi Hati (SGPT & SGOT)", "Fungsi Ginjal (Ureum & Kreatinin)", "HbsAg"] },
                { category: "Administrasi", items: [] }
            ]
        },
        {
            title: "Paket Prima",
            price: 1065000,
            icon: <Star />,
            features: [
                { category: "Pemeriksaan Fisik", items: ["Rik Umum", "Rik Organ Luar dan Eksterminitas Atas dan Bawah", "Rik Telinga, Hidung dan Tenggorokan", "Rik Gigi dan Mulut", "Rik Mata"] },
                { category: "Pemeriksaan Penunjang", items: ["Radiognostik (Foto Thorax)", "USG", "EKG"] },
                { category: "Laboratorium", items: ["Darah Lengkap (D.Rutin+LED)", "Gula Darah (Puasa)", "Cholesterol", "Asam Urat", "Trigliserida", "HDL-LDL", "Alkali Phosphatase (APT)", "Bilirubin Lengkap", "Fungsi Hati (SGPT & SGOT)", "Fungsi Ginjal (Ureum Kreatinin)", "HbsAg"] },
                { category: "Administrasi", items: [] }
            ]
        },
        {
            title: "Paket Karyawan",
            price: 370000,
            icon: <Briefcase />,
            features: [
                { category: "Pemeriksaan Fisik", items: ["Rik Umum", "Rik Organ Luar dan Eksterminitas Atas dan Bawah", "Rik Telinga, Hidung dan Tenggorokan", "Rik Gigi dan Mulut", "Rik Mata"] },
                { category: "Pemeriksaan Penunjang", items: ["Radiologi (Foto Thorax)", "EKG"] },
                { category: "Laboratorium", items: ["Darah Lengkap (Darah Rutin+LED)", "Urine Lengkap", "HbsAg"] },
                { category: "Administrasi", items: [] }
            ]
        },
    ];

    const screening = [
        { name: "Narkoba 3 Parameter", price: "Rp 150.000", icon: <Beaker size={60} className="opacity-65" /> },
        { name: "Narkoba 5 Parameter", price: "Rp 250.000", icon: <Beaker size={60} className="opacity-65" /> },
        { name: "Rappid Test HIV", price: "Rp 80.000", icon: <Ribbon size={60} className="opacity-65" /> },
        { name: "VDRL", price: "Rp 80.000", icon: <Microscope size={60} className="opacity-65" /> },
    ];

    return (
        <div className="min-h-screen px-10 pb-20">
            <div className="bg-foreground text-white h-96 flex justify-center items-center p-6 rounded-3xl shadow-lg w-full relative overflow-hidden ">

                <div className="absolute top-30 left-55 w-56 h-60 bg-gradient-to-b from-orange-500/30 to-transparent rounded-3xl transform backdrop-blur-lg"></div>
                <div className="absolute top-20 left-35 w-56 h-60 bg-gradient-to-b from-orange-500/20 via-orange-500/10 to-transparent rounded-3xl transform backdrop-blur-md"></div>
                <div className="absolute top-10 left-15 w-56 h-60 bg-gradient-to-b from-orange-500/15 via-orange-500/10 to-transparent rounded-3xl transform backdrop-blur-sm"></div>

                <div className="absolute top-30 right-55 w-56 h-60 bg-gradient-to-b from-orange-500/30 to-transparent rounded-3xl transform backdrop-blur-lg"></div>
                <div className="absolute top-20 right-35 w-56 h-60 bg-gradient-to-b from-orange-500/20 via-orange-500/10 to-transparent rounded-3xl transform backdrop-blur-md"></div>
                <div className="absolute top-10 right-15 w-56 h-60 bg-gradient-to-b from-orange-500/15 via-orange-500/10 to-transparent rounded-3xl transform backdrop-blur-sm"></div>

                <h1 className="text-4xl md:text-5xl font-light text-center z-10">
                    Medical Check Up
                </h1>
            </div>


            <div className="max-w-7xl mx-auto mt-20">
                <div className="flex gap-10">
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <div>
                            <Image src={kamar} alt="kamar" className="w-full h-auto rounded-lg" />
                        </div>
                        <div>
                            <Image src={kamar} alt="kamar" className="w-full h-auto rounded-lg" />
                        </div>
                        <div>
                            <Image src={kamar} alt="kamar" className="w-full h-auto rounded-lg" />
                        </div>
                        <div>
                            <Image src={kamar} alt="kamar" className="w-full h-auto rounded-lg" />
                        </div>
                    </div>
                    <div className="w-[600px]">
                        <Card className="bg-black/85 mb-5">
                            <CardContent className="flex justify-between">
                                <h1 className="text-4xl text-white font-light tracking-tight text-balance">
                                    Medical Check Up
                                </h1>
                                <div className="flex gap-3">
                                    <span className="h-10 w-10 bg-white rounded-full"></span>
                                    <span className="h-10 w-10 bg-white rounded-full"></span>
                                    <span className="h-10 w-20 bg-white rounded-full"></span>
                                </div>
                            </CardContent>
                        </Card>
                        <p className="text-gray-600 max-w-2xl mx-auto text-justify">
                            Mencegah tentu lebih baik dari pada mengobati. Seperti yang Pemeriksaan Radiologi
                            kita ketahui, kesehatan adalah segalanya. Medical Check Up
                            (MCU) dapat dilakukan untuk mengetahui kondisi kesehatan,
                            sekaligus mendeteksi suatu penyakit sejak dini. Semakin
                            cepat suatu penyakit terdeteksi, maka semakin efektif
                            penaganan yang dapat diberikan. Dengan demikian penyakit
                            tidak berlanjut ke tahap yang lebih serius, sekaligus
                            mencegah tindakan penanganan yang lebih rumit
                        </p>
                        <br />
                        <p className="text-gray-600 max-w-2xl mx-auto text-justify">
                            Dan Bagi anda yang akan menjalani tes calon TNI/ Polri/
                            Akademi dan sekolah kedinasan lain merupakan pilihan yang
                            tepat untuk mempersiapkan diri saudara untuk melaksanakan
                            medical check up dengan standar pemeriksaan TNI/Polri,
                            serta Anda seorang karyawan kami hadir untuk Anda semua
                            untuk beberapa macam paket medical check up.
                        </p>
                    </div>
                </div>

                <div className="mt-24">
                    <h2 className="text-4xl font-light text-gray-800 mb-6 flex items-center gap-2">
                        <Activity className="w-6 h-6 text-orange-500" />Paket Medical Check Up
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packages.map((pkg, i) => (
                            <Card key={i} className="shadow-md hover:shadow-lg bg-[#f9f8f3] transition-all border-orange-100 pt-0 overflow-hidden">
                                <CardHeader className="bg-gradient-to-r rounded-b-xl from-orange-600 via-orange-500 to-orange-400 flex p-5 justify-between items-center">
                                    <CardTitle className="flex items-center gap-2 text-xl font-semibold text-white">
                                        <div className=" bg-[#fff5ea] text-foreground p-3 rounded-lg flex items-center justify-center">
                                            {pkg.icon}
                                        </div>
                                        {pkg.title}
                                    </CardTitle>
                                    <p className="text-xl font-bold text-white">Rp {pkg.price.toLocaleString('id-ID')}</p>
                                </CardHeader>
                                <CardContent>
                                    {pkg.features.map((detail) => (
                                        <div key={detail.category}>
                                            <h4 className="font-semibold text-gray-700">{detail.category}</h4>
                                            <ul className="list-disc list-inside pl-2 text-gray-600 mt-1">
                                                {detail.items.map((item) => (
                                                    <li key={item} className="flex items-start gap-2">
                                                        <CheckCircle2 className="w-4 h-4 bg-orange-400 rounded-full text-white mt-1" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                        <div className="grid grid-cols-2 gap-4">

                            <Card className="relative col-span-2  overflow-hidden bg-orange-500 text-white shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                                {/* Latar belakang SVG untuk pola gelembung */}
                                <div className="absolute inset-0 z-0">
                                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                                        {/* Menggunakan fill solid dengan opacity terpisah lebih andal */}
                                        <circle cx="20%" cy="80%" r="55" fill="white" opacity="0.08" />
                                        <circle cx="85%" cy="30%" r="75" fill="white" opacity="0.1" />
                                        <circle cx="90%" cy="95%" r="40" fill="white" opacity="0.07" />
                                    </svg>
                                </div>


                                <CardContent>
                                    <p className="text-3xl text-center font-semibold text-white">
                                        SKRINING <br /> TAMBAHAN
                                    </p>
                                </CardContent>
                            </Card>

                            {screening.map((s, i) => (
                                <ServiceCard
                                    className="bg-[#f9f8f3]"
                                    number={(i + 1).toString().padStart(2, '0')}
                                    key={i}
                                    title={s.name}
                                    description={s.price}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="bg-black w-full relative border text-white h-[400px] border-orange-200 mt-4 rounded-xl p-10 space-y-3">
                    <h3 className="text-2xl font-semibold text-orange-700 z-10">Informasi Pemeriksaan</h3>
                    <p className="text-3xl font-light z-10">
                        Pemeriksaan Medical Check Up dilakukan <br /> setiap Senin s/d Jumat,
                        pukul 08.00 - 14.00 WIB.
                    </p>
                    <div>
                        <div>
                            
                        </div>
                        <div>

                        </div>
                    </div>
                    <Image src={bg_md} alt="bg_md" className="absolute w-80 right-10 bottom-0" />
                </div>
            </div>
        </div>
    );
}
