"use client"

import { motion } from "framer-motion"
import { Rocket, TrendingUp, ShoppingCart, Building2, Briefcase, Cpu } from "lucide-react"

const clients = [
  {
    icon: Rocket,
    title: "Startups",
    description: "Early-stage startups ready to launch fast and build a strong digital presence that attracts their first customers.",
  },
  {
    icon: TrendingUp,
    title: "Scale-ups",
    description: "Growing businesses looking to automate operations, capture more leads, and scale efficiently.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Online brands focused on increasing conversions, improving user experience, and driving more sales.",
  },
  {
    icon: Building2,
    title: "B2B SaaS",
    description: "SaaS companies aiming to improve user acquisition, onboarding, and long-term retention.",
  },
  {
    icon: Briefcase,
    title: "Service Firms",
    description: "Agencies and service providers looking to generate consistent leads and streamline client management.",
  },
  {
    icon: Cpu,
    title: "Tech Companies",
    description: "Tech-driven businesses ready to enhance their digital presence and scale with smarter systems.",
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
            Who We Help Grow
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-black uppercase tracking-tight mb-4">
            Businesses Ready to Scale
          </h2>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            We work with businesses that are serious about growth — not just having a website.
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
