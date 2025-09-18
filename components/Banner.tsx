// components/Banner.tsx
import React from 'react';
import banner from "@/public/img/banner.png"
import banner2 from "@/public/img/Frame 8.svg"
import Image from 'next/image';
import logo1 from "@/public/img/HESTI WIRA SAKTI.png"
import logo2 from "@/public/img/LOGO AD DIPONEGORO.png"
import logo3 from "@/public/img/logo_bintang.png"

interface BannerProps {
  title: React.ReactNode;
}

const Banner: React.FC<BannerProps> = ({ title }) => {
  return (
    <div className='relative overflow-hidden h-96 w-full rounded-3xl'>
      <Image src={banner2} alt='banner' className='object-cover w-full z-0' />
      <div className='flex items-center gap-4 pl-4 h-24 w-[1400px] bg-black absolute top-10 rounded-r-full'>
        <Image src={logo1} alt='banner' className='w-20 h-20' priority={true} />
        <Image src={logo2} alt='banner' className='w-20 h-20' priority={true} />
        <Image src={logo3} alt='banner' className='w-20 h-20' priority={true} />
        <div className='text-white'>
          <h1 className='text-4xl font-light'>RUMAH SAKIT TK.IV 04.07.01 TEGAL</h1>
          <h3 className='text-xl font-light'>JL. RS DKT Pagongan, Pepedan Kec, Dukuhturi, Tegal 52192</h3>
        </div>
      </div>
      <h1 className='absolute text-black text-5xl md:text-5xl font-semibold  top-55 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center px-4'>
        {title}
      </h1>
    </div>
  );
};

export default Banner;