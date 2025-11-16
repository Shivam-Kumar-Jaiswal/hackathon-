'use client'

import { Button } from '@/components/ui/button'

const categories = [
  { id: 'all', label: 'All Models' },
  { id: 'language', label: 'Language Models' },
  { id: 'vision', label: 'Vision Models' },
  { id: 'multimodal', label: 'Multimodal' },
  { id: 'specialized', label: 'Specialized' }
]

interface FilterBarProps {
  category: string
  onChange: (category: string) => void
}

export function FilterBar({ category, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(cat => (
        <Button
          key={cat.id}
          variant={category === cat.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(cat.id)}
          className={category === cat.id ? 'bg-primary hover:bg-primary/90' : 'border-border hover:bg-card'}
        >
          {cat.label}
        </Button>
      ))}
    </div>
  )
}
