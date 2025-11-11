import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fooocus Platform',
  description: 'Secure access to Fooocus AI image generation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
