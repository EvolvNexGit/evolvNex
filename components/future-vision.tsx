"use client"

import { motion } from "framer-motion"
import { Bot, Workflow, Boxes } from "lucide-react"

const products = [
  {
    icon: Bot,
    name: "AI Agents",
    status: "Beta",
    statusBg: "bg-primary text-primary-foreground",
    description: "Intelligent assistants that handle outreach, support, and scheduling autonomously.",
  },
  {
    icon: Workflow,
    name: "Flow Builder",
    status: "Coming Soon",
    statusBg: "bg-foreground/10 text-foreground",
    description: "Visual workflow automation builder for complex business processes.",
  },
  {
    icon: Boxes,
    name: "Integration Hub",
    status: "Coming Soon",
    statusBg: "bg-foreground/10 text-foreground",
    description: "Unified platform connecting all your tools and data sources seamlessly.",
  },
]

export function FutureVision() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 diagonal-stripes" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-primary text-sm uppercase tracking-widest font-bold mb-3">What's Next</p>
          <h2 className="text-4xl sm:text-5xl font-heading font-black uppercase tracking-tight">
            Future Vision
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border p-8 relative group hover:border-primary/50 transition-all duration-300"
            >
              <span className={`inline-block px-3 py-1 text-xs uppercase tracking-widest font-bold mb-6 ${product.statusBg}`}>
                {product.status}
              </span>
              <product.icon className="w-10 h-10 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="text-xl font-heading font-bold uppercase tracking-wide mb-3">
                {product.name}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {product.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
