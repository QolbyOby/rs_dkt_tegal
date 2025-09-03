'use client'

import Image from "next/image";
import hero2img from "@/public/img/hero_section3.jpeg";
import logoimg from "@/public/img/logo.png";
import logoimg2 from "@/public/img/LOGO AD DIPONEGORO.png";
import logoimg3 from "@/public/img/HESTI WIRA SAKTI.png";
import logobpjs from "@/public/img/bpjs-kesehatan-seeklogo.png"
import dokter_umum from "@/public/img/dokter_umum.jpeg";
import dokter_spesialis from "@/public/img/dokter_spesialis.jpeg";
import hero_section2 from "@/public/img/hero_section2.png"
import kepala_RS from "@/public/img/13.webp";
import Navbar from "@/components/layouts/Navbar";
import { Button } from "@/components/ui/button";
import { CircleArrowDown, Heart, Instagram, Mail, MapPin, Stethoscope, CircleArrowOutUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ArticleHome from "@/components/ArtikelHome";
import hero_section4 from "@/public/img/hero_section4.png"
import hero_section6 from "@/public/img/hero_section6.png"
import { FeaturedServices } from "@/components/FeaturedServices";
import { ThreeDMarqueeDemoSecond } from "@/components/ThreeDMarquee";
import { Article } from "@/lib/db/schema";
import { useEffect, useState } from "react";
import { ArtikelCard } from "@/components/ArtikelCard";

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
    <div className="px-5">
      <div
        className="relative h-[800px] bg-cover bg-center rounded-2xl"
        style={{ backgroundImage: `url(${hero_section4.src})` }}
      >
        <div className="absolute inset-0 bg-black/25 rounded-2xl z-0" />
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
            <Badge>
              <Stethoscope className="mr-2" />
              Our Doctor
            </Badge>
            <h1 className="text-4xl mt-2 font-light">Kami memiliki dokter-dokter yang berpengalaman</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.</p>
          </div>
          <Button>
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
              <div className="p-3 bg-black rounded-full transform transition-transform duration-300 group-hover:rotate-45">
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
              <div className="p-3 bg-black rounded-full transform transition-transform duration-300 group-hover:rotate-45">
                <CircleArrowOutUpRight className="text-white" />
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-4xl px-5 py-5 rounded-full bg-white/30 backdrop-blur-md shadow-lg">
              12
            </div>
          </Link>
        </div>
        <div className="mt-10 ">
          <FeaturedServices />
        </div>
        <div className="mt-10">
          <ThreeDMarqueeDemoSecond />
        </div>
        <div className="my-20 px-5">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold">Artikel Terbaru</h2>
              <p className="text-gray-600">Baca berita dan informasi kesehatan terkini dari kami.</p>
            </div>
            <Button asChild>
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