import BaseLayout from '@/components/BaseLayout'
import UnderlineText from '@/components/decorators/UnderlineText'
import ProductCard from '@/components/ProductCard'
import { products } from '@/dummy_data'
import React from 'react'
import ProductCheckout from './ProductCheckout'

const Page = () => {
    return (
        <BaseLayout renderRightPanel={false}>
            <div className='px-3 md:px-7 my-20'>
                <ProductCheckout product={products[0]} />

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