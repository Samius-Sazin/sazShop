"use client"
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { useState } from 'react';


const ZoomedImage = ({ className, imgSrc }: { className?: string, imgSrc: string }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = (e.target as HTMLDivElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setMousePosition({ x, y });
    }

    return (
        <div className={cn("w-full relative overflow-hidden h-96", className)} onMouseMove={(e) => handleMouseMove(e)}>
            <Image
                src={imgSrc}
                alt="product image"
                fill
                sizes="(max-height: 392px) 100vw, 33vw"
                style={{
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                }}
                className="cursor-zoom-in hover:scale-[3] rounded-md transition-transform duration-500 ease-in-out"
            />
        </div>
    )
}

export default ZoomedImage