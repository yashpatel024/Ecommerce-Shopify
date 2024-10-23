'use client'

import { useState } from 'react'
import FilterItem from './filterItem'

interface FilterBarProps {
  onFilterChange: (filters: Record<string, string[]>) => void
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<Record<string, string[]>>({
    category: [],
    price: [],
    brand: [],
    size: [],
  })

  const handleFilterChange = (type: string, value: string) => {
    const newFilters = { ...filters }
    const currentTypeFilters = newFilters[type]

    if (currentTypeFilters.includes(value)) {
      newFilters[type] = currentTypeFilters.filter((item) => item !== value)
    } else {
      newFilters[type] = [...currentTypeFilters, value]
    }

    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <FilterItem
        label="Category"
        options={[
          'Complete Skateboards',
          'Decks',
          'Trucks',
          'Wheels',
          'Bearings',
          'Hardware',
        ]}
        selectedOptions={filters.category}
        onChange={(value) => handleFilterChange('category', value)}
      />
      <FilterItem
        label="Price Range"
        options={['$0-$50', '$50-$100', '$100-$200', '$200+']}
        selectedOptions={filters.price}
        onChange={(value) => handleFilterChange('price', value)}
      />
      <FilterItem
        label="Brand"
        options={[
          'Element',
          'Santa Cruz',
          'Baker',
          'Independent',
          'Spitfire',
          'Bones',
        ]}
        selectedOptions={filters.brand}
        onChange={(value) => handleFilterChange('brand', value)}
      />
      <FilterItem
        label="Deck Size"
        options={['7.75"', '8.0"', '8.25"', '8.5"', '8.75"']}
        selectedOptions={filters.size}
        onChange={(value) => handleFilterChange('size', value)}
      />
    </div>
  )
}
