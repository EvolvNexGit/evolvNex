"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import { toast } from "sonner"

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@evolvnex.com" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
  { icon: MapPin, label: "Location", value: "Mumbai, India" },
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
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success("Message sent successfully! We'll get back to you soon.")
    setFormData({ name: "", email: "", company: "", budget: "", message: "" })
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-primary text-sm uppercase tracking-widest font-bold mb-3">Get In Touch</p>
          <h2 className="text-4xl sm:text-5xl font-heading font-black uppercase tracking-tight">
            Contact Us
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-muted-foreground font-body leading-relaxed mb-12">
              Ready to transform your brand into a scalable growth system? Let's discuss your project and explore how we can help you achieve your goals.
            </p>
            
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
                  <option value="15k-30k">₹15,000 - ₹30,000</option>
                  <option value="30k-50k">₹30,000 - ₹50,000</option>
                  <option value="50k+">₹50,000+</option>
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
                placeholder="Tell us about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
