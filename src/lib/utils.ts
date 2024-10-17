import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get the host URL
export const getHostUrl = () => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'

  const host =
    process.env.NODE_ENV === 'production'
      ? process.env.VERCEL_URL!
      : 'localhost:3000'

  return `${protocol}://${host}`
}
