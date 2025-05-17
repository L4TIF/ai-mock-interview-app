import { Lightbulb } from 'lucide-react'
import React from 'react'

const QuestionSection = ({ mockInterviewQuestions, activeQuestionIndex, setActiveQuestionIndex }) => {
    return mockInterviewQuestions && (
        <div className='p-5 border rounded-lg my-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
                {mockInterviewQuestions.map((question, index) => (

                    <h2 key={index} className={`text-xs md:text-sm text-center cursor-pointer p-2  border rounded-full ${activeQuestionIndex === index ? 'bg-primary text-white' : 'bg-secondary'}`} onClick={() => setActiveQuestionIndex(index)}>Question #{index + 1}</h2>

                ))}
            </div>
            <h2 className='my-5 text-md md:text-lg  font-bold'>{mockInterviewQuestions[activeQuestionIndex].question}</h2>



            <div className='border rounded-lg p-5 bg-blue-100 text-primary mt-20'>
                <h2 className='flex items-center gap-2'>
                    <Lightbulb />
                    <strong>Note:</strong>
                </h2>
                <h2 className='text-sm text-justify my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
            </div>
        </div>
    )
}

export default QuestionSection