import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pulsar ICT',
  description: 'Pulsar ICT is a company that provides ICT services to businesses.',
  generator: 'Pulsar ICT',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
