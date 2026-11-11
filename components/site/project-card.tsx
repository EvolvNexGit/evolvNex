'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Expand } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import type { Project } from '@/lib/projects'

/** Screenshot card; opens an accessible (Radix) dialog with the full image(s). */
export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const cover = project.images[0]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group block w-full text-left"
          aria-label={`View ${project.name} screenshots`}
        >
          <div className="relative aspect-[2.2/1] overflow-hidden rounded-lg border border-border bg-card">
            {!loaded && <Skeleton className="absolute inset-0 rounded-none" aria-hidden />}
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              priority={priority}
              onLoad={() => setLoaded(true)}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute right-3 bottom-3 inline-flex size-9 items-center justify-center rounded-md bg-background/90 text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              <Expand className="size-4" aria-hidden />
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-3">
            <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
            {project.type && <p className="text-sm text-muted-foreground">{project.type}</p>}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto border-border bg-card p-4 sm:max-w-5xl sm:p-6">
        <DialogTitle>{project.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Screenshots of the {project.name} website.
        </DialogDescription>
        <div className="mt-2 space-y-4">
          {project.images.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={1840}
              height={800}
              sizes="(min-width: 1024px) 960px, 100vw"
              className="h-auto w-full rounded-md border border-border"
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
