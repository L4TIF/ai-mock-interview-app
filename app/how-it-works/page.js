'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Mic, Brain, Video, Play, ArrowRight } from 'lucide-react'
import Header from '../dashboard/_components/Header'

export default function HowItWorksPage() {
    const router = useRouter()

    const steps = [
        {
            icon: <Play className="w-8 h-8 text-primary" />,
            title: "Start Your Interview",
            description: "Begin a new mock interview session. Choose your preferred industry and experience level to get relevant questions."
        },
        {
            icon: <Mic className="w-8 h-8 text-primary" />,
            title: "Answer Questions",
            description: "Respond to interview questions naturally. Our AI will transcribe your answers in real-time as you speak."
        },
        {
            icon: <Brain className="w-8 h-8 text-primary" />,
            title: "Get AI Feedback",
            description: "Receive instant feedback on your answers. Our AI analyzes your responses and provides detailed insights and suggestions for improvement."
        },
        {
            icon: <Video className="w-8 h-8 text-primary" />,
            title: "Review & Improve",
            description: "Watch your interview recording, review the feedback, and track your progress over time to improve your interview skills."
        }
    ]

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-3xl font-semibold mb-4">
                        How It Works
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Master your interview skills with our AI-powered platform in four simple steps
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="absolute left-4 top-12 w-0.5 h-24 bg-border" />
                            )}

                            <div className="flex items-start gap-6 mb-16">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    {step.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
                    <p className="text-muted-foreground mb-6">
                        Begin your interview preparation journey today
                    </p>
                    <Button
                        size="lg"
                        onClick={() => router.push('/dashboard')}
                        className="gap-2"
                    >
                        Start Your Interview
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>

                <div className="mt-20 grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6 rounded-lg border">
                        <h3 className="text-lg font-semibold mb-2">Real-time Feedback</h3>
                        <p className="text-muted-foreground text-sm">
                            Get instant AI-powered feedback on your answers to improve your interview skills
                        </p>
                    </div>
                    <div className="text-center p-6 rounded-lg border">
                        <h3 className="text-lg font-semibold mb-2">Practice Anywhere</h3>
                        <p className="text-muted-foreground text-sm">
                            Access our platform from any device with a microphone and webcam
                        </p>
                    </div>
                    <div className="text-center p-6 rounded-lg border">
                        <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
                        <p className="text-muted-foreground text-sm">
                            Monitor your improvement over time with detailed analytics and feedback
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
} 