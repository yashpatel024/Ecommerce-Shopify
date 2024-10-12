import BestSellers from '@/components/sections/bestSellers'
import Hero from '@/components/sections/hero'

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />
      <BestSellers />
    </main>
  )
}
