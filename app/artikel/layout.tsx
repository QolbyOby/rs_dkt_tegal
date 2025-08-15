export default function ArtikelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="px-10 relative">
            <div className="bg-black text-white h-96 flex justify-center items-center p-6 rounded-3xl shadow-lg w-full relative overflow-hidden">
                <div className="pointer-events-none absolute top-60 -left-60 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-orange-700 via-amber-700 to-yellow-700 opacity-60 blur-[160px] mix-blend-lighten" />
                <div className="pointer-events-none absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-orange-700 via-amber-700 to-yellow-700 opacity-50 blur-[140px] mix-blend-lighten" />
                <div className="pointer-events-none absolute bottom-0 left-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-orange-700 via-amber-700 to-yellow-700 opacity-40 blur-[140px] mix-blend-lighten" />
                <h1 className="text-5xl font-semibold">Artikel</h1>
            </div>
            {children}
        </div>
    )
}
