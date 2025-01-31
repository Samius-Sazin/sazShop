import Posts from "./Posts";
import UserProfile from "./UserProfile";
import BaseLayout from "@/components/BaseLayout";


const HomeScreen = () => {
  return (
    <BaseLayout>
      <UserProfile />
      <Posts />
    </BaseLayout>
  )
}

export default HomeScreen