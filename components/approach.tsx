"use client"

import { motion } from "framer-motion"
import { Search, Lightbulb, Code, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Diagnose",
    description: "We analyze your business, identify bottlenecks, and uncover where growth is being lost.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Design",
    description: "We create a clear system tailored to your operations, goals, and growth stage.",
  },
  {
    number: "03",
    icon: Code,
    title: "Implement",
    description: "We build and integrate everything — from tools to workflows — into one streamlined system.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Optimize",
    description: "We refine continuously to improve performance, reduce friction, and support consistent growth.",
  },
]

export function Approach() {
  return (
    <section id="approach" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 diagonal-stripes" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left - Sticky Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <p className="text-primary text-sm uppercase tracking-widest font-bold mb-3">
              How We Work
            </p>
            <h2 className="text-4xl sm:text-5xl font-heading font-black uppercase tracking-tight mb-6">
              A Structured Approach To Growth
            </h2>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              No guesswork. No random tools. Every step is designed to bring clarity, structure, and measurable improvement to your business.
            </p>
          </motion.div>

          {/* Right - Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border p-8 relative group hover:border-primary/50 transition-all duration-200"
              >
                <div className="flex items-start gap-6">
                  
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <span className="text-5xl font-heading font-black text-primary/20 group-hover:text-primary/50 transition-all duration-150 ease-out group-hover:scale-105 inline-block">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <step.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                      <h3 className="text-xl font-heading font-bold uppercase tracking-wide">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground font-body leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}