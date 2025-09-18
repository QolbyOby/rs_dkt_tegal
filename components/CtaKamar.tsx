"use client";
import Link from "next/link";
import banner_kamar from "@/public/img/banner_kamar.png"
import Image from "next/image";

export function CtaKamar() {
    return (
        <div className="relative mx-auto flex h-[470px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl">
            <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-light text-balance text-white md:text-4xl lg:text-7xl">
                <span className="relative z-20 inline-block rounded-xl px-4 py-1 text-white">
                    Kamar Rawat Inap
                </span>
            </h2>
            <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
                Kami menyediakan berbagai pilihan kamar rawat inap yang nyaman dan berkualitas. Mulai dari kelas III hingga VIP, setiap kamar dilengkapi dengan fasilitas standar rumah sakit dan perawatan 24 jam oleh tim medis profesional kami.
            </p>

            <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
                <button className="rounded-md bg-orange-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-custom focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
                    <Link href={"/kamar"}>
                        Lihat Informasi Kamar
                    </Link>
                </button>
            </div>

            {/* overlay */}
            <div className="absolute inset-0 z-10 h-full w-full bg-black/55 dark:bg-black/40" />
            <Image src={banner_kamar} alt="Background Image" className="object-fill absolute" />
        </div>
    );
}
