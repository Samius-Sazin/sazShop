import { prisma } from "@/db/prisma";
import Posts from "./Posts";
import UserProfile from "./UserProfile";
import BaseLayout from "@/components/BaseLayout";
import { getCurrentUserAction } from "@/app/update-profile/actions";
import { notFound } from "next/navigation";


const HomeScreen = async () => {
  const admin = await prisma.user.findUnique({
    where: {
      email: process.env.ADMIN_EMAIL
    }
  });
  
  const user = await getCurrentUserAction();

  if (!user) return notFound();

  return (
    <BaseLayout>
      <UserProfile />
      <Posts admin={admin!} isSubscribed={user?.isSubscribed} />
    </BaseLayout>
  )
}

export default HomeScreen