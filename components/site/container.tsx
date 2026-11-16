import { cn } from '@/lib/utils'

export function Container({
  className,
  as: Tag = 'div',
  ...props
}: React.ComponentProps<'div'> & { as?: 'div' | 'header' | 'nav' | 'footer' }) {
  return (
    <Tag
      className={cn('mx-auto w-full max-w-[1200px] px-5 sm:px-8', className)}
      {...props}
    />
  )
}

/** Consistent vertical rhythm for page sections. */
export function Section({
  className,
  tone = 'base',
  ...props
}: React.ComponentProps<'section'> & { tone?: 'base' | 'surface' }) {
  return (
    <section
      className={cn(
        'py-12 md:py-16',
        tone === 'surface' && 'border-y border-border bg-card/50',
        className,
      )}
      {...props}
    />
  )
}
