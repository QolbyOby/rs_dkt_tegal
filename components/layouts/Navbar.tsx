'use client'

import Link from "next/link";
import { Camera, Stethoscope } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { Menubar, MenubarContent, MenubarItem } from "../ui/menubar";

export default function Navbar() {
    return (
        <nav className="bg-gradient-to-r from-white/20 via-white/10 to-white/20  backdrop-blur-md border-b border-white/20 shadow-md w-full flex items-center sticky top-0  justify-between z-10"
            style={{ paddingLeft: '60px', paddingRight: '60px', paddingTop: '15px', paddingBottom: '15px' }}>
            <div className="flex items-center gap-4 w-full">
                <NavigationMenu viewport={false}>
                    <NavigationMenuList className="gap-4">
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} border`}>
                                <Link href={"/"}>Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} border`}>
                                <Link href={"/profil"}>Profil</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="border">
                                Layanan
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="w-[200px]">
                                    <li className="flex flex-col gap-2">
                                        <NavigationMenuLink
                                            asChild
                                            className="px-2 py-1 rounded-sm transition-all duration-200 ease-in-out hover:bg-black/20"
                                        >
                                            <Link href="/IGD">IDG 24 Jam</Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink
                                            asChild
                                            className="px-2 py-1 rounded-sm transition-all duration-200 ease-in-out hover:bg-black/20"
                                        >
                                            <Link href="#">Farmasi 24 Jam</Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink
                                            asChild
                                            className="px-2 py-1 rounded-sm transition-all duration-200 ease-in-out hover:bg-black/20"
                                        >
                                            <Link href="#">Laboratorium 24 Jam</Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink
                                            asChild
                                            className="px-2 py-1 rounded-sm transition-all duration-200 ease-in-out hover:bg-black/20"
                                        >
                                            <Link href="#">Medical Chek Up</Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink
                                            asChild
                                            className="px-2 py-1 rounded-sm transition-all duration-200 ease-in-out hover:bg-black/20"
                                        >
                                            <Link href="#">Radiologi</Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink
                                            asChild
                                            className="px-2 py-1 rounded-sm transition-all duration-200 ease-in-out hover:bg-black/20"
                                        >
                                            <Link href="/poliklinik">Poliklinik</Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="border">
                                Fasilitas
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="w-[200px]">
                                    <li className="flex flex-col gap-2">
                                        <NavigationMenuLink
                                            asChild
                                            className="px-2 py-1 rounded-sm transition-all duration-200 ease-in-out hover:bg-black/20"
                                        >
                                            <Link href="#">Components</Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink
                                            asChild
                                            className="px-2 py-1 rounded-sm transition-all duration-200 ease-in-out hover:bg-black/20"
                                        >
                                            <Link href="#">Documentation</Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink
                                            asChild
                                            className="px-2 py-1 rounded-sm transition-all duration-200 ease-in-out hover:bg-black/20"
                                        >
                                            <Link href="#">Blocks</Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>


                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="flex items-center gap-7 w-full justify-end">
                <NavigationMenu viewport={false}>
                    <NavigationMenuList className="gap-4">
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} border`}>
                                <Link href={"/kamar"}>Informasi Kamar</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} border`}>
                                <Link href={"/artikel"}>Artikel</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} border`}>
                                <Link href={"/anggota"} className="gap-2">
                                    <Stethoscope className="size-4" />
                                    Jadwal Dokter
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} bg-primary text-primary-foreground shadow-xs`}>
                                <Link href={"/login"}>Login</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav>
    )
}