"use client"

import { motion } from "framer-motion"
import { Cpu, Brain, Workflow, Palette } from "lucide-react"

const products = [
  {
    icon: Cpu,
    name: "EvolvNex OS",
    status: "Live",
    statusColor: "bg-green-500",
  },
  {
    icon: Brain,
    name: "GrowthAI",
    status: "Beta",
    statusColor: "bg-yellow-500",
  },
  {
    icon: Workflow,
    name: "FlowBuilder",
    status: "Coming Soon",
    statusColor: "bg-muted-foreground",
  },
  {
    icon: Palette,
    name: "BrandForge",
    status: "Coming Soon",
    statusColor: "bg-muted-foreground",
  },
]

export function FutureVision() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-16"
        >
          Future Vision
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border p-6 hover:border-primary transition-colors group"
            >
              <product.icon className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors mb-4" />
              <h3 className="font-serif font-black text-lg uppercase tracking-tight mb-3">
                {product.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 ${product.statusColor}`} />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {product.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
