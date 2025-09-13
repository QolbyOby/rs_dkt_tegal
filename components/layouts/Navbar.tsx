'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { ChevronRight, Stethoscope, Menu, X } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { NavItems } from "../ui/navbar-pelayanan";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Tipe Data Navigasi ---
type NavItem = {
    name: string;
    href?: string;
    icon?: React.ReactNode;
    isPrimary?: boolean;
    type?: 'dropdown' | 'link';
    items?: NavItem[]; // Untuk submenu
};

// --- Komponen AnimatedTextRoll Baru ---
const AnimatedTextRoll = ({ text }: { text: string }) => {
    const letters = Array.from(text);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.02, delayChildren: 0.05 * i },
        }),
    };

    const letterVariants = {
        hidden: { y: "100%", opacity: 0 },
        visible: {
            y: "0%",
            opacity: 1,
            transition: {
                ease: [0.22, 1, 0.36, 1],
                duration: 0.8,
            },
        },
    };

    return (
        <motion.span
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex overflow-hidden" // Menggunakan inline-flex untuk setiap item
        >
            {letters.map((letter, index) => (
                <motion.span key={index} variants={letterVariants} className="inline-block">
                    {letter === " " ? "\u00A0" : letter} {/* Menangani spasi */}
                </motion.span>
            ))}
        </motion.span>
    );
};


// --- Komponen untuk item navigasi mobile (Accordion) [DIPERBAIKI] ---
const MobileNavItem = ({ item, delayIndex = 0 }: { item: NavItem, delayIndex?: number }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Varian untuk animasi item
    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { delay: delayIndex * 0.05 } }, // Tambahkan delay
    };

    // Jika item memiliki submenu, render sebagai accordion
    if (item.items) {
        return (
            <motion.li variants={itemVariants} className="w-full text-left">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center py-2 text-xl font-semibold uppercase text-neutral-700"
                >
                    <AnimatedTextRoll text={item.name} />
                    <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronRight className="h-5 w-5" />
                    </motion.div>
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                visible: {
                                    height: 'auto',
                                    opacity: 1,
                                    transition: { staggerChildren: 0.05 },
                                },
                                hidden: {
                                    height: 0,
                                    opacity: 0,
                                    transition: { staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren" },
                                },
                            }}
                            className="pl-4 mt-2 flex flex-col gap-y-1 overflow-hidden"
                        >
                            {item.items.map((child, childIndex) => (
                                // Rekursif memanggil komponen yang sama untuk sub-sub menu
                                <MobileNavItem key={child.name} item={child} delayIndex={childIndex} /> // Tambahkan delayIndex
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </motion.li>
        );
    }

    // Jika item adalah link biasa
    return (
        <motion.li variants={itemVariants}>
            <Link
                href={item.href!}
                className={cn(
                    "block w-full py-2 text-xl font-semibold text-neutral-700 uppercase",
                    pathname === item.href && "text-orange-500"
                )}
            >
                <AnimatedTextRoll text={item.name} />
            </Link>
        </motion.li>
    );
};


export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    }, [isMobileMenuOpen]);

    const navLinks: NavItem[] = [
        { name: "Home", href: "/" },
        { name: "Profil", href: "/profil" },
        {
            name: "Layanan",
            type: 'dropdown',
            items: [
                { name: "IGD 24 Jam", href: "/IGD" },
                {
                    name: "Penunjang Medik",
                    items: [
                        { name: "Farmasi 24 jam", href: "/penunjang-medik?section=farmasi" },
                        { name: "Laboratorium 24 jam", href: "/penunjang-medik?section=lab" },
                        { name: "Radiologi", href: "/penunjang-medik?section=radiologi" },
                    ]
                },
                { name: "Medical Check Up", href: "/medical-chek-up" },
                {
                    name: "Rawat Inap",
                    items: [{ name: "Informasi Kamar", href: "/kamar" }]
                },
                {
                    name: "Rawat Jalan",
                    items: [{ name: "Poliklinik", href: "/poliklinik" }]
                }
            ]
        },
        { name: "Artikel", href: "/artikel" },
        { name: "Jadwal Dokter", href: "/anggota", icon: <Stethoscope className="size-4" /> },
        { name: "Login", href: "/login", isPrimary: true },
    ];

    const leftNavItems = navLinks.slice(0, 3);
    const rightNavItems = navLinks.slice(3);


    const [leftNavHovered, setLeftNavHovered] = useState<number | null>(null);
    const [rightNavHovered, setRightNavHovered] = useState<number | null>(null);
    const [layananHovered, setLayananHovered] = useState<number | null>(null);

    const navItemClasses = (isHovered: boolean, isActive: boolean, isPrimary = false) => cn(
        "relative z-10 transition-colors duration-300",
        isPrimary ? 'text-primary-foreground'
            : (isHovered || isActive ? 'text-white' : 'text-neutral-600')
    );

    const mobileMenuVariants = {
        hidden: { x: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
        visible: { x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    };

    return (
        <nav className="bg-[#f7f4eb] w-full flex items-center sticky top-0 justify-between z-20 px-4 md:px-10 lg:px-16 py-4">

            {/* Hamburger Menu & Logo (Mobile) */}
            <div className="flex items-center gap-4 md:hidden">
                <button onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed top-0 left-0 w-full h-screen bg-white z-50 p-6 md:hidden"
                    >
                        <div className="flex justify-between mb-8">
                            <div className="bg-orange-400 w-24 h-15 rounded-xl">
                            </div>
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <motion.ul
                            initial="hidden"
                            animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                            className="flex flex-col ml-1"
                        >
                            {navLinks.map((item, index) => (
                                <MobileNavItem key={item.name} item={item} delayIndex={index} />
                            ))}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Desktop Navigation (disembunyikan di mobile) */}
            <div className="hidden md:flex items-center gap-4 w-full">
                <NavigationMenu viewport={false}>
                    <NavigationMenuList
                        onMouseLeave={() => setLeftNavHovered(null)}
                        className="gap-1"
                    >
                        {leftNavItems.map((item, idx) => {
                            const isActive = item.href === pathname;
                            return (
                                <NavigationMenuItem key={item.name} className="relative" onMouseEnter={() => setLeftNavHovered(idx)}>
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
                                                <Link href={item.href || "#"} className={cn(navigationMenuTriggerStyle(), "bg-transparent  hover:bg-transparent focus:bg-transparent  hover:text-white transition-colors duration-300 ease-in-out", navItemClasses(leftNavHovered === idx, isActive))}>
                                                    {item.name}
                                                </Link>
                                            </NavigationMenuLink>
                                        )}
                                    </div>
                                    <NavigationMenuContent>
                                        <ul onMouseLeave={() => setLayananHovered(null)} className="grid w-[250px] gap-1 py-2">
                                            {(item.items || []).map((layananItem, layananIdx) => (
                                                <li key={layananItem.name} className="relative rounded-md" onMouseEnter={() => setLayananHovered(layananIdx)}>
                                                    {layananHovered === layananIdx && <motion.div layoutId="layananHover" className="absolute inset-0 h-full w-full rounded-md bg-orange-400" />}
                                                    <div className="relative z-10 ">
                                                        {layananItem.items ? (
                                                            <HoverCard openDelay={1} closeDelay={1}>
                                                                <HoverCardTrigger asChild >
                                                                    <div className="group/item flex cursor-pointer flex-row items-center justify-between py-2 px-3  text-sm text-neutral-600 transition-colors duration-300 ease-in-out hover:text-white">{layananItem.name}<ChevronRight className="transition-transform duration-200 group-hover/item:rotate-90" /></div>
                                                                </HoverCardTrigger>
                                                                <HoverCardContent side="right" sideOffset={5} align="start" className="flex flex-col ml-5 justify-center p-2 items-start">
                                                                    <NavItems items={(layananItem.items || []).map(sub => ({ name: sub.name!, link: sub.href! }))} className="flex-col rounded-md !items-start !space-x-0" />
                                                                </HoverCardContent>
                                                            </HoverCard>
                                                        ) : (
                                                            <Link href={layananItem.href || "#"} className="block w-full py-2 px-3  text-sm text-neutral-600 transition-colors duration-300 ease-in-out hover:text-white">{layananItem.name}</Link>
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            )
                        })}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="hidden md:flex items-center gap-7 w-full justify-end">
                <NavigationMenu viewport={false}>
                    <NavigationMenuList
                        onMouseLeave={() => setRightNavHovered(null)}
                        className="gap-1"
                    >
                        {rightNavItems.map((item, idx) => {
                            const isActive = item.href === pathname;
                            return (
                                <NavigationMenuItem key={item.name} className="relative" onMouseEnter={() => setRightNavHovered(idx)}>
                                    {(rightNavHovered === idx || isActive) && !item.isPrimary && (
                                        <motion.div
                                            layoutId="rightNavHover"
                                            className="absolute inset-0 h-full w-full rounded-md bg-orange-400"
                                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        />
                                    )}
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={item.href || "#"}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                "bg-transparent hover:bg-transparent focus:bg-transparent hover:text-white transition-colors duration-300 ease-in-out",
                                                item.isPrimary ? "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90" : "",
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