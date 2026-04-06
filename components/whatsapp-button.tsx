'use client'

import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
  const phoneNumber = '919960083547'

  const message = 'Hi EvolvNex, I want to know more about your services 🚀'

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

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
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg 
                   bg-black border border-red-500 text-red-500 
                   hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110"
      >
        <FaWhatsapp size={26} />
      </a>
    </div>
  )
}
