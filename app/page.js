'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Mic, Brain, Video, Award } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            AI-Powered Mock Interviews
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Practice interviews with AI, get instant feedback, and improve your skills
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
              onClick={() => router.push('/dashboard')}
            >
              Start Interview
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-primary text-lg px-8 py-6 border-2"
              onClick={() => router.push('/dashboard')}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
            <Mic className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Voice Recognition</h3>
            <p className="text-gray-400">Speak naturally and get your answers transcribed in real-time</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
            <Brain className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Feedback</h3>
            <p className="text-gray-400">Get instant, detailed feedback on your interview answers</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
            <Video className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Video Recording</h3>
            <p className="text-gray-400">Record your interview sessions for later review</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Real-time Feedback</h3>
              <p className="text-gray-400">Get instant AI-powered feedback on your answers</p>
            </div>
            <div>
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Customized Questions</h3>
              <p className="text-gray-400">Questions tailored to your industry and experience level</p>
            </div>
            <div>
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Progress Tracking</h3>
              <p className="text-gray-400">Monitor your improvement with detailed analytics</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl text-gray-300 mb-8">Start practicing now and get one step closer to your dream job</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6"
            onClick={() => router.push('/dashboard')}
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
}
