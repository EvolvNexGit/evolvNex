'use client'

import { useState } from 'react'
import Image from 'next/image'

const topRowProjects = [
  { id: 5, name: "K Fitness", image: "/images/work/k-fitness.png", url: "#" },
  { id: 1, name: "24K Springs Salon", image: "/images/work/24k-springs-salon.png", url: "#" },
  { id: 2, name: "AV Fitness", image: "/images/work/av-fitness-1.png", url: "#" },
  { id: 4, name: "Denson Unisex Salon", image: "/images/work/denson-unisex-salon.png", url: "#" },
  { id: 3, name: "AV Fitness 2", image: "/images/work/av-fitness-2.png", url: "#" },
  { id: 12, name: "Studio11 Salon & Spa", image: "/images/work/studio11-salon.png", url: "#" },
]

const bottomRowProjects = [
  { id: 6, name: "K Fitness 2", image: "/images/work/k-fitness-2.png", url: "#" },
  { id: 11, name: "The Comb Unisex Salon", image: "/images/work/the-comb-unisex-salon.png", url: "#" },
  { id: 9, name: "Regain Clinic 1", image: "/images/work/regain-clinic-1.png", url: "#" },
  { id: 8, name: "Nectar & Nature", image: "/images/work/nectar-nature.png", url: "#" },
  { id: 10, name: "Regain Clinic 2", image: "/images/work/regain-clinic-2.png", url: "#" },
  { id: 7, name: "Latelier One", image: "/images/work/latelier-one.png", url: "#" },
]

export function WorkShowcase() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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

      {/* Top Row */}
      <div className="relative mb-8 overflow-hidden group">
        <div className="work-marquee-ltr flex gap-8 group-hover:[animation-play-state:paused]">
          {[...topRowProjects, ...topRowProjects].map((project, index) => (
            <div
              key={`top-${project.id}-${index}`}
              onClick={() => setSelectedImage(project.image)}
              className="cursor-pointer flex-shrink-0 w-[400px] h-[250px] overflow-hidden border border-border bg-card group"
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-heading uppercase tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-4 py-2 border border-white/20 backdrop-blur">
                  View Project
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="relative overflow-hidden group">
        <div className="work-marquee-rtl flex gap-8 group-hover:[animation-play-state:paused]">
          {[...bottomRowProjects, ...bottomRowProjects].map((project, index) => (
            <div
              key={`bottom-${project.id}-${index}`}
              onClick={() => setSelectedImage(project.image)}
              className="cursor-pointer flex-shrink-0 w-[400px] h-[250px] overflow-hidden border border-border bg-card group"
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-heading uppercase tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-4 py-2 border border-white/20 backdrop-blur">
                  View Project
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔍 Lightbox */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-6"
        >
          <div className="relative w-full max-w-5xl h-[70vh]">
            <Image
              src={selectedImage}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}
