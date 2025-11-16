'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { modelsDatabase } from '@/lib/models-db'

const colors = ['#54b6ff', '#2dd4bf', '#34d399', '#f97316', '#8b5cf6']

interface FairnessComparisonProps {
  selectedModels: string[]
}

export function FairnessComparison({ selectedModels }: FairnessComparisonProps) {
  const selectedModelData = modelsDatabase.filter(m => selectedModels.includes(m.id))

  if (selectedModelData.length === 0) return null

  // Build fairness data from real model biases
  const fairnessData = [
    {
      category: 'Gender',
      ...Object.fromEntries(selectedModelData.map(m => [m.name, m.bias.gender]))
    },
    {
      category: 'Race/Ethnicity',
      ...Object.fromEntries(selectedModelData.map(m => [m.name, m.bias.race]))
    },
    {
      category: 'Age',
      ...Object.fromEntries(selectedModelData.map(m => [m.name, m.bias.age]))
    },
    {
      category: 'Disability',
      ...Object.fromEntries(selectedModelData.map(m => [m.name, m.bias.disability]))
    },
    {
      category: 'Socioeconomic',
      ...Object.fromEntries(selectedModelData.map(m => [m.name, m.bias.socioeconomic]))
    }
  ]

  const avgFairness = (model: any) => {
    const biasValues = Object.values(model.bias) as number[]
    return Math.round(biasValues.reduce((a, b) => a + b) / biasValues.length)
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Fairness & Bias Mitigation</CardTitle>
        <CardDescription className="text-muted-foreground">
          Comparative fairness scores across demographic groups (higher = fairer treatment)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={fairnessData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="category" stroke="#999" />
            <YAxis stroke="#999" domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
              cursor={{ fill: 'rgba(84, 182, 255, 0.1)' }}
              formatter={(value) => `${value}%`}
            />
            <Legend />
            {selectedModelData.map((model, idx) => (
              <Bar key={model.id} dataKey={model.name} fill={colors[idx % colors.length]} radius={[8, 8, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>

        {/* Summary Statistics */}
        <div className="grid gap-4 md:grid-cols-2 pt-4 border-t border-border">
          {selectedModelData.map((model, idx) => {
            const avg = avgFairness(model)
            const worstDimension = Object.entries(model.bias).sort((a, b) => (a[1] as number) - (b[1] as number))[0]
            const bestDimension = Object.entries(model.bias).sort((a, b) => (b[1] as number) - (a[1] as number))[0]
            
            return (
              <div key={model.id} className="p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[idx % colors.length] }}
                  />
                  <h4 className="font-semibold text-foreground">{model.name}</h4>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Fairness:</span>
                    <span className="font-semibold text-foreground">{avg}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best Performance:</span>
                    <span className="font-semibold text-primary capitalize">{bestDimension[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Needs Improvement:</span>
                    <span className="font-semibold text-destructive capitalize">{worstDimension[0]}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Interpretation Guide */}
        <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20 space-y-2">
          <p className="text-xs font-semibold text-foreground">Understanding Fairness Scores:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>80-100%: Excellent fairness across this demographic group</li>
            <li>70-80%: Good fairness with some documented biases</li>
            <li>60-70%: Moderate fairness - significant disparities exist</li>
            <li>Below 60%: Poor fairness - serious bias concerns documented</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
