"use client"

import { useState } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ColorButtonProps extends ButtonProps {
  colorClasses?: string[]
}

export default function ColorButton({
  children,
  className,
  colorClasses = [
    "bg-blue-600 hover:bg-blue-700",
    "bg-purple-600 hover:bg-purple-700",
    "bg-teal-500 hover:bg-teal-600",
    "bg-pink-500 hover:bg-pink-600",
    "bg-orange-500 hover:bg-orange-600",
  ],
  ...props
}: ColorButtonProps) {
  const [currentColorIndex, setCurrentColorIndex] = useState(0)

  const handleMouseEnter = () => {
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colorClasses.length)
  }

  return (
    <Button
      className={cn(colorClasses[currentColorIndex], "transition-colors duration-300", className)}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </Button>
  )
}

