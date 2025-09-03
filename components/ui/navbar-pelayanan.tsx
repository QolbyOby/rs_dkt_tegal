"use client";
import { cn } from "@/lib/utils";
import {
    motion,
} from "motion/react";
import Link from "next/link";

import React, { ReactNode, useState } from "react";


interface NavItemsProps {
    items: {
        name: string;
        link?: string;
        icon?: ReactNode;
        className?: string;
    }[];
    className?: string;
}

export const NavItems = ({ items, className }: NavItemsProps) => {
    const [hovered, setHovered] = useState<number | null>(null);

    return (    
        <motion.div
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "inset-0 hidden flex-1 flex-col items-start justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
                className,
            )}
        >
            {items.map((item, idx) => (
                <Link
                    href={item.link || '#'}
                    onMouseEnter={() => setHovered(idx)}
                    className={cn(
                        "relative px-4 py-2 text-neutral-600 hover:text-white transition-colors duration-300 ease-in-out dark:text-neutral-300",
                        item.className
                    )}
                    key={`link-${idx}`}
                >
                    {hovered === idx && (
                        <motion.div
                            layoutId="hovered"
                            className={cn("absolute inset-0 h-full w-full rounded-full bg-orange-400  dark:bg-neutral-800", className)}
                        />
                    )}

                    <span className="relative z-20 flex items-center justify-center gap-2"> {item.icon} {item.name}</span>
                </Link>

            ))}
        </motion.div>
    );
};


// "use client";
// import { cn } from "@/lib/utils";
// import {
//     motion,
// } from "motion/react";
// import Link from "next/link";

// import React, { ReactNode, useState } from "react";


// interface NavItemsProps {
//     items: {
//         name: string;
//         link?: string;
//         icon?: ReactNode;
//         onItemClick?: () => void;
//     }[];
//     className?: string;

// }

// export const NavItems = ({ items, className }: NavItemsProps) => {
//     const [hovered, setHovered] = useState<number | null>(null);

//     return (
//         <motion.div
//             onMouseLeave={() => setHovered(null)}
//             className={cn(
//                 "inset-0 hidden flex-1 flex-col items-start justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
//                 className,
//             )}
//         >
//             {items.map((item, idx) => (
//                 <Link
//                     onMouseEnter={() => setHovered(idx)}
//                     onClick={item.onItemClick}
//                     className="relative px-4 py-2 text-neutral-600 hover:text-white transition-colors duration-300 ease-in-out  dark:text-neutral-300"
//                     key={`link-${idx}`}
//                     href={item.link || '#'}
//                 >
//                     {hovered === idx && (
//                         <motion.div
//                             layoutId="hovered"
//                             className="absolute inset-0 h-full w-full rounded-full bg-orange-400  dark:bg-neutral-800"
//                         />
//                     )}

//                     <span className="relative z-20 flex items-center justify-center gap-2"> {item.icon} {item.name}</span>
//                 </Link>

//             ))}
//         </motion.div>
//     );
// };

