'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { ChevronRight, Stethoscope } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { NavItems } from "../ui/navbar-pelayanan";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const pathname = usePathname();

    const [leftNavHovered, setLeftNavHovered] = useState<number | null>(null);
    const [rightNavHovered, setRightNavHovered] = useState<number | null>(null);
    const [layananHovered, setLayananHovered] = useState<number | null>(null);

    // Data Navigasi
    const leftNavItems = [
        { name: "Home", href: "/" },
        { name: "Profil", href: "/profil" },
        { name: "Layanan", type: 'dropdown' },
        { name: "Fasilitas", type: 'dropdown' },
    ];
    const rightNavItems = [
        { name: "Informasi Kamar", href: "/kamar" },
        { name: "Artikel", href: "/artikel" },
        { name: "Jadwal Dokter", href: "/anggota", icon: <Stethoscope className="size-4" /> },
        { name: "Login", href: "/login", isPrimary: true },
    ];
    const layananItems = [
        { name: "IGD 24 Jam", link: "/IGD" },
        { name: "Penunjang Medik", isTrigger: true },
        { name: "Medical Check Up", link: "/medical-chek-up" },
        { name: "Poliklinik", link: "/poliklinik" },
    ];
    const penunjangMedikItems = [
        { name: "Farmasi 24 jam", link: "/penunjang-medik " },
        { name: "Laboratorium 24 jam", link: "#" },
        { name: "Radiologi", link: "#" },
    ];

    const navItemClasses = (isHovered: boolean, isActive: boolean, isPrimary = false) => cn(
        "relative z-10 transition-colors duration-300",
        isPrimary ? 'text-primary-foreground'
            : (isHovered || isActive ? 'text-white' : 'text-neutral-600')
    );

    return (
        <nav className="bg-white w-full flex items-center sticky top-0 justify-between z-20"
            style={{ paddingLeft: '60px', paddingRight: '60px', paddingTop: '15px', paddingBottom: '15px' }}>

            {/* Bagian Kiri Navbar */}
            <div className="flex items-center gap-4 w-full">
                <NavigationMenu viewport={false}>
                    <NavigationMenuList
                        onMouseLeave={() => setLeftNavHovered(null)}
                        className="gap-1"
                    >
                        {leftNavItems.map((item, idx) => {
                            const isActive = item.href === pathname;
                            return (
                                <NavigationMenuItem key={item.name} className="relative" onMouseEnter={() => setLeftNavHovered(idx)}>
                                    {/* INI PERBAIKANNYA */}
                                    {(leftNavHovered === idx || (isActive && item.type !== 'dropdown')) && (
                                        <motion.div
                                            layoutId="leftNavHover"
                                            className="absolute inset-0 h-full w-full rounded-md bg-orange-400"
                                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        />
                                    )}
                                    <div className="relative z-10">
                                        {item.type === 'dropdown' ? (
                                            <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent focus:bg-transparent hover:text-white transition-colors duration-300 ease-in-out", navItemClasses(leftNavHovered === idx, false))}>
                                                {item.name}
                                            </NavigationMenuTrigger>
                                        ) : (
                                            <NavigationMenuLink asChild>
                                                <Link href={item.href || "#"} className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent focus:bg-transparent hover:text-white transition-colors duration-300 ease-in-out", navItemClasses(leftNavHovered === idx, isActive))}>
                                                    {item.name}
                                                </Link>
                                            </NavigationMenuLink>
                                        )}
                                    </div>

                                    {/* Dropdown Content */}
                                    {item.name === 'Layanan' && (
                                        <NavigationMenuContent>
                                            <ul onMouseLeave={() => setLayananHovered(null)} className="grid w-[250px] gap-1 p-2">
                                                {layananItems.map((layananItem, layananIdx) => (
                                                    <li key={layananItem.name} className="relative rounded-md" onMouseEnter={() => setLayananHovered(layananIdx)}>
                                                        {layananHovered === layananIdx && <motion.div layoutId="layananHover" className="absolute inset-0 h-full w-full rounded-md bg-orange-400" />}
                                                        <div className="relative z-10">
                                                            {layananItem.isTrigger ? (
                                                                <HoverCard openDelay={1} closeDelay={1}>
                                                                    <HoverCardTrigger asChild>
                                                                        <div className="group flex w-full cursor-pointer flex-row items-center justify-between p-2  text-sm text-neutral-600 transition-colors duration-300 ease-in-out hover:text-white">{layananItem.name}<ChevronRight className="transition-transform duration-200 group-hover:rotate-90" /></div>
                                                                    </HoverCardTrigger>
                                                                    <HoverCardContent side="right" sideOffset={5} align="start" className="flex w-fit flex-col justify-center p-2 items-start">
                                                                        <NavItems items={penunjangMedikItems} className="flex-col !items-start !space-x-0" />
                                                                    </HoverCardContent>
                                                                </HoverCard>
                                                            ) : (
                                                                <Link href={layananItem.link || "#"} className="block w-full p-2  text-sm text-neutral-600 transition-colors duration-300 ease-in-out hover:text-white">{layananItem.name}</Link>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    )}
                                    {/* ... konten dropdown fasilitas ... */}
                                </NavigationMenuItem>
                            )
                        })}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Bagian Kanan Navbar */}
            <div className="flex items-center gap-7 w-full justify-end">
                <NavigationMenu viewport={false}>
                    <NavigationMenuList
                        onMouseLeave={() => setRightNavHovered(null)}
                        className="gap-1"
                    >
                        {rightNavItems.map((item, idx) => {
                            const isActive = item.href === pathname;
                            return (
                                <NavigationMenuItem key={item.name} className="relative" onMouseEnter={() => setRightNavHovered(idx)}>
                                    {(rightNavHovered === idx || isActive) && (
                                        <motion.div
                                            layoutId="rightNavHover"
                                            className={cn("absolute inset-0 h-full w-full rounded-md", item.isPrimary ? "bg-orange-500" : "bg-orange-400")}
                                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        />
                                    )}
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={item.href || "#"}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                "bg-transparent hover:bg-transparent focus:bg-transparent hover:text-white transition-colors duration-300 ease-in-out",
                                                item.isPrimary ? "bg-primary text-primary-foreground shadow-xs" : "",
                                                navItemClasses(rightNavHovered === idx, isActive, item.isPrimary)
                                            )}
                                        >
                                            <div className="flex items-center gap-2">
                                                {item.icon} {item.name}
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            )
                        })}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav>
    )
}



// 'use client'

// import { Atom, ChevronRight } from "lucide-react";
// import { Button } from "../ui/button";
// import {
//     HoverCard,
//     HoverCardContent,
//     HoverCardTrigger,
// } from "../ui/hover-card";
// import Link from "next/link";

// interface links {
//     id: number;
//     title: string;
//     link: string;
//     items?: {
//         id: number;
//         title: string;
//         link: string;
//     }[];
// }

// const Navbar = () => {
//     const links: links[] = [
//         {
//             id: 1,
//             link: "/",
//             title: "Project 1",
//             items: [
//                 {
//                     id: 1,
//                     link: "/",
//                     title: "item 1 from project 1",
//                 },
//                 {
//                     id: 2,
//                     link: "/",
//                     title: "item 2 from project 1",
//                 },
//             ],
//         },
//         {
//             id: 2,
//             link: "/",
//             title: "Project 2",
//         },
//         {
//             id: 3,
//             link: "/",
//             title: "Project 3",
//         },
//         {
//             id: 4,
//             link: "/",
//             title: "Project 4",
//         },
//     ];

//     return (
//         <div className="group">
//             <HoverCard openDelay={1} closeDelay={100}>
//                 <HoverCardTrigger asChild>
//                     <Button className="flex items-center w-max gap-10">
//                         <div className="flex items-center gap-2">
//                             <Atom />
//                             Projects
//                         </div>
//                         <ChevronRight className="group-hover:rotate-90 transition-transform duration-200" />
//                     </Button>
//                 </HoverCardTrigger>
//                 <HoverCardContent
//                     align="start"
//                     className="cursor-pointer w-full flex
// 						flex-col text-nowrap whitespace-nowrap group-[navigation]"
//                 >
//                     {links.map((item) => (
//                         <div className="flex w-full justify-between" key={item.id}>
//                             <HoverCard openDelay={1}>
//                                 <HoverCardTrigger asChild>
//                                     <Button
//                                         className="flex w-full justify-between items-center "
//                                         variant={"ghost"}
//                                     >
//                                         {item.title}
//                                         <ChevronRight />
//                                     </Button>
//                                 </HoverCardTrigger>
//                                 <HoverCardContent
//                                     side="left"
//                                     sideOffset={18}
//                                     align="start"
//                                     className="flex flex-col p-0 w-max justify-center"
//                                 >
//                                     {item.items?.map((product) => (
//                                         <Button variant={"ghost"} key={product.id}>
//                                             <Link href={product.link}>{product.title}</Link>
//                                         </Button>
//                                     ))}
//                                 </HoverCardContent>
//                             </HoverCard>
//                         </div>
//                     ))}
//                 </HoverCardContent>
//             </HoverCard>
//         </div>
//     );
// };

// export default  Navbar ;

// 'use client'

// import Link from "next/link";
// import { ChevronRight, Stethoscope } from "lucide-react";
// import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "../ui/navigation-menu";
// import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
// import { NavItems } from "../ui/navbar-pelayanan";
// import { useState } from "react";
// import {
//     motion,
// } from "motion/react";

// export default function Navbar() {

//     // State untuk melacak item yang di-hover di menu "Layanan"
//     const [layananHovered, setLayananHovered] = useState<number | null>(null);

//     // Data untuk sub-sub-menu "Penunjang Medik"
//     const penunjangMedikItems = [
//         { name: "Farmasi 24 jam", link: "#" },
//         { name: "Laboratorium 24 jam", link: "#" },
//         { name: "Radiologi", link: "#" },
//     ];

//     // Data untuk menu "Layanan" utama
//     const layananItems = [
//         { name: "IGD 24 Jam", link: "/IGD" },
//         { name: "Penunjang Medik", isTrigger: true }, // Flag untuk item spesial
//         { name: "Medical Check Up", link: "/medical-chek-up" },
//         { name: "Poliklinik", link: "/poliklinik" },
//     ];


//     return (
//         <nav className="bg-gradient-to-r from-white/20 via-white/10 to-white/20  backdrop-blur-md border-b border-white/20  w-full flex items-center sticky top-0  justify-between z-20"
//             style={{ paddingLeft: '60px', paddingRight: '60px', paddingTop: '15px', paddingBottom: '15px' }}>
//             <div className="flex items-center gap-4 w-full">
//                 <NavigationMenu viewport={false}>
//                     <NavigationMenuList className="gap-4">
//                         <NavigationMenuItem>
//                             <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} border`}>
//                                 <Link href={"/"}>Home</Link>
//                             </NavigationMenuLink>
//                         </NavigationMenuItem>
//                         <NavigationMenuItem>
//                             <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} border`}>
//                                 <Link href={"/profil"}>Profil</Link>
//                             </NavigationMenuLink>
//                         </NavigationMenuItem>
//                         <NavigationMenuItem>
//                             <NavigationMenuTrigger className="border">
//                                 Layanan
//                             </NavigationMenuTrigger>
//                             <NavigationMenuContent>
//                                 <ul
//                                     onMouseLeave={() => setLayananHovered(null)}
//                                     className="grid w-[250px] gap-1 p-2"
//                                 >
//                                     {layananItems.map((item, idx) => (
//                                         <li
//                                             key={item.name}
//                                             className="relative rounded-md"
//                                             onMouseEnter={() => setLayananHovered(idx)}
//                                         >
//                                             {layananHovered === idx && (
//                                                 <motion.div
//                                                     layoutId="layananHover"
//                                                     className="absolute inset-0 h-full w-full rounded-md bg-orange-400"
//                                                 />
//                                             )}

//                                             <div className="relative z-10">
//                                                 {item.isTrigger ? (
//                                                     // Render HoverCard jika item adalah trigger
//                                                     <HoverCard openDelay={1} closeDelay={1}>
//                                                         <HoverCardTrigger asChild>
//                                                             <div className="group flex w-full cursor-pointer flex-row items-center justify-between p-3 text-neutral-600 transition-colors duration-300 ease-in-out hover:text-white">
//                                                                 {item.name}
//                                                                 <ChevronRight className="transition-transform duration-200 group-hover:rotate-90" />
//                                                             </div>
//                                                         </HoverCardTrigger>
//                                                         <HoverCardContent
//                                                             side="right"
//                                                             sideOffset={5}
//                                                             align="start"
//                                                             className="flex w-fit flex-col justify-center p-2 items-start"
//                                                         >
//                                                             <NavItems items={penunjangMedikItems} className="flex-col !items-start !space-x-0" />
//                                                         </HoverCardContent>
//                                                     </HoverCard>
//                                                 ) : (
//                                                     // Render Link biasa untuk item lainnya
//                                                     <Link
//                                                         href={item.link || "#"}
//                                                         className="block w-full p-3 text-neutral-600 transition-colors duration-300 ease-in-out hover:text-white"
//                                                     >
//                                                         {item.name}
//                                                     </Link>
//                                                 )}
//                                             </div>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </NavigationMenuContent>
//                         </NavigationMenuItem>
//                         <NavigationMenuItem>
//                             <NavigationMenuTrigger className="border">
//                                 Fasilitas
//                             </NavigationMenuTrigger>
//                             <NavigationMenuContent>
//                                 <ul className="grid w-[200px] gap-4">
//                                     <li>
//                                         <NavigationMenuLink
//                                             asChild
//                                         >
//                                             <Link href="#">Components</Link>
//                                         </NavigationMenuLink>
//                                         <NavigationMenuLink
//                                             asChild
//                                         >
//                                             <Link href="#">Documentation</Link>
//                                         </NavigationMenuLink>
//                                         <NavigationMenuLink
//                                             asChild
//                                         >
//                                             <Link href="#">Blocks</Link>
//                                         </NavigationMenuLink>
//                                     </li>
//                                 </ul>
//                             </NavigationMenuContent>
//                         </NavigationMenuItem>
//                     </NavigationMenuList>
//                 </NavigationMenu>
//             </div>
//             <div className="flex items-center gap-7 w-full justify-end">
//                 <NavigationMenu viewport={false}>
//                     <NavigationMenuList className="gap-4">
//                         <NavigationMenuItem>
//                             <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} border`}>
//                                 <Link href={"/kamar"}>Informasi Kamar</Link>
//                             </NavigationMenuLink>
//                         </NavigationMenuItem>
//                         <NavigationMenuItem>
//                             <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} border`}>
//                                 <Link href={"/artikel"}>Artikel</Link>
//                             </NavigationMenuLink>
//                         </NavigationMenuItem>
//                         <NavigationMenuItem>
//                             <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} border`}>
//                                 <Link href={"/anggota"}>
//                                     <div className="flex gap-2 justify-center items-center">
//                                         <Stethoscope className="size-4" />
//                                         Jadwal Dokter
//                                     </div>
//                                 </Link>
//                             </NavigationMenuLink>
//                         </NavigationMenuItem>
//                         <NavigationMenuItem>
//                             <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} bg-primary text-primary-foreground shadow-xs`}>
//                                 <Link href={"/login"}>Login</Link>
//                             </NavigationMenuLink>
//                         </NavigationMenuItem>
//                     </NavigationMenuList>
//                 </NavigationMenu>
//             </div>
//         </nav>
//     )
// }