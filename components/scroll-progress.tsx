"use client"

import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY
      const percentage = scrollPosition / totalHeight
      setProgress(percentage)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
      style={{ transform: `scaleX(${progress})` }}
    />
  )
}
