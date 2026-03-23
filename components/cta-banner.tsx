"use client"

import { motion } from "framer-motion"

export function CTABanner() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="bg-primary relative overflow-hidden">
      <div className="absolute inset-0 diagonal-stripes-red" />
      
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-primary-foreground mb-2">
              Ready to Transform Your Brand?
            </h2>
            <p className="text-primary-foreground/80 font-body text-lg">
              Let's build something extraordinary together.
            </p>
          </div>
          <button
            onClick={scrollToContact}
            className="flex-shrink-0 bg-background text-foreground px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-background/90 transition-colors"
          >
            Start Your Project
          </button>
        </motion.div>
      </div>
    </section>
  )
}
