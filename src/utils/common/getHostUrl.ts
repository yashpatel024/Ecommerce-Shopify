import { headers } from 'next/headers'

const getHostUrl = () => {
  return `${protocol}://${host}`
}

export default getHostUrl
