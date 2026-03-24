"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import { toast } from "sonner"

const contactInfo = [
  { icon: Mail, label: "Email", value: "team@evolvnex.com" },
  { icon: Phone, label: "Phone", value: "+91 8369902721 / +91 8292759774" },
  { icon: MapPin, label: "Location", value: "Delhi, India" },
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("YOUR_GOOGLE_SCRIPT_URL", {
        method: "POST",
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.status === "success") {
        toast.success("Message sent successfully! We'll get back to you soon.")
        setFormData({ name: "", email: "", company: "", budget: "", message: "" })
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } catch (error) {
      toast.error("Failed to send. Check your connection.")
    }

    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-primary text-sm uppercase tracking-widest font-bold mb-3">
            Get In Touch
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-black uppercase tracking-tight mb-4">
            Let’s Grow Your Business
          </h2>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            Looking to get more leads, bookings, or customers? Let’s discuss your business and build a system that actually delivers results.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-background border border-border flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                      {item.label}
                    </div>
                    <div className="font-body">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-body"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-body"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-body"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Budget</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-body"
                >
                  <option value="">Select budget range</option>
                  <option value="10k-20k">₹10,000 - ₹20,000</option>
                  <option value="20k-40k">₹20,000 - ₹40,000</option>
                  <option value="40k-70k">₹40,000 - ₹70,000</option>
                  <option value="70k+">₹70,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Message *</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-background border border-border px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors resize-none font-body"
                placeholder="Tell us about your business and what you want to achieve..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Book Free Consultation"}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              We typically respond within 24 hours
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
