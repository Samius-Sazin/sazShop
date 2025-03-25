"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { DollarSign } from 'lucide-react'
import { centsToDollars, cn } from '@/lib/utils'
import ZoomedImage from './ZoomedImage'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleArchiveButtonAction } from '@/app/admin-dashboard/actions'
import { useToast } from '@/hooks/use-toast'

const ProductCard = ({ product, isAdmin = false }: { product: any, isAdmin?: boolean }) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { mutate: toggleArchiveButton, isPending } = useMutation({
        mutationKey: ["toggleArchiveButton"],
        mutationFn: async () => toggleArchiveButtonAction(product.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
            toast({
                title: `Product ${product.isArchived ? "unarchived" : "archived"} successfully`,
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        }
    })

    return (
        <Card className='flex flex-col'>
            <CardHeader className='h-full px-6 flex flex-row items-center justify-between space-y-0 pb-0'>
                <CardTitle className='text-lg font-medium'>{product?.name}</CardTitle>
                <div className='text-nowrap'>
                    <DollarSign className='inline h-4 w-4 text-muted-foreground' />
                    <span>{centsToDollars(product?.price)}</span>
                </div>
            </CardHeader>

            <CardContent className='flex flex-col flex-1 gap-10'>
                <ZoomedImage imgSrc={product?.image} />
                <div className='flex justify-center mx-auto w-full'>
                    {
                        isAdmin &&
                        <Button onClick={() => toggleArchiveButton()} disabled={isPending} className='w-full' variant={'outline'}>
                            {product?.isArchived ? "Unarchive" : "Archive"}
                        </Button>
                    }

                    {
                        !isAdmin &&
                        <Link href={`/merch/${product.id}`} className={cn("w-full", buttonVariants({ variant: "outline" }))}>Buy Now</Link>
                    }
                </div>
            </CardContent>

            <div className='px-6 mb-2'>
                {
                    isAdmin
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