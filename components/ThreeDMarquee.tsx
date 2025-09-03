"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import k_1 from "@/public/img/k-1.jpeg"
import k_2 from "@/public/img/k-2.jpeg"
import k_3 from "@/public/img/k-3.jpeg"
import k_4 from "@/public/img/k-4.jpeg"
import k_5 from "@/public/img/k-5.jpeg"
import k_6 from "@/public/img/k-6.jpeg"
import k_7 from "@/public/img/k-7.jpeg"
import k_8 from "@/public/img/k-8.jpeg"
import k_9 from "@/public/img/k-9.jpeg"
import Link from "next/link";

export function ThreeDMarqueeDemoSecond() {
    const images = [
        k_1,
        k_2,
        k_3,
        k_4,
        k_5,
        k_6,
        k_7,
        k_8,
        k_9,
        k_1,
        k_2,
        k_3,
        k_4,
        k_5,
        k_6,
        k_7,
        k_8,
        k_9,
        k_1,
        k_2,
        k_3,
        k_4,
        k_5,
        k_6,
        k_7,
        k_8,
        k_9,
        k_1,
        k_2,
        k_3,
        k_4,
        k_5,
        k_6,
        k_7,
        k_8,
        k_9,
    ];
    return (
        <div className="relative mx-auto my-10 flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl">
            <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-light text-balance text-white md:text-4xl lg:text-7xl">
                <span className="relative z-20 inline-block rounded-xl px-4 py-1 text-white">
                    Kamar Rawat Inap
                </span>
            </h2>
            <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
                Kami menyediakan berbagai pilihan kamar rawat inap yang nyaman dan berkualitas. Mulai dari kelas III hingga VIP, setiap kamar dilengkapi dengan fasilitas standar rumah sakit dan perawatan 24 jam oleh tim medis profesional kami.
            </p>

            <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
                <button className="rounded-md bg-orange-400 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-custom focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
                    <Link href={"/kamar"}>
                        Lihat Informasi Kamar
                    </Link>
                </button>
            </div>

            {/* overlay */}
            <div className="absolute inset-0 z-10 h-full w-full bg-black/55 dark:bg-black/40" />
            <ThreeDMarquee
                className="pointer-events-none absolute inset-0 h-full w-full"
                images={images}
            />
        </div>
    );
}
