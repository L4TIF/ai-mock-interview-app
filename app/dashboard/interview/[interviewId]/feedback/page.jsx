'use client'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect } from 'react'

const Feedback = ({ params }) => {
  const { interviewId } = React.use(params)
  const [feedbackList, setFeedbackList] = React.useState([])
  const [overallRating, setOverallRating] = React.useState(0)
  const getFeedback = async () => {
    const response = await db.select().from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.questionId)

    if (response.length > 0) {
      const totalRating = response.reduce((acc, feedback) => acc + parseInt(feedback.rating), 0)
      setOverallRating(totalRating / response.length)
      setFeedbackList(response)
      console.log(response)
      return response
    }
    return []
  }



  useEffect(() => {
    getFeedback()
  }, [])

  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
      <h2 className='font-bold text-2xl'>Here is your mock interview feedback</h2>
      <h2 className='text-primary text-lg my-3'>Your overall interview rating <strong>{overallRating}/10</strong> </h2>
      <h3 className='text-gray-500 text-sm'>Find below the feedback for each question along with the correct answer</h3>
      {feedbackList.map((feedback) => (
        <div key={feedback.questionId}>
          <h4>{feedback.question}</h4>
          <p>{feedback.feedback}</p>
          <p>Your answer: {feedback.userAnswer}</p>
          <p>Correct answer: {feedback.correctAnswer}</p>
          <p>Rating: {feedback.rating}/10</p>
        </div>
      ))}
    </div>
  )
}

export default Feedback