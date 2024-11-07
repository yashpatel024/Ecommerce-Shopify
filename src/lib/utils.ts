import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get the host URL
export const getHostUrl = (): string => {
  console.log('Getting host URL', window)
  // For absolute URLs in special cases
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  // For server-side and API routes, use relative paths
  return 'http://localhost:3000'
}
