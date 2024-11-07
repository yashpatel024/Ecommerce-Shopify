import { FilterCategory } from '@/types/filter.types'

export const PRODUCT_FILTERS: FilterCategory[] = [
  {
    id: 'category',
    label: 'Product Type',
    options: [
      { label: 'Snowboard', value: 'snowboard' },
      { label: 'Gift Card', value: 'giftcard' },
      { label: 'Accessories', value: 'accessories' },
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
]

export const INITIAL_FILTER_STATE = {
  category: [],
  price: [],
  collection: [],
}
