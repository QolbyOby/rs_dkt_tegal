// app/(main)/artikel/[slug]/page.tsx
'use client'

import { useEffect, useState, use } from 'react'; // 1. Tambahkan 'use' dari React
import Image from "next/image";
import { Article } from '@/lib/db/schema';
import { Loader2 } from 'lucide-react';

// Terima `params` sebagai Promise
export default function DetailArtikelPage({ params }: { params: Promise<{ slug: string }> }) {
    // 2. Gunakan React.use() untuk "membuka" promise params
    const { slug } = use(params);
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            const fetchArticle = async () => {
                try {
                    const response = await fetch(`/api/artikel?slug=${slug}`);
                    if (response.ok) {
                        const data = await response.json();
                        setArticle(data);
                    }
                } catch (error) {
                    console.error("Gagal mengambil detail artikel:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchArticle();
        } else {
            setLoading(false);
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Memuat artikel...</span>
            </div>
        );
    }

    if (!article) {
        return <div className="text-center py-20">Artikel tidak ditemukan.</div>;
    }

    return (
        <div className="flex flex-col items-center relative mb-20">
            {article.Image && (
                <div className="relative w-full max-w-4xl h-96 -top-20">
                    <Image
                        src={article.Image}
                        alt={article.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl border-8 border-white shadow-lg"
                    />
                </div>
            )}

            <div className={`px-4 md:px-24 lg:px-48 ${article.Image ? 'pt-10' : 'pt-[100px]'} max-w-5xl mx-auto`}>
                <h1 className="text-4xl font-bold mb-5 text-center">{article.title}</h1>
                <div
                    className="prose lg:prose-xl max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }}
                />
            </div>
        </div>
    );
}   