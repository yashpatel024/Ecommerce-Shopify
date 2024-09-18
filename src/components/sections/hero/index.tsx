import Image from 'next/image'
import { Button } from '@/components/ui/button/button'

export default function Hero() {
  return (
    <section className="relative w-screen h-[80vh]">
      <div className="absolute inset-0">
        <Image
          src="/hero-image.jpg"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          priority
          className="brightness-50 blur-[1px]"
        />
      </div>
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        <h1 className="flex flex-col text-4xl sm:text-5xl md:text-6xl font-bold text-light-typography mb-4 space-y-2">
          <span>Classic Sounds,</span>
          <span>Modern Performance</span>
        </h1>
        <Button
          variant="outline"
          className="mt-6"
          onClick={{
            action: 'redirect',
            path: '/products',
          }}
        >
          SHOP NOW
        </Button>
      </div>
    </section>
  )
}
