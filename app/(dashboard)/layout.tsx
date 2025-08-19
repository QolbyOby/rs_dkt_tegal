// app/(dashboard)/layout.tsx

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <SidebarProvider>
            {/* Teruskan hanya objek user dari sesi */}
            <AppSidebar user={session.user} />
            <main className="p-4 w-full">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}