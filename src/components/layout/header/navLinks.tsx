'use client'

import { NAV_LINKS } from '@/constants/navLinks'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NavLinks = () => {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex items-center space-x-8 text-">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-secondary-typography hover:primary-typography ${
            pathname === link.href
              ? 'font-bold text-gray-900'
              : 'hover:text-gray-900'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}

export default NavLinks
