import { ArtikelCard } from "@/components/ArtikelCard";
import Contoh from "@/public/img/hero_section2.png";
import Contoh2 from "@/public/img/hero_section3.jpeg";


export default function ArtikelPage() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 mt-20 px-10">
            <ArtikelCard title="Artikel 1" description="ini adalah artikel yang pertama kali di buat sebagai contoh tulisan descriptionnya " category="Contoh" imageUrl={Contoh} />
            <ArtikelCard title="Artikel 1" description="ini adalah artikel yang pertama kali di buat sebagai contoh tulisan descriptionnya " category="Contoh" imageUrl={Contoh2} />
            <ArtikelCard title="Artikel 1" description="ini adalah artikel yang pertama kali di buat sebagai contoh tulisan descriptionnya " category="Contoh" imageUrl={Contoh} />
            <ArtikelCard title="Artikel 1" description="ini adalah artikel yang pertama kali di buat sebagai contoh tulisan descriptionnya " category="Contoh" imageUrl={Contoh} />
            <ArtikelCard title="Artikel 1" description="ini adalah artikel yang pertama kali di buat sebagai contoh tulisan descriptionnya " category="Contoh" imageUrl={Contoh} />
            <ArtikelCard title="Artikel 1" description="ini adalah artikel yang pertama kali di buat sebagai contoh tulisan descriptionnya " category="Contoh" imageUrl={Contoh} />
            <ArtikelCard title="Artikel 1" description="ini adalah artikel yang pertama kali di buat sebagai contoh tulisan descriptionnya " category="Contoh" imageUrl={Contoh} />
            <ArtikelCard title="Artikel 1" description="ini adalah artikel yang pertama kali di buat sebagai contoh tulisan descriptionnya " category="Contoh" imageUrl={Contoh} />
            <ArtikelCard title="Artikel 1" description="ini adalah artikel yang pertama kali di buat sebagai contoh tulisan descriptionnya " category="Contoh" imageUrl={Contoh} />
        </div>
    )
}