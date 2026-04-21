"use client"

import { motion } from "framer-motion"
import { Globe, Palette, Zap, BarChart3 } from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "Conversion Systems",
    description: "Web experiences designed to capture attention, qualify visitors, and turn interest into real enquiries.",
    features: [
      "Conversion-focused structure",
      "Mobile-first experience",
      "SEO-ready foundation",
      "High-speed performance",
    ],
  },
  {
    icon: Palette,
    title: "Brand Systems",
    description: "A clear, consistent identity that builds trust and positions your business as credible and premium.",
    features: [
      "Visual identity & branding",
      "Consistent design language",
      "Trust-driven presentation",
      "Market positioning clarity",
    ],
  },
  {
    icon: Zap,
    title: "Automation Systems",
    description: "Reduce manual work and never miss opportunities with workflows that handle leads, follow-ups, and operations.",
    features: [
      "WhatsApp automation",
      "AI chatbot integration",
      "CRM setup & workflows",
      "Automated follow-ups",
    ],
  },
  {
    icon: BarChart3,
    title: "Growth Systems",
    description: "Track performance, understand what works, and improve conversions with data-backed decision making.",
    features: [
      "Analytics & tracking setup",
      "Funnel optimization",
      "Lead visibility",
      "Performance insights",
    ],
  },
]

export function Services() {
  return (
    <section id="services" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 diagonal-stripes" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-primary text-sm uppercase tracking-widest font-bold mb-3">
            What We Build
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-black uppercase tracking-tight mb-4">
            Systems That Drive Real Growth
          </h2>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            Not disconnected tools. Structured systems that work together to attract, convert, and manage your customers efficiently.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border p-8 relative group hover:border-primary/50 hover:scale-[1.02] transition-all duration-300"
            >
              <service.icon className="w-10 h-10 text-primary mb-6" strokeWidth={1.5} />
              
              <h3 className="text-xl font-heading font-bold uppercase tracking-wide mb-3">
                {service.title}
              </h3>

              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-sm text-muted-foreground font-body flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Micro CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            Every system is designed to reduce effort, improve conversions, and support consistent growth.
          </p>
          <button className="text-primary font-bold uppercase tracking-widest text-sm hover:opacity-80 transition">
            Get Growth Audit →
          </button>
        </div>
      </div>
    </section>
  )
}