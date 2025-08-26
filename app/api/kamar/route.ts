// app/api/kamar/route.ts

import { db } from "@/lib/db";
import { rooms, NewRoom } from "@/lib/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

// Mengambil semua data kamar
export async function GET() {
    try {
        const allRooms = await db.select().from(rooms);
        return NextResponse.json(allRooms);
    } catch (error) {
        console.error("Error fetching rooms:", error);
        return NextResponse.json({ message: "Gagal mengambil data kamar" }, { status: 500 });
    }
}

// Menambahkan kamar baru
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { roomNumber, type, status, price, capacity, features } = body;

        if (!roomNumber || !type || !price || !capacity) {
            return NextResponse.json({ message: "Data kamar tidak lengkap" }, { status: 400 });
        }

        const newRoom: NewRoom = {
            id: `kamar-${nanoid(16)}`,
            roomNumber,
            type,
            status,
            price,
            capacity,
            features: JSON.stringify(features),
        };

        await db.insert(rooms).values(newRoom);

        return NextResponse.json(newRoom, { status: 201 });
    } catch (error) {
        console.error("Error creating room:", error);
        return NextResponse.json({ message: "Gagal menambahkan kamar" }, { status: 500 });
    }
}

// Mengupdate data kamar
export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, roomNumber, type, status, price, capacity, features } = body;

        if (!id) {
            return NextResponse.json({ message: "ID kamar tidak ditemukan" }, { status: 400 });
        }

        const updatedRoom = {
            roomNumber,
            type,
            status,
            price,
            capacity,
            features: JSON.stringify(features),
        };

        await db.update(rooms).set(updatedRoom).where(eq(rooms.id, id));

        return NextResponse.json({ message: "Data kamar berhasil diupdate" });
    } catch (error) {
        console.error("Error updating room:", error);
        return NextResponse.json({ message: "Gagal mengupdate data kamar" }, { status: 500 });
    }
}

// Menghapus data kamar
export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({ message: "ID kamar tidak ditemukan" }, { status: 400 });
        }

        await db.delete(rooms).where(eq(rooms.id, id));

        return NextResponse.json({ message: "Kamar berhasil dihapus" });
    } catch (error) {
        console.error("Error deleting room:", error);
        return NextResponse.json({ message: "Gagal menghapus kamar" }, { status: 500 });
    }
}