import HamburgerMenu from '@/components/ui/icons/hamburgerMenu'

interface MobileMenuProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export default function MobileMenu({
  isSidebarOpen,
  toggleSidebar,
}: MobileMenuProps) {
  return (
    <div className="container block md:hidden bg-light-secondary-typography text-white">
      <div className="mx-auto h-12 flex items-center justify-between">
        <span className="font-semibold">Menu</span>
        <HamburgerMenu
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          className="flex md:hidden"
        />
      </div>
    </div>
  )
}
