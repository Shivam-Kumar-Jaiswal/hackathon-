'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { modelsDatabase } from '@/lib/models-db'
import { AlertCircle, CheckCircle, ExternalLink } from 'lucide-react'

interface ExplainabilityPanelProps {
  model: string
}

export function ExplainabilityPanel({ model }: ExplainabilityPanelProps) {
  const modelData = modelsDatabase.find(m => m.id === model) || modelsDatabase[0]

  return (
    <div className="space-y-4 sticky top-24">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">{modelData.name}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {modelData.provider} • {modelData.releaseDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-background border-border">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bias">Bias Analysis</TabsTrigger>
              <TabsTrigger value="issues">Known Issues</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">TRANSPARENCY SCORE</p>
                  <div className="h-2 w-full rounded-full bg-border">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${modelData.transparency}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{modelData.transparency}% Transparent</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">HALLUCINATION GUARD</p>
                  <div className="h-2 w-full rounded-full bg-border">
                    <div
                      className="h-2 rounded-full bg-accent"
                      style={{ width: `${modelData.performance.hallucination}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{modelData.performance.hallucination}% Reliability</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">SAFETY ALIGNMENT</p>
                  <div className="h-2 w-full rounded-full bg-border">
                    <div
                      className="h-2 rounded-full bg-secondary"
                      style={{ width: `${modelData.performance.safety}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{modelData.performance.safety}% Safe</p>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-border">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">CAPABILITIES</p>
                  <div className="flex flex-wrap gap-2">
                    {modelData.capabilities.map((c, i) => (
                      <Badge key={i} className="bg-primary/20 text-primary border-primary/30">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bias" className="space-y-3">
              {Object.entries(modelData.bias).map(([category, score]) => (
                <div key={category}>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs font-semibold text-muted-foreground capitalize">{category}</p>
                    <p className="text-xs text-muted-foreground">{score}%</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-border">
                    <div
                      className="h-2 rounded-full bg-secondary"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                Higher scores indicate better fairness across demographic groups.
              </p>
            </TabsContent>

            <TabsContent value="issues" className="space-y-3">
              {modelData.knownIssues.length > 0 ? (
                modelData.knownIssues.map((issue, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{issue}</p>
                  </div>
                ))
              ) : (
                <div className="flex gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">No documented critical issues</p>
                </div>
              )}

              <div className="pt-4 border-t border-border space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">SOURCES</p>
                {modelData.sources.map((source, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-foreground">{source.title}</p>
                      <p className="text-muted-foreground">{source.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
