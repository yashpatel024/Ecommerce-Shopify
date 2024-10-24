import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get the host URL
export const getHostUrl = (): string => {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.PRODUCTION_URL!
}
