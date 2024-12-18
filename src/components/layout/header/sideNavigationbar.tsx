import HamburgerMenu from '@/components/ui/icons/hamburgerMenu'
import { NAVIGATION_LINKS, type NavigationLink } from '@/constants/navLinks'
import Link from 'next/link'
import { useEffect, useRef, Suspense } from 'react'
import CollectionsNav from '@/components/layout/header/collectionsNav'

interface SideNavigationBarProps {
  isScrolled: boolean
  sidebarOpen: boolean
  toggleSidebar: (setState?: boolean) => void
  activeSubmenu: number | null
  isAdjacentSidebarOpen: boolean
  toggleAdjacentSidebar: (index: number | null) => void
}

export default function SideNavigationBar({
  isScrolled,
  sidebarOpen,
  toggleSidebar,
  activeSubmenu,
  isAdjacentSidebarOpen,
  toggleAdjacentSidebar,
}: SideNavigationBarProps) {
  const sideNavRef = useRef<HTMLDivElement>(null)

  // Mouse Down event to check for handling clickOutSide of SideNavigation bar
  useEffect(() => {
    // Move function inside useEffect
    function handleClickOutside(event: Event) {
      if (
        sideNavRef.current &&
        !sideNavRef?.current?.contains(event.target as HTMLDivElement)
      ) {
        toggleSidebar(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [sidebarOpen, toggleSidebar])

  return (
    <div ref={sideNavRef}>
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
        NAVIGATION_LINKS[activeSubmenu].href === '/products' && (
          <div
            className={`fixed z-10 top-0 -left-0 h-full w-64 bg-gray-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
              isAdjacentSidebarOpen && sidebarOpen
                ? 'translate-x-64'
                : '-translate-x-full'
            }`}
          >
            <div className="p-4">
              <Suspense
                fallback={
                  <div className="animate-pulse space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-6 bg-gray-200 rounded w-3/4" />
                    ))}
                  </div>
                }
              >
                <CollectionsNav />
              </Suspense>
              {/* Keep existing submenu code for other tabs
            {NAVIGATION_LINKS[activeSubmenu].submenu &&
              NAVIGATION_LINKS[activeSubmenu].submenu!.length > 0 &&
              activeSubmenu !== 0 && (
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
              )} */}
            </div>
          </div>
        )}
    </div>
  )
}
