"use client"

import { useEffect, useState } from 'react';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCurrentUserAction, updateUserProfileAction } from '@/app/update-profile/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';


const UpdateProfileForm = () => {
    const [updatedImageUrl, setUpdatedImageUrl] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState("")

    const { toast } = useToast();

    const { data: currentUser } = useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => await getCurrentUserAction(),
    })

    const { mutate: updateUserProfile, isPending } = useMutation({
        mutationKey: ["updateUserProfile"],
        mutationFn: async () => await updateUserProfileAction({ name, image: updatedImageUrl }),
        onSuccess: () => {
            toast({
                title: "Profile updated",
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    })

    useEffect(() => {
        if (currentUser) {
            setName(currentUser?.name);
        }
    }, [currentUser])

    return (
        <div className='px-2 md:px-10 my-20'>
            <Card>
                <CardHeader>
                    <CardTitle className='text-2xl'>Update Profile</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className='flex justify-center'>
                        <Avatar className='w-20 h-20'>
                            <AvatarImage
                                src={updatedImageUrl || currentUser?.image || "/user-placeholder.png"}
                                className='object-cover'
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>

                    <form onSubmit={e => {
                        e.preventDefault();
                        updateUserProfile();
                    }}>
                        <Label>Name</Label>
                        <Input
                            placeholder='Enter your name'
                            value={name}
                            className='my-2'
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Label>Email</Label>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className='w-full' type='button'>
                                    <Input disabled value={currentUser?.email} className='my-2' />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className='text-sm'>For security reasons, your email cannot be changed. 😥</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <CldUploadWidget
                            signatureEndpoint={"/api/sign-image"}
                            onSuccess={(result, { widget }) => {
                                setUpdatedImageUrl((result.info as CloudinaryUploadWidgetInfo).secure_url);
                                widget.close();
                            }}
                        >
                            {({ open }) => {
                                return (
                                    <Button
                                        onClick={() => open()}
                                        variant={"outline"}
                                        type='button'
                                        className='w-full mt-2 mb-4'
                                    >
                                        Change Image
                                    </Button>
                                );
                            }}
                        </CldUploadWidget>

                        <Button className='w-full' type='submit' disabled={isPending}>
                            {isPending ? "Updating..." : "Update"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default UpdateProfileForm