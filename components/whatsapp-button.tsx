'use client'

import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
  const phoneNumber = '919960083547'
  const message = 'Hi EvolvNex, I want to grow my business 🚀'

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg 
                 bg-green-500 hover:bg-green-600 transition-all duration-300 hover:scale-110"
    >
      <FaWhatsapp size={26} />
    </a>
  )
}
