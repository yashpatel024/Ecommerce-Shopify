import { NAV_LINKS } from '@/constants/navLinks'
import Link from 'next/link'

const NavLinks = () => {
  return (
    <ul className="text-gray-600">
      {NAV_LINKS.map((link, index) => (
        <li key={index} className="mb-2">
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  )
}

export default NavLinks
