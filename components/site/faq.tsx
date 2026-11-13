'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'

export type FaqItem = { q: string; a: string }

/**
 * Numbered accordion. The row lifts a red rail on hover/open, the plus turns into
 * a cross, and the answer slides open (Radix animates height via CSS variables).
 */
export function FAQ({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <Accordion.Root type="single" collapsible className={className ?? 'w-full max-w-3xl'}>
      {items.map((item, i) => (
        <Accordion.Item
          key={item.q}
          value={`item-${i}`}
          className="group/faq relative border-b border-border first:border-t"
        >
          <span
            aria-hidden
            className="absolute top-0 left-0 h-full w-0.5 origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover/faq:scale-y-100 group-data-[state=open]/faq:scale-y-100"
          />
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-start gap-4 py-5 pr-1 pl-4 text-left outline-none sm:gap-6 sm:pl-6">
              <span className="font-display w-8 shrink-0 pt-0.5 text-sm text-primary/50 transition-colors group-hover/faq:text-primary group-data-[state=open]/faq:text-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-sub flex-1 text-base font-bold transition-colors group-hover/faq:text-white sm:text-lg">
                {item.q}
              </span>
              <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center border border-border text-muted-foreground transition-all duration-300 group-hover/faq:border-primary group-data-[state=open]/faq:border-primary group-data-[state=open]/faq:bg-primary group-data-[state=open]/faq:text-white">
                <Plus className="size-4 transition-transform duration-300 group-data-[state=open]/faq:rotate-45" aria-hidden />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
            <p className="pr-12 pb-6 pl-12 leading-relaxed text-muted-foreground sm:pl-[3.75rem]">
              {item.a}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
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
