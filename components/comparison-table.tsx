'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { modelsDatabase } from '@/lib/models-db'

interface ComparisonTableProps {
  selectedModels: string[]
}

export function ComparisonTable({ selectedModels }: ComparisonTableProps) {
  const selectedModelData = modelsDatabase.filter(m => selectedModels.includes(m.id))

  if (selectedModelData.length === 0) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">Select models to compare</p>
        </CardContent>
      </Card>
    )
  }

  const metrics = [
    { key: 'provider', label: 'Provider', type: 'text' },
    { key: 'releaseDate', label: 'Released', type: 'text' },
    { key: 'trainingDataSize', label: 'Training Size', type: 'text' },
    { key: 'transparency', label: 'Transparency', type: 'score' },
    { key: 'hallucination', label: 'Hallucination Guard', type: 'score' },
    { key: 'reasoning', label: 'Reasoning', type: 'score' },
    { key: 'safety', label: 'Safety', type: 'score' },
    { key: 'accuracy', label: 'Accuracy', type: 'score' },
    { key: 'latency', label: 'Response Time (ms)', type: 'latency' }
  ]

  const getMetricValue = (model: any, metricKey: string) => {
    if (metricKey === 'trainingDataSize') return model.trainingData.size
    if (metricKey === 'hallucination') return model.performance.hallucination
    if (metricKey === 'reasoning') return model.performance.reasoning
    if (metricKey === 'safety') return model.performance.safety
    if (metricKey === 'accuracy') return model.performance.accuracy
    if (metricKey === 'latency') return model.performance.latency
    return model[metricKey]
  }

  return (
    <Card className="border-border bg-card overflow-hidden">
      <CardHeader>
        <CardTitle className="text-foreground">Detailed Comparison</CardTitle>
        <CardDescription className="text-muted-foreground">
          Comprehensive metrics across all selected models
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Metric</th>
              {selectedModelData.map(model => (
                <th key={model.id} className="text-center py-3 px-4 text-muted-foreground font-semibold">
                  {model.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map(metric => (
              <tr key={metric.key} className="border-b border-border hover:bg-primary/5">
                <td className="py-3 px-4 font-semibold text-foreground">
                  {metric.label}
                </td>
                {selectedModelData.map(model => {
                  const value = getMetricValue(model, metric.key)
                  
                  return (
                    <td key={model.id} className="py-3 px-4 text-center">
                      {metric.type === 'score' ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-2 w-16 rounded-full bg-border">
                            <div 
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${value}%` }}
                            />
                          </div>
                          <span className="font-semibold text-foreground w-8">{value}%</span>
                        </div>
                      ) : metric.type === 'latency' ? (
                        <span className="text-foreground">{value}ms</span>
                      ) : (
                        <span className="text-foreground">{value}</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
