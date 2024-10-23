import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { CartProvider } from '@/context/cartContext'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

/*
  Set the metadata for the entire app
*/
export const metadata: Metadata = {
  title: 'Bravely - Skateboard Store',
  description:
    'A modern e-commerce store for premium skateboards and accessories',
  keywords: [
    'skateboard',
    'skate gear',
    'decks',
    'trucks',
    'wheels',
    'bearings',
  ],
  authors: [{ name: 'Shredz Team' }],
  creator: 'Shredz Skateboards',
  publisher: 'Shredz Skateboards',
  openGraph: {
    title: 'Shredz - Premium Skateboard Store',
    description: 'Discover premium skateboards and gear for every style',
    url: process.env.NEXT_PUBLIC_URL!,
    siteName: 'Shredz Skateboards',
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
    title: 'Shredz - Premium Skateboard Store',
    description: 'Discover premium skateboards and gear for every style',
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
  const cartId = (await cookies()).get('cartId')?.value

  return (
    <html lang="en">
      <body
        className={`bg-background-light text-primary-typography ${inter.className}`}
      >
        <CartProvider initialCartId={cartId}>
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
