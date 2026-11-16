import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = 'h2',
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}) {
  return (
    <div className={cn('max-w-2xl', className)}>
      {eyebrow && (
        <p className="eyebrow mb-3">
          {eyebrow}
        </p>
      )}
      <Tag className="font-display text-3xl leading-tight uppercase sm:text-4xl">{title}</Tag>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
