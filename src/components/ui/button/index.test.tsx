import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import { Button, buttonVariants } from '@/components/ui/button'

describe('Button component', () => {
  test('renders with text and responds to click', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>,
    )
    // Button text check
    const button = getByText(/click me/i)
    expect(button).toBeInTheDocument()
    // Checking one time click
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('applies custom className', () => {
    const { container } = render(
      <Button className="custom-class">Custom Button</Button>,
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  test('renders as a different element when asChild is true', () => {
    const { container } = render(
      <Button asChild>
        <a href="/">Link Button</a>
      </Button>,
    )
    expect(container.querySelector('a')).toBeInTheDocument()
  })

  test('is disabled when disabled prop is true', () => {
    const { getByText } = render(<Button disabled>Disabled Button</Button>)
    const button = getByText(/disabled button/i)
    expect(button).toBeDisabled()
  })

  test('applies variant and size classes', () => {
    const { getByText } = render(
      <Button variant="destructive" size="lg">
        Custom Button
      </Button>,
    )
    const button = getByText(/custom button/i)
    expect(button).toHaveClass(
      buttonVariants({ variant: 'destructive', size: 'lg' }),
    )
  })
})
