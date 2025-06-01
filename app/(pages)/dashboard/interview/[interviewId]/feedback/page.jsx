'use client'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Feedback = ({ params }) => {
  const { interviewId } = React.use(params)
  const [feedbackList, setFeedbackList] = React.useState([])
  const [overallRating, setOverallRating] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(true)
  const getFeedback = async () => {
    const response = await db.select().from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.questionId)

    if (response.length > 0) {
      const totalRating = response.reduce((acc, feedback) => acc + parseInt(feedback.rating), 0)
      setOverallRating(totalRating / response.length)
      setFeedbackList(response)
      console.log(response)
      setIsLoading(false)
      return response
    }
    return []
  }

  const headerMsg = [
    'Room for Improvement - Keep Practicing!',
    'Room for Improvement - Keep Practicing!',
    'Room for Improvement - Keep Practicing!',
    'Good Start - Keep Building Your Skills!',
    'Solid Performance - You\'re Getting There!',
    'Great Job - Your Hard Work Shows!',
    'Great Job - Your Hard Work Shows!',
    'Excellent Work - You\'re Mastering It!',
    'Outstanding Performance - You\'re a Natural!',
    'Exceptional Achievement - You\'re a Pro!',
  ]

  useEffect(() => {
    getFeedback()
  }, [])

  if (isLoading) {
    return <div className='p-10 mt-20 flex gap-2 items-center justify-center'>
      <Loader2 className='w-10 h-10 animate-spin text-gray-400' />
      <h2 className='text-3xl font-bold text-green-500'>Loading Results...</h2>
    </div>
  }
  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-green-500 text-center'>{headerMsg[Math.floor(overallRating) - 1]}</h2>
      <h2 className='font-bold text-2xl text-center'>Here is your mock interview feedback</h2>
      <h2 className='text-primary text-xl my-3 font-bold mt-10'>Your overall interview rating <strong className={`${overallRating < 5 ? 'text-red-500' : 'text-green-500'}`}>{overallRating}</strong> /10</h2>
      <h3 className='text-gray-500 text-sm'>Find below the feedback for each question along with the correct answer</h3>
      {feedbackList.length > 0 && feedbackList.map((feedback, index) => (
        <Collapsible key={feedback.questionId} className='p-5 border rounded-lg my-5'>
          <CollapsibleTrigger className='text-lg font-bold flex justify-between items-center cursor-pointer w-full'>
            <h4>{index + 1}. {feedback.question}</h4>
            <ChevronDownIcon className='w-5 h-5' />
          </CollapsibleTrigger>
          <CollapsibleContent className='mt-5'>
            <div className='flex flex-col gap-2'>
              <h2 className={`p-2 border rounded-lg ${feedback.rating < 5 ? 'text-red-500 bg-red-50' : 'text-green-500 bg-green-50'}`}> <strong>Rating:</strong> {feedback.rating}/10</h2>
              <h2 className={`p-2 border rounded-lg ${feedback.rating < 5 ? 'bg-red-50 text-red-900' : 'bg-green-50 text-green-900'}`}> <strong>Your answer:</strong> {feedback.userAnswer}</h2>
              <h2 className={`p-2 border rounded-lg bg-green-50 text-green-900`}> <strong>Correct answer:</strong> {feedback.correctAnswer}</h2>
              <h2 className={`p-2 border rounded-lg bg-blue-50 text-primary`}> <strong>Feedback:</strong> {feedback.feedback}</h2>
            </div>
          </CollapsibleContent>
        </Collapsible>

      ))}
      <div className='flex justify-start gap-2'>
        <Button className='mt-10' variant='outline' asChild>
          <Link href={`/dashboard/interview/${interviewId}`}>
            Retake Interview
          </Link>
        </Button>
        <Button className='mt-10 bg-primary text-white' variant='outline' asChild>
          <Link href='/dashboard'>
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Feedback