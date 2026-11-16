import { Container } from '@/components/site/container'
import { Skeleton } from '@/components/ui/skeleton'

/** Shown while a dynamic route (e.g. /contact) renders on the server. */
export default function Loading() {
  return (
    <div role="status" aria-label="Loading page" className="py-16 md:py-24">
      <Container className="space-y-6">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-12 w-full max-w-2xl" />
        <Skeleton className="h-5 w-full max-w-xl" />
        <div className="grid gap-5 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-48 rounded-lg" />
          ))}
        </div>
      </Container>
    </div>
  )
}
