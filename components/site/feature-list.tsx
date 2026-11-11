import { Check } from 'lucide-react'

/** Plain checklist for feature/module lists (not every list needs to be cards). */
export function FeatureList({ items, columns = 2 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <ul className={columns === 2 ? 'grid gap-x-10 gap-y-3 sm:grid-cols-2' : 'space-y-3'}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-foreground/90">
          <Check className="mt-1 size-4 shrink-0 text-accent-text" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Honest-scope callout used on CRM / service pages. */
export function ScopeNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-border bg-secondary px-5 py-4 text-sm leading-relaxed text-muted-foreground">
      {children}
    </p>
  )
}
