'use client'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import QuestionSection from './_components/QuestionSection'

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
    const fetchInterview = async () => {
        const res = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId))
        setInterviewData((res[0]));

        const jsonMockInterviewQuestions = JSON.parse(res[0].jsonMockResp)
        setMockInterviewQuestions(jsonMockInterviewQuestions)
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
            <div className='flex flex-col-reverse   lg:grid grid-cols-1 md:grid-cols-2 lg:gap-10'>
                {/* Questions  */}
                <QuestionSection mockInterviewQuestions={mockInterviewQuestions} activeQuestionIndex={activeQuestionIndex} setActiveQuestionIndex={setActiveQuestionIndex} />
                {/* Webcam and microphone recording */}
                <RecordAnswerSection mockInterviewQuestions={mockInterviewQuestions} activeQuestionIndex={activeQuestionIndex} />
            </div>
        </div>
    )
}

export default StartInterview