"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Starter Presence",
    price: "20,000",
    unit: "one-time",
    featured: false,
    features: [
      "Brand Identity Design",
      "5+ pages responsive website",
      "Modern single-scroll design",
      "Mobile-optimized UI",
      "WhatsApp & call integration",
      "Contact forms",
      "Basic SEO setup",
    ],
  },
  {
    name: "Growth Engine",
    price: "35,000",
    unit: "one-time",
    featured: true,
    features: [
      "Everything in Starter",
      "Conversion-focused page structure",
      "AI chatbot (website integration)",
      "Appointment / booking system",
      "Lead capture system (forms + CTAs)",
      "Google Analytics integration",
      "Performance tracking dashboard",
      "Speed & UX optimization",
    ],
  },
  {
    name: "Authority System",
    price: "50,000",
    unit: "starting",
    featured: false,
    features: [
      "Everything in Growth",
      "WhatsApp automation setup",
      "Advanced chatbot workflows",
      "CRM / lead management system",
      "Lead nurturing automation",
      "Priority support",
    ],
  },
]

export function Pricing() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="pricing" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm uppercase tracking-widest font-bold mb-3">Pricing</p>
          <h2 className="text-4xl sm:text-5xl font-heading font-black uppercase tracking-tight">
            Investment Plans
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 border bg-card ${
                tier.featured ? "border-primary" : "border-border"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs uppercase tracking-widest font-bold px-4 py-1">
                  Most Popular
                </div>
              )}

              <h3 className="text-lg font-heading font-bold uppercase tracking-widest mb-2">
                {tier.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-heading font-black">₹{tier.price}</span>
                <span className="text-sm text-muted-foreground">{tier.unit}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-body">
                    <Check className="w-4 h-4 flex-shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContact}
                className={`w-full py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                  tier.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-foreground text-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
