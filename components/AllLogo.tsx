import Image from "next/image";
import logoimg from "@/public/img/logo.png";
import logoimg2 from "@/public/img/LOGO AD DIPONEGORO.png";
import logoimg3 from "@/public/img/HESTI WIRA SAKTI.png";
import logobpjs from "@/public/img/bpjs-kesehatan-seeklogo.png"

export default function AllLogo({ className }: { className?: string }) {
    return (
        <div className={`top-5 left-5 gap-2 md:gap-3 p-2 md:p-3 items-center rounded-2xl ${className}`}>
            <Image src={logobpjs} alt="logobpjs" className="w-6 h-6 md:w-10 md:h-10" />
            <Image src={logoimg2} alt="logoimg2" className="w-6 h-6 md:w-10 md:h-10" />
            <Image src={logoimg3} alt="logoimg3" className="w-6 h-6 md:w-10 md:h-10" />
            <Image src={logoimg} alt="logoimg" className="w-6 h-6 md:w-10 md:h-10" />
        </div>
    )
}