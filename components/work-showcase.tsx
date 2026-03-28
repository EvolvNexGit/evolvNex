"use client"

import Link from "next/link"
import Image from "next/image"

const topRowProjects = [
  { id: 1, name: "24K Springs Salon", image: "/images/work/24k-springs-salon.png", url: "#" },
  { id: 2, name: "AV Fitness", image: "/images/work/av-fitness-1.png", url: "#" },
  { id: 3, name: "AV Fitness 2", image: "/images/work/av-fitness-2.png", url: "#" },
  { id: 4, name: "Denson Unisex Salon", image: "/images/work/denson-unisex-salon.png", url: "#" },
  { id: 5, name: "K Fitness", image: "/images/work/k-fitness.png", url: "#" },
  { id: 6, name: "K Fitness 2", image: "/images/work/k-fitness-2.png", url: "#" },
]

const bottomRowProjects = [
  { id: 7, name: "Latelier One", image: "/images/work/latelier-one.png", url: "#" },
  { id: 8, name: "Nectar & Nature", image: "/images/work/nectar-nature.png", url: "#" },
  { id: 9, name: "Regain Clinic 1", image: "/images/work/regain-clinic-1.png", url: "#" },
  { id: 10, name: "Regain Clinic 2", image: "/images/work/regain-clinic-2.png", url: "#" },
  { id: 11, name: "The Comb Unisex Salon", image: "/images/work/the-comb-unisex-salon.png", url: "#" },
  { id: 12, name: "Studio11 Salon & Spa", image: "/images/work/studio11-salon.png", url: "#" },
]

function ProjectCard({
  project,
}: {
  project: { id: number; name: string; image: string; url: string }
}) {
  return (
    <Link
      href={project.url}
      className="relative flex-shrink-0 w-[400px] h-[250px] overflow-hidden border border-border bg-card"
    >
      <Image
        src={project.image}
        alt={project.name}
        fill
        className="object-cover"
      />
    </Link>
  )
}

export function WorkShowcase() {
  return (
    <section id="work" className="py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <p className="text-primary font-heading uppercase tracking-widest text-sm mb-4">
          Portfolio
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight">
          Our Work
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl">
          Websites and digital experiences we have built for our clients.
        </p>
      </div>

      <div className="relative mb-8">
        <div className="work-marquee-ltr flex gap-8">
          {[...topRowProjects, ...topRowProjects].map((project, index) => (
            <ProjectCard key={`top-${project.id}-${index}`} project={project} />
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="work-marquee-rtl flex gap-8">
          {[...bottomRowProjects, ...bottomRowProjects].map((project, index) => (
            <ProjectCard key={`bottom-${project.id}-${index}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
