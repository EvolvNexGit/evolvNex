'use client'

import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000) // delay for premium feel
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  const phoneNumber = '919960083547'

  // Capture page source dynamically
  const source =
    typeof window !== 'undefined' ? window.location.pathname : ''

  const message = `Hi EvolvNex, I came from ${source} and want to know more 🚀`

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`

  const handleClick = () => {
    // Google Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: source || 'unknown',
      })
    }
  }

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Label */}
      <span className="hidden md:block bg-black text-white text-sm px-3 py-1 rounded shadow">
        Chat with us
      </span>

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg 
                   bg-black border border-red-500 text-red-500 
                   hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110"
      >
        <FaWhatsapp size={26} />
      </a>
    </div>
  )
}
