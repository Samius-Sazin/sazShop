"use server"

import { prisma } from "@/db/prisma";
import { centsToDollars } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


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


export const getDashboardDataAction = async () => {
    const { isAdmin, user } = await checkIsAdmin();

    if (!user || !isAdmin) throw new Error("Unauthorized");


    // All data that are needed
    const totalRevenuePromise = Promise.all([
        prisma.order.aggregate({
            _sum: {
                price: true,
            },
        }),
        prisma.subscription.aggregate({
            _sum: {
                price: true,
            },
        }),
    ]);

    const totalSalesPromise = prisma.order.count();

    const totalSubscriptionsPromise = prisma.subscription.count();

    const recentSalesPromise = prisma.order.findMany({
        take: 4,
        orderBy: {
            orderDate: "desc"
        },
        select: {
            user: {
                select: {
                    name: true,
                    email: true,
                    image: true,
                }
            },
            price: true,
            orderDate: true,
        },
    })

    const recentSubscriberPromise = prisma.subscription.findMany({
        take: 4,
        orderBy: {
            startDate: "desc",
        },
        select: {
            user: {
                select: {
                    name: true,
                    email: true,
                    image: true,
                },
            },
            price: true,
            startDate: true,
        }
    })

    const [totalRevenueResult, totalSales, totalSubscriptions, recentSales, recentSubscriptions] = await Promise.all([
        totalRevenuePromise,
        totalSalesPromise,
        totalSubscriptionsPromise,
        recentSalesPromise,
        recentSubscriberPromise,
    ]);

    const totalRevenue = (totalRevenueResult[0]._sum.price || 0) + (totalRevenueResult[1]._sum.price || 0);

    return {
        totalRevenue: centsToDollars(totalRevenue),
        totalSales,
        totalSubscriptions,
        recentSales,
        recentSubscriptions,
    }
}