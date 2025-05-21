'use client'

import { Button } from '@/components/ui/button'
import GeminiPrompt from '@/utils/GeminiAiModel'

import { Mic, RotateCcw, WebcamIcon, CircleStop } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text'

import Webcam from 'react-webcam'
import { toast } from 'sonner'

const RecordAnswerSection = ({ mockInterviewQuestions, activeQuestionIndex }) => {
  const [isWebcamOpen, setIsWebcamOpen] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')

  const {
    setResults,
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });


  useEffect(() => {
    results.map((result) => {
      setUserAnswer(prev => prev + result?.transcript)
    })
  }, [results])

  const saveUserInput = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer?.length < 10) {
        
        toast.error('No answer recorded, please try again')
        return
      }

      const feedbackPrompt = `Based on the interview question : ${mockInterviewQuestions[activeQuestionIndex]?.question} and the user interview answer: ${userAnswer} give him a rating out of 5 and  a feedback for improvement if any (user cant code the answer its just texts) in just 3 to 5 lines there should be two fields rating and feedback in JSON format.`

      const response = await GeminiPrompt(feedbackPrompt)
      const parsedResponse = JSON.parse(response)
      console.log(userAnswer, " ", parsedResponse)
    } else {
      startSpeechToText();
    }
  }

  const handleReset = () => {
    setResults([])
    setUserAnswer('')
    toast('Answer reseted')
  }


  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col bg-black items-center justify-center rounded-lg p-5 mt-5 lg:mt-20 relative h-[350px] lg:h-[500px] w-full'>
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
            ${isRecording ? 'bg-red-500' : 'bg-primary'} 
            ${!isWebcamOpen ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={saveUserInput}
          disabled={!isWebcamOpen}
        >
          {isRecording ? (
            <div className='flex items-center gap-2 animate-pulse'>
              <CircleStop className='w-8 h-8  ' /> Stop Recording
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <Mic className='w-8 h-8  ' /> Start Recording
            </div>
          )}
        </Button>
        <Button variant='outline' disabled={userAnswer?.length <= 0} className={`bg-red-500 text-white p-6 ${userAnswer?.length <= 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} `} onClick={handleReset}><RotateCcw className='w-6 h-6 ' /> Reset Answer</Button>
      </div>





    </div>
  )
}

export default RecordAnswerSection