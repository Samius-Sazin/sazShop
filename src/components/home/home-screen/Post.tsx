"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { CldVideoPlayer } from "next-cloudinary"
import { Heart, ImageIcon, LockKeyholeIcon, MessageCircle, Trash } from "lucide-react"

import { user } from "@/dummy_data"
import { Button, buttonVariants } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"


const Post = ({ post, admin, isSubscribed }: { post: any, admin: any, isSubscribed: boolean }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className='flex flex-col gap-3 p-3 border-t'>

      <div className='flex items-center justify-between'>

        {/* avaar image */}
        <div className='flex items-center gap-2'>
          <Avatar>
            <AvatarImage src={admin.image || "/user-placeholder.png"} className='object-cover' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className='font-semibold text-sm md:text-md'>{admin.name}</span>
        </div>

        {/* time and delete  */}
        <div className='flex gap-2 items-center'>
          <p className='text-zinc-400 text-xs md:text-sm tracking-tighter'>17.06.2024</p>

          {
            admin.id === user?.id && (
              <Trash
                className='w-5 h-5 text-muted-foreground hover:text-red-500 cursor-pointer'
              // onClick={() => deletePost()}
              />
            )
          }
        </div>

      </div>

      <p className='text-sm md:text-md'>{post.text}</p>

      {/* check if the media is image or video */}
      {
        (post.isPublic || isSubscribed) && post.mediaUrl && post.mediaType === "image"
        &&
        (
          <div className='relative w-full pb-[56.25%] rounded-lg overflow-hidden'>
            <Image src={post.mediaUrl} alt='Post Image' className='rounded-lg object-cover' fill />
          </div>
        )
      }

      {
        (post.isPublic || isSubscribed) && post.mediaUrl && post.mediaType === "video"
        &&
        (
          <div className='w-full mx-auto'>
            <CldVideoPlayer width='960' height={540} className='rounded-md' src={post.mediaUrl} />
          </div>
        )
      }

      {
        !isSubscribed && !post.isPublic &&
        (
          <div className='bg-of w-full bg-slate-800 relative h-96 rounded-md flex flex-col justify-center items-center px-5 overflow-hidden'>
            <LockKeyholeIcon className='w-16 h-16 text-zinc-400 mb-20 z-0' />

            <div aria-hidden='true' className='opacity-60 absolute top-0 left-0 w-full h-full bg-stone-800' />

            <div className='flex flex-col gap-2 z-10 border p-2 border-gray-500 w-full rounded'>
              <div className='flex gap-1 items-center'>
                <ImageIcon className='w-4 h-4' />
                <span className='text-xs'>1</span>
              </div>

              <Link
                className={buttonVariants({
                  className: "!rounded-full w-full font-bold text-white",
                })}
                href={"/pricing"}
              >
                Subscribe to unlock
              </Link>
            </div>
          </div>
        )
      }


      <div className="flex gap-4">

        {/* heart area */}
        <div className="flex gap-1 items-center">
          <Heart
            className={cn("w-5 h-5 cursor-pointer", { "text-red-500": isLiked, "fill-red-500": isLiked })}
            onClick={() => setIsLiked(!isLiked)}
          />
          <span className="text-xs text-zinc-400 tracking-tighter">55</span>
        </div>

        {/* message area */}
        <div className="flex gap-1 items-center">
          <MessageCircle className="w-5 h-5 cursor-pointer" />
          <span className="text-xs text-zinc-400 tracking-tighter">13</span>
        </div>
      </div>

    </div>
  )
}

export default Post