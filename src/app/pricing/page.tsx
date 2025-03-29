import BaseLayout from '@/components/BaseLayout'
import Pricing from '@/components/Pricing'
import React from 'react'

const Page = () => {
    return (
        <BaseLayout renderRightPanel={false}>
            <Pricing />
        </BaseLayout>
    )
}

export default Page