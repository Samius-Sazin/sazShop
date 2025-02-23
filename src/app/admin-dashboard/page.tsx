
import StoreTab from './store/StoreTab'
import ContantTab from './content/ContantTab'

import BaseLayout from '@/components/BaseLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const Page = () => {
  return (
    <BaseLayout renderRightPanel={false}>
      <Tabs defaultValue="content" className="w-full my-10 px-2 md:px-10 mx-auto">
        <TabsList className='flex flex-col md:flex-row w-full md:w-3/4 mx-auto h-auto'>
          <TabsTrigger value="content" className='w-full md:w-auto'>Content</TabsTrigger>
          <TabsTrigger value="store" className='w-full md:w-auto'>Store</TabsTrigger>
          <TabsTrigger value="analytics" className='w-full md:w-auto'>Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <ContantTab />
        </TabsContent>

        <TabsContent value="store">
          <StoreTab />
        </TabsContent>

        <TabsContent value="analytics">Analytics</TabsContent>
      </Tabs>

    </BaseLayout>
  )
}

export default Page