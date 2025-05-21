import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'
import { textToSpeech } from '@/utils/textToSpeech'
const QuestionSection = ({ mockInterviewQuestions, activeQuestionIndex, setActiveQuestionIndex }) => {
    return mockInterviewQuestions && (
        <div className='p-5 border rounded-lg my-2 lg:my-10 flex flex-col justify-between'>
            <div>

                <div className='grid grid-cols-5 gap-5 '>
                    {mockInterviewQuestions.map((question, index) => (

                        <h2 key={index} className={`text-xs md:text-sm text-center cursor-pointer p-2  border rounded-full  ${activeQuestionIndex === index ? 'bg-primary text-white' : 'bg-secondary'}`} onClick={() => setActiveQuestionIndex(index)}>Q #{index + 1}</h2>

                    ))}
                </div>
                <h2 className='my-5 text-md md:text-lg '> <strong> Question {activeQuestionIndex + 1}:</strong> {mockInterviewQuestions[activeQuestionIndex].question}</h2>

                <Volume2 className='w-10 h-10 cursor-pointer text-primary hover:text-primary/80 rounded-full p-2 bg-secondary' onClick={() => textToSpeech(mockInterviewQuestions[activeQuestionIndex].question)} />

            </div>


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