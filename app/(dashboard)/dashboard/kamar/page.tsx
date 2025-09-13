// app/(dashboard)/dashboard/kamar/page.tsx

'use client'

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit, Trash2, Plus, XIcon, Eye, Bed, Users } from "lucide-react";
import { Room, RoomType } from "@/lib/db/schema";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Tipe data yang digabungkan untuk form
type RoomTypeWithRooms = Omit<RoomType, 'rooms' | 'images' | 'facilities'> & {
    rooms: Partial<Room>[];
    images: string[];
    facilities: string[];
};

const RoomDetailCard: React.FC<{ roomType: RoomType }> = ({ roomType }) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());
        api.on("select", () => setCurrent(api.selectedScrollSnap()));
    }, [api]);

    return (
        <div className="flex flex-col h-full">
            <CardHeader className="p-0">
                <div className='mt-4'>
                    <Carousel setApi={setApi} className="w-full group">
                        <CarouselContent>
                            {(roomType.images && roomType.images.length > 0) ? (
                                roomType.images.map((imageSrc, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-1">
                                            <Image
                                                src={imageSrc}
                                                alt={`${roomType.name} - Gambar ${index + 1}`}
                                                className='rounded-xl w-full h-auto object-cover aspect-video'
                                                width={800}
                                                height={450}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))
                            ) : (
                                <CarouselItem>
                                    <div className="p-1 flex items-center justify-center bg-secondary rounded-xl aspect-video">
                                        <p className="text-muted-foreground">Tidak ada gambar</p>
                                    </div>
                                </CarouselItem>
                            )}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity duration-300" />
                        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity duration-300" />
                    </Carousel>
                </div>
            </CardHeader>
            <CardContent className="flex-grow p-0 mt-4">
                <div className="space-y-6">
                    {roomType.rooms && roomType.rooms.length > 0 && (
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Daftar Ruangan</h4>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead><Bed className="w-4 h-4 inline-block mr-2" />Ruangan</TableHead>
                                        <TableHead><Users className="w-4 h-4 inline-block mr-2" />Kapasitas</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {roomType.rooms.map((room, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{room.name}</TableCell>
                                            <TableCell>{room.capacity} Orang</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                    <div>
                        <p className="text-md font-semibold mb-2">Fasilitas:</p>
                        <div className="flex flex-wrap gap-2">
                            {(roomType.facilities || []).map((facility, index) => (
                                <Badge key={index} variant="secondary" className='text-sm'>{facility}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </div>
    );
};


export default function KamarPage() {
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false); // State untuk dialog detail
    const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(null); // State untuk detail

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    // State untuk form
    const [currentRoomType, setCurrentRoomType] = useState<Partial<RoomTypeWithRooms>>({
        name: '', price: '', facilities: [], rooms: [], images: [],
    });

    async function fetchRoomTypes() {
        setLoading(true);
        try {
            const response = await fetch('/api/room-types');
            if (response.ok) {
                const data = await response.json();
                setRoomTypes(data);
            }
        } catch (error) {
            console.error("Gagal mengambil data tipe kamar:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRoomTypes();
    }, []);

    const resetFormState = () => {
        setCurrentRoomType({ name: '', price: '', facilities: [], rooms: [], images: [] });
        setNewFiles([]);
        setPreviewUrls([]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentRoomType(prev => ({ ...prev, [name]: value }));
    };

    const handleFacilitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const facilitiesArray = e.target.value.split(',').map(item => item.trim());
        setCurrentRoomType(prev => ({ ...prev, facilities: facilitiesArray }));
    };

    const addRoom = () => {
        setCurrentRoomType(prev => ({
            ...prev,
            rooms: [...(prev?.rooms || []), { name: '', capacity: 1, status: 'available' }]
        }));
    };

    const removeRoom = (index: number) => {
        setCurrentRoomType(prev => ({
            ...prev,
            rooms: prev?.rooms?.filter((_, i) => i !== index)
        }));
    };

    const handleRoomChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedRooms = [...(currentRoomType.rooms || [])];
        updatedRooms[index] = { ...updatedRooms[index], [name]: name === 'capacity' ? parseInt(value) || 0 : value };
        setCurrentRoomType(prev => ({ ...prev, rooms: updatedRooms }));
    };

    // --- LOGIKA GAMBAR BARU ---
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setNewFiles(prev => [...prev, file]);
            setPreviewUrls(prev => [...prev, URL.createObjectURL(file)]);
        }
    };

    const removeNewImage = (index: number) => {
        setNewFiles(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index: number) => {
        setCurrentRoomType(prev => ({
            ...prev,
            images: (prev.images || []).filter((_, i) => i !== index)
        }));
    };

    const handleSave = async () => {
        let uploadedImageUrls = [];

        if (newFiles.length > 0) {
            const uploadPromises = newFiles.map(file => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('path', 'kamar');
                return fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                }).then(res => {
                    if (!res.ok) throw new Error(`Gagal mengunggah ${file.name}`);
                    return res.json();
                });
            });

            try {
                const uploadResults = await Promise.all(uploadPromises);
                uploadedImageUrls = uploadResults.map(result => result.url);
            } catch (err) {
                alert(err instanceof Error ? err.message : 'Terjadi kesalahan saat upload');
                return;
            }
        }

        const finalImageUrls = [...(currentRoomType.images || []), ...uploadedImageUrls];
        const method = currentRoomType.id ? 'PUT' : 'POST';
        const roomTypeData = { ...currentRoomType, images: finalImageUrls };

        try {
            const response = await fetch('/api/room-types', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(roomTypeData),
            });

            if (response.ok) {
                await fetchRoomTypes();
                setIsFormDialogOpen(false);
            } else {
                const errorData = await response.json();
                alert(`Gagal menyimpan: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Gagal menyimpan data tipe kamar:", error);
            alert("Terjadi kesalahan jaringan.");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Anda yakin ingin menghapus tipe kamar ini beserta semua kamar di dalamnya?")) {
            try {
                const response = await fetch('/api/room-types', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id }),
                });

                if (response.ok) {
                    await fetchRoomTypes();
                } else {
                    const errorData = await response.json();
                    alert(`Gagal menghapus: ${errorData.message || 'Status tidak diketahui'}`);
                }
            } catch (error) {
                console.error("Gagal menghapus tipe kamar:", error);
                alert("Terjadi kesalahan jaringan.");
            }
        }
    };

    if (loading) return <p>Memuat...</p>;

    return (
        <div className="bg-[#f9f8f3]">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manajemen Tipe Kamar</h1>
                <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={resetFormState}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Tambah Tipe Kamar
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                        <DialogHeader>
                            <DialogTitle>{currentRoomType.id ? 'Edit' : 'Tambah'} Tipe Kamar</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                            {/* Kolom Kiri */}
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nama Tipe Kamar</Label>
                                    <Input id="name" name="name" value={currentRoomType.name || ''} onChange={handleInputChange} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Harga per Malam</Label>
                                    <Input id="price" name="price" value={currentRoomType.price || ''} onChange={handleInputChange} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="facilities">Fasilitas (pisahkan dengan koma)</Label>
                                    <Input id="facilities" value={(currentRoomType.facilities || []).join(', ')} onChange={handleFacilitiesChange} />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Gambar Kamar</Label>
                                    <Input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" />
                                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Tambah Gambar
                                    </Button>
                                    <div className="flex gap-2 mt-2 flex-wrap max-h-64  overflow-y-auto">
                                        {(currentRoomType.images || []).map((url, i) => (
                                            <div key={`current-${i}`} className="relative group">
                                                <Image src={url} alt="Gambar tersimpan" width={80} height={80} className="rounded object-cover" />
                                                <button onClick={() => removeExistingImage(i)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <XIcon size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        {previewUrls.map((url, i) => (
                                            <div key={`preview-${i}`} className="relative group">
                                                <Image src={url} alt="Pratinjau baru" width={80} height={80} className="rounded object-cover" />
                                                <button onClick={() => removeNewImage(i)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <XIcon size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Kolom Kanan */}
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label>Daftar Kamar Individual</Label>
                                    <Button size="sm" onClick={addRoom}><Plus className="h-4 w-4 mr-1" /> Tambah</Button>
                                </div>
                                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                                    {(currentRoomType.rooms || []).map((room, index) => (
                                        <div key={index} className="flex flex-col items-center gap-2 border p-2 rounded-md">
                                            <Input
                                                name="name"
                                                placeholder="Nama Kamar (e.g., Bougenville 1)"
                                                value={room.name || ''}
                                                onChange={(e) => handleRoomChange(index, e)}
                                                className="flex-grow"
                                            />
                                            <div className="w-full flex gap-2">
                                                <Input
                                                    name="capacity"
                                                    type="number"
                                                    placeholder="Kap."
                                                    value={room.capacity || ''}
                                                    onChange={(e) => handleRoomChange(index, e)}
                                                    className="w-20 flex-1"
                                                />
                                                <Button variant="destructive" size="icon" onClick={() => removeRoom(index)}>
                                                    <XIcon className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
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

            <Card className="bg-[#f9f8f3]">
                <CardHeader>
                    <CardTitle>Daftar Tipe Kamar</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Tipe</TableHead>
                                <TableHead>Harga</TableHead>
                                <TableHead>Jumlah Kamar</TableHead>
                                <TableHead>Jumlah Tempat Tidur</TableHead>
                                <TableHead className="text-end">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roomTypes.map((type) => (
                                <TableRow key={type.id}>
                                    <TableCell className="font-medium">{type.name}</TableCell>
                                    <TableCell>{type.price}</TableCell>
                                    <TableCell>{type.rooms.length}</TableCell>
                                    <TableCell>{type.rooms.reduce((total, room) => total + room.capacity, 0)}</TableCell>
                                    <TableCell className="text-end">
                                        {/* --- [BARU] Tombol untuk membuka popup detail --- */}
                                        <Button variant="outline" size="icon" className="mr-2" onClick={() => {
                                            setSelectedRoomType(type);
                                            setIsDetailDialogOpen(true);
                                        }}>
                                            <Eye className="h-4 w-4" />
                                        </Button>

                                        <Button variant="outline" size="icon" className="mr-2" onClick={() => {
                                            setCurrentRoomType({
                                                ...type,
                                                facilities: type.facilities || [],
                                                images: type.images || [],
                                                rooms: type.rooms || []
                                            });
                                            setNewFiles([]);
                                            setPreviewUrls([]);
                                            setIsFormDialogOpen(true);
                                        }}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => handleDelete(type.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
                <DialogContent className="max-w-4xl">
                    {selectedRoomType && (
                        <>
                            <DialogHeader>
                                <DialogTitle>{selectedRoomType.name}</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                                <RoomDetailCard roomType={selectedRoomType} />
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}