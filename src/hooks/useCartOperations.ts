import { useCart } from '@/context/cartContext'

export const useCartOperations = () => {
  const { state, dispatch } = useCart()

  const addToCart = (handle: string) => {
    dispatch({ type: 'ADD_ITEM', payload: handle })
  }

  const removeFromCart = (handle: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: handle })
  }

  const updateQuantity = (handle: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(handle)
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { handle, quantity } })
    }
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getCartItemsCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0)
  }

  return {
    cartItems: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemsCount,
  }
}
