import Link from 'next/link'

import { centsToDollars, cn } from '@/lib/utils'
import { DollarSign } from 'lucide-react'
import { buttonVariants } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import ZoomedImage from './ZoomedImage'
import { Product } from '@prisma/client'


const SuggestedProduct = ({ product }: { product: Product }) => {
    return (
        <Card className='flex flex-col'>
            <CardHeader className='py-2 px-2 flex flex-row items-center justify-between space-y-0 pb-0'>
                <CardTitle className='text-sm font-medium'>
                    <p className='w-28 text-ellipsis overflow-hidden text-nowrap'>{product.name}</p>
                </CardTitle>

                <div className='flex items-center'>
                    <DollarSign className='inline h-4 w-4 text-muted-foreground' />
                    <span className='text-sm'>{centsToDollars(product.price)}</span>
                </div>
            </CardHeader>

            <CardContent className='flex flex-col flex-1 gap-2 p-2'>
                <ZoomedImage imgSrc={product.image} className='h-52' />
                <div className='flex justify-center mt-auto'>
                    <Link href={`/merch/${product.id}`} className={cn("w-full", buttonVariants({ size: "sm" }))}>
                        Buy
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default SuggestedProduct