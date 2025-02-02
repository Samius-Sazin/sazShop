"use client"
import Link from 'next/link';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Home, LayoutDashboard, Shirt, User } from 'lucide-react';
import { DropdownMenu } from './ui/dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { ModeToggle } from './ModeToggler';
import { user } from '@/dummy_data';


const NAVBAR_STYLES = "flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal";

const SIDEBAR_LINKS = [
    {
        icon: Home,
        label: "Home",
        href: "/",
    },
    {
        icon: Shirt,
        label: "Merch",
        href: "/merch",
    },
];

const Sidebar = () => {
    const isAdmin = true;

    return (
        <div className='flex flex-col items-center lg:items-start gap-6 px-2 sticky left-0 top-0 h-screen'>
            <Link href={`/update-profile`} className='max-w-fit'>
                <Avatar className='mt-4 cursor-pointer'>
                    <AvatarImage src={user.image || `/user-placeholder.png`} className='object-cover' alt="user profile" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Link>

            <nav className='flex flex-col gap-3'>
                {
                    SIDEBAR_LINKS.map((link, index) => (
                        <Link key={index} href={link.href} className={NAVBAR_STYLES}>
                            <link.icon className='w-6 h-6' />
                            <span className='hidden lg:block'>{link.label}</span>
                        </Link>
                    ))
                }

                {
                    isAdmin
                    &&
                    <Link href={`sazshop-admin-dashboard`} className={NAVBAR_STYLES}>
                        <LayoutDashboard className='w-6 h-6' />
                        <span className='hidden lg:block'>Dashboard</span>
                    </Link>
                }

                <DropdownMenu>
                    <DropdownMenuTrigger className={`${NAVBAR_STYLES} outline-none flex items-center gap-2`}>
                        <User className='w-6 h-6' />
                        <span className='hidden lg:block'>Settings</span>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className='font-semibold flex flex-col gap-1 mt-2 bg-white/[0.8] dark:bg-black/[0.8]  backdrop-blur-[10]'>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className='border border-black dark:border-white mb-2' />
                        <Link href={"#"} className='outline-none hover:bg-primary-foreground hover:text-primary rounded-full'>
                            <DropdownMenuItem className='outline-none'>Billing</DropdownMenuItem>
                        </Link>
                        <LogoutLink className='outline-none hover:bg-primary-foreground hover:text-primary rounded-full'>
                            <DropdownMenuItem className='outline-none'>Logout</DropdownMenuItem>
                        </LogoutLink>
                    </DropdownMenuContent>

                </DropdownMenu>
            </nav>

            <ModeToggle />
        </div>
    )
}

export default Sidebar