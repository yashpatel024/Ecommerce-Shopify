'use client'

import { useState, useEffect } from 'react'
import FilterItem from './filterItem'
import { PRODUCT_FILTERS } from '@/constants/filters'
import type { FilterState } from '@/types/filter.types'

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void
  initialFilters: FilterState
}

export default function FilterBar({
  onFilterChange,
  initialFilters,
}: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters)

  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  const handleFilterChange = (type: string, value: string) => {
    const newFilters = { ...filters }
    const currentTypeFilters = newFilters[type as keyof FilterState]

    if (currentTypeFilters.includes(value)) {
      newFilters[type as keyof FilterState] = currentTypeFilters.filter(
        (item) => item !== value,
      )
    } else {
      newFilters[type as keyof FilterState] = [...currentTypeFilters, value]
    }

    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      {PRODUCT_FILTERS.map((filter) => (
        <FilterItem
          key={filter.id}
          label={filter.label}
          options={filter.options}
          selectedOptions={filters[filter.id as keyof FilterState]}
          onChange={(value) => handleFilterChange(filter.id, value)}
        />
      ))}
    </div>
  )
}
