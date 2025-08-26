import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Stethoscope, Activity, HeartPulse, ShieldCheck, UserCheck, FileSpreadsheet, Star, Briefcase, Beaker, Ribbon, Microscope } from "lucide-react";
import kamar from "@/public/img/kamar_I.jpeg"
import Image from "next/image";

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
        { name: "Narkoba 3 Parameter", price: "Rp 150.000", color: "bg-[#ff6400]", icon: <Beaker size={60} className="opacity-65" /> },
        { name: "Narkoba 5 Parameter", price: "Rp 250.000", color: "bg-orange-300", icon: <Beaker size={60} className="opacity-65"/> },
        { name: "Rappid Test HIV", price: "Rp 80.000", color: "bg-orange-300", icon: <Ribbon size={60} className="opacity-65"/> },
        { name: "VDRL", price: "Rp 80.000", color: "bg-red-300", icon: <Microscope size={60} className="opacity-65"/> },
    ];

    return (
        <div className="min-h-screen px-10 pb-20">
            <div className="bg-black text-white h-96 flex justify-center items-center p-6 rounded-3xl shadow-lg w-full relative overflow-hidden">
                <div className="pointer-events-none absolute top-60 -left-60 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-orange-700 via-amber-700 to-yellow-700 opacity-60 blur-[160px] mix-blend-lighten" />
                <div className="pointer-events-none absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-orange-700 via-amber-700 to-yellow-700 opacity-50 blur-[140px] mix-blend-lighten" />
                <div className="pointer-events-none absolute bottom-0 left-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-orange-700 via-amber-700 to-yellow-700 opacity-40 blur-[140px] mix-blend-lighten" />
                <div className="flex flex-col space-y-3 justify-center items-center  md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold">Medical Check Up</h1>
                    <p className="text-xl">Pilihan Tepat Bagi Anda Untuk Mendeteksi
                        Dini Kesehatan, Sayangi Diri Anda Dan Keluarga</p>
                </div>
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
                        <h1 className="text-4xl font-bold text-orange-600 flex justify-center items-center gap-2">
                            <Stethoscope className="w-10 h-10" /> Medical Check Up
                        </h1>
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
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <Activity className="w-6 h-6 text-orange-500" /> Paket Medical Check Up
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packages.map((pkg, i) => (
                            <Card key={i} className="shadow-md hover:shadow-lg transition-all border-orange-100 pt-0 overflow-hidden">
                                <CardHeader className="bg-[#ff6400] flex p-5 justify-between">
                                    <CardTitle className="flex gap-2 text-lg font-semibold text-white">
                                        {pkg.icon}
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
                                                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                {/* Screening */}
                <div className="mt-20">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <HeartPulse className="w-6 h-6 text-orange-500" /> Skrining Tambahan
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {screening.map((s, i) => (
                            <Card key={i} className={`relative border-orange-100 shadow-sm hover:shadow-md ${s.color} group`}>
                                <CardContent className="flex flex-col items-center justify-center py-6">
                                    <p className="text-sm font-medium">{s.name}</p>
                                    <p className="text-lg font-bold">{s.price}</p>
                                </CardContent>
                                <div className="absolute bottom-2 left-2 transition-transform duration-300 group-hover:rotate-[60deg]">
                                    {s.icon}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="bg-black border flex flex-col justify-center text-white h-52 border-orange-200 mt-4 rounded-xl p-6 text-center space-y-3">
                    <h3 className="text-xl font-semibold text-orange-700">Informasi Pemeriksaan</h3>
                    <p className="text-xl">
                        Pemeriksaan Medical Check Up dilakukan <br /> setiap <b>SENIN s/d JUM’AT</b>,
                        pukul <b>08.00 - 14.00 WIB</b>.
                    </p>
                    
                </div>
            </div>
        </div>
    );
}
