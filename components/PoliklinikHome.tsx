'use client'

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

// Impor semua gambar yang dibutuhkan
import praktek_gigi from "@/public/img/praktek_gigi.jpg";
import praktek_bedah from "@/public/img/praktek_bedah.jpg";
import praktek_bedah2 from "@/public/img/praktek_bedah2.jpg";
import praktek_poli_anak from "@/public/img/praktek_poli_anak.jpg";
import praktek_poli_anak_2 from "@/public/img/praktek_poli_anaka3.jpg";
import praktek_poli_paru from "@/public/img/praktek_poli_paru.jpeg";

// 1. Definisikan tipe untuk objek di dalam array mediaItems
interface MediaItem {
    type: 'image' | 'video';
    src: string | StaticImageData; // Tipe untuk gambar impor atau path string video
    alt: string;
    className: string;
}

const PoliklinikSection: React.FC = () => {

    // 2. Terapkan tipe 'MediaItem[]' pada array data
    const mediaItems: MediaItem[] = [
        { type: 'image', src: praktek_gigi, alt: 'praktek_gigi', className: 'col-span-2 row-span-4' },
        { type: 'image', src: praktek_bedah2, alt: 'praktek_bedah2', className: 'col-span-2 row-span-4 col-start-9' },
        { type: 'image', src: praktek_bedah, alt: 'praktek_bedah', className: 'col-span-2 row-span-3 col-start-3 row-start-3' },
        { type: 'image', src: praktek_poli_anak, alt: 'praktek_poli_anak', className: 'col-span-2 row-span-3 col-start-7 row-start-3' },
        { type: 'image', src: praktek_poli_anak_2, alt: 'praktek_poli_anak_2_v1', className: 'col-span-2 row-span-3 col-start-3 row-start-6' },
        { type: 'image', src: praktek_poli_anak_2, alt: 'praktek_poli_anak_2_v2', className: 'col-span-2 row-span-4 col-start-1 row-start-5' },
        { type: 'image', src: praktek_poli_anak_2, alt: 'praktek_poli_anak_2_v3', className: 'col-span-2 row-span-3 col-start-7 row-start-6' },
        { type: 'image', src: praktek_poli_paru, alt: 'praktek_poli_paru', className: 'col-span-2 row-span-4 col-start-9 row-start-5' },
        { type: 'video', src: '/video/video_poli_gigi.mp4', alt: 'video poli gigi', className: 'col-span-2 row-span-4 col-start-5 row-start-5' },
    ];

    return (
        <div className="relative w-full h-[500px] mt-20">
            <div className="absolute flex flex-col justify-center items-center gap-5 top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <h1 className="text-5xl font">POLIKLINIK</h1>
                <button className="rounded-md bg-orange-500 px-4 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-medium text-white transition-colors hover:bg-orange-custom focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
                    <Link href={"/poliklinik"}>
                        Lihat Selengkapnya
                    </Link>
                </button>
            </div>

            <div
                className="grid grid-cols-10 grid-rows-8 gap-4 h-full"
            >
                {mediaItems.map((item, index) => (
                    <motion.div
                        key={index}
                        className={`${item.className} rounded-2xl overflow-hidden origin-bottom relative`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, transition: { duration: 1, delay: index * 0.1, ease: [0.43, 0.13, 0.23, 0.96] } }}
                    >
                        {/* <motion.div
                            className="absolute z-10 bottom-0  bg-[#f7f4eb] ] rounded-b-lg w-full h-full"
                            initial={{ height: '100%' }}
                            animate={{
                                height: 0,
                                transition: {
                                    duration: 1,
                                    ease: [0.43, 0.13, 0.23, 0.96],
                                    delay: index * 0.1 // Tambahkan baris ini
                                }
                            }}
                        >
                        </motion.div> */}
                        {item.type === 'image' ? (
                            <Image src={item.src} className="object-cover w-full h-full" alt={item.alt} />
                        ) : (
                            <video
                                width="100%"
                                height="auto"
                                controls={false}
                                autoPlay
                                muted
                                loop
                                playsInline
                                src={item.src as string} // Assert as string for video src
                                className='flex-1 rounded-2xl w-full h-full'
                                style={{ objectFit: 'cover' }}
                                disablePictureInPicture
                                disableRemotePlayback
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PoliklinikSection;
