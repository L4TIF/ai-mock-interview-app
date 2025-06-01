"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { desc, eq } from 'drizzle-orm'
import { LoaderCircle } from 'lucide-react'
import InterviewItemCard from './InterviewItemCard'

const InterviewList = () => {
    const { user } = useUser()
    const [interviews, setInterviews] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const getInterviews = async () => {
        setIsLoading(true)
        const interviews = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(MockInterview.id))
        setInterviews(interviews)
        if(interviews.length === 0) {
            setError('No interviews found')
        }
        setIsLoading(false)
    }

    useEffect(() => {
        if (user) {
            getInterviews()
        }
    }, [user])

    if(isLoading) return <LoaderCircle className='text-primary animate-spin w-10 h-10 mx-auto mt-10 ' />
    if(error) return <div className='text-red-500'>No interviews found create one</div>
    
    return (
        <div>
          
            {interviews.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-5'>
                    {interviews.map((interview) => (
                      <InterviewItemCard key={interview.mockId} interview={interview} />
                    ))}
                </div>
            )} 
            
        </div>
    )
}

export default InterviewList