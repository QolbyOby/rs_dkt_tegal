'use client'
import Image from "next/image";
import dokter_poli from "@/public/img/dokter_poli.png"
import logoimg from "@/public/img/logo.png";
import logoimg2 from "@/public/img/LOGO AD DIPONEGORO.png";
import logoimg3 from "@/public/img/HESTI WIRA SAKTI.png";
import logobpjs from "@/public/img/bpjs-kesehatan-seeklogo.png"
import dokter_umum from "@/public/img/dokter_umum.jpeg";
import dokter_spesialis from "@/public/img/dokter_spesialis.jpeg";
import { Button } from "@/components/ui/button";
import { CircleArrowDown, Heart, Instagram, Mail, MapPin, Stethoscope, CircleArrowOutUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import hero_section7 from "@/public/img/hero_section7.jpeg"
import { FeaturedServices } from "@/components/FeaturedServices";
import { ThreeDMarqueeDemoSecond } from "@/components/ThreeDMarquee";
import { Article } from "@/lib/db/schema";
import { useEffect, useState } from "react";
import { ArtikelCard } from "@/components/ArtikelCard";
import paru from "@/public/img/paru.png";
import bedah from "@/public/img/bedah.png";
import gigi_mulut from "@/public/img/gig_mulut.png";
import obsgyn from "@/public/img/obsgyn.png";
import mata from "@/public/img/mata.png";
import penyakit_dalam from "@/public/img/penyakit_dalam.png";
import anak from "@/public/img/anak.png";
import praktek_gigi from "@/public/img/praktek_gigi.jpg"
import praktek_bedah from "@/public/img/praktek_bedah.jpg"
import praktek_bedah2 from "@/public/img/praktek_bedah2.jpg"

export default function Home() {

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/artikel');
        if (response.ok) {
          const data = await response.json();
          const publishedArticles = data.filter((article: Article) => article.status === 'PUBLISHED');
          // Urutkan artikel berdasarkan tanggal dan ambil 3 yang terbaru
          const sortedArticles = publishedArticles.sort((a: Article, b: Article) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
          setArticles(sortedArticles.slice(0, 3));
        }
      } catch (error) {
        console.error("Gagal mengambil data artikel:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <div className="px-5 font-source-serif-4">
      <div
        className="relative h-[800px] bg-cover bg-center rounded-2xl"
        style={{ backgroundImage: `url(${hero_section7.src})` }}
      >
        <div className="absolute bottom-0 bg-gradient-to-b inset-0 from-black/25 to-black/75 rounded-2xl z-0" />
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-white z-30">
          <Image src={logoimg} alt="logoimg" className="w-full h-full p-5" priority={true} />
        </div>
        <div className="w-[1000px] absolute top-[400px] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-7xl font-light text-center text-white">
            Selamat Datang di Rumah Sakit DKT Tegal
          </h1>
          <p className="text-center text-white mt-10 full mx-28">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas temporibus veniam, amet provident obcaecati sapiente laborum reprehenderit exercitationem accusamus, repellendus quibusdam neque corrupti.</p>
          <div className="w-full flex justify-center items-center mt-5">
            <button className="flex justify-around items-center bg-white px-6 py-2 rounded-full gap-2">
              <span className="text-lg">Lihat Selengkapnya</span>
              <span className="bg-orange-500 p-3 rounded-full">
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
        <div className="flex absolute top-5 left-5 gap-3 p-3 bg-white shadow-2xl items-center rounded-2xl">
          <Image src={logobpjs} alt="logobpjs" className="w-10 h-10" />
          <Image src={logoimg2} alt="logoimg2" className="w-10 h-10" />
          <Image src={logoimg3} alt="logoimg3" className="w-10 h-10" />
          <Image src={logoimg} alt="logoimg" className="w-10 h-10" />
        </div>
      </div>
      <div className="px-10 mt-20">
        <div className="flex justify-between items-end">
          <div className="">
            <Badge className="bg-orange-500">
              <Stethoscope className="mr-2" />
              Our Doctor
            </Badge>
            <h1 className="text-4xl mt-2 font-light">Kami memiliki dokter-dokter yang berpengalaman</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.</p>
          </div>
          <Button className="bg-orange-500">
            <Heart />
            <Link href="/anggota">Lihat Dokter Kami</Link>
          </Button>
        </div>
        <div className="flex gap-2 mt-10">
          <Link href="/anggota?kategori=umum" className="flex-1 h-80 bg-gray-400 rounded-3xl relative overflow-hidden group">
            <Image src={dokter_umum} alt="Dokter Umum" className="w-full h-full object-cover rounded-3xl transform transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute bottom-4 left-4 w-1/2 px-6 py-4 rounded-xl bg-white/30 backdrop-blur-md shadow-lg flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-black">Dokter Umum</span>
                <span className="text-sm text-black/70">Pelayanan kesehatan umum terbaik</span>
              </div>
              <div className="p-3 bg-orange-500 rounded-full transform transition-transform duration-300 group-hover:rotate-45">
                <CircleArrowOutUpRight className="text-white" />
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-4xl px-5 py-5 rounded-full bg-white/30 backdrop-blur-md shadow-lg">
              18
            </div>
          </Link>
          <Link href="/anggota?kategori=spesialis" className="flex-1 h-80 bg-gray-400 rounded-3xl relative overflow-hidden group">
            <Image src={dokter_spesialis} alt="Dokter Spesialis" className="w-full h-full object-cover rounded-3xl transform transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute bottom-4 left-4 w-1/2 px-6 py-4 rounded-xl bg-white/30 backdrop-blur-md shadow-lg flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-black">Dokter Spesialis</span>
                <span className="text-sm text-black/70">Spesialisasi berbagai bidang medis</span>
              </div>
              <div className="p-3 bg-orange-500 rounded-full transform transition-transform duration-300 group-hover:rotate-45">
                <CircleArrowOutUpRight className="text-white" />
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-4xl px-5 py-5 rounded-full bg-white/30 backdrop-blur-md shadow-lg">
              12
            </div>
          </Link>
        </div>
        <div className="mt-3">
          <div className="bg-black text-white h-[500px]  p-6 rounded-3xl shadow-lg w-full relative overflow-hidden">
            <div className="pointer-events-none absolute top-60 -left-60 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-orange-700 via-amber-700 to-yellow-700 opacity-60 blur-[160px] mix-blend-lighten" />
            <div className="pointer-events-none absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-orange-700 via-amber-700 to-yellow-700 opacity-50 blur-[140px] mix-blend-lighten" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-orange-700 via-amber-700 to-yellow-700 opacity-40 blur-[140px] mix-blend-lighten" />
            <h1 className="text-[80px] font-source-serif-4  absolute left-1/2 top-25 -translate-x-1/2 -translate-y-1/2">POLIKLINIK</h1>
            <div className="flex justify-center absolute bottom-0 w-full">
              <Image src={dokter_poli} alt="dokter_poli" className="w-[700px]" />
            </div>
            <button className=" absolute bottom-6 right-6 rounded-md bg-orange-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-custom focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
              <Link href={"/poliklinik"}>
                Lihat Poliklinik
              </Link>
            </button>
            <div className="bg-white p-2 rounded-lg absolute top-10 left-10 animate-float" style={{transform: 'scale(1.2)'}}>
              <Image src={paru} alt="paru" className="w-7 h-7" />
            </div>
            <div className="bg-white p-2 rounded-lg absolute bottom-10 left-70 animate-float-delay-1" style={{transform: 'scale(0.9)'}}>
              <Image src={bedah} alt="bedah" className="w-10 h-10" />
            </div>
            <div className="bg-white p-2 rounded-lg absolute bottom-46 left-60 animate-float-delay-2" style={{transform: 'scale(1.3)'}}>
              <Image src={gigi_mulut} alt="gigi_mulut" className="w-10 h-10" />
            </div>
            <div className="bg-white p-2 rounded-lg absolute top-20 right-90 animate-float-delay-3" style={{transform: 'scale(1.1)'}}>
              <Image src={obsgyn} alt="obsgyn" className="w-11 h-11" />
            </div>
            <div className="bg-white p-2 rounded-lg absolute bottom-40 right-24 animate-float-delay-4" style={{transform: 'scale(0.8)'}}>
              <Image src={mata} alt="mata" className="w-9 h-9" />
            </div>
            <div className="bg-white p-2 rounded-lg absolute top-35 left-29 animate-float-delay-5" style={{transform: 'scale(1.4)'}}>
              <Image src={penyakit_dalam} alt="penyakit_dalam" className="w-16 h-16" />
            </div>
            <div className="bg-white p-2 rounded-lg absolute bottom-24 right-40 animate-float-delay-6" style={{transform: 'scale(1)'}}>
              <Image src={anak} alt="anak" className="w-10 h-10" />
            </div>

            <Image src={praktek_gigi} className="absolute w-40 h-40 object-cover rounded-lg top-61 left-15" alt="praktek_gigi"/>
            <Image src={praktek_bedah} className="absolute w-50 h-50 object-cover rounded-lg top-20 right-20" alt="praktek_bedah"/>
            <Image src={praktek_bedah2} className="absolute w-40 h-40 object-cover rounded-lg top-20 left-55" alt="praktek_bedah2"/>
          </div>
        </div>

        <div className="mt-10 ">
          <FeaturedServices />
        </div>
        <div className="mt-20">
          <ThreeDMarqueeDemoSecond />
        </div>
        <div className="my-20 px-5">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold">Artikel Terbaru</h2>
              <p className="text-gray-600">Baca berita dan informasi kesehatan terkini dari kami.</p>
            </div>
            <Button asChild className="bg-orange-500">
              <Link href="/artikel" className="flex items-center">
                Lihat Artikel Lainnya <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {loading ? (
            <div className="text-center">Memuat artikel...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArtikelCard
                  key={article.id}
                  id={article.id}
                  slug={article.slug}
                  title={article.title}
                  description={article.content.substring(0, 100) + '...'}
                  category="Artikel" // Anda mungkin ingin mengambil nama kategori
                  imageUrl={article.Image || "/img/hero_section2.png"}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}