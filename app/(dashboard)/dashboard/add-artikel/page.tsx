'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/lib/db/schema";
import { UploadCloud, Loader2 } from "lucide-react"; // Import Loader2
import { FileUpload } from "@/components/ui/file-uploaf";

export default function AddArtikelPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const articleId = searchParams.get('edit');

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingData, setIsFetchingData] = useState(true); // State baru untuk loading data
    const [error, setError] = useState('');

    const isEditMode = Boolean(articleId);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/kategori');
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
                }
            } catch (err) {
                console.error("Gagal mengambil kategori:", err);
                setError("Tidak dapat memuat daftar kategori.");
            }
        };
        fetchCategories();
    }, []);

    // Fetch article data if in edit mode
    useEffect(() => {
        if (isEditMode) {
            setIsFetchingData(true); // Mulai loading
            const fetchArticleData = async () => {
                try {
                    const res = await fetch(`/api/artikel?id=${articleId}`);
                    if (!res.ok) throw new Error("Artikel tidak ditemukan");
                    const data = await res.json();
                    setTitle(data.title || '');
                    setContent(data.content || '');
                    setStatus(data.status || 'DRAFT');
                    setSelectedCategory(data.categoryId || '');
                    setCurrentImageUrl(data.Image || null);
                } catch (err) {
                    setError(err instanceof Error ? err.message : "Gagal memuat data artikel.");
                } finally {
                    setIsFetchingData(false); // Selesai loading
                }
            };
            fetchArticleData();
        } else {
            setIsFetchingData(false); // Tidak perlu loading jika bukan mode edit
        }
    }, [isEditMode, articleId]);

    const handleFileChange = (files: File[]) => {
        if (files.length > 0) {
            setFile(files[0]);
            setCurrentImageUrl(null); // Hapus gambar lama jika ada
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategory) {
            setError("Silakan pilih kategori terlebih dahulu.");
            return;
        }
        setIsLoading(true);
        setError('');

        let imageUrl = currentImageUrl;

        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('path', 'artikel');
                const uploadResponse = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });
                if (!uploadResponse.ok) throw new Error('Gagal mengunggah gambar');
                const uploadResult = await uploadResponse.json();
                imageUrl = uploadResult.url;
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat upload');
                setIsLoading(false);
                return;
            }
        }

        const articleData = {
            id: articleId,
            title,
            content,
            status,
            categoryId: selectedCategory,
            Image: imageUrl,
        };

        try {
            const response = await fetch('/api/artikel', {
                method: isEditMode ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(articleData),
            });
            if (!response.ok) throw new Error(isEditMode ? 'Gagal memperbarui artikel' : 'Gagal menyimpan artikel');

            router.push('/dashboard/artikel');
            router.refresh();

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetchingData) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Memuat data artikel...</span>
            </div>
        );
    }

    return (
        <div className="">
            <h1 className="text-3xl font-bold mb-6">{isEditMode ? 'Edit Artikel' : 'Buat Artikel Baru'}</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Formulir Artikel</CardTitle>
                    <CardDescription>Isi detail artikel di bawah ini.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6">
                        {/* Image Upload Section */}
                        <div className="space-y-2 flex-1">
                            <Label>Gambar Utama</Label>
                            {currentImageUrl && !file ? (
                                <div className="relative w-full h-[350px]">
                                    <Image src={currentImageUrl} alt="Gambar Saat Ini" layout="fill" objectFit="cover" className="rounded-md" />
                                </div>
                            ) : (
                                <FileUpload onChange={handleFileChange} />
                            )}
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Judul Artikel</Label>
                                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Konten</Label>
                                <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required className="w-full min-h-[200px] p-2 border rounded-md" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Kategori</Label>
                                    <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(cat => (
                                                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select onValueChange={(value: 'DRAFT' | 'PUBLISHED') => setStatus(value)} value={status}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="DRAFT">Draft</SelectItem>
                                            <SelectItem value="PUBLISHED">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => router.back()}>Batal</Button>
                                <Button type="submit" disabled={isLoading}>{isLoading ? (isEditMode ? 'Memperbarui...' : 'Menyimpan...') : (isEditMode ? 'Perbarui Artikel' : 'Simpan Artikel')}</Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}



// 'use client'

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Category } from "@/lib/db/schema";
// import { UploadCloud } from "lucide-react";

// export default function AddArtikelPage() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const articleId = searchParams.get('edit');

//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [selectedCategory, setSelectedCategory] = useState('');

//     // State untuk file dan pratinjau gambar
//     const [file, setFile] = useState<File | null>(null);
//     const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');

//     const isEditMode = Boolean(articleId);

//     // Fetch categories on component mount
//     useEffect(() => {
//         const fetchCategories = async () => {
//             const res = await fetch('/api/kategori');
//             if (res.ok) {
//                 const data = await res.json();
//                 setCategories(data);
//             }
//         };
//         fetchCategories();
//     }, []);

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const selectedFile = e.target.files?.[0];
//         if (selectedFile) {
//             setFile(selectedFile);
//             setPreviewUrl(URL.createObjectURL(selectedFile));
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!selectedCategory) {
//             setError("Silakan pilih kategori terlebih dahulu.");
//             return;
//         }
//         setIsLoading(true);
//         setError('');

//         let imageUrl = null;

//         // 1. Upload gambar jika ada file yang dipilih
//         if (file) {
//             try {
//                 const formData = new FormData();
//                 formData.append('file', file);

//                 formData.append('path', 'artikel');
//                 const uploadResponse = await fetch('/api/upload', {
//                     method: 'POST',
//                     body: formData,
//                 });

//                 if (!uploadResponse.ok) {
//                     throw new Error('Gagal mengunggah gambar');
//                 }
//                 const uploadResult = await uploadResponse.json();
//                 imageUrl = uploadResult.url;
//             } catch (err) {
//                 setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat upload');
//                 setIsLoading(false);
//                 return;
//             }
//         }

//         // 2. Simpan data artikel beserta URL gambar
//         const articleData = {
//             title,
//             content,
//             status,
//             categoryId: selectedCategory,
//             Image: imageUrl, // Kirim URL gambar ke API artikel
//         };

//         try {
//             const response = await fetch('/api/artikel', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(articleData),
//             });

//             if (!response.ok) {
//                 throw new Error('Gagal menyimpan artikel');
//             }

//             router.push('/dashboard/artikel');
//             router.refresh();
//         } catch (err) {
//             setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="">
//             <h1 className="text-3xl font-bold mb-6">{isEditMode ? 'Edit Artikel' : 'Buat Artikel Baru'}</h1>
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Formulir Artikel</CardTitle>
//                     <CardDescription>Isi detail artikel di bawah ini.</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form onSubmit={handleSubmit} className="flex gap-3">
//                         {/* Image Upload Section */}
//                         <div className="space-y-2 flex-1">
//                             <Label>Gambar Utama</Label>
//                             <div className="w-full h-[350px] border-2 border-dashed rounded-md flex items-center justify-center text-center">

//                                 {previewUrl ? (
//                                     <div className="relative w-full h-full">
//                                         <Image src={previewUrl} alt="Pratinjau Gambar" layout="fill" objectFit="cover" className="rounded-md" />
//                                     </div>
//                                 ) : (
//                                     <div className="flex flex-col items-center gap-2 text-muted-foreground">
//                                         <UploadCloud className="h-10 w-10" />
//                                         <span>Tarik & Lepas atau Klik untuk Memilih Gambar</span>
//                                         <Input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
//                                         <Label htmlFor="file-upload" className="cursor-pointer text-primary underline">Pilih File</Label>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="flex-1 space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="title">Judul Artikel</Label>
//                                 <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="content">Konten</Label>
//                                 <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required className="w-full min-h-[200px] p-2 border rounded-md" />
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div className="space-y-2">
//                                     <Label htmlFor="category">Kategori</Label>
//                                     <Select  onValueChange={setSelectedCategory} value={selectedCategory}>
//                                         <SelectTrigger className="w-full">

//                                             <SelectValue placeholder="Pilih kategori" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             {categories.map(cat => (
//                                                 <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
//                                             ))}
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="status">Status</Label>
//                                     <Select onValueChange={(value: 'DRAFT' | 'PUBLISHED') => setStatus(value)} defaultValue={status}>
//                                         <SelectTrigger className="w-full">
//                                             <SelectValue placeholder="Pilih status" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             <SelectItem value="DRAFT">Draft</SelectItem>
//                                             <SelectItem value="PUBLISHED">Published</SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                             </div>
//                             {error && <p className="text-sm text-red-500">{error}</p>}
//                             <div className="flex justify-end gap-2">
//                                 <Button type="button" variant="outline" onClick={() => router.back()}>Batal</Button>
//                                 <Button type="submit" disabled={isLoading}>{isLoading ? 'Menyimpan...' : 'Simpan Artikel'}</Button>
//                             </div>
//                         </div>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }