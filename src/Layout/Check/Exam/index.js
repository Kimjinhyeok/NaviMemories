import React from 'react'
import { Route, Routes } from 'react-router'
import RecitationLoading from './loading'
import PrepareForGuest from './Prepare/forGuest'
import PrepareForMember from './Prepare/forMember'
import RecitationResult from './result'
import RecitationExam from './Test'

export default function ExamMainPage(props) {

  const {location} = props;

  return (
    <Routes>
      <Route path="/test/exam" element={(props) => <RecitationExam {...props} />} />
      <Route path="/test/prepare" element={(props) => <PrepareForMember {...props} />} />
      <Route path="/test/v_prepare" element={(props) => <PrepareForGuest {...props} />} />
      <Route path="/test/loading" element={(props) => <RecitationLoading {...props} />} />
      <Route path="/test/result" element={(props) => <RecitationResult {...props} />} />
    </Routes>
  )
} 