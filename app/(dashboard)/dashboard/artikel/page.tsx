'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Article } from "@/lib/db/schema";

export default function ArtikelPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchArticles() {
        setLoading(true);
        try {
            const response = await fetch('/api/artikel');
            if (response.ok) {
                const data = await response.json();
                setArticles(data);
            }
        } catch (error) {
            console.error("Gagal mengambil artikel:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchArticles();
    }, []);

    // Fungsi Hapus Artikel
    async function handleDelete(id: string) {
        if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
            try {
                const response = await fetch(`/api/artikel/`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id }),
                });

                if(response.ok) {
                    fetchArticles()
                } else {
                    const errorData = await response.json();
                    alert(`Gagal menghapus: ${errorData.message || 'Status tidak diketahui'}`);
                }
            } catch (error) {
                console.error("Gagal menghapus artikel:", error);
            }
        }
    }

    return (
        <div className="">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manajemen Artikel</h1>
                <Button asChild>
                    <Link href="/dashboard/add-artikel">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah Artikel Baru
                    </Link>
                </Button>
            </div>
            {loading ? (
                <div>Memuat data artikel...</div>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Artikel</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[40%]">Judul</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Tanggal Dibuat</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {articles.length > 0 ? (
                                    articles.map((article) => (
                                        <TableRow key={article.id}>
                                            <TableCell className="font-medium">{article.title}</TableCell>
                                            <TableCell>
                                                <Badge variant={article.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                                                    {article.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : '-'}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="icon" className="mr-2" asChild>
                                                    {/* Arahkan ke halaman edit dengan ID artikel */}
                                                    <Link href={`/dashboard/add-artikel?edit=${article.id}`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button variant="destructive" size="icon" onClick={() => handleDelete(article.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            Belum ada artikel.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )
            }

        </div>
    )
}