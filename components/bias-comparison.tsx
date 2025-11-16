'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from 'recharts'
import { modelsDatabase } from '@/lib/models-db'

export function BiasComparison() {
  const comparisonData = [
    {
      category: 'Gender Fairness',
      ...Object.fromEntries(modelsDatabase.map(m => [m.name, m.bias.gender]))
    },
    {
      category: 'Racial Fairness',
      ...Object.fromEntries(modelsDatabase.map(m => [m.name, m.bias.race]))
    },
    {
      category: 'Age Fairness',
      ...Object.fromEntries(modelsDatabase.map(m => [m.name, m.bias.age]))
    },
    {
      category: 'Disability Fairness',
      ...Object.fromEntries(modelsDatabase.map(m => [m.name, m.bias.disability]))
    },
    {
      category: 'Transparency',
      ...Object.fromEntries(modelsDatabase.map(m => [m.name, m.transparency]))
    },
    {
      category: 'Hallucination Guard',
      ...Object.fromEntries(modelsDatabase.map(m => [m.name, m.performance.hallucination]))
    }
  ]

  // Color palette for models
  const colors = ['#54b6ff', '#2dd4bf', '#34d399', '#fbbf24', '#f97316']

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Model Fairness Comparison</CardTitle>
        <CardDescription className="text-muted-foreground">
          Multi-dimensional analysis of bias mitigation and transparency across all analyzed models
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ResponsiveContainer width="100%" height={450}>
          <RadarChart data={comparisonData}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis dataKey="category" stroke="#999" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis stroke="#999" angle={90} domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
              formatter={(value) => `${value}%`}
            />
            {modelsDatabase.map((model, idx) => (
              <Radar
                key={model.id}
                name={model.name}
                dataKey={model.name}
                stroke={colors[idx % colors.length]}
                fill={colors[idx % colors.length]}
                fillOpacity={0.1}
              />
            ))}
            <Legend />
          </RadarChart>
        </ResponsiveContainer>

        {/* Model Details Grid */}
        <div className="grid gap-4 md:grid-cols-2 pt-4 border-t border-border">
          {modelsDatabase.map((model, idx) => (
            <div key={model.id} className="p-4 rounded-lg bg-background/50 border border-border/50">
              <div className="flex items-start gap-3 mb-3">
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: colors[idx % colors.length] }}
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{model.name}</h4>
                  <p className="text-xs text-muted-foreground">{model.provider}</p>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transparency:</span>
                  <span className="font-semibold text-foreground">{model.transparency}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Fairness:</span>
                  <span className="font-semibold text-foreground">
                    {Math.round((Object.values(model.bias).reduce((a: number, b: number) => a + b) / Object.values(model.bias).length))}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Known Issues:</span>
                  <span className="font-semibold text-foreground">{model.knownIssues.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
