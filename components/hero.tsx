'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-card px-4 py-20 sm:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            <span className="text-xs font-medium text-muted-foreground">Rebuilding Trust in AI</span>
          </div>
        </div>

        <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground sm:text-6xl">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            The Last Signal
          </span>
          <br />
          AI Transparency Portal
        </h1>

        <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
          In the age of digital collapse, reclaim your right to understand AI. Visualize decisions, expose biases, and rebuild humanity's trust in intelligent systems.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/explore">
            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              Explore AI Models
            </Button>
          </Link>
          <Link href="/learn">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-border hover:bg-card">
              Learn About Transparency
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 border-t border-border pt-12">
          <div>
            <div className="text-2xl font-bold text-accent">42</div>
            <p className="text-sm text-muted-foreground">AI Models Analyzed</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">15K+</div>
            <p className="text-sm text-muted-foreground">Community Explanations</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">89%</div>
            <p className="text-sm text-muted-foreground">Bias Detection Rate</p>
          </div>
        </div>
      </div>
    </section>
  )
}
