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
    title: "Exclusive Deals & Discounts",
    description:
      "Get the best prices on top-quality products with our exclusive offers and limited-time discounts.",
    image: "/gifs/gif1.gif",
  },
  {
    title: "Seamless Shopping Experience",
    description:
      "Enjoy a smooth and secure shopping experience with fast checkout, multiple payment options, and easy navigation.",
    image: "/gifs/gif2.gif",
  },
  {
    title: "Trending & Best-Selling Products",
    description: "Stay ahead with the latest trends and explore our best-selling products loved by customers.",
    image: "/gifs/gif3.gif",
  },
];

const featureLists: string[] = [
  "Exclusive Deals & Discounts",
  "Trending Products",
  "Fast & Secure Checkout",
  "Personalized Recommendations",
  "24/7 Customer Support",
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