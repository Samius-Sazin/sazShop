import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import RotatedText from "@/components/decorators/RotatedText";


interface TeamProps {
    imageUrl: string;
    name: string;
    position: string;
    description: string;
}

const teamList: TeamProps[] = [
    {
        imageUrl: "https://avatars.githubusercontent.com/u/68127599?v=4",
        name: "Samius Sazin",
        position: "Founder & CEO",
        description: "Sazin leads sazShop with a vision to provide the best online shopping experience with top-quality products.",
    },
    {
        imageUrl: "https://i.pravatar.cc/150?img=60",
        name: "Tanvir Hossain",
        position: "Marketing Manager",
        description: "Tanvir oversees all marketing strategies, ensuring sazShop reaches the right customers with great deals.",
    },
    {
        imageUrl: "https://i.pravatar.cc/150?img=36",
        name: "Nusrat Jahan",
        position: "Head of Operations",
        description: "Nusrat manages logistics and operations, ensuring fast shipping and smooth order fulfillment.",
    },
    {
        imageUrl: "https://i.pravatar.cc/150?img=17",
        name: "Rakib Hasan",
        position: "Customer Support Lead",
        description: "Rakib ensures top-notch customer service, helping shoppers with queries and order assistance.",
    },
];

const Team = () => {
    return (
        <section className='container py-24 sm:py-32'>
            <h2 className='text-2xl sm:text-3xl md:text-5xl text-center tracking-tighter font-bold'>
                Our <RotatedText>Dedicated</RotatedText> Crew
            </h2>

            <p className='mt-4 mb-10 text-md md:text-xl text-muted-foreground text-center'>
                Meet the team that makes our platform a unique destination for shoppers and sellers alike.
            </p>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10'>
                {
                    teamList.map(({ description, imageUrl, name, position }) => (
                        <Card key={name} className='bg-muted/50 relative mt-7 flex flex-col justify-center items-center'>
                            <CardHeader className='my-8 flex justify-center items-center pb-2'>
                                <img
                                    src={imageUrl}
                                    alt='Team member'
                                    className='absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover'
                                />
                                <CardTitle className='text-center'>{name}</CardTitle>
                                <CardDescription className='text-primary'>{position}</CardDescription>
                            </CardHeader>

                            <CardContent className='text-center pb-4 px-2'>
                                <p>{description}</p>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </section>
    )
}

export default Team;