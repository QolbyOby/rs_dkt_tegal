import Image from "next/image";
import hero2img from "@/public/img/hero_section2.png";
import logoimg from "@/public/img/logo.png";
import dokter_umum from "@/public/img/dokter_umum.jpeg";
import dokter_spesialis from "@/public/img/dokter_spesialis.jpeg";
import kepala_RS from "@/public/img/13.webp";
import Navbar from "@/components/layouts/Navbar";
import { Button } from "@/components/ui/button";
import { CircleArrowDown, Heart, Instagram, Mail, MapPin, Stethoscope, CircleArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="px-10">
      <div
        className="relative h-[800px] bg-cover bg-center rounded-2xl"
        style={{ backgroundImage: `url(${hero2img.src})` }}
      >
        <div className="absolute inset-0 bg-black/25 rounded-2xl z-0" />
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-white z-10">
          <Image src={logoimg} alt="logoimg" className="w-full h-full p-5" priority={true} />
        </div>
        <div className="w-[1000px] absolute top-[400px] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-7xl font-semibold text-center text-white">
            Selamat Datang di Rumah Sakit DKT Tegal
          </h1>
          <p className="text-center text-white mt-10 full mx-28">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas temporibus veniam, amet provident obcaecati sapiente laborum reprehenderit exercitationem accusamus, repellendus quibusdam neque corrupti.</p>
          <div className="w-full flex justify-center items-center mt-5">
            <button className="flex justify-around items-center bg-white px-6 py-2 rounded-full gap-2">
              <span className="text-lg">Lihat Selengkapnya</span>
              <span className="bg-black p-3 rounded-full">
                <CircleArrowDown className="text-white" />
              </span>
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2">
          <Button variant={"outline"} className="rounded-full">
            <Instagram className="mr-2" />
            Instagram
          </Button>
          <Button variant={"outline"} className="rounded-full">
            <Mail />
            Email
          </Button>
          <Button variant={"outline"} className="rounded-full">
            <MapPin />
            Alamat
          </Button>
        </div>
      </div>
      <div className="mt-20 px-10">
        <div className="flex justify-center gap-20 items-center mt-5">
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
            <p className="mb-1 indent-8 text-justify">
              Puji dan syukur kami panjatkan kehadirat Allah SWT, karena dengan karunia Nya website RSPAL dr. Ramelan ini dapat membantu menginformasikan data dan informasi pelayanan Rumah Sakit di RSPAL dr. Ramelan. RSPAL dr. Ramelan merupakan rumah sakit milik TNI yang berlokasi di tengah pusat Kota Surabaya, dengan type RS kelas A, Rumah Sakit Pendidikan dan merupakan Rumah Sakit rujukan di wilayah Timur.
            </p>
            <p className="mb-1 indent-8 text-justify">
              Rumah Sakit Pusat Angkatan Laut dr. Ramelan memiliki 48 layanan spesialistik dan subspesialistik dengan kapasitas tempat tidur 866 TT. Kami berkomitmen untuk memberikan pelayanan kesehatan yang berkualitas serta beorientasi penuh pada kepuasan pelanggan dengan penggunaan  biaya yang kompetitif dan terjangkau. Seluruh staf medis dan paramedis kami bekerja sama sebagaimana satu kelompok kerja yang profesional untuk melayani anda, karena merekalah tulang punggung keberhasilan kami dalam melayani anda. Sebagaimana rumah sakit yang menekankan pelayanan kesehatan kepada TNI beserta keluarganya dan masyarakat umum yang membutuhkan, RSPAL dr. Ramelan akan terus berupaya meningkatkan pelayanan dan komitmen, semangat dan dedikasi yang tinggi serta mengikuti perkembangan teknologi yang tepat guna. Semua peningkatan pelayanan tersebut bertujuan untuk memberikan pelayanan dan perawatan kesehatan yang berkualitas serta kenyamanan bagi anda dan keluarga selama menjalani pengobatan serta perawatan di RSPAL dr. Ramelan Surabaya.
            </p>
            <p className="mb-1 indent-8 text-justify">
              Demikian sambutan dari saya dan saya mengucapkan terima kasih kepada seluruh jajaran staf dan anggota RSPAL dr. Ramelan atas loyalitas dan kerjasamanya dalam memberikan pelayanan kesehatan kepada TNI beserta keluarganya dan masyarakat umum yang membutuhkan. Semoga website ini dapat memberikan informasi yang berguna kepada yang membutuhkannya.
            </p>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <div className="px-12  py-8 relative rounded-2xl shadow-xl/30 bg-white/80 overflow-hidden flex flex-col items-center">
              <Image
                src={kepala_RS}
                alt="hero2img"
                className="object-cover h-[500px]"
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
      <div className="px-10 mt-20">
        <div className="flex justify-between items-end">
          <div className="">
            <Badge>
              <Stethoscope className="mr-2" />
              Our Doctor
            </Badge>
            <h1 className="text-3xl mt-2">Kami memiliki dokter-dokter yang berpengalaman</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.</p>
          </div>
          <Button>
            <Heart />
            <Link href="/anggota">Lihat Dokter Kami</Link>
          </Button>
        </div>
        <div className="flex gap-2 mt-10">
          <div className="flex-1 h-80 bg-gray-400 rounded-3xl relative overflow-hidden">
            <Image src={dokter_umum} alt="Dokter Umum" className="w-full h-full object-cover rounded-3xl" />
            <div className="absolute bottom-4 left-4 w-1/2 px-6 py-4 rounded-xl bg-white/30 backdrop-blur-md shadow-lg flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-black">Dokter Umum</span>
                <span className="text-sm text-black/70">Pelayanan kesehatan umum terbaik</span>
              </div>
              <div className="p-3 bg-black rounded-full">
                <CircleArrowOutUpRight className="text-white" />
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-4xl px-5 py-5 rounded-full bg-white/30 backdrop-blur-md shadow-lg">
              18
            </div>
          </div>
          <div className="flex-1 h-80 bg-gray-400 rounded-3xl relative overflow-hidden">
            <Image src={dokter_spesialis} alt="Dokter Spesialis" className="w-full h-full object-cover rounded-3xl" />
            <div className="absolute bottom-4 left-4 w-1/2 px-6 py-4 rounded-xl bg-white/30 backdrop-blur-md shadow-lg flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-black">Dokter Spesialis</span>
                <span className="text-sm text-black/70">Spesialisasi berbagai bidang medis</span>
              </div>
              <div className="p-3 bg-black rounded-full">
                <CircleArrowOutUpRight className="text-white" />
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-4xl px-5 py-5 rounded-full bg-white/30 backdrop-blur-md shadow-lg">
              12
            </div>
          </div>
        </div>
        <div className="mt-10 h-10 px-10">
        </div>
      </div>
    </div>
  );
}