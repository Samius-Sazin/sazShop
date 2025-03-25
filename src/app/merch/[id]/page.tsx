import ProductCheckout from './ProductCheckout'
import BaseLayout from '@/components/BaseLayout'
import UnderlineText from '@/components/decorators/UnderlineText'
import ProductCard from '@/components/ProductCard'
import { prisma } from '@/db/prisma'
import { notFound } from 'next/navigation'

const Page = async ({ params }: { params: { id: string } }) => {
    const currentProduct = await prisma.product.findUnique({
        where: {
            id: params.id,
            isArchived: false,
        }
    })

    if (!currentProduct) return notFound();

    const products = await prisma.product.findMany({
        where: {
            isArchived: false,
            id: { not: currentProduct.id },
        },
        take: 4,
    });

    return (
        <BaseLayout renderRightPanel={false}>
            <div className='px-3 md:px-7 my-20'>
                <ProductCheckout product={currentProduct} />

                <h1 className='text-3xl text-center mt-20 mb-10 font-bold tracking-tight'>
                    More products from <UnderlineText className={'decoration-wavy underline-offset-4'}>sazShop</UnderlineText>
                </h1>

                {/* suggested products */}
                <div className='grid gap-5 grid-cols-1 md:grid-cols-2'>
                    {
                        products.map((product, productIndex) => (
                            <ProductCard product={product} key={productIndex} />
                        ))
                    }
                </div>
            </div>
        </BaseLayout>
    )
}

export default Page