'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Mic, Brain, Video, Award, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header */}
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="AI Mock Interview Logo"
                width={59}
                height={36}
                className="dark:invert"
              />
            </Link>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard')}
              >
                Sign In
              </Button>
              <Button
                onClick={() => router.push('/dashboard')}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            AI-Powered Mock Interviews
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Practice interviews with AI, get instant feedback, and improve your skills
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="gap-2"
              onClick={() => router.push('/dashboard')}
            >
              Start Interview
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>


        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="p-6 rounded-lg border">
            <Mic className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Voice Recognition</h3>
            <p className="text-muted-foreground">Speak naturally and get your answers transcribed in real-time</p>
          </div>
          <div className="p-6 rounded-lg border">
            <Brain className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Feedback</h3>
            <p className="text-muted-foreground">Get instant, detailed feedback on your interview answers</p>
          </div>
          <div className="p-6 rounded-lg border">
            <Video className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Video Recording</h3>
            <p className="text-muted-foreground">Record your interview sessions for later review</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-semibold mb-12">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Feedback</h3>
              <p className="text-muted-foreground">Get instant AI-powered feedback on your answers</p>
            </div>
            <div className="p-6 rounded-lg border">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customized Questions</h3>
              <p className="text-muted-foreground">Questions tailored to your industry and experience level</p>
            </div>
            <div className="p-6 rounded-lg border">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground">Monitor your improvement with detailed analytics</p>
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-semibold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Start Interview</h3>
              <p className="text-muted-foreground">Choose your interview type and begin your session</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-semibold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Answer Questions</h3>
              <p className="text-muted-foreground">Respond to AI-generated interview questions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-semibold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Get Feedback</h3>
              <p className="text-muted-foreground">Receive instant AI analysis of your answers</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-semibold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Improve</h3>
              <p className="text-muted-foreground">Review feedback and enhance your skills</p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold text-center mb-12">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-2">Basic</h3>
              <p className="text-3xl font-bold mb-4">Free</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>5 interviews per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Basic AI feedback</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Standard questions</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline">Current Plan</Button>
            </div>
            <div className="p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-3xl font-bold mb-4">$19<span className="text-sm text-muted-foreground">/month</span></p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Unlimited interviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Advanced AI feedback</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Custom questions</span>
                </li>
              </ul>
              <Button className="w-full" disabled>Coming Soon</Button>
            </div>
            <div className="p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-3xl font-bold mb-4">$49<span className="text-sm text-muted-foreground">/month</span></p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Team collaboration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Button className="w-full" disabled>Coming Soon</Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 rounded-lg border">
              <h3 className="font-semibold mb-2">How does the AI interview work?</h3>
              <p className="text-muted-foreground">Our AI conducts realistic interviews by asking relevant questions and providing instant feedback on your responses, helping you improve your interview skills.</p>
            </div>
            <div className="p-6 rounded-lg border">
              <h3 className="font-semibold mb-2">What types of interviews are available?</h3>
              <p className="text-muted-foreground">We offer various interview types including technical, behavioral, and general interviews, with questions tailored to different industries and experience levels.</p>
            </div>
            <div className="p-6 rounded-lg border">
              <h3 className="font-semibold mb-2">How accurate is the AI feedback?</h3>
              <p className="text-muted-foreground">Our AI provides detailed feedback on your answers, including content analysis, communication skills, and areas for improvement, based on industry best practices.</p>
            </div>
            <div className="p-6 rounded-lg border">
              <h3 className="font-semibold mb-2">Can I review my past interviews?</h3>
              <p className="text-muted-foreground">Yes, you can access your interview history, review your answers, and track your progress over time to see how your skills have improved.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Ace Your Next Interview?</h2>
          <p className="text-muted-foreground mb-6">Start practicing now and get one step closer to your dream job</p>
          <Button
            size="lg"
            className="gap-2"
            onClick={() => router.push('/dashboard')}
          >
            Get Started Now
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
