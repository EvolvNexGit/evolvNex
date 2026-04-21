"use client"

import { motion } from "framer-motion"
import { Rocket, TrendingUp, ShoppingCart, Building2, Briefcase, Cpu } from "lucide-react"

const clients = [
  {
    icon: Rocket,
    title: "Startups",
    description: "Founders building from zero who need structured systems from day one — not patchwork solutions later.",
  },
  {
    icon: TrendingUp,
    title: "Scale-ups",
    description: "Businesses already growing but hitting operational bottlenecks, inconsistent conversions, or manual chaos.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Brands looking to improve conversions, automate flows, and turn traffic into predictable revenue.",
  },
  {
    icon: Building2,
    title: "B2B SaaS",
    description: "SaaS teams focused on better acquisition, smoother onboarding, and stronger retention systems.",
  },
  {
    icon: Briefcase,
    title: "Service Firms",
    description: "Agencies and service businesses that want consistent leads and structured client management.",
  },
  {
    icon: Cpu,
    title: "Tech Companies",
    description: "Tech-driven teams ready to scale with systems that support growth — not slow it down.",
  },
]

export function WhoWeWorkWith() {
  return (
    <section className="py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-primary text-sm uppercase tracking-widest font-bold mb-3">
            Who We Work With
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-black uppercase tracking-tight mb-4">
            Built For Businesses That Want To Scale
          </h2>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            Not for businesses looking for quick fixes. We work with teams that want clarity, structure, and long-term growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background border border-border p-8 hover:border-primary/50 hover:scale-[1.02] transition-all duration-300 group"
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