'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { CommunityHub } from '@/components/community-hub'
import { ExplanationForm } from '@/components/explanation-form'
import { DiscussionThreads } from '@/components/discussion-threads'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

export default function CommunityPage() {
  const [showForm, setShowForm] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSubmitSuccess = () => {
    setShowForm(false)
    setRefreshKey(prev => prev + 1)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl mb-2">
                Community Hub
              </h1>
              <p className="text-muted-foreground">
                Collaborate with researchers, ethicists, and practitioners to understand AI decisions
              </p>
            </div>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : 'Share Explanation'}
            </Button>
          </div>

          {showForm && (
            <div className="mb-12">
              <ExplanationForm onSubmit={handleSubmitSuccess} />
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-4 mb-8">
            {[
              { label: 'Active Contributors', value: '3.2K', icon: '👥' },
              { label: 'Explanations Shared', value: '15K+', icon: '💭' },
              { label: 'Peer Discussions', value: '4.8K', icon: '💬' },
              { label: 'Research Papers', value: '287', icon: '📚' }
            ].map((stat, i) => (
              <Card key={i} className="border-border bg-card">
                <CardContent className="pt-6">
                  <p className="text-2xl mb-1">{stat.icon}</p>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="hub" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-background border-border">
              <TabsTrigger value="hub">Featured Explanations</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>

            <TabsContent value="hub">
              <CommunityHub key={refreshKey} />
            </TabsContent>

            <TabsContent value="discussions">
              <DiscussionThreads />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
