import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import HamburgerMenu from './index'

describe('HamburgerMenu Component', () => {
  const mockToggleSidebar = jest.fn()

  test('renders without crashing', () => {
    render(
      <HamburgerMenu isSidebarOpen={false} toggleSidebar={mockToggleSidebar} />,
    )
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('displays Menu icon when sidebar is closed', () => {
    render(
      <HamburgerMenu isSidebarOpen={false} toggleSidebar={mockToggleSidebar} />,
    )
    expect(screen.getByRole('button')).toContainHTML('<svg')
  })

  test('calls toggleSidebar function on button click', () => {
    render(
      <HamburgerMenu isSidebarOpen={false} toggleSidebar={mockToggleSidebar} />,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(mockToggleSidebar).toHaveBeenCalledTimes(1)
  })
})
