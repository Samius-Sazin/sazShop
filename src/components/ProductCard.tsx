import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { DollarSign } from 'lucide-react'
import { centsToDollars, cn } from '@/lib/utils'
import ZoomedImage from './ZoomedImage'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'

const ProductCard = ({ product, adminView = false }: { product: any, adminView?: boolean }) => {

    return (
        <Card className='flex flex-col'>
            <CardHeader className=' px-6 flex flex-row items-center justify-between space-y-0 pb-0'>
                <CardTitle className='text-lg font-medium'>{product.name}</CardTitle>
                <div className=''>
                    <DollarSign className='inline h-4 w-4 text-muted-foreground' />
                    <span>{centsToDollars(product.price)}</span>
                </div>
            </CardHeader>

            <CardContent className='flex flex-col flex-1 gap-10'>
                <ZoomedImage imgSrc={product.image} />
                <div className='flex justify-center mx-auto w-full'>
                    {
                        adminView &&
                        <Button className='w-full' variant={'outline'}>{product.isArchived ? "Unarchive" : "Archive"}</Button>
                    }

                    {
                        !adminView &&
                        <Link href={`/merch/${product.id}`} className={cn("w-full", buttonVariants({ variant: "outline" }))}>Buy Now</Link>
                    }
                </div>
            </CardContent>

            <div className='px-6 mb-2'>
                {
                    adminView
                        ?
                        <span className={`text-small font-medium ${product.isArchived ? "text-red-500" : "text-green-500"}`}>
                            {product.isArchived ? "Archived" : "Live"}
                        </span>
                        :
                        <span className={`text-small font-medium text-green-500`}>
                            In Stock
                        </span>
                }
            </div>
        </Card>
    )
}

export default ProductCard