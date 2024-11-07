export type FilterOption = {
  label: string
  value: string
}

export type FilterCategory = {
  id: string
  label: string
  options: FilterOption[]
}

export type FilterState = {
  category: string[]
  price: string[]
}
