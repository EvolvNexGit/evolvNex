"use client"

const footerLinks = {
  Services: [
    "Web Development",
    "Brand Identity",
    "AI Automation",
    "Funnels & Growth Systems",
  ],
  Company: ["About", "Blog", "Contact"], // ❌ Careers removed
  Legal: ["Privacy Policy", "Terms of Service"],
}

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/evolvnex/",
  },
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Logo & Tagline */}
          <div className="col-span-2">
            <span className="text-2xl font-black tracking-tight mb-4 block">
              EVOLVNEX
            </span>

            <p className="text-muted-foreground font-body mb-4">
              Where Brands Become Scalable Systems.
            </p>

            <p className="text-sm text-muted-foreground/70 mb-6 max-w-sm">
              We design, build, and automate digital experiences that drive growth.
            </p>

            {/* ✅ ONLY CLICKABLE CTA */}
            <a
              href="/contact"
              className="text-sm text-primary font-semibold hover:underline"
            >
              → Book a Strategy Call
            </a>

            {/* Socials (still clickable) */}
            <div className="flex gap-6 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary transition-all duration-300 uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* ❌ Non-clickable Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li
                    key={link}
                    className="text-sm text-muted-foreground font-body"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Line */}
        <div className="text-center text-xs text-muted-foreground/50 mt-12">
          Built for ambitious brands. Designed to scale.
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-body">
            © {new Date().getFullYear()} EvolvNex. All rights reserved.
          </p>

          <p className="text-sm text-muted-foreground/70 font-body">
            Engineered for performance. Built for scale.
          </p>
        </div>

      </div>
    </footer>
  )
}
