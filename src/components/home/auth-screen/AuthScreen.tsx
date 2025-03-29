

import HeroSection from './HeroSection'
import UnderlineText from '@/components/decorators/UnderlineText'
import TodaysHighlight from './TodaysHighlight'
import RotatedText from '@/components/decorators/RotatedText'
import MasonryGrid from './MasonryGrid'
import Features from './Features'
import Testimonials from './Testimonials'
import Pricing from '@/components/Pricing'
import Team from './Team'


const AuthScreen = () => {
    return (
        <div className='flex flex-col'>
            <HeroSection />

            <div className='mb-20 mt-12'>
                <div className='max-w-6xl mx-auto'>
                    <p className='text-3xl md:text-5xl tracking-tight mt-4 mb-8 font-semibold text-center'>
                        Today's <UnderlineText className={"sm:underline-offset-8 md:underline-offset-[12px] decoration-wavy"}>Highlight</UnderlineText>
                        <span className='text-2xl md:text-4xl ml-1'>👇</span>
                    </p>

                    <div className='flex flex-col items-center gap-10 mt-10'>
                        {/* video area */}
                        <TodaysHighlight />

                        {/* image show case */}
                        <div className='mt-24'>
                            <p className='text-2xl md:text-5xl text-center tracking-tight font-bold'>
                                Here's our <RotatedText>collections</RotatedText>
                            </p>

                            <MasonryGrid />
                        </div>

                        {/* featured area/gif area */}
                        <Features />

                        {/* testimonials */}
                        <div className='w-[95%]'>
                            <Testimonials />
                        </div>

                        {/* pricing area */}
                        <Pricing />

                        {/* team are */}
                        <Team />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthScreen