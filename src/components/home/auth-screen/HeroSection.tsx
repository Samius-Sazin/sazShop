import Image from 'next/image'
import React from 'react'
import AuthButtons from './AuthButtons'

const HeroSection = () => {
  return (
    <div className='flex h-[100dvh] w-full'>

      {/* left side */}
      <div className='bg-noise flex-1 flex justify-center items-center overflow-hidden bg-[#00b0f0a6] relative z-10'>
        <div className='flex flex-col gap-2 px-4 xl:ml-40 text-center md:text-start font-semibold'>
          <Image
            src={"/sazShop-logo.png"}
            alt='sazShop logo'
            width={200}
            height={200}
            className='mt-20 w-[100px] rounded-3xl z-0 pointer-events-none select-none'
          />

          <p className='text-2xl md:text-3xl text-balance mb-2'>
            hey! It's <span className='rounded-md bg-stone-800 px-2 text-white font-bold'>sazShop</span>
          </p>

          <p className='text-2xl md:text-3xl mb-32 leading-snug text-balance'>
            Your most <span className='rounded-md bg-sky-500 px-2 text-white font-bold'>TRUSTED</span> partner in <span className='rounded-md bg-red-700 px-2 text-white font-bold'>town</span>
          </p>

          <AuthButtons />

        </div>
      </div>

      {/* right side */}
      <div className='flex-1 relative overflow-hidden hidden lg:flex items-center justify-center'>
        <Image
          src={"/sazShop-full-logo.png"}
          alt="sazShop logo"
          fill
          sizes='100%'
          className='opacity-90 pointer-events-none select-none h-full'
        />
      </div>
    </div>
  )
}

export default HeroSection