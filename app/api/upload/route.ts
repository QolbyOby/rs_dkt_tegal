// app/api/upload/route.ts

import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
        return NextResponse.json({ success: false, message: 'No file found' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Buat nama file yang unik untuk menghindari tumpang tindih
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;

    // Tentukan path untuk menyimpan file di dalam folder public
    const publicPath = path.join(process.cwd(), 'public', 'uploads', 'artikel');
    const filePath = path.join(publicPath, filename);

    try {
        // Tulis file ke sistem
        await writeFile(filePath, buffer);
        console.log(`File uploaded to ${filePath}`);

        // Kembalikan URL publik dari file tersebut
        const publicUrl = `/uploads/artikel/${filename}`;
        return NextResponse.json({ success: true, url: publicUrl });

    } catch (error) {
        console.error('Error saving file:', error);
        return NextResponse.json({ success: false, message: 'Error saving file' }, { status: 500 });
    }
}