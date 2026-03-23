"use client"

import { motion } from "framer-motion"

const caseStudies = [
  {
    title: "Nexus Finance",
    category: "Branding + Automation",
    stat: "3.2x Revenue Growth",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    title: "Pulse Health",
    category: "Website + Systems",
    stat: "150% More Leads",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
  },
  {
    title: "Vertex Commerce",
    category: "E-Commerce + Automation",
    stat: "2.8x Conversion Rate",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
  },
]

// Triple the items for seamless loop
const marqueeItems = [...caseStudies, ...caseStudies, ...caseStudies]

export function CaseStudies() {
  return (
    <section id="work" className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight"
        >
          Case Studies
        </motion.h2>
      </div>

      {/* Marquee Container */}
      <div className="overflow-hidden">
        <div className="flex animate-marquee-left">
          {marqueeItems.map((study, index) => (
            <div
              key={`${study.title}-${index}`}
              className="flex-shrink-0 w-[400px] mx-4 group"
            >
              <div className="relative overflow-hidden border border-border bg-card">
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-primary text-primary-foreground text-xs uppercase tracking-wider px-3 py-1 mb-3">
                    {study.category}
                  </span>
                  <h3 className="font-serif font-black text-xl uppercase tracking-tight mb-2">
                    {study.title}
                  </h3>
                  <p className="text-primary font-medium">{study.stat}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
