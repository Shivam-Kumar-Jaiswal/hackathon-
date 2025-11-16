'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const steps = [
  {
    id: 1,
    title: 'Understand AI Models',
    description: 'Learn how different AI models work and their capabilities',
    content: 'Start by exploring popular AI models like Claude, GPT-4, and Gemini. Each model page shows its strengths, weaknesses, and known biases.',
  },
  {
    id: 2,
    title: 'Analyze Biases',
    description: 'Discover bias patterns across demographic categories',
    content: 'Our bias report shows fairness scores across 5+ demographic categories. Understand how models perform differently for different groups.',
  },
  {
    id: 3,
    title: 'Compare Models',
    description: 'Compare up to 4 models side-by-side',
    content: 'Use our comparison tool to evaluate models based on transparency, safety, performance, cost, and fairness metrics.',
  },
  {
    id: 4,
    title: 'Join Community',
    description: 'Share insights and learn from others',
    content: 'Submit your own explanations about how AI models make decisions. Upvote and comment on community findings.',
  },
]

export default function GetStartedPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push('/explore')
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-8">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 ${
                    idx <= currentStep
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {idx + 1}
                </div>
                <span className="text-xs sm:text-sm text-center text-muted-foreground hidden sm:inline">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-foreground text-base leading-relaxed">
                {steps[currentStep].content}
              </p>
            </div>

            {/* Step-specific content */}
            {currentStep === 0 && (
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="font-semibold text-foreground">Popular Models:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Claude 3 (Anthropic)</li>
                  <li>GPT-4 Turbo (OpenAI)</li>
                  <li>Gemini 2.0 (Google)</li>
                  <li>Llama 3 (Meta)</li>
                  <li>Mistral (Mistral AI)</li>
                </ul>
              </div>
            )}

            {currentStep === 1 && (
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="font-semibold text-foreground">Bias Categories Tracked:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Gender fairness</li>
                  <li>Racial/Ethnic representation</li>
                  <li>Age bias</li>
                  <li>Socioeconomic bias</li>
                  <li>Geographic representation</li>
                </ul>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="font-semibold text-foreground">Comparison Metrics:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Transparency Score (how explainable is it?)</li>
                  <li>Bias Mitigation (fairness improvements)</li>
                  <li>Safety (hallucination guards)</li>
                  <li>Reasoning Capability</li>
                  <li>Cost & Latency</li>
                </ul>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="font-semibold text-foreground">Community Contributions:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Share real-world bias discoveries</li>
                  <li>Contribute model explanations</li>
                  <li>Rate community findings</li>
                  <li>Earn expert badges</li>
                  <li>Participate in discussions</li>
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex-1"
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {currentStep === steps.length - 1 ? 'Start Exploring' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
