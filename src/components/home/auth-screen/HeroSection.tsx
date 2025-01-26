import Image from 'next/image'
import React from 'react'
import AuthButtons from './AuthButtons'

const HeroSection = () => {
  return (
    <div className='flex h-[100dvh] w-full'>

      {/* left side */}
      <div className='bg-noise flex-1 flex justify-center items-center overflow-hidden bg-[#00b0f0a6] relative z-10'>
        <img
          src="/of-logo.svg"
          alt="sazshop logo"
          className='absolute -left-1/4 -bottom-40 opacity-15 lg:scale-150 xl:scale-105 scale-[2] pointer-events-none select-none'
        />

        <div className='flex flex-col gap-2 px-4 xl:ml-40 text-center md:text-start font-semibold'>
          <Image
            src={"/onlyhorse.png"}
            alt='sazshop logo'
            width={769}
            height={182}
            className='mt-20 w-[420px] z-0 pointer-events-none select-none'
          />

          <p className='text-2xl md:text-3xl text-balance mb-2'>
            hey! It's <span className='rounded-md bg-stone-800 px-2 text-white font-bold'>Not</span> what it looks like
          </p>

          <p className='text-2xl md:text-3xl mb-32 leading-snug text-balance'>
            Built for <span className='rounded-md bg-sky-500 px-2 text-white font-bold'>HORSES</span> NOT <span className='rounded-md bg-red-700 px-2 text-white font-bold'>others</span>
          </p>

          <AuthButtons />

        </div>
      </div>

      {/* right side */}
      <div className='flex-1 relative overflow-hidden hidden md:flex items-center justify-center'>
        <Image
          src={"/horse-6.png"}
          alt="horse image"
          fill
          className='opacity-90 pointer-events-none select-none h-full'
        />
      </div>
    </div>
  )
}

export default HeroSection