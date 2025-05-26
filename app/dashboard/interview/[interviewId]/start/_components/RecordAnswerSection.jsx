'use client'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import GeminiPrompt from '@/utils/GeminiAiModel'
import { UserAnswer } from '@/utils/schema'
import { textToSpeech } from '@/utils/textToSpeech'
import { eq } from 'drizzle-orm'
import { Mic, WebcamIcon, CircleStop, Play, Pause } from 'lucide-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Webcam from 'react-webcam'
import { toast } from 'sonner'

const RecordAnswerSection = ({ interviewData, mockInterviewQuestions, activeQuestionIndex }) => {

  const [isWebcamOpen, setIsWebcamOpen] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    finalTranscript,
    isMicrophoneAvailable,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening,
  } = useSpeechRecognition();

  useEffect(() => {
    setUserAnswer(finalTranscript)
  }, [finalTranscript, activeQuestionIndex])


  const playUserAnswer = () => {
    if (userAnswer?.length > 1) {
      setIsPlaying(true)
      const utterance = textToSpeech(userAnswer)
      utterance.onend = () => {
        setIsPlaying(false)
      }
    } else {
      toast.error('No answer recorded, please try again')
    }
  }

  const saveUserInput = async () => {
    if (listening) {
      SpeechRecognition.stopListening()
      if (userAnswer?.length < 10) {
        setIsSubmitting(false)
        toast.error('No answer recorded, please try again')
        return
      }
    } else {
      // Cancel any ongoing speech synthesis before starting recording
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
      }

      resetTranscript()
      setUserAnswer('')
      if (browserSupportsContinuousListening && browserSupportsSpeechRecognition && isMicrophoneAvailable) {
        try {
          await SpeechRecognition.startListening({
            continuous: true,
            language: 'en-IN',
            // Add audio constraints to prefer the default microphone
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            }
          });
        } catch (error) {
          toast.error('Error starting speech recognition');
          console.error('Speech recognition error:', error);
        }
      } else {
        // TODO: fix browser not supporting continuous listening on mobile devices
        toast.error('Browser does not support continuous listening or speech recognition')
      }
    }
  }

  const submitAnswer = async () => {
    setIsSubmitting(true)
    if (userAnswer?.length > 10) {
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

      const dbRes = await insertUpdateUserAnswer(parsedResponse)
      if (dbRes) {
        console.log(dbRes)
        toast.success('Answer submitted successfully')
        setUserAnswer('')
        resetTranscript()
      } else {
        toast.error('No answer recorded, please try again')
      }
      setIsSubmitting(false)
    }
  }


  const insertUpdateUserAnswer = async (parsedResponse) => {
    // Check if answer exists for this specific question in this mock interview
    const checkIfQuestionExists = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewData?.mockId))
      .where(eq(UserAnswer.questionId, parsedResponse.questionIndex.toString()));

    if (checkIfQuestionExists.length > 0) {
      // Update existing answer
      const dbRes = await db.update(UserAnswer)
        .set({
          userAnswer: userAnswer,
          feedback: parsedResponse.response.feedback,
          rating: parsedResponse.response.rating,
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        .where(eq(UserAnswer.mockIdRef, interviewData?.mockId))
        .where(eq(UserAnswer.questionId, parsedResponse.questionIndex.toString()));
      return dbRes;
    } else {
      // Insert new answer
      const dbRes = await db.insert(UserAnswer)
        .values({
          mockIdRef: interviewData?.mockId,
          questionId: parsedResponse.questionIndex.toString(), // Use question index as ID
          question: mockInterviewQuestions[activeQuestionIndex]?.question,
          correctAnswer: mockInterviewQuestions[activeQuestionIndex]?.answer,
          userAnswer: userAnswer,
          feedback: parsedResponse.response.feedback,
          rating: parsedResponse.response.rating,
          createdBy: interviewData?.createdBy,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
        });
      return dbRes;
    }
  }

  // Add function to check existing answer
  const checkExistingAnswer = async () => {
    const existingAnswer = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewData?.mockId))
      .where(eq(UserAnswer.questionId, activeQuestionIndex.toString()));

    if (existingAnswer.length > 0) {
      setUserAnswer(existingAnswer[0].userAnswer);
      return existingAnswer[0];
    }
    return null;
  };

  // Add useEffect to check for existing answer when question changes
  useEffect(() => {
    if (interviewData?.mockId) {
      checkExistingAnswer();
    }
  }, [activeQuestionIndex, interviewData?.mockId]);

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
          className={`text-white p-6 cursor-pointer disabled:cursor-not-allowed
            ${listening ? 'bg-red-500' : 'bg-primary'} 
            ${!isWebcamOpen ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={saveUserInput}
          disabled={!isWebcamOpen || isSubmitting}
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
        <Button variant='outline' className='p-6 cursor-pointer disabled:cursor-not-allowed' onClick={playUserAnswer} disabled={(userAnswer?.length < 10)} title='Play your answer'>
          {isPlaying ? (
            <Pause size={40} className='animate-pulse' />
          ) : (
            <Play size={40} />
          )}
        </Button>
        <Button variant='outline' className='p-6 bg-primary text-white cursor-pointer disabled:cursor-not-allowed' onClick={submitAnswer} disabled={(userAnswer?.length < 10) || listening}>Submit</Button>
      </div>

    </div>
  )
}

export default RecordAnswerSection