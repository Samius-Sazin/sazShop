"use server";

import { prisma } from "@/db/prisma";
import { getCurrentUserAction } from "../update-profile/actions";
import { notFound } from "next/navigation";

export const checkProductPaidStatusAction = async (orderId: string) => {
    const user = getCurrentUserAction();
    if (!user) throw new Error("Unauthorized");

    const order = await prisma.order.findUnique({
        where: { id: orderId },
        select: {
            product: true,
            isPaid: true,
            size: true,
            shippingAddress: true,
        },
    });

    if (!order) return notFound();

    return order;
}