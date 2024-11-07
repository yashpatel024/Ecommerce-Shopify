'use client'

import { Button } from '@/components/ui/button'
import { FilterOption } from '@/types/filter.types'

interface FilterItemProps {
  label: string
  options: FilterOption[]
  selectedOptions: string[]
  onChange: (value: string) => void
}

export default function FilterItem({
  label,
  options,
  selectedOptions,
  onChange,
}: FilterItemProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option.value}
            variant={
              selectedOptions.includes(option.value) ? 'default' : 'outline'
            }
            size="sm"
            onClick={() => onChange(option.value)}
            className="text-xs"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
