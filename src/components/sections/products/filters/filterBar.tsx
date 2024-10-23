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
    color: [],
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
        options={['Furniture', 'Decor', 'Lighting', 'Storage']}
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
        label="Color"
        options={['Black', 'White', 'Brown', 'Gray', 'Blue']}
        selectedOptions={filters.color}
        onChange={(value) => handleFilterChange('color', value)}
      />
    </div>
  )
}
