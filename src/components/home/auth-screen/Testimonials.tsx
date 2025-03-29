import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import RotatedText from "@/components/decorators/RotatedText";

const reviews = [
    {
        name: "Rahim",
        username: "@rahim",
        body: "Amazing shopping experience! The deals are unbeatable, and the checkout process is super smooth.",
        img: "https://avatar.vercel.sh/rahim",
    },
    {
        name: "Sumaiya",
        username: "@sumaiya",
        body: "Great product quality and fast delivery. I’m definitely shopping here again!",
        img: "https://avatar.vercel.sh/sumaiya",
    },
    {
        name: "Arif",
        username: "@arif",
        body: "Customer support is fantastic! They helped me with my order instantly.",
        img: "https://avatar.vercel.sh/arif",
    },
    {
        name: "Mitu",
        username: "@mitu",
        body: "Love the trendy collections! Found exactly what I was looking for.",
        img: "https://avatar.vercel.sh/mitu",
    },
    {
        name: "Nafisa",
        username: "@nafisa",
        body: "Super fast shipping and well-packaged products. Highly recommended!",
        img: "https://avatar.vercel.sh/nafisa",
    },
    {
        name: "Tanvir",
        username: "@tanvir",
        body: "The best online store! Great prices, excellent service, and top-notch products.",
        img: "https://avatar.vercel.sh/tanvir",
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body, }: { img: string; name: string; username: string; body: string; }) => {
    return (
        <figure
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    );
};

const Testimonials = () => {
    return (
        <div>
            <h1 className='text-3xl sm:text-4xl md:text-5xl text-center tracking-tighter font-bold mb-12'>
                Why <RotatedText>choose</RotatedText> Us
            </h1>

            <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
            </div>
        </div>
    );
};

export default Testimonials;