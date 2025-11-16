'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { BiasVisualization } from '@/components/bias-visualization'
import { BiasHeatmap } from '@/components/bias-heatmap'
import { BiasComparison } from '@/components/bias-comparison'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function BiasReportPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl mb-2">
              AI Bias Report
            </h1>
            <p className="text-muted-foreground mb-6">
              Comprehensive analysis of biases across AI models and demographic groups
            </p>
            
            {/* Alert Box */}
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <AlertCircleIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Transparency in Action</p>
                    <p className="text-sm text-muted-foreground">
                      This report analyzes bias patterns across leading AI models. Higher transparency means more documented and understood biases, not necessarily fewer biases.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 lg:grid-cols-4 mb-8">
            {/* Summary Stats */}
            {[
              { label: 'Models Analyzed', value: '42', color: 'bg-primary' },
              { label: 'Bias Categories', value: '18', color: 'bg-secondary' },
              { label: 'Documented Issues', value: '156', color: 'bg-accent' },
              { label: 'Fairness Score', value: '72%', color: 'bg-primary' }
            ].map((stat, i) => (
              <Card key={i} className="border-border bg-card">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <BiasVisualization selectedCategory={selectedCategory} />
          <BiasHeatmap />
          <BiasComparison />
        </div>
      </div>
    </main>
  )
}

function AlertCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}
