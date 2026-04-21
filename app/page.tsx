import { ScrollProgress } from "@/components/scroll-progress"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { WorkShowcase } from "@/components/work-showcase"
import { WhoWeWorkWith } from "@/components/who-we-work-with"
import { Approach } from "@/components/approach"
import { Pricing } from "@/components/pricing"
import { FutureVision } from "@/components/future-vision"
import { CTABanner } from "@/components/cta-banner"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Services />
      <WorkShowcase />
      <WhoWeWorkWith />
      <Approach />
      <Pricing />
      <FutureVision />
      <CTABanner />
      <Contact />
      <Footer />
    </main>
  )
}