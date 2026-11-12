'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { Project } from '@/lib/projects'

function Card({ project, hidden }: { project: Project; hidden?: boolean }) {
  const [open, setOpen] = useState(false)
  const cover = project.images[0]
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          tabIndex={hidden ? -1 : 0}
          aria-label={`View ${project.name} screenshots`}
          className="group relative block w-[300px] shrink-0 text-left sm:w-[440px]"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-card transition-[border-color,transform] duration-500 group-hover:-translate-y-2 group-hover:border-primary">
            <Image
              src={cover.src}
              alt={hidden ? '' : cover.alt}
              fill
              sizes="440px"
              className="object-cover object-top grayscale-[0.85] transition-[transform,filter] duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute top-4 right-4 inline-flex size-10 scale-75 items-center justify-center rounded-full bg-primary text-white opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
              <ArrowUpRight className="size-5" aria-hidden />
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-3 px-1">
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

/** Auto-moving strip of featured projects. Pauses on hover/focus. */
export function ProjectMarquee({ projects }: { projects: Project[] }) {
  return (
    <div className="marquee overflow-hidden py-4">
      <div className="marquee-track gap-0" style={{ ['--marquee-duration' as string]: '55s' }}>
        {[0, 1].map((dup) => (
          <ul key={dup} aria-hidden={dup === 1} className="flex shrink-0 gap-6 pr-6">
            {projects.map((p) => (
              <li key={p.slug}>
                <Card project={p} hidden={dup === 1} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
