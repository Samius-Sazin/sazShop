import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import AuthScreen from "@/components/home/auth-screen/AuthScreen";
import HomeScreen from "@/components/home/home-screen/HomeScreen";


export default async function Home() {

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log(user);

  return (
    <div>
      {
        user ? <HomeScreen /> : <AuthScreen />
      }
    </div>
  );
}
