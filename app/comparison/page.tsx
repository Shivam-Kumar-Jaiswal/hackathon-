'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { ModelSelector } from '@/components/model-selector'
import { ComparisonTable } from '@/components/comparison-table'
import { PerformanceComparison } from '@/components/performance-comparison'
import { FairnessComparison } from '@/components/fairness-comparison'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ComparisonPage() {
  const [selectedModels, setSelectedModels] = useState(['claude-3', 'gpt-4-turbo'])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl mb-2">
              Model Comparison
            </h1>
            <p className="text-muted-foreground">
              Compare AI models across performance, fairness, transparency, and ethical dimensions
            </p>
          </div>

          <ModelSelector selectedModels={selectedModels} onChange={setSelectedModels} />
          
          <div className="mt-8 space-y-8">
            <ComparisonTable selectedModels={selectedModels} />
            <PerformanceComparison selectedModels={selectedModels} />
            <FairnessComparison selectedModels={selectedModels} />
          </div>
        </div>
      </div>
    </main>
  )
}
