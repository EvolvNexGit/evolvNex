"use client"

import { motion } from "framer-motion"
import { Globe, Layers, Zap, Settings } from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "Websites",
    description: "Custom, high-performance websites",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "CMS Integration"],
  },
  {
    icon: Layers,
    title: "Branding",
    description: "Visual identity systems",
    features: ["Logo Design", "Brand Guidelines", "Color Systems", "Typography"],
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Workflow automation",
    features: ["Process Automation", "Email Flows", "CRM Integration", "AI Workflows"],
  },
  {
    icon: Settings,
    title: "Systems",
    description: "Business infrastructure",
    features: ["Tech Stack Setup", "API Integration", "Database Design", "Analytics"],
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-16"
        >
          Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-card border border-border p-6 hover:border-primary transition-colors"
            >
              {/* Accent bar on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              
              <service.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-serif font-black text-xl uppercase tracking-tight mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
