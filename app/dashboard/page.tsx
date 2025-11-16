'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ArrowRight, TrendingUp, Users, Lightbulb, Activity } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </main>
    )
  }

  const dashboardStats = [
    { label: 'Models Explored', value: '12', icon: TrendingUp, trend: '+3 this month' },
    { label: 'Biases Identified', value: '47', icon: Lightbulb, trend: '+12 insights' },
    { label: 'Contributions', value: '8', icon: Users, trend: '5 liked' },
    { label: 'Transparency Score', value: '78%', icon: Activity, trend: '+5% improvement' },
  ]

  const explorationTrend = [
    { month: 'Jan', explored: 2, compared: 1 },
    { month: 'Feb', explored: 5, compared: 2 },
    { month: 'Mar', explored: 8, compared: 4 },
    { month: 'Apr', explored: 12, compared: 6 },
    { month: 'May', explored: 15, compared: 8 },
  ]

  const biasCategories = [
    { name: 'Gender', value: 18, fill: '#3b82f6' },
    { name: 'Race/Ethnicity', value: 16, fill: '#8b5cf6' },
    { name: 'Age', value: 12, fill: '#ec4899' },
    { name: 'Socioeconomic', value: 14, fill: '#f59e0b' },
    { name: 'Geographic', value: 27, fill: '#10b981' },
  ]

  const recentActivity = [
    { id: 1, action: 'Compared Claude 3 vs GPT-4', time: '2 hours ago', icon: '🔄' },
    { id: 2, action: 'Submitted bias explanation', time: '5 hours ago', icon: '✍️' },
    { id: 3, action: 'Explored Gemini 2.0 details', time: '1 day ago', icon: '🔍' },
    { id: 4, action: 'Liked community insight', time: '2 days ago', icon: '👍' },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome back, {user.name}
            </h1>
            <p className="text-muted-foreground">
              Track your AI transparency journey and stay updated with the latest insights
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {dashboardStats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardDescription className="text-xs font-medium">{stat.label}</CardDescription>
                        <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                      </div>
                      <Icon className="h-5 w-5 text-primary opacity-70" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">{stat.trend}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Exploration Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Exploration Trend</CardTitle>
                <CardDescription>Models explored and compared over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={explorationTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="explored" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                    <Line type="monotone" dataKey="compared" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Bias Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Bias Identification</CardTitle>
                <CardDescription>Distribution across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={biasCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} (${value})`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {biasCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Link href="/explore">
              <Card className="cursor-pointer hover:shadow-lg hover:border-primary transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>🔍</span> Explore Models
                  </CardTitle>
                  <CardDescription>Discover AI systems and their transparency metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" className="text-primary p-0">
                    View Models <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/comparison">
              <Card className="cursor-pointer hover:shadow-lg hover:border-primary transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>⚖️</span> Compare Models
                  </CardTitle>
                  <CardDescription>Side-by-side fairness and performance analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" className="text-primary p-0">
                    Compare <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/community">
              <Card className="cursor-pointer hover:shadow-lg hover:border-primary transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>💬</span> Community Hub
                  </CardTitle>
                  <CardDescription>Share insights and learn from others</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" className="text-primary p-0">
                    Join <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest interactions on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{activity.icon}</span>
                      <p className="text-sm text-foreground">{activity.action}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
