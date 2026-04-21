"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { name: "Systems", href: "#services" },
  { name: "Approach", href: "#approach" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2"
          >
            <Image
              src="/symbol.png"
              alt="Evolvnex Logo"
              width={28}
              height={28}
              priority
            />
            <span className="text-2xl font-black tracking-tight">
              EVOLV<span className="text-[#FF3B3B]">NEX</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-body font-medium"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("#contact")}
              className="bg-primary text-primary-foreground px-6 py-2.5 text-sm uppercase tracking-widest font-bold hover:bg-primary/90 transition-colors"
            >
              Get Growth Audit
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-7 w-7" strokeWidth={2} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center justify-between px-6 h-20">
                
                {/* Mobile Logo */}
                <div className="flex items-center gap-2">
                  <Image
                    src="/symbol.png"
                    alt="Evolvnex Logo"
                    width={28}
                    height={28}
                  />
                  <span className="text-2xl font-black tracking-tight">
                    EVOLV<span className="text-[#FF3B3B]">NEX</span>
                  </span>
                </div>

                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-7 w-7" />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center flex-1 gap-8">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => scrollToSection(link.href)}
                    className="text-2xl font-black uppercase tracking-widest hover:text-primary transition-colors"
                  >
                    {link.name}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  onClick={() => scrollToSection("#contact")}
                  className="mt-4 bg-primary text-primary-foreground px-8 py-4 text-lg font-bold uppercase tracking-widest"
                >
                  Get Growth Audit
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
