'use client'

import Link from 'next/link'
import Cart from '@/components/ui/icons/cart'
import { useEffect, useState } from 'react'
import MobileMenu from '@/components/layout/header/mobileMenu'
import SideNavigationBar from '@/components/layout/header/sideNavigationbar'
import HamburgerMenu from '@/components/ui/icons/hamburgerMenu'

const HeaderLogo = () => {
  return (
    <Link href="/">
      <h1 className="text-2xl font-bold text-gray-800">Bravely</h1>
    </Link>
  )
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null)
  const [isAdjacentSidebarOpen, setIsAdjacentSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    if (isSidebarOpen == false) {
      setIsAdjacentSidebarOpen(false)
      setActiveSubmenu(null)
    }
  }

  const toggleAdjacentSidebar = (index: null | number) => {
    if (index !== null) {
      setActiveSubmenu(index)
      setIsAdjacentSidebarOpen(true)
    } else {
      setActiveSubmenu(null)
      setIsAdjacentSidebarOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full bg-white transition-all duration-300 ${isScrolled ? 'h-16' : 'h-24'}`}
    >
      <div className="container-div relative w-full h-full flex items-center justify-between">
        {/* Tablet and Desktop Hamburger menu button */}
        <HamburgerMenu
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          className="hidden md:block"
        />
        <HeaderLogo />
        <Cart cartItems={0} />
      </div>
      {/* Mobile menu Navigation bar */}
      <MobileMenu isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Sidebar Navigation Bar*/}
      <SideNavigationBar
        isScrolled={isScrolled}
        sidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeSubmenu={activeSubmenu}
        isAdjacentSidebarOpen={isAdjacentSidebarOpen}
        toggleAdjacentSidebar={toggleAdjacentSidebar}
      />
    </header>
  )
}

export default Header
