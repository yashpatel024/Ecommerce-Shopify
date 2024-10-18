import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import Cart from '.'
import { useRouter } from 'next/navigation'
import { getCartItemsCount } from '@/lib/session-store'

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock the getCartItemsCount function
jest.mock('@/lib/session-store', () => ({
  getCartItemsCount: jest.fn().mockResolvedValue(0),
}))

describe('Cart Component', () => {
  // MockPush that simulates useRouter's Push method(for routing)
  const mockPush = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
  })

  test('renders without crashing', () => {
    render(<Cart />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('displays cart item count', async () => {
    ;(getCartItemsCount as jest.Mock).mockResolvedValue(5)
    render(<Cart />)

    // Wait for the cart item count to be displayed
    expect(await screen.findByText('5')).toBeInTheDocument()
  })

  test('navigates to cart page on button click', () => {
    render(<Cart />)
    fireEvent.click(screen.getByRole('button'))
    expect(mockPush).toHaveBeenCalledWith('/cart')
  })
})
