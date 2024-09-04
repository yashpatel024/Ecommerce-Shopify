import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/sections/footer'
import Footer from '@/components/sections/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Brave - Furniture Store',
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
        <div className="container mx-auto px-4 h-full">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
