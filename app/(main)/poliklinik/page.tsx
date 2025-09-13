"use client";

import React, { useState, useId, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click"; // Pastikan path ini benar

// Import gambar
import paru from "@/public/img/paru.png";
import bedah from "@/public/img/bedah.png";
import gigi_mulut from "@/public/img/gig_mulut.png";
import obsgyn from "@/public/img/obsgyn.png";
import mata from "@/public/img/mata.png";
import penyakit_dalam from "@/public/img/penyakit_dalam.png";
import anak from "@/public/img/anak.png";



type Card = {
    title: string;
    bgColor: string;
    icon: StaticImageData;
    doctors: { name: string; schedule: string }[];
}

export default function ConsultationCards() {
    // 1. Tambahkan state untuk melacak kartu yang aktif
    const [active, setActive] = useState<Card | null>(null);
    const id = useId();
    const ref = useRef(null);

    // Efek untuk menutup modal dengan tombol 'Escape' dan handle overflow body
    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(null);
            }
        }

        if (active) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    // Hook untuk menutup modal saat klik di luar area modal
    useOutsideClick(ref, () => setActive(null));

    // 2. Modifikasi data untuk menyertakan detail dokter

    const cards = [
        {
            title: "Poliklinik Bedah",
            bgColor: "bg-red-200",
            icon: bedah,
            doctors: [
                { name: "Dr. Budi, Sp.B", schedule: "Rabu, Kamis, Jumat (08:00 - Selesai)" },
                { name: "Dr. Wahyudin, Sp.B", schedule: "Senin, Selasa (09:00 - Selesai)" },
            ],
        },
        {
            title: "Poliklinik Penyakit Paru",
            bgColor: "bg-orange-200",
            icon: paru,
            doctors: [
                { name: "Dr. Reni Ari Martani, Sp.P", schedule: "Selasa (14:00 - Selesai) Kamis (14.00 - Selesai)" },
            ],
        },
        {
            title: "Poliklinik Gigi dan Mulut",
            bgColor: "bg-sky-200",
            icon: gigi_mulut,
            doctors: [
                { name: "Drg. Farid Sp. Kg", schedule: "Selasa (08:00 - Selesai) Kamis (08:00 - Selesai)" },
            ],
        },
        {
            title: "Poliklinik Anak",
            bgColor: "bg-green-200",
            icon: anak,
            doctors: [
                { name: "Dr. Emilya Herawan, Sp.A", schedule: "Selasa  (10:00 - Selesai) Jumat (10.00 - Selesai)" },
            ],
        },
        {
            title: "Poliklinik Penyakit Mata",
            bgColor: "bg-red-200",
            icon: mata,
            doctors: [
                { name: "Dr. Ahmad Yogi, Sp.A", schedule: "Jumat (09:00 - selesai) Sabtu (09.00 - Selesai)" },
            ],
        },
        {
            title: "Poliklinik Obsgyn",
            bgColor: "bg-orange-200",
            icon: obsgyn,
            doctors: [
                { name: "Dr. Hendriyan, Sp.OG", schedule: "Selasa (11:00 - Selesai) Rabu (11.00 - Selesai) Kamis dan Jumat (11.00 - Selesai)" },
            ],
        },
        {
            title: "Poliklinik Penyakit Dalam",
            bgColor: "bg-sky-200",
            icon: penyakit_dalam,
            doctors: [
                { name: "Dr. Setiadji Sp, PD", schedule: "Selasa (14:00 - Selesai) Rabu (08.00 - Selesai) Kamis (08.00 - Selesao) Sabtu (08.00 - selesai)" },
            ],
        },
        {
            title: "Poliklinik Jantung",
            bgColor: "bg-green-200",
            icon: anak,
            doctors: [
                { name: "Dr. Galih Rakasiwi, Sp.JP, FIHA", schedule: "Senin (08:00 - Selesai) Kamis (08.00 - Selesai)" },
            ],
        },
        {
            title: "Poliklinik FisioTerapi",
            bgColor: "bg-green-200",
            icon: anak,
            doctors: [
                { name: "Riza Mustafa, Amd. FIS", schedule: "Senin (08:00 - Selesai) Jumat (08.00 - Selesai)" },
            ],
        },
        // Tambahkan data dokter untuk kartu lainnya...
    ];

    return (
        <div className="md:px-10">

            {/* 3. Tambahkan AnimatePresence untuk modal dan overlay */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 h-full w-full z-10"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && (
                    <div className="fixed inset-0 grid place-items-center z-[100] p-4">
                        {/* <motion.button
                            className="flex absolute top-4 right-4 lg:top-8 lg:right-8 items-center justify-center bg-white rounded-full h-8 w-8 z-50"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button> */}

                        {/* KARTU DETAIL (MODAL) */}
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className={`w-full max-w-lg h-auto max-h-[90%] flex flex-col ${active.bgColor} rounded-2xl overflow-hidden`}
                        >
                            <div className="relative p-8">
                                <motion.div
                                    layoutId={`icon-${active.title}-${id}`}
                                    // 1. Ubah posisi dari bawah ke atas
                                    className="absolute top-8 right-8"
                                >
                                    <Image
                                        src={active.icon}
                                        alt={active.title}
                                        // 2. Ubah ukuran menjadi lebih kecil
                                        width={60}
                                        height={60}
                                        className="opacity-50"
                                    />
                                </motion.div>
                                <motion.h3
                                    layoutId={`title-${active.title}-${id}`}
                                    className="font-bold text-3xl text-neutral-800 mb-6"
                                >
                                    {active.title}
                                </motion.h3>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-neutral-700 overflow-y-auto"
                                >
                                    <h4 className="font-semibold mb-3">Jadwal Dokter:</h4>
                                    <ul className="space-y-3">
                                        {active.doctors.map((doctor, index) => (
                                            <li key={index} className="p-3 bg-white/50 rounded-lg">
                                                <p className="font-semibold">{doctor.name}</p>
                                                <p className="text-sm">{doctor.schedule}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="bg-foreground text-white h-96 flex justify-center items-center p-6 rounded-3xl shadow-lg w-full relative overflow-hidden ">
                {/* <div className="pointer-events-none absolute top-60 -left-60 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-orange-700 via-amber-700 to-yellow-700 opacity-60 blur-[160px] mix-blend-lighten" /> */}

                <div className="absolute top-30 left-55 w-56 h-60 bg-gradient-to-b from-orange-500/30 to-transparent rounded-3xl transform backdrop-blur-lg"></div>
                <div className="absolute top-20 left-35 w-56 h-60 bg-gradient-to-b from-orange-500/20 via-orange-500/10 to-transparent rounded-3xl transform backdrop-blur-md"></div>
                <div className="absolute top-10 left-15 w-56 h-60 bg-gradient-to-b from-orange-500/15 via-orange-500/10 to-transparent rounded-3xl transform backdrop-blur-sm"></div>

                <div className="absolute top-30 right-55 w-56 h-60 bg-gradient-to-b from-orange-500/30 to-transparent rounded-3xl transform backdrop-blur-lg"></div>
                <div className="absolute top-20 right-35 w-56 h-60 bg-gradient-to-b from-orange-500/20 via-orange-500/10 to-transparent rounded-3xl transform backdrop-blur-md"></div>
                <div className="absolute top-10 right-15 w-56 h-60 bg-gradient-to-b from-orange-500/15 via-orange-500/10 to-transparent rounded-3xl transform backdrop-blur-sm"></div>

                {/* <div className="absolute top-25 right-45 w-56 h-60 bg-gradient-to-b from-white/10 to-transparent rounded-3xl transform backdrop-blur-lg"></div>
                <div className="absolute -z-0 top-15 right-25 w-56 h-60 bg-gradient-to-b from-white/10 via-white/5 to-transparent rounded-3xl transform backdrop-blur-md"></div>
                <div className="absolute top-5 -right-5 w-56 h-60 bg-gradient-to-b from-white/10 via-white/5 to-transparent rounded-3xl transform backdrop-blur-sm"></div> */}
                
                <h1 className="text-4xl md:text-5xl font-light text-center z-10">
                    Poliklinik
                </h1>
            </div>
            {/* GRID KARTU POLIKLINIK */}

            <div className="px-4 md:px-0 mb-20 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <motion.div
                            layoutId={`card-${card.title}-${id}`}
                            key={card.title}
                            onClick={() => setActive(card)}
                            className={`relative rounded-xl p-5 text-left h-52 flex flex-col justify-between overflow-hidden cursor-pointer ${card.bgColor} hover:shadow-xl transition-shadow`}
                        >
                            <motion.div
                                layoutId={`icon-${card.title}-${id}`}
                                className="absolute bottom-5 right-5"
                            >
                                <Image
                                    src={card.icon}
                                    alt="icon"
                                    width={80}
                                    height={80}
                                    className="opacity-60"
                                />
                            </motion.div>
                            <div>
                                <motion.h3
                                    layoutId={`title-${card.title}-${id}`}
                                    className="font-semibold text-lg text-neutral-800"
                                >
                                    {card.title}
                                </motion.h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}



