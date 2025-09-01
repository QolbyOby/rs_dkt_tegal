// app/(main)/artikel/page.tsx
'use client'

import { useState, useEffect } from "react";
import { ArtikelCard } from "@/components/ArtikelCard";
import { Article } from "@/lib/db/schema"; // Impor tipe Article

export default function ArtikelPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await fetch('/api/artikel');
                if (response.ok) {
                    const data = await response.json();
                    const publishedArticles = data.filter((article: Article) => article.status === 'PUBLISHED');
                    setArticles(publishedArticles);
                }
            } catch (error) {
                console.error("Gagal mengambil data artikel:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchArticles();
    }, []);

    if (loading) {
        return <div className="text-center py-20">Memuat artikel...</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-20 px-10">
            {articles.length > 0 ? (
                articles.map((article) => (
                    <ArtikelCard
                        key={article.id}
                        id={article.id}
                        slug={article.slug} // Tambahkan ini
                        title={article.title}
                        description={article.content.substring(0, 100) + '...'}
                        category="Artikel"
                        imageUrl={article.Image || "/img/hero_section2.png"} // Ubah 'Image' menjadi 'imageUrl'
                    />
                ))
            ) : (
                <p className="col-span-full text-center">Belum ada artikel yang dipublikasikan.</p>
            )}
        </div>
    );
}


// import { ArtikelCard } from "@/components/ArtikelCard";
// import Contoh from "@/public/img/hero_section2.png";
// import Contoh2 from "@/public/img/hero_section3.jpeg";


// export default function ArtikelPage() {
//     return (
//         <div className="grid grid-cols-2 md:grid-cols-4 mt-20 px-10">
//             <ArtikelCard title="Artikel 1" description="ini adalah artikel yang pertama kali di buat sebagai contoh tulisan descriptionnya " category="Contoh" imageUrl={Contoh} />
//             <ArtikelCard title="Artikel 1" description="ini adalah artikel yang pertama kali di buat sebagai contoh tulisan descriptionnya " category="Contoh" imageUrl={Contoh2} />
//             <ArtikelCard title="Artikel 1" description="ini adalah artikel yang pertama kali di buat sebagai contoh tulisan descriptionnya " category="Contoh" imageUrl={Contoh} />
//             <ArtikelCard title="Artikel 1" description="ini adalah artikel yang pertama kali di buat sebagai contoh tulisan descriptionnya " category="Contoh" imageUrl={Contoh} />
//             <ArtikelCard title="Artikel 1" description="ini adalah artikel yang pertama kali di buat sebagai contoh tulisan descriptionnya " category="Contoh" imageUrl={Contoh} />
//             <ArtikelCard title="Artikel 1" description="ini adalah artikel yang pertama kali di buat sebagai contoh tulisan descriptionnya " category="Contoh" imageUrl={Contoh} />
//             <ArtikelCard title="Artikel 1" description="ini adalah artikel yang pertama kali di buat sebagai contoh tulisan descriptionnya " category="Contoh" imageUrl={Contoh} />
//             <ArtikelCard title="Artikel 1" description="ini adalah artikel yang pertama kali di buat sebagai contoh tulisan descriptionnya " category="Contoh" imageUrl={Contoh} />
//             <ArtikelCard title="Artikel 1" description="ini adalah artikel yang pertama kali di buat sebagai contoh tulisan descriptionnya " category="Contoh" imageUrl={Contoh} />
//         </div>
//     )
// }