import React from 'react'
import type { ButtonProps } from './index.d'

const Button = ({ text }: ButtonProps) => {
  return (
    <button className="bg-red-500 text-white px-4 py-2 rounded-md">
      {text}
    </button>
  )
}

export default Button
