'use client'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import GeminiPrompt from '@/utils/GeminiAiModel'
import { UserAnswer } from '@/utils/schema'
import { Mic, WebcamIcon, CircleStop } from 'lucide-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Webcam from 'react-webcam'
import { toast } from 'sonner'

const RecordAnswerSection = ({ interviewData, mockInterviewQuestions, activeQuestionIndex }) => {

  const [isWebcamOpen, setIsWebcamOpen] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setUserAnswer(transcript)
    if (!isWebcamOpen) {
      toast.error('Webcam is not open')
      return
    }
  }, [transcript])

  const saveUserInput = async () => {
    if (listening) {
      SpeechRecognition.stopListening()
      if (userAnswer?.length < 10) {
        toast.error('No answer recorded, please try again')
        return
      }

      const feedbackPrompt = `(you are a interviewer and user is the candidate) 
                             (the answer should not be just the repeat of the question) 
                             (as the user recording is trascribed so there can be wrong words but the main idea should be there )
                              Based on the interview question : ${mockInterviewQuestions[activeQuestionIndex]?.question} 
                             and the user interview answer: ${userAnswer}
                            give him a rating out of 5 and  a feedback for improvement if any 
                            (user cant code the answer its just texts) 
                            in just 3 to 5 lines there should be two fields rating and feedback
                            the response should be in JSON format.`

      const response = await GeminiPrompt(feedbackPrompt)
      const parsedResponse = { questionIndex: activeQuestionIndex, mockInterviewQuestion: mockInterviewQuestions[activeQuestionIndex], userAnswer: userAnswer, response: JSON.parse(response) }
      console.log(userAnswer, " ", parsedResponse)
      console.log(mockInterviewQuestions[activeQuestionIndex])

      const dbRes = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestions[activeQuestionIndex]?.question,
        correctAnswer: mockInterviewQuestions[activeQuestionIndex]?.answer,
        userAnswer: userAnswer,
        feedback: parsedResponse.response.feedback,
        rating: parsedResponse.response.rating,
        createdBy: interviewData?.createdBy,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
      })

      console.log(dbRes, " ", parsedResponse)

      resetTranscript()
    } else {
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })
    }
  }

  if (!browserSupportsSpeechRecognition) {
    return toast.error('Browser does not support speech recognition')
  }

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col bg-black items-center justify-center rounded-lg p-5 mt-5 lg:mt-10 relative h-[350px] lg:h-[500px] w-full'>

        <WebcamIcon className='absolute text-white' width={200} height={200} />
        <div className='flex items-center justify-center w-full h-full'>
          <Webcam
            mirrored={true}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 10,
            }}
            onUserMedia={() => setIsWebcamOpen(true)}
          />
        </div>

      </div>

      <div className='flex items-center justify-center gap-4 my-10'>
        <Button
          variant='outline'
          className={`text-white p-6
            ${listening ? 'bg-red-500' : 'bg-primary'} 
            ${!isWebcamOpen ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={saveUserInput}
          disabled={!isWebcamOpen}
        >
          {listening ? (
            <div className='flex items-center gap-2 animate-pulse'>
              <CircleStop className='w-8 h-8  ' /> Stop Recording
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <Mic className='w-8 h-8  ' /> Start Recording
            </div>
          )}
        </Button>
      </div>

    </div>
  )
}

export default RecordAnswerSection