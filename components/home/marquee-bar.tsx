const ITEMS = [
  'Website Development',
  'Branding',
  'CRM',
  'WhatsApp Automation',
  'SEO-Ready Builds',
  'Food & Beverage CRM',
  'Healthcare CRM',
]

/** Right-to-left ticker. Duplicated once so the -50% loop is seamless. */
export function MarqueeBar() {
  return (
    <section
      aria-label="Capabilities"
      className="marquee overflow-hidden border-b border-border py-5"
    >
      <div className="marquee-track" style={{ ['--marquee-duration' as string]: '38s' }}>
        {[0, 1].map((dup) => (
          <ul key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center">
            {ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center whitespace-nowrap text-lg font-bold uppercase tracking-wide text-foreground/85 transition-colors duration-300 hover:text-primary sm:text-2xl"
              >
                <span className="px-5 sm:px-8">{item}</span>
                <span className="text-sm text-primary sm:text-base" aria-hidden>
                  ✦
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
