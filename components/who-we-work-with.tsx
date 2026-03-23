"use client"

import { motion } from "framer-motion"
import { Rocket, BarChart3, ShoppingCart, Building2, Briefcase, Cpu } from "lucide-react"

const clients = [
  { icon: Rocket, title: "Startups" },
  { icon: BarChart3, title: "Scale-ups" },
  { icon: ShoppingCart, title: "E-Commerce" },
  { icon: Building2, title: "B2B SaaS" },
  { icon: Briefcase, title: "Service Firms" },
  { icon: Cpu, title: "Tech Companies" },
]

export function WhoWeWorkWith() {
  return (
    <section className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-16"
        >
          Who We Work With
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border p-8 text-center hover:border-primary transition-colors group"
            >
              <client.icon className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors mx-auto mb-4" />
              <h3 className="font-serif font-black text-lg uppercase tracking-tight">
                {client.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
