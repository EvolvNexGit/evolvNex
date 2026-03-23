"use client"

import { motion } from "framer-motion"
import { Search, PenTool, Hammer, RefreshCw, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "We dive deep into your business, market, and goals to understand what drives success.",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Crafting visual identities and user experiences that resonate with your audience.",
  },
  {
    icon: Hammer,
    title: "Build",
    description: "Developing robust, scalable solutions using modern technologies and best practices.",
  },
  {
    icon: RefreshCw,
    title: "Automate",
    description: "Implementing workflows and systems that save time and eliminate manual tasks.",
  },
  {
    icon: TrendingUp,
    title: "Scale",
    description: "Optimizing and expanding your systems to support continuous growth.",
  },
]

export function Approach() {
  return (
    <section id="approach" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Sticky Heading */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-6">
                Our Approach
              </h2>
              <p className="text-xl text-muted-foreground font-light">
                A systematic process designed to transform your ideas into scalable digital solutions.
              </p>
            </motion.div>
          </div>

          {/* Right - Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-16"
              >
                {/* Vertical line connector */}
                {index < steps.length - 1 && (
                  <div className="absolute left-5 top-14 w-0.5 h-full bg-primary/30" />
                )}
                
                {/* Icon box */}
                <div className="absolute left-0 top-0 w-10 h-10 bg-primary flex items-center justify-center">
                  <step.icon className="h-5 w-5 text-primary-foreground" />
                </div>

                <div>
                  <h3 className="font-serif font-black text-2xl uppercase tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
