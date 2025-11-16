'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { modelsDatabase } from '@/lib/models-db'

interface ModelSelectorProps {
  selectedModels: string[]
  onChange: (models: string[]) => void
}

export function ModelSelector({ selectedModels, onChange }: ModelSelectorProps) {
  const handleToggleModel = (modelId: string) => {
    if (selectedModels.includes(modelId)) {
      onChange(selectedModels.filter(m => m !== modelId))
    } else if (selectedModels.length < 4) {
      onChange([...selectedModels, modelId])
    }
  }

  const handleRemoveModel = (modelId: string) => {
    onChange(selectedModels.filter(m => m !== modelId))
  }

  const unselectedModels = modelsDatabase.filter(m => !selectedModels.includes(m.id))

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Select Models to Compare</CardTitle>
        <CardDescription className="text-muted-foreground">
          Choose between 1 and 4 models to compare across performance, bias, transparency, and safety dimensions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selected Models */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">Selected ({selectedModels.length}/4)</p>
          <div className="flex flex-wrap gap-2">
            {selectedModels.map(modelId => {
              const model = modelsDatabase.find(m => m.id === modelId)
              return (
                <Badge key={modelId} className="bg-primary/20 text-primary border-primary/30 py-2 px-3 pr-1 flex items-center gap-2">
                  <span>{model?.name}</span>
                  <button
                    onClick={() => handleRemoveModel(modelId)}
                    className="hover:bg-primary/20 rounded p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )
            })}
          </div>
        </div>

        {/* Available Models */}
        {selectedModels.length < 4 && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">Available Models</p>
            <div className="grid gap-2 md:grid-cols-2">
              {unselectedModels.map(model => (
                <Button
                  key={model.id}
                  variant="outline"
                  onClick={() => handleToggleModel(model.id)}
                  className="justify-start border-border hover:bg-primary/10 hover:text-foreground text-muted-foreground"
                >
                  <span className="flex-1 text-left">
                    <div className="font-semibold">{model.name}</div>
                    <div className="text-xs">{model.provider}</div>
                  </span>
                  <span className="ml-2">+</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
