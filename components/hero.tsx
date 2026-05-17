'use client'

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const stats = [
  { value: "10+", label: "Systems Delivered" },
  { value: "3.2x", label: "Average Growth Impact" },
  { value: "5+", label: "Industries Worked With" },
  { value: "7 Days", label: "Execution Turnaround" },
]

function AnimatedStat({ value }: { value: string }) {
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    let end = 0
    let suffix = ""

    if (value.includes("+")) {
      end = parseInt(value)
      suffix = "+"
    } else if (value.includes("x")) {
      end = parseFloat(value)
      suffix = "x"
    } else if (value.toLowerCase().includes("day")) {
      end = parseInt(value)
      suffix = " Days"
    } else {
      end = parseFloat(value)
    }

    let start = 0
    const duration = 1200
    const steps = 30
    const increment = end / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      start += increment

      if (currentStep >= steps) {
        setDisplay(value)
        clearInterval(timer)
      } else {
        let formatted = ""

        if (suffix === "x") {
          formatted = start.toFixed(1)
        } else {
          formatted = Math.floor(start).toString()
        }

        setDisplay(formatted + suffix)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return <>{display}</>
}

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-28">
      <div className="absolute inset-0 diagonal-stripes" />
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight leading-[0.9] mb-8">
            Structured<br />
            <span className="text-primary">Systems</span> For<br />
            Business Growth
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground font-body mb-14 max-w-2xl">
            We design
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollToSection("#work")}
              className="border-2 border-foreground text-foreground px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
            >
              See How It Works
            </button>

            <button
              onClick={() => scrollToSection("#contact")}
              className="bg-primary text-primary-foreground px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              Get Growth Audit
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="border-t border-border mt-auto relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`py-10 px-6 ${index !== 0 ? 'border-l border-border' : ''}`}
              >
                <div className="font-heading font-black text-4xl md:text-5xl text-foreground mb-2">
                  <AnimatedStat value={stat.value} />
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest font-body">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
