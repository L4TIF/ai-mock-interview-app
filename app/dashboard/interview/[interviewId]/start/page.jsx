'use client'

import { db } from '@/utils/db'
import { MockInterview, UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import QuestionSection from './_components/QuestionSection'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import ClientOnly from './_components/clientOnlyPage'
import { toast } from 'sonner'


// Dynamically import RecordAnswerSection with no SSR
const RecordAnswerSection = dynamic(
    () => import('./_components/RecordAnswerSection'),
    { ssr: false }
)



const StartInterview = ({ params }) => {
    const { interviewId } = React.use(params)
    const [isLoading, setIsLoading] = React.useState(false)
    const [interviewData, setInterviewData] = React.useState(null)
    const [mockInterviewQuestions, setMockInterviewQuestions] = React.useState(null)
    const [activeQuestionIndex, setActiveQuestionIndex] = React.useState(0)
    
    const router = useRouter()

    const checkIfAnswersEmpty = async () => {
        const res = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, interviewId))
        console.log(res,mockInterviewQuestions?.length)
        return res.length !== mockInterviewQuestions?.length
    }




    const fetchInterview = async () => {
        const res = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId))
        setInterviewData((res[0]));
        const jsonMockInterviewQuestions = JSON.parse(res[0].jsonMockResp)
        setMockInterviewQuestions(jsonMockInterviewQuestions)
    }

    const handleSubmit = async () => {
        const isAnswersEmpty = await checkIfAnswersEmpty()
        if (isAnswersEmpty) {
            toast.error('Please answer all questions')
            return
        }
        router.push(`/dashboard/interview/${interviewId}/feedback`)

    }

    useEffect(() => {
        setIsLoading(true)
        fetchInterview()
        setIsLoading(false)
    }, [interviewId])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className='flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-10'>
                {/* Questions  */}
                <QuestionSection mockInterviewQuestions={mockInterviewQuestions} activeQuestionIndex={activeQuestionIndex} setActiveQuestionIndex={setActiveQuestionIndex} />

                {/* Webcam and microphone recording */}
                <ClientOnly>
                    <RecordAnswerSection interviewData={interviewData} mockInterviewQuestions={mockInterviewQuestions} activeQuestionIndex={activeQuestionIndex} />
                </ClientOnly>
            </div>

            {/* Navigation Buttons */}
            <div className='flex items-center justify-end gap-4'>
                {activeQuestionIndex > 0 && (
                    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
                        Previous Question
                    </Button>
                )}
                {activeQuestionIndex < mockInterviewQuestions?.length - 1 && (
                    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
                        Next Question
                    </Button>
                )}
                {activeQuestionIndex === mockInterviewQuestions?.length - 1 && (
                    <Button variant='destructive' className='cursor-pointer' title='End Interview' onClick={handleSubmit}>
                        End Interview
                    </Button>
                )}
            </div>
        </div>
    )
}

export default StartInterview