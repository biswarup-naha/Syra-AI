import React from 'react'
import { useParams } from 'react-router';

const Interview = () => {
  const { interviewId } = useParams();

  return (
    <div>Interview: {interviewId}</div>
  )
}

export default Interview