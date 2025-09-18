import Banner from "@/components/Banner";

export default function ArtikelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="px-10 relative">
            <Banner title="Artikel"/>
            {children}
        </div>
    )
}
