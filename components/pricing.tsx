"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Basic",
    price: "15,000",
    unit: "/project",
    featured: false,
    features: [
      "Branding Kit",
      "5-page Website",
      "Basic SEO",
      "1 Month Support",
    ],
  },
  {
    name: "Growth",
    price: "30,000",
    unit: "/month",
    featured: true,
    features: [
      "Full Branding",
      "Custom Website",
      "Automation Setup",
      "CRM Integration",
      "3 Months Support",
      "AI Chatbot",
    ],
  },
  {
    name: "Automation",
    price: "50,000",
    unit: "/month",
    featured: false,
    features: [
      "Everything in Growth",
      "Custom AI Workflows",
      "Advanced Analytics",
      "Priority Support",
      "Quarterly Strategy",
      "AI Chatbot",
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
    <section id="pricing" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-16 text-center"
        >
          Pricing
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-card border-2 p-8 ${
                tier.featured ? "border-primary" : "border-border"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs uppercase tracking-wider px-4 py-1">
                  Most Popular
                </div>
              )}

              <h3 className="font-serif font-black text-2xl uppercase tracking-tight mb-2">
                {tier.name}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-serif font-black">₹{tier.price}</span>
                <span className="text-muted-foreground">{tier.unit}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContact}
                className={`w-full py-3 text-sm font-medium uppercase tracking-wider transition-colors ${
                  tier.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background"
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
