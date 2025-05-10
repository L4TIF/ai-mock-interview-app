'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect } from 'react'
const Interview = ({ params }) => {

    const { interviewId } = React.use(params);
    const [interviewData, setInterviewData] = React.useState(null)

    const fetchInterview = async () => {
        const res = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId))
        setInterviewData((res[0]))
    }
    useEffect(() => {
        fetchInterview()
    }, [])
    // continue with react webcam setup
    return (
        <>
            <div className='flex my-10 justify-between items-center flex-col'>
                <h1 className='text-2xl font-bold'>Let's start the interview</h1>
            </div>
        </>
    )
}

export default Interview