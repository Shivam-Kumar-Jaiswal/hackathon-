'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { submitExplanation } from '@/lib/actions'
import { modelsDatabase } from '@/lib/models-db'

interface ExplanationFormProps {
  onSubmit: () => void
}

export function ExplanationForm({ onSubmit }: ExplanationFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    email: '',
    modelId: '',
    category: 'Other' as 'Architecture' | 'Bias' | 'Performance' | 'Safety' | 'Other',
    content: '',
    tags: [] as string[]
  })

  const [tagInput, setTagInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const categories: Array<'Architecture' | 'Bias' | 'Performance' | 'Safety' | 'Other'> = ['Architecture', 'Bias', 'Performance', 'Safety', 'Other']

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      })
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!formData.title || !formData.author || !formData.email || !formData.modelId || !formData.content) {
      setError('Please fill in all required fields')
      return
    }

    if (formData.content.length < 50) {
      setError('Explanation must be at least 50 characters')
      return
    }

    setIsSubmitting(true)
    try {
      const result = await submitExplanation({
        title: formData.title,
        author: formData.author,
        email: formData.email,
        modelId: formData.modelId,
        category: formData.category,
        content: formData.content,
        tags: formData.tags
      })

      if (result.success) {
        setSuccess(true)
        setFormData({
          title: '',
          author: '',
          email: '',
          modelId: '',
          category: 'Other',
          content: '',
          tags: []
        })
        setTimeout(() => {
          onSubmit()
        }, 1500)
      } else {
        setError(result.error || 'Failed to submit explanation')
      }
    } catch (err) {
      console.error('[v0] Submission error:', err)
      setError('An error occurred while submitting')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Share Your AI Explanation</CardTitle>
        <CardDescription className="text-muted-foreground">
          Help the community understand AI decision-making through your insights and expertise
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-primary font-medium">Explanation submitted successfully! Thank you for contributing.</p>
            </div>
          )}
          
          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Title <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., 'Why Claude Makes Better Reasoning Decisions'"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={isSubmitting}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Your Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., 'Dr. Jane Smith'"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                disabled={isSubmitting}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Email <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isSubmitting}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Model <span className="text-destructive">*</span>
              </label>
              <select
                value={formData.modelId}
                onChange={(e) => setFormData({ ...formData, modelId: e.target.value })}
                disabled={isSubmitting}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              >
                <option value="">Select a model...</option>
                {modelsDatabase.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Category <span className="text-destructive">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Button
                  key={cat}
                  type="button"
                  variant={formData.category === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFormData({ ...formData, category: cat })}
                  disabled={isSubmitting}
                  className={formData.category === cat ? 'bg-primary hover:bg-primary/90' : 'border-border hover:bg-card'}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Explanation <span className="text-destructive">*</span>
            </label>
            <textarea
              placeholder="Provide your detailed explanation about this AI model aspect. Include examples, research references, or personal observations. Minimum 50 characters."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={6}
              disabled={isSubmitting}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none disabled:opacity-50"
            />
            <p className="text-xs text-muted-foreground mt-1">{formData.content.length} characters</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Tags (Optional)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add tag (e.g., 'hallucination', 'safety')..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
                disabled={isSubmitting}
                className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
              <Button 
                type="button"
                variant="outline"
                onClick={handleAddTag}
                disabled={isSubmitting}
                className="border-border hover:bg-card disabled:opacity-50"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <Badge 
                  key={tag}
                  className="bg-primary/20 text-primary border-primary/30 cursor-pointer hover:bg-primary/30"
                  onClick={() => !isSubmitting && handleRemoveTag(tag)}
                >
                  {tag} ✕
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Explanation'}
            </Button>
            <Button 
              type="button"
              variant="outline"
              size="lg"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="border-border hover:bg-card disabled:opacity-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
