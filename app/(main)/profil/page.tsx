'use client'

import hero_section4 from '@/public/img/hero_section4.png'
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import kepala_RS from "@/public/img/ketua_RS.png"
import { Card, CardContent } from '@/components/ui/card';
import HistoryTimeline from '@/components/HIstory';
import { Quote } from 'lucide-react';
import bg_moto from "@/public/img/bg_moto.jpg"



export default function Page() {
    return (
        <div className="px-4 md:px-10">
            {/* <div className="bg-foreground text-white h-96 flex justify-center items-center p-6 rounded-3xl shadow-lg w-full relative overflow-hidden">
                <div className="pointer-events-none absolute top-60 -left-60 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-orange-700 via-amber-700 to-yellow-700 opacity-60 blur-[160px] mix-blend-lighten" />
                <div className="pointer-events-none absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-orange-700 via-amber-700 to-yellow-700 opacity-50 blur-[140px] mix-blend-lighten" />
                <div className="pointer-events-none absolute bottom-0 left-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-orange-700 via-amber-700 to-yellow-700 opacity-40 blur-[140px] mix-blend-lighten" />
                <h1 className="text-4xl md:text-5xl font-light text-center">Profil Rumah Sakit DKT Tegal</h1>
            </div> */}

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
                    Profil Rumah Sakit <br />DKT Tegal
                </h1>
            </div>



            <div className="my-10 md:my-20 px-0 md:px-10">
                <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-x-20 items-start">
                    <div className='w-full order-1 lg:col-span-2'>
                        <Card className="bg-black/85">
                            <CardContent className="flex flex-col gap-3 sm:flex-row justify-between items-start sm:items-center px-4 lg:px-6">
                                <h1 className="text-2xl lg:text-4xl text-white font-light tracking-tight text-balance">Sambutan Kepala Rumah Sakit</h1>
                                <div className="flex gap-3 w-full lg:w-auto">
                                    <span className="h-5 lg:h-10 w-5 lg:w-10 bg-white rounded-full"></span>
                                    <span className="h-5 lg:h-10 w-5 lg:w-10 bg-white rounded-full"></span>
                                    <span className="h-5 lg:h-10 w-full lg:w-20 bg-white rounded-full"></span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex justify-center items-start w-full order-2 lg:col-start-3 lg:row-start-1 lg:row-span-2 mt-10 lg:mt-0">
                        <div className="px-12  py-8 relative rounded-2xl shadow-xl/30 bg-white/80 overflow-hidden flex flex-col items-center">
                            <Image
                                src={kepala_RS}
                                alt="hero2img"
                                className="w-[300px] drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
                            />
                            <div className="absolute bottom-0 left-0 w-full flex justify-center">
                                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-transparent pointer-events-none" />
                                <div className="relative flex items-center gap-2 w-full justify-center backdrop-blur-md bg-white/40 py-3 px-5">
                                    <span className="font-semibold text-lg text-black text-center">Kapten Ckm dr.Budi Yuliono,Sp.B,MMRS.,FINACS</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full order-3 lg:col-span-2 mt-5 lg:mt-5'>
                        <h3 className="text-xl text-center italic my-5">Assalamualaikum Wr. Wb</h3>
                        <p className='text-center'>Salam Sejatera
                            Shalom
                            Om Swastyastu
                            Namo Buddhaya
                            Salam Kebajikan
                        </p>
                        <p className="mb-1 indent-8 text-justify">
                            Perkembangan meningkatnya kebutuhan pelayanan dunia kesehatan yang semakin berkualitas, cepat, tepat, dan akurat. Mendorong institusi kesehatan untuk berbenah diri terutama meningkatkan kualitas pelayanan, meningkatkan keberadaan alat-alat medis yang sesuai dengan kebutuhan masyarakat dan memberikan fasilitas pelayanan yang baik, sehingga kenyamanan terhadap pasien semakin terjaga.
                        </p>
                        <p className="mb-1 indent-8 text-justify">
                            Rumah Sakit Tingkat IV 04.07.01 Tegal atau lebih dikenal dengan DKT Pagongan telah lama menemani masyarakat Kabupaten dan Kota Tegal dalam memberikan pelayanan di bidang kesehatan sesuai dengan visi dan misi Rumah Sakit yaitu Menjadi Rumah Sakit Kebanggan Prajurit, PNS, dan Keluarganya dengan menyediakan pelayanan kesehatan yang optimal, serta memberikan pelayanan kesehatan yang bermutu dan terjangkau oleh masyarakat umum, PNS, dan Prajurit serta keluarganya dengan mengutamakan keselamatan pasien
                        </p>
                        <p className="mb-1 indent-8 text-justify">
                            Kami berkomitemen untuk terus meningkatkan kualitas pelayanan sehingga  kepuasan pasien semakin meningkat yang bermuara pada meningkatnya kepercayaan masyarakat Tegal dan sekitarnya terhadap Rumah Sakit Tk IV 04.07.01 Tegal.
                        </p>
                        <p className="mb-1 indent-8 text-justify">
                            Kami berterima kasih atas kepercayaan Anda menggunakan jasa pelayanan Rumah Sakit Tk IV 04.07.01 Tegal. Kritik dan saran anda sangat dibutuhkan untuk meningkatkan pelayanan kami. Semoga profil singkat ini dapat memberikan informasi yang berguna bagi masyarakat. Terima kasih.
                        </p>
                        <h3 className="text-xl text-center italic my-5">Wassalamu’alaikum. Wr. Wb.</h3>
                    </div>
                </div>
            </div>

            <div className="bg-black/90 rounded-3xl mb-20 px-6 md:px-12 lg:px-20 py-16 md:py-20 gap-5">
                <HistoryTimeline />
            </div>

            <h1 className='text-4xl ml-2'>Tujuan Dan Filosofi</h1>
            <h3 className='mb-5 ml-2'>Rumah Sakit Tingkat 04.07.01 Tegal</h3>

            <div className='flex gap-10'>
                <div className='flex-1'>
                    <h1 className='text-xl mb-5 ml-2'>Tujuan</h1>
                    <div className='grid grid-cols-3 gap-5 h-56 '>
                        <div className='relative bg-black rounded-3xl p-10'>
                            <span className='absolute bg-orange-500 text-white top-5 left-5 rounded-full w-6 h-6 flex items-center justify-center'>
                                1
                            </span>
                            <h1 className='text-background mt-2'>Peningkatan Kulitas Pelayanan Kesehatan</h1>
                        </div>
                        <div className='relative bg-black rounded-3xl p-10'>
                            <span className='absolute top-5 left-5 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center'>
                                2
                            </span>
                            <h1 className='text-background mt-2'>Peningkatan Sumber Daya Manusia</h1>
                        </div>
                        <div className='relative bg-black rounded-3xl p-10'>
                            <span className='absolute top-5 left-5 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center'>
                                3
                            </span>
                            <h1 className='text-background mt-2'>Peningkatan Kesejahteraan Personaelnya</h1>
                        </div>
                    </div>
                </div>
                <div className='flex-1'>
                    <h1 className='text-xl mb-5'>Filosofi</h1>
                    <p className='text-5xl'>
                        <Quote className='w-6 h-6 inline-block mr-2' />
                        Dengan Sikap Profesionalisme Memberikan Pelayanan Sehingga Tercipta Keputusan Semua Pihak
                        <Quote className='w-6 h-6 inline-block ml-2' />
                    </p>
                </div>

            </div>

            <div>
                <h1 className='text-4xl mt-20 ml-2 '>Misi, Visi, Moto</h1>
                <h3 className='mb-5 ml-2'>Rumah Sakit Tingkat 04.07.01 Tegal</h3>
                <div className='grid grid-cols-3 gap-5 mb-20 flex-2'>
                    <div className='flex-1 h-[500px] relative overflow-hidden'>
                        <Image src={bg_moto} alt='bg_moto' className='w-full h-full object-cover rounded-3xl' />
                        <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-10 rounded-b-3xl'>
                            <Button className='text-background bg-orange-500'>MOTO</Button>
                            <h1 className='text-white/80 mt-5 text-lg'>
                                Kami Siap Melayani Dengan Ikhlas
                            </h1>
                        </div>
                    </div>
                    <div className='bg-black  rounded-3xl p-10 relative'>
                        <div className="absolute inset-0 z-0">
                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                                <circle cx="20%" cy="80%" r="55" fill="white" opacity="0.2" />
                                <circle cx="50%" cy="85%" r="30" fill="white" opacity="0.1" />
                                <circle cx="85%" cy="60%" r="75" fill="white" opacity="0.1" />
                                <circle cx="90%" cy="10%" r="40" fill="white" opacity="0.07" />
                            </svg>
                        </div>
                        <h1 className='absolute top-10 z-0 text-orange-500 text-8xl font-bold'>VISI</h1>
                        <div className='relative bg-black mt-15'>
                            <h1 className='text-white/80 mt-5 text-base'>
                                Menjadi Rumah Sakit Kebanggan Prajurit PNS dan keluarganya dengan menyediakan pelayanan kesehatan yang optimal
                            </h1>
                        </div>
                    </div>
                    <div className='bg-black border border-black  rounded-3xl p-10 relative'>
                        <h1 className='absolute top-10 z-0 text-orange-500 text-8xl font-bold'>MISI</h1>
                        <div className='relative bg-black mt-15'>
                            <h1 className='mt-5 text-base text-white/80'>
                                Memberikan Pelayanan kesehatan yang bermutu dan terjangkau oleh masyarakat dalam rangka meningkatkan derajat kesehatan prajurit, PNS dan keluarganya dengan mengutamakan keselamatan pasien
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}