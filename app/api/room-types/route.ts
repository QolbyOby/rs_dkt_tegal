// app/api/room-types/route.ts

import { db } from "@/lib/db";
import { roomTypes, rooms, NewRoomType, NewRoom } from "@/lib/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { eq, inArray } from "drizzle-orm";

// GET (Tidak berubah)
export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    try {
        // JIKA ADA PARAMETER ID, AMBIL SATU DATA
        if (id) {
            const roomType = await db.query.roomTypes.findFirst({
                where: eq(roomTypes.id, id),
                with: {
                    rooms: true,
                },
            });

            if (!roomType) {
                return NextResponse.json({ message: "Tipe kamar tidak ditemukan" }, { status: 404 });
            }
            return NextResponse.json(roomType);
        }

        // JIKA TIDAK ADA ID, AMBIL SEMUA DATA (LOGIKA LAMA)
        const allRoomTypes = await db.query.roomTypes.findMany({
            with: {
                rooms: true,
            },
        });
        return NextResponse.json(allRoomTypes);

    } catch (error) {
        console.error("Error fetching room types:", error);
        return NextResponse.json({ message: "Gagal mengambil data tipe kamar" }, { status: 500 });
    }
}

// POST (Tidak berubah)
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, price, facilities, images, rooms: individualRooms } = body;

        if (!name || !price) {
            return NextResponse.json({ message: "Nama dan harga tipe kamar tidak boleh kosong" }, { status: 400 });
        }

        const newRoomType = await db.transaction(async (tx) => {
            const newRoomTypeData: NewRoomType = {
                id: `roomtype-${nanoid(16)}`,
                name,
                price,
                facilities,
                images,
            };
            await tx.insert(roomTypes).values(newRoomTypeData);

            if (individualRooms && individualRooms.length > 0) {
                const newRoomsData: NewRoom[] = individualRooms.map((room: NewRoom) => ({
                    id: `room-${nanoid(16)}`,
                    name: room.name,
                    capacity: room.capacity,
                    status: 'available',
                    roomTypeId: newRoomTypeData.id,
                }));
                await tx.insert(rooms).values(newRoomsData);
            }

            return newRoomTypeData;
        });

        return NextResponse.json(newRoomType, { status: 201 });
    } catch (error) {
        console.error("Error creating room type:", error);
        return NextResponse.json({ message: "Gagal menambahkan tipe kamar" }, { status: 500 });
    }
}

// --- BARU: Fungsi PUT untuk Update ---
export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, name, price, facilities, images, rooms: individualRooms } = body;

        if (!id) {
            return NextResponse.json({ message: "ID Tipe Kamar dibutuhkan" }, { status: 400 });
        }

        await db.transaction(async (tx) => {
            // 1. Update data master tipe kamar
            await tx.update(roomTypes).set({
                name,
                price,
                facilities,
                images,
                updatedAt: new Date()
            }).where(eq(roomTypes.id, id));

            // 2. Hapus semua kamar yang ada untuk tipe ini agar mudah disinkronkan
            await tx.delete(rooms).where(eq(rooms.roomTypeId, id));

            // 3. Masukkan kembali daftar kamar yang baru
            if (individualRooms && individualRooms.length > 0) {
                const newRoomsData: NewRoom[] = individualRooms.map((room: NewRoom) => ({
                    id: `room-${nanoid(16)}`,
                    name: room.name,
                    capacity: room.capacity,
                    roomTypeId: id,
                }));
                await tx.insert(rooms).values(newRoomsData);
            }
        });

        // Selalu kembalikan respons JSON yang valid
        return NextResponse.json({ message: "Tipe kamar berhasil diperbarui" }, { status: 200 });

    } catch (error) {
        console.error("Error updating room type:", error);
        return NextResponse.json({ message: "Gagal memperbarui tipe kamar" }, { status: 500 });
    }
}

// --- BARU: Fungsi DELETE ---
export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({ message: "ID Tipe Kamar dibutuhkan" }, { status: 400 });
        }

        await db.transaction(async (tx) => {
            // Hapus semua kamar individual terlebih dahulu
            await tx.delete(rooms).where(eq(rooms.roomTypeId, id));
            // Kemudian hapus tipe kamarnya
            await tx.delete(roomTypes).where(eq(roomTypes.id, id));
        });

        // Selalu kembalikan respons JSON yang valid
        return NextResponse.json({ message: "Tipe kamar berhasil dihapus" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting room type:", error);
        return NextResponse.json({ message: "Gagal menghapus tipe kamar" }, { status: 500 });
    }
}