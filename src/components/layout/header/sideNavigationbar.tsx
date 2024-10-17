import HamburgerMenu from '@/components/ui/icons/hamburgerMenu'
import { NAVIGATION_LINKS, type NavigationLink } from '@/constants/navLinks'
import Link from 'next/link'

interface SideNavigationBarProps {
  isScrolled: boolean
  sidebarOpen: boolean
  toggleSidebar: () => void
  activeSubmenu: number | null
  isAdjacentSidebarOpen: boolean
  toggleAdjacentSidebar: (index: number | null) => void
}

export default function SideNavigationBar({
  isScrolled,
  sidebarOpen = false,
  toggleSidebar,
  activeSubmenu,
  isAdjacentSidebarOpen,
  toggleAdjacentSidebar,
}: SideNavigationBarProps) {
  return (
    <div onMouseLeave={() => toggleAdjacentSidebar(null)}>
      <div
        className={`fixed z-20 top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className={`px-8 ${isScrolled ? 'pt-4' : 'pt-6'}`}>
          <HamburgerMenu
            isSidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
            className="p-2 w-10 h-10 flex items-center justify-center"
          />
          <nav>
            <ul>
              {NAVIGATION_LINKS.map((item: NavigationLink, index) => (
                <li
                  key={index}
                  className="mb-2"
                  onMouseEnter={() => toggleAdjacentSidebar(index)}
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded"
                    >
                      {item.name}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {activeSubmenu !== null &&
        NAVIGATION_LINKS[activeSubmenu].submenu &&
        NAVIGATION_LINKS[activeSubmenu].submenu.length > 0 && (
          <div
            className={`fixed z-10 top-0 -left-0 h-full w-64 bg-gray-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
              isAdjacentSidebarOpen && sidebarOpen
                ? 'translate-x-64'
                : '-translate-x-full'
            }`}
          >
            <div className="p-4">
              <ul>
                {NAVIGATION_LINKS[activeSubmenu].submenu!.map(
                  (subItem: NavigationLink, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        href={subItem.href}
                        className="block py-2 px-4 hover:bg-gray-200 rounded"
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        )}
    </div>
  )
}
