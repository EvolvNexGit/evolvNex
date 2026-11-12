'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Container } from '@/components/site/container'
import { ButtonLink } from '@/components/site/button-link'

const LINES = ['Digital systems', 'that move business', 'forward.']

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-border"
    >
      {/* animated background */}
      <motion.div aria-hidden style={{ y: bgY }} className="absolute inset-0">
        <div className="hero-grid absolute inset-0" />
        <div
          className="absolute -top-1/4 -left-1/4 size-[60vw] rounded-full bg-primary/15 blur-[140px]"
          style={{ animation: 'drift-a 18s ease-in-out infinite' }}
        />
        <div
          className="absolute -right-1/4 -bottom-1/3 size-[50vw] rounded-full bg-white/[0.04] blur-[140px]"
          style={{ animation: 'drift-b 22s ease-in-out infinite' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </motion.div>

      <Container className="relative pt-24 pb-28">
        <motion.div style={{ y, opacity }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent-text"
          >
            <span className="h-px w-10 bg-primary" aria-hidden />
            Websites · Branding · CRM
          </motion.p>

          <h1 className="text-[clamp(2.75rem,9vw,8rem)] leading-[0.95] font-semibold tracking-[-0.04em]">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={`block ${i === 2 ? 'text-primary' : ''}`}
                  initial={{ y: '105%' }}
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
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:flex"
      >
        Scroll
        <ArrowDown className="size-4 animate-bounce" />
      </div>
    </section>
  )
}
