"use client"
import React from 'react'

import { Button } from '@/components/ui/button'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'

const HomeScreen = () => {
  return (
    <div>
      <LogoutLink>
        <Button variant={'outline'}>Logout</Button>
      </LogoutLink>
    </div>
  )
}

export default HomeScreen