"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "10+", label: "Projects Delivered" },
  { value: "3.2x", label: "Avg ROI" },
  { value: "9%", label: "Client Retention" },
  { value: "3+", label: "Yrs of Engineering Exp" },
]

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 diagonal-stripes" />
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tight leading-none mb-8">
            We Build<br />
            <span className="text-primary">Digital</span> Growth<br />
            Systems
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-body mb-12 max-w-2xl">
            Where Brands Become Systems. We transform ambitious brands into scalable, automated growth engines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollToSection("#work")}
              className="border-2 border-foreground text-foreground px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
            >
              View Our Work
            </button>
            <button
              onClick={() => scrollToSection("#contact")}
              className="bg-primary text-primary-foreground px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
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
                  {stat.value}
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
