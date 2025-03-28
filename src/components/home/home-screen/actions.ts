"use server"

import { getCurrentUserAction } from "@/app/update-profile/actions";
import { prisma } from "@/db/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getAllPostsAction = async () => {
    const user = await getCurrentUserAction();
    if (!user) throw new Error("Unauthorized");

    const posts = await prisma.post.findMany({
        include: {
            comments: {
                include: {
                    user: true,
                },
            },
            likesList: {
                where: {
                    userId: user.id,
                }
            }
        },
    });

    if (!posts) {
        throw new Error("Error fetching posts")
    }

    return posts;
}

export const deletePostAction = async (postId: string) => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    if (user.email !== process.env.ADMIN_EMAIL) {
        throw new Error("Unauthorized");
    }

    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    })

    if (!post) {
        throw new Error("No posts found");
    }

    if (user.id !== post.userId) {
        throw new Error("Unauthorized");
    }

    try {
        await prisma.post.delete({
            where: {
                id: postId,
            }
        })
        return { success: true }
    }
    catch (error) {
        throw new Error("Internal server error");
    }

}

export const likePostAction = async (postId: string) => {
    const user = await getCurrentUserAction();

    if (!user) throw new Error("Unauthorized");

    if (!user.isSubscribed) return;

    //like & unlike a post
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
        select: {
            likes: true,
            likesList: {
                where: {
                    userId: user.id,
                }
            }
        }
    })

    if (!post) throw new Error("Post not found");

    let newLikes: number;
    if (post.likesList.length > 0) { // already like the post, user want to unlike
        newLikes = Math.max(post.likes - 1, 0);
        await prisma.like.deleteMany({
            where: {
                postId,
                userId: user.id,
            }
        })
    }
    else { // user want to like the post
        newLikes = post.likes + 1;
        await prisma.like.create({
            data: {
                postId,
                userId: user.id,
            }
        })
    }

    await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            likes: newLikes,
        }
    })

    return { success: true }
}

export const commentOnPostAction = async (postId: string, text: string) => {
    const user = await getCurrentUserAction();

    if (!user) throw new Error("Unauthorized");

    if (!user.isSubscribed) return;

    try {
        //comment on post
        const comment = await prisma.comment.create({
            data: {
                text,
                postId,
                userId: user.id,
            }
        })

        return { success: true, comment: comment };
    }
    catch (error) {
        return error;
    }
}