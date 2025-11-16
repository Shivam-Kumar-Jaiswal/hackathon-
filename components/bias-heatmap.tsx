'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { modelsDatabase } from '@/lib/models-db'

const categories = ['Gender', 'Race', 'Age', 'Disability', 'Socioeconomic']

function getBiasColor(score: number): string {
  if (score >= 80) return '#34d399' // Green - excellent fairness
  if (score >= 70) return '#fbbf24' // Yellow - good fairness
  if (score >= 60) return '#f97316' // Orange - moderate
  return '#ef4444' // Red - poor fairness
}

function getTextColor(score: number): string {
  if (score >= 80) return '#000'
  return '#fff'
}

export function BiasHeatmap() {
  const models = modelsDatabase.map(m => ({
    name: m.name,
    id: m.id,
    scores: [m.bias.gender, m.bias.race, m.bias.age, m.bias.disability, m.bias.socioeconomic]
  }))

  const avgScore = (scores: number[]) => Math.round(scores.reduce((a, b) => a + b) / scores.length)

  return (
    <Card className="border-border bg-card mb-8">
      <CardHeader>
        <CardTitle className="text-foreground">Fairness Score Heatmap</CardTitle>
        <CardDescription className="text-muted-foreground">
          Bias mitigation scores by model and demographic category (0-100, higher = fairer, more equitable treatment)
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Model</th>
              {categories.map(cat => (
                <th key={cat} className="text-center py-3 px-4 text-muted-foreground font-semibold whitespace-nowrap">
                  {cat}
                </th>
              ))}
              <th className="text-center py-3 px-4 text-muted-foreground font-semibold">Avg Score</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => {
              const avg = avgScore(model.scores)
              return (
                <tr key={model.id} className="border-b border-border hover:bg-primary/5 transition-colors">
                  <td className="py-3 px-4 font-semibold text-foreground">{model.name}</td>
                  {model.scores.map((score, idx) => (
                    <td key={idx} className="py-3 px-4 text-center">
                      <div
                        className="inline-block px-3 py-1 rounded-md font-semibold transition-all"
                        style={{ 
                          backgroundColor: getBiasColor(score),
                          color: getTextColor(score)
                        }}
                        title={`${score}% fairness in ${categories[idx]} dimension`}
                      >
                        {score}%
                      </div>
                    </td>
                  ))}
                  <td className="py-3 px-4 text-center">
                    <Badge className="bg-primary/20 text-primary border-primary/30 font-semibold">
                      {avg}%
                    </Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="mt-6 p-4 rounded-lg bg-card border border-border space-y-2">
          <p className="text-xs font-semibold text-foreground">Interpretation Guide:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#34d399' }}></div>
              <span className="text-muted-foreground">{'>='} 80%: Excellent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#fbbf24' }}></div>
              <span className="text-muted-foreground">70-80%: Good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f97316' }}></div>
              <span className="text-muted-foreground">60-70%: Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ef4444' }}></div>
              <span className="text-muted-foreground">{'<'} 60%: Poor</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
