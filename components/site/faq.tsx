import { Plus } from 'lucide-react'
import { JsonLd } from './json-ld'

export type FaqItem = { q: string; a: string }

/**
 * Numbered accordion built on native <details>, so every answer is in the server HTML
 * (crawlers and AI fetchers see it) and works without JS. Emits matching FAQPage JSON-LD.
 */
export function FAQ({ items, className }: { items: FaqItem[]; className?: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  }
  return (
    <div className={className ?? 'w-full max-w-3xl'}>
      <JsonLd data={jsonLd} />
      {items.map((item, i) => (
        <details
          key={item.q}
          name="faq"
          className="group/faq relative border-b border-border first:border-t"
        >
          <span
            aria-hidden
            className="absolute top-0 left-0 h-full w-0.5 origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover/faq:scale-y-100 group-open/faq:scale-y-100"
          />
          <summary className="flex w-full cursor-pointer list-none items-start gap-4 py-5 pr-1 pl-4 text-left outline-none marker:hidden sm:gap-6 sm:pl-6 [&::-webkit-details-marker]:hidden">
            <span className="font-display w-8 shrink-0 pt-0.5 text-sm text-primary/50 transition-colors group-hover/faq:text-primary group-open/faq:text-primary">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-sub flex-1 text-base font-bold transition-colors group-hover/faq:text-white sm:text-lg">
              {item.q}
            </span>
            <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center border border-border text-muted-foreground transition-all duration-300 group-hover/faq:border-primary group-open/faq:border-primary group-open/faq:bg-primary group-open/faq:text-white">
              <Plus className="size-4 transition-transform duration-300 group-open/faq:rotate-45" aria-hidden />
            </span>
          </summary>
          <p className="pr-12 pb-6 pl-12 leading-relaxed text-muted-foreground sm:pl-[3.75rem]">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  )
}

/** Two-column FAQ block: sticky heading left, accordion right. */
export function FaqSection({
  eyebrow = 'FAQ',
  title = 'Common questions',
  description,
  items,
}: {
  eyebrow?: string
  title?: string
  description?: string
  items: FaqItem[]
}) {
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
      <div className="lg:sticky lg:top-28">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="font-display text-3xl leading-tight uppercase sm:text-4xl">{title}</h2>
        {description && <p className="mt-4 text-muted-foreground">{description}</p>}
      </div>
      <FAQ items={items} className="w-full" />
    </div>
  )
}
