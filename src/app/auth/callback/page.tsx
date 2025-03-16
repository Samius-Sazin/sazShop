import { Loader } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <div className='mt-20 w-full flex justify-center'>
            <div className='flex flex-col items-center gap-2'>
                <Loader className='w-10 h-10 animate-spin text-muted-foreground' />
                <h3 className='text-xl font-bold'>Redirecting<span className='animate-pulse'>...</span></h3>
                <p>Please Wait <span className='animate-pulse'>...</span></p>
            </div>
        </div>
    )
}

export default page