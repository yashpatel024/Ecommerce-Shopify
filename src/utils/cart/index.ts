export const addToCart = (productId: string) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  if (!cart.includes(productId)) {
    cart.push(productId)
    localStorage.setItem('cart', JSON.stringify(cart))
  }
}

export const removeFromCart = (productId: string) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const updatedCart = cart.filter((id: string) => id !== productId)
  localStorage.setItem('cart', JSON.stringify(updatedCart))
}

export const getCartItems = (): string[] => {
  return JSON.parse(localStorage.getItem('cart') || '[]')
}
