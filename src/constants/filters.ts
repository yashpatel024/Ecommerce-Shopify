import { FilterCategory } from '@/types/filter.types'

export const PRODUCT_FILTERS: FilterCategory[] = [
  {
    id: 'category',
    label: 'Category',
    options: [
      { label: 'snowboard', value: 'Snowboard' },
      { label: 'giftcard', value: 'Gift Card' },
      { label: 'accessories', value: 'Accessories' },
    ],
  },
  {
    id: 'price',
    label: 'Price Range',
    options: [
      { label: '$0-$50', value: '$0-$50' },
      { label: '$50-$100', value: '$50-$100' },
      { label: '$100-$200', value: '$100-$200' },
      { label: '$200+', value: '$200+' },
    ],
  },
  {
    id: 'brand',
    label: 'Brand',
    options: [
      { label: 'Element', value: 'Element' },
      { label: 'Santa Cruz', value: 'Santa Cruz' },
      { label: 'Baker', value: 'Baker' },
      { label: 'Independent', value: 'Independent' },
      { label: 'Spitfire', value: 'Spitfire' },
      { label: 'Bones', value: 'Bones' },
    ],
  },
  {
    id: 'size',
    label: 'Deck Size',
    options: [
      { label: '7.75"', value: '7.75"' },
      { label: '8.0"', value: '8.0"' },
      { label: '8.25"', value: '8.25"' },
      { label: '8.5"', value: '8.5"' },
      { label: '8.75"', value: '8.75"' },
    ],
  },
]

export const INITIAL_FILTER_STATE = {
  category: [],
  price: [],
  brand: [],
  size: [],
}
