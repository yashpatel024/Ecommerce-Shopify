'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

interface ButtonOnClick {
  action: 'redirect' | 'action'
  path?: string
  callbackAction?: (...args: any[]) => void
  args?: any[]
}

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'outline'
  className?: string
  onClick: ButtonOnClick
  type?: 'submit' | 'button'
  disabled?: boolean
}

const baseStyles =
  'px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200'

const variantStyles = {
  primary:
    'bg-primary-typography text-light-typography hover:bg-light-secondary-typography hover:text-background-light',
  outline:
    'border border-background-light text-light-typography hover:bg-background-light hover:text-primary-typography',
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  ...props
}: ButtonProps) {
  const router = useRouter()

  const handleButtonClick = () => {
    if (onClick.action === 'redirect' && onClick.path) {
      router.push(onClick.path)
    } else if (onClick.action === 'action' && onClick.callbackAction) {
      onClick.callbackAction(...(onClick.args || []))
    }
  }

  return (
    <button
      {...props}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={handleButtonClick}
    >
      {children}
    </button>
  )
}
