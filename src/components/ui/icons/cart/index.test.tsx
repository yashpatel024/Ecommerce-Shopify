import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import Cart from '.'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/cartContext'

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock the getCartItemsCount function
jest.mock('@/context/cartContext', () => ({
  useCart: jest.fn(),
}))

describe('Cart Component', () => {
  // MockPush that simulates useRouter's Push method(for routing)
  const mockPush = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
    ;(useCart as jest.Mock).mockReturnValue({ cart: { totalQuantity: 0 } })
  })

  test('renders without crashing', () => {
    render(<Cart />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('displays cart item count', async () => {
    ;(useCart as jest.Mock).mockReturnValue({ cart: { totalQuantity: 5 } })
    render(<Cart />)
    expect(await screen.findByText('5')).toBeInTheDocument()
  })

  test('navigates to cart page on button click', () => {
    render(<Cart />)
    fireEvent.click(screen.getByRole('button'))
    expect(mockPush).toHaveBeenCalledWith('/cart')
  })
})
