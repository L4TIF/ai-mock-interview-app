import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const InterviewItemCard = ({ interview }) => {

    return (
        <>
            <div className='shadow-sm border rounded-lg p-4 flex flex-col gap-3'>
                <div className='flex justify-between'>
                    <div className='flex-1'>
                        <h3 className='font-bold text-primary'> {interview.jobPosition}</h3>
                        <p className='text-sm text-gray-600 mt-1'>Job Description: {interview.jobDesc}</p>
                        <p className='text-sm text-gray-600 mt-1'>Experience: {interview.jobExperience}</p>
                    </div>
                    <div>
                        <p className='text-sm text-gray-500'>Created on: {interview.createdAt}</p>
                    </div>
                </div>
                <div className='flex gap-2 justify-between mt-auto'>
                    <Button variant='outline' size="sm" asChild>
                        <Link href={`/dashboard/interview/${interview.mockId}/feedback`}>
                            View Feedback
                        </Link>
                    </Button>
                    <Button variant='outline' className='bg-primary text-white' size="sm" asChild>
                        <Link href={`/dashboard/interview/${interview.mockId}/start`}>
                            Retake
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default InterviewItemCard