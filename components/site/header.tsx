'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ButtonLink } from './button-link'
import { Container } from './container'
import { NAV_LINKS } from '@/lib/site'
import { cn } from '@/lib/utils'

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="EvolvNex home">
      <Image src="/symbol.png" alt="" width={28} height={28} priority />
      <span className="font-display text-xl">
        EVOLV<span className="text-primary">NEX</span>
      </span>
    </Link>
  )
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        // transparent at all times; a light blur keeps nav text readable over content
        scrolled ? 'border-white/10 bg-background/20 backdrop-blur-md' : 'border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-[72px]">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-foreground',
                  active ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href="/contact" className="hidden min-h-10 py-2 sm:inline-flex">
            Discuss a Project
          </ButtonLink>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex size-11 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-secondary lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" aria-hidden />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm border-border bg-background p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <nav aria-label="Mobile" className="flex h-full flex-col px-6 pt-20 pb-8">
                <ul className="flex flex-col">
                  {[{ name: 'Home', href: '/' }, ...NAV_LINKS].map((link) => (
                    <li key={link.href} className="border-b border-border">
                      <SheetClose asChild>
                        <Link
                          href={link.href}
                          aria-current={pathname === link.href ? 'page' : undefined}
                          className={cn(
                            'flex min-h-14 items-center text-lg font-medium',
                            pathname === link.href ? 'text-accent-text' : 'text-foreground',
                          )}
                        >
                          {link.name}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <SheetClose asChild>
                    <ButtonLink href="/contact" className="w-full" arrow>
                      Discuss a Project
                    </ButtonLink>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
