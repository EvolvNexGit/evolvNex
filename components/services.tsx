"use client"

import { motion } from "framer-motion"
import { Globe, Palette, Zap, BarChart3 } from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "High-Converting Websites",
    description: "We build fast, structured websites designed to turn visitors into leads - not just look good.",
    features: [
      "Conversion-focused design",
      "Mobile-first experience",
      "SEO-ready structure",
      "Lightning-fast performance",
    ],
  },
  {
    icon: Palette,
    title: "Brand That Builds Trust",
    description: "Your business needs more than a logo - we create a visual identity that makes you look credible and premium.",
    features: [
      "Logo & visual identity",
      "Brand consistency",
      "Trust-focused design",
      "Market positioning",
    ],
  },
  {
    icon: Zap,
    title: "Smart Automation Systems",
    description: "Save time and never miss a lead with automated workflows that handle inquiries, follow-ups, and bookings.",
    features: [
      "WhatsApp automation",
      "AI chatbot integration",
      "CRM setup",
      "Lead follow-up systems",
    ],
  },
  {
    icon: BarChart3,
    title: "Lead Generation & Analytics",
    description: "Track what works, improve conversions, and consistently generate leads with data-driven systems.",
    features: [
      "Analytics setup",
      "Funnel optimization",
      "Lead tracking",
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
            What We Do
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-black uppercase tracking-tight mb-4">
            Systems That Bring You Customers
          </h2>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            We don’t just build websites - we create systems that attract, convert, and manage your customers automatically.
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
            Everything we build is focused on one goal - helping your business get more customers.
          </p>
          <button className="text-primary font-bold uppercase tracking-widest text-sm hover:opacity-80 transition">
            Book a Free Consultation →
          </button>
        </div>
      </div>
    </section>
  )
}
