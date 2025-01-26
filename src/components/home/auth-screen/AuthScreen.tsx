

import HeroSection from './HeroSection'
import UnderlineText from '@/components/decorators/UnderlineText'
import TodaysHighlight from './TodaysHighlight'
import RotatedText from '@/components/decorators/RotatedText'
import MasonryGrid from './MasonryGrid'


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

                    {/* video area */}
                    <div className='flex flex-col gap-10 mt-10'>
                        <TodaysHighlight />

                        <div className='mt-24'>
                            <p className='text-2xl md:text-5xl text-center tracking-tight font-bold'>
                                Here's <RotatedText>our farm</RotatedText>
                            </p>

                            <MasonryGrid />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthScreen