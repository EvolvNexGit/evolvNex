import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const base =
  'group inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors duration-200'

const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-[#b91c1c]',
  secondary: 'border border-[#3a3a3a] text-foreground hover:bg-secondary hover:border-[#4a4a4a]',
  link: 'min-h-0 px-0 py-0 text-accent-text hover:text-foreground',
}

export function ButtonLink({
  href,
  variant = 'primary',
  arrow = false,
  className,
  children,
  ...rest
}: {
  href: string
  variant?: keyof typeof variants
  arrow?: boolean
  className?: string
  children: React.ReactNode
} & Omit<React.ComponentProps<'a'>, 'href'>) {
  const cls = cn(base, variants[variant], className)
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden
        />
      )}
    </>
  )
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  )
}
