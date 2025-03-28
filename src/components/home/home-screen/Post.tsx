"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { CldVideoPlayer } from "next-cloudinary"
import { Heart, ImageIcon, LockKeyholeIcon, MessageCircle, Trash } from "lucide-react"


import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import Comment from "@/components/home/home-screen/comment"
import { Button, buttonVariants } from "@/components/ui/button"
import { Post as postType, Prisma, User } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { commentOnPostAction, deletePostAction, likePostAction } from "@/components/home/home-screen/actions"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"


// type PostWithComments = postType & { comments: { text: string; user: User }[] }
type PostWithComments = Prisma.PostGetPayload<{
  include: {
    comments: {
      include: {
        user: true,
      },
    },
    likesList: true,
  }
}>

const Post = ({ post, admin, isSubscribed }: { post: PostWithComments, admin: User, isSubscribed: boolean }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");

  const { user } = useKindeBrowserClient();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async () => await deletePostAction(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] })
      toast({
        title: "Post deleted successfully"
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      })
    }
  });

  const { mutate: likePost } = useMutation({
    mutationKey: ["likePost"],
    mutationFn: async () => {
      //change the likes immediately
      post.likes += isLiked ? -1 : 1;
      setIsLiked(!isLiked);
      //change in database
      await likePostAction(post.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] })
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      })
    },
  })

  const { mutate: handleCommentSubmission, isPending: isCommenting } = useMutation({
    mutationKey: ["handleCommentSubmission"],
    mutationFn: async () => commentOnPostAction(post.id, commentText),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      toast({
        title: "Commented successfully"
      });
      setCommentText("");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      })
    }
  })

  useEffect(() => {
    console.log(post);
    if (post.likesList && user?.id) setIsLiked(post.likesList.length > 0);
  }, [post.likesList, user?.id]);

  return (
    <div className='flex flex-col gap-3 p-3 border-t'>

      <div className='flex items-center justify-between'>

        {/* avatar image */}
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
                onClick={() => deletePost()}
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
            <Image
              src={post.mediaUrl}
              alt='Post Image'
              className='rounded-lg object-cover'
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
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
            onClick={() => {
              if (!isSubscribed) return;
              likePost();
            }}
          />
          <span className="text-xs text-zinc-400 tracking-tighter">{post?.likes || 0}</span>
        </div>

        <div className='flex gap-1 items-center'>
          <Dialog>
            <DialogTrigger>
              <MessageCircle className='w-5 h-5 cursor-pointer' />
            </DialogTrigger>
            {isSubscribed && (
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Comments</DialogTitle>
                </DialogHeader>
                <ScrollArea className='h-[400px] w-[350px] rounded-md p-4'>
                  {
                    post.comments.map((comment) => (
                      <Comment key={comment.id} comment={comment} />
                    ))
                  }

                  {
                    post.comments.length === 0 && (
                      <div className='flex flex-col items-center justify-center h-full'>
                        <p className='text-zinc-400'>No comments yet</p>
                      </div>
                    )
                  }
                </ScrollArea>

                <form onSubmit={e => {
                  e.preventDefault();
                  if (!isSubscribed || !commentText) return;
                  handleCommentSubmission();
                }}>
                  <Input
                    placeholder='Add a comment'
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                  />

                  <DialogFooter>
                    <Button type='submit' className='mt-4' disabled={isCommenting}>
                      {isCommenting ? "Commenting..." : "Comment"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            )}
          </Dialog>

          {/* message area */}
          <div className="flex gap-1 items-center">
            <span className="text-xs text-zinc-400 tracking-tighter">{post?.comments?.length || 0}</span>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Post