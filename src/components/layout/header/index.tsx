import Link from 'next/link'
import NavLinks from './navLinks'
import IconLinks from './iconLinks'

const HeaderLogo = () => {
  return (
    <Link href="/">
      <h1 className="text-2xl font-bold text-gray-800">Bravely</h1>
    </Link>
  )
}

// TODO: Add mobile menu button
const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white w-full">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <HeaderLogo />
          <NavLinks />
          <IconLinks />
        </div>
      </nav>
    </header>
  )
}

export default Header
