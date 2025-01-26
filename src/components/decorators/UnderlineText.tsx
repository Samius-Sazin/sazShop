import React, { ReactNode } from 'react'

import { cn } from '@/lib/utils'


const UnderlineText = ({ children, className }: { children: ReactNode, className?: String }) => {
    return (
        <span className={cn("underline underline-offset-4 decoration-dashed decoration-sky-400", className)}>
            {children}
        </span>
    )
}

export default UnderlineText