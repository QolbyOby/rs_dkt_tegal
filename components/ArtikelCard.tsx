// components/ArtikelCard.tsx
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
import Link from 'next/link';

// Definisikan tipe props yang lebih sesuai
interface ArtikelCardProps {
    id: string;
    slug: string;
    imageUrl: string | StaticImageData;
    category: string;
    title: string;
    description: string;
}

export function ArtikelCard({
    id,
    slug,
    imageUrl,
    category,
    title,
    description,
}: ArtikelCardProps) {
    const readMoreLink = `/artikel/${slug}`;

    return (
        <div className="group relative w-full mt-10">
            <div className="absolute -z-10 h-full w-full rounded-lg bg-[#ff6400]" />
            <Card
                className="h-full w-full pt-0 overflow-hidden rounded-lg border-2 bg-card text-card-foreground shadow-md 
                   transition-transform duration-300 ease-in-out group-hover:translate-x-2 group-hover:-translate-y-2 flex flex-col"
            >
                <div className="relative h-48 w-full">
                    <Image
                        src={typeof imageUrl === 'string' ? imageUrl : imageUrl.src}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                    />
                    <Link
                        href={readMoreLink}
                        className="absolute top-4 left-4 inline-flex items-center bg-white px-4 py-2 rounded-md text-sm font-bold text-black hover:bg-opacity-90 transition-all"
                    >
                        Read More
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                </div>
                <CardContent className="flex flex-col flex-grow p-4">
                    <Badge
                        variant="default"
                        className="mb-3 bg-orange-500 text-sm font-semibold text-white hover:bg-gray-800 w-fit"
                    >
                        {category}
                    </Badge>
                    <CardTitle className="mb-2 text-xl font-bold tracking-tight">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 flex-grow">
                        {description}
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    );
}


// import React from 'react';
// import { ArrowRight } from 'lucide-react';

// import { Badge } from '@/components/ui/badge';
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardTitle,
// } from '@/components/ui/card';
// import Image, { StaticImageData } from 'next/image';

// interface LifestyleCardProps {
//     imageUrl: StaticImageData;
//     category: string;
//     title: string;
//     description: string;
//     readMoreLink?: string;
// }

// export function ArtikelCard({
//     imageUrl,
//     category,
//     title,
//     description,
//     readMoreLink = '#',
// }: LifestyleCardProps) {
//     return (
//         // 1. Pembungkus utama untuk efek hover
//         <div className="group relative w-[320px] mt-10">
//             <div className="absolute -z-10 h-full w-full rounded-lg bg-[#ff6400]" />
//             <Card
//                 className="h-full w-full pt-0 overflow-hidden rounded-lg border-2 bg-card text-card-foreground shadow-md
//                    transition-transform duration-300 ease-in-out group-hover:translate-x-2 group-hover:-translate-y-2"
//             >
//                 <div className="relative">
//                     <Image
//                         src={imageUrl}
//                         alt={title}
//                         className="h-48 w-full object-cover"
//                     />
//                     <a
//                         href={readMoreLink}
//                         className="absolute top-4 left-4 inline-flex items-center bg-white px-4 py-2 rounded-md text-sm font-bold text-black hover:bg-opacity-90 transition-all"
//                     >
//                         Read more
//                         <ArrowRight className="ml-1.5 h-4 w-4" />
//                     </a>
//                 </div>
//                 <CardContent className="">
//                     <Badge
//                         variant="default"
//                         className="mb-3 bg-black text-sm font-semibold text-white hover:bg-gray-800"
//                     >
//                         {category}
//                     </Badge>

//                     <CardTitle className="mb-2 text-2xl font-bold tracking-tight">
//                         {title}
//                     </CardTitle>

//                     <CardDescription className="mb-5 text-gray-600">
//                         {description}
//                     </CardDescription>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }