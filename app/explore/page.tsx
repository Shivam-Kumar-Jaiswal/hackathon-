'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { ModelExplorer } from '@/components/model-explorer'
import { ExplainabilityPanel } from '@/components/explainability-panel'
import { FilterBar } from '@/components/filter-bar'

export default function ExplorePage() {
  const [selectedModel, setSelectedModel] = useState('claude-3')
  const [filterCategory, setFilterCategory] = useState('all')

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl mb-2">
              Explore AI Models
            </h1>
            <p className="text-muted-foreground">
              Understand how different models make decisions and their transparency metrics
            </p>
          </div>

          <FilterBar category={filterCategory} onChange={setFilterCategory} />

          <div className="grid gap-8 lg:grid-cols-3 mt-8">
            <div className="lg:col-span-2">
              <ModelExplorer 
                selectedModel={selectedModel}
                onSelectModel={setSelectedModel}
                category={filterCategory}
              />
            </div>
            <div className="lg:col-span-1">
              <ExplainabilityPanel model={selectedModel} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
