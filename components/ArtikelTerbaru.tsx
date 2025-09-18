'use client'

import Link from "next/link";
import { Button } from "./ui/button";
import { ArtikelCard } from "./ArtikelCard";
import { useEffect, useState } from "react";
import { Article } from "@/lib/db/schema";
import { ArrowRight } from "lucide-react";

export default function ArtikelTerbaru() {


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
        <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold">Artikel Terbaru</h2>
                    <p className="text-gray-600">Baca berita dan informasi kesehatan terkini dari kami.</p>
                </div>
                <Button asChild className="bg-orange-500 w-full md:w-auto">
                    <Link href="/artikel" className="flex items-center justify-center">
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
        </>
    )
}