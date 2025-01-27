import UnderlineText from '@/components/decorators/UnderlineText';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';


interface FeatureProps {
  title: string,
  description: string,
  image: string
}

const features: FeatureProps[] = [
  {
    title: "Expert Horse Care Tips",
    description:
      "Learn the best practices for keeping your horses healthy and happy. From nutrition advice to grooming.",
    image: "/gifs/gif1.gif",
  },
  {
    title: "Riding Techniques",
    description:
      "Enhance your riding skills with our detailed tutorials. Whether you're into dressage, jumping, or just casual riding, find techniques in seconds.",
    image: "/gifs/gif2.gif",
  },
  {
    title: "Daily Farm Life",
    description: "See how we care for our horses, manage the farm, and enjoy the beauty of nature.",
    image: "/gifs/gif3.gif",
  },
];

const featureLists: string[] = [
  "Horse Health Insights",
  "Daily Tips",
  "Behind-the-Scenes Access",
  "Training Tutorials",
  "Riding Techniques",
  "Horse Care Advice",
];

const Features = () => {
  return (
    <section className='container py-24 sm:py-32 space-y-8'>
      <h2 className='text-3xl lg:text-4xl font-bold md:text-center'>
        Many <UnderlineText className={'underline-offset-8'}>sazShop</UnderlineText> Features 🎉
      </h2>

      {/* badge */}
      <div className='flex flex-wrap md:justify-center gap-4'>
        {
          featureLists.map((featureList, featureListIndex) => (
            <div key={featureListIndex}>
              <Badge className='text-sm rounded-lg' variant={'secondary'}>
                {featureList}
              </Badge>
            </div>
          ))
        }
      </div>

      {/* show the gifs */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {
          features.map((feature, featureIndex) => (
            <div key={featureIndex}>
              <Card className='flex flex-col justify-between h-full'>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>

                <CardFooter>
                  <img
                    className='rounded w-[250px] h-32 lg:w-[300px] mx-auto select-none pointer-events-none'
                    src={feature.image}
                    alt={feature.title}
                  />
                </CardFooter>
              </Card>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default Features