"use client"
import { useState } from 'react'

import { Product } from '@prisma/client';
import { centsToDollars } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import ZoomedImage from '@/components/ZoomedImage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"


const ProductCheckout = ({ product }: { product: Product }) => {
    const [selectedSIze, setSelectedSIze] = useState<string | null>(null);

    return (
        <div className='flex flex-col md:flex-row gap-5'>
            <ZoomedImage imgSrc={product?.image} />

            <div className='w-full'>
                <h1 className='text-2xl md:text-4xl font-bold'>{product?.name}</h1>

                <p className='text-muted-foreground text-base'>$ {centsToDollars(product?.price)}</p>

                <Label className='mt-5 inline-block'>Size</Label>

                <Select onValueChange={setSelectedSIze}>
                    <SelectTrigger className="w-[180px] focus:ring-0">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="md">Medium</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                    </SelectContent>
                </Select>

                <Button
                    className='mt-5 text-white px-5 py-2 rounded-md'
                    size={'sm'}
                    onClick={() => alert("Bought " + selectedSIze)}
                >
                    Buy Now
                </Button>
            </div>
        </div>
    )
}

export default ProductCheckout