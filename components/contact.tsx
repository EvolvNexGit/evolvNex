"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import { toast } from "sonner"

const contactInfo = [
  { icon: Mail, label: "Email", value: "team@evolvnex.com" },
  { icon: Phone, label: "Phone", value: "+91 9960083547 / +91 9294975962" },
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
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxCOLa0Nyg0JNQR5rM3tMTKMYE4oWx-q0HdYz5LCxwgtu72t2_-loblv3tegx6e9Vxj/exec",
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      )

      const text = await response.text()
      let data
      try {
        data = JSON.parse(text)
      } catch {
        console.error("Invalid JSON response:", text)
        throw new Error("Invalid response from server")
      }

      if (data.status === "success") {
        toast.success("Message sent successfully! We'll get back to you soon.")
        setFormData({
          name: "",
          email: "",
          company: "",
          budget: "",
          message: "",
        })
      } else {
        console.error("Script error:", data)
        toast.error("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      toast.error("Failed to send. Check your connection.")
    }

    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
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

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-background border border-border flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                      {item.label}
                    </div>
                    <div className="flex flex-col gap-1">
                      {item.label === "Email" && (
                        <a
                          href={`mailto:${item.value}`}
                          className="text-primary hover:underline"
                        >
                          {item.value}
                        </a>
                      )}

                      {item.label === "Phone" &&
                        item.value.split("/").map((num, i) => (
                          <a
                            key={i}
                            href={`tel:${num.replace(/\s/g, "")}`}
                            className="text-primary hover:underline"
                          >
                            {num.trim()}
                          </a>
                        ))
                      }

                      {item.label !== "Email" && item.label !== "Phone" && (
                        <span>{item.value}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-6">
              <input
                required
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-background border border-border px-4 py-3 focus:border-primary focus:outline-none"
              />

              <input
                required
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-background border border-border px-4 py-3 focus:border-primary focus:outline-none"
              />
            </div>

            {/* Company + Budget */}
            <div className="grid sm:grid-cols-2 gap-6">
              <input
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-background border border-border px-4 py-3 focus:border-primary focus:outline-none"
              />

              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full bg-background border border-border px-4 py-3 focus:border-primary focus:outline-none"
              >
                <option value="">Budget</option>
                <option value="10k-20k">₹10k–₹20k</option>
                <option value="20k-40k">₹20k–₹40k</option>
                <option value="40k-70k">₹40k–₹70k</option>
                <option value="70k+">₹70k+</option>
              </select>
            </div>

            {/* Message (Optional) */}
            <textarea
              rows={5}
              placeholder="Tell us about your project... (optional)"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-background border border-border px-4 py-3 focus:border-primary focus:outline-none resize-none"
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-4 font-bold uppercase tracking-widest disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Book Free Consultation"}
            </button>

            {/* Trust line */}
            <p className="text-xs text-muted-foreground text-center">
              We typically respond within 24 hours
            </p>

          </motion.form>
        </div>
      </div>
    </section>
  )
}
