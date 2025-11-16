'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MessageCircle, User } from 'lucide-react'

const discussions = [
  {
    id: 1,
    title: 'How should we measure AI transparency?',
    category: 'Methodology',
    author: 'Dr. Lisa Park',
    replies: 24,
    lastActivity: '2 hours ago',
    status: 'active'
  },
  {
    id: 2,
    title: 'Comparing bias detection frameworks',
    category: 'Bias Detection',
    author: 'James Morrison',
    replies: 18,
    lastActivity: '5 hours ago',
    status: 'active'
  },
  {
    id: 3,
    title: 'Ethics of using biased models in research',
    category: 'Ethics',
    author: 'Prof. Alan Turing Institute',
    replies: 42,
    lastActivity: '1 day ago',
    status: 'featured'
  },
  {
    id: 4,
    title: 'Reproducing model bias findings across versions',
    category: 'Research',
    author: 'Stanford AI Lab',
    replies: 31,
    lastActivity: '3 days ago',
    status: 'active'
  }
]

export function DiscussionThreads() {
  return (
    <div className="space-y-4">
      {discussions.map(disc => (
        <Card key={disc.id} className="border-border bg-card hover:border-primary/50 transition-all cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                    {disc.title}
                  </h3>
                  {disc.status === 'featured' && (
                    <Badge className="bg-accent text-accent-foreground text-xs">Featured</Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {disc.author}
                  </span>
                  <Badge variant="outline" className="border-border text-muted-foreground">
                    {disc.category}
                  </Badge>
                  <span>Last: {disc.lastActivity}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-muted-foreground mb-2">
                  <MessageCircle className="h-4 w-4" />
                  <span className="font-semibold">{disc.replies}</span>
                </div>
                <Button size="sm" variant="outline" className="border-border hover:bg-card">
                  Join Discussion
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
