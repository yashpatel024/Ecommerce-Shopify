'use client'

import { Button } from '@/components/ui/button'

interface FilterItemProps {
  label: string
  options: string[]
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
            key={option}
            variant={selectedOptions.includes(option) ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChange(option)}
            className="text-xs"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  )
}
