'use client'

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { div } from "motion/react-client";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <>
            {pathname !== "/login" && <Navbar />}
            {children}
            {pathname !== "/login" && <Footer />}
            
        </>
    );
}