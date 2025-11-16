'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const models = [
  {
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    transparency: 92,
    biasScore: 72,
    explanation: 'Strong performance on general tasks with documented constitutional AI training.'
  },
  {
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    transparency: 85,
    biasScore: 68,
    explanation: 'Advanced reasoning capabilities with known biases in gender and cultural contexts.'
  },
  {
    name: 'Gemini 2.0',
    provider: 'Google',
    transparency: 88,
    biasScore: 75,
    explanation: 'Multimodal abilities with transparency reports and bias mitigation efforts.'
  }
]

export function ModelsPreview() {
  return (
    <section className="px-4 py-20 sm:py-32 bg-card/30">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Featured AI Models
          </h2>
          <p className="text-muted-foreground">
            Deep analysis of leading language models and their ethical implications
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {models.map((model, idx) => (
            <Card key={idx} className="border-border bg-background hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <CardTitle className="text-foreground">{model.name}</CardTitle>
                    <CardDescription className="text-muted-foreground">{model.provider}</CardDescription>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">{model.transparency}%</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{model.explanation}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Bias Detection Score</span>
                    <span>{model.biasScore}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-border">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: `${model.biasScore}%` }}
                    />
                  </div>
                </div>

                <Link href={`/explore/${model.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Button variant="outline" size="sm" className="w-full mt-4 border-border hover:bg-card">
                    View Analysis
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/explore">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Explore All Models
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
