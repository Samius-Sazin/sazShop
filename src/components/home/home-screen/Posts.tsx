"use client"

import Post from "./Post"
import UnderlineText from "@/components/decorators/UnderlineText"
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getAllPostsAction } from "@/components/home/home-screen/actions";

const Posts = ({ admin, isSubscribed }: { admin: User, isSubscribed: boolean }) => {

    const { data: posts, isLoading } = useQuery({
        queryKey: ["getAllPosts"],
        queryFn: async () => await getAllPostsAction(),
    })

    return (
        <div>
            {/* show posts */}
            {
                !isLoading && posts?.map((post, postIndex) => (
                    <Post key={postIndex} post={post} admin={admin} isSubscribed={isSubscribed} />
                ))
            }

            {/* show skeletons */}
            {
                isLoading
                &&
                (
                    <div className="mt-10 px-3 flex flex-col gap-10">
                        {
                            [...Array(3)].map((_, i) => (
                                <PostSkeleton key={i} />
                            ))
                        }
                    </div>
                )
            }

            {/* show no post yet  */}
            {
                !isLoading && posts?.length === 0
                &&
                (
                    <div className="mt-10 px-3">
                        <div className="flex flex-col items-center space-y-3 w-full md:w-3/4 mx-auto">
                            <p className="text-2xl font-semibold">No posts <UnderlineText>Yet</UnderlineText></p>

                            <p className="text-center">Stay tuned for more posts from <span className="text-primary font-semibold text-xl">sazShop.</span> You can subscribe to access exclusive content when it's available</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Posts