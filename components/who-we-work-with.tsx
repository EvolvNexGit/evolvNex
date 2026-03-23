"use client"

import { motion } from "framer-motion"
import { Rocket, TrendingUp, ShoppingCart, Building2, Briefcase, Cpu } from "lucide-react"

const clients = [
  { icon: Rocket, title: "Startups", description: "Early-stage companies ready to establish their digital presence." },
  { icon: TrendingUp, title: "Scale-ups", description: "Growing businesses looking to automate and optimize operations." },
  { icon: ShoppingCart, title: "E-Commerce", description: "Online stores seeking to increase conversions and streamline fulfillment." },
  { icon: Building2, title: "B2B SaaS", description: "Software companies focused on user acquisition and retention." },
  { icon: Briefcase, title: "Service Firms", description: "Professional services looking to digitize and scale their offerings." },
  { icon: Cpu, title: "Tech Companies", description: "Technology businesses ready to amplify their market presence." },
]

export function WhoWeWorkWith() {
  return (
    <section className="py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-primary text-sm uppercase tracking-widest font-bold mb-3">Our Clients</p>
          <h2 className="text-4xl sm:text-5xl font-heading font-black uppercase tracking-tight">
            Who We Work With
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background border border-border p-8 hover:border-primary/50 transition-colors group"
            >
              <client.icon className="w-10 h-10 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="text-lg font-heading font-bold uppercase tracking-wide mb-2">
                {client.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                {client.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
