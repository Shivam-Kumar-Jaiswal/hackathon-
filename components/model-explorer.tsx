'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { modelsDatabase, AIModel } from '@/lib/models-db'
import { Search } from 'lucide-react'

interface ModelExplorerProps {
  selectedModel: string
  onSelectModel: (modelId: string) => void
  category: string
}

export function ModelExplorer({ selectedModel, onSelectModel, category }: ModelExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredModels = useMemo(() => {
    let result = modelsDatabase

    // Filter by category
    if (category !== 'all') {
      result = result.filter(m => m.category === category)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        m.capabilities.some(c => c.toLowerCase().includes(q))
      )
    }

    return result
  }, [category, searchQuery])

  const selected = selectedModel
    ? modelsDatabase.find(m => m.id === selectedModel) || modelsDatabase[0]
    : modelsDatabase[0]

  // Create performance data from real metrics
  const performanceData = selected ? [
    { task: 'Accuracy', score: selected.performance.accuracy },
    { task: 'Reasoning', score: selected.performance.reasoning },
    { task: 'Hallucination Guard', score: selected.performance.hallucination },
    { task: 'Safety', score: selected.performance.safety }
  ] : []

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search models by name, provider, or capability..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background border-border"
        />
        {searchQuery && (
          <p className="text-xs text-muted-foreground mt-2">
            Found {filteredModels.length} model{filteredModels.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Model List */}
      <div className="space-y-3">
        {filteredModels.length > 0 ? (
          filteredModels.map(model => (
            <Card
              key={model.id}
              className={`cursor-pointer border transition-all ${
                selectedModel === model.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onSelectModel(model.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-foreground">{model.name}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {model.provider} • Released {model.releaseDate}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-primary text-primary-foreground whitespace-nowrap">
                      {model.transparency}% Transparent
                    </Badge>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {model.capabilities.slice(0, 3).map((cap, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {cap}
                    </Badge>
                  ))}
                  {model.capabilities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{model.capabilities.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))
        ) : (
          <Card className="border-border bg-card/50">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No models found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Performance Metrics */}
      {selected && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Performance Metrics</CardTitle>
            <CardDescription className="text-muted-foreground">
              Benchmark scores across key dimensions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="task" stroke="#999" />
                <YAxis stroke="#999" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                  cursor={{ fill: 'rgba(84, 182, 255, 0.1)' }}
                  formatter={(value) => `${value}%`}
                />
                <Bar dataKey="score" fill="#54b6ff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
