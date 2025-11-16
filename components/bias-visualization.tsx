'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { modelsDatabase } from '@/lib/models-db'

const biasData = [
  { name: 'Gender Bias', value: 32, color: '#54b6ff' },
  { name: 'Race/Ethnicity', value: 28, color: '#2dd4bf' },
  { name: 'Age Bias', value: 18, color: '#34d399' },
  { name: 'Socioeconomic', value: 14, color: '#f97316' },
  { name: 'Disability', value: 8, color: '#8b5cf6' }
]

// Historical trend data showing documentation and mitigation progress
const trendData = [
  { month: 'Jan 2024', documented: 45, mitigated: 12, mitigation: 27 },
  { month: 'Feb 2024', documented: 52, mitigated: 18, mitigation: 35 },
  { month: 'Mar 2024', documented: 61, mitigated: 25, mitigation: 41 },
  { month: 'Apr 2024', documented: 73, mitigated: 35, mitigation: 48 },
  { month: 'May 2024', documented: 89, mitigated: 42, mitigation: 47 },
  { month: 'Jun 2024', documented: 102, mitigated: 56, mitigation: 55 }
]

interface BiasVisualizationProps {
  selectedCategory: string
}

export function BiasVisualization({ selectedCategory }: BiasVisualizationProps) {
  const avgTransparency = Math.round(
    modelsDatabase.reduce((sum, m) => sum + m.transparency, 0) / modelsDatabase.length
  )

  return (
    <div className="grid gap-8 lg:grid-cols-2 mb-8">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Bias Distribution</CardTitle>
          <CardDescription className="text-muted-foreground">
            Percentage of documented biases by demographic category across all analyzed models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={biasData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {biasData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                formatter={(value) => `${value}%`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Bias Mitigation Progress</CardTitle>
          <CardDescription className="text-muted-foreground">
            Documented vs. Mitigated biases showing industry trends (% = mitigation rate)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#999" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#999" />
              <Tooltip 
                contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                cursor={{ fill: 'rgba(84, 182, 255, 0.1)' }}
                formatter={(value, name) => {
                  if (name === 'mitigation') return `${value}% mitigated`
                  return value
                }}
              />
              <Bar dataKey="documented" fill="#54b6ff" name="Documented Issues" radius={[8, 8, 0, 0]} />
              <Bar dataKey="mitigated" fill="#34d399" name="Mitigated" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold">Transparency Improvement:</span> Industry average transparency has increased from 58% to {avgTransparency}% through better documentation and bias analysis tools.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
