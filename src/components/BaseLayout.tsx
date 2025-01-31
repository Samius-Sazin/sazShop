import { ReactNode } from "react"
import { redirect } from "next/navigation";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Sidebar from "./Sidebar";


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
        <div className="flex justify-between max-w-2xl lg:max-w-7xl mx-auto relative">
            <Sidebar />

            <div className="w-full flex flex-col border-r">
                {children}
            </div>

            <div className="">
                {
                    renderRightPanel
                    &&
                    "Suggested Products"
                }
            </div>
        </div>
    )
}

export default BaseLayout