'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Container } from '@/components/site/container'
import { ButtonLink } from '@/components/site/button-link'

const LINES = ['Digital systems', 'that move business', 'forward.']

/** Background grid + travelling dots come from the site-wide <SiteBackground />. */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[78svh] items-center overflow-hidden border-b border-border"
    >
      {/* single faint brand glow */}
      <div
        aria-hidden
        className="absolute -top-1/3 -left-1/4 size-[55vw] rounded-full bg-primary/[0.05] blur-[160px]"
      />

      <Container className="relative py-20">
        <motion.div style={{ y, opacity }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="eyebrow mb-6 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-primary" aria-hidden />
            Websites · Branding · CRM
          </motion.p>

          <h1 className="text-[clamp(2rem,4.8vw,4rem)] leading-[1.05] uppercase">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pr-[0.15em] pb-[0.08em]">
                <motion.span
                  className={`block ${i === 2 ? 'text-primary' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="max-w-md text-lg text-muted-foreground">
              Websites, brands and custom CRM built for growing businesses.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact" arrow>
                Start a Project
              </ButtonLink>
              <ButtonLink href="/work/websites" variant="secondary">
                See Our Work
              </ButtonLink>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      <div
        aria-hidden
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:flex"
      >
        Scroll
        <ArrowDown className="size-4 animate-bounce" />
      </div>
    </section>
  )
}
