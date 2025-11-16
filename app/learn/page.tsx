'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BookOpen, Video, Code, Award, ArrowRight, Check } from 'lucide-react'
import { useState } from 'react'

export default function LearnPage() {
  const [expandedModule, setExpandedModule] = useState<number | null>(null)

  const modules = [
    {
      id: 1,
      title: 'AI Transparency Fundamentals',
      description: 'Learn the core concepts of explainable AI and why transparency matters',
      lessons: [
        'What is AI Transparency?',
        'Explainability vs Interpretability',
        'Types of AI Bias',
        'Fairness Metrics Explained',
        'The Ethics of AI Systems'
      ],
      duration: '45 min',
      level: 'Beginner',
      color: 'from-primary to-primary/50'
    },
    {
      id: 2,
      title: 'Understanding Model Bias',
      description: 'Dive deep into how biases emerge and how to measure them',
      lessons: [
        'Training Data Bias',
        'Algorithmic Bias',
        'Demographic Parity',
        'Equalized Odds',
        'Mitigating Bias',
        'Real-World Case Studies'
      ],
      duration: '60 min',
      level: 'Intermediate',
      color: 'from-secondary to-secondary/50'
    },
    {
      id: 3,
      title: 'Reading Model Comparison Charts',
      description: 'Master the art of comparing AI models using our visualization tools',
      lessons: [
        'Understanding Transparency Scores',
        'Interpreting Heatmaps',
        'Radar Chart Analysis',
        'Performance Metrics',
        'Choosing the Right Model for Your Use Case'
      ],
      duration: '30 min',
      level: 'Beginner',
      color: 'from-accent to-accent/50'
    },
    {
      id: 4,
      title: 'Contributing to the Community',
      description: 'Share your insights and help others understand AI systems',
      lessons: [
        'Writing Effective Explanations',
        'Documenting Model Behavior',
        'Sharing Real-World Findings',
        'Community Standards',
        'Getting Recognition'
      ],
      duration: '20 min',
      level: 'Beginner',
      color: 'from-primary/70 to-secondary/70'
    },
    {
      id: 5,
      title: 'Advanced: Model Architecture',
      description: 'Understand what happens inside modern AI models',
      lessons: [
        'Neural Networks Basics',
        'Transformer Architecture',
        'Attention Mechanisms',
        'Why Larger Models Can Be Opaque',
        'Interpretability Techniques (LIME, SHAP)'
      ],
      duration: '90 min',
      level: 'Advanced',
      color: 'from-secondary/80 to-accent/80'
    },
    {
      id: 6,
      title: 'AI Ethics & Governance',
      description: 'Learn the regulatory and ethical landscape of AI',
      lessons: [
        'GDPR & AI Regulations',
        'Responsible AI Principles',
        'Building Trustworthy Systems',
        'The Role of Auditing',
        'Future of AI Governance'
      ],
      duration: '75 min',
      level: 'Advanced',
      color: 'from-accent/70 to-primary/70'
    }
  ]

  const resources = [
    {
      icon: BookOpen,
      title: 'Research Papers',
      description: 'Academic papers on AI transparency and fairness',
      count: '50+'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Visual explanations of complex concepts',
      count: '25+'
    },
    {
      icon: Code,
      title: 'Interactive Tools',
      description: 'Hands-on experiments with real AI models',
      count: '15+'
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Earn recognition for completing modules',
      count: '6'
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:py-32 bg-gradient-to-b from-background to-card border-b border-border">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl sm:text-5xl font-bold text-foreground">
            Learn About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AI Transparency</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comprehensive educational resources to understand how AI works, why transparency matters, and how to identify bias in intelligent systems.
          </p>
          
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
            <div>
              <div className="text-2xl font-bold text-accent mb-2">6</div>
              <p className="text-sm text-muted-foreground">Learning Modules</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-2">5-90</div>
              <p className="text-sm text-muted-foreground">Min per module</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-2">All Levels</div>
              <p className="text-sm text-muted-foreground">Beginner to Advanced</p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className="px-4 py-20 sm:py-32 bg-background">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-3xl font-bold text-foreground">Learning Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, idx) => (
              <div key={idx} className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition-all hover:shadow-lg">
                <resource.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-foreground mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                <div className="text-lg font-bold text-accent">{resource.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Modules */}
      <section className="px-4 py-20 sm:py-32 bg-card border-t border-b border-border">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-3xl font-bold text-foreground">Structured Modules</h2>
          <div className="space-y-4">
            {modules.map((module) => (
              <div key={module.id} className="border border-border rounded-lg bg-background overflow-hidden hover:border-primary/50 transition-colors">
                <button
                  onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                  className="w-full p-6 flex items-start justify-between hover:bg-card/50 transition-colors"
                >
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-foreground">{module.title}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        module.level === 'Beginner' ? 'bg-primary/20 text-primary' :
                        module.level === 'Intermediate' ? 'bg-secondary/20 text-secondary' :
                        'bg-accent/20 text-accent'
                      }`}>
                        {module.level}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{module.description}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>⏱ {module.duration}</span>
                    </div>
                  </div>
                  <ArrowRight className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${expandedModule === module.id ? 'rotate-90' : ''}`} />
                </button>

                {expandedModule === module.id && (
                  <div className="px-6 pb-6 border-t border-border bg-gradient-to-b from-background to-card/50">
                    <div className="mt-4">
                      <h4 className="font-semibold text-foreground mb-3">Lessons Included:</h4>
                      <ul className="space-y-2">
                        {module.lessons.map((lesson, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href="/learn-transparency">
                        <Button className="mt-6 bg-primary hover:bg-primary/90 w-full sm:w-auto">
                          Start Learning
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="px-4 py-20 sm:py-32 bg-background">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-3xl font-bold text-foreground">Quick Learning Paths</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-l-4 border-primary bg-card rounded">
              <h3 className="font-bold text-lg text-foreground mb-3">For Decision Makers</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Understand how to evaluate AI systems for your organization
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  AI Transparency Fundamentals
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  Reading Model Comparison Charts
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  AI Ethics & Governance
                </div>
              </div>
              <Link href="/explore">
                <Button variant="outline" size="sm" className="border-border hover:bg-card w-full">
                  View Models
                </Button>
              </Link>
            </div>

            <div className="p-6 border-l-4 border-secondary bg-card rounded">
              <h3 className="font-bold text-lg text-foreground mb-3">For Researchers</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Deep dive into bias, fairness, and model internals
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-secondary" />
                  Understanding Model Bias
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-secondary" />
                  Advanced: Model Architecture
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-secondary" />
                  AI Ethics & Governance
                </div>
              </div>
              <Link href="/bias-report">
                <Button variant="outline" size="sm" className="border-border hover:bg-card w-full">
                  View Bias Report
                </Button>
              </Link>
            </div>

            <div className="p-6 border-l-4 border-accent bg-card rounded">
              <h3 className="font-bold text-lg text-foreground mb-3">For Community Members</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Share your findings and contribute to collective knowledge
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-accent" />
                  AI Transparency Fundamentals
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-accent" />
                  Contributing to the Community
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-accent" />
                  Understanding Model Bias
                </div>
              </div>
              <Link href="/community">
                <Button variant="outline" size="sm" className="border-border hover:bg-card w-full">
                  Join Community
                </Button>
              </Link>
            </div>

            <div className="p-6 border-l-4 border-primary bg-card rounded">
              <h3 className="font-bold text-lg text-foreground mb-3">For Students</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Build comprehensive AI literacy from basics to advanced
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  All 6 modules recommended
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  Interactive practice tools
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  Earn certificates
                </div>
              </div>
              <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                Get Certificate
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:py-32 bg-card border-t border-border">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Ready to Explore?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Choose a learning path and start your journey to understanding AI transparency.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/learn-transparency">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                Learn Concepts
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-border hover:bg-background">
                Explore Models
              </Button>
            </Link>
            <Link href="/community">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-border hover:bg-background">
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
