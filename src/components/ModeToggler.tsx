"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <div className="flex lg:flex-row flex-col lg:gap-4 gap-2 items-center">
      <Button onClick={() => setTheme("light")} variant="outline" size="icon">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>

      <Button onClick={() => setTheme("dark")} variant="outline" size="icon">
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </div>
  )
}
