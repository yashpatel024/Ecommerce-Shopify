import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bravely - Furniture Store',
  description: 'A beautiful and modern e-commerce store',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-background-light text-primary-typography ${inter.className}`}
      >
        <div className="container mx-auto h-full">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
