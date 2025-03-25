"use client"
import Image from 'next/image'
import { useState } from 'react'
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary'

import { useToast } from '@/hooks/use-toast'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import RotatedText from '@/components/decorators/RotatedText'
import { addProductAction } from '@/app/admin-dashboard/actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'


const AddNewProductForm = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { mutate: addProduct, isPending } = useMutation({
        mutationKey: ["addProduct"],
        mutationFn: async () => addProductAction({ name, image, price }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllProducts"] })
            toast({
                title: "Product uploaded successsfully",
            });
            setName("");
            setImage("");
            setPrice("");
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            })
        }
    })

    return (
        <>
            <p className='text-3xl tracking-tighter my-5 font-medium text-center'>
                Add <RotatedText>New</RotatedText> Product
            </p>

            <form onSubmit={(e) => {
                e.preventDefault();
                addProduct();
            }}>
                <Card className='w-full max-w-md mx-auto'>
                    <CardHeader>
                        <CardTitle className='text-2xl'>New Merch</CardTitle>
                        <CardDescription>Add a new product to the store. Select only one image.</CardDescription>
                    </CardHeader>

                    <CardContent className='grid gap-4'>
                        <div className='grid gap-2'>
                            <Label htmlFor='name'>Name</Label>
                            <Input
                                id='name'
                                type='text'
                                placeholder='Full sleeve shirt'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor='price'>Price ($)</Label>
                            <Input
                                id='price'
                                type='number'
                                required
                                value={price}
                                placeholder='14.99'
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <CldUploadWidget
                            signatureEndpoint="/api/sign-image"
                            onSuccess={(result, { widget }) => {
                                setImage((result?.info as CloudinaryUploadWidgetInfo).secure_url);
                                widget.close();
                            }}
                        >
                            {({ open }) => {
                                return (
                                    <Button
                                        variant={'outline'}
                                        type='button'
                                        onClick={() => open()}>
                                        Upload an Image
                                    </Button>
                                );
                            }}
                        </CldUploadWidget>

                        {
                            image
                            &&
                            (
                                <div className='flex justify-center relative w-full h-96'>
                                    <Image
                                        fill
                                        src={image}
                                        alt='Product Image'
                                        className='rounded-md object-contain' />
                                </div>
                            )
                        }
                    </CardContent>

                    <CardFooter>
                        <Button className='w-full' type='submit' disabled={isPending}>
                            {isPending ? "Adding..." : "Add Product"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </>
    )
}

export default AddNewProductForm