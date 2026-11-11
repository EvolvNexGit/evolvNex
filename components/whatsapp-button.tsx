import { whatsappUrl } from '@/lib/site'

/** Floating WhatsApp shortcut (secondary conversion). Pure server component, no JS. */
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with EvolvNex on WhatsApp"
      className="group fixed right-4 bottom-4 z-30 inline-flex size-14 items-center justify-center rounded-full border border-[#3a3a3a] bg-card text-foreground shadow-lg transition-colors duration-200 hover:border-primary hover:bg-primary sm:right-6 sm:bottom-6"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-7" aria-hidden>
        <path d="M20.52 3.48A11.82 11.82 0 0 0 12.01 0C5.38 0 .01 5.37.01 12c0 2.12.56 4.2 1.62 6.03L0 24l6.18-1.61A11.96 11.96 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 21.82c-1.82 0-3.6-.49-5.15-1.42l-.37-.22-3.67.96.98-3.57-.24-.37A9.8 9.8 0 0 1 2.2 12c0-5.4 4.4-9.8 9.8-9.8 2.62 0 5.08 1.02 6.94 2.88A9.75 9.75 0 0 1 21.8 12c0 5.4-4.4 9.82-9.8 9.82zm5.37-7.33c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.15-.19.29-.73.93-.9 1.12-.16.19-.32.22-.6.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.61-2.01-.16-.29-.02-.45.12-.6.12-.12.29-.32.43-.48.14-.16.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.11-.23-.56-.46-.48-.64-.49h-.55c-.19 0-.51.07-.78.36-.26.29-1 1-1 2.43s1.02 2.8 1.16 3c.14.19 2 3.05 4.85 4.28.68.29 1.2.46 1.6.59.67.21 1.27.18 1.75.11.53-.08 1.7-.69 1.94-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.55-.34z" />
      </svg>
    </a>
  )
}
