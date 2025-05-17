'use client'

import { Button } from '@/components/ui/button'
import { Mic, MicOff, WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text'

import Webcam from 'react-webcam'

const RecordAnswerSection = () => {
  const [isWebcamOpen, setIsWebcamOpen] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result) => {
      setUserAnswer(prev => prev + result?.transcript)
    })
  }, [results])

  console.log(results)




  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col bg-black items-center justify-center rounded-lg p-5 mt-20 relative h-[500px]'>
        <WebcamIcon className='absolute text-white' width={200} height={200} />
        <div className='flex items-center justify-center w-full h-full'>
          <Webcam
            mirrored={true}
            audio={true}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 10,
            }}
            onUserMedia={() => setIsWebcamOpen(true)}
          />
        </div>
        <div className='absolute bottom-4 right-4 z-20'>
          {isRecording ? (
            <Mic className='w-8 h-8 animate-pulse text-white' />
          ) : (
            <MicOff className='w-8 h-8 text-white' />
          )}
        </div>
      </div>

      <div className='flex items-center justify-center gap-4 my-10'>
        <Button
          variant='outline'
          className={`text-white 
            ${isRecording ? 'bg-red-500' : 'bg-primary'} 
            ${!isWebcamOpen ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
          disabled={!isWebcamOpen}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>
      </div>





    </div>
  )
}

export default RecordAnswerSection