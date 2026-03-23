"use client"

import { motion } from "framer-motion"

const caseStudies = [
  {
    title: "Nexus Finance",
    category: "Branding + Automation",
    stat: "+320% Revenue",
  },
  {
    title: "Pulse Health",
    category: "Web + Systems",
    stat: "+150% Leads",
  },
  {
    title: "Vertex Commerce",
    category: "E-commerce + AI",
    stat: "+280% Conversion",
  },
]

// Triple the items for seamless loop
const marqueeItems = [...caseStudies, ...caseStudies, ...caseStudies]

export function CaseStudies() {
  return (
    <section id="work" className="py-32 bg-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary text-sm uppercase tracking-widest font-bold mb-3">Our Work</p>
          <h2 className="text-4xl sm:text-5xl font-heading font-black uppercase tracking-tight">
            Case Studies
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="overflow-hidden">
        <div className="case-marquee flex">
          {marqueeItems.map((study, index) => (
            <div
              key={`${study.title}-${index}`}
              className="flex-shrink-0 w-[400px] mx-3 group cursor-pointer"
            >
              <div className="bg-background border border-border p-8 hover:border-primary/50 transition-all duration-300">
                <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest font-bold mb-6 bg-primary text-primary-foreground">
                  {study.category}
                </span>
                <h3 className="text-2xl font-heading font-bold uppercase tracking-wide mb-3">
                  {study.title}
                </h3>
                <p className="text-primary font-bold text-lg">{study.stat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes case-marquee {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0%); }
        }
        .case-marquee {
          animation: case-marquee 18s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  )
}
