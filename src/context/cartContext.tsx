'use client'
import React, { createContext, useContext, useReducer, useEffect } from 'react'

export type CartItem = {
  handle: string
  quantity: number
}

type CartState = {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: string }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { handle: string; quantity: number } }
  | { type: 'CLEAR_CART' }

type CartContextType = {
  state: CartState
  dispatch: React.Dispatch<CartAction>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(
        (item) => item.handle === action.payload,
      )
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.handle === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { handle: action.payload, quantity: 1 }],
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.handle !== action.payload),
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.handle === action.payload.handle
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      dispatch({ type: 'CLEAR_CART' })
      JSON.parse(savedCart).forEach((item: CartItem) => {
        dispatch({ type: 'ADD_ITEM', payload: item.handle })
      })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items))
  }, [state.items])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
