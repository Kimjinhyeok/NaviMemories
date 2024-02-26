import React from 'react'
import { Route, Routes } from 'react-router'
import OYOCardManage from './CardManage'
import CardTemplateComponent from './cardTemplate'

export default function OYOIndex(props) {

  return (
    <Routes>
      <Route path="/oyo/template" element={(props) => <CardTemplateComponent {...props}/>}/>
      <Route path="/oyo/manage" element={(props) => <OYOCardManage {...props}/>}/>
    </Routes>
  )
}