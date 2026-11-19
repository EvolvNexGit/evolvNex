/**
 * Real website screenshots already published on the existing EvolvNex site.
 * No client URLs, outcomes or descriptions are recorded because none were supplied.
 * TODO (business): confirm permission to publish each project and add live links / details.
 */
export type Project = {
  slug: string
  name: string
  /** Neutral descriptor derived from the project name; omit when unclear. */
  type?: string
  /** Live website. When set, the showroom cell opens it in a new tab. */
  url?: string
  images: { src: string; alt: string }[]
}

export const PROJECTS: Project[] = [
  {
    slug: 'k-fitness',
    name: 'K Fitness',
    type: 'Fitness website',
    images: [
      { src: '/images/work/k-fitness.png', alt: 'K Fitness website homepage screenshot' },
      { src: '/images/work/k-fitness-2.png', alt: 'K Fitness website inner page screenshot' },
    ],
  },
  {
    slug: 'av-fitness',
    name: 'AV Fitness',
    type: 'Fitness website',
    images: [
      { src: '/images/work/av-fitness-1.png', alt: 'AV Fitness website homepage screenshot' },
      { src: '/images/work/av-fitness-2.png', alt: 'AV Fitness website inner page screenshot' },
    ],
  },
  {
    slug: 'regain-clinic',
    name: 'Regain Clinic',
    type: 'Clinic website',
    images: [
      { src: '/images/work/regain-clinic-1.png', alt: 'Regain Clinic website homepage screenshot' },
      { src: '/images/work/regain-clinic-2.png', alt: 'Regain Clinic website inner page screenshot' },
    ],
  },
  {
    slug: '24k-springs-salon',
    name: '24K Springs Salon',
    type: 'Salon website',
    images: [
      { src: '/images/work/24k-springs-salon.png', alt: '24K Springs Salon website screenshot' },
    ],
  },
  {
    slug: 'denson-unisex-salon',
    name: 'Denson Unisex Salon',
    type: 'Salon website',
    images: [
      { src: '/images/work/denson-unisex-salon.png', alt: 'Denson Unisex Salon website screenshot' },
    ],
  },
  {
    slug: 'the-comb-unisex-salon',
    name: 'The Comb Unisex Salon',
    type: 'Salon website',
    images: [
      { src: '/images/work/the-comb-unisex-salon.png', alt: 'The Comb Unisex Salon website screenshot' },
    ],
  },
  {
    slug: 'studio11-salon-spa',
    name: 'Studio11 Salon & Spa',
    type: 'Salon & spa website',
    images: [
      { src: '/images/work/studio11-salon.png', alt: 'Studio11 Salon & Spa website screenshot' },
    ],
  },
  {
    slug: 'nectar-and-nature',
    name: 'Nectar & Nature',
    images: [
      { src: '/images/work/nectar-nature.png', alt: 'Nectar & Nature website screenshot' },
    ],
  },
  {
    slug: 'latelier-one',
    name: 'Latelier One',
    images: [{ src: '/images/work/latelier-one.png', alt: 'Latelier One website screenshot' }],
  },
]

export const FEATURED_PROJECT_SLUGS = ['k-fitness', 'regain-clinic', '24k-springs-salon']
