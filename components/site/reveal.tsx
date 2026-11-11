'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Modest opacity/translate reveal, triggered once. Reduced motion is handled
 * globally by <MotionConfig reducedMotion="user"> in Providers (transforms off).
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'article'
}) {
  const Comp = motion[as]
  return (
    <Comp
      className={cn(className)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  )
}
