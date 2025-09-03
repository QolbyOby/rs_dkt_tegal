// app/(dashboard)/dashboard/doctors/page.tsx

'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox"; // Asumsi Anda memiliki komponen Checkbox
import { PlusCircle, Edit, Trash2, Plus, Minus } from "lucide-react";
import { Doctor } from "@/lib/db/schema";
import Image from "next/image";

// Tipe untuk jadwal yang lebih terstruktur
type ScheduleGroup = { days: string[]; time: string };
const allDays = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentDoctor, setCurrentDoctor] = useState<Partial<Doctor>>({});
    const [schedules, setSchedules] = useState<ScheduleGroup[]>([{ days: [], time: '' }]);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    async function fetchDoctors() {
        setLoading(true);
        try {
            const response = await fetch('/api/doctors');
            if (response.ok) {
                const data = await response.json();
                setDoctors(data);
            }
        } catch (error) {
            console.error("Gagal mengambil data dokter:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    // Fungsi untuk menangani perubahan pada grup jadwal
    const handleScheduleGroupChange = (index: number, field: 'days' | 'time', value: string | string[]) => {
        const newSchedules = [...schedules];
        const scheduleToUpdate = { ...newSchedules[index] };

        if (field === 'days' && Array.isArray(value)) {
            scheduleToUpdate.days = value;
        } else if (field === 'time' && typeof value === 'string') {
            scheduleToUpdate.time = value;
        }

        newSchedules[index] = scheduleToUpdate;
        setSchedules(newSchedules);
    };

    const addScheduleGroup = () => {
        setSchedules([...schedules, { days: [], time: '' }]);
    };

    const removeScheduleGroup = (index: number) => {
        const newSchedules = schedules.filter((_, i) => i !== index);
        setSchedules(newSchedules);
    };

    const handleSave = async () => {
        let imageUrl = currentDoctor.imageUrl;

        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('path', 'doctors');
                const uploadResponse = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });
                if (!uploadResponse.ok) throw new Error('Gagal mengunggah gambar');
                const uploadResult = await uploadResponse.json();
                imageUrl = uploadResult.url;
            } catch (err) {
                alert(err instanceof Error ? err.message : 'Terjadi kesalahan saat upload');
                return;
            }
        }

        const method = currentDoctor.id ? 'PUT' : 'POST';
        const doctorData = { ...currentDoctor, schedules, imageUrl };

        try {
            const response = await fetch('/api/doctors', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(doctorData),
            });

            if (response.ok) {
                await fetchDoctors();
                setIsDialogOpen(false);
            } else {
                const errorData = await response.json();
                alert(`Gagal menyimpan: ${errorData.message || 'Status tidak diketahui'}`);
            }
        } catch (error) {
            console.error("Gagal menyimpan data dokter:", error);
            alert("Terjadi kesalahan jaringan.");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus data dokter ini?")) {
            try {
                const response = await fetch('/api/doctors', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id }),
                });

                if (response.ok) {
                    await fetchDoctors();
                } else {
                    const errorData = await response.json();
                    alert(`Gagal menghapus: ${errorData.message || 'Status tidak diketahui'}`);
                }
            } catch (error) {
                console.error("Gagal menghapus data dokter:", error);
                alert("Terjadi kesalahan jaringan.");
            }
        }
    };

    if (loading) return <p>Memuat...</p>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manajemen Dokter</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => {
                            setCurrentDoctor({});
                            setSchedules([{ days: [], time: '' }]);
                            setFile(null);
                            setPreviewUrl(null);
                        }}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Tambah Dokter
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>{currentDoctor.id ? 'Edit' : 'Tambah'} Dokter</DialogTitle>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Nama Dokter</Label>
                                <Input id="name" value={currentDoctor.name || ''} onChange={(e) => setCurrentDoctor({ ...currentDoctor, name: e.target.value })} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="category">Kategori</Label>
                                <Select onValueChange={(value) => setCurrentDoctor({ ...currentDoctor, category: value as Doctor['category'] })} value={currentDoctor.category}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="umum">Dokter Umum</SelectItem>
                                        <SelectItem value="spesialis">Dokter Spesialis</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {currentDoctor.category == "spesialis" && (
                                <>
                                    <div className="grid gap-3">
                                        <Label htmlFor="specialistName">Nama Spesialis</Label>
                                        <Input
                                            id="specialistName"
                                            placeholder="Contoh: Jantung, Anak, Kulit"
                                            value={currentDoctor.specialistName || ""}
                                            onChange={(e) =>
                                                setCurrentDoctor({ ...currentDoctor, specialistName: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="grid gap-3 max-h-52 overflow-y-auto">
                                        <Label>Jadwal Praktik</Label>
                                        {schedules.map((group, index) => (
                                            <div key={index} className="p-4 border rounded-lg space-y-3">
                                                <div className="flex flex-wrap gap-4">
                                                    {allDays.map(day => (
                                                        <div key={day} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`${day}-${index}`}
                                                                checked={group.days.includes(day)}
                                                                onCheckedChange={(checked) => {
                                                                    const newDays = checked
                                                                        ? [...group.days, day]
                                                                        : group.days.filter(d => d !== day);
                                                                    handleScheduleGroupChange(index, 'days', newDays);
                                                                }}
                                                            />
                                                            <Label htmlFor={`${day}-${index}`}>{day}</Label>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        placeholder="Contoh: 08:00 - 12:00"
                                                        value={group.time}
                                                        onChange={(e) => handleScheduleGroupChange(index, 'time', e.target.value)}
                                                    />
                                                    <Button type="button" variant="destructive" size="icon" onClick={() => removeScheduleGroup(index)}><Minus className="h-4 w-4" /></Button>
                                                </div>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" onClick={addScheduleGroup}><Plus className="mr-2 h-4 w-4" /> Tambah Grup Jadwal</Button>
                                    </div>
                                </>
                            )}


                            <div className="grid gap-3">
                                <Label htmlFor="imageUrl">Foto Dokter</Label>
                                <Input id="imageUrl" type="file" onChange={handleFileChange} />
                                {previewUrl && <Image src={previewUrl} alt="Preview" width={100} height={100} />}
                                {!previewUrl && currentDoctor.imageUrl && <Image src={currentDoctor.imageUrl} alt="Current" width={100} height={100} />}
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
                    <CardTitle>Daftar Dokter</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Nama Spesialis</TableHead>
                                <TableHead>Jadwal</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {doctors.map((doctor) => (
                                <TableRow key={doctor.id}>
                                    <TableCell className="font-medium">{doctor.name}</TableCell>
                                    <TableCell>{doctor.category}</TableCell>
                                    <TableCell>{!doctor.specialistName ? "-" : doctor.specialistName}</TableCell>
                                    <TableCell>
                                        {doctor.schedules ? (JSON.parse(doctor.schedules as string) as ScheduleGroup[]).map((group, i) => (
                                            <span key={i}>
                                                {group.days.join(', ')} : {group.time}
                                                {i < (JSON.parse(doctor.schedules as string) as ScheduleGroup[]).length - 1 ? '; ' : ' '}
                                            </span>
                                        )) : null}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="icon" className="mr-2" onClick={() => {
                                            setCurrentDoctor(doctor);
                                            setSchedules(doctor.schedules ? JSON.parse(doctor.schedules as string) : [{ day: '', time: '' }]);
                                            setFile(null);
                                            setPreviewUrl(doctor.imageUrl || null);
                                            setIsDialogOpen(true);
                                        }}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => handleDelete(doctor.id)}>
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