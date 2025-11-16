'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ThumbsUp, MessageCircle, Eye, Loader2 } from 'lucide-react'
import { getExplanations, likeExplanation, addComment } from '@/lib/actions'

interface Explanation {
  id: string
  title: string
  author: string
  modelId: string
  category: string
  excerpt: string
  likes: number
  comments: Array<{ id: string; author: string; content: string }>
  views: number
  tags: string[]
  upvoted?: boolean
  verified?: boolean
}

export function CommunityHub() {
  const [explanations, setExplanations] = useState<Explanation[]>([])
  const [loading, setLoading] = useState(true)
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const loadExplanations = async () => {
      try {
        const data = await getExplanations()
        setExplanations(data as Explanation[])
      } catch (error) {
        console.error('[v0] Error loading explanations:', error)
      } finally {
        setLoading(false)
      }
    }
    loadExplanations()
  }, [])

  const handleLike = async (id: string) => {
    try {
      await likeExplanation(id)
      setExplanations(prev =>
        prev.map(exp =>
          exp.id === id
            ? { ...exp, likes: exp.likes + 1 }
            : exp
        )
      )
      setLikedIds(prev => new Set([...prev, id]))
    } catch (error) {
      console.error('[v0] Error liking explanation:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 text-primary animate-spin" />
        <span className="ml-2 text-muted-foreground">Loading explanations...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {explanations.length === 0 ? (
        <Card className="border-border bg-card/50">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No explanations yet. Be the first to share!</p>
          </CardContent>
        </Card>
      ) : (
        explanations.map(exp => (
          <Card key={exp.id} className="border-border bg-card hover:border-primary/50 transition-all cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex items-start justify-between mb-2 gap-4">
                    <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors flex-1">
                      {exp.title}
                    </h3>
                    <Badge className="bg-primary text-primary-foreground whitespace-nowrap">
                      {exp.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3 flex-wrap">
                    <span className="font-medium">{exp.author}</span>
                    {exp.verified && (
                      <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                        Verified Expert
                      </Badge>
                    )}
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {exp.views.toLocaleString()} views
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{exp.excerpt}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="border-border text-muted-foreground text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => !likedIds.has(exp.id) && handleLike(exp.id)}
                      disabled={likedIds.has(exp.id)}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                    >
                      <ThumbsUp className={`h-4 w-4 ${likedIds.has(exp.id) ? 'fill-current text-primary' : ''}`} />
                      <span className="text-sm">{exp.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{exp.comments.length}</span>
                    </button>
                  </div>
                  <Button size="sm" variant="outline" className="border-border hover:bg-card">
                    Read More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
