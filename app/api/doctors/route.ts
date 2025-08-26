// app/api/doctors/route.ts

import { db } from "@/lib/db";
import { doctors, NewDoctor } from "@/lib/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

// Mengambil semua data dokter
export async function GET() {
    try {
        const allDoctors = await db.select().from(doctors);
        return NextResponse.json(allDoctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return NextResponse.json({ message: "Gagal mengambil data dokter" }, { status: 500 });
    }
}

// Menambahkan dokter baru
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, category, specialistName, schedules, imageUrl } = body;


        if (!name || !category || !schedules || schedules.length === 0) {
            return NextResponse.json({ message: "Data dokter tidak lengkap" }, { status: 400 });
        }

        const newDoctor: NewDoctor = {
            id: `dokter-${nanoid(16)}`,
            name,
            category,
            specialistName,
            schedules: JSON.stringify(schedules), // Simpan sebagai JSON string
            imageUrl,
        };

        await db.insert(doctors).values(newDoctor);

        return NextResponse.json(newDoctor, { status: 201 });
    } catch (error) {
        console.error("Error creating doctor:", error);
        return NextResponse.json({ message: "Gagal menambahkan dokter" }, { status: 500 });
    }
}

// Mengupdate data dokter
export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, name, category, specialistName, schedules, imageUrl } = body;


        if (!id) {
            return NextResponse.json({ message: "ID dokter tidak ditemukan" }, { status: 400 });
        }

        const updatedDoctor = {
            name,
            category,
            specialistName,
            schedules: JSON.stringify(schedules), // Simpan sebagai JSON string
            imageUrl,
        };

        await db.update(doctors).set(updatedDoctor).where(eq(doctors.id, id));

        return NextResponse.json({ message: "Data dokter berhasil diupdate" });
    } catch (error) {
        console.error("Error updating doctor:", error);
        return NextResponse.json({ message: "Gagal mengupdate data dokter" }, { status: 500 });
    }
}

// Menghapus data dokter
export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({ message: "ID dokter tidak ditemukan" }, { status: 400 });
        }

        await db.delete(doctors).where(eq(doctors.id, id));

        return NextResponse.json({ message: "Dokter berhasil dihapus" });
    } catch (error) {
        console.error("Error deleting doctor:", error);
        return NextResponse.json({ message: "Gagal menghapus dokter" }, { status: 500 });
    }
}