// app/api/admin/categories/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from '@/lib/db';
import { categories } from '@/lib/db/schema';
import { generateId, generateSlug } from '@/lib/utils';

export async function GET() {
    try {
        const categoriesList = await db.select().from(categories);
        return NextResponse.json(categoriesList);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'ADMIN')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { name, description } = await req.json();
        const slug = generateSlug(name);
        const id = generateId();

        await db.insert(categories).values({
            id,
            name,
            slug,
            description,
        });

        return NextResponse.json({ message: 'Category created successfully', id });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}


// // app/api/kategori/route.ts

// import { db } from "@/lib/db";
// import { categories, NewCategory } from "@/lib/db/schema";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { NextResponse } from "next/server";
// import { nanoid } from "nanoid";
// import { desc } from "drizzle-orm";

// // Mengambil semua kategori
// export async function GET() {
//     try {
//         const allCategories = await db.select().from(categories).orderBy(desc(categories.createdAt));
//         return NextResponse.json(allCategories);
//     } catch (error) {
//         console.error("Error fetching categories:", error);
//         return NextResponse.json({ message: "Gagal mengambil kategori" }, { status: 500 });
//     }
// }

// // Membuat kategori baru
// export async function POST(request: Request) {
//     const session = await getServerSession(authOptions);
//     if (!session?.user) {
//         return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     try {
//         const body = await request.json();
//         const { name, description } = body;

//         if (!name) {
//             return NextResponse.json({ message: "Nama kategori wajib diisi" }, { status: 400 });
//         }

//         const newCategory: NewCategory = {
//             id: `kategori-${nanoid(16)}`,
//             name,
//             slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
//             description: description || null, // Pastikan mengirim null jika kosong
//         };

//         const result = await db.insert(categories).values(newCategory).$returningId();

//         if (!result || result.length === 0) {
//             throw new Error("Gagal menyimpan data ke database, tidak ada hasil yang dikembalikan.");
//         }

//         return NextResponse.json(result[0], { status: 201 });

//     } catch (error) {
//         // Log galat (error) yang lebih detail di sisi server
//         console.error("Error creating category:", error);

//         // Kirim pesan galat (error) yang lebih deskriptif ke klien
//         return NextResponse.json({
//             message: "Gagal membuat kategori",
//             error: (error as Error).message // Mengirim pesan galat spesifik
//         }, { status: 500 });
//     }
// }