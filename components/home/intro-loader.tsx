'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const KEY = 'evolvnex-intro-seen'
const EASE = [0.22, 1, 0.36, 1] as const
const TOTAL_MS = 2300

const MARK_PATH =
  'M1994.7 0.5V8.07715L156.328 848.347L156.31 848.289L155.788 848.567L153.407 849.832L151.675 846.567L149.948 843.295L1335.75 215.921L1335.5 214.979L964.307 219.629L964.161 219.631L964.039 219.711L5.44922 849.858L0.703125 844.099L1025.07 1.34668L1025.78 0.765625L1026.39 1.58203V0.5H1994.7ZM1028.62 8.01172L65.6182 800.253L66.21 801.058L961.002 212.854L961.003 212.855L961.922 212.255L962.988 212.248H962.991L1353.32 207.357L1353.37 211.057V211.058L1353.42 214.95L283.69 780.9L284.132 781.797L1975.21 8.85254L1975 7.89746H1028.76L1028.62 8.01172ZM1972.71 8.89746L299.42 773.709L1354.16 215.691L1354.43 215.549L1354.42 215.243L1354.37 211.044L1354.32 206.846L1354.31 206.346L1353.81 206.352L962.979 211.248L961.768 211.256L961.62 211.257L961.497 211.337L960.456 212.019H960.455L73.4668 795.09L1029.12 8.89746H1972.71Z'

const LETTERS = 'EVOLVNEX'.split('')
const RED_FROM = 5 // brand logo: EVOLV white, NEX red

/**
 * Brand intro (once per session): black screen, the EvolvNex mark flies in from
 * depth, the wordmark assembles, then the logo zooms through the camera and the
 * home page is revealed.
 */
export function IntroLoader() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(KEY) === '1'
    } catch {}
    if (seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setShow(true)
    document.documentElement.style.overflow = 'hidden'
    const t = setTimeout(() => {
      setShow(false)
      document.documentElement.style.overflow = ''
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {}
    }, TOTAL_MS)
    return () => {
      clearTimeout(t)
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          aria-hidden
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          style={{ perspective: 1200 }}
        >
          {/* whole logo: on exit it flies toward the viewer and fills the screen */}
          <motion.div
            className="relative flex flex-col items-center"
            exit={{ scale: 14, opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.95, ease: [0.7, 0, 0.84, 0] }}
          >
            {/* mark: from far back to front */}
            <motion.svg
              viewBox="0 0 1996 851"
              className="absolute -top-[46%] left-[44%] w-[34%] sm:-top-[52%]"
              initial={{ scale: 0.15, opacity: 0, z: -800, filter: 'blur(12px)' }}
              animate={{ scale: 1, opacity: 1, z: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              <motion.path
                d={MARK_PATH}
                fill="#dc2626"
                stroke="#dc2626"
                strokeWidth={6}
                initial={{ pathLength: 0, fillOpacity: 0 }}
                animate={{ pathLength: 1, fillOpacity: 1 }}
                transition={{ pathLength: { duration: 1, ease: EASE }, fillOpacity: { delay: 0.6, duration: 0.4 } }}
              />
            </motion.svg>

            {/* wordmark */}
            <div className="flex items-center gap-3 sm:gap-5">
              <motion.span
                className="hidden h-px w-10 origin-right bg-primary sm:block sm:w-20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.6, ease: EASE }}
              />
              <p className="font-display flex text-[clamp(2.5rem,9vw,6.5rem)] leading-none">
                {LETTERS.map((ch, i) => (
                  <motion.span
                    key={i}
                    className={i >= RED_FROM ? 'text-primary' : 'text-white'}
                    initial={{ opacity: 0, y: 30, z: -300, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, z: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.45 + i * 0.06, duration: 0.7, ease: EASE }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </p>
              <motion.span
                className="hidden h-px w-10 origin-left bg-primary sm:block sm:w-20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.6, ease: EASE }}
              />
            </div>
            <motion.p
              className="font-sub mt-5 text-[11px] font-bold uppercase text-sand sm:text-sm"
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.45em' }}
              transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
            >
              Build <span className="text-primary">•</span> Grow{' '}
              <span className="text-primary">•</span> Achieve
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
