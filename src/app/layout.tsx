import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { CartProvider } from '@/context/cartContext'

const inter = Inter({ subsets: ['latin'] })

/*
  Set the metadata for the entire app
*/
export const metadata: Metadata = {
  title: 'Bravely - Furniture Store',
  description:
    'A beautiful and modern e-commerce store for high-quality furniture',
  keywords: ['furniture', 'home decor', 'modern furniture', 'interior design'],
  authors: [{ name: 'Bravely Team' }],
  creator: 'Bravely Furniture',
  publisher: 'Bravely Furniture',
  openGraph: {
    title: 'Bravely - Modern Furniture Store',
    description: 'Discover beautiful, high-quality furniture for your home',
    url: process.env.NEXT_PUBLIC_URL!,
    siteName: 'Bravely Furniture',
    images: [
      {
        url: process.env.NEXT_PUBLIC_UR + '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bravely - Modern Furniture Store',
    description: 'Discover beautiful, high-quality furniture for your home',
    images: [process.env.NEXT_PUBLIC_URL + '/twitter-image.jpg'],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ffffff',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-background-light text-primary-typography ${inter.className}`}
      >
        <CartProvider>
          <div className="container-div mx-0 h-full">
            <Header />
            <div className="pt-28">{children}</div>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
