'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-bold text-foreground">The Last Signal</h3>
            <p className="text-sm text-muted-foreground">
              Rebuilding trust in AI through radical transparency and community intelligence.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Explore Models</Link></li>
              <li><Link href="/bias-report" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Bias Report</Link></li>
              <li><Link href="/comparison" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Model Comparison</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Community</h4>
            <ul className="space-y-2">
              <li><Link href="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Community Hub</Link></li>
              <li><Link href="/discussions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Discussions</Link></li>
              <li><Link href="/contribute" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contribute</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Learning Center</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>The Last Signal - AI Transparency Portal. Building trust through transparency.</p>
        </div>
      </div>
    </footer>
  )
}
