import type { LucideIcon } from 'lucide-react'
import { Reveal } from './reveal'

export type Module = { icon: LucideIcon; title: string; text: string }

/**
 * Numbered module cards. Hover: card lifts, border turns red, a red line draws
 * across the top, the icon tile fills red and the number brightens.
 */
export function ModuleGrid({ items }: { items: Module[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((m, i) => (
        <Reveal as="li" key={m.title} delay={(i % 3) * 0.06}>
          <article className="group relative h-full overflow-hidden border border-border bg-card p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-primary sm:p-7">
            <span
              aria-hidden
              className="absolute top-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"
            />
            <div className="flex items-start justify-between">
              <span className="inline-flex size-12 items-center justify-center border border-border text-accent-text transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                <m.icon className="size-5" strokeWidth={1.5} aria-hidden />
              </span>
              <span
                aria-hidden
                className="font-display text-4xl text-primary/15 transition-colors duration-300 group-hover:text-primary/50"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="mt-6 text-lg font-bold tracking-wide uppercase">{m.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
          </article>
        </Reveal>
      ))}
    </ul>
  )
}
