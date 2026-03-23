"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Basic",
    price: "15,000",
    unit: "/month",
    featured: false,
    features: [
      "Brand Identity Design",
      "Responsive Website",
      "SEO Optimization",
      "1 Month Support",
    ],
  },
  {
    name: "Growth",
    price: "30,000",
    unit: "/month",
    featured: true,
    features: [
      "Everything in Basic",
      "Custom Web Application",
      "Automation Setup",
      "CRM Integration",
      "3 Months Support",
      "Performance Analytics",
    ],
  },
  {
    name: "Enterprise",
    price: "50,000",
    unit: "/month",
    featured: false,
    features: [
      "Everything in Growth",
      "AI Integration",
      "Custom Workflows",
      "Dedicated Support",
      "Quarterly Strategy",
      "Priority Development",
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
