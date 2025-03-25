import BaseLayout from '@/components/BaseLayout'
import UnderlineText from '@/components/decorators/UnderlineText'
import ProductCard from '@/components/ProductCard'
import { prisma } from '@/db/prisma'

const Page = async () => {
    const products = await prisma.product.findMany({
        where: {
            isArchived: false
        }
    });

    return (
        <BaseLayout renderRightPanel={false}>
            <div className='px-3 md:px-10 my-10'>
                <h1 className='text-3 text-center my-5 font-bold tracking-tight'>
                    Our <UnderlineText className="decoration-wavy">Products</UnderlineText>
                </h1>

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