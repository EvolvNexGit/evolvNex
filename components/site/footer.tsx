import Link from 'next/link'
import { Container } from './container'
import { FOOTER_LINKS, SITE, whatsappUrl } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Link href="/" className="text-xl font-extrabold tracking-tight">
              EVOLV<span className="text-primary">NEX</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Websites, branding, custom CRM and business systems, and workflow automation for
              growing businesses. Delivered remotely.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <h2 className="text-sm font-semibold">{title}</h2>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} EvolvNex. All rights reserved.</p>
          <p>Remote-first team working with clients online.</p>
        </div>
      </Container>
    </footer>
  )
}
