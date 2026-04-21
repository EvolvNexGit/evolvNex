"use client"

import { motion } from "framer-motion"
import { Bot, Workflow, Boxes } from "lucide-react"

const products = [
  {
    icon: Bot,
    name: "AI Agents",
    status: "Beta",
    statusBg: "bg-primary text-primary-foreground",
    description: "Autonomous systems that handle conversations, follow-ups, and operations without constant human input.",
  },
  {
    icon: Bot,
    name: "AskBOT.AI",
    status: "Coming Soon",
    statusBg: "bg-foreground/10 text-foreground",
    description: "A context-aware AI assistant designed to understand, respond, and support customers at scale.",
  },
  {
    icon: Boxes,
    name: "Integration Hub",
    status: "Coming Soon",
    statusBg: "bg-foreground/10 text-foreground",
    description: "A unified layer that connects your tools, data, and workflows into one seamless system.",
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
          className="mb-16 max-w-2xl"
        >
          <p className="text-primary text-sm uppercase tracking-widest font-bold mb-3">
            What We’re Building
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-black uppercase tracking-tight mb-4">
            The Future Of Business Systems
          </h2>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            We’re not just implementing systems for today. We’re building the infrastructure that will define how businesses operate, scale, and automate in the future.
          </p>
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