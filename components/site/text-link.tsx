import Link from 'next/link'

/** Inline contextual internal link (descriptive anchor text, visible underline). */
export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-accent-text underline underline-offset-2 hover:text-foreground">
      {children}
    </Link>
  )
}
