'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronRight, Eye, Brain, Scale, Shield, Users, Zap } from 'lucide-react'

export default function LearnTransparency() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:py-32 bg-gradient-to-b from-background to-card border-b border-border">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        </div>
        
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl sm:text-5xl font-bold text-foreground">
            Understanding AI <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Transparency</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn the fundamentals of how AI transparency works, why it matters, and how we can build trustworthy artificial intelligence systems.
          </p>
        </div>
      </section>

      {/* Core Concepts */}
      <section className="px-4 py-20 sm:py-32 bg-background">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-3xl font-bold text-foreground">Core Concepts</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Explainability */}
            <div className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Explainability</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                The ability to understand and interpret how an AI model makes decisions. Instead of a "black box," explainability provides visibility into the reasoning process.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Feature importance: Which inputs matter most?</li>
                <li>• Decision paths: How did the model arrive at this output?</li>
                <li>• Confidence scores: How sure is the model?</li>
              </ul>
            </div>

            {/* Bias & Fairness */}
            <div className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-secondary" />
                <h3 className="text-xl font-bold text-foreground">Bias & Fairness</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Systematic prejudices that AI models can inherit from training data. Fairness ensures equal treatment across demographics.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Gender bias: Different outcomes for men vs women</li>
                <li>• Racial bias: Disparate treatment by ethnicity</li>
                <li>• Fairness metrics: Quantifiable bias measurement</li>
              </ul>
            </div>

            {/* Interpretability */}
            <div className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-bold text-foreground">Interpretability</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                The degree to which a human can understand what a model does. More complex models are often less interpretable.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Linear vs deep models: Simplicity vs accuracy</li>
                <li>• LIME & SHAP: Explanation techniques</li>
                <li>• Model cards: Documentation of model behavior</li>
              </ul>
            </div>

            {/* Accountability */}
            <div className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Accountability</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Taking responsibility for AI decisions and their consequences. Necessary for high-stakes applications.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Audit trails: Who deployed this? When?</li>
                <li>• Error analysis: What went wrong?</li>
                <li>• Remediation: How do we fix it?</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Transparency Matters */}
      <section className="px-4 py-20 sm:py-32 bg-card border-t border-b border-border">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-3xl font-bold text-foreground">Why Transparency Matters</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-foreground">Trust & Adoption</h3>
                <p className="text-muted-foreground">
                  People are more likely to use AI systems when they understand how they work. Transparency builds confidence in critical applications like healthcare, hiring, and criminal justice.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20">
                  <Zap className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-foreground">Error Detection</h3>
                <p className="text-muted-foreground">
                  Understanding how an AI works enables spotting when it's wrong. You can't fix what you can't see—transparency is the first step to improvement.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                  <Scale className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-foreground">Regulatory Compliance</h3>
                <p className="text-muted-foreground">
                  Laws like GDPR and emerging AI regulations require explainability. Transparency ensures legal compliance and ethical responsibility.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-foreground">Bias Mitigation</h3>
                <p className="text-muted-foreground">
                  You can't eliminate bias you can't measure. Transparency reveals disparities across demographics, enabling targeted fairness improvements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Examples */}
      <section className="px-4 py-20 sm:py-32 bg-background">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-3xl font-bold text-foreground">Real-World Examples</h2>
          
          <div className="space-y-6">
            <div className="p-6 border-l-4 border-primary bg-card rounded">
              <h3 className="mb-2 text-lg font-bold text-foreground">Hiring Systems</h3>
              <p className="text-muted-foreground mb-3">
                Amazon's AI recruiting tool showed gender bias, preferring male candidates. Transparency revealed this issue, leading to improvements.
              </p>
              <span className="text-xs font-semibold text-accent">Lesson: Bias in training data → Biased outputs</span>
            </div>

            <div className="p-6 border-l-4 border-secondary bg-card rounded">
              <h3 className="mb-2 text-lg font-bold text-foreground">Loan Approval</h3>
              <p className="text-muted-foreground mb-3">
                Opaque lending algorithms denied loans to minority groups at higher rates. Regulatory transparency requirements forced disclosure and reform.
              </p>
              <span className="text-xs font-semibold text-accent">Lesson: Opaque systems enable discrimination</span>
            </div>

            <div className="p-6 border-l-4 border-accent bg-card rounded">
              <h3 className="mb-2 text-lg font-bold text-foreground">Medical Diagnosis</h3>
              <p className="text-muted-foreground mb-3">
                A healthcare AI worked well overall but failed for patients with darker skin tones. Transparency uncovered the demographic bias during testing.
              </p>
              <span className="text-xs font-semibold text-accent">Lesson: Test across demographics to catch hidden biases</span>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Metrics */}
      <section className="px-4 py-20 sm:py-32 bg-card border-t border-b border-border">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-3xl font-bold text-foreground">How We Measure Transparency</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-background rounded border border-border">
              <h4 className="font-bold text-foreground mb-2">Transparency Score (0-1)</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Measures how much information is publicly available about the model.
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-background rounded-full h-2 border border-border"></div>
              </div>
            </div>

            <div className="p-4 bg-background rounded border border-border">
              <h4 className="font-bold text-foreground mb-2">Bias Score (0-1)</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Fairness across gender, race, age, socioeconomic status, and geography. Higher is better.
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-background rounded-full h-2 border border-border"></div>
              </div>
            </div>

            <div className="p-4 bg-background rounded border border-border">
              <h4 className="font-bold text-foreground mb-2">Explainability Score (0-1)</h4>
              <p className="text-sm text-muted-foreground mb-3">
                How interpretable are the model's decisions to humans?
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-background rounded-full h-2 border border-border"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:py-32 bg-background">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Ready to Explore AI Systems?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Now that you understand transparency, dive into real AI models and see how they compare.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/explore">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2">
                Explore Models <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/learn">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-border hover:bg-card">
                Continue Learning
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
