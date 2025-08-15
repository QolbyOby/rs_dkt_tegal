import { ArrowRight } from "lucide-react";
import Image from "next/image";
import paru from "@/public/img/paru.png";
import bedah from "@/public/img/bedah.png";
import gigi_mulut from "@/public/img/gig_mulut.png";
import obsgyn from "@/public/img/obsgyn.png";
import mata from "@/public/img/mata.png";
import penyakit_dalam from "@/public/img/penyakit_dalam.png";
import anak from "@/public/img/anak.png";


export default function ConsultationCards() {
    const cards = [
        {
            title: "Poliklinik Bedah",

            subtitle: "Connect within 60 secs",
            bgColor: "bg-red-300",
            icon: bedah, // ganti sesuai path ikon
        },
        {
            title: "Polklinik Penyakit Paru",
            subtitle: "Connect within 60 secs",
            bgColor: "bg-orange-300",
            icon: paru,
        },
        // {
        //     title: "Medical Center Patient",
        //     subtitle:
        //         "From preventive care to managing complex conditions, our experienced team of doctors.",
        //     bgColor: "bg-gradient-to-tr from-red-200 via-white to-green-200 backdrop-blur-md",
        //     icon: "",
        //     testimonial: {
        //         name: "Michael Jhonson",
        //         role: "Visit Viste Doctors",
        //         avatar: "/images/michael.jpg", // ganti path foto
        //     },
        // },
        {
            title: "Poliklinik Gigi dan Mulut",
            subtitle: "Connect within 60 secs",
            bgColor: "bg-blue-300",
            icon: gigi_mulut,
        },
        {
            title: "Poliklinik Obsgyn",
            subtitle: "Connect within 60 secs",
            bgColor: "bg-blue-300",
            icon: obsgyn,
        },
        {
            title: "Poliklinik Penyakit Mata",

            subtitle: "Connect within 60 secs",
            bgColor: "bg-blue-300",
            icon: mata,
        },
        {
            title: "Poliklinik Anak",

            subtitle: "Connect within 60 secs",
            bgColor: "bg-blue-300",
            icon: anak,
        },
        {
            title: "Poliklinik Penyakit Dalam",

            subtitle: "Connect within 60 secs",
            bgColor: "bg-blue-300",
            icon: penyakit_dalam,
        },
    ];

    return (
        <div className="px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`relative rounded-xl p-5 text-left h-60 flex flex-col justify-between overflow-hidden ${card.bgColor}`}
                    >
                        {/* Ikon samar di background */}
                        {card.icon && (
                            <Image
                                src={card.icon}
                                alt="icon"
                                width={100}
                                height={100}
                                className="absolute bottom-5 right-5 opacity-75"
                            />
                        )}

                        {/* Konten */}
                        <div>
                            <h3 className="font-semibold text-lg">{card.title}</h3>
                            <p className="text-sm opacity-80">{card.subtitle}</p>
                        </div>

                        {/* Testimonial untuk card ke-3 */}
                        {/* {card.testimonial && (
                            <div>
                                <div className="flex items-center gap-3 mt-3">
                                    <Image
                                        src={card.testimonial.avatar}
                                        alt={card.testimonial.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <p className="font-semibold text-sm">
                                            {card.testimonial.name}
                                        </p>
                                        <p className="text-xs opacity-70">{card.testimonial.role}</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-5 right-5 text-3xl font-bold opacity-60">
                                    ”
                                </div>
                            </div>
                        )} */}

                        {/* Tombol panah */}
                        {/* {!card.testimonial && (
                            <button className="bg-green-800 text-white p-2 rounded-full w-fit hover:bg-green-700 transition-all">
                                <ArrowRight size={16} />
                            </button>
                        )} */}
                    </div>
                ))}
            </div>
        </div>
    );
}
