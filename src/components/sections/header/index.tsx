import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="w-full h-20 top-0 z-50">
      <div className="flex justify-between items-center h-full">
        {/* <Logo /> */}
        <nav className="flex items-center space-x-6 font-medium text-lg text-secondary-typography">
          <Link href="/">
            <p>Home</p>
          </Link>
          <Link href="/products">
            <p>Products</p>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
