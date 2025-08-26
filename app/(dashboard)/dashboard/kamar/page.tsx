// app/(dashboard)/dashboard/kamar/page.tsx

'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Room } from "@/lib/db/schema";

export default function KamarPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentRoom, setCurrentRoom] = useState<Partial<Room>>({});
    const [features, setFeatures] = useState<string[]>([]);

    async function fetchRooms() {
        setLoading(true);
        try {
            const response = await fetch('/api/kamar');
            if (response.ok) {
                const data = await response.json();
                setRooms(data);
            }
        } catch (error) {
            console.error("Gagal mengambil data kamar:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFeatures(e.target.value.split(',').map(item => item.trim()));
    };

    const handleSave = async () => {
        const method = currentRoom.id ? 'PUT' : 'POST';
        const roomData = { ...currentRoom, features };

        try {
            const response = await fetch('/api/kamar', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(roomData),
            });

            if (response.ok) {
                await fetchRooms();
                setIsDialogOpen(false);
            } else {
                const errorData = await response.json();
                alert(`Gagal menyimpan: ${errorData.message || 'Status tidak diketahui'}`);
            }
        } catch (error) {
            console.error("Gagal menyimpan data kamar:", error);
            alert("Terjadi kesalahan jaringan.");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus kamar ini?")) {
            try {
                const response = await fetch('/api/kamar', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id }),
                });

                if (response.ok) {
                    await fetchRooms();
                } else {
                    const errorData = await response.json();
                    alert(`Gagal menghapus: ${errorData.message || 'Status tidak diketahui'}`);
                }
            } catch (error) {
                console.error("Gagal menghapus data kamar:", error);
                alert("Terjadi kesalahan jaringan.");
            }
        }
    };


    if (loading) return <p>Memuat...</p>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manajemen Kamar</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => {
                            setCurrentRoom({});
                            setFeatures([]);
                        }}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Tambah Kamar
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{currentRoom.id ? 'Edit' : 'Tambah'} Kamar</DialogTitle>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                            <div className="grid gap-3">
                                <Label htmlFor="roomNumber">Nama Kamar</Label>
                                <Input id="roomNumber" value={currentRoom.roomNumber || ''} onChange={(e) => setCurrentRoom({ ...currentRoom, roomNumber: e.target.value })} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="type">Tipe Kamar</Label>
                                <Input id="type" value={currentRoom.type || ''} onChange={(e) => setCurrentRoom({ ...currentRoom, type: e.target.value })} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="status">Status</Label>
                                <Select 
                                    onValueChange={(value) => setCurrentRoom({ ...currentRoom, status: value as Room['status'] })} 
                                    value={currentRoom.status || ''}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="available">Tersedia</SelectItem>
                                        <SelectItem value="occupied">Terisi</SelectItem>
                                        <SelectItem value="maintenance">Perawatan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="price">Harga</Label>
                                <Input id="price" value={currentRoom.price || ''} onChange={(e) => setCurrentRoom({ ...currentRoom, price: e.target.value })} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="capacity">Kapasitas</Label>
                                <Input id="capacity" type="number" value={currentRoom.capacity || ''} onChange={(e) => setCurrentRoom({ ...currentRoom, capacity: parseInt(e.target.value) })} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="features">Fasilitas (pisahkan dengan koma)</Label>
                                <Input id="features" value={features.join(', ')} onChange={handleFeatureChange} />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Batal</Button>
                            </DialogClose>
                            <Button onClick={handleSave}>Simpan</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Kamar</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nomor Kamar</TableHead>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Harga</TableHead>
                                <TableHead>Kapasitas</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rooms.map((room) => (
                                <TableRow key={room.id}>
                                    <TableCell className="font-medium">{room.roomNumber}</TableCell>
                                    <TableCell>{room.type}</TableCell>
                                    <TableCell>{room.status}</TableCell>
                                    <TableCell>{room.price}</TableCell>
                                    <TableCell>{room.capacity}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="icon" className="mr-2" onClick={() => {
                                            setCurrentRoom(room);
                                            setFeatures(room.features ? JSON.parse(room.features) : []);
                                            setIsDialogOpen(true);
                                        }}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => handleDelete(room.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
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