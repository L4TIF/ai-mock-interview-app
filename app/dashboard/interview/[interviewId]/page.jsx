'use client'
import { Button } from '@/components/ui';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import Webcam from 'react-webcam';
const Interview = ({ params }) => {

    const { interviewId } = React.use(params);
    const [interviewData, setInterviewData] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const [isWebcamOpen, setIsWebcamOpen] = React.useState(false)


    const fetchInterview = async () => {
        const res = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId))
        setInterviewData((res[0]))
    }
    useEffect(() => {
        setIsLoading(true)
        fetchInterview()
        setIsLoading(false)
    }, [])
    if (isLoading) {
        return <div>Loading...</div>
    }
   
    return (
        <>
            <div className='my-10 '>
                <h1 className='text-2xl font-bold'>Let's start the interview</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                    <div className='flex flex-col my-5 gap-5  '>
                        <div className='flex flex-col gap-5 p-5 border  rounded-lg'>
                            <h2 className='text-lg'><strong>Job Position:</strong> {interviewData?.jobPosition}</h2>
                            <h2 className='text-lg'><strong>Job Description:</strong> {interviewData?.jobDesc}</h2>
                            <h2 className='text-lg'><strong>Years of Experience:</strong> {interviewData?.jobExperience}</h2>
                        </div>
                        <div className=' p-5 border border-yellow-300 bg-yellow-100  rounded-lg'>
                            <h2 className='flex items-center gap-2 text-lg text-yellow-600'> <Lightbulb /> <strong>Information</strong></h2>
                            <h2 className='text-sm text-yellow-600'>{process.env.NEXT_PUBLIC_INFO} <br />  <strong>Best of Luck!</strong></h2>
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-between my-5'>
                        {isWebcamOpen ? (
                            <Webcam
                                className='rounded-lg my-5 w-full h-72'
                                mirrored={true}
                                audio={true}
                                width={450}
                                height={450}
                                onUserMediaError={() => {
                                    setIsWebcamOpen(false)
                                    console.log("Error")
                                }}
                                onUserMedia={() => {
                                    setIsWebcamOpen(true)
                                    console.log("User Media")
                                }}
                            />
                        ) : (
                            < >
                                <WebcamIcon className='w-full h-72  p-20 border bg-secondary rounded-lg mb-5' />
                                <Button variant='outline' className='w-full' onClick={() => setIsWebcamOpen(true)}>Open Webcam and microphone</Button>
                            </>
                        )}
                    </div>


                </div>
                <div className='flex justify-end'>
                    <Button  >Start Interview</Button>
                </div>
            </div>
        </>
    )
}

export default Interview