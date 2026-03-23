"use client"

import Image from "next/image"

const footerLinks = {
  Services: ["Websites", "Branding", "Automation", "Systems"],
  Company: ["About", "Careers", "Blog", "Contact"],
  Resources: ["Case Studies", "Guides", "Templates", "Newsletter"],
  Legal: ["Privacy", "Terms", "Cookies", "Licenses"],
}

export function Footer() {
  return (
    <footer className="bg-background border-t-4 border-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo & Tagline */}
          <div className="col-span-2">
            <Image
              src="/images/logo.jpg"
              alt="EvolvNex"
              width={140}
              height={40}
              className="h-10 w-auto mb-4"
            />
            <p className="text-muted-foreground font-light">
              Where Brands Become Systems.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-serif font-black text-sm uppercase tracking-wider mb-4">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} EvolvNex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
