'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Users, Brain, AlertCircle } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Explainable AI',
    description: 'See exactly how AI models make decisions with interactive visualizations of model architecture and decision pathways.'
  },
  {
    icon: AlertCircle,
    title: 'Bias Detection',
    description: 'Identify and understand potential biases across demographics, domains, and decision types with real-time analysis.'
  },
  {
    icon: Users,
    title: 'Community Insights',
    description: 'Access crowdsourced explanations and perspectives from researchers, ethicists, and AI practitioners worldwide.'
  },
  {
    icon: BarChart3,
    title: 'Comparative Analysis',
    description: 'Compare multiple models side-by-side to understand strengths, weaknesses, and ethical implications.'
  }
]

export function Features() {
  return (
    <section className="px-4 py-20 sm:py-32 bg-background">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Transparency Through Innovation
          </h2>
          <p className="text-muted-foreground">
            Our platform combines cutting-edge XAI technology with community intelligence
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <Card key={idx} className="border-border bg-card hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">{feature.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
