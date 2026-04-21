"use client"

import { motion } from "framer-motion"
import { Globe, Palette, Zap, BarChart3 } from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "Conversion Systems",
    description: "Web experiences built to capture attention, guide users, and convert interest into real enquiries.",
    features: [
      "Conversion-first structure",
      "Mobile-optimized experience",
      "SEO-ready foundation",
      "High-performance loading",
    ],
  },
  {
    icon: Palette,
    title: "Brand Systems",
    description: "A consistent identity that builds trust, improves perception, and positions your business clearly.",
    features: [
      "Visual identity & branding",
      "Consistent design language",
      "Trust-focused presentation",
      "Clear market positioning",
    ],
  },
  {
    icon: Zap,
    title: "Automation Systems",
    description: "Eliminate manual work with systems that handle leads, follow-ups, and workflows automatically.",
    features: [
      "WhatsApp automation",
      "AI chatbot integration",
      "CRM workflows",
      "Automated follow-ups",
    ],
  },
  {
    icon: BarChart3,
    title: "Growth Systems",
    description: "Understand performance, improve conversions, and make decisions backed by real data.",
    features: [
      "Analytics & tracking setup",
      "Funnel optimization",
      "Lead visibility",
      "Performance insights",
    ],
  },
]

export function Services() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

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
            Systems That Drive Business Growth
          </h2>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            Not random tools. Structured systems designed to attract, convert, and manage your customers efficiently.
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
            Built to reduce manual effort, improve conversions, and support consistent growth.
          </p>
          <button
            onClick={scrollToContact}
            className="text-primary font-bold uppercase tracking-widest text-sm hover:opacity-80 transition"
          >
            Get Growth Audit →
          </button>
        </div>
      </div>
    </section>
  )
}