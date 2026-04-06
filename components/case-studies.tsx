'use client'

import { motion } from "framer-motion"

const caseStudies = [
  {
    title: "How Websites Generate Leads",
    category: "Lead Generation",
    stat: "HubSpot Insights",
    link: "https://blog.hubspot.com/marketing/lead-generation",
  },
  {
    title: "UX Impact on Conversions",
    category: "User Experience",
    stat: "Google Research",
    link: "https://www.thinkwithgoogle.com/intl/en-apac/marketing-strategies/app-and-mobile/mobile-page-speed-data/",
  },
  {
    title: "E-commerce Growth",
    category: "E-commerce",
    stat: "Shopify Guide",
    link: "https://www.shopify.com/blog/conversion-rate-optimization",
  },
  {
    title: "Digital Transformation ROI",
    category: "Automation",
    stat: "McKinsey Report",
    link: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights",
  },
  {
    title: "Automation & Business Growth",
    category: "Systems",
    stat: "Salesforce Data",
    link: "https://www.salesforce.com/in/products/platform/what-is-automation/",
  },
]

const marqueeItems = [...caseStudies, ...caseStudies, ...caseStudies]

export function CaseStudies() {
  return (
    <section id="work" className="py-32 bg-card relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary text-sm uppercase tracking-widest font-bold mb-3">
            Proven Results
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-black uppercase tracking-tight">
            Backed by Industry Leaders
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div
        className="overflow-hidden"
        onMouseEnter={(e) => {
          const el = e.currentTarget.querySelector('.case-marquee')
          if (el) (el as HTMLElement).style.animationPlayState = 'paused'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget.querySelector('.case-marquee')
          if (el) (el as HTMLElement).style.animationPlayState = 'running'
        }}
      >
        <div className="case-marquee flex">
          {marqueeItems.map((study, index) => (
            <a
              key={`${study.title}-${index}`}
              href={study.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-[400px] mx-3 group"
            >
              {/* FIXED HEIGHT CARD */}
              <div className="bg-background border border-border p-8 h-[260px] flex flex-col justify-between hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                
                <div>
                  <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest font-bold mb-4 bg-primary text-primary-foreground">
                    {study.category}
                  </span>

                  <h3 className="text-xl font-heading font-bold uppercase tracking-wide mb-2 group-hover:text-primary transition line-clamp-2">
                    {study.title}
                  </h3>
                </div>

                <div>
                  <p className="text-primary font-bold text-lg">
                    {study.stat}
                  </p>

                  <p className="text-xs text-muted-foreground mt-2 group-hover:text-primary transition">
                    → Read Insight
                  </p>
                </div>

              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-center mt-10 text-xs text-muted-foreground/50 px-6">
        Insights sourced from industry leaders to showcase proven digital growth strategies.
      </div>

      <style jsx>{`
        @keyframes case-marquee {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0%); }
        }
        .case-marquee {
          animation: case-marquee 18s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  )
}
