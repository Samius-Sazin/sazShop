"use client"
import Image from "next/image";
import { useState } from "react";

import { Terminal } from "lucide-react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import UnderlineText from "@/components/decorators/UnderlineText";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CldUploadWidget, CldVideoPlayer, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import 'next-cloudinary/dist/cld-video-player.css';


const ContantTab = () => {
    const [text, setText] = useState<string>("");
    const [mediaType, setMediaType] = useState<"video" | "image">("image");
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [mediaUrl, setMediaUrl] = useState<string>("");

    return (
        <>
            <p className="text-3xl my-5 font-bold text-center uppercase">
                <UnderlineText className={`decoration-wavy`}>Share</UnderlineText> Post
            </p>

            <form>
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>New Post</CardTitle>
                        <CardDescription>Share your exclusive content with your audience. Select only one video/image at a time.</CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                placeholder="Share today's exclusive"
                                required
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label>Media Type</Label>
                            <RadioGroup
                                defaultValue="video"
                                value={mediaType}
                                onValueChange={(value: "video" | "image") => { setMediaType(value) }}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="video" id="video" />
                                    <Label htmlFor="video">Video</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="image" id="image" />
                                    <Label htmlFor="image">Image</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <CldUploadWidget
                            signatureEndpoint="/api/sign-image"
                            // options={{ sources: ["local", "unsplash"] }}
                            onSuccess={(result, { widget }) => {
                                setMediaUrl((result.info as CloudinaryUploadWidgetInfo).secure_url);
                                widget.close(); //close the upload widget after upload automatically
                            }}
                        >
                            {({ open }) => {
                                return (
                                    <Button onClick={() => open()} variant={"outline"} type="button">
                                        Upload
                                    </Button>
                                );
                            }}
                        </CldUploadWidget>

                        {/* image preveiew after upload */}
                        {
                            mediaUrl && mediaType === "image" && (
                                <div className="flex justify-center relative w-full h-96">
                                    <Image
                                        fill
                                        src={mediaUrl}
                                        alt="uploaded image"
                                        className="object-contain rounded-md"
                                    />
                                </div>
                            )
                        }

                        {/* video preview after upload */}
                        {
                            mediaUrl && mediaType === "video" && (
                                <div className="flex justify-center relative w-full h-auto">
                                    <CldVideoPlayer
                                        width="960"
                                        height="540"
                                        className='rounded-md'
                                        id={mediaUrl}
                                        src={mediaUrl}
                                    />
                                </div>
                            )
                        }

                        <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="public"
                                    checked={isPublic}
                                    onCheckedChange={(e) => setIsPublic(e as boolean)}
                                />
                                <Label htmlFor="public" className="text-sm font font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Mark as public</Label>
                            </div>
                        </div>

                        <Alert variant={'default'} className="text-yellow-400">
                            <Terminal className="h-4 w-4 !text-yellow-400" />
                            <AlertTitle>Warning !</AlertTitle>
                            <AlertDescription>Public post will be visible to all users.</AlertDescription>
                        </Alert>

                        <CardFooter>
                            <Button className="w-full" type="submit">Create Post</Button>
                        </CardFooter>
                    </CardContent>
                </Card>
            </form>
        </>
    )
}

export default ContantTab