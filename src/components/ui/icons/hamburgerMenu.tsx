import { Menu, X } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface HamburgerMenuProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
  className?: string
}

export default function HamburgerMenu({
  toggleSidebar,
  isSidebarOpen,
  className,
}: HamburgerMenuProps) {
  return (
    /* Hamburger menu button */
    <button
      onClick={toggleSidebar}
      className={twMerge(
        'p-2 w-10 h-10 flex items-center justify-center',
        className,
      )}
    >
      {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  )
}
