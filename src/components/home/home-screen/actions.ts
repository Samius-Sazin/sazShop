"use server"

import { getCurrentUserAction } from "@/app/update-profile/actions";
import { prisma } from "@/db/prisma"

export const getAllPostsAction = async () => {
    const user = await getCurrentUserAction();
    if (!user) throw new Error("Unauthorized");

    const posts = await prisma.post.findMany();

    if (!posts) {
        throw new Error("Error fetching posts")
    }

    return posts;
}