"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "120+", label: "Projects" },
  { value: "3.2x", label: "Avg ROI" },
  { value: "98%", label: "Retention" },
  { value: "5 Years", label: "" },
]

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-background diagonal-stripes">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl"
        >
          <h1 className="font-serif font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-none mb-8">
            We Build Digital Growth Systems
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl text-muted-foreground font-light mb-12">
            Where Brands Become Systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollToSection("#work")}
              className="border-2 border-foreground text-foreground px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
            >
              View Our Work
            </button>
            <button
              onClick={() => scrollToSection("#contact")}
              className="bg-primary text-primary-foreground px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-primary/90 transition-colors"
            >
              Start Your Project
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="border-t border-border mt-auto"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {stats.map((stat, index) => (
              <div key={index} className="py-8 px-4 text-center">
                <div className="font-serif font-black text-3xl md:text-4xl text-foreground">
                  {stat.value}
                </div>
                {stat.label && (
                  <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
