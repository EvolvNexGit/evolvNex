'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const
const KEY_ROWS = [14, 14, 13, 12, 8]

/**
 * Laptop (viewed slightly from above, keyboard visible) with a phone standing in
 * front of its left side, both showing the real EvolvNex dashboard. Built from
 * flat layers with a single perspective plane for the keyboard deck, so nothing
 * nests 3D transforms.
 */
export function DashboardMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const on = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[600px] pt-2 pb-14">
      {/* ground shadow + red glow */}
      <span aria-hidden className="absolute right-[4%] bottom-10 h-10 w-[84%] rounded-[50%] bg-black blur-xl" />
      <span aria-hidden className="absolute right-[10%] bottom-6 h-14 w-[70%] rounded-[50%] bg-primary/25 blur-3xl" />

      {/* laptop */}
      <motion.div
        className="relative ml-auto w-[84%]"
        initial={{ opacity: 0, y: 40 }}
        animate={on ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE }}
      >
        {/* lid */}
        <div className="rounded-t-[14px] bg-gradient-to-b from-[#58585d] via-[#3a3a3e] to-[#2c2c30] p-[2px]">
          <div className="relative rounded-t-[12px] bg-black p-[7px] pb-[9px]">
            <div className="relative aspect-[1917/910] overflow-hidden rounded-[3px]">
              <Image
                src="/images/home/crm-dashboard-desktop.png"
                alt="EvolvNex CRM dashboard on desktop showing revenue, appointments and patient analytics"
                fill
                sizes="(min-width: 1024px) 500px, 85vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent"
              />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-black"
                initial={{ opacity: 1 }}
                animate={on ? { opacity: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.9 }}
              />
            </div>
            <span className="absolute top-[3px] left-1/2 size-[3px] -translate-x-1/2 rounded-full bg-[#1d2430]" />
          </div>
        </div>

        {/* hinge */}
        <div className="relative z-10 mx-auto h-[5px] w-[102%] -translate-x-[1%] bg-gradient-to-b from-[#6a6a70] to-[#2a2a2e]" />

        {/* keyboard deck: one flat plane tipped back in perspective */}
        <div className="relative aspect-[100/13] w-[110%] -translate-x-[5%]" style={{ perspective: 800 }}>
          <div
            className="absolute top-0 left-0 aspect-[100/34] w-full origin-top rounded-b-[18px] bg-gradient-to-b from-[#2f2f33] via-[#3b3b40] to-[#4a4a50] shadow-[0_2px_0_#16161a]"
            style={{ transform: 'rotateX(64deg)' }}
          >
            <div className="absolute inset-x-[7%] top-[7%] bottom-[34%] flex flex-col gap-[3%]">
              {KEY_ROWS.map((n, r) => (
                <div key={r} className="flex flex-1 justify-center gap-[0.9%]">
                  {Array.from({ length: n }).map((_, k) => (
                    <span
                      key={k}
                      className={`h-full rounded-[2px] bg-[#0f0f12] shadow-[0_1px_0_rgba(255,255,255,0.06)] ${
                        r === 4 && k === 3 ? 'w-[34%]' : 'w-[6%]'
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <span className="absolute bottom-[6%] left-1/2 h-[26%] w-[32%] -translate-x-1/2 rounded-[3px] border border-white/[0.06] bg-[#34343a]" />
          </div>
        </div>
      </motion.div>

      {/* phone, in front of the laptop's left side */}
      <motion.div
        className="absolute bottom-10 left-0 z-10 w-[25%] min-w-[96px]"
        initial={{ opacity: 0, y: 70 }}
        animate={on ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.9, duration: 1, ease: EASE }}
        style={{ transformPerspective: 900, rotateY: 14, rotateZ: -3 }}
      >
        <motion.div
          animate={on ? { y: [0, -6, 0] } : {}}
          transition={{ delay: 2.2, duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          {/* side buttons */}
          <span className="absolute top-[18%] -left-[2px] h-[7%] w-[3px] rounded-l bg-[#4a4a50]" />
          <span className="absolute top-[28%] -left-[2px] h-[11%] w-[3px] rounded-l bg-[#4a4a50]" />
          <span className="absolute top-[42%] -left-[2px] h-[11%] w-[3px] rounded-l bg-[#4a4a50]" />
          <span className="absolute top-[30%] -right-[2px] h-[16%] w-[3px] rounded-r bg-[#4a4a50]" />
          <div className="rounded-[1.7rem] bg-gradient-to-br from-[#8a8a90] via-[#3a3a3e] to-[#68686e] p-[2.5px] shadow-[-18px_28px_40px_-12px_rgba(0,0,0,0.9)]">
            <div className="rounded-[1.55rem] bg-black p-[5px]">
              <div className="relative aspect-[397/812] overflow-hidden rounded-[1.25rem]">
                <Image
                  src="/images/home/crm-dashboard-mobile.png"
                  alt="EvolvNex CRM dashboard on mobile"
                  fill
                  sizes="150px"
                  className="object-cover"
                />
                <span className="absolute top-[1.6%] left-1/2 z-10 h-[2.6%] w-[26%] -translate-x-1/2 rounded-full bg-black" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.1] via-transparent to-transparent"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <p className="mt-12 text-center text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
        EvolvNex CRM · Dashboard
      </p>
    </div>
  )
}
