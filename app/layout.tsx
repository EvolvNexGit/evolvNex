import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import WhatsAppButton from '@/components/whatsapp-button'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Providers } from '@/components/site/providers'
import { JsonLd } from '@/components/site/json-ld'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo'
import { SITE } from '@/lib/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'EvolvNex | Websites, Branding, CRM & Automation',
    template: '%s | EvolvNex',
  },
  description:
    'EvolvNex builds business websites, brand identities, custom CRM systems and automation workflows that help teams present their business, manage operations and stay connected with customers.',
  applicationName: SITE.name,
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/symbol.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0C0C0C',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <WhatsAppButton />
        <Toaster position="bottom-right" theme="dark" />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GWNE687LV4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GWNE687LV4');
          `}
        </Script>
        <Analytics />
      </body>
    </html>
  )
}
