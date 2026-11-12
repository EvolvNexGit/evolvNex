'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const KEY = 'evolvnex-intro-seen'

/** First-visit loader: counter 0 to 100, wordmark, then curtain lifts. Once per session. */
export function IntroLoader() {
  const [show, setShow] = useState(false)
  const [n, setN] = useState(0)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(KEY) === '1'
    } catch {}
    if (seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setShow(true)
    document.documentElement.style.overflow = 'hidden'
    const start = performance.now()
    const dur = 1800
    let raf = 0
    let timer: ReturnType<typeof setTimeout>
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1)
      setN(Math.round(100 * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
      else
        timer = setTimeout(() => {
          setShow(false)
          document.documentElement.style.overflow = ''
          try {
            sessionStorage.setItem(KEY, '1')
          } catch {}
        }, 250)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-background p-6 sm:p-10"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Loading experience
          </span>
          <div className="flex items-end justify-between">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl font-extrabold tracking-tight sm:text-7xl"
              >
                EVOLV<span className="text-primary">NEX</span>
              </motion.p>
            </div>
            <span className="text-5xl font-semibold tabular-nums sm:text-8xl">{n}</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-border">
            <div className="h-full bg-primary" style={{ width: `${n}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
