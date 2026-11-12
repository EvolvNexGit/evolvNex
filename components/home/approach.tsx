'use client'

import { motion } from 'framer-motion'
import { Search, Lightbulb, Code, Rocket } from 'lucide-react'

/** Ported 1:1 from the original evolvnex.com "How we work" section. */
const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Diagnose',
    description:
      'We analyze your business, identify bottlenecks, and uncover where growth is being lost.',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Design',
    description: 'We create a clear system tailored to your operations, goals, and growth stage.',
  },
  {
    number: '03',
    icon: Code,
    title: 'Implement',
    description:
      'We build and integrate everything — from tools to workflows — into one streamlined system.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Optimize',
    description:
      'We refine continuously to improve performance, reduce friction, and support consistent growth.',
  },
]

export function Approach() {
  return (
    <section id="approach" className="relative border-y border-border py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left - sticky heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-28"
          >
            <p className="eyebrow mb-3">How We Work</p>
            <h2 className="mb-5 text-3xl leading-tight uppercase sm:text-4xl">
              A Structured Approach To Growth
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              No guesswork. No random tools. Every step is designed to bring clarity, structure, and
              measurable improvement to your business.
            </p>
          </motion.div>

          {/* Right - steps: each card rises on its own as it scrolls into view */}
          <ol className="space-y-5">
            {steps.map((step) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -25% 0px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative border border-border bg-card p-8 transition-all duration-200 hover:border-primary/50"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <span className="font-display inline-block text-5xl text-primary/20 transition-all duration-150 ease-out group-hover:scale-105 group-hover:text-primary/50">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <step.icon className="h-6 w-6 text-primary" strokeWidth={1.5} aria-hidden />
                      <h3 className="text-xl font-bold uppercase tracking-wide">{step.title}</h3>
                    </div>
                    <p className="leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
