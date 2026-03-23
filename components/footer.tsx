"use client"

const footerLinks = {
  Services: ["Web Development", "Brand Identity", "Automation", "Growth Systems"],
  Company: ["About", "Careers", "Blog", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service"],
}

const socialLinks = [
  { name: "Twitter", href: "#" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/evolvnex/" },
  { name: "Instagram", href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo & Tagline */}
          <div className="col-span-2">
            <span className="text-2xl font-black tracking-tight mb-4 block">EVOLVNEX</span>
            <p className="text-muted-foreground font-body mb-6">
              Where Brands Become Systems.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Copyright */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-body">
            © {new Date().getFullYear()} EvolvNex. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground font-body">
            Built with precision. Designed for growth.
          </p>
        </div>
      </div>
    </footer>
  )
}
