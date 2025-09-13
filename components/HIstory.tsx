import React from 'react';
import hero_section4 from '@/public/img/hero_section4.png'

// Opsional: Definisikan tipe untuk setiap item milestone agar kode lebih aman
interface MilestoneItem {
    title: string;
    description: string;
}

// Data sejarah yang sudah dipecah menjadi beberapa bagian
const historyMilestones: MilestoneItem[] = [
    {
        title: "Awal Mula & Serah Terima",
        description: "Perjalanan dimulai pada tahun 1950 dengan serah terima pemerintahan dari Hindia Belanda kepada Republik Indonesia, yang kemudian diserahkan kepada Tentara Nasional Indonesia."
    },
    {
        title: "Perubahan Nama & Lokasi Awal",
        description: "Awalnya bernama TP II Kesrem 071/WK di Jalan Jenderal Sudirman. Nama rumah sakit berganti dari Palang Merah KNIL menjadi Jawatan Kesehatan Tentara (DKT)."
    },
    {
        title: "Perpindahan Lokasi",
        description: "Pada tahun 1983, rumah sakit dipindahkan ke lokasi saat ini di Jalan Raya Pagongan, Tegal (belakang Kodim 0712/Tegal) dan dikenal sebagai Rumkit Tk.IV 04.07.01 Tegal."
    },
    {
        title: "Perkembangan & Fungsi",
        description: "Selama perjalanannya, rumah sakit terus mengalami perkembangan fisik, fasilitas, dan status. Kini, Rumkit TK IV 04.07.01 berfungsi sebagai rumah sakit di lingkungan Korem 071/WK dan sebagai Rumah Sakit Integrasi bagi masyarakat TNI di wilayah Tegal."
    },
    {
        title: "Hingga Saat Ini",
        description: "Selama lebih dari setengah abad, rumah sakit telah melalui berbagai pergantian nama dan kepemimpinan, disertai dengan perbaikan berkelanjutan pada bangunan utama, sarana penunjang, dan bangsal perawatan untuk melayani dengan lebih baik."
    }
];

const HistoryTimeline: React.FC = () => {
    return (
        <div className="flex mx-auto p-8 md:p-12 gap-10">
            {/* --- Bagian Judul --- */}
            <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-extralight text-background mb-3">
                    Sejarah Rumah Sakit Tk.IV04.07.01 Tegal
                </h1>
                <p className="mb-7 text-background font-extralight text-base md:text-lg">
                    Dari awal berdirinya hingga menjadi solusi kesehatan terpercaya, inilah bagaimana perjalanan sejarah rumah sakit kami.
                </p>

                <video
                    width="100%"
                    height="auto"
                    controls
                    src="/video/Profil RS New.mp4"
                    poster={hero_section4.src}
                    className='flex-1 rounded-2xl w-full sticky top-25'
                    style={{ objectFit: 'cover' }}
                >
                    Browser Anda tidak mendukung tag video.
                </video>
            </div>

            {/* --- Timeline Container --- */}
            <div className="relative flex-1">
                {/* Garis Vertikal */}
                <div className="absolute left-3 top-2 h-full w-0.5 bg-orange-200" aria-hidden="true"></div>

                {/* List Item Milestone */}
                <div className="space-y-12">
                    {historyMilestones.map((milestone, index) => (
                        <div key={index} className="relative pl-10">
                            {/* Lingkaran (Dot) pada Garis */}
                            <div className="absolute left-0 top-1 flex items-center justify-center w-6 h-6">
                                <div className="w-4 h-4 bg-orange-500 rounded-full ring-4 ring-orange-100"></div>
                            </div>

                            {/* Konten Milestone */}
                            <div className="ml-4">
                                <h3 className="text-lg md:text-xl font-light text-background">{milestone.title}</h3>
                                <p className="mt-2 text-neutral-200 font-extralight">
                                    {milestone.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HistoryTimeline;