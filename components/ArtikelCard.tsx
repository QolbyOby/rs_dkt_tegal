import React from 'react';
import { ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui/card';
import Image, { StaticImageData } from 'next/image';

interface LifestyleCardProps {
    imageUrl: StaticImageData;
    category: string;
    title: string;
    description: string;
    readMoreLink?: string;
}

export function ArtikelCard({
    imageUrl,
    category,
    title,
    description,
    readMoreLink = '#',
}: LifestyleCardProps) {
    return (
        // 1. Pembungkus utama untuk efek hover
        <div className="group relative w-[300px] mt-10">
            <div className="absolute -z-10 h-full w-full rounded-lg bg-[#ff6400]" />
            <Card
                className="h-full w-full pt-0 overflow-hidden rounded-lg border-2 bg-card text-card-foreground shadow-md 
                   transition-transform duration-300 ease-in-out group-hover:translate-x-2 group-hover:-translate-y-2"
            >
                <Image
                    src={imageUrl}
                    alt={title}
                    className="h-48 w-full object-cover"
                />
                <CardContent className="p-6">
                    <Badge
                        variant="default"
                        className="mb-3 bg-black text-sm font-semibold text-white hover:bg-gray-800"
                    >
                        {category}
                    </Badge>

                    <CardTitle className="mb-2 text-2xl font-bold tracking-tight">
                        {title}
                    </CardTitle>

                    <CardDescription className="mb-5 text-gray-600">
                        {description}
                    </CardDescription>

                    <a
                        href={readMoreLink}
                        className="inline-flex items-center text-sm font-bold text-black hover:underline"
                    >
                        Read more
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                    </a>
                </CardContent>
            </Card>
        </div>
    );
}