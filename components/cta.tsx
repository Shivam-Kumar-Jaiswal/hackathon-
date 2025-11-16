'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CTA() {
  return (
    <section className="px-4 py-20 sm:py-32 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border-t border-b border-border">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
          Join the Transparency Movement
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Share your insights about AI models, help others understand decision-making processes, and build a more trustworthy AI future.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/community">
            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              Contribute Explanation
            </Button>
          </Link>
          <Link href="/learn">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-border hover:bg-card">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
