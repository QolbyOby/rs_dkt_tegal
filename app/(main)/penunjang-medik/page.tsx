'use client'
import { Clock, HeartPulse, Microscope, Pill, ScanHeart, UserCheck } from "lucide-react";
import {
    NavItems
} from "@/components/ui/navbar-pelayanan";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import radiologi from "@/public/img/radiologi.png"
import lab from "@/public/img/lab.png"
import farmasi_logo from "@/public/img/farmasi.png"
import Image from "next/image";
import radiologi_1 from "@/public/img/k-3.jpeg"
import { ServiceCard } from "@/components/ServiceCard";
import radiologi_2 from "@/public/img/radiologi_2.jpg"
import radiologi_3 from "@/public/img/radiologi_3.jpg"
import Banner from "@/components/Banner";

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

    const serviceITems = [
        {
            icon: <Pill className="h-4 w-4" />,
            title: "Hematologi",
            description: "Pemeriksaan trombosit, Hb, leukosit, golongan darah, dan diff count",
        },
        {
            icon: <UserCheck className="h-4 w-4" />,
            title: "Kimia Klinik",
            description: "Pemeriksaan kolesterol, trigliserida, gula darah, SGOT, SGPT, asam urat",
        },
        {
            icon: <UserCheck className="h-4 w-4" />,
            title: "Serologi",
            description: "Pemeriksaan widal, HbSAg, NS1, HIV, VDRL, dan lain-lain",
        },
        {
            icon: <UserCheck className="h-4 w-4" />,
            title: "Feses & Urin",
            description: "Pemeriksaan feses rutin, urin rutin, HCG, dan lain-lain",
        },
        {
            icon: <Pill className="h-4 w-4" />,
            title: "Narkoba",
            description: "Pemeriksaan kandungan narkoba dalam urin (3 dan 5 parameter)",
        },
        {
            icon: <Pill className="h-4 w-4" />,
            title: "Medical Check Up",
            description: "Berbagai paket pemeriksaan kesehatan menyeluruh",
        },
    ]

    const motoFarmasi = [
        {
            description: "Profesional tepat obat, tepat waktu dan tepat pasien"
        },
        {
            description: "Menekankan kepercayaan dan orientasi kesembuhan pasien"
        },
        {
            description: "Pasien safety prioritas utama"
        },
        {
            description: "Penggunaan obat lebih Aman dan Efektif"
        },
    ]

    const renderDetailContent = () => {
        switch (activeSection) {
            case 'farmasi':
                return (
                    <>
                        <div className="flex gap-5 flex-col md:flex-col items-start mb-10">
                            <Card className="bg-black/85  w-full">
                                <CardContent className="flex justify-between items-center gap-2">
                                    <div className="flex justify-center items-center gap-2">
                                        <Image src={farmasi_logo} alt="radiologi" className="w-15" />
                                        <h1 className="text-5xl text-white font-semibold tracking-tight text-balance">Farmasi</h1>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="h-10 w-10 bg-white rounded-full"></span>
                                        <span className="h-10 w-10 bg-white rounded-full"></span>
                                        <span className="h-10 w-20 bg-white rounded-full"></span>
                                    </div>
                                </CardContent>
                            </Card>
                            <h1 className="text-3xl font-bold text-gray-800 ">
                                Peran Kefarmasian Di Rumah Sakit TK.IV 04.07.01 TEGAL
                            </h1>
                            <p>
                                Rumah Sakit Tk.IV 04.07.01 Tegal merupakan Rumah Sakit Angkatan Darat Yang berlokasi Di Jl.. Dhukuh Turi, Pepedan Tegal. Rumah Sakit Tersebut yang memberikan pelayanan bagi Prajurit dan PNS serta keluarganya, juga masyarakat umum  dan bpjs.
                                Salah satu unsur unit penunjang penting dalam struktur Rumah Sakit untuk peningkatan pelayanan Rumah Sakit Tk.IV 04.07.01 Tegal dan bertanggung jawab dalam pengelolaan obat dan perbekalan Farmasi yaitu adanya pelayanan kefarmasian dalam penggunaan obat yang rasional di masyarakat.
                            </p>
                            <p>
                                Pelayanan kefarmasian dalam  pemberian obat secara rasional diberiakan kepada prajurit, PNS serta keluarganya juga masyarakat umum dan bpjs dengan baik dan optimal. Unsur Pelayanan kefarmasian tersebut pada unsur utama melalui :
                            </p>
                            <div>
                                <div className="grid grid-cols-2 gap-2 mb-10">
                                    <Card className="relative overflow-hidden h-full flex flex-col justify-between bg-orange-500 text-white shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                                        <div className="absolute inset-0 z-0">
                                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                                                <circle cx="20%" cy="80%" r="55" fill="white" opacity="0.08" />
                                                <circle cx="85%" cy="30%" r="75" fill="white" opacity="0.1" />
                                                <circle cx="90%" cy="95%" r="40" fill="white" opacity="0.07" />
                                            </svg>
                                        </div>
                                        <CardContent>
                                            <div className="relative z-10 flex flex-col h-full">
                                                <div className="mb-4">
                                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                                        <HeartPulse size={28} />
                                                        Pelayanan Farmasi Sedian Managerial
                                                    </h3>
                                                </div>
                                                <ul className="list-disc list-inside">
                                                    <li>
                                                        Pelayanan Obat dan Alat kesehatan
                                                    </li>
                                                    <li>
                                                        Penyimpanan
                                                    </li>
                                                    <li>
                                                        Distribusi
                                                    </li>
                                                    <li>
                                                        Pengendalian Stock
                                                    </li>
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent>
                                            <div className="relative z-10 flex flex-col h-full ">
                                                <div className="mb-4">
                                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                                        <HeartPulse size={28} />
                                                        Pelayanan Farmasi Klinis
                                                    </h3>
                                                </div>
                                                <ul className="list-disc list-inside">
                                                    <li>
                                                        Pelayanan memberikan informasi yang akurat
                                                    </li>
                                                    <li>
                                                        Meninjau resep dokter
                                                    </li>
                                                    <li>
                                                        Konseling pasien
                                                    </li>
                                                    <li>
                                                        Monitoring Terapi Obat
                                                    </li>
                                                    <li>
                                                        Pelaporan Efek Samping Obat
                                                    </li>
                                                    <li>
                                                        Kolaborasi Antar Dokter dan Tenaga Kesehatan
                                                    </li>
                                                    <li>
                                                        Pengawasan mutu obat
                                                    </li>
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-10">

                            {/* Bagian 1 */}
                            <div className="flex flex-col md:flex-row gap-5 items-center">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-4">Struktur dan Peran Kefarmasian</h3>
                                    <p className="text-gray-600">
                                        Struktur Kefarmasian adalah strategi terpenting dalam memastikan Apoteker sebagai penanggung jawab dapat memberikan mutu pelayanan kesehatan terbaik. Peran Tenaga Teknis Kefarmasian juga krusial dalam membantu tugas apoteker demi keselamatan pasien.
                                    </p>
                                </div>
                                <div className="flex-1">
                                    <Image src={radiologi_1} alt="Struktur Kefarmasian" className="w-full h-full object-cover rounded-lg shadow-md" />
                                </div>
                            </div>

                            {/* Bagian 2 */}
                            <div className="flex flex-col md:flex-row gap-5 items-center">
                                <div className="flex-1">
                                    <Image src={radiologi_1} alt="Pelayanan Farmasi Klinis" className="w-full h-full object-cover rounded-lg shadow-md" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-4">Transformasi Pelayanan Farmasi</h3>
                                    <p className="text-gray-600">
                                        Dari sekadar logistik menjadi pelayanan klinis, transformasi ini memerlukan kompetensi, kolaborasi antar profesi, dan dukungan manajemen. Tujuannya adalah mewujudkan pelayanan farmasi yang optimal dan berorientasi pada pasien untuk mengurangi potensi kesalahan obat.
                                    </p>
                                </div>
                            </div>

                            {/* Bagian 3 */}
                            <div className="flex flex-col md:flex-row gap-5 items-center">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-4">Jaminan Mutu dan Keberhasilan Terapi</h3>
                                    <p className="text-gray-600">
                                        Pemberian obat yang tepat oleh apoteker dan TTK adalah wujud keberhasilan terapi. Mutu pelayanan kefarmasian menjadi faktor kunci dalam pengobatan pasien dan kualitas seluruh layanan kesehatan, yang terus dikembangkan melalui indikator dan strategi yang tepat.
                                    </p>
                                </div>
                                <div className="flex-1">
                                    <Image src={radiologi_1} alt="Jaminan Mutu Obat" className="w-full h-full object-cover rounded-lg shadow-md" />
                                </div>
                            </div>

                        </div>
                        <h1 className="my-10 text-3xl font-semibold ml-5">
                            Moto pelayanan kefarmasian
                        </h1>
                        <div className="grid grid-cols-4 gap-3">
                            {motoFarmasi.map((moto, index) => (
                                <Card key={index} className="bg-orange-500 relative">
                                    <span className="absolute top-0 left-7 text-8xl font-extrabold text-white -z-0">
                                        {index + 1}
                                    </span>
                                    <div className="absolute inset-0 z-1">
                                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                                            <circle cx="20%" cy="80%" r="55" fill="white" opacity="0.08" />
                                            <circle cx="85%" cy="30%" r="75" fill="white" opacity="0.1" />
                                            <circle cx="90%" cy="95%" r="40" fill="white" opacity="0.07" />
                                        </svg>
                                    </div>
                                    <CardContent className="mt-9">
                                        <div className="relative bg-orange-500 z-10 flex flex-col h-full">
                                            <p className="text-base text-background flex-grow mb-6">
                                                {moto.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </>
                );
            case 'lab':
                return (
                    <>
                        <div className="flex gap-5 flex-col md:flex-col items-start mb-10">
                            <Card className="bg-black/85 w-full">
                                <CardContent className="flex justify-between items-center gap-2">
                                    <div className="flex justify-center items-center gap-2">
                                        <Image src={lab} alt="radiologi" className="w-15" />
                                        <h1 className="text-5xl text-white font-semibold tracking-tight text-balance">Laboratorium</h1>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="h-10 w-10 bg-white rounded-full"></span>
                                        <span className="h-10 w-10 bg-white rounded-full"></span>
                                        <span className="h-10 w-20 bg-white rounded-full"></span>
                                    </div>
                                </CardContent>
                            </Card>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                    Profil Laboratorium Rumkit TK IV 04.07.01 Tegal
                                </h1>
                                <p className="mb-10">
                                    Laboratorium merupakan sarana pelayanan kesehatan yang melaksanakan pengukuran, penetapan, dan pengujian untuk penentuan jenis penyakit, penyebab penyakit, dan kondisi kesehatan. Oleh karena itu, Laboratorium Rumkit TK IV 04.07.01 Tegal selalu berupaya untuk menyelenggarakan pemeriksaan laboratorium yang akurat dan terpercaya untuk menunjang pelayanan paripurna sesuai kebutuhan pasien dalam rangka pelayanan, pendidikan dan pusat rujukan, serta terjangkau oleh lapisan masyarakat. Untuk mencapai tujuan tersebut, Laboratorium Rumkit TK IV 04.07.01 Tegal ditunjang dengan Ahli Teknologi Laboratorium Medis yang kompeten dan inovatif dibidangnya.
                                    Laboratorium Rumkit TK IV 04.07.01 Tegal menerapkan konsep laboratorium terpadu sehingga memiliki laboratorium patologi klinik yang terdiri atas hematologi, kimia klinik, serologi, urinologi, dan parasitologi serta bank darah. Semua unit tersebut berada dalam area bersama yang berdampingan satu sama lain. Dengan konsep laboratorium terpadu, maka diharapkan pelayanan laboratorium dapat dilakukan secara komprehensif
                                </p>
                                <div className="grid grid-cols-3 gap-3 mb-10">
                                    <Image src={radiologi_1} alt="radiologi" className="w-full h-96 object-cover rounded-lg" />
                                    <Image src={radiologi_1} alt="radiologi" className="w-full h-96 object-cover rounded-lg" />
                                    <Image src={radiologi_1} alt="radiologi" className="w-full h-96 object-cover rounded-lg" />
                                </div>
                                <div className="grid grid-cols-2 gap-2 mb-10">
                                    <Card className="relative overflow-hidden h-full flex flex-col justify-between bg-orange-500 text-white shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                                        <div className="absolute inset-0 z-0">
                                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                                                {/* Menggunakan fill solid dengan opacity terpisah lebih andal */}
                                                <circle cx="20%" cy="80%" r="55" fill="white" opacity="0.08" />
                                                <circle cx="85%" cy="30%" r="75" fill="white" opacity="0.1" />
                                                <circle cx="90%" cy="95%" r="40" fill="white" opacity="0.07" />
                                            </svg>
                                        </div>
                                        <CardContent>
                                            <div className="relative z-10 flex flex-col h-full">
                                                <div className="mb-4">
                                                    <h3 className="text-2xl font-bold flex items-center gap-2">
                                                        <HeartPulse size={28} />
                                                        Visi
                                                    </h3>
                                                </div>
                                                <p className="text-base text-blue-100 mt-auto font-upp">
                                                    Mendukung visi Rumkit TK IV 04.07.01 Tegal agar dapat memberikan pelayanan kesehatan yang berkualitas, mudah, praktis, dan terjangkau bagi masyarakat umum di wilayah Kabupaten dan Kota Tegal.
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
                                                        Menyelenggarakan pemeriksaan laboratorium yang akurat dan terpercaya untuk menunjang pelayanan paripurna sesuai kebutuhan pasien  serta terjangkau oleh lapisan masyarakat dengan sumber daya manusia yang kompeten dan inovatif.
                                                    </li>
                                                    <li>
                                                        2.	Menyelenggarakan  pelayanan laboratorium tersertifikasi dan terkalibrasi yang dapat dipertanggungjawabkan keakuratan dan keabsahan hasil pemeriksaannya.
                                                    </li>
                                                    <li>
                                                        Meningkatkan jenis pelayanan laboratorium dengan penerapan teknologi laboratorium yang mutakhir dan modern sesuai perkembangan zaman.
                                                    </li>
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                    Pelayanan Laboratorium Rumkit TK IV 04.07.01 Tegal
                                </h1>
                                <p className="mb-10">
                                    Pemeriksaan laboratorium merupakan pemeriksaan kesehatan dengan menggunakan sampel darah, urine atau cairan tubuh lainnya yang dapat dimanfaatkan, antara lain untuk tujuan skrining, membantu diagnosis penyakit, memantau perjalanan penyakit dan menentukan prognosis. Laboratorium Rumkit TK IV 04.07.01 Tegal menyediakan berbagai jenis pemeriksaan kesehatan yang lengkap, cepat, dan tepat, antara lain :
                                </p>
                                <div className="grid grid-cols-3 gap-3">
                                    {serviceITems.map((service, index) => (
                                        <ServiceCard
                                            key={service.title}
                                            number={(index + 1).toString().padStart(2, '0')}
                                            icon={service.icon}
                                            title={service.title}
                                            description={service.description}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 'radiologi':
                return (
                    <>
                        <div className="flex gap-5 flex-col md:flex-col items-start mb-10">
                            <Card className="bg-black/85  w-full">
                                <CardContent className="flex justify-between items-center gap-2">
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
                            <div className="flex flex-col mt-5 gap-5">
                                <h1 className="text-3xl font-semibold">Pelayanan Unit Radiologi RS DKT Pagongan Tegal</h1>
                                <div className="flex gap-20">
                                    <p className="flex-1 text-lg text-justify">
                                        Unit Radiologi RUMAH SAKIT DKT PAGONGAN TEGAL merupakan unit pelayanan penunjang medis yang bertujuan memberikan layanan pemeriksaan radiologi dan akan memberikan hasil berupa foto/ imaging yang akan digunakan sebagai penunjang untuk membantu dokter dalam menegakkan diagnosa suatu penyakit pada pasien, agar perawatan yang diberikan tepat.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-2 ">
                                    <Card className="relative overflow-hidden h-full flex flex-col justify-between bg-orange-500 text-white shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                                        <div className="absolute inset-0 z-0">
                                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                                                {/* Menggunakan fill solid dengan opacity terpisah lebih andal */}
                                                <circle cx="20%" cy="80%" r="55" fill="white" opacity="0.08" />
                                                <circle cx="85%" cy="30%" r="75" fill="white" opacity="0.1" />
                                                <circle cx="90%" cy="95%" r="40" fill="white" opacity="0.07" />
                                            </svg>
                                        </div>
                                        <CardContent>
                                            <div className="relative z-10 flex flex-col h-full">
                                                <div className="mb-4">
                                                    <h3 className="text-2xl font-bold flex items-center gap-2">
                                                        <HeartPulse size={28} />
                                                        Visi
                                                    </h3>
                                                </div>
                                                <p className="text-base text-blue-100 mt-auto font-upp">
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
                                <h1 className="text-3xl font-semibold mb-5">Keunggulan</h1>
                                <p className="text-lg">
                                    Unit Radiologi RUMAH SAKIT DKT PAGONGAN TEGAL juga didukung oleh tenaga medis yang handal dan professional, mampu memberikan interpretasi diagnostik, yang memungkinkan perencanaan terapi terbaik dan optimal. Di Unit Radiologi Rumah SAKIT DKT PAGONGAN TEGAL juga telah menggunakan teknologi DR (Digital Radiography) yang akan menghasilkan gambar yang tajam dan detail.
                                </p>
                            </div>
                            <div className="bg-black w-full rounded-xl p-10">
                                <h1 className="text-white text-3xl my-2 px-5">Unit Radiologi Rumah Sakit DKT Pagongan Tegal memiliki peralatan radiologi unggulan antara lain:</h1>
                                <div className="grid grid-cols-6 grid-rows-10 h-full">
                                    <div className="col-span-6 row-span-6 rounded-xl p-3">
                                        <Card className="bg-neutral-800 border border-white/10 text-background" >
                                            <CardHeader>
                                                <div>
                                                    <Image src={radiologi_1} alt="radiologi_1" className="object-cover rounded-xl" />
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <h1 className="text-2xl font-bold mb-5 flex items-center gap-2">
                                                    <ScanHeart className="h-6 w-6" />
                                                    Stasionary X-Ray Unit
                                                </h1>
                                                <p>
                                                    Digunakan untuk melakukan pemeriksaan organ dalam dengan menggunakan sinar-X. Pemeriksaan yang dapat dilakukan antara lain:
                                                    Pemeriksaan radiologi konvensional tanpa media kontras untuk tulang, paru-paru (thorax), perut (abdomen).
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="col-span-3 row-span-4 row-start- rounded-xl col-start-4 p-3">
                                        <Card className="bg-neutral-800 border border-white/10 text-background" >
                                            <CardHeader>
                                                <div>
                                                    <Image src={radiologi_2} alt="radiologi_1" className="object-cover rounded-xl" />
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <h1 className="text-2xl font-bold mb-5 flex items-center gap-2">
                                                    <ScanHeart className="h-6 w-6" />
                                                    Mobile X-ray
                                                </h1>
                                                <p>
                                                    Digunakan untuk pemeriksaan rontgen di ICU/ HCU, sehingga pasien tidak perlu dibawa ke Unit Radiologi untuk melakukan pemeriksaan.
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="rounded-xl p-3 col-span-3 row-span-4 row-start-7">
                                        <Card className="bg-neutral-800 border border-white/10 text-background" >
                                            <CardHeader>
                                                <div>
                                                    <Image src={radiologi_3} alt="radiologi_1" className="object-cover rounded-xl" />
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <h1 className="text-2xl font-bold mb-5 flex items-center gap-2">
                                                    <ScanHeart className="h-6 w-6" />
                                                    Ultrasonografi (USG)
                                                </h1>
                                                <p>
                                                    Digunakan untuk memeriksa organ – organ dalam tubuh menggunakan gelombang suara dengan frekuensi tinggi.
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="flex flex-col justify-center items-center px-10 mb-30 pb-20">
            <Banner title="Penunjang Medik" />

            <div className="w-full gap-10 px-10 flex mt-30">
                <Card className="h-fit w-[300px] bg-[#f9f8f3] sticky top-[80px]">
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
                        <div className="bg-[#f9f8f3] rounded-xl border-2 p-8 md:py-12 mx-auto">
                            {renderDetailContent()}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}