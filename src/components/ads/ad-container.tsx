"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface AdContainerProps {
  children: React.ReactNode
  className?: string
  lazy?: boolean
  minHeight?: string
}

export function AdContainer({ children, className, lazy = true, minHeight = "auto" }: AdContainerProps) {
  const [isVisible, setIsVisible] = useState(!lazy)

  useEffect(() => {
    if (!lazy) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("ad-container")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [lazy])

  return (
    <div id="ad-container" className={cn("transition-opacity duration-300", className)} style={{ minHeight }}>
      {isVisible ? (
        children
      ) : (
        <div className="flex items-center justify-center h-24 bg-muted/20 rounded-lg">
          <div className="animate-pulse text-muted-foreground text-sm">Loading ad...</div>
        </div>
      )}
    </div>
  )
}
