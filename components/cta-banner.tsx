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
    <section className="py-24 bg-primary diagonal-stripes-red">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-6 text-primary-foreground">
            Ready to Transform?
          </h2>
          <p className="text-xl text-primary-foreground/80 font-light mb-10 max-w-2xl mx-auto">
            Let us help you build systems that scale your business and drive sustainable growth.
          </p>
          <button
            onClick={scrollToContact}
            className="bg-background text-foreground px-10 py-4 text-sm font-medium uppercase tracking-wider hover:bg-background/90 transition-colors"
          >
            Start Your Transformation
          </button>
        </motion.div>
      </div>
    </section>
  )
}
