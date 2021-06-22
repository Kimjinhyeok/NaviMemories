import { Container, makeStyles } from '@material-ui/core'
import React from 'react'
import RecitationExamPrepareComponent from './prepare'

export default function RecitationExam(props) {

  const classes = makeStyles(theme => ({
    root_exam: {
      height: '100%'
    }
  }))()
  return (
    <Container maxWidth="md" className={classes.root_exam}>
      <RecitationExamPrepareComponent></RecitationExamPrepareComponent>
    </Container>
  )
}