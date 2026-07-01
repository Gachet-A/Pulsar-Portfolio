import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { siteConfig } from '@/lib/site'
import StructuredData from '@/components/structured-data'
import { ConsentProvider } from '@/components/consent-provider'
import Analytics from '@/components/analytics'
import CookieConsent from '@/components/cookie-consent'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const title = `${siteConfig.name} — ${siteConfig.tagline}`

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  generator: siteConfig.name,
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    // Set NEXT_PUBLIC_GSC_VERIFICATION to the token from Google Search Console
    // (or verify via DNS instead and leave this empty).
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={siteConfig.lang} className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}>
      <body className="font-sans">
        <StructuredData />
        <ConsentProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <Toaster />
          <CookieConsent />
          <Analytics />
        </ConsentProvider>
      </body>
    </html>
  )
}
