'use client'

import hero_section4 from '@/public/img/hero_section4.png'
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import kepala_RS from "@/public/img/ketua_RS.png"
import { Card, CardContent } from '@/components/ui/card';

const textTitle = `
Sejarah Rumah Sakit Tk.IV04.07.01 Tegal
`

const textDescription = `
Rumah Sakit ini memulai perjalanan sejarahnya pada tahun 1950 dimana terjadi serah terima pemerintahan dari Hindia Belanda kepada pemerintah Republik Indonesia yang pada saat ini diserahkan kepada Tentara Nasional Indonesia. Rumkit Tk.IV 04.07.01 Tegal awalnya bernama TP II Kesrem 071/WK yang terletak di Jalan Jenderal Sudirman No.10-11 Tegal pada saat ini gedung tersebut dijadikan kantor Bank BDN, yang kemudian berubah nama menjadi Bank Mandiri, sehingga terjadi pergantian nama Rumah Sakit dari Palang Merah KNIL menjadi Jawatan Kesehatan Tentara yang disingkat DKT.  Pada tahun 1983 RS dipindah ke Jalan Raya Pagongan Tegal dengan lokasi di jalan Raya Pagongan  Tegal (belakang Kodim 0712Tegal) dengan sebutan Rumkit Tk.IV 04.07.01 Tegal sampai dengan sekarang. Rumkit TK IV 04.07.01 merupakan Rumah Sakit di lingkungan Korem 071/WK, dan juga berfungsi sebagai Rumah Sakit Integrasi bagi masyarakat TNI diwilayah Tegal dan sekitarnya. Dalam perjalanannya, Rumah Sakit Tk IV 04.07.01 Tegal mengalami perkembangan dan perubahan baik secara fisik bangunan, fasilitas kesehatan maupun nama dan status Rumah Sakit. Selama kurun waktu Lima Puluh Sembilan tahun perjalanan sejarah dari tahun 1950 sampai dengan sekarang Rumkit TK IV 04.07.01 mengalami pergantian  nama Rumah Sakit, pergantian Pejabat-pejabat Kepala Rumah sakit dan disertai dengan perbaikan/ penambahan bangunan baik bangunan utama/ perkantoran, sarana penunjang maupun bangsal perawatan. 
`;

export default function Page() {
    return (
        <div className="px-10">
            <div className="bg-foreground text-white h-96 flex justify-center items-center p-6 rounded-3xl shadow-lg w-full relative overflow-hidden">
                <div className="pointer-events-none absolute top-60 -left-60 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-orange-700 via-amber-700 to-yellow-700 opacity-60 blur-[160px] mix-blend-lighten" />
                <div className="pointer-events-none absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-orange-700 via-amber-700 to-yellow-700 opacity-50 blur-[140px] mix-blend-lighten" />
                <div className="pointer-events-none absolute bottom-0 left-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-orange-700 via-amber-700 to-yellow-700 opacity-40 blur-[140px] mix-blend-lighten" />
                <h1 className="text-5xl font-light">Profil Rumah Sakit DKT Tegal</h1>
            </div>

            <div className="my-20 px-10">
                <div className="flex justify-center gap-20 items-center">
                    <div className="flex-2">
                        <Card className="bg-[#19392C]">
                            <CardContent className="flex justify-between">
                                <h1 className="text-4xl text-white font-extrabold tracking-tight text-balance">Sambutan Kepala Rumah Sakit</h1>
                                <div className="flex gap-3">
                                    <span className="h-10 w-10 bg-white rounded-full"></span>
                                    <span className="h-10 w-10 bg-white rounded-full"></span>
                                    <span className="h-10 w-20 bg-white rounded-full"></span>
                                </div>
                            </CardContent>
                        </Card>
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
                    <div className="flex-1 flex justify-center items-center">
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
                </div>
            </div>


            <div className="flex flex-col bg-foreground rounded-3xl mb-20 justify-center text-justify items-start px-20 pt-32 pb-20 gap-5">
                <div className='flex justify-between w-full items-center'>
                    <p className='text-5xl mb-5 tracking-wide font-extralight flex-1 text-background text-center flex flex-wrap gap-1 z-10'>
                        {textTitle.split(" ").map((word, i) => (
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
                    <Button variant={'secondary'}>Sejarah Singkat </Button>
                </div>
                <p className="text-2xl font-extralight flex-1 text-background  flex flex-wrap gap-1 mb-10">
                    {textDescription.split(" ").map((word, i) => (
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
                <video
                    width="100%"
                    height="auto"
                    controls
                    src="/video/Profil RS New.mp4"
                    poster={hero_section4.src}
                    className='flex-1 rounded-2xl w-full'
                    style={{ objectFit: 'cover' }}
                >
                    Browser Anda tidak mendukung tag video.
                </video>

            </div>

            {/* <h1 className="text-5xl font-light mb-10">Visi, Misi & Moto Rumah Sakit DKT Tegal</h1> */}
            <div className="flex gap-10 ">
                <div className='w-full h-[700px]'>
                    <div className="grid grid-cols-12 grid-rows-8 gap-4 h-full">
                        <div className="col-span-6 row-span-8 overflow-hidden bg-black rounded-3xl">
                            <div className="flex ralative flex-col  items-center justify-center h-full ">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d293.7700511792846!2d109.13222329983837!3d-6.905006413341656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb9164b3beca3%3A0x4fe001ac8bec01ce!2sRumah%20Sakit%20TK.%20IV%20Pagongan%20Tegal!5e0!3m2!1sid!2sid!4v1756361078730!5m2!1sid!2sid" className='border-0 w-full h-full rounded-2xl' referrerPolicy="no-referrer-when-downgrade" loading="lazy"></iframe>
                            </div>
                        </div>
                        <div className="relative overflow-hidden col-span-3 p-10 row-span-6 bg-gradient-to-br from-black via-[#1a1a1a] to-[#ff6400] rounded-3xl col-start-7 row-start-3">
                            <Button variant={"outline"}>
                                VISI
                            </Button>
                            <h1 className='text-white mt-5'>
                                Menjadi Rumah Sakit Kebanggan Prajurit PNS dan keluarganya dengan menyediakan pelayanan kesehatan yang optimal
                            </h1>
                            {/* <div className='absolute z-10 -bottom-12 -right-12 rounded-full h-36 w-36 bg-[#ff6400]'></div>
                            <div className='absolute -bottom-20 -right-20 rounded-full h-60 w-60 bg-[#FF924F]'></div> */}
                        </div>
                        <div className="col-span-3 p-10 row-span-6 bg-gradient-to-br from-black via-[#1a1a1a] to-[#ff6400] rounded-3xl col-start-10 row-start-3">
                            <Button variant={"outline"}>
                                MISI
                            </Button>
                            <h1 className='text-white mt-5'>
                                Memberikan Pelayanan kesehatan yang bermutu dan terjangkau oleh masyarakat dalam rangka meningkatkan derajat kesehatan prajurit, PNS dan keluarganya dengan mengutamakan keselamatan pasien
                            </h1>
                        </div>
                        <div className="relative overflow-hidden col-span-6 p-10 row-span-2 bg-gradient-to-br from-black via-[#1a1a1a] to-[#ff6400] rounded-3xl col-start-7 row-start-1">
                            <Button variant={"outline"}>
                                MOTO
                            </Button>
                            <h1 className='text-white mt-5'>
                                Kami Siap Melayani Dengan Ikhlas
                            </h1>
                            {/* <div className="w-40 h-40 right-0 -bottom-32 z-10 bg-[#ff6400] rounded-full scale-x-200 absolute"></div>
                            <div className="w-40 h-40 right-7 -bottom-28 bg-[#ff924f] rounded-full scale-x-200 absolute"></div> */}
                        </div>
                        <div className='mt-10'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}