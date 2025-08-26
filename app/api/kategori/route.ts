// app/api/admin/categories/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from '@/lib/db';
import { categories } from '@/lib/db/schema';
import { generateId, generateSlug } from '@/lib/utils';
import { eq } from 'drizzle-orm';
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

export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'ADMIN')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id, name, description } = await req.json();
        const slug = generateSlug(name);

        await db.update(categories)
            .set({
                name,
                slug,
                description,
            })
            .where(eq(categories.id, id));

        return NextResponse.json({ message: 'Category updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'ADMIN')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await req.json();

        await db.delete(categories)
            .where(eq(categories.id, id));

        return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
