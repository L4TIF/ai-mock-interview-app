'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export default function FAQPage() {
    const router = useRouter()
    const [openIndex, setOpenIndex] = useState(null)

    const faqs = [
        {
            question: "How does the AI Mock Interview work?",
            answer: "Our platform uses advanced AI technology to conduct realistic mock interviews. You'll receive questions based on your industry and experience level, and our AI will analyze your responses in real-time, providing instant feedback on your answers."
        },
        {
            question: "What types of questions can I expect?",
            answer: "The questions are tailored to your industry and experience level. They cover common interview topics including technical knowledge, problem-solving abilities, behavioral questions, and situational scenarios relevant to your field."
        },
        {
            question: "How is my performance evaluated?",
            answer: "Your answers are evaluated based on several factors including clarity, relevance, completeness, and technical accuracy. The AI provides detailed feedback and a rating for each answer, helping you identify areas for improvement."
        },
        {
            question: "Can I review my past interviews?",
            answer: "Yes! All your interview sessions are recorded and saved. You can access your interview history, review your answers, and track your progress over time through our dashboard."
        },
        {
            question: "Is my interview data secure?",
            answer: "Absolutely. We take data security seriously. All your interview recordings and responses are encrypted and stored securely. We never share your data with third parties without your explicit consent."
        },
        {
            question: "What equipment do I need?",
            answer: "You'll need a computer or laptop with a working microphone and webcam. A stable internet connection is also required for the best experience. Headphones are recommended but not mandatory."
        },
        {
            question: "How long does a typical interview session last?",
            answer: "A standard interview session typically lasts between 15-30 minutes, depending on the number of questions and your response times. You can pause and resume the interview if needed."
        },
        {
            question: "Can I practice specific types of questions?",
            answer: "Yes, you can choose to focus on specific types of questions or topics. Our platform allows you to customize your practice sessions based on your needs and areas you want to improve."
        }
    ]

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-semibold mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-muted-foreground">
                        Everything you need to know about our AI Mock Interview platform
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="mb-3 border rounded-lg overflow-hidden"
                        >
                            <button
                                className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-accent transition-colors"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="text-base font-medium">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="px-4 py-3 bg-accent/50 border-t">
                                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button
                        size="lg"
                        onClick={() => router.push('/dashboard')}
                    >
                        Start Your Interview
                    </Button>
                </div>
            </main>
        </div>
    )
} 