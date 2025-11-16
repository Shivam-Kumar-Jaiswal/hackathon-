'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from 'recharts'
import { modelsDatabase } from '@/lib/models-db'

const colors = ['#54b6ff', '#2dd4bf', '#34d399', '#f97316']

interface PerformanceComparisonProps {
  selectedModels: string[]
}

export function PerformanceComparison({ selectedModels }: PerformanceComparisonProps) {
  const selectedModelData = modelsDatabase.filter(m => selectedModels.includes(m.id))

  if (selectedModelData.length === 0) return null

  // Build comparison categories
  const chartData = [
    {
      category: 'Accuracy',
      ...Object.fromEntries(selectedModelData.map(m => [m.name, m.performance.accuracy]))
    },
    {
      category: 'Reasoning',
      ...Object.fromEntries(selectedModelData.map(m => [m.name, m.performance.reasoning]))
    },
    {
      category: 'Hallucination Guard',
      ...Object.fromEntries(selectedModelData.map(m => [m.name, m.performance.hallucination]))
    },
    {
      category: 'Safety',
      ...Object.fromEntries(selectedModelData.map(m => [m.name, m.performance.safety]))
    },
    {
      category: 'Transparency',
      ...Object.fromEntries(selectedModelData.map(m => [m.name, m.transparency]))
    }
  ]

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Performance & Transparency Comparison</CardTitle>
        <CardDescription className="text-muted-foreground">
          Multi-dimensional capabilities and ethical metrics analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={chartData}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis dataKey="category" stroke="#999" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis stroke="#999" angle={90} domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
              formatter={(value) => `${value}%`}
            />
            {selectedModelData.map((model, idx) => (
              <Radar
                key={model.id}
                name={model.name}
                dataKey={model.name}
                stroke={colors[idx % colors.length]}
                fill={colors[idx % colors.length]}
                fillOpacity={0.15}
              />
            ))}
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
