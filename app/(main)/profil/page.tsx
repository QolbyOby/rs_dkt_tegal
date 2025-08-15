'use client'

import logoHestiWiraSakti from '@/public/img/HESTI WIRA SAKTI.png'
import Image from 'next/image';
import com_igd from '@/public/img/hero_section.png'
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const text = `Rumah Sakit Tk.IV 04.07.01 Tegal dulunya bernama TP II Kesrem 071/WK 
yang terletak di Jalan Jenderal Sudirman No.10-11 Tegal dan sekarang Gedung tersebut dijadikan Kantor Bank BDN. 
Pada tahun 1983 pindah ke Jalan Raya Pagongan Tegal (belakang Kodim 0712/Tegal) dengan sebutan Rumkit Tk.IV 04.07.01 Tegal 
sampai dengan sekarang. Rumah Sakit Tk.IV 04.07.01/Tegal berdiri di atas lahan seluas + 7.924 m2, bangunan + 1.435 m2 
merupakan rumah sakit Tk.IV TNI AD yang berada di bawah Denkesyah 04.04.01 Purwokerto.`;

export default function Page() {
    return (
        <div className="px-10">
            <div className="bg-black text-white h-96 flex justify-center items-center p-6 rounded-3xl shadow-lg w-full relative overflow-hidden">
                <div className="pointer-events-none absolute top-60 -left-60 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-orange-700 via-amber-700 to-yellow-700 opacity-60 blur-[160px] mix-blend-lighten" />
                <div className="pointer-events-none absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-orange-700 via-amber-700 to-yellow-700 opacity-50 blur-[140px] mix-blend-lighten" />
                <div className="pointer-events-none absolute bottom-0 left-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-orange-700 via-amber-700 to-yellow-700 opacity-40 blur-[140px] mix-blend-lighten" />
                <h1 className="text-5xl font-semibold">Sejarah Singkat</h1>
            </div>

            <div className="flex flex-col justify-center text-justify items-center py-52 gap-5 px-48">
                    <p className="text-2xl text-center px-10 flex flex-wrap gap-1">
                        {text.split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.03, duration: 0.4 }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </p>
            </div>
            <div className="flex gap-10 ">
                <div className='w-full h-[700px]'>
                    <div className="grid grid-cols-12 grid-rows-8 gap-4 h-full">
                        <div className="col-span-6 row-span-8 overflow-hidden bg-black rounded-3xl">
                            <div className="flex ralative flex-col  items-center justify-center h-full">
                                <Image
                                    src={com_igd}
                                    alt='com_igd'
                                    className='w-full h-full object-cover'
                                />
                                {/* <Image
                                    src={logoHestiWiraSakti}
                                    alt="Logo Hesti Wira Sakti"
                                    className="absolute w-96 h-96 object-contain z-10"
                                /> */}
                            </div>
                        </div>
                        <div className="relative overflow-hidden col-span-3 p-10 row-span-6 bg-black rounded-3xl col-start-7 row-start-3">
                            <Button variant={"outline"}>
                                VISI
                            </Button>
                            <h1 className='text-white mt-5'>
                                Menjadi Rumah Sakit Kebanggan Prajurit PNS dan keluarganya dengan menyediakan pelayanan kesehatan yang optimal
                            </h1>
                            <div className='absolute z-10 -bottom-12 -right-12 rounded-full h-36 w-36 bg-[#ff6400]'></div>
                            <div className='absolute -bottom-20 -right-20 rounded-full h-60 w-60 bg-[#FF924F]'></div>
                        </div>
                        <div className="col-span-3 p-10 row-span-6 bg-black rounded-3xl col-start-10 row-start-3">
                            <Button variant={"outline"}>
                                MISI
                            </Button>
                            <h1 className='text-white mt-5'>
                                Memberikan Pelayanan kesehatan yang bermutu dan terjangkau oleh masyarakat dalam rangka meningkatkan derajat kesehatan prajurit, PNS dan keluarganya dengan mengutamakan keselamatan pasien
                            </h1>
                        </div>
                        <div className="relative overflow-hidden col-span-6 p-10 row-span-2 bg-black rounded-3xl col-start-7 row-start-1">
                            <Button variant={"outline"}>
                                MOTO
                            </Button>
                            <h1 className='text-white mt-5'>
                                Kami Siap Melayani Dengan Ikhlas
                            </h1>
                            <div className="w-40 h-40 right-0 -bottom-32 z-10 bg-[#ff6400] rounded-full scale-x-200 absolute"></div>
                            <div className="w-40 h-40 right-7 -bottom-28 bg-[#ff924f] rounded-full scale-x-200 absolute"></div>
                        </div>
                        <div className='mt-10'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}