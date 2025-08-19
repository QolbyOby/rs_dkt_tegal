'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    createdAt: string;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });



    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/kategori');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/kategori', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setDialogOpen(false);
                setFormData({ name: '', description: '' });
                fetchCategories();
            } else {
                alert('Failed to create category');
            }
        } catch (error) {
            console.error('Failed to create category:', error);
        }
    };

    const deleteCategory = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;

        try {
            await fetch(`/api/kategori/${id}`, {
                method: 'DELETE',
            });
            fetchCategories();
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                    <p className="text-gray-600">Manage article categories</p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Category</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className='grid gap-3'>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className='grid gap-3'>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    rows={3}
                                />
                            </div>
                            <Button type="submit">Create Category</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Categories</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">{category.name}</TableCell>
                                    <TableCell>{category.slug}</TableCell>
                                    <TableCell>{category.description || '-'}</TableCell>
                                    <TableCell>
                                        {new Date(category.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => deleteCategory(category.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}







// 'use client'

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { PlusCircle, Edit, Trash2 } from "lucide-react";
// import { Category } from "@/lib/db/schema";

// export default function KategoriPage() {
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [currentCategory, setCurrentCategory] = useState<Partial<Category>>({});

//     async function fetchCategories() {
//         setLoading(true);
//         try {
//             const response = await fetch('/api/kategori');
//             if (response.ok) {
//                 const data = await response.json();
//                 setCategories(data);
//             }
//         } catch (error) {
//             console.error("Gagal mengambil kategori:", error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     const handleSave = async () => {
//         // TODO: Tambahkan logika untuk edit (PUT)
//         try {
//             const response = await fetch('/api/kategori', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(currentCategory),
//             });

//             // PERBAIKAN: Pindahkan pemanggilan fetchCategories ke dalam blok if (response.ok)
//             if (response.ok) {
//                 // Muat ulang data hanya setelah konfirmasi sukses
//                 await fetchCategories();
//                 setIsDialogOpen(false);
//             } else {
//                 const errorData = await response.json();
//                 alert(`Gagal menyimpan: ${errorData.message || 'Status tidak diketahui'}`);
//             }
//         } catch (error) {
//             console.error("Gagal menyimpan kategori:", error);
//             alert("Terjadi kesalahan jaringan.");
//         }
//     };

//     // TODO: Buat fungsi untuk handle hapus

//     if (loading) return <p>Memuat...</p>;

//     return (
//         <div>
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold">Manajemen Kategori</h1>
//                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                     <DialogTrigger asChild>
//                         <Button onClick={() => setCurrentCategory({})}>
//                             <PlusCircle className="mr-2 h-4 w-4" />
//                             Tambah Kategori
//                         </Button>
//                     </DialogTrigger>
//                     <DialogContent>
//                         <DialogHeader>
//                             <DialogTitle>{currentCategory.id ? 'Edit' : 'Tambah'} Kategori</DialogTitle>
//                         </DialogHeader>
//                         <div className="py-4 space-y-4">
//                             <div className="grid gap-3">
//                                 <Label htmlFor="name">Nama Kategori</Label>
//                                 <Input id="name" value={currentCategory.name || ''} onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })} />
//                             </div>
//                             <div className="grid gap-3">
//                                 <Label htmlFor="description">Deskripsi</Label>
//                                 <textarea id="description" value={currentCategory.description || ''} onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })} className="w-full p-2 border rounded-md" />
//                             </div>
//                         </div>
//                         <DialogFooter>
//                             <DialogClose asChild>
//                                 <Button variant="outline">Batal</Button>
//                             </DialogClose>
//                             <Button onClick={handleSave}>Simpan</Button>
//                         </DialogFooter>
//                     </DialogContent>
//                 </Dialog>
//             </div>

//             <Card>
//                 <CardHeader>
//                     <CardTitle>Daftar Kategori</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <Table>
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead className="w-[30%]">Nama</TableHead>
//                                 <TableHead>Deskripsi</TableHead>
//                                 <TableHead className="text-right">Aksi</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {categories.map((cat) => (
//                                 <TableRow key={cat.id}>
//                                     <TableCell className="font-medium">{cat.name}</TableCell>
//                                     <TableCell>{cat.description}</TableCell>
//                                     <TableCell className="text-right">
//                                         <Button variant="outline" size="icon" className="mr-2" onClick={() => {
//                                             setCurrentCategory(cat);
//                                             setIsDialogOpen(true);
//                                         }}>
//                                             <Edit className="h-4 w-4" />
//                                         </Button>
//                                         <Button variant="destructive" size="icon">
//                                             <Trash2 className="h-4 w-4" />
//                                         </Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }