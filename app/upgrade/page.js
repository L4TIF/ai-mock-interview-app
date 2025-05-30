'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Check, Clock } from 'lucide-react'
import Header from '../dashboard/_components/Header'

export default function UpgradePage() {
    const router = useRouter()

    const features = [
        {
            name: "Basic",
            price: "Free",
            description: "Current available features",
            features: [
                "Mock interviews with AI",
                "Basic AI feedback",
                "Standard question bank",
                "Interview recording",
                "Basic analytics"
            ],
            buttonText: "Current Plan",
            disabled: true
        },
        {
            name: "Pro",
            price: "Coming Soon",
            description: "Enhanced features for serious job seekers",
            features: [
                "Unlimited mock interviews",
                "Advanced AI feedback",
                "Expanded question bank",
                "Interview recording & playback",
                "Detailed analytics",
                "Custom interview scenarios",
                "Priority support"
            ],
            buttonText: "Coming Soon",
            highlighted: true,
            disabled: true
        },
        {
            name: "Enterprise",
            price: "Coming Soon",
            description: "For organizations and teams",
            features: [
                "Everything in Pro",
                "Team management",
                "Custom branding",
                "API access",
                "Dedicated support",
                "Custom integrations",
                "Advanced analytics"
            ],
            buttonText: "Coming Soon",
            disabled: true
        }
    ]

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-semibold mb-4">
                        Premium Features Coming Soon
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        We're working on exciting new features to enhance your interview preparation experience
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((plan, index) => (
                        <div
                            key={index}
                            className={`rounded-lg border p-6 ${plan.highlighted
                                ? 'border-primary shadow-lg scale-105'
                                : 'border-border'
                                }`}
                        >
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                                <div className="flex items-baseline mb-2">
                                    <span className="text-3xl font-bold">{plan.price}</span>
                                    {plan.period && (
                                        <span className="text-muted-foreground ml-1">{plan.period}</span>
                                    )}
                                </div>
                                <p className="text-muted-foreground text-sm">{plan.description}</p>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center text-sm">
                                        {plan.name === "Basic" ? (
                                            <Check className="w-4 h-4 text-primary mr-2" />
                                        ) : (
                                            <Clock className="w-4 h-4 text-muted-foreground mr-2" />
                                        )}
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className="w-full"
                                variant={plan.highlighted ? "default" : "outline"}
                                disabled={true}
                            >
                                {plan.buttonText}
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
                    <p className="text-muted-foreground mb-6">
                        Subscribe to our newsletter to be the first to know when premium features launch
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => router.push('/dashboard')}
                    >
                        Back to Dashboard
                    </Button>
                </div>
            </main>
        </div>
    )
} 