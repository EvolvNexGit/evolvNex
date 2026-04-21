"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Growth Starter",
    price: "21,999",
    unit: "one-time",
    featured: false,
    forWho: "For businesses getting started with their online presence",
    outcome: "You get a clean, credible presence that builds trust and captures basic enquiries.",
    features: [
      "Brand identity setup",
      "5+ section responsive website",
      "Clean single-scroll experience",
      "Mobile-optimized interface",
      "WhatsApp & call integration",
      "Basic SEO foundation",
    ],
  },
  {
    name: "Growth Accelerator",
    price: "29,999",
    unit: "one-time",
    featured: true,
    forWho: "For businesses looking to improve conversions and lead flow",
    outcome: "You start getting structured enquiries with a clear flow from visitor to lead.",
    features: [
      "Everything in Starter",
      "Conversion-focused page structure",
      "Business flow & page strategy",
      "Appointment / booking system",
      "Lead capture & enquiry flow",
      "Analytics & tracking setup",
      "Speed & UX optimization",
    ],
  },
  {
    name: "Growth Engine",
    price: "49,999",
    unit: "onwards",
    featured: false,
    forWho: "For businesses ready to streamline operations and scale",
    outcome: "Your business runs on structured workflows with automation handling leads, follow-ups, and operations.",
    features: [
      "Everything in Accelerator",
      "WhatsApp automation setup",
      "AI chatbot for enquiries",
      "CRM with lead management",
      "Inventory / billing integrations",
      "Subscription & customer tracking",
      "End-to-end workflow automation",
      "Growth planning & scaling support",
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

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-primary text-sm uppercase tracking-widest font-bold mb-3">
            Investment
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-black uppercase tracking-tight mb-4">
            Growth Plans
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Choose the level of structure your business needs — from building your presence to setting up complete growth infrastructure.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                y: -4,
                transition: { duration: 0.12 }
              }}
              className={`relative p-8 border bg-card cursor-pointer group
                transition-[border,box-shadow,transform] duration-100 ease-out
                ${
                  tier.featured
                    ? "border-primary shadow-[0_0_20px_rgba(255,0,0,0.18)]"
                    : "border-border hover:border-primary/70 hover:shadow-[0_0_15px_rgba(255,0,0,0.12)]"
                }
              `}
            >

              {/* Featured Badge */}
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs uppercase tracking-widest font-bold px-4 py-1">
                  Most Chosen
                </div>
              )}

              {/* Title */}
              <h3 className="text-lg font-heading font-bold uppercase tracking-widest mb-2 group-hover:text-primary transition">
                {tier.name}
              </h3>

              {/* Who it's for */}
              <p className="text-xs text-muted-foreground mb-3">
                {tier.forWho}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-heading font-black">
                  ₹{tier.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  {tier.unit}
                </span>
              </div>

              {/* Outcome */}
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {tier.outcome}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-body">
                    <Check className="w-4 h-4 flex-shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                onClick={scrollToContact}
                className={`w-full py-3 text-sm font-bold uppercase tracking-widest transition ${
                  tier.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-foreground text-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                Get Growth Audit
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}