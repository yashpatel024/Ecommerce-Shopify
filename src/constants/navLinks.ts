export interface NavigationLink {
  href: string
  name: string
  submenu?: NavigationLink[]
}

export const NAVIGATION_LINKS: NavigationLink[] = [
  { href: '/', name: 'Home' },
  {
    href: '/products',
    name: 'Products',
    submenu: [{ href: '/category/1', name: 'Category 1' }],
  },
  { href: '/about', name: 'About' },
  { href: '/contact', name: 'Contact' },
]
