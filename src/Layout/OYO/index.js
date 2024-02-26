import { Container, makeStyles, withStyles } from '@mui/material'
import React from 'react'
import { Route, Switch } from 'react-router'
import OYOCardManage from './CardManage'
import CardTemplateComponent from './cardTemplate'

export default function OYOIndex(props) {

  return (
    <Switch>
      <Route path="/oyo/template" render={(props) => <CardTemplateComponent {...props}/>}/>
      <Route path="/oyo/manage" render={(props) => <OYOCardManage {...props}/>}/>
    </Switch>
  )
}