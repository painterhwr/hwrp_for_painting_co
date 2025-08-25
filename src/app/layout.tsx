import './globals.css'
import { AuthProvider } from '@/lib/auth'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HWRP – Painting Co',
  description: 'Job management dashboard for painting and contracting businesses'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}