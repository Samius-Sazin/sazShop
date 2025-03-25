"use server"

import { prisma } from "@/db/prisma";
import { admin } from "@/dummy_data";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { error } from "console";


const checkIsAdmin = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return { isAdmin: false, user: null };
    }

    const isAdmin = process.env.ADMIN_EMAIL === user?.email;

    if (!isAdmin) {
        return { isAdmin: false, user: null };
    }

    return { isAdmin: true, user };
}


type createPostArgs = {
    text: string;
    mediaUrl?: string;
    mediaType?: "image" | "video";
    isPublic: boolean;
}
export const createPostAction = async ({ isPublic, mediaUrl, mediaType, text }: createPostArgs) => {
    const { isAdmin, user } = await checkIsAdmin();

    if (!user || !isAdmin) throw new Error("Unauthorized");

    const newPost = await prisma.post.create({
        data: {
            text,
            mediaType,
            mediaUrl,
            isPublic,
            userId: user.id
        },
    });

    return { success: true, post: newPost };
}


export const getAllProductsAction = async () => {
    const { isAdmin, user } = await checkIsAdmin();

    if (!user || !isAdmin) throw new Error("Unauthorized");

    const products = await prisma.product.findMany();

    return products;
}


type addProductArgs = {
    name: string;
    image: string;
    price: string;
}
export const addProductAction = async ({ name, image, price }: addProductArgs) => {
    const { isAdmin, user } = await checkIsAdmin();

    if (!user || !isAdmin) throw new Error("Unauthorized");

    if (!name || !image || !price) {
        throw new Error("Please fill all the fields")
    }

    const priceInCents = Math.round(parseFloat(price) * 100);
    if (isNaN(priceInCents)) {
        throw new Error("Price must be a number");
    }

    const newProduct = await prisma.product.create({
        data: {
            name,
            image,
            price: priceInCents,
        },
    })

    return { success: true, product: newProduct }
}


export const toggleArchiveButtonAction = async (productId: string) => {
    const { isAdmin, user } = await checkIsAdmin();

    if (!user || !isAdmin) throw new Error("Unauthorized");

    const product = await prisma.product.findUnique({
        where: {
            id: productId,
        },
    })

    if (!product) {
        throw new Error("Product not found");
    }

    const updatedProduct = await prisma.product.update({
        where: {
            id: productId,
        },
        data: {
            isArchived: !product.isArchived,
        },
    })

    return { success: true, product: updatedProduct }
}