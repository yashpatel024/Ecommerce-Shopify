import { Heart, Search, ShoppingCart, Menu } from 'lucide-react'
import Link from 'next/link'

// TODO: Add mobile menu button
const IconLinks = () => (
  <div className="flex items-center space-x-4">
    <button aria-label="Search" className="hidden sm:block">
      <Search className="h-6 w-6 text-gray-600" />
    </button>
    <Link href="/favorites" aria-label="Favorites" className="hidden sm:block">
      <Heart className="h-6 w-6 text-gray-600" />
    </Link>
    <Link href="/cart" aria-label="Shopping Cart">
      <ShoppingCart className="h-6 w-6 text-gray-600" />
    </Link>
    {/* Mobile menu button */}
    <button aria-label="Menu" className="md:hidden">
      <Menu className="h-6 w-6 text-gray-600" />
    </button>
  </div>
)

export default IconLinks
