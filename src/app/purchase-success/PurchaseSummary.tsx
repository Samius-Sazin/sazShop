"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { notFound, useSearchParams } from "next/navigation";

import { centsToDollars } from "@/lib/utils";
import ZoomedImage from "@/components/ZoomedImage";
import { buttonVariants } from "@/components/ui/button";
import { checkProductPaidStatusAction } from "./actions";
import UnderlinedText from "@/components/decorators/UnderlineText";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const PurchaseSummary = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId") || "";

    const { data: order, isLoading } = useQuery({
        queryKey: ["checkProductPaidStatus"],
        queryFn: async () => await checkProductPaidStatusAction(orderId),
    });

    if (isLoading) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center p-6'>
                <p className='text-center text-md mb-6'>Verifying your payment, please wait...</p>
                <span className='animate-spin h-10 w-10 border-t-2 border-b-2 border-sky-400 rounded-full' />
            </div>
        );
    }

    if (!order) return null;

    return (
        <div className='min-h-screen flex flex-col items-center justify-center p-6'>
            <div className='flex flex-col items-center'>
                <ZoomedImage imgSrc={order?.product.image} className='h-96 w-96 rounded-md my-5' />
                <h1 className='text-2xl font-bold mb-4'>
                    Purchase <UnderlinedText>Successful!</UnderlinedText> 🎉
                </h1>

                <p className='text-center text-md mb-6'>
                    Your order is being processed and you will receive a confirmation email shortly. If you don't receive an email within 24 hours, please contact us with your order ID.
                </p>

                <p className='text-muted-foreground'>
                    Order ID: <span className='font-bold text-foreground text-sky-400'>{orderId}</span>
                </p>

                <Card className='w-full my-5'>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className='flex justify-between'>
                            <p>{order.product.name}</p>
                            <p>${centsToDollars(order.product.price)}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Size: {order.size}</p>
                            <p>Quantity: 1</p>
                        </div>

                        <div className='mt-4'>
                            <h3 className='font-semibold'>Shipping Address</h3>
                            <p>Address: {order.shippingAddress?.address}</p>
                            <p>City: {order.shippingAddress?.city}</p>
                            <p>State: {order.shippingAddress?.state}</p>
                            <p>Postal Code: {order.shippingAddress?.postalCode}</p>
                            <p>Country: {order.shippingAddress?.country}</p>
                        </div>
                    </CardContent>
                </Card>
                <p className='text-center text-md mb-6 text-muted-foreground text-lg'>
                    Thanks for trusting us with your purchase!
                </p>

                <div className='flex justify-center'>
                    <Link href={"/merch"} className={buttonVariants()}>
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default PurchaseSummary;