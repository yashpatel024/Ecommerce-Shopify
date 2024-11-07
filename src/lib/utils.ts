import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get the host URL
export const getHostUrl = (): string => {
  // For custom production domain - Server Side Rendering
  if (process.env.PRODUCTION_URL) {
    return process.env.PRODUCTION_URL
  }

  // For custom production domain - Client Side Rendering
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  // For local development
  return process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''
}
