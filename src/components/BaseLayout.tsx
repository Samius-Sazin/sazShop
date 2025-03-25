import { ReactNode } from "react"
// import { redirect } from "next/navigation";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Sidebar from "./Sidebar";
import SuggestedProducts from "./SuggestedProducts";


const BaseLayout = async ({
    children,
    renderRightPanel = true
}: {
    children: ReactNode,
    renderRightPanel?: boolean
}) => {
    const { isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) {
        // return redirect("/");
    }

    return (
        <div className="flex justify-between max-w-2xl lg:max-w-[80%] mx-auto relative">
            <div className="w-[10%]">
                <Sidebar />
            </div>

            <div className="w-full lg:w-[45%] flex flex-col border-x">
                {children}
            </div>

            <div className="w-[35%]">
                {
                    renderRightPanel
                    &&
                    <SuggestedProducts />
                }
            </div>
        </div>
    )
}

export default BaseLayout