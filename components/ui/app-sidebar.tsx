"use client";

import { Bed, Calendar, ChevronUp, Home, Inbox, LogOut, Search, Settings, Stethoscope, User2 } from "lucide-react"
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { NavItems } from "./navbar-pelayanan";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Menu items.
const itemsSideBar = [
    {
        name: "Home",
        link: "/dashboard",
        icon: <Home className="h-5 w-5" />,
    },
    {
        name: "Kategori Artikel",
        link: "/dashboard/kategori",
        icon: <Inbox className="h-5 w-5" />,
    },
    {
        name: "Buat Artikel",
        link: "/dashboard/add-artikel",
        icon: <Calendar className="h-5 w-5" />,
    },
    {
        name: "Artikel",
        link: "/dashboard/artikel",
        icon: <Search className="h-5 w-5" />,
    },
    {
        name: "Manajemen Kamar",
        link: "/dashboard/kamar",
        icon: <Bed className="h-5 w-5" />,
    },
    {
        name: "Manajemen Dokter",
        link: "/dashboard/doctors",
        icon: <Stethoscope className="h-5 w-5" />,
    },
]


export function AppSidebar({ user }: { user: Session["user"] }) {

    const pathname = usePathname()
    console.log(pathname)

    return (
        <Sidebar>
            <SidebarContent className="bg-[#f9f8f3]">
                <SidebarGroup>
                    <SidebarGroupLabel className="h-40 w-full rounded-xl bg-[#ff6400] relative overflow-hidden">
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="mt-1">
                        <NavItems className="gap-1" items={itemsSideBar.map(item => ({
                            ...item,
                            className: pathname === item.link ? "bg-orange-400 text-white rounded-full" : ""
                        }))} />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> {user?.name}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <span>Account</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Billing</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button onClick={() => signOut()} variant="ghost" className="w-full justify-start">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}