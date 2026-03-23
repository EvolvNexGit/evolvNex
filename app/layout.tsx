import type { Metadata } from 'next'
import { Merriweather, Roboto } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const merriweather = Merriweather({ 
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-merriweather"
});

const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-roboto"
});

export const metadata: Metadata = {
  title: 'EvolvNex | Digital Growth Agency',
  description: 'We Build Digital Growth Systems - Where Brands Become Systems',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${merriweather.variable} ${roboto.variable} font-sans antialiased`}>
        {children}
        <Toaster position="bottom-right" />
        <Analytics />
      </body>
    </html>
  )
}
