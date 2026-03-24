"use client"

import Link from "next/link"
import Image from "next/image"

// Placeholder data - replace images and URLs with actual client work
const topRowProjects = [
  { id: 1, name: "Client Project 1", image: "/images/work/project-1.jpg", url: "https://example.com/project1" },
  { id: 2, name: "Client Project 2", image: "/images/work/project-2.jpg", url: "https://example.com/project2" },
  { id: 3, name: "Client Project 3", image: "/images/work/project-3.jpg", url: "https://example.com/project3" },
  { id: 4, name: "Client Project 4", image: "/images/work/project-4.jpg", url: "https://example.com/project4" },
  { id: 5, name: "Client Project 5", image: "/images/work/project-5.jpg", url: "https://example.com/project5" },
  { id: 6, name: "Client Project 6", image: "/images/work/project-6.jpg", url: "https://example.com/project6" },
]

const bottomRowProjects = [
  { id: 7, name: "Client Project 7", image: "/images/work/project-7.jpg", url: "https://example.com/project7" },
  { id: 8, name: "Client Project 8", image: "/images/work/project-8.jpg", url: "https://example.com/project8" },
  { id: 9, name: "Client Project 9", image: "/images/work/project-9.jpg", url: "https://example.com/project9" },
  { id: 10, name: "Client Project 10", image: "/images/work/project-10.jpg", url: "https://example.com/project10" },
  { id: 11, name: "Client Project 11", image: "/images/work/project-11.jpg", url: "https://example.com/project11" },
  { id: 12, name: "Client Project 12", image: "/images/work/project-12.jpg", url: "https://example.com/project12" },
]

function ProjectCard({ project }: { project: { id: number; name: string; image: string; url: string } }) {
  return (
    <Link
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex-shrink-0 w-[400px] h-[250px] overflow-hidden border border-border bg-card transition-all duration-300 hover:border-primary"
    >
      {/* Placeholder background */}
      <div className="absolute inset-0 bg-secondary flex items-center justify-center">
        <span className="text-muted-foreground font-heading uppercase tracking-widest text-sm">
          {project.name}
        </span>
      </div>
      
      {/* Image - will show when actual images are added */}
      <Image
        src={project.image}
        alt={project.name}
        fill
        className="object-cover opacity-0 group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
          // Hide broken images, show placeholder instead
          e.currentTarget.style.display = 'none'
        }}
      />
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
        <span className="text-foreground font-heading uppercase tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 px-4 py-2 border border-primary">
          View Site
        </span>
      </div>
    </Link>
  )
}

export function WorkShowcase() {
  return (
    <section id="work" className="py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <p className="text-primary font-heading uppercase tracking-widest text-sm mb-4">Portfolio</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight">
          Our Work
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl">
          Websites and digital experiences we have built for our clients. Click to visit each project.
        </p>
      </div>

      {/* Top Row - Moving Left to Right */}
      <div className="relative mb-8">
        <div className="work-marquee-ltr flex gap-8">
          {[...topRowProjects, ...topRowProjects].map((project, index) => (
            <ProjectCard key={`top-${project.id}-${index}`} project={project} />
          ))}
        </div>
      </div>

      {/* Bottom Row - Moving Right to Left */}
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
