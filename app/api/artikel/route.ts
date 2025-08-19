// app/api/artikel/route.ts

import { db } from "@/lib/db";
import { articles, NewArticle } from "@/lib/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

// Mengambil semua artikel
export async function GET() {
    try {
        const allArticles = await db.select().from(articles);
        return NextResponse.json(allArticles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        return NextResponse.json({ message: "Gagal mengambil artikel" }, { status: 500 });
    }
}

// Membuat artikel baru
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        // Tambahkan 'Image' untuk ditangkap dari body
        const { title, content, status, categoryId, Image } = body;

        if (!title || !content || !categoryId) {
            return NextResponse.json({ message: "Judul, konten, dan kategori wajib diisi" }, { status: 400 });
        }

        const newArticle: NewArticle = {
            id: `artikel-${nanoid(16)}`,
            title,
            slug: title.toLowerCase().replace(/\s+/g, '-'),
            content,
            status,
            categoryId,
            authorId: session.user.id,
            publishedAt: status === 'PUBLISHED' ? new Date() : null,
            // Tambahkan field Image di sini
            Image: Image || null,
        };

        await db.insert(articles).values(newArticle);

        return NextResponse.json(newArticle, { status: 201 });
    } catch (error) {
        console.error("Error creating article:", error);
        return NextResponse.json({ message: "Gagal membuat artikel" }, { status: 500 });
    }
}